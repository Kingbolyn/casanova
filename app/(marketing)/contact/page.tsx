import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'

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
      {/* Page header */}
      <Section
        spacing="xl"
        bg="primary"
        className="flex items-end"
        style={{ minHeight: '340px', paddingTop: '120px' } as React.CSSProperties}
      >
        <Container width="content">
          <Body
            size="sm"
            className="uppercase tracking-widest mb-4"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'var(--type-small)' }}
          >
            Get in Touch
          </Body>
          <Heading as={1} size="h1" color="inverse">
            Contact Us
          </Heading>
          <Body
            size="lg"
            className="mt-4"
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '48ch' }}
          >
            We respond to every enquiry personally. Tell us what you are looking for and we will connect you with the right advisor.
          </Body>
        </Container>
      </Section>

      {/* Two-column layout: presence signals + form */}
      <Section spacing="xl" bg="white">
        <Container width="content">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

            {/* ── Left column: presence signals ── */}
            <div>
              {/* Advisor identity */}
              <div className="mb-10">
                <Label
                  className="block mb-6"
                  style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-widest)' }}
                >
                  Your advisor
                </Label>

                {/* Avatar placeholder — replaced with real photo when advisor is confirmed */}
                <div
                  aria-hidden="true"
                  style={{
                    width:           '72px',
                    height:          '72px',
                    borderRadius:    '50%',
                    backgroundColor: 'var(--color-surface-secondary)',
                    border:          '1px solid var(--color-border-base)',
                    marginBottom:    '1.25rem',
                    overflow:        'hidden',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <circle cx="14" cy="11" r="5" stroke="var(--color-text-muted)" strokeWidth="1.3" />
                    <path d="M4 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="var(--color-text-muted)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>

                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h5)', fontWeight: 300, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  The CasaNova Team
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  Luxury Property Advisors
                </p>
              </div>

              {/* Divider */}
              <div
                aria-hidden="true"
                style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border-base)', marginBottom: '2.5rem' }}
              />

              {/* Contact details */}
              <div className="flex flex-col" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
                {/* Email */}
                <div>
                  <Label
                    className="block mb-1"
                    style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-widest)', fontSize: 'var(--text-xs)' }}
                  >
                    Email
                  </Label>
                  <a
                    href="mailto:hello@casanova.ng"
                    style={{
                      fontFamily:     'var(--font-body)',
                      fontSize:       'var(--text-sm)',
                      color:          'var(--color-text-primary)',
                      textDecoration: 'none',
                      borderBottom:   '1px solid var(--color-border-base)',
                      paddingBottom:  '1px',
                      transition:     'border-color var(--dur-micro) var(--ease-standard)',
                    }}
                  >
                    hello@casanova.ng
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <Label
                    className="block mb-1"
                    style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-widest)', fontSize: 'var(--text-xs)' }}
                  >
                    Phone
                  </Label>
                  <a
                    href="tel:+2348000000000"
                    style={{
                      fontFamily:     'var(--font-body)',
                      fontSize:       'var(--text-sm)',
                      color:          'var(--color-text-primary)',
                      textDecoration: 'none',
                      borderBottom:   '1px solid var(--color-border-base)',
                      paddingBottom:  '1px',
                      transition:     'border-color var(--dur-micro) var(--ease-standard)',
                    }}
                  >
                    +234 (0) 800 000 0000
                  </a>
                </div>

                {/* Coverage */}
                <div>
                  <Label
                    className="block mb-1"
                    style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-widest)', fontSize: 'var(--text-xs)' }}
                  >
                    Coverage
                  </Label>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                    Lagos · Abuja · Pan-Nigeria
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div
                aria-hidden="true"
                style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border-base)', marginBottom: '2rem' }}
              />

              {/* Response commitment */}
              <div className="flex items-start gap-3">
                {/* Gold accent line */}
                <div
                  aria-hidden="true"
                  style={{ width: '2px', height: '100%', minHeight: '48px', backgroundColor: 'var(--color-accent-base)', flexShrink: 0, marginTop: '2px' }}
                />
                <Body size="sm" color="secondary" style={{ lineHeight: 1.7 }}>
                  We respond to every message personally within one business day. For urgent enquiries, call us directly.
                </Body>
              </div>
            </div>

            {/* ── Right column: form ── */}
            <div>
              <ContactForm />
            </div>

          </div>
        </Container>
      </Section>
    </>
  )
}
