import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SkipToContent } from '@/components/layout/SkipToContent'
import { ToastProvider } from '@/components/ui/Toast'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, websiteSchema, BASE_URL } from '@/lib/seo'
import './globals.css'

/* ─── Fonts ─────────────────────────────────────────────── */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
})

/* ─── Metadata ──────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'CasaNova: Exceptional Properties',
    template: '%s | CasaNova',
  },
  description:
    'Discover exceptional properties through an immersive experience designed to help you find not just a house, but a home that fits your life.',
  keywords: ['luxury real estate', 'property discovery', 'homes', 'CasaNova'],
  authors: [{ name: 'Apex Code Studio' }],
  creator: 'Apex Code Studio',
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'CasaNova',
    title: 'CasaNova: Exceptional Properties',
    description:
      'Discover exceptional properties through an immersive experience designed to help you find not just a house, but a home that fits your life.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CasaNova: Exceptional Properties',
    description: 'Discover exceptional properties through an immersive experience.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/* ─── Root Layout ───────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ToastProvider>
          <JsonLd data={organizationSchema} />
          <JsonLd data={websiteSchema} />
          <SkipToContent />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
