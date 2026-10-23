import { Metadata } from 'next'
import BusinessDetailClient from '@/components/business-detail-client'
import SeedBusinessDetail from '@/components/seed-business-detail'
import { SEED_BUSINESSES, getSeedBusiness } from '@/lib/seed-businesses'
import { fetchBusinessBySlug } from '@/lib/public-listings'
import { isReleased, releaseDateLabel } from '@/lib/release'

// Business detail route — two kinds of listings:
// 1. SEED listings (lib/seed-businesses.ts): directory-created pages for
//    91 real businesses. They are listed in generateStaticParams, so
//    they are prerendered to fully static HTML at build time — zero
//    Firestore reads and no ISR (this file sets no `revalidate`).
// 2. FIRESTORE listings (owner-added via the dashboard): any other slug
//    falls through (dynamicParams) to the client component — but since
//    Round 3 the listing itself is fetched HERE, on the server, and
//    handed to the client island as props: the profile renders into
//    the initial HTML and the browser makes no Firestore read for it.
//    Only the interactive parts (reviews) still run client-side.
//
//    Note the public URL now reflects PUBLIC visibility only: the
//    server reads anonymously, so a Firestore listing appears here
//    exactly when a visitor could see it — status 'approved' and past
//    its weekly release boundary. Owners manage pending listings from
//    their dashboard; admins from the admin panel.

export const dynamicParams = true

// A newly approved/released listing should appear without a rebuild.
export const revalidate = 3600

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

  const found = await fetchBusinessBySlug(slug)
  let initialBusiness: any = null
  let initialUnreleased: { name: string; releaseLabel: string } | null = null
  if (found && found.data?.status === 'approved') {
    // Weekly batch release (lib/release.ts): an approved business
    // stays hidden until the next 7-day cycle boundary passes.
    if (!isReleased(found.data.approvedAt, Date.now())) {
      initialUnreleased = {
        name: found.data.name || 'This business',
        releaseLabel: releaseDateLabel(Date.now()),
      }
    } else {
      initialBusiness = { id: found.id, ...found.data }
    }
  }
  // Anything else (missing slug, non-approved status, denied read)
  // renders the same "Business not found" state visitors got before.
  return (
    <BusinessDetailClient
      slug={slug}
      initialBusiness={initialBusiness}
      initialUnreleased={initialUnreleased}
    />
  )
}
