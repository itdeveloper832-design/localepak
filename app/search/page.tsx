'use client'

import { useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES, CITIES } from '@/lib/data'
import { BLOG_POSTS } from '@/lib/blog-data'
import { Search, MapPin, LayoutGrid, BookOpen } from 'lucide-react'

type Result = {
  type: 'Category' | 'City' | 'Guide'
  title: string
  snippet: string
  href: string
}

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

const INDEX: Result[] = [
  ...CATEGORIES.map(cat => ({
    type: 'Category' as const,
    title: cat.name,
    snippet: cat.desc,
    href: `/category/${cat.id}`,
  })),
  ...CITIES.map(city => ({
    type: 'City' as const,
    title: `Businesses in ${city}`,
    snippet: `Explore business categories and local guides for ${city}, Pakistan.`,
    href: `/city/${cityToSlug(city)}`,
  })),
  ...Object.values(BLOG_POSTS).map(post => ({
    type: 'Guide' as const,
    title: post.title,
    snippet: post.excerpt,
    href: `/blog/${post.slug}`,
  })),
]

function SearchResults() {
  const searchParams = useSearchParams()
  const q = (searchParams.get('q') || '').trim()
  const city = (searchParams.get('city') || '').trim()

  const results = useMemo(() => {
    const query = q.toLowerCase()
    const cityQuery = city.toLowerCase()
    return INDEX.filter(item => {
      const matchesQuery = !query ||
        item.title.toLowerCase().includes(query) ||
        item.snippet.toLowerCase().includes(query)
      const matchesCity = !cityQuery ||
        item.title.toLowerCase().includes(cityQuery) ||
        item.snippet.toLowerCase().includes(cityQuery)
      return matchesQuery && matchesCity
    }).slice(0, 60)
  }, [q, city])

  const iconFor = (type: Result['type']) =>
    type === 'City' ? <MapPin className="w-5 h-5 text-emerald-600" />
    : type === 'Guide' ? <BookOpen className="w-5 h-5 text-amber-600" />
    : <LayoutGrid className="w-5 h-5 text-blue-600" />

  return (
    <main id="main-content" className="flex-1">
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Search LocalePak</h1>
          <form action="/search" method="GET" className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl text-left">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <label htmlFor="search-page-q" className="sr-only">Search categories, cities and guides</label>
              <input
                id="search-page-q"
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search categories, cities and guides..."
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-colors">
              Search
            </button>
          </form>
          <p className="text-xs text-slate-400" role="status">
            {q || city
              ? `${results.length} result${results.length === 1 ? '' : 's'}${q ? ` for "${q}"` : ''}${city ? ` in ${city}` : ''}`
              : 'Search across all categories, city guides and blog articles.'}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
            <h2 className="font-extrabold text-slate-900 text-lg">No results found</h2>
            <p className="text-sm text-slate-500">
              Try a different keyword, or browse the{' '}
              <Link href="/categories" className="text-blue-600 font-semibold hover:underline">categories</Link> and{' '}
              <Link href="/cities" className="text-blue-600 font-semibold hover:underline">cities</Link> directly.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {results.map(item => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {iconFor(item.type)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{item.type}</span>
                    <h2 className="font-bold text-slate-900 text-base">{item.title}</h2>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.snippet}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <Suspense fallback={<main className="flex-1 py-20 text-center text-sm text-slate-500">Loading search...</main>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </div>
  )
}
