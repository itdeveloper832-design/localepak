'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Phone, Globe, Mail, ArrowLeft } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'

function upsertMetaDescription(content: string) {
  let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default function CompanyDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''
  const [company, setCompany] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }
      try {
        const snap = await getDocs(query(collection(db, 'companies'), where('slug', '==', slug), limit(1)))
        if (cancelled) return
        if (snap.empty) {
          setNotFound(true)
        } else {
          setCompany({ id: snap.docs[0].id, ...snap.docs[0].data() })
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

  // Per-listing SEO: real title, meta description and Organization JSON-LD
  useEffect(() => {
    if (!company) return
    const industryLabel = company.industry || company.category || 'Company'
    document.title = `${company.name} — ${industryLabel} in ${company.city || 'Pakistan'} | LocalePak`
    const rawDesc = (company.description || '').replace(/\s+/g, ' ').trim()
    upsertMetaDescription(
      rawDesc
        ? `${rawDesc.slice(0, 150)}${rawDesc.length > 150 ? '...' : ''}`
        : `${company.name} is a ${industryLabel} company in ${company.city || 'Pakistan'}. Contact details and company profile on LocalePak.`
    )

    const sameAs = [company.website].filter(Boolean)
    const jsonLd: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.name,
      url: `https://www.localepak.com/company/${company.slug || slug}`,
    }
    if (company.description) jsonLd.description = company.description
    if (company.phone) jsonLd.telephone = company.phone
    if (company.email) jsonLd.email = company.email
    if (company.address || company.city) {
      jsonLd.address = {
        '@type': 'PostalAddress',
        ...(company.address ? { streetAddress: company.address } : {}),
        ...(company.city ? { addressLocality: company.city } : {}),
        addressCountry: 'PK',
      }
    }
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
  }, [company, slug])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <Link href="/companies" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>

        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-sm text-slate-500">
            Loading company...
          </div>
        ) : notFound || !company ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <h1 className="font-extrabold text-slate-900 text-lg">Company not found</h1>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              This company may have been removed, or the link is incorrect.
            </p>
            <Link href="/companies" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors">
              <ArrowLeft className="w-4 h-4" /> Browse Companies
            </Link>
          </div>
        ) : (
          <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {(company.industry || company.category) && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
                  {company.industry || company.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{company.name}</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
              {company.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" /> {company.city}
                </span>
              )}
              {company.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-blue-600" /> {company.phone}
                </span>
              )}
              {company.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" /> {company.email}
                </span>
              )}
            </div>

            {company.description && (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{company.description}</p>
            )}

            {company.address && (
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">Address:</strong> {company.address}
                {company.city ? `, ${company.city}` : ''}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-blue-500 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
