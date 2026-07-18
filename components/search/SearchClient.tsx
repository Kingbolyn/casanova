'use client'

import { useState, useMemo } from 'react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import type { Property } from '@/lib/types'

interface SearchClientProps {
  properties:   Property[]
  initialQuery: string
}

function SearchClient({ properties, initialQuery }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return properties
    return properties.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.location.neighbourhood.toLowerCase().includes(q) ||
      p.location.city.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }, [query, properties])

  return (
    <>
      {/* Inline search refinement bar */}
      <div style={{ backgroundColor: 'var(--color-surface-secondary)', borderBottom: '1px solid var(--color-border-base)' }}>
        <Container width="wide">
          <div style={{ paddingBlock: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Refine your search…"
              aria-label="Refine search"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
                padding: '0.25rem 0',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '1.25rem', lineHeight: 1 }}
              >
                ×
              </button>
            )}
          </div>
        </Container>
      </div>

      {/* Result count */}
      <div style={{ backgroundColor: 'var(--color-surface-primary)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container width="wide">
          <p style={{ paddingBlock: '0.75rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-wide)' }}>
            {results.length} {results.length === 1 ? 'PROPERTY' : 'PROPERTIES'} FOUND
          </p>
        </Container>
      </div>

      <Section spacing="lg" bg="default">
        <Container width="wide">
          <PropertyGrid properties={results} columns={3} />
        </Container>
      </Section>
    </>
  )
}

export { SearchClient }
