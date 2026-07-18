import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { SearchClient } from '@/components/search/SearchClient'
import { FadeIn } from '@/components/motion/FadeIn'
import { properties } from '@/lib/data/properties'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: "${q}"` : 'Search Properties',
    description: 'Search our portfolio of exceptional properties by name, location, or property type.',
    robots: { index: false, follow: false },
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams

  const initialResults = q.trim()
    ? properties.filter((p) => {
        const query = q.trim().toLowerCase()
        return (
          p.title.toLowerCase().includes(query) ||
          p.location.neighbourhood.toLowerCase().includes(query) ||
          p.location.city.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query)
        )
      })
    : properties

  return (
    <>
      <Section
        bg="primary"
        style={{ minHeight: '280px', paddingTop: '120px', display: 'flex', alignItems: 'flex-end', paddingBottom: '2.5rem' }}
      >
        <Container width="wide">
          <FadeIn direction="up">
            <Label
              className="block mb-4"
              style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 'var(--tracking-widest)' }}
            >
              Search results
            </Label>
            <Heading as={1} size="h2" color="inverse">
              {q.trim() ? `"${q.trim()}"` : 'All Properties'}
            </Heading>
            <Body className="mt-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {initialResults.length} {initialResults.length === 1 ? 'property' : 'properties'} found
            </Body>
          </FadeIn>
        </Container>
      </Section>

      <SearchClient properties={properties} initialQuery={q} />
    </>
  )
}
