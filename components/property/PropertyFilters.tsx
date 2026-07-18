'use client'

import { useState } from 'react'
import type { PropertyType, PropertyStatus } from '@/lib/types'

export interface FilterState {
  type:   PropertyType | 'all'
  status: PropertyStatus | 'all'
  minPrice: number
  maxPrice: number
  sort: 'price-asc' | 'price-desc' | 'newest'
}

interface PropertyFiltersProps {
  total:    number
  filters:  FilterState
  onChange: (filters: FilterState) => void
}

const TYPES: { value: PropertyType | 'all'; label: string }[] = [
  { value: 'all',        label: 'All Types' },
  { value: 'penthouse',  label: 'Penthouse' },
  { value: 'villa',      label: 'Villa' },
  { value: 'house',      label: 'House' },
  { value: 'apartment',  label: 'Apartment' },
  { value: 'townhouse',  label: 'Townhouse' },
]

const SORTS = [
  { value: 'newest',    label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc',label: 'Price: High to Low' },
]

const selectStyle: React.CSSProperties = {
  appearance: 'none',
  border: '1px solid var(--color-border-base)',
  borderRadius: 0,
  backgroundColor: 'var(--color-surface-primary)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-wide)',
  padding: '0.625rem 2.5rem 0.625rem 0.875rem',
  cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1A1A' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.75rem center',
  minWidth: '160px',
}

function PropertyFilters({ total, filters, onChange }: PropertyFiltersProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value })

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5"
      style={{ borderBottom: '1px solid var(--color-border-base)' }}
    >
      {/* Count */}
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{total}</span>{' '}
        {total === 1 ? 'property' : 'properties'}
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type filter */}
        <div style={{ position: 'relative' }}>
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
        </div>

        {/* Status filter */}
        <div style={{ position: 'relative' }}>
          <select
            value={filters.status}
            onChange={(e) => set('status', e.target.value as FilterState['status'])}
            style={selectStyle}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>
        </div>

        {/* Sort */}
        <div style={{ position: 'relative' }}>
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
    </div>
  )
}

export { PropertyFilters }
