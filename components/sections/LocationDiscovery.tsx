'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Label } from '@/components/ui/Typography'
import { neighbourhoods } from '@/lib/data/neighbourhoods'

interface LocationDiscoveryProps {
  activeNeighbourhood: string
  propertyCounts:      Record<string, number>
  onSelect:            (slug: string) => void
}

export function LocationDiscovery({ activeNeighbourhood, propertyCounts, onSelect }: LocationDiscoveryProps) {
  return (
    <section style={{ borderBottom: '1px solid var(--color-border-base)', paddingBottom: '2.5rem', marginBottom: '0' }}>
      <Label className="block mb-6" style={{ letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)' }}>
        Explore by Location
      </Label>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
      >
        {neighbourhoods.map((n, i) => {
          const count   = propertyCounts[n.name] ?? 0
          const active  = activeNeighbourhood === n.name
          if (count === 0) return null

          return (
            <motion.button
              key={n.slug}
              type="button"
              onClick={() => onSelect(active ? 'all' : n.name)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
              className="group text-left"
              style={{
                position:    'relative',
                overflow:    'hidden',
                aspectRatio: '4/3',
                border:      active ? '2px solid var(--color-accent-base)' : '1px solid transparent',
                outline:     'none',
                cursor:      'pointer',
                padding:     0,
                background:  'none',
                display:     'block',
                width:       '100%',
              }}
              aria-pressed={active}
              aria-label={`${active ? 'Remove' : 'Browse'} ${n.name} filter`}
            >
              {/* Image */}
              <Image
                src={n.heroImage}
                alt={n.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                style={{ transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }}
              />

              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }}
                aria-hidden="true"
              />

              {/* Active indicator */}
              {active && (
                <div
                  className="absolute top-3 right-3 flex items-center justify-center"
                  style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-accent-base)' }}
                  aria-hidden="true"
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p
                  style={{
                    fontSize:      'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    color:         'rgba(255,255,255,0.45)',
                    marginBottom:  '4px',
                    fontFamily:    'var(--font-body)',
                  }}
                >
                  {n.city.toUpperCase()}
                </p>
                <p
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'var(--text-lg)',
                    color:         '#fff',
                    fontWeight:    300,
                    letterSpacing: 'var(--tracking-snug)',
                    lineHeight:    1.2,
                    marginBottom:  '8px',
                  }}
                >
                  {n.name}
                </p>

                {/* Lifestyle highlights */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {n.lifestyle.slice(0, 2).map((l) => (
                    <span
                      key={l}
                      style={{
                        fontSize:        'var(--text-xs)',
                        color:           'rgba(255,255,255,0.55)',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        border:          '1px solid rgba(255,255,255,0.12)',
                        padding:         '2px 8px',
                        letterSpacing:   'var(--tracking-wide)',
                        fontFamily:      'var(--font-body)',
                      }}
                    >
                      {l}
                    </span>
                  ))}
                </div>

                {/* Count + style */}
                <div className="flex items-center justify-between">
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-base)', letterSpacing: 'var(--tracking-wide)', fontFamily: 'var(--font-body)' }}>
                    {count} {count === 1 ? 'residence' : 'residences'}
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.3)', letterSpacing: 'var(--tracking-wide)', fontFamily: 'var(--font-body)' }}>
                    {n.architecturalStyle}
                  </p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
