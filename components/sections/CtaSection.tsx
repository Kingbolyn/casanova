import Link from 'next/link'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'

function CtaSection() {
  return (
    <Section
      spacing="xl"
      bg="primary"
      id="cta"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 80% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <Container width="narrow" className="relative text-center">
        <FadeIn direction="up">
          <div
            className="inline-block mb-8"
            style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-accent-base)' }}
          />

          <Label
            className="block mb-6"
            style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 'var(--tracking-widest)' }}
          >
            Begin your search
          </Label>

          <Heading
            as={2}
            size="h2"
            color="inverse"
            className="mb-8"
            style={{ maxWidth: '20ch', marginInline: 'auto' }}
          >
            The right home is waiting to be found.
          </Heading>

          <Body
            size="lg"
            className="mb-12"
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '46ch', marginInline: 'auto' }}
          >
            Let us help you find not just a house, but a home that fits your life: your rhythm, your future, your story.
          </Body>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button variant="accent" size="lg">
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                style={{
                  borderColor: 'rgba(255,255,255,0.25)',
                  color: 'var(--color-text-inverse)',
                  background: 'transparent',
                }}
              >
                Speak to an Advisor
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

export { CtaSection }
