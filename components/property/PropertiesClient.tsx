'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PropertyFilters, DEFAULT_FILTERS, type FilterState } from '@/components/property/PropertyFilters'
import { FilterModal } from '@/components/property/FilterModal'
import { LocationDiscovery } from '@/components/sections/LocationDiscovery'
import { FadeIn } from '@/components/motion/FadeIn'
import { collections } from '@/lib/data/collections'
import type { Property } from '@/lib/types'

const PRICE_MAX = 25000000

interface PropertiesClientProps {
  properties: Property[]
}

/* ─── Conversational results summary ─────────────────────── */

function resultsSummary(total: number, filters: FilterState): string {
  if (total === 0) return ''

  const col = filters.collection !== 'all'
    ? collections.find((c) => c.slug === filters.collection)
    : null

  if (col) {
    return total === 1
      ? `1 ${col.name.toLowerCase()} residence available.`
      : `${total} ${col.name.toLowerCase()} homes available.`
  }

  if (filters.neighbourhood !== 'all') {
    return total === 1
      ? `1 exceptional residence in ${filters.neighbourhood}.`
      : `${total} exceptional residences in ${filters.neighbourhood}.`
  }

  if (filters.query.trim()) {
    return total === 1
      ? `1 residence matches your search.`
      : `${total} residences match your search.`
  }

  const adjectives = ['exceptional', 'remarkable', 'distinguished', 'curated']
  const adj = adjectives[total % adjectives.length]
  return total === 1
    ? `Showing 1 ${adj} residence.`
    : `Showing ${total} ${adj} residences.`
}

/* ─── Active filter count (for mobile badge) ─────────────── */

function activeFilterCount(f: FilterState): number {
  let n = 0
  if (f.query)              n++
  if (f.type !== 'all')     n++
  if (f.status !== 'all')   n++
  if (f.neighbourhood !== 'all') n++
  if (f.collection !== 'all')    n++
  if (f.bedrooms !== 'all') n++
  if (f.minPrice > 0 || f.maxPrice < PRICE_MAX) n++
  return n
}

/* ─── Component ──────────────────────────────────────────── */

