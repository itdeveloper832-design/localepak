import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs in Pakistan 2026 – Latest Jobs in Karachi, Lahore & Islamabad | LocalePak',
  description: 'Find the latest jobs in Pakistan — call center, IT, marketing, data entry & remote jobs in Karachi, Lahore, Islamabad. New vacancies added daily. Apply free.',
  alternates: { canonical: 'https://www.localepak.com/jobs/' },
  openGraph: {
    title: 'Jobs in Pakistan 2026 – Latest Jobs in Karachi, Lahore & Islamabad | LocalePak',
    description: 'Find the latest jobs in Pakistan — call center, IT, marketing, data entry & remote jobs in Karachi, Lahore, Islamabad. New vacancies added daily. Apply free.',
    url: 'https://www.localepak.com/jobs/',
    type: 'website',
  },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
