'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, MapPin, Phone, ArrowRight } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

type Business = {
  id: string
  name: string
  slug: string
  category: string
  city: string
  phone: string
  description: string
}

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function CityCategoryListings({
  city,
  citySlug,
  categoryId,
  categoryName,
}: {
  city: string
  citySlug: string
  categoryId: string
  categoryName: string
}) {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'businesses'), where('status', '==', 'approved')))
        const items: Business[] = []
        snap.forEach((d) => {
          const data = d.data() as any
          const docCity = data.city || ''
          const docCategory = data.category || data.mainCategory || ''
          // Business docs store display names for city + category; category ids are accepted too.
          const cityMatches = slugify(docCity) === citySlug || docCity === city
          const categoryMatches =
            docCategory === categoryName ||
            docCategory === categoryId ||
            slugify(docCategory) === slugify(categoryName)
          if (!cityMatches || !categoryMatches) return
          items.push({
            id: d.id,
            name: data.name || 'Unnamed Business',
            slug: data.slug || d.id,
            category: docCategory || categoryName,
            city: docCity,
            phone: data.phone || '',
            description: data.description || '',
          })
        })
        if (!cancelled) setBusinesses(items)
      } catch {
        if (!cancelled) setBusinesses([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [city, citySlug, categoryId, categoryName])

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Loading {categoryName} in {city}...
      </div>
    )
  }

  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
        <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="font-extrabold text-slate-900 text-lg">
          No {categoryName} listed in {city} yet — be the first
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          This page is ready for its first {categoryName.toLowerCase()} listing. If you run one in {city},
          add it free and your profile will appear here after a quick review.
        </p>
        <Link
          href="/add-business"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
        >
          Add Your Business — Free <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {businesses.map((business) => (
        <Link
          key={business.id}
          href={`/business/${business.slug}`}
          className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-md transition-all group"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
            {business.category}
          </span>
          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-700">{business.name}</h3>
          {business.city && (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {business.city}
            </p>
          )}
          {business.description && (
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{business.description}</p>
          )}
          {business.phone && (
            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700 pt-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" /> {business.phone}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
