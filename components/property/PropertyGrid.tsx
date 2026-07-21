'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PropertyCard } from '@/components/property/PropertyCard'
import type { Property } from '@/lib/types'

interface PropertyGridProps {
  properties: Property[]
  columns?:   2 | 3
}

function PropertyGrid({ properties, columns = 3 }: PropertyGridProps) {
  const gridCols = columns === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'

  return (
    <motion.div layout className={`grid ${gridCols} gap-8`}>
      <AnimatePresence mode="popLayout">
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              layout:   { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity:  { duration: 0.35, delay: Math.min(i, 5) * 0.05 },
              y:        { duration: 0.35, delay: Math.min(i, 5) * 0.05, ease: [0.25, 0.46, 0.45, 0.94] },
              scale:    { duration: 0.25 },
            }}
          >
            <PropertyCard property={property} priority={i < 3} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export { PropertyGrid }
