'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Phone, MessageCircle, Globe, Facebook, Instagram, Youtube, ArrowLeft, Clock, Tag, Mail, Star, Send, Flag } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, query, where, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { isReleased, releaseDateLabel } from '@/lib/release'
import { toast } from 'sonner'

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

const DAY_ORDER: Array<{ key: DayKey; label: string }> = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
]

function whatsappDigits(raw: string): string {
  let digits = (raw || '').replace(/\D/g, '')
  if (digits.startsWith('0')) digits = `92${digits.slice(1)}`
  return digits
}

function formatTime(t: string): string {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  if (Number.isNaN(h)) return t
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m || 0).padStart(2, '0')} ${suffix}`
}

const DAY_NAMES: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

function upsertMetaDescription(content: string) {
  let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function Stars({ value, className = 'w-4 h-4' }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
        />
      ))}
    </span>
  )
}

type Review = {
  id: string
  authorName: string
  rating: number
  text: string
  dateStr: string
  ts: number
}

export default function BusinessDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''
  const [business, setBusiness] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  // Set when the listing is approved but its weekly release is still
  // pending (lib/release.ts) — the profile stays hidden until then.
  const [unreleased, setUnreleased] = useState<{ name: string; releaseLabel: string } | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, text: '' })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }
      try {
        const snap = await getDocs(query(collection(db, 'businesses'), where('slug', '==', slug), limit(1)))
        if (cancelled) return
        if (snap.empty) {
          setNotFound(true)
        } else {
          const data = snap.docs[0].data() as any
          // Weekly batch release (lib/release.ts): an approved business
          // stays hidden until the next 7-day cycle boundary passes.
          if (data.status === 'approved' && !isReleased(data.approvedAt, Date.now())) {
            setUnreleased({ name: data.name || 'This business', releaseLabel: releaseDateLabel(Date.now()) })
          } else {
            setBusiness({ id: snap.docs[0].id, ...data })
          }
        }
      } catch {
        if (!cancelled) setNotFound(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  // Per-listing SEO: real title, meta description and LocalBusiness JSON-LD
  useEffect(() => {
    if (!business) return
    const categoryLabel = business.category || business.mainCategory || 'Business'
    document.title = `${business.name} — ${categoryLabel} in ${business.city || 'Pakistan'} | LocalePak`
    const rawDesc = (business.description || '').replace(/\s+/g, ' ').trim()
    upsertMetaDescription(
      rawDesc
        ? `${rawDesc.slice(0, 150)}${rawDesc.length > 150 ? '...' : ''}`
        : `${business.name} is a ${categoryLabel} business in ${business.city || 'Pakistan'}. Contact details, opening hours, services and customer reviews on LocalePak.`
    )

    const sameAs = [business.website, business.facebook, business.instagram, business.youtube].filter(Boolean)
    const openingHoursSpecification = DAY_ORDER
      .map(({ key }) => {
        const d = business.hours?.[key]
        if (!d || d.closed || !d.open || !d.close) return null
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: DAY_NAMES[key],
          opens: d.open,
          closes: d.close,
        }
      })
      .filter(Boolean)

    const jsonLd: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      url: `https://www.localepak.com/business/${business.slug || slug}`,
    }
    if (business.description) jsonLd.description = business.description
    if (business.phone) jsonLd.telephone = business.phone
    if (business.address || business.city) {
      jsonLd.address = {
        '@type': 'PostalAddress',
        ...(business.address ? { streetAddress: business.address } : {}),
        ...(business.city ? { addressLocality: business.city } : {}),
        addressCountry: 'PK',
      }
    }
    if (openingHoursSpecification.length > 0) jsonLd.openingHoursSpecification = openingHoursSpecification
    if (sameAs.length > 0) jsonLd.sameAs = sameAs

    document.getElementById('listing-jsonld')?.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'listing-jsonld'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [business, slug])

  // Approved customer reviews for this business
  useEffect(() => {
    if (!business?.id) return
    let cancelled = false
    const loadReviews = async () => {
      try {
        const snap = await getDocs(
          query(
            collection(db, 'reviews'),
            where('businessId', '==', business.id),
            where('status', '==', 'approved')
          )
        )
        const items: Review[] = []
        snap.forEach((d) => {
          const data = d.data() as any
          const dt = data.createdAt?.toDate ? data.createdAt.toDate() : null
          items.push({
            id: d.id,
            authorName: data.authorName || 'Anonymous',
            rating: Number(data.rating) || 0,
            text: data.text || '',
            dateStr: dt
              ? dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              : '',
            ts: dt ? dt.getTime() : 0,
          })
        })
        items.sort((a, b) => b.ts - a.ts)
        if (!cancelled) setReviews(items)
      } catch {
        if (!cancelled) setReviews([])
      }
    }
    loadReviews()
    return () => {
      cancelled = true
    }
  }, [business?.id])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!business?.id) return
    if (!reviewForm.name.trim() || reviewForm.rating < 1 || !reviewForm.text.trim()) {
      toast.error('Please add your name, a star rating and your review.')
      return
    }
    setSubmittingReview(true)
    try {
      await addDoc(collection(db, 'reviews'), {
        businessId: business.id,
        businessSlug: business.slug || slug,
        authorName: reviewForm.name.trim(),
        rating: reviewForm.rating,
        text: reviewForm.text.trim(),
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      toast.success('Review submitted — it will appear after moderation.')
      setReviewForm({ name: '', rating: 0, text: '' })
    } catch (err: any) {
      toast.error(`Could not submit your review: ${err?.message || 'Unknown error'}`)
    } finally {
      setSubmittingReview(false)
    }
  }

  const waNumber = business ? whatsappDigits(business.whatsapp || business.phone || '') : ''
  const socials = business
    ? [
        { label: 'Website', href: business.website, Icon: Globe },
        { label: 'Facebook', href: business.facebook, Icon: Facebook },
        { label: 'Instagram', href: business.instagram, Icon: Instagram },
        { label: 'YouTube', href: business.youtube, Icon: Youtube },
      ].filter((s) => s.href)
    : []
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0
  const hasHours = business?.hours && DAY_ORDER.some(({ key }) => business.hours[key])
  const services: string[] = Array.isArray(business?.services) ? business.services : []
  const products: Array<{ name: string; price?: string }> = Array.isArray(business?.products) ? business.products : []
  const tags: string[] = Array.isArray(business?.tags) ? business.tags : []

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <Link href="/businesses" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Businesses
        </Link>

        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-sm text-slate-500">
            Loading business...
          </div>
        ) : unreleased ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <h1 className="font-extrabold text-slate-900 text-lg">
              This business listing goes live on {unreleased.releaseLabel}
            </h1>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {unreleased.name} has been approved — LocalePak publishes newly approved listings together
              in a weekly release, so its full profile will appear here on {unreleased.releaseLabel}.
            </p>
            <Link href="/businesses" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors">
              <ArrowLeft className="w-4 h-4" /> Browse Businesses
            </Link>
          </div>
        ) : notFound || !business ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <h1 className="font-extrabold text-slate-900 text-lg">Business not found</h1>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              This business may have been removed, or the link is incorrect.
            </p>
            <Link href="/businesses" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors">
              <ArrowLeft className="w-4 h-4" /> Browse Businesses
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                {business.category && (
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
                    {business.category}
                  </span>
                )}
                {business.secondaryCategory && (
                  <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200 text-[11px] font-bold">
                    {business.secondaryCategory}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">{business.name}</h1>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
                {business.city && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" /> {business.city}
                    {business.area ? ` — ${business.area}` : ''}
                  </span>
                )}
                {business.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-blue-600" /> {business.phone}
                  </span>
                )}
                {business.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" /> {business.email}
                  </span>
                )}
              </div>

              {business.description && (
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{business.description}</p>
              )}

              {business.address && (
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-800">Address:</strong> {business.address}
                  {business.mapsUrl && (
                    <>
                      {' · '}
                      <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                        View on Google Maps
                      </a>
                    </>
                  )}
                </p>
              )}

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                )}
                {waNumber && (
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-blue-500 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                  >
                    <Globe className="w-4 h-4" /> Visit Website
                  </a>
                )}
              </div>
            </section>

            {hasHours && (
              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> Business Hours
                </h2>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {DAY_ORDER.map(({ key, label }) => {
                      const d = business.hours[key]
                      if (!d) return null
                      return (
                        <tr key={key}>
                          <td className="py-2.5 font-semibold text-slate-700">{label}</td>
                          <td className="py-2.5 text-right">
                            {d.closed ? (
                              <span className="font-bold text-red-500">Closed</span>
                            ) : (
                              <span className="text-slate-600">{formatTime(d.open)} – {formatTime(d.close)}</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </section>
            )}

            {services.length > 0 && (
              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <h2 className="font-extrabold text-slate-900 text-lg">Services</h2>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <span key={service} className="px-3.5 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-semibold">
                      {service}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {products.length > 0 && (
              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <h2 className="font-extrabold text-slate-900 text-lg">Products</h2>
                <ul className="divide-y divide-slate-100">
                  {products.map((product, i) => (
                    <li key={`${product.name}-${i}`} className="py-3 flex items-center justify-between gap-3">
                      <span className="font-medium text-slate-700 text-sm">{product.name}</span>
                      {product.price && <span className="text-sm font-bold text-emerald-600">{product.price}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {socials.length > 0 && (
              <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <h2 className="font-extrabold text-slate-900 text-lg">Find them online</h2>
                <div className="flex flex-wrap gap-3">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-blue-500 rounded-xl text-sm font-bold text-slate-700 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-blue-600" /> {label}
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-extrabold text-slate-900 text-lg">Customer Reviews</h2>
                {reviews.length > 0 && (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Stars value={avgRating} />
                    {avgRating.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? '' : 's'}
                  </span>
                )}
              </div>

              {reviews.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No reviews yet — if you have used this business, be the first to share your experience below.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {reviews.map((review) => (
                    <li key={review.id} className="py-4 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-bold text-slate-800 text-sm">{review.authorName}</span>
                        <Stars value={review.rating} className="w-3.5 h-3.5" />
                        {review.dateStr && <span className="text-[11px] text-slate-400">{review.dateStr}</span>}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
                    </li>
                  ))}
                </ul>
              )}

              <form onSubmit={handleReviewSubmit} className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Write a review</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="review-name" className="block text-xs font-bold text-slate-700 mb-1">Your name *</label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-700 mb-1">Your rating *</span>
                    <div className="flex items-center gap-1 pt-1.5" role="radiogroup" aria-label="Star rating">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={reviewForm.rating === n}
                          aria-label={`${n} star${n === 1 ? '' : 's'}`}
                          onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                          className="p-0.5 cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${n <= reviewForm.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="review-text" className="block text-xs font-bold text-slate-700 mb-1">Your review *</label>
                  <textarea
                    id="review-text"
                    required
                    rows={3}
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    placeholder="How was the service? What should other customers know?"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
                <p className="text-[11px] text-slate-400">Reviews are checked by our team before they appear, to keep them genuine.</p>
              </form>
            </section>

            <section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Flag className="w-6 h-6 text-slate-400 shrink-0" />
              <div className="space-y-1 flex-1">
                <h2 className="font-bold text-slate-900 text-sm">Own this business? Claim this listing</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Claiming opens after a short ownership verification. Contact us and we will walk you through it,
                  so you can keep your hours, services and contact details accurate.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-500 text-slate-700 font-bold text-xs rounded-xl transition-colors shrink-0"
              >
                Claim This Listing
              </Link>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
