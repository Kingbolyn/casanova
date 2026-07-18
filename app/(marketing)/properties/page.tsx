import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { PropertiesClient } from '@/components/property/PropertiesClient'
import { FadeIn } from '@/components/motion/FadeIn'
import { properties } from '@/lib/data/properties'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse our curated portfolio of exceptional properties: penthouses, villas, and estates chosen for architectural distinction and lasting value.',
  openGraph: {
    title: 'Exceptional Properties | CasaNova',
    description: 'Every property in our portfolio is chosen for its architectural distinction, location quality, and lasting value.',
  },
}

export default function PropertiesPage() {
  return (
    <>
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
              Our Portfolio
            </Label>
            <Heading as={1} size="h1" color="inverse">
              Exceptional Properties
            </Heading>
            <Body
              size="lg"
              className="mt-4"
              style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '52ch' }}
            >
              Every property in our portfolio is chosen for its architectural distinction, location quality, and lasting value.
            </Body>
          </FadeIn>
        </Container>
      </Section>

      <PropertiesClient properties={properties} />
    </>
  )
}
