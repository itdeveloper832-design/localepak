/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  compress: true,
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      'recharts',
      'date-fns',
    ],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      {
        pathname: '/api/**',
      },
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.imrandigitals.com',
      },
      {
        protocol: 'https',
        hostname: 'imrandigitals.com',
      },
    ],
  },

  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return []
    }
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/((?!_next|api).*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Blog posts removed 2026-10-23 (content audit) — send readers to the closest surviving post
      { source: '/blog/restaurants-in-pakistan', destination: '/blog/restaurants-in-karachi/', permanent: true },
      { source: '/blog/restaurants-in-pakistan/', destination: '/blog/restaurants-in-karachi/', permanent: true },
      { source: '/blog/jobs-in-pakistan', destination: '/blog/how-to-find-jobs-in-pakistan-2026/', permanent: true },
      { source: '/blog/jobs-in-pakistan/', destination: '/blog/how-to-find-jobs-in-pakistan-2026/', permanent: true },
      { source: '/blog/free-job-posting-pakistan-hire-employees', destination: '/blog/how-to-find-jobs-in-pakistan-2026/', permanent: true },
      { source: '/blog/free-job-posting-pakistan-hire-employees/', destination: '/blog/how-to-find-jobs-in-pakistan-2026/', permanent: true },
      { source: '/blog/how-to-find-trusted-professionals-pakistan', destination: '/blog/local-services-pakistan-by-city/', permanent: true },
      { source: '/blog/how-to-find-trusted-professionals-pakistan/', destination: '/blog/local-services-pakistan-by-city/', permanent: true },
    ]
  },

}

export default nextConfig
