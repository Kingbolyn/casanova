'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
              layout:   { duration: DUR.standard, ease: EASE.standard },
              opacity:  { duration: DUR.standard, delay: Math.min(i, 5) * 0.06, ease: EASE.entrance },
              y:        { duration: DUR.standard, delay: Math.min(i, 5) * 0.06, ease: EASE.entrance },
              scale:    { duration: DUR.micro, ease: EASE.exit },
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
