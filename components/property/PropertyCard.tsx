'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import type { Property } from '@/lib/types'
import { DUR, EASE } from '@/lib/motion'

interface PropertyCardProps {
  property:   Property
  className?: string
  priority?:  boolean
}

/* ─── Motion variants ────────────────────────────────────── */

const STD: [number,number,number,number] = EASE.standard
const ENT: [number,number,number,number] = EASE.entrance

const card = {
  rest:  { y: 0,  transition: { duration: DUR.micro,  ease: STD } },
  hover: { y: -4, transition: { duration: DUR.micro,  ease: ENT } },
}

const image = {
  rest:  { scale: 1,    transition: { duration: DUR.large, ease: STD } },
  hover: { scale: 1.04, transition: { duration: DUR.large, ease: ENT } },
}

/* Gradient subtly deepens on hover */
const veil = {
  rest:  { opacity: 1,    transition: { duration: DUR.standard, ease: STD } },
  hover: { opacity: 1.15, transition: { duration: DUR.standard, ease: ENT } },
}

/* ─── Component ──────────────────────────────────────────── */

function PropertyCard({ property, className, priority = false }: PropertyCardProps) {
  const { slug, title: name, priceLabel, location, media, features, status, type } = property

  const statusLabel: Record<Property['status'], string> = {
    'for-sale':    'For Sale',
    'for-rent':    'For Rent',
    'coming-soon': 'Coming Soon',
    'sold':        'Sold',
    'off-market':  'Off Market',
  }

  const statusVariant: Record<Property['status'], 'accent' | 'success' | 'default' | 'outline'> = {
    'for-sale':    'accent',
    'for-rent':    'accent',
    'coming-soon': 'outline',
    'sold':        'success',
    'off-market':  'outline',
  }

  return (
    <Link href={`/property/${slug}`} className={cn('block', className)}>
      <m.article
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={card}
      >
        {/* Full-bleed image — no white panel below */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '4 / 3', borderRadius: 'var(--radius-lg, 0px)' }}
        >
          {/* Image zoom on hover */}
          <m.div className="absolute inset-0" variants={image}>
            <Image
              src={media.hero}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          </m.div>

          {/* Permanent gradient veil — content always readable */}
          <m.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.12) 60%, transparent 100%)',
            }}
            variants={veil}
          />

          {/* Status badge — top left */}
          <div className="absolute top-4 left-4" style={{ zIndex: 2 }}>
            <Badge variant={statusVariant[status]}>
              {statusLabel[status]}
            </Badge>
          </div>

          {/* Price — top right */}
          <p
            className="absolute top-4 right-4 font-display font-light"
            style={{
              zIndex:        2,
              fontSize:      'var(--type-small)',
              color:         'var(--color-accent-base)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight:    1,
            }}
          >
            {priceLabel}
          </p>

          {/* Title + location + specs — always visible at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ padding: '0 18px 18px', zIndex: 2 }}
          >
            <p
              className="font-body"
              style={{
                fontSize:      'var(--type-caption)',
                color:         'rgba(255,255,255,0.5)',
                letterSpacing: 'var(--tracking-wide)',
                marginBottom:  '4px',
              }}
            >
              {location.neighbourhood} · {location.city}
            </p>

            <h3
              className="font-display font-light"
              style={{
                fontSize:      'var(--type-h5)',
                color:         '#fff',
                lineHeight:    1.2,
                letterSpacing: 'var(--tracking-tight)',
                marginBottom:  '12px',
              }}
            >
              {name}
            </h3>

            {/* Specs row */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <SpecOverlay label="BED"    value={features.bedrooms}  />
              <SpecOverlay label="BATH"   value={features.bathrooms} />
              <SpecOverlay label="GARAGE" value={features.garages}   />
              <span
                className="font-body"
                style={{
                  marginLeft:    'auto',
                  fontSize:      '8px',
                  letterSpacing: '0.14em',
                  color:         'rgba(255,255,255,0.45)',
                  paddingBottom: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {type}
              </span>
            </div>
          </div>
        </div>
      </m.article>
    </Link>
  )
}

function SpecOverlay({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '2px',
        paddingRight:  '14px',
        marginRight:   '14px',
        borderRight:   '1px solid rgba(255,255,255,0.18)',
      }}
    >
      <span
        className="font-display font-light"
        style={{ fontSize: 'var(--type-h6)', color: '#fff', lineHeight: 1 }}
      >
        {value}
      </span>
      <span
        className="font-body"
        style={{ fontSize: '7px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)' }}
      >
        {label}
      </span>
    </div>
  )
}

export { PropertyCard }
export type { PropertyCardProps }
