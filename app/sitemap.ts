import type { MetadataRoute } from 'next'
import { properties } from '@/lib/data/properties'
import { collections } from '@/lib/data/collections'
import { neighbourhoods } from '@/lib/data/neighbourhoods'
import { BASE_URL as BASE } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/properties`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/collections`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/cookies`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url:             `${BASE}/property/${p.slug}`,
    lastModified:    new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority:        0.8,
  }))

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url:             `${BASE}/collections/${c.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'weekly',
    priority:        0.7,
  }))

  const neighbourhoodRoutes: MetadataRoute.Sitemap = neighbourhoods.map((n) => ({
    url:             `${BASE}/neighbourhoods/${n.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))

  const neighbourhoodIndex: MetadataRoute.Sitemap = [{
    url:             `${BASE}/neighbourhoods`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }]

  return [...staticRoutes, ...propertyRoutes, ...collectionRoutes, ...neighbourhoodIndex, ...neighbourhoodRoutes]
}
