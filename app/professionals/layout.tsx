import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professionals in Pakistan | Find Verified Experts | LocalePak',
  description: 'Find Pakistani professionals, consultants, specialists, and service experts by field and city on LocalePak.',
  alternates: { canonical: 'https://www.localepak.com/professionals/' },
  openGraph: {
    title: 'Professionals in Pakistan | Find Verified Experts | LocalePak',
    description: 'Find Pakistani professionals, consultants, specialists, and service experts by field and city on LocalePak.',
    url: 'https://www.localepak.com/professionals/',
    type: 'website',
  },
}

export default function ProfessionalsLayout({ children }: { children: React.ReactNode }) {
  return children
}
