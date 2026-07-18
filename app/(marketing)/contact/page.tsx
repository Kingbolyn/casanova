import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body } from '@/components/ui/Typography'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with our team. We\'d love to help you find your next home.',
}

export default function ContactPage() {
  return (
    <>
      <Section
        spacing="xl"
        bg="primary"
        className="flex items-end"
        style={{ minHeight: '340px', paddingTop: '120px' } as React.CSSProperties}
      >
        <Container width="narrow">
          <Body size="sm" className="uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'var(--type-small)' }}>
            Get in Touch
          </Body>
          <Heading as={1} size="h1" color="inverse">
            Contact Us
          </Heading>
        </Container>
      </Section>

      <Section spacing="xl" bg="white">
        <Container width="narrow">
          <form
            action="#"
            aria-label="Contact form"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Input label="Full Name"     placeholder="Your name"          name="name"    required />
              <Input label="Email Address" placeholder="your@email.com"     name="email"   type="email" required />
            </div>
            <div className="mb-8">
              <Input label="Subject" placeholder="How can we help?" name="subject" required />
            </div>
            <div className="mb-10">
              <Textarea label="Message" placeholder="Tell us about the property you're looking for…" name="message" rows={6} required />
            </div>
            <Button type="submit" variant="primary" size="lg">
              Send Message
            </Button>
          </form>
        </Container>
      </Section>
    </>
  )
}