function PropertiesClient({ properties }: PropertiesClientProps) {
  const [filters, setFilters]         = useState<FilterState>(DEFAULT_FILTERS)
  const [filterModalOpen, setModal]   = useState(false)

  const neighbourhoods = useMemo(() => {
    const set = new Set(properties.map((p) => p.location.neighbourhood))
    return Array.from(set).sort()
  }, [properties])

  /* Property count per neighbourhood (all properties, no filter applied) */
  const propertyCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    properties.forEach((p) => {
      counts[p.location.neighbourhood] = (counts[p.location.neighbourhood] ?? 0) + 1
    })
    return counts
  }, [properties])

  const filtered = useMemo(() => {
    let result = [...properties]

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

    if (filters.collection !== 'all') {
      const col = collections.find((c) => c.slug === filters.collection)
      if (col) result = result.filter((p) => col.properties.includes(p.id))
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= (filters.maxPrice >= PRICE_MAX ? Infinity : filters.maxPrice),
    )

    switch (filters.sort) {
      case 'price-asc':   result.sort((a, b) => a.price - b.price); break
      case 'price-desc':  result.sort((a, b) => b.price - a.price); break
      case 'largest':     result.sort((a, b) => b.features.squareFeet - a.features.squareFeet); break
      case 'exclusive':   result.sort((a, b) => b.price - a.price); break
      case 'newest':      result.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break
      case 'recommended': result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break
    }

    return result
  }, [filters, properties])

  const summary      = resultsSummary(filtered.length, filters)
  const filterCount  = activeFilterCount(filters)

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
              <m.div
                key={col.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
              >
                <button
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, collection: f.collection === col.slug ? 'all' : col.slug }))}
                  className="group block relative overflow-hidden w-full"
                  style={{
                    aspectRatio:   '3/2',
                    outline:       filters.collection === col.slug ? '2px solid var(--color-accent-base)' : 'none',
                    outlineOffset: '2px',
                    border:        'none',
                    padding:       0,
                    cursor:        'pointer',
                  }}
                  aria-pressed={filters.collection === col.slug}
                >
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    className="object-cover"
                    style={{ transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 p-3 md:p-4">
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: '#fff', fontWeight: 300, letterSpacing: 'var(--tracking-snug)' }}>
                      {col.name}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      {col.properties.length} {col.properties.length === 1 ? 'property' : 'properties'}
                    </p>
                  </div>
                  {filters.collection === col.slug && (
                    <div className="absolute top-3 right-3 flex items-center justify-center" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-accent-base)' }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  )}
                </button>
              </m.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Discovery section */}
      <Section spacing="lg" bg="default">
        <Container width="wide">

          {/* Location Discovery — above filters */}
          <div className="mb-10">
            <LocationDiscovery
              activeNeighbourhood={filters.neighbourhood}
              propertyCounts={propertyCounts}
              onSelect={(name) => setFilters((f) => ({ ...f, neighbourhood: name }))}
            />
          </div>

          {/* Desktop filters — hidden on mobile */}
          <div className="hidden md:block">
            <PropertyFilters
              total={filtered.length}
              filters={filters}
              onChange={setFilters}
              neighbourhoods={neighbourhoods}
            />
          </div>

          {/* Mobile — search + filter trigger */}
          <div className="md:hidden mb-4">
            {/* Search always visible */}
            <div className="relative mb-3">
              <svg
                className="absolute"
                style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
              >
                <circle cx="6.5" cy="6.5" r="5" stroke="var(--color-text-muted)" strokeWidth="1.2" />
                <path d="M10.5 10.5L14 14" stroke="var(--color-text-muted)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                placeholder="Search properties..."
                style={{
                  width:           '100%',
                  border:          '1px solid var(--color-border-base)',
                  borderRadius:    0,
                  backgroundColor: 'var(--color-surface-primary)',
                  color:           'var(--color-text-primary)',
                  fontFamily:      'var(--font-body)',
                  fontSize:        'var(--text-sm)',
                  padding:         '0.75rem 1rem 0.75rem 2.75rem',
                  outline:         'none',
                }}
                aria-label="Search properties"
              />
            </div>

            {/* Filter trigger button */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setModal(true)}
                className="flex items-center gap-2"
                style={{
                  border:          '1px solid var(--color-border-base)',
                  backgroundColor: filterCount > 0 ? 'var(--color-accent-base)' : 'var(--color-surface-primary)',
                  color:           filterCount > 0 ? '#fff' : 'var(--color-text-secondary)',
                  padding:         '0.625rem 1rem',
                  fontSize:        'var(--text-xs)',
                  letterSpacing:   'var(--tracking-widest)',
                  cursor:          'pointer',
                  fontFamily:      'var(--font-body)',
                }}
                aria-label={`Filter properties${filterCount > 0 ? `, ${filterCount} active` : ''}`}
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M1 1h12M3 5h8M5 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                FILTERS {filterCount > 0 && `(${filterCount})`}
              </button>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-text-primary)' }}>{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'residence' : 'residences'}
              </p>
            </div>
          </div>

          {/* Conversational summary */}
          <AnimatePresence mode="wait">
            {summary && (
              <m.p
                key={summary}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 hidden md:block"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--text-lg)',
                  fontWeight:    300,
                  fontStyle:     'italic',
                  color:         'var(--color-text-secondary)',
                  letterSpacing: 'var(--tracking-snug)',
                }}
              >
                {summary}
              </m.p>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <m.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center py-24"
              >
                <div
                  style={{ width: '48px', height: '48px', border: '1px solid var(--color-border-base)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="var(--color-text-muted)" strokeWidth="1.2" />
                    <path d="M12.5 12.5L16 16" stroke="var(--color-text-muted)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <Heading as={3} size="h4" className="mb-3">
                  We could not find a residence matching your current preferences.
                </Heading>
                <Body color="secondary" style={{ maxWidth: '40ch' }}>
                  Try broadening your search to discover additional properties within our portfolio.
                </Body>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-8"
                  style={{
                    background:    'none',
                    border:        '1px solid var(--color-border-base)',
                    padding:       '0.625rem 1.75rem',
                    fontSize:      'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    color:         'var(--color-text-secondary)',
                    cursor:        'pointer',
                  }}
                >
                  CLEAR ALL FILTERS
                </button>
              </m.div>
            ) : (
              <m.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-8"
              >
                <PropertyGrid properties={filtered} />
              </m.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      {/* Mobile filter modal */}
      <FilterModal
        open={filterModalOpen}
        onClose={() => setModal(false)}
        filters={filters}
        onChange={setFilters}
        neighbourhoods={neighbourhoods}
        total={filtered.length}
      />
    </>
  )
}

export { PropertiesClient }
