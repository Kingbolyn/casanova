import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

export const metadata: Metadata = {
  title: 'About',
  description: 'CasaNova was built on a single belief: property discovery begins with emotion, not transaction.',
  openGraph: {
    title: 'About CasaNova',
    description: 'We believe the right home is one that fits your life: your rhythm, your future, your story.',
  },
}

const PRINCIPLES = [
  {
    number: '01',
    title: 'Experience before evaluation',
    body: 'People searching for homes imagine futures. They evaluate environments and lifestyles, not just specifications. We design every touchpoint to honour that emotional process.',
  },
  {
    number: '02',
    title: 'Restraint as confidence',
    body: 'We never fill silence with noise. A property speaks for itself when it is presented well. Our role is to remove friction, not add spectacle.',
  },
  {
    number: '03',
    title: 'Trust through honesty',
    body: 'We represent properties as they are. Precise descriptions, accurate photography, and clear pricing. A client who feels deceived once is lost permanently.',
  },
  {
    number: '04',
    title: 'Permanence over trend',
    body: 'We select properties built to endure: architecturally, structurally, and locationally. The properties we carry today will still be exceptional in twenty years.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <Section
        bg="primary"
        style={{ minHeight: '340px', paddingTop: '120px', display: 'flex', alignItems: 'flex-end', paddingBottom: '3rem' }}
      >
        <Container width="content">
          <FadeIn direction="up">
            <Label
              className="block mb-4"
              style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 'var(--tracking-widest)' }}
            >
              Our story
            </Label>
            <Heading as={1} size="h1" color="inverse">
              About CasaNova
            </Heading>
          </FadeIn>
        </Container>
      </Section>

      {/* Opening statement */}
      <Section spacing="xl" bg="white">
        <Container width="narrow">
          <FadeIn direction="up">
            <Heading as={2} size="h3" className="mb-8" style={{ lineHeight: 1.3 }}>
              Property discovery begins with emotion, not transaction.
            </Heading>
            <Body size="lg" color="secondary" style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
              People searching for homes imagine futures, not compare specs. They evaluate environments, lifestyles, possibilities, and experiences. CasaNova was built to respect this emotional process: to help visitors experience properties before evaluating them.
            </Body>
            <Body size="lg" color="secondary" style={{ lineHeight: 1.8 }}>
              We operate across Lagos and Abuja, representing a curated portfolio of exceptional homes, each chosen for its architectural distinction, location quality, and permanent value. We are not volume dealers. We carry fewer properties than most agencies and know each one intimately.
            </Body>
          </FadeIn>
        </Container>
      </Section>

      {/* Principles */}
      <Section spacing="xl" bg="default">
        <Container width="content">
          <FadeIn direction="up">
            <div className="flex items-center gap-4 mb-14">
              <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-accent-base)' }} aria-hidden="true" />
              <Label style={{ letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)' }}>
                How we work
              </Label>
            </div>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14" stagger={0.1}>
            {PRINCIPLES.map((p) => (
              <StaggerItem key={p.number}>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--color-accent-base)', marginBottom: '1rem', letterSpacing: 'var(--tracking-wide)' }}>
                    {p.number}
                  </p>
                  <Heading as={3} size="h5" className="mb-4">
                    {p.title}
                  </Heading>
                  <Body color="secondary" style={{ lineHeight: 1.75 }}>
                    {p.body}
                  </Body>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Stats strip */}
      <Section spacing="lg" bg="primary">
        <Container width="content">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" stagger={0.08}>
            {[
              { value: '340+', label: 'Properties placed' },
              { value: '$2.4B', label: 'Portfolio value' },
              { value: '97%', label: 'Client satisfaction' },
              { value: '8 yrs', label: 'Market experience' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-text-inverse)', fontWeight: 300, marginBottom: '0.5rem' }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.45)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase' }}>
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </Section>
    </>
  )
}
