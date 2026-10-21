import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register an Account | LocalePak',
  description: 'Create a free LocalePak account to publish and manage business listings, post job openings, and access dashboard analytics.',
  robots: { index: false, follow: false },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
