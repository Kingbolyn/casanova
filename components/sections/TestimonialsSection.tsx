import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label, Caption } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

const steps = [
  {
    number: '01',
    title:  'Submit your enquiry',
    body:   'Use the enquiry form on any property page or contact us directly. Tell us what you are looking for and how you would prefer to be reached.',
  },
  {
    number: '02',
    title:  'Speak with an advisor',
    body:   'We respond within 24 hours. An advisor will contact you directly — no automated sequences, no call centres. A single person who knows the property and understands your needs.',
  },
  {
    number: '03',
    title:  'Experience the property',
    body:   'We arrange a private viewing at a time that suits you. There is no pressure to decide on the day. Our role is to help you understand the property fully, then give you the space to consider it.',
  },
]

function TestimonialsSection() {
  return (
    <Section spacing="xl" bg="white" id="process">
      <Container width="content">

        <FadeIn direction="up" className="mb-16">
          <Label color="tertiary" className="block mb-4">
            What to expect
          </Label>
          <Heading as={2} size="h2" style={{ maxWidth: '18ch' }}>
            From first enquiry to private viewing.
          </Heading>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          stagger={0.1}
        >
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '2rem' }}>
                <p
                  className="font-display font-light mb-6"
                  style={{
                    fontSize: 'var(--type-h2)',
                    color: 'rgba(201, 169, 110, 0.22)',
                    lineHeight: 1,
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </p>
                <Heading as={3} size="h5" className="mb-4">
                  {step.title}
                </Heading>
                <Body color="secondary" style={{ lineHeight: 1.75 }}>
                  {step.body}
                </Body>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn direction="up" delay={0.3}>
          <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-10)', borderTop: '1px solid var(--color-border-subtle)' }}>
            <Caption color="secondary" style={{ lineHeight: 1.7 }}>
              All enquiries are handled confidentially. We do not share your details with third parties. Response times may vary during peak periods but we commit to replying within one business day.
            </Caption>
          </div>
        </FadeIn>

      </Container>
    </Section>
  )
}

export { TestimonialsSection }
