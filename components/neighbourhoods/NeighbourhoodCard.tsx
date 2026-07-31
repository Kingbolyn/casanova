'use client'

import Link from 'next/link'
import Image from 'next/image'
import { m } from 'framer-motion'
import type { Neighbourhood } from '@/lib/data/neighbourhoods'

interface NeighbourhoodCardProps {
  neighbourhood: Neighbourhood
  index:         number
}

export function NeighbourhoodCard({ neighbourhood: n, index }: NeighbourhoodCardProps) {
  return (
    <FadeInCard delay={index * 0.08}>
      <Link
        href={`/neighbourhoods/${n.slug}`}
        aria-label={`Explore ${n.name}, ${n.city}, ${n.tagline}`}
        className="block relative overflow-hidden"
        style={{ aspectRatio: '3 / 4' }}
      >
        <m.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={n.cardImage}
            alt={n.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            quality={75}
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

        <m.div
          className="absolute bottom-0 left-0 right-0 p-6"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.50)',
              marginBottom: '0.5rem',
            }}
            aria-hidden="true"
          >
            {n.city}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h4)',
              fontWeight: 300,
              color: '#ffffff',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
            }}
          >
            {n.name}
          </h2>
          <p
            className="hidden md:block"
            style={{
              fontSize: 'var(--text-sm)',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '0.75rem',
              lineHeight: 1.5,
            }}
          >
            {n.tagline}
          </p>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-wide)',
              color: 'var(--color-accent-base)',
            }}
          >
            {n.atAGlance.propertyCount} {n.atAGlance.propertyCount === 1 ? 'Home' : 'Homes'} Available
          </p>
        </m.div>
      </Link>
    </FadeInCard>
  )
}

function FadeInCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  )
}
