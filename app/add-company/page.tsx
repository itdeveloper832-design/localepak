import AddCompanyClient from './add-company-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register Hiring Company & HR Profile | LocalePak Pakistan',
  description: 'Create a verified hiring profile for your company on LocalePak. Post job openings, build employer branding, and discover top candidates across Pakistan.',
  alternates: { canonical: 'https://www.localepak.com/add-company/' },
  openGraph: {
    title: 'Register Hiring Company & HR Profile | LocalePak Pakistan',
    description: 'Create a verified hiring profile for your company on LocalePak. Post job openings, build employer branding, and discover top candidates across Pakistan.',
    url: 'https://www.localepak.com/add-company/',
    type: 'website',
  },
}

export default function AddCompanyPage() {
  return <AddCompanyClient />
}
