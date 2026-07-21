'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DualRangeSlider } from '@/components/ui/DualRangeSlider'
import type { PropertyType, PropertyStatus } from '@/lib/types'

/* ─── Types ─────────────────────────────────────────────── */

export type SortOption = 'recommended' | 'newest' | 'price-asc' | 'price-desc' | 'largest' | 'exclusive'

export interface FilterState {
  query:         string
  type:          PropertyType | 'all'
  status:        PropertyStatus | 'all'
  neighbourhood: string
  collection:    string
  bedrooms:      number | 'all'
  minPrice:      number
  maxPrice:      number
  sort:          SortOption
}

export const DEFAULT_FILTERS: FilterState = {
  query:         '',
  type:          'all',
  status:        'all',
  neighbourhood: 'all',
  collection:    'all',
  bedrooms:      'all',
  minPrice:      0,
  maxPrice:      25000000,
  sort:          'recommended',
}

const PRICE_MAX = 25000000

/* ─── Constants ─────────────────────────────────────────── */

const TYPES: { value: PropertyType | 'all'; label: string }[] = [
  { value: 'all',       label: 'All Types' },
  { value: 'villa',     label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'mansion',   label: 'Mansion' },
  { value: 'duplex',    label: 'Duplex' },
  { value: 'townhouse', label: 'Townhouse' },
]

const STATUSES: { value: PropertyStatus | 'all'; label: string }[] = [
  { value: 'all',          label: 'All' },
  { value: 'for-sale',     label: 'For Sale' },
  { value: 'for-rent',     label: 'For Rent' },
  { value: 'coming-soon',  label: 'Coming Soon' },
  { value: 'sold',         label: 'Sold' },
]

const BEDROOM_OPTIONS = ['all', 1, 2, 3, 4, 5] as const

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest',      label: 'Newest' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
  { value: 'largest',     label: 'Largest Living Space' },
  { value: 'exclusive',   label: 'Most Exclusive' },
]

const COLLECTIONS = [
  { value: 'all',               label: 'All Collections' },
  { value: 'waterfront',        label: 'Waterfront' },
  { value: 'sky-residences',    label: 'Sky Residences' },
  { value: 'garden-estates',    label: 'Garden Estates' },
  { value: 'city-residences',   label: 'City Residences' },
]

/* ─── Shared select style ────────────────────────────────── */

const selectStyle: React.CSSProperties = {
  appearance:         'none',
  border:             '1px solid var(--color-border-base)',
  borderRadius:       0,
  backgroundColor:    'var(--color-surface-primary)',
  color:              'var(--color-text-primary)',
  fontFamily:         'var(--font-body)',
  fontSize:           'var(--text-xs)',
  letterSpacing:      'var(--tracking-wide)',
  padding:            '0.625rem 2.25rem 0.625rem 0.875rem',
  cursor:             'pointer',
  backgroundImage:    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23999' d='M5 7L1 3h8z'/%3E%3C/svg%3E")`,
  backgroundRepeat:   'no-repeat',
  backgroundPosition: 'right 0.625rem center',
  minWidth:           '140px',
}

/* ─── Searchable neighbourhood dropdown ─────────────────── */

