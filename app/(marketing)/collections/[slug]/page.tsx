import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { FadeIn } from '@/components/motion/FadeIn'
import { collections, getPropertiesInCollection } from '@/lib/data/collections'
import { properties } from '@/lib/data/properties'
import type { Property } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const col = collections.find((c) => c.slug === slug)
  if (!col) return { title: 'Collection Not Found' }
  return {
    title:       col.name,
    description: col.description,
    openGraph: {
      title:       col.name,
      description: col.description,
      images:      [{ url: col.heroImage, width: 1400, height: 800, alt: col.name }],
    },
  }
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params
  const collection = collections.find((c) => c.slug === slug)
  if (!collection) notFound()

  const collectionProperties = getPropertiesInCollection(slug, properties) as Property[]

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ height: '60vh', minHeight: '440px', paddingTop: '80px', backgroundColor: '#111' }}
        aria-label={`${collection.name} collection`}
      >
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ opacity: 0.55 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <Container width="wide">
            <FadeIn direction="up">
              <Label
                className="block mb-3"
                style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 'var(--tracking-widest)' }}
              >
                Collection · {collectionProperties.length} {collectionProperties.length === 1 ? 'property' : 'properties'}
              </Label>
              <Heading as={1} size="h1" color="inverse" className="mb-4">
                {collection.name}
              </Heading>
              <Body
                size="lg"
                style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '56ch' }}
              >
                {collection.description}
              </Body>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* Properties in this collection */}
      <Section spacing="lg" bg="default">
        <Container width="wide">
          {collectionProperties.length > 0 ? (
            <PropertyGrid properties={collectionProperties} columns={3} />
          ) : (
            <FadeIn direction="up">
              <Body color="secondary" style={{ textAlign: 'center', paddingBlock: '4rem' }}>
                No properties currently available in this collection.
              </Body>
            </FadeIn>
          )}
        </Container>
      </Section>
    </>
  )
}
