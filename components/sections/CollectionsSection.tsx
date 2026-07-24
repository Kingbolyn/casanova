'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label, Caption } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { collections } from '@/lib/data/collections'

function CollectionsSection() {
  return (
    <Section spacing="xl" bg="light" id="collections">
      <Container>
        <FadeIn direction="up" className="mb-16">
          <Label color="tertiary" className="block mb-4">
            Curated living
          </Label>
          <Heading as={2} size="h2">
            Collections
          </Heading>
          <Body size="lg" color="secondary" className="mt-4" style={{ maxWidth: '52ch' }}>
            Homes grouped by lifestyle and environment. The right setting is as important as the right floor plan.
          </Body>
        </FadeIn>

        <StaggerChildren stagger={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--grid-gap-md)' }}>
            {collections.map((col) => (
              <StaggerItem key={col.id}>
                <Link href={`/collections/${col.slug}`} className="group block">
                  <article>
                    {/* Image */}
                    <div
                      className="relative overflow-hidden rounded-[--radius-lg] mb-6"
                      style={{ aspectRatio: '3 / 4' }}
                    >
                      <m.div
                        className="absolute inset-0"
                        style={{ position: 'absolute' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <Image
                          src={col.heroImage}
                          alt={col.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </m.div>

                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }}
                      />

                      {/* Name on image */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3
                          className="font-display font-light"
                          style={{
                            fontSize: 'var(--type-h4)',
                            color: 'var(--color-text-inverse)',
                            lineHeight: 'var(--leading-tight)',
                            letterSpacing: 'var(--tracking-tight)',
                          }}
                        >
                          {col.name}
                        </h3>
                        <Caption style={{ color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                          {col.properties.length} {col.properties.length === 1 ? 'property' : 'properties'}
                        </Caption>
                      </div>
                    </div>

                    {/* Description */}
                    <Body size="sm" color="secondary" className="line-clamp-2">
                      {col.description}
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

export { CollectionsSection }
