'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heading, Body, Label } from '@/components/ui/Typography'
import type { Collection } from '@/lib/types'

interface CollectionCardProps {
  collection:     Collection
  propertyCount:  number
  variant?:       'default' | 'featured'
}

function CollectionCard({ collection, propertyCount, variant = 'default' }: CollectionCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <Link href={`/collections/${collection.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.article
        className="group relative overflow-hidden"
        style={{ aspectRatio: isFeatured ? '16/9' : '3/4', backgroundColor: 'var(--color-surface-secondary)' }}
        whileHover="hover"
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          variants={{ hover: { scale: 1.04 } }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            className="object-cover"
            sizes={isFeatured ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Label
            className="block mb-2"
            style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 'var(--tracking-widest)' }}
          >
            {propertyCount} {propertyCount === 1 ? 'property' : 'properties'}
          </Label>
          <Heading
            as={3}
            size={isFeatured ? 'h2' : 'h4'}
            color="inverse"
            className="mb-2"
          >
            {collection.name}
          </Heading>
          <motion.div
            style={{ overflow: 'hidden' }}
            variants={{ hover: { height: 'auto' } }}
            initial={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Body
              size="sm"
              style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.375rem' }}
            >
              {collection.description}
            </Body>
          </motion.div>

          {/* Underline reveal */}
          <motion.div
            style={{ height: '1px', backgroundColor: 'var(--color-accent-base)', marginTop: '1rem', originX: 0 }}
            variants={{ hover: { scaleX: 1 } }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </motion.article>
    </Link>
  )
}

export { CollectionCard }
