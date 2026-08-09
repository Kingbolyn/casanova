import type { NextConfig } from 'next'

/* ─── Security Headers ──────────────────────────────────────────────────── */

// Content-Security-Policy directives:
//   script-src  'unsafe-inline' — required: Next.js injects inline hydration scripts
//   style-src   'unsafe-inline' — required: Tailwind v4 + inline style props
//   img-src     data:           — Next.js generates base64 blur placeholders
//   img-src     https://images.unsplash.com — all property and neighbourhood imagery
//   frame-src   https://www.openstreetmap.org — PropertyMap OSM iframe (TASK-016)
//   connect-src 'self'          — fetch() calls to /api/contact and /api/enquiry
//
// Upgrade path: replace 'unsafe-inline' for scripts with nonce-based CSP
// in V1.1 when a nonce middleware is added. Style unsafe-inline is harder to
// remove with Tailwind and remains acceptable at this scale.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.unsplash.com",
  "frame-src https://www.openstreetmap.org",
  "connect-src 'self'",
  "font-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy',  value: csp },
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

/* ─── Config ─────────────────────────────────────────────────────────────── */

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 90],
    deviceSizes: [375, 480, 640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  compress: true,

  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
