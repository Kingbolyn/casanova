'use client'

import { PropertyCard } from '@/components/property/PropertyCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import type { Property } from '@/lib/types'

interface PropertyGridProps {
  properties: Property[]
  columns?: 2 | 3
}

function PropertyGrid({ properties, columns = 3 }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-24">
        <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
          No properties match your search.
        </p>
        <p className="mt-3" style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-sm)' }}>
          Try adjusting your filters to see more results.
        </p>
      </div>
    )
  }

  const gridCols = columns === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'

  return (
    <StaggerChildren className={`grid ${gridCols} gap-8`} stagger={0.08}>
      {properties.map((property) => (
        <StaggerItem key={property.id}>
          <PropertyCard property={property} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  )
}

export { PropertyGrid }
