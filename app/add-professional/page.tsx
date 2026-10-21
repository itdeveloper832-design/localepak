import AddProfessionalClient from './add-professional-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Free Professional Profile | LocalePak Pakistan',
  description: 'Create your public professional profile on LocalePak. Showcase your portfolio, skills, experience, and get discovered by clients across Pakistan and Google Search.',
  alternates: { canonical: 'https://www.localepak.com/add-professional/' },
  openGraph: {
    title: 'Create Free Professional Profile | LocalePak Pakistan',
    description: 'Create your public professional profile on LocalePak. Showcase your portfolio, skills, experience, and get discovered by clients across Pakistan and Google Search.',
    url: 'https://www.localepak.com/add-professional/',
    type: 'website',
  },
}

export default function AddProfessionalPage() {
  return <AddProfessionalClient />
}
