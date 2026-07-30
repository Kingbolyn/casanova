import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CasaNova collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'July 2026'

export default function PrivacyPage() {
  return (
    <>
      <Section
        bg="primary"
        style={{ minHeight: '280px', paddingTop: '120px', display: 'flex', alignItems: 'flex-end', paddingBottom: '3rem' }}
      >
        <Container width="content">
          <FadeIn direction="up">
            <Label
              className="block mb-4"
              style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 'var(--tracking-widest)' }}
            >
              Legal
            </Label>
            <Heading as={1} size="h2" color="inverse">
              Privacy Policy
            </Heading>
            <Body
              size="sm"
              className="mt-3"
              style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}
            >
              Last updated: {LAST_UPDATED}
            </Body>
          </FadeIn>
        </Container>
      </Section>

      <Section spacing="xl" bg="white">
        <Container width="narrow">
          <FadeIn direction="up">
            <LegalSection title="1. Who we are">
              <p>
                CasaNova is a luxury real estate discovery platform operating in Lagos and Abuja, Nigeria,
                operated by Apex Code Studio. We connect prospective buyers and tenants with exceptional
                residential properties. Our registered contact email is{' '}
                <a href="mailto:hello@casanova.ng" style={{ color: 'var(--color-accent-base)' }}>
                  hello@casanova.ng
                </a>.
              </p>
            </LegalSection>

            <LegalSection title="2. Information we collect">
              <p>We collect information in three ways:</p>
              <ul>
                <li>
                  <strong>Information you provide directly</strong> — name, email address, phone number,
                  and message content when you submit an enquiry or contact form.
                </li>
                <li>
                  <strong>Information collected automatically</strong> — pages visited, time on site,
                  referring URL, browser type, and device type via analytics tools (Google Analytics 4).
                </li>
                <li>
                  <strong>Cookies</strong> — see our{' '}
                  <a href="/cookies" style={{ color: 'var(--color-accent-base)' }}>Cookie Policy</a>{' '}
                  for full details on what we set and why.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="3. How we use your information">
              <ul>
                <li>To respond to property enquiries and viewing requests.</li>
                <li>To match your stated requirements with suitable properties in our portfolio.</li>
                <li>To improve and maintain the performance and usability of our platform.</li>
                <li>To comply with applicable Nigerian law and financial regulations.</li>
              </ul>
              <p>
                We do not sell, rent, or share your personal information with third parties for
                their own marketing purposes.
              </p>
            </LegalSection>

            <LegalSection title="4. Legal basis for processing">
              <p>
                We process your personal data on the basis of your consent (where given), legitimate
                interest (platform analytics and security), and contractual necessity (responding to
                your enquiry). You may withdraw consent at any time by contacting us.
              </p>
            </LegalSection>

            <LegalSection title="5. Data retention">
              <p>
                Enquiry data is retained for up to 24 months from the date of last contact. Analytics
                data is retained in aggregated, anonymised form. You may request deletion at any time.
              </p>
            </LegalSection>

            <LegalSection title="6. Third-party services">
              <p>We use the following third-party services that may process data on your behalf:</p>
              <ul>
                <li><strong>Vercel</strong> — hosting and edge infrastructure (USA)</li>
                <li><strong>Google Analytics 4</strong> — anonymised usage analytics (USA)</li>
                <li><strong>Resend</strong> — transactional email delivery (USA)</li>
              </ul>
              <p>
                Each of these providers maintains their own privacy policies and data processing agreements.
              </p>
            </LegalSection>

            <LegalSection title="7. Your rights">
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data.</li>
                <li>Object to or restrict processing of your data.</li>
                <li>Withdraw consent at any time without affecting lawfulness of prior processing.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:hello@casanova.ng" style={{ color: 'var(--color-accent-base)' }}>
                  hello@casanova.ng
                </a>.
              </p>
            </LegalSection>

            <LegalSection title="8. Security">
              <p>
                We implement industry-standard technical and organisational measures to protect your data,
                including HTTPS encryption, access controls, and regular security reviews. No system is
                completely secure; we will notify you promptly of any breach that affects your data.
              </p>
            </LegalSection>

            <LegalSection title="9. Changes to this policy">
              <p>
                We may update this policy periodically. The date at the top of this page reflects the
                most recent revision. Continued use of the platform after changes constitutes acceptance.
              </p>
            </LegalSection>

            <LegalSection title="10. Contact">
              <p>
                Questions or concerns about this policy should be addressed to:{' '}
                <a href="mailto:hello@casanova.ng" style={{ color: 'var(--color-accent-base)' }}>
                  hello@casanova.ng
                </a>
              </p>
            </LegalSection>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <Heading as={2} size="h5" className="mb-4" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </Heading>
      <div className="legal-body">
        {children}
      </div>
    </section>
  )
}
