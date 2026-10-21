import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact LocalePak | Pakistan Directory Support',
  description: 'Contact LocalePak for business listing support, reporting concerns, directory questions, and partnership enquiries.',
  alternates: { canonical: 'https://www.localepak.com/contact/' },
  openGraph: {
    title: 'Contact LocalePak | Pakistan Directory Support',
    description: 'Contact LocalePak for business listing support, reporting concerns, directory questions, and partnership enquiries.',
    url: 'https://www.localepak.com/contact/',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
