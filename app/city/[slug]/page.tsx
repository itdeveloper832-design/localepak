import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import ListBusinessCta from '@/components/list-business-cta'
import { CITIES, CATEGORIES } from '@/lib/data'
import { CITY_INFO, generateCityContent } from '@/lib/seo-content'
import { getCitySeoCopy } from '@/lib/seo-directory-content'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import MarkdownContent from '@/components/seo/markdown-content'
import { MapPin, Building2, ArrowRight } from 'lucide-react'

export function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

function resolveCity(slug: string): string | null {
  return CITIES.find(c => cityToSlug(c) === slug.toLowerCase()) || null
}

export function generateStaticParams() {
  return CITIES.map(city => ({ slug: cityToSlug(city) }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const city = resolveCity(params.slug)
  if (!city) {
    return { title: 'City Not Found | LocalePak', robots: { index: false, follow: false } }
  }
  const info = CITY_INFO[city]
  const title = `Businesses in ${city} – Local Directory & City Guide | LocalePak`
  const description = info
    ? `Explore businesses and services in ${city}, ${info.province} — ${info.description}. Browse local categories and find contact details on LocalePak.`
    : `Explore businesses and services in ${city}, Pakistan. Browse local categories and find contact details on LocalePak.`
  const canonical = `https://www.localepak.com/city/${cityToSlug(city)}/`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'LocalePak', locale: 'en_PK', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function CityPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const city = resolveCity(params.slug)
  if (!city) notFound()

  const slug = cityToSlug(city)
  const info = CITY_INFO[city]
  const copy = getCitySeoCopy(slug)
  const guide = generateCityContent(city)
  const otherCities = CITIES.filter(c => c !== city).slice(0, 12)
  const provinceCities = info?.province
    ? CITIES.filter(c => c !== city && CITY_INFO[c]?.province === info.province).slice(0, 8)
    : []

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/city/${slug}`} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
              {info ? `${info.province}, Pakistan` : 'Pakistan'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Businesses in <span className="text-emerald-400">{city}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {copy?.intro || (info
                ? `${city} is ${info.description}. Use this guide to explore the city's main business sectors and browse services by category.`
                : `Explore the main business sectors of ${city} and browse local services by category on LocalePak.`)}
            </p>
            {info?.districts && (
              <p className="text-xs text-slate-400">
                Popular areas: {info.districts.join(' · ')}
              </p>
            )}
          </div>
        </section>

        {/* Categories in this city */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Browse Categories in {city}
            </h2>
            <Link href="/categories" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0">
              <span>All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/city/${slug}/${cat.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600">{cat.name} in {city}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* City guide */}
        <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto">
            <MarkdownContent content={guide} />
            {copy?.guidance && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-6">{copy.guidance}</p>
            )}
          </div>
        </section>

        {/* Other cities */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Explore Other Cities</h2>
          <div className="flex flex-wrap gap-2.5">
            {otherCities.map(c => (
              <Link
                key={c}
                href={`/city/${cityToSlug(c)}`}
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 text-xs font-medium"
              >
                Businesses in {c}
              </Link>
            ))}
            <Link href="/cities" className="px-3.5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs font-bold">
              View All Cities
            </Link>
          </div>
          {provinceCities.length > 0 && info && (
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900 text-sm">More Cities in {info.province}</h3>
              <div className="flex flex-wrap gap-2.5">
                {provinceCities.map(c => (
                  <Link
                    key={c}
                    href={`/city/${cityToSlug(c)}`}
                    className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 text-xs font-medium"
                  >
                    Businesses in {c}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <OwnerCtaBand
          title={`Run a business in ${city}? Get listed free.`}
          text={`Join the ${city} directory: create a free account, complete the eight-step form, and after review your profile appears on this page, in your category and in search.`}
          links={[
            { label: `All businesses in ${city}`, href: '/businesses' },
            { label: 'Browse categories', href: '/categories' },
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
            { label: 'All cities', href: '/cities' },
          ]}
        />
      </main>

      <Footer />
      <ListBusinessCta />
    </div>
  )
}