function NeighbourhoodSelect({
  value,
  options,
  onChange,
}: {
  value:    string
  options:  string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen]     = useState(false)
  const [query, setQuery]   = useState('')
  const ref                 = useRef<HTMLDivElement>(null)

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
  const label    = value === 'all' ? 'All Neighbourhoods' : value

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: '160px' }}>
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setQuery('') }}
        style={{
          ...selectStyle,
          display:    'flex',
          alignItems: 'center',
          width:      '100%',
          background: `var(--color-surface-primary) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23999' d='M5 7L1 3h8z'/%3E%3C/svg%3E") no-repeat right 0.625rem center`,
          border:     '1px solid var(--color-border-base)',
          cursor:     'pointer',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position:        'absolute',
              top:             'calc(100% + 4px)',
              left:            0,
              right:           0,
              zIndex:          50,
              backgroundColor: 'var(--color-surface-primary)',
              border:          '1px solid var(--color-border-base)',
              boxShadow:       '0 8px 24px rgba(0,0,0,0.08)',
              maxHeight:       '240px',
              overflow:        'hidden',
              display:         'flex',
              flexDirection:   'column',
            }}
          >
            {options.length > 5 && (
              <div style={{ padding: '8px', borderBottom: '1px solid var(--color-border-base)' }}>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                  style={{
                    width:           '100%',
                    border:          '1px solid var(--color-border-base)',
                    backgroundColor: 'var(--color-surface-secondary)',
                    color:           'var(--color-text-primary)',
                    fontFamily:      'var(--font-body)',
                    fontSize:        'var(--text-xs)',
                    padding:         '0.375rem 0.625rem',
                    outline:         'none',
                    borderRadius:    0,
                  }}
                />
              </div>
            )}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <button
                type="button"
                onClick={() => { onChange('all'); setOpen(false) }}
                style={{
                  display:         'block',
                  width:           '100%',
                  textAlign:       'left',
                  padding:         '0.5rem 0.875rem',
                  fontSize:        'var(--text-xs)',
                  letterSpacing:   'var(--tracking-wide)',
                  fontFamily:      'var(--font-body)',
                  color:           value === 'all' ? 'var(--color-accent-base)' : 'var(--color-text-primary)',
                  backgroundColor: 'transparent',
                  border:          'none',
                  cursor:          'pointer',
                }}
              >
                All Neighbourhoods
              </button>
              {filtered.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => { onChange(n); setOpen(false) }}
                  style={{
                    display:         'block',
                    width:           '100%',
                    textAlign:       'left',
                    padding:         '0.5rem 0.875rem',
                    fontSize:        'var(--text-xs)',
                    letterSpacing:   'var(--tracking-wide)',
                    fontFamily:      'var(--font-body)',
                    color:           value === n ? 'var(--color-accent-base)' : 'var(--color-text-primary)',
                    backgroundColor: 'transparent',
                    border:          'none',
                    cursor:          'pointer',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Price panel ────────────────────────────────────────── */

function PricePanel({
  minPrice,
  maxPrice,
  onChange,
}: {
  minPrice: number
  maxPrice: number
  onChange: (min: number, max: number) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const label =
    minPrice === 0 && maxPrice >= PRICE_MAX
      ? 'Any Price'
      : minPrice === 0
      ? `Under $${(maxPrice / 1000000).toFixed(0)}M`
      : maxPrice >= PRICE_MAX
      ? `$${(minPrice / 1000000).toFixed(0)}M+`
      : `$${(minPrice / 1000000).toFixed(0)}M — $${(maxPrice / 1000000).toFixed(0)}M`

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: '150px' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          ...selectStyle,
          display:    'flex',
          alignItems: 'center',
          width:      '100%',
          background: `var(--color-surface-primary) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23999' d='M5 7L1 3h8z'/%3E%3C/svg%3E") no-repeat right 0.625rem center`,
          border:     '1px solid var(--color-border-base)',
          cursor:     'pointer',
        }}
      >
        <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position:        'absolute',
              top:             'calc(100% + 4px)',
              left:            0,
              zIndex:          50,
              backgroundColor: 'var(--color-surface-primary)',
              border:          '1px solid var(--color-border-base)',
              boxShadow:       '0 8px 24px rgba(0,0,0,0.08)',
              padding:         '1.25rem',
              minWidth:        '280px',
            }}
          >
            <DualRangeSlider
              min={0}
              max={PRICE_MAX}
              step={500000}
              value={[minPrice, maxPrice]}
              onChange={([lo, hi]) => onChange(lo, hi)}
              format={(v) => `$${(v / 1000000).toFixed(1)}M`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────── */

interface PropertyFiltersProps {
  total:          number
  filters:        FilterState
  onChange:       (filters: FilterState) => void
  neighbourhoods: string[]
}

export function PropertyFilters({ total, filters, onChange, neighbourhoods }: PropertyFiltersProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value })

  const hasActiveFilters =
    filters.query !== '' ||
    filters.type !== 'all' ||
    filters.status !== 'all' ||
    filters.neighbourhood !== 'all' ||
    filters.collection !== 'all' ||
    filters.bedrooms !== 'all' ||
    filters.minPrice !== 0 ||
    filters.maxPrice < PRICE_MAX

  const activeChips: { label: string; onRemove: () => void }[] = []
  if (filters.query)                          activeChips.push({ label: `"${filters.query}"`,                                                              onRemove: () => set('query', '') })
  if (filters.type !== 'all')                 activeChips.push({ label: TYPES.find((t) => t.value === filters.type)?.label ?? filters.type,                onRemove: () => set('type', 'all') })
  if (filters.status !== 'all')               activeChips.push({ label: STATUSES.find((s) => s.value === filters.status)?.label ?? filters.status,         onRemove: () => set('status', 'all') })
  if (filters.neighbourhood !== 'all')        activeChips.push({ label: filters.neighbourhood,                                                              onRemove: () => set('neighbourhood', 'all') })
  if (filters.collection !== 'all')           activeChips.push({ label: COLLECTIONS.find((c) => c.value === filters.collection)?.label ?? filters.collection, onRemove: () => set('collection', 'all') })
  if (filters.bedrooms !== 'all')             activeChips.push({ label: `${filters.bedrooms}+ Bedrooms`,                                                   onRemove: () => set('bedrooms', 'all') })
  if (filters.minPrice > 0 || filters.maxPrice < PRICE_MAX) {
    const label =
      filters.minPrice === 0 ? `Under $${(filters.maxPrice / 1000000).toFixed(0)}M`
      : filters.maxPrice >= PRICE_MAX ? `$${(filters.minPrice / 1000000).toFixed(0)}M+`
      : `$${(filters.minPrice / 1000000).toFixed(0)}M — $${(filters.maxPrice / 1000000).toFixed(0)}M`
    activeChips.push({ label, onRemove: () => onChange({ ...filters, minPrice: 0, maxPrice: PRICE_MAX }) })
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6" style={{ borderBottom: '1px solid var(--color-border-base)', paddingBottom: '1.5rem' }}>
        <div className="relative">
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
            onChange={(e) => set('query', e.target.value)}
            placeholder="Search by name, neighbourhood, or city..."
            style={{
              width:           '100%',
              border:          '1px solid var(--color-border-base)',
              borderRadius:    0,
              backgroundColor: 'var(--color-surface-primary)',
              color:           'var(--color-text-primary)',
              fontFamily:      'var(--font-body)',
              fontSize:        'var(--text-sm)',
              padding:         '0.875rem 1rem 0.875rem 2.75rem',
              outline:         'none',
            }}
            aria-label="Search properties"
          />
          {filters.query && (
            <button
              onClick={() => set('query', '')}
              className="absolute"
              style={{ right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', lineHeight: 1, fontSize: '1.25rem' }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Property Type — pill strip */}
      <div className="mb-6" style={{ borderBottom: '1px solid var(--color-border-base)', paddingBottom: '1.5rem' }}>
        <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
          PROPERTY TYPE
        </p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => set('type', t.value)}
              style={{
                padding:         '0.375rem 0.875rem',
                fontSize:        'var(--text-xs)',
                letterSpacing:   'var(--tracking-wide)',
                fontFamily:      'var(--font-body)',
                border:          `1px solid ${filters.type === t.value ? 'var(--color-accent-base)' : 'var(--color-border-base)'}`,
                backgroundColor: filters.type === t.value ? 'var(--color-accent-base)' : 'transparent',
                color:           filters.type === t.value ? '#fff' : 'var(--color-text-secondary)',
                cursor:          'pointer',
                transition:      'all 0.15s',
                borderRadius:    0,
              }}
              aria-pressed={filters.type === t.value}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms — segmented control */}
      <div className="mb-6" style={{ borderBottom: '1px solid var(--color-border-base)', paddingBottom: '1.5rem' }}>
        <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
          BEDROOMS
        </p>
        <div className="flex" style={{ border: '1px solid var(--color-border-base)', display: 'inline-flex' }}>
          {BEDROOM_OPTIONS.map((b, i) => (
            <button
              key={String(b)}
              type="button"
              onClick={() => set('bedrooms', b)}
              style={{
                padding:         '0.4rem 0.875rem',
                fontSize:        'var(--text-xs)',
                letterSpacing:   'var(--tracking-wide)',
                fontFamily:      'var(--font-body)',
                border:          'none',
                borderLeft:      i > 0 ? '1px solid var(--color-border-base)' : 'none',
                backgroundColor: filters.bedrooms === b ? 'var(--color-accent-base)' : 'transparent',
                color:           filters.bedrooms === b ? '#fff' : 'var(--color-text-secondary)',
                cursor:          'pointer',
                transition:      'all 0.15s',
              }}
              aria-pressed={filters.bedrooms === b}
            >
              {b === 'all' ? 'Any' : `${b}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Second row — dropdowns */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5"
        style={{ borderBottom: '1px solid var(--color-border-base)' }}
      >
        {/* Result count + clear */}
        <div className="flex items-center gap-4 shrink-0">
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{total}</span>{' '}
            {total === 1 ? 'residence' : 'residences'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => onChange(DEFAULT_FILTERS)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--color-accent-base)', textDecoration: 'underline', textUnderlineOffset: '3px', padding: 0 }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Availability */}
          <select
            value={filters.status}
            onChange={(e) => set('status', e.target.value as FilterState['status'])}
            style={selectStyle}
            aria-label="Filter by availability"
          >
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          {/* Neighbourhood */}
          <NeighbourhoodSelect
            value={filters.neighbourhood}
            options={neighbourhoods}
            onChange={(v) => set('neighbourhood', v)}
          />

          {/* Collection */}
          <select
            value={filters.collection}
            onChange={(e) => set('collection', e.target.value)}
            style={selectStyle}
            aria-label="Filter by collection"
          >
            {COLLECTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>

          {/* Price */}
          <PricePanel
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onChange={(min, max) => onChange({ ...filters, minPrice: min, maxPrice: max })}
          />

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => set('sort', e.target.value as SortOption)}
            style={selectStyle}
            aria-label="Sort properties"
          >
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      <AnimatePresence>
        {activeChips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2 pt-4 overflow-hidden"
          >
            {activeChips.map((chip) => (
              <motion.span
                key={chip.label}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2"
                style={{
                  border:          '1px solid var(--color-border-base)',
                  padding:         '0.25rem 0.625rem',
                  fontSize:        'var(--text-xs)',
                  letterSpacing:   'var(--tracking-wide)',
                  color:           'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-surface-secondary)',
                }}
              >
                {chip.label}
                <button
                  onClick={chip.onRemove}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', lineHeight: 1, padding: 0, fontSize: '0.9em' }}
                  aria-label={`Remove ${chip.label} filter`}
                >
                  ×
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
