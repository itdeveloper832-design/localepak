import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/client-providers'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: "Pakistan Business Directory, Jobs & Professionals | ListPak",
  description: "Find businesses, companies, jobs, services and professionals across Pakistan. Search by city and category or add your free business listing on ListPak.",
  metadataBase: new URL('https://www.listpak.com'),
  keywords: [
    'ListPak Pakistan',
    'Pakistan business directory',
    'free business listing Pakistan',
    'jobs in Pakistan',
    'Pakistani professionals',
    'verified companies Lahore Karachi Islamabad',
    'ListPak enterprise ecosystem'
  ],
  icons: {
    icon: [{ url: '/favicon.png', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: "Pakistan Business Directory, Jobs & Professionals | ListPak",
    description: "Find businesses, companies, jobs, services and professionals across Pakistan. Search by city and category or add your free business listing on ListPak.",
    url: 'https://www.listpak.com/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pakistan Business Directory, Jobs & Professionals | ListPak",
    description: "Find businesses, companies, jobs, services and professionals across Pakistan. Search by city and category or add your free business listing on ListPak.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ListPak',
    url: 'https://www.listpak.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.listpak.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ListPak',
    url: 'https://www.listpak.com/',
    logo: 'https://www.listpak.com/logo.png',
    telephone: '+92 334 5636230',
    email: 'admin@listpak.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 303, Evacuee Trust Complex, F-5/1',
      addressLocality: 'Islamabad',
      postalCode: '44000',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92 334 5636230',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['en', 'ur'],
    },
  }

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#FAFAFA] text-[#09090B] pb-16 md:pb-0 min-h-screen selection:bg-red-600 selection:text-white">
        {children}
        <ClientProviders />
      </body>
    </html>
  )
}
