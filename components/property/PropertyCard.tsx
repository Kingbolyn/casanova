'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Label, Caption } from '@/components/ui/Typography'
import { cn } from '@/lib/utils/cn'
import type { Property } from '@/lib/types'

interface PropertyCardProps {
  property:   Property
  className?: string
  priority?:  boolean
}

/* ─── Variants ───────────────────────────────────────────────────────────── */

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const card = {
  rest:  { y: 0,  transition: { duration: 0.4, ease } },
  hover: { y: -6, transition: { duration: 0.4, ease } },
}

const image = {
  rest:  { scale: 1,    transition: { duration: 0.7, ease } },
  hover: { scale: 1.06, transition: { duration: 0.7, ease } },
}

const overlay = {
  rest:  { opacity: 0, transition: { duration: 0.4, ease } },
  hover: { opacity: 1, transition: { duration: 0.4, ease } },
}

const price = {
  rest:  { opacity: 0, y: 10, transition: { duration: 0.35, ease } },
  hover: { opacity: 1, y: 0,  transition: { duration: 0.35, delay: 0.05, ease } },
}

const title = {
  rest:  { color: 'var(--color-text-primary)',   transition: { duration: 0.3 } },
  hover: { color: 'var(--color-text-secondary)', transition: { duration: 0.3 } },
}

/* ─── Component ──────────────────────────────────────────────────────────── */

function PropertyCard({ property, className, priority = false }: PropertyCardProps) {
  const { slug, title: name, tagline, priceLabel, location, media, features, status, type } = property

  const statusLabel: Record<Property['status'], string> = {
    'for-sale':   'For Sale',
    'for-rent':   'For Rent',
    'sold':       'Sold',
    'off-market': 'Off Market',
  }

  const statusVariant: Record<Property['status'], 'accent' | 'success' | 'default' | 'outline'> = {
    'for-sale':   'accent',
    'for-rent':   'accent',
    'sold':       'success',
    'off-market': 'outline',
  }

  return (
    <Link href={`/property/${slug}`} className={cn('block', className)}>
      <motion.article
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={card}
      >
        {/* ── Image container ── */}
        <div
          className="relative overflow-hidden rounded-[--radius-lg]"
          style={{ aspectRatio: '4 / 3' }}
        >
          {/* Parallax zoom on hover */}
          <motion.div
            className="absolute inset-0"
            style={{ position: 'absolute' }}
            variants={image}
          >
            <Image
              src={media.hero}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>

          {/* Dark overlay — reveals on hover */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }}
            variants={overlay}
          />

          {/* Status badge — always visible */}
          <div className="absolute top-4 left-4" style={{ zIndex: 2 }}>
            <Badge variant={statusVariant[status]}>
              {statusLabel[status]}
            </Badge>
          </div>

          {/* Price + location — slides up on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-5"
            style={{ zIndex: 2 }}
            variants={price}
          >
            <p
              className="font-display font-light"
              style={{
                fontSize: 'var(--type-h4)',
                color: 'var(--color-text-inverse)',
                lineHeight: 'var(--leading-none)',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              {priceLabel}
            </p>
            <p
              className="font-body mt-1"
              style={{
                fontSize: 'var(--type-small)',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              {location.neighbourhood}, {location.city}
            </p>
          </motion.div>
        </div>

        {/* ── Info ── */}
        <div className="mt-5 space-y-2">
          <motion.h3
            className="font-display font-light leading-snug"
            style={{
              fontSize: 'var(--type-h5)',
              letterSpacing: 'var(--tracking-tight)',
            }}
            variants={title}
          >
            {name}
          </motion.h3>

          <Caption color="tertiary">
            {location.neighbourhood}, {location.city}
          </Caption>

          <p
            className="font-body line-clamp-2"
            style={{
              fontSize: 'var(--type-small)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            {tagline}
          </p>

          {/* Specs */}
          <div
            className="flex items-center gap-5 pt-3 border-t"
            style={{ borderColor: 'var(--color-border-subtle)' }}
          >
            <Spec label="Bed"    value={features.bedrooms}  />
            <Spec label="Bath"   value={features.bathrooms} />
            <Spec label="Garage" value={features.garages}   />
            <Label className="ml-auto capitalize" color="tertiary">
              {type}
            </Label>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

function Spec({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="font-display font-light"
        style={{ fontSize: 'var(--type-h6)', color: 'var(--color-text-primary)' }}
      >
        {value}
      </span>
      <Label color="tertiary">{label}</Label>
    </div>
  )
}

export { PropertyCard }
export type { PropertyCardProps }
