'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PropertyFilters, DEFAULT_FILTERS, type FilterState } from '@/components/property/PropertyFilters'
import { FadeIn } from '@/components/motion/FadeIn'
import { collections } from '@/lib/data/collections'
import type { Property } from '@/lib/types'

interface PropertiesClientProps {
  properties: Property[]
}

function PropertiesClient({ properties }: PropertiesClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  /* Derive unique neighbourhood list from data */
  const neighbourhoods = useMemo(() => {
    const set = new Set(properties.map((p) => p.location.neighbourhood))
    return Array.from(set).sort()
  }, [properties])

  const filtered = useMemo(() => {
    let result = [...properties]

    /* Search — name, neighbourhood, city */
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.neighbourhood.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.address.toLowerCase().includes(q),
      )
    }

    if (filters.type !== 'all')          result = result.filter((p) => p.type === filters.type)
    if (filters.status !== 'all')        result = result.filter((p) => p.status === filters.status)
    if (filters.neighbourhood !== 'all') result = result.filter((p) => p.location.neighbourhood === filters.neighbourhood)
    if (filters.bedrooms !== 'all')      result = result.filter((p) => p.features.bedrooms >= (filters.bedrooms as number))
    result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)

    if (filters.sort === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (filters.sort === 'newest')     result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return result
  }, [filters, properties])

  return (
    <>
      {/* Collections rail */}
      <Section spacing="md" bg="white">
        <Container width="wide">
          <FadeIn direction="up">
            <Label className="block mb-6" style={{ letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)' }}>
              Curated Collections
            </Label>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/collections/${col.slug}`} className="group block relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-base)',
                        color: '#fff',
                        fontWeight: 300,
                        letterSpacing: 'var(--tracking-snug)',
                      }}
                    >
                      {col.name}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      {col.properties.length} {col.properties.length === 1 ? 'property' : 'properties'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Discovery section */}
      <Section spacing="lg" bg="default">
        <Container width="wide">
          <PropertyFilters
            total={filtered.length}
            filters={filters}
            onChange={setFilters}
            neighbourhoods={neighbourhoods}
          />

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center py-24"
              >
                <div
                  style={{
                    width: '48px', height: '48px', border: '1px solid var(--color-border-base)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="var(--color-text-muted)" strokeWidth="1.2" />
                    <path d="M12.5 12.5L16 16" stroke="var(--color-text-muted)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <Heading as={3} size="h4" className="mb-3">
                  No properties found
                </Heading>
                <Body color="secondary" style={{ maxWidth: '36ch' }}>
                  Try adjusting your search or clearing a filter to see more of our portfolio.
                </Body>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-6"
                  style={{
                    background: 'none',
                    border: '1px solid var(--color-border-base)',
                    padding: '0.625rem 1.5rem',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  CLEAR ALL FILTERS
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-10"
              >
                <PropertyGrid properties={filtered} />
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  )
}

export { PropertiesClient }
