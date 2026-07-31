'use client'

import Link from 'next/link'
import Image from 'next/image'
import { m } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { neighbourhoods } from '@/lib/data/neighbourhoods'
import type { ExploreNearby as ExploreNearbyData } from '@/lib/data/neighbourhoods'

interface ExploreNearbyProps {
  nearby: ExploreNearbyData[]
}

export function ExploreNearby({ nearby }: ExploreNearbyProps) {
  if (nearby.length === 0) return null

  const cols = nearby.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'

  return (
    <Section spacing="lg" bg="default" aria-label="Explore nearby neighbourhoods">
      <Container width="wide">
        <FadeIn direction="up">
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '2.5rem',
            }}
          >
            Explore Nearby
          </p>
        </FadeIn>
        <div className={`grid ${cols} gap-6`}>
          {nearby.map((item, i) => {
            const full = neighbourhoods.find((n) => n.slug === item.slug)
            const image = full?.cardImage ?? ''
            return (
              <FadeIn key={item.slug} direction="up" delay={i * 0.1}>
                <NearbyCard slug={item.slug} name={item.name} city={item.city} image={image} count={nearby.length} />
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

function NearbyCard({
  slug, name, city, image, count,
}: {
  slug: string; name: string; city: string; image: string; count: number
}) {
  const sizes = count === 2
    ? '(max-width: 768px) 100vw, 50vw'
    : '(max-width: 768px) 100vw, 33vw'

  return (
    <Link
      href={`/neighbourhoods/${slug}`}
      aria-label={`Explore ${name}`}
      className="block relative overflow-hidden"
      style={{ aspectRatio: '16 / 9' }}
    >
      <m.div
        className="absolute inset-0"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes={sizes}
          quality={70}
          style={{ objectFit: 'cover' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.70) 100%)',
          }}
          aria-hidden="true"
        />
      </m.div>

      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.50)',
              marginBottom: '0.375rem',
            }}
          >
            {city}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h4)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.2,
            }}
          >
            {name}
          </p>
        </div>
        <m.span
          style={{ color: 'var(--color-accent-base)' }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <ArrowIcon />
        </m.span>
      </div>
    </Link>
  )
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
