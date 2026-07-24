'use client'

import { m, AnimatePresence } from 'framer-motion'
import { PropertyCard } from '@/components/property/PropertyCard'
import type { Property } from '@/lib/types'
import { DUR, EASE } from '@/lib/motion'

interface PropertyGridProps {
  properties: Property[]
  columns?:   2 | 3
}

function PropertyGrid({ properties, columns = 3 }: PropertyGridProps) {
  const gridCols = columns === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'

  if (properties.length === 0) {
    return (
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.standard, ease: EASE.entrance }}
        style={{ textAlign: 'center', paddingBlock: '5rem' }}
      >
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h4)', fontWeight: 300, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
          No properties available
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-wide)' }}>
          Check back soon as new residences are added to this collection.
        </p>
      </m.div>
    )
  }

  return (
    <m.div layout className={`grid ${gridCols} gap-8`}>
      <AnimatePresence mode="popLayout">
        {properties.map((property, i) => (
          <m.div
            key={property.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              layout:   { duration: DUR.standard, ease: EASE.standard },
              opacity:  { duration: DUR.standard, delay: Math.min(i, 5) * 0.06, ease: EASE.entrance },
              y:        { duration: DUR.standard, delay: Math.min(i, 5) * 0.06, ease: EASE.entrance },
              scale:    { duration: DUR.micro, ease: EASE.exit },
            }}
          >
            <PropertyCard property={property} priority={i < 3} />
          </m.div>
        ))}
      </AnimatePresence>
    </m.div>
  )
}

export { PropertyGrid }
