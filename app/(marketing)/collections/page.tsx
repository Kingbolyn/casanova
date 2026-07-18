import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { CollectionCard } from '@/components/ui/CollectionCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { collections } from '@/lib/data/collections'
import { properties } from '@/lib/data/properties'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore curated property collections, grouped by lifestyle and environment.',
}

export default function CollectionsPage() {
  const [featured, ...rest] = collections

  const countFor = (col: typeof collections[number]) =>
    properties.filter((p) => col.properties.includes(p.id)).length

  return (
    <>
      {/* Page header */}
      <Section
        bg="primary"
        style={{ minHeight: '340px', paddingTop: '120px', display: 'flex', alignItems: 'flex-end', paddingBottom: '3rem' }}
      >
        <Container width="wide">
          <FadeIn direction="up">
            <Label
              className="block mb-4"
              style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 'var(--tracking-widest)' }}
            >
              Curated
            </Label>
            <Heading as={1} size="h1" color="inverse">
              Collections
            </Heading>
            <Body
              size="lg"
              className="mt-4"
              style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '52ch' }}
            >
              Our properties are grouped into collections by environment, lifestyle, and architectural character. Each is a considered point of view.
            </Body>
          </FadeIn>
        </Container>
      </Section>

      {/* Collections grid */}
      <Section spacing="lg" bg="default">
        <Container width="wide">
          <FadeIn direction="up">
            {/* Featured — full width */}
            <div className="mb-6">
              <CollectionCard
                collection={featured}
                propertyCount={countFor(featured)}
                variant="featured"
              />
            </div>

            {/* Remaining — side by side */}
            {rest.length > 0 && (
              <StaggerChildren
                className={`grid gap-6 ${rest.length >= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                stagger={0.1}
              >
                {rest.map((col) => (
                  <StaggerItem key={col.id}>
                    <CollectionCard
                      collection={col}
                      propertyCount={countFor(col)}
                    />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            )}
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
