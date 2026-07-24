'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label, Caption } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

const neighbourhoods = [
  {
    name:        'Victoria Island',
    city:        'Lagos',
    description: 'The financial and social heartbeat of Lagos. Waterfront living, world-class dining, and proximity to everything that matters.',
    image:       'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    listings:    12,
    slug:        'victoria-island',
  },
  {
    name:        'Banana Island',
    city:        'Lagos',
    description: 'Nigeria\'s most prestigious address. A private island of manicured estates, quiet roads, and absolute exclusivity.',
    image:       'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80',
    listings:    8,
    slug:        'banana-island',
  },
  {
    name:        'Maitama',
    city:        'Abuja',
    description: 'Abuja\'s diplomatic quarter. Tree-lined streets, generous plots, and an atmosphere of calm authority.',
    image:       'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    listings:    6,
    slug:        'maitama',
  },
]

function NeighbourhoodSection() {
  return (
    <Section spacing="xl" bg="default" id="neighbourhoods">
      <Container>
        <FadeIn direction="up" className="mb-16">
          <Label color="tertiary" className="block mb-4">
            Location, character, lifestyle
          </Label>
          <Heading as={2} size="h2">
            Neighbourhoods
          </Heading>
          <Body size="lg" color="secondary" className="mt-4" style={{ maxWidth: '50ch' }}>
            Every great home belongs to a great neighbourhood. We know both intimately.
          </Body>
        </FadeIn>

        <StaggerChildren stagger={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--grid-gap-md)' }}>
            {neighbourhoods.map((n) => (
              <StaggerItem key={n.slug}>
                <Link href={`/properties?neighbourhood=${n.slug}`} className="group block">
                  <article>
                    {/* Image */}
                    <div
                      className="relative overflow-hidden rounded-[--radius-lg] mb-5"
                      style={{ aspectRatio: '4 / 3' }}
                    >
                      <m.div
                        className="absolute inset-0"
                        style={{ position: 'absolute' }}
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <Image
                          src={n.image}
                          alt={`${n.name}, ${n.city}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </m.div>
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }}
                      />
                      <div className="absolute bottom-4 left-4">
                        <Caption style={{ color: 'rgba(255,255,255,0.6)' }}>{n.city}</Caption>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3
                        className="font-display font-light"
                        style={{
                          fontSize: 'var(--type-h5)',
                          color: 'var(--color-text-primary)',
                          letterSpacing: 'var(--tracking-tight)',
                        }}
                      >
                        {n.name}
                      </h3>
                      <Caption color="tertiary" className="shrink-0 mt-1">
                        {n.listings} listings
                      </Caption>
                    </div>
                    <Body size="sm" color="secondary" className="line-clamp-2">
                      {n.description}
                    </Body>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </Container>
    </Section>
  )
}

export { NeighbourhoodSection }
