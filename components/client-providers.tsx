'use client'

import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import BottomNav from '@/components/bottom-nav'

// Deferred until after first paint: the toast system and the cookie banner
// are never needed for the initial render, so their JS should not be parsed
// during page load on every page. They load as soon as this provider mounts.
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster), {
  ssr: false,
})
const CookieConsentBanner = dynamic(
  () => import('@/components/cookie-consent-banner'),
  { ssr: false }
)

export default function ClientProviders() {
  return (
    <>
      <BottomNav />
      <CookieConsentBanner />
      <Toaster
        position="top-center"
        duration={5000}
        closeButton={true}
        richColors={true}
        expand={true}
        toastOptions={{
          duration: 5000,
          className: 'localepak-popup-toast',
        }}
      />
      <SpeedInsights />
      <Analytics />
    </>
  )
}
