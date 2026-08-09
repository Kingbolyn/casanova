import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { NeighbourhoodHero } from '@/components/neighbourhoods/NeighbourhoodHero'
import { NeighbourhoodCard } from '@/components/neighbourhoods/NeighbourhoodCard'
import { NeighbourhoodAdvisorCTA } from '@/components/neighbourhoods/NeighbourhoodAdvisorCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import { neighbourhoods } from '@/lib/data/neighbourhoods'
import { BASE_URL, canonical } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Neighbourhoods',
  description:
    "Discover Lagos and Abuja's most prestigious residential addresses. Victoria Island, Ikoyi, Banana Island, Lekki, Maitama, and Asokoro, curated by CasaNova.",
  alternates: { canonical: canonical('/neighbourhoods') },
  openGraph: {
    title: 'Our Neighbourhoods | CasaNova',
    description: 'Every remarkable home begins with a remarkable place.',
    images: [{ url: `${BASE_URL}/images/og-neighbourhoods.jpg`, width: 1200, height: 630 }],
  },
}

const indexSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'CasaNova Neighbourhoods',
  description: 'Premium residential neighbourhoods in Lagos and Abuja, Nigeria.',
  numberOfItems: neighbourhoods.length,
  itemListElement: neighbourhoods.map((n, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: n.name,
    url: canonical(`/neighbourhoods/${n.slug}`),
  })),
}

const lagosNeighbourhoods  = neighbourhoods.filter((n) => n.city === 'Lagos')
const abujaNeighbourhoods  = neighbourhoods.filter((n) => n.city === 'Abuja')

const perspective = [
  {
    title: 'Architecture',
    body:  'The built environment tells you everything about a neighbourhood\'s values. We evaluate materials, scale, plot sizes, and the relationship between buildings and streets, not just photographs.',
  },
  {
    title: 'Community',
    body:  "Who lives in a neighbourhood shapes what it becomes. We understand the communities of Lagos and Abuja's finest addresses, the professional circles, the social rhythms, the unwritten expectations.",
  },
  {
    title: 'Connectivity',
    body:  'Proximity to work, schools, healthcare, and the city\'s commercial energy is not a secondary consideration. It is often the one that determines whether a home becomes a life.',
  },
  {
    title: 'Long-Term Value',
    body:  'The best addresses hold value through economic cycles. We study the structural factors, supply constraints, infrastructure investment, institutional demand, that make some locations permanently compelling.',
  },
]

export default function NeighbourhoodsIndexPage() {
  return (
    <>
      <JsonLd data={indexSchema} />

      <main aria-label="CasaNova Neighbourhoods">
        <NeighbourhoodHero
          variant="index"
          image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          focalY="35%"
          eyebrow="Our Neighbourhoods"
          heading="Every remarkable home begins with a remarkable place."
        />

        {/* Editorial introduction */}
        <Section spacing="lg" bg="default" aria-label="Introduction">
          <Container width="wide">
            <FadeIn direction="up">
              <div style={{ maxWidth: '64ch' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h3)',
                    fontWeight: 300,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.55,
                    marginBottom: '1.5rem',
                  }}
                >
                  A home is not just a building. It is a place inside a neighbourhood, inside a city, inside a way of life.
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.80,
                  }}
                >
                  Where you choose to live shapes how you begin your mornings, who you encounter, how long your commute takes, where your children go to school, and what kind of quiet you come home to at the end of the day. CasaNova does not simply show you properties. We introduce you to the places they belong.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Featured neighbourhood cards */}
        <Section spacing="lg" bg="light" aria-label="Our neighbourhood selection">
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
                Six Addresses
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighbourhoods.map((n, i) => (
                <NeighbourhoodCard key={n.slug} neighbourhood={n} index={i} />
              ))}
            </div>
          </Container>
        </Section>

        {/* The CasaNova Perspective */}
        <Section spacing="lg" bg="default" aria-label="How CasaNova evaluates neighbourhoods">
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
                The CasaNova Perspective
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {perspective.map((p, i) => (
                <FadeIn key={p.title} direction="up" delay={i * 0.08}>
                  <div>
                    <div
                      style={{
                        width: '32px',
                        height: '2px',
                        backgroundColor: 'var(--color-accent-base)',
                        marginBottom: '1.25rem',
                      }}
                      aria-hidden="true"
                    />
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--type-h4)',
                        fontWeight: 300,
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {p.title}
                    </h2>
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.75,
                      }}
                    >
                      {p.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* Explore by City */}
        <Section spacing="lg" bg="light" aria-label="Explore by city">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {[
                { city: 'Lagos',  list: lagosNeighbourhoods },
                { city: 'Abuja',  list: abujaNeighbourhoods },
              ].map((group) => (
                <FadeIn key={group.city} direction="up">
                  <div>
                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        letterSpacing: 'var(--tracking-widest)',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        marginBottom: '2rem',
                      }}
                    >
                      {group.city}
                    </p>
                    <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {group.list.map((n) => (
                        <li key={n.slug} style={{ borderTop: '1px solid var(--color-border-base)', padding: '1.25rem 0' }}>
                          <a
                            href={`/neighbourhoods/${n.slug}`}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}
                          >
                            <div>
                              <p
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'var(--type-h4)',
                                  fontWeight: 300,
                                  color: 'var(--color-text-primary)',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                {n.name}
                              </p>
                              <p
                                style={{
                                  fontSize: 'var(--text-sm)',
                                  fontStyle: 'italic',
                                  color: 'var(--color-text-muted)',
                                }}
                              >
                                {n.tagline}
                              </p>
                            </div>
                            <span style={{ color: 'var(--color-accent-base)', flexShrink: 0, marginLeft: '1rem' }} aria-hidden="true">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        <NeighbourhoodAdvisorCTA variant="index" />
      </main>
    </>
  )
}
