'use client'

import { useState, useMemo } from 'react'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PropertyFilters, type FilterState } from '@/components/property/PropertyFilters'
import type { Property } from '@/lib/types'

const DEFAULT_FILTERS: FilterState = {
  type:     'all',
  status:   'all',
  minPrice: 0,
  maxPrice: Infinity,
  sort:     'newest',
}

interface PropertiesClientProps {
  properties: Property[]
}

function PropertiesClient({ properties }: PropertiesClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    let result = [...properties]
    if (filters.type !== 'all')   result = result.filter((p) => p.type === filters.type)
    if (filters.status !== 'all') result = result.filter((p) => p.status === filters.status)
    result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    if (filters.sort === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (filters.sort === 'newest')     result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return result
  }, [filters, properties])

  return (
    <Section spacing="lg" bg="default">
      <Container width="wide">
        <PropertyFilters total={filtered.length} filters={filters} onChange={setFilters} />
        <div className="mt-10">
          <PropertyGrid properties={filtered} />
        </div>
      </Container>
    </Section>
  )
}

export { PropertiesClient }
