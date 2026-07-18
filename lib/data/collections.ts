import type { Collection } from '@/lib/types'

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getPropertiesInCollection(
  slug: string,
  allProperties: Array<{ id: string; collection?: string }>
) {
  const collection = getCollectionBySlug(slug)
  if (!collection) return []
  return allProperties.filter((p) => collection.properties.includes(p.id))
}

export const collections: Collection[] = [
  {
    id:          'col-001',
    slug:        'waterfront',
    name:        'Waterfront',
    description: 'Homes where architecture meets the water. Each property offers an uninterrupted relationship with the coast, lagoon, or river it calls home.',
    heroImage:   'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
    properties:  ['prop-002', 'prop-005', 'prop-010', 'prop-011'],
  },
  {
    id:          'col-002',
    slug:        'sky-residences',
    name:        'Sky Residences',
    description: 'High-altitude living redefined. Residences that put the city skyline at your feet and the horizon within reach.',
    heroImage:   'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    properties:  ['prop-001', 'prop-007'],
  },
  {
    id:          'col-003',
    slug:        'garden-estates',
    name:        'Garden Estates',
    description: 'Private sanctuaries surrounded by curated landscape. Where space, nature, and architecture exist in considered harmony.',
    heroImage:   'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80',
    properties:  ['prop-003', 'prop-006', 'prop-008', 'prop-012'],
  },
  {
    id:          'col-004',
    slug:        'city-residences',
    name:        'City Residences',
    description: 'Apartments and urban homes that make no compromise between convenience and quality. The city at your door. The standard of a private estate inside.',
    heroImage:   'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&q=80',
    properties:  ['prop-004', 'prop-009'],
  },
]
