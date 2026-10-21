import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Search, MapPin, ChevronRight, ArrowRight, ShieldCheck, Globe,
  BookOpen, Mail, Sparkles, LayoutGrid, Compass
} from 'lucide-react'
import { CATEGORIES, TOP_CITIES } from '@/lib/data'
import { BLOG_POSTS } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: "Pakistan Business Directory – Find & List Businesses Free | LocalePak",
  description: "LocalePak is Pakistan's free business directory. Find verified businesses by city & category — or add your business listing free and get found on Google.",
  alternates: {
    canonical: 'https://www.localepak.com/',
  },
  openGraph: {
    title: "Pakistan Business Directory – Find & List Businesses Free | LocalePak",
    description: "LocalePak is Pakistan's free business directory. Find verified businesses by city & category — or add your business listing free and get found on Google.",
    url: 'https://www.localepak.com/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pakistan Business Directory – Find & List Businesses Free | LocalePak",
    description: "LocalePak is Pakistan's free business directory. Find verified businesses by city & category — or add your business listing free and get found on Google.",
  },
}

const FAQS = [
  {
    question: 'What is LocalePak?',
    answer: 'LocalePak is a free business directory for Pakistan. It organizes local businesses and services by city and category, with guides that help you choose the right provider — and it helps business owners get discovered on Google.'
  },
  {
    question: 'Is LocalePak free to use?',
    answer: 'Yes. Browsing the directory, reading the city and category guides, and using search are all completely free, with no account required.'
  },
  {
    question: 'Which cities and categories does LocalePak cover?',
    answer: 'LocalePak has guides for cities across Pakistan — including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan and Peshawar — and covers categories from restaurants and real estate to technology, healthcare, home services and more.'
  },
  {
    question: 'I run a business. How can I get listed?',
    answer: 'Business listings are being prepared for launch. In the meantime, read our listing guide on the blog or contact us and we will let you know as soon as free listings open.'
  }
]

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default function HomePage() {
  const latestPosts = Object.values(BLOG_POSTS)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LocalePak',
    url: 'https://www.localepak.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.localepak.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    description: 'Pakistan business directory with city and category guides for local businesses and services'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-slate-50 text-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Pakistan's Local Business Directory</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Find Local Businesses & Services Across <span className="text-blue-700">Pakistan</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                From Karachi to Khyber — explore Pakistan's cities and business categories, compare local services with our guides, and find exactly what you need near you.
              </p>
            </div>

            {/* Hero Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-900/5 border border-slate-200/90 text-left">
              <form action="/search" method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-search-q" className="sr-only">Search businesses, categories or guides</label>
                  <input
                    id="hero-search-q"
                    type="text"
                    name="q"
                    placeholder="Try restaurants, real estate, software houses..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-city-select" className="sr-only">Select City</label>
                  <select
                    id="hero-city-select"
                    name="city"
                    className="w-full bg-transparent text-slate-900 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="">All Cities in Pakistan</option>
                    {TOP_CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    aria-label="Search LocalePak Directory"
                    className="w-full h-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              <div className="pt-3 px-2 flex items-center gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-bold text-slate-400">Popular:</span>
                <Link href="/category/restaurants" className="hover:text-blue-600 font-semibold">Restaurants</Link>
                <span>•</span>
                <Link href="/category/real-estate" className="hover:text-blue-600 font-semibold">Real Estate</Link>
                <span>•</span>
                <Link href="/category/technology" className="hover:text-blue-600 font-semibold">Software Houses</Link>
                <span>•</span>
                <Link href="/category/healthcare" className="hover:text-blue-600 font-semibold">Healthcare</Link>
                <span>•</span>
                <Link href="/blog" className="hover:text-emerald-600 font-bold">Business Guides &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900">100% free</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Browse & search at no cost</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-emerald-600">Every major city</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Karachi · Lahore · Islamabad & more</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-blue-600">24 categories</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">From food to technology</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-amber-500">Local guides</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Choose providers with confidence</p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Browse by Industry</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                What Are You Looking For?
              </h2>
            </div>
            <Link href="/categories" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View All 24 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.slice(0, 12).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all text-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-blue-600">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-semibold text-emerald-600">
                  Explore guide
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CITIES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl my-8">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Near You</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Businesses in Your City
                </h2>
                <p className="text-xs text-slate-400 mt-1">Pick a city to explore its business sectors and local guides.</p>
              </div>
              <Link href="/cities" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                <span>Explore All Cities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
              {TOP_CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/city/${cityToSlug(city)}`}
                  className="p-3.5 bg-slate-800/80 hover:bg-blue-600 rounded-xl border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center justify-between font-semibold group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                    <span>{city}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY LOCALEPAK */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Why LocalePak</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                A Directory Built for Local Search
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">One free platform for finding services, understanding your options, and discovering businesses across Pakistan.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Compass className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Made for Local Search</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Pages are organized by city and category, matching how people actually search: a service, in a place, near them.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <BookOpen className="w-8 h-8 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Guides, Not Just Lists</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Every city and category comes with a practical guide — what to look for, what to ask, and how to compare providers before you spend a rupee.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <ShieldCheck className="w-8 h-8 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Honest by Design</h3>
                <p className="text-xs text-slate-600 leading-relaxed">No fake rankings, no paid placements disguised as recommendations, and no invented statistics. What you read is what we know.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Globe className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-base">Built to Rank on Google</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Fast, server-rendered pages with structured data — so when the directory's listings open, businesses get profiles that search engines can properly read.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG / GUIDES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Guides & Insights</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                From the LocalePak Blog
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-emerald-600 hover:underline">
              Explore Blog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-blue-600">{post.category}</span>
                <h3 className="font-bold text-slate-900 text-sm">{post.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                <p className="text-[11px] text-slate-400 pt-1">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Everything you need to know about the LocalePak directory.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-6">
            <Mail className="w-10 h-10 text-blue-400 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get Local Business Tips in Your Inbox
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              One short email a week: local SEO tips, hiring advice and new features for Pakistani businesses. No spam.
            </p>
            <form action="#" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="newsletter-email-input" className="sr-only">Email address</label>
              <input
                id="newsletter-email-input"
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <button type="submit" aria-label="Subscribe to Newsletter" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0">
                Subscribe Free
              </button>
            </form>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Start Exploring Pakistan's Business Directory
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                Browse categories, explore your city's guide, or read practical advice for growing a local business.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center shrink-0">
              <Link
                href="/categories"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2"
              >
                <span>Browse Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm rounded-2xl transition-all"
              >
                About LocalePak
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
