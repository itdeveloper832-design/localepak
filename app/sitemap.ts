import { MetadataRoute } from 'next'
import { CATEGORIES, CITIES } from '@/lib/data'
import { BLOG_POSTS } from '@/lib/blog-data'

const BASE = 'https://www.localepak.com'

function canonicalUrl(path: string): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}/`
}

function citySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  const corePages = [
    '',
    '/about',
    '/contact',
    '/categories',
    '/cities',
    '/blog',
    '/search',
    '/login',
    '/register',
    '/faqs',
    '/help-center',
    '/support',
    '/careers',
    '/advertise-with-us',
    '/html-sitemap',
  ]

  const policyPages = [
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/refund-policy',
    '/editorial-policy',
    '/community-guidelines',
    '/business-listing-guidelines',
    '/verification-policy',
    '/accessibility',
    '/report-abuse',
  ]

  const coreRoutes = [...corePages, ...policyPages].map((path) => ({
    url: canonicalUrl(path),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.6,
  }))

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: canonicalUrl(`/category/${cat.id}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cityRoutes = CITIES.map((city) => ({
    url: canonicalUrl(`/city/${citySlug(city)}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogRoutes = Object.values(BLOG_POSTS).map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}`),
    lastModified: post.dateModified ? new Date(post.dateModified) : currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...coreRoutes, ...categoryRoutes, ...cityRoutes, ...blogRoutes]
}
