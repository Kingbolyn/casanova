import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of the CasaNova platform.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'July 2026'

export default function TermsPage() {
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
              Terms of Service
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
            <LegalSection title="1. Acceptance of terms">
              <p>
                By accessing or using the CasaNova platform at casanova.ng (the "Platform"), you agree
                to be bound by these Terms of Service. If you do not agree, please do not use the Platform.
                These terms apply to all visitors, enquirers, and registered users.
              </p>
            </LegalSection>

            <LegalSection title="2. Nature of the service">
              <p>
                CasaNova is an information and discovery platform. We present residential properties
                for viewing and enquiry. We are not a party to any transaction between buyer and seller
                or landlord and tenant. All property transactions are conducted directly between the
                relevant parties and are governed by applicable Nigerian property law.
              </p>
              <p>
                Property details, pricing, and availability are provided in good faith but are subject
                to change without notice. CasaNova makes no warranties regarding the accuracy or
                completeness of any property listing.
              </p>
            </LegalSection>

            <LegalSection title="3. Permitted use">
              <p>You may use the Platform to:</p>
              <ul>
                <li>Browse and explore listed properties.</li>
                <li>Submit genuine enquiries about properties.</li>
                <li>Request viewings or additional information.</li>
              </ul>
              <p>You may not:</p>
              <ul>
                <li>Scrape, copy, or republish property data without written permission.</li>
                <li>Submit false or misleading enquiries.</li>
                <li>Attempt to interfere with the technical operation of the Platform.</li>
                <li>Use the Platform for any unlawful purpose.</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Intellectual property">
              <p>
                All content on the Platform — including photography, copy, design, and code — is the
                property of CasaNova or its licensors. You may not reproduce, distribute, or create
                derivative works without express written consent.
              </p>
              <p>
                Property photography is used under licence from respective photographers and property
                owners. Enquiries about specific image rights should be directed to{' '}
                <a href="mailto:hello@casanova.ng" style={{ color: 'var(--color-accent-base)' }}>
                  hello@casanova.ng
                </a>.
              </p>
            </LegalSection>

            <LegalSection title="5. Enquiries and viewings">
              <p>
                Submitting an enquiry does not constitute a reservation or any form of contractual
                commitment. It is a request for information or a viewing, which CasaNova will respond
                to in good faith. We reserve the right to decline any enquiry at our discretion.
              </p>
            </LegalSection>

            <LegalSection title="6. Disclaimers">
              <p>
                The Platform is provided "as is" without warranties of any kind, express or implied.
                CasaNova does not warrant that the Platform will be uninterrupted, error-free, or free
                of viruses or other harmful components. Property valuations, rental estimates, and
                investment commentary are illustrative only and do not constitute financial advice.
              </p>
            </LegalSection>

            <LegalSection title="7. Limitation of liability">
              <p>
                To the maximum extent permitted by applicable law, CasaNova shall not be liable for
                any indirect, incidental, consequential, or punitive damages arising from your use of
                the Platform or any property transaction facilitated through it.
              </p>
            </LegalSection>

            <LegalSection title="8. Governing law">
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute
                arising from these terms shall be subject to the exclusive jurisdiction of the courts
                of Lagos State, Nigeria.
              </p>
            </LegalSection>

            <LegalSection title="9. Changes to these terms">
              <p>
                We may revise these terms at any time. The updated date at the top of this page
                reflects the most recent revision. Continued use of the Platform after changes
                constitutes acceptance of the revised terms.
              </p>
            </LegalSection>

            <LegalSection title="10. Contact">
              <p>
                For questions about these terms, contact us at{' '}
                <a href="mailto:hello@casanova.ng" style={{ color: 'var(--color-accent-base)' }}>
                  hello@casanova.ng
                </a>.
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
