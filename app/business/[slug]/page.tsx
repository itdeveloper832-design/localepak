import { Metadata } from 'next'
import BusinessDetailClient from '@/components/business-detail-client'
import SeedBusinessDetail from '@/components/seed-business-detail'
import { SEED_BUSINESSES, getSeedBusiness } from '@/lib/seed-businesses'

// Business detail route — two kinds of listings:
// 1. SEED listings (lib/seed-businesses.ts): directory-created pages for
//    91 real businesses. They are listed in generateStaticParams, so
//    they are prerendered to fully static HTML at build time — zero
//    Firestore reads and no ISR (this file sets no `revalidate`).
// 2. FIRESTORE listings (owner-added via the dashboard): any other slug
//    falls through (dynamicParams) to the original client component,
//    which loads the listing from Firestore exactly as before.

export const dynamicParams = true

export function generateStaticParams() {
  return SEED_BUSINESSES.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const seed = getSeedBusiness(slug)
  if (!seed) {
    // Firestore listing: the client component sets its own title/meta,
    // same as before this wrapper existed.
    return {}
  }
  const title = `${seed.name} — ${seed.category} in ${seed.city} | LocalePak`
  const canonical = `https://www.localepak.com/business/${seed.slug}/`
  return {
    title,
    description: seed.description,
    alternates: { canonical },
    openGraph: {
      title: `${seed.name} | LocalePak`,
      description: seed.description,
      url: canonical,
      siteName: 'LocalePak',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${seed.name} | LocalePak`,
      description: seed.description,
    },
  }
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const seed = getSeedBusiness(slug)
  if (seed) {
    return <SeedBusinessDetail business={seed} />
  }
  return <BusinessDetailClient />
}
