import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { PropertyCard } from '@/components/property/PropertyCard'
import { JsonLd } from '@/components/seo/JsonLd'
import { NeighbourhoodHero } from '@/components/neighbourhoods/NeighbourhoodHero'
import { CharacterSection } from '@/components/neighbourhoods/CharacterSection'
import { AtAGlance } from '@/components/neighbourhoods/AtAGlance'
import { LivingHereCards } from '@/components/neighbourhoods/LivingHereCards'
import { ADayIn } from '@/components/neighbourhoods/ADayIn'
import { EverydayEssentials } from '@/components/neighbourhoods/EverydayEssentials'
import { ExploreNearby } from '@/components/neighbourhoods/ExploreNearby'
import { NeighbourhoodAdvisorCTA } from '@/components/neighbourhoods/NeighbourhoodAdvisorCTA'
import { neighbourhoods } from '@/lib/data/neighbourhoods'
import { properties } from '@/lib/data/properties'
import { BASE_URL, canonical } from '@/lib/seo'

export const dynamic = 'force-static'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return neighbourhoods.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const n = neighbourhoods.find((x) => x.slug === slug)
  if (!n) return { title: 'Neighbourhood Not Found' }

  return {
    title:       n.seo.metaTitle,
    description: n.seo.metaDescription,
    alternates:  { canonical: canonical(`/neighbourhoods/${n.slug}`) },
    openGraph: {
      title:       `${n.name} | CasaNova`,
      description: n.tagline,
      images: [{ url: n.seo.ogImage, width: 1200, height: 630, alt: n.name }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${n.name} | CasaNova`,
      description: n.tagline,
      images:      [n.seo.ogImage],
    },
  }
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default async function NeighbourhoodPage({ params }: Props) {
  const { slug } = await params
  const n = neighbourhoods.find((x) => x.slug === slug)
  if (!n) notFound()

  const pageUrl = canonical(`/neighbourhoods/${n.slug}`)

  const neighbourhoodProperties = properties.filter(
    (p) => toSlug(p.location.neighbourhood) === slug,
  )

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Neighbourhoods', item: `${BASE_URL}/neighbourhoods` },
      { '@type': 'ListItem', position: 3, name: n.name,           item: pageUrl },
    ],
  }

  const place = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: n.name,
    description: n.seo.metaDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: n.city,
      addressRegion:   n.state,
      addressCountry:  'NG',
    },
    image: n.heroImage,
    url:   pageUrl,
  }

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={place} />

      <main aria-label={`${n.name} neighbourhood`}>
        <NeighbourhoodHero
          variant="individual"
          image={n.heroImage}
          focalY={n.heroFocalY}
          eyebrow={`${n.city} · Nigeria`}
          heading={n.name}
          tagline={n.tagline}
          breadcrumb={[
            { label: 'Home',           href: '/'               },
            { label: 'Neighbourhoods', href: '/neighbourhoods'  },
            { label: n.name },
          ]}
        />

        <CharacterSection name={n.name} character={n.character} />

        <AtAGlance data={n.atAGlance} name={n.name} />

        <LivingHereCards cards={n.livingHere} name={n.name} />

        <ADayIn name={n.name} entries={n.aDayIn} />

        <EverydayEssentials data={n.essentials} name={n.name} />

        {neighbourhoodProperties.length > 0 && (
          <Section spacing="lg" bg="default" aria-label="Featured homes">
            <Container width="wide">
              <FadeIn direction="up">
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '2.5rem',
                  }}
                >
                  CasaNova Homes in {n.name}
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {neighbourhoodProperties.map((property, i) => (
                  <FadeIn key={property.id} direction="up" delay={i * 0.1}>
                    <PropertyCard property={property} />
                  </FadeIn>
                ))}
              </div>
            </Container>
          </Section>
        )}

        <ExploreNearby nearby={n.nearby} />

        <NeighbourhoodAdvisorCTA name={n.name} variant="individual" />
      </main>
    </>
  )
}
