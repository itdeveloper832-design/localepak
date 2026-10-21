import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LocalePak Administration Portal',
  description: 'LocalePak internal administrative dashboard for moderating business listings, verified professionals, and job submissions.',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
