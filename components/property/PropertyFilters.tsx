'use client'

import type { PropertyType, PropertyStatus } from '@/lib/types'

export interface FilterState {
  query:        string
  type:         PropertyType | 'all'
  status:       PropertyStatus | 'all'
  neighbourhood: string
  bedrooms:     number | 'all'
  minPrice:     number
  maxPrice:     number
  sort:         'newest' | 'price-asc' | 'price-desc'
}

export const DEFAULT_FILTERS: FilterState = {
  query:         '',
  type:          'all',
  status:        'all',
  neighbourhood: 'all',
  bedrooms:      'all',
  minPrice:      0,
  maxPrice:      Infinity,
  sort:          'newest',
}

interface PropertyFiltersProps {
  total:         number
  filters:       FilterState
  onChange:      (filters: FilterState) => void
  neighbourhoods: string[]
}

const TYPES: { value: PropertyType | 'all'; label: string }[] = [
  { value: 'all',       label: 'All Types' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'villa',     label: 'Villa' },
  { value: 'house',     label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Townhouse' },
]

const BEDROOMS = [
  { value: 'all', label: 'Any Bedrooms' },
  { value: 1,     label: '1+' },
  { value: 2,     label: '2+' },
  { value: 3,     label: '3+' },
  { value: 4,     label: '4+' },
  { value: 5,     label: '5+' },
]

const PRICE_RANGES = [
  { label: 'Any Price',        min: 0,        max: Infinity },
  { label: 'Under $1M',        min: 0,        max: 1000000 },
  { label: '$1M — $3M',        min: 1000000,  max: 3000000 },
  { label: '$3M — $6M',        min: 3000000,  max: 6000000 },
  { label: '$6M — $10M',       min: 6000000,  max: 10000000 },
  { label: '$10M+',            min: 10000000, max: Infinity },
]

const SORTS = [
  { value: 'newest',     label: 'Newest' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

const selectStyle: React.CSSProperties = {
  appearance:          'none',
  border:              '1px solid var(--color-border-base)',
  borderRadius:        0,
  backgroundColor:     'var(--color-surface-primary)',
  color:               'var(--color-text-primary)',
  fontFamily:          'var(--font-body)',
  fontSize:            'var(--text-xs)',
  letterSpacing:       'var(--tracking-wide)',
  padding:             '0.625rem 2.25rem 0.625rem 0.875rem',
  cursor:              'pointer',
  backgroundImage:     `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23999' d='M5 7L1 3h8z'/%3E%3C/svg%3E")`,
  backgroundRepeat:    'no-repeat',
  backgroundPosition:  'right 0.625rem center',
  minWidth:            '140px',
}

export function PropertyFilters({ total, filters, onChange, neighbourhoods }: PropertyFiltersProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value })

  const currentPriceRange = PRICE_RANGES.find(
    (r) => r.min === filters.minPrice && r.max === filters.maxPrice,
  ) ?? PRICE_RANGES[0]

  const hasActiveFilters =
    filters.query !== '' ||
    filters.type !== 'all' ||
    filters.status !== 'all' ||
    filters.neighbourhood !== 'all' ||
    filters.bedrooms !== 'all' ||
    filters.minPrice !== 0 ||
    filters.maxPrice !== Infinity

  return (
    <div>
      {/* Search */}
      <div
        className="relative mb-6"
        style={{ borderBottom: '1px solid var(--color-border-base)', paddingBottom: '1.5rem' }}
      >
        <div className="relative">
          <svg
            className="absolute"
            style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            aria-hidden="true"
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="var(--color-text-muted)" strokeWidth="1.2" />
            <path d="M10.5 10.5L14 14" stroke="var(--color-text-muted)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={filters.query}
            onChange={(e) => set('query', e.target.value)}
            placeholder="Search by name or location..."
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
              style={{
                right: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-text-muted)', lineHeight: 1,
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filter row */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5"
        style={{ borderBottom: '1px solid var(--color-border-base)' }}
      >
        {/* Count + clear */}
        <div className="flex items-center gap-4">
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{total}</span>{' '}
            {total === 1 ? 'property' : 'properties'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => onChange(DEFAULT_FILTERS)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)',
                color: 'var(--color-accent-base)', textDecoration: 'underline',
                textUnderlineOffset: '3px', padding: 0,
              }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filters.type}
            onChange={(e) => set('type', e.target.value as FilterState['type'])}
            style={selectStyle}
            aria-label="Filter by property type"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => set('status', e.target.value as FilterState['status'])}
            style={selectStyle}
            aria-label="Filter by availability"
          >
            <option value="all">All Status</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>

          <select
            value={filters.neighbourhood}
            onChange={(e) => set('neighbourhood', e.target.value)}
            style={selectStyle}
            aria-label="Filter by neighbourhood"
          >
            <option value="all">All Neighbourhoods</option>
            {neighbourhoods.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          <select
            value={String(filters.bedrooms)}
            onChange={(e) => set('bedrooms', e.target.value === 'all' ? 'all' : Number(e.target.value) as FilterState['bedrooms'])}
            style={selectStyle}
            aria-label="Filter by bedrooms"
          >
            {BEDROOMS.map((b) => (
              <option key={String(b.value)} value={String(b.value)}>{b.label}</option>
            ))}
          </select>

          <select
            value={`${currentPriceRange.min}|${currentPriceRange.max}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('|').map((v) => v === 'Infinity' ? Infinity : Number(v))
              onChange({ ...filters, minPrice: min, maxPrice: max })
            }}
            style={selectStyle}
            aria-label="Filter by price range"
          >
            {PRICE_RANGES.map((r) => (
              <option key={r.label} value={`${r.min}|${r.max}`}>{r.label}</option>
            ))}
          </select>

          <select
            value={filters.sort}
            onChange={(e) => set('sort', e.target.value as FilterState['sort'])}
            style={selectStyle}
            aria-label="Sort properties"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-4">
          {filters.query && (
            <FilterChip label={`"${filters.query}"`} onRemove={() => set('query', '')} />
          )}
          {filters.type !== 'all' && (
            <FilterChip label={TYPES.find((t) => t.value === filters.type)?.label ?? filters.type} onRemove={() => set('type', 'all')} />
          )}
          {filters.status !== 'all' && (
            <FilterChip label={filters.status === 'for-sale' ? 'For Sale' : 'For Rent'} onRemove={() => set('status', 'all')} />
          )}
          {filters.neighbourhood !== 'all' && (
            <FilterChip label={filters.neighbourhood} onRemove={() => set('neighbourhood', 'all')} />
          )}
          {filters.bedrooms !== 'all' && (
            <FilterChip label={`${filters.bedrooms}+ Bedrooms`} onRemove={() => set('bedrooms', 'all')} />
          )}
          {(filters.minPrice !== 0 || filters.maxPrice !== Infinity) && (
            <FilterChip label={currentPriceRange.label} onRemove={() => onChange({ ...filters, minPrice: 0, maxPrice: Infinity })} />
          )}
        </div>
      )}
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
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
      {label}
      <button
        onClick={onRemove}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text-muted)', lineHeight: 1, padding: 0,
          fontSize: '0.9em',
        }}
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </span>
  )
}
