import Image from 'next/image'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { Divider } from '@/components/ui/Divider'
import { FadeIn } from '@/components/motion/FadeIn'

const values = [
  {
    title: 'Trust',
    body:  'We never misrepresent. Every detail we share is accurate, verified, and presented with complete transparency.',
  },
  {
    title: 'Restraint',
    body:  'We do not overwhelm. We surface what matters, present it clearly, and let the property speak for itself.',
  },
  {
    title: 'Craft',
    body:  'Every interaction, from the first page to the final handover, is considered and carefully executed.',
  },
]

function CompanyIntro() {
  return (
    <Section spacing="xl" bg="white" id="about-intro">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'var(--space-20)', alignItems: 'center' }}>

          {/* Left — image */}
          <FadeIn direction="right" delay={0.1}>
            <div className="relative rounded-[--radius-lg] overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80"
                alt="CasaNova team working with a client"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Accent block */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-[--radius-lg]"
                style={{ backgroundColor: 'var(--color-accent-base)', zIndex: -1 }}
              />
            </div>
          </FadeIn>

          {/* Right — copy */}
          <FadeIn direction="left" delay={0.2}>
            <Label color="tertiary" className="block mb-6">
              Who we are
            </Label>
            <Heading as={2} size="h2" className="mb-8">
              Built on the belief that every home has a story worth telling.
            </Heading>
            <Body size="lg" color="secondary" className="mb-10">
              CasaNova was founded on a single conviction: that finding a home should feel as significant as living in one. We work with a deliberate portfolio of exceptional properties, and an even more deliberate approach to presenting them.
            </Body>

            <Divider variant="subtle" className="mb-10" />

            {/* Values */}
            <div className="flex flex-col gap-8">
              {values.map((v) => (
                <div key={v.title} className="flex gap-6">
                  <div
                    className="shrink-0 mt-1"
                    style={{ width: '1px', backgroundColor: 'var(--color-accent-base)', alignSelf: 'stretch', minHeight: '40px' }}
                  />
                  <div>
                    <p
                      className="font-display font-light mb-2"
                      style={{ fontSize: 'var(--type-h6)', color: 'var(--color-text-primary)', letterSpacing: 'var(--tracking-snug)' }}
                    >
                      {v.title}
                    </p>
                    <Body size="sm" color="secondary">
                      {v.body}
                    </Body>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}

export { CompanyIntro }
