import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Speak with our team about a property, a viewing, or anything else. We're here to help you find the home that fits your life.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact CasaNova',
    description: "Speak with our team about a property, a viewing, or anything else.",
    images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', width: 1200, height: 800, alt: 'CasaNova' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact CasaNova',
    description: "Speak with our team about a property or viewing.",
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
  },
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
          <ContactForm />
        </Container>
      </Section>
    </>
  )
}
