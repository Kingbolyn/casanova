import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { EnquiryForm } from '@/components/property/EnquiryForm'
import { RelatedProperties } from '@/components/property/RelatedProperties'
import { FadeIn } from '@/components/motion/FadeIn'
import { properties } from '@/lib/data/properties'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const property = properties.find((p) => p.slug === id)
  if (!property) return { title: 'Property Not Found' }
  return {
    title:       property.title,
    description: property.tagline,
    openGraph: {
      title:       property.title,
      description: property.tagline,
      images:      [{ url: property.media.hero, width: 1200, height: 800, alt: property.title }],
    },
  }
}

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.slug }))
}

const SPEC_LABELS: Record<string, string> = {
  bedrooms:   'Bedrooms',
  bathrooms:  'Bathrooms',
  garages:    'Garages',
  squareFeet: 'Interior',
  lotSize:    'Lot Size',
  yearBuilt:  'Year Built',
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params
  const property = properties.find((p) => p.slug === id)
  if (!property) notFound()

  const allImages = [property.media.hero, ...property.media.gallery]
  const { features, location } = property

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ height: '70vh', minHeight: '500px', paddingTop: '80px', backgroundColor: '#111' }}
        aria-label={`Hero image for ${property.title}`}
      >
        <Image
          src={property.media.hero}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ opacity: 0.65 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <Container width="wide">
            <FadeIn direction="up">
              <Label
                className="block mb-3"
                style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: 'var(--tracking-widest)' }}
              >
                {location.neighbourhood} · {location.city} · {property.type}
              </Label>
              <Heading as={1} size="h1" color="inverse" className="mb-3">
                {property.title}
              </Heading>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-accent-base)', fontWeight: 300 }}>
                {property.priceLabel}
              </p>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* Body — two column */}
      <Section spacing="lg" bg="default">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-16">

            {/* Left column */}
            <div>
              {/* Gallery */}
              <FadeIn direction="up">
                <PropertyGallery images={allImages} title={property.title} />
              </FadeIn>

              {/* Tagline */}
              <FadeIn direction="up" delay={0.1}>
                <p
                  className="mt-10 mb-6"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {property.tagline}
                </p>
              </FadeIn>

              {/* Description */}
              <FadeIn direction="up" delay={0.15}>
                <Body size="lg" color="secondary" style={{ lineHeight: 1.8, maxWidth: '68ch' }}>
                  {property.description}
                </Body>
              </FadeIn>

              {/* Specs */}
              <FadeIn direction="up" delay={0.2}>
                <div
                  className="mt-10 pt-8"
                  style={{ borderTop: '1px solid var(--color-border-base)' }}
                >
                  <Label
                    className="block mb-6"
                    style={{ letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)' }}
                  >
                    Property specifications
                  </Label>
                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
                    {(Object.keys(SPEC_LABELS) as Array<keyof typeof SPEC_LABELS>).map((key) => {
                      const raw = features[key as keyof typeof features]
                      if (raw === undefined) return null
                      const value = key === 'squareFeet'
                        ? `${Number(raw).toLocaleString()} sq ft`
                        : key === 'lotSize'
                        ? `${Number(raw).toLocaleString()} sq ft`
                        : String(raw)
                      return (
                        <div key={key}>
                          <dt style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                            {SPEC_LABELS[key]}
                          </dt>
                          <dd style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)', fontWeight: 300 }}>
                            {value}
                          </dd>
                        </div>
                      )
                    })}
                  </dl>
                </div>
              </FadeIn>

              {/* Amenities */}
              <FadeIn direction="up" delay={0.25}>
                <div
                  className="mt-10 pt-8"
                  style={{ borderTop: '1px solid var(--color-border-base)' }}
                >
                  <Label
                    className="block mb-6"
                    style={{ letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)' }}
                  >
                    Amenities & features
                  </Label>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                    {features.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="flex items-center gap-3"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}
                      >
                        <span
                          style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-accent-base)', flexShrink: 0 }}
                          aria-hidden="true"
                        />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Location */}
              <FadeIn direction="up" delay={0.3}>
                <div
                  className="mt-10 pt-8"
                  style={{ borderTop: '1px solid var(--color-border-base)' }}
                >
                  <Label
                    className="block mb-6"
                    style={{ letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)' }}
                  >
                    Location
                  </Label>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>{location.address}</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                      {location.neighbourhood}, {location.city}, {location.state}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{location.country}</p>
                  </div>

                  {/* Map placeholder */}
                  <div
                    className="mt-6 flex items-center justify-center"
                    style={{
                      height: '240px',
                      backgroundColor: 'var(--color-surface-secondary)',
                      border: '1px solid var(--color-border-base)',
                    }}
                    aria-label="Map location (interactive map in production)"
                  >
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)', letterSpacing: 'var(--tracking-widest)' }}>
                      MAP INTEGRATION — PRODUCTION
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right column — sticky enquiry */}
            <div>
              <FadeIn direction="up" delay={0.2}>
                <EnquiryForm
                  propertyTitle={property.title}
                  priceLabel={property.priceLabel}
                />
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related properties */}
      <Section spacing="lg" bg="light">
        <Container width="wide">
          <RelatedProperties properties={properties} currentId={property.id} />
        </Container>
      </Section>
    </>
  )
}
