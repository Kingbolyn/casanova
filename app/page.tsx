import type { Metadata } from 'next'
import { HeroSection }         from '@/components/sections/HeroSection'
import { FeaturedProperties }  from '@/components/sections/FeaturedProperties'
import { CollectionsSection }  from '@/components/sections/CollectionsSection'
import { ImmersiveMedia }      from '@/components/sections/ImmersiveMedia'
import { StatsSection }        from '@/components/sections/StatsSection'
import { NeighbourhoodSection } from '@/components/sections/NeighbourhoodSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CompanyIntro }        from '@/components/sections/CompanyIntro'
import { CtaSection }          from '@/components/sections/CtaSection'

export const metadata: Metadata = {
  title: 'CasaNova: Exceptional Properties',
  description:
    'Discover exceptional properties through an immersive experience designed to help you find not just a house, but a home that fits your life.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'CasaNova: Exceptional Properties',
    description:
      'Discover exceptional properties through an immersive experience designed to help you find not just a house, but a home that fits your life.',
    images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', width: 1200, height: 800, alt: 'CasaNova — Exceptional Properties' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CasaNova: Exceptional Properties',
    description: 'Property discovery begins with emotion, not transaction.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <CollectionsSection />
      <ImmersiveMedia />
      <StatsSection />
      <NeighbourhoodSection />
      <TestimonialsSection />
      <CompanyIntro />
      <CtaSection />
    </>
  )
}
