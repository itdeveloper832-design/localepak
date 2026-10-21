import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hiring Companies in Pakistan | Employer Directory | LocalePak',
  description: 'Discover hiring companies and employer profiles in Pakistan by industry and city on LocalePak.',
  alternates: { canonical: 'https://www.localepak.com/companies/' },
  openGraph: {
    title: 'Hiring Companies in Pakistan | Employer Directory | LocalePak',
    description: 'Discover hiring companies and employer profiles in Pakistan by industry and city on LocalePak.',
    url: 'https://www.localepak.com/companies/',
    type: 'website',
  },
}

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return children
}
