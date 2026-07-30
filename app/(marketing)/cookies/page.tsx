import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How CasaNova uses cookies and similar technologies on its platform.',
  alternates: { canonical: '/cookies' },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'July 2026'

export default function CookiesPage() {
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
              Cookie Policy
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
            <LegalSection title="1. What are cookies">
              <p>
                Cookies are small text files placed on your device when you visit a website. They allow
                the site to remember your preferences, understand how you use it, and deliver relevant
                content. Cookies cannot execute code or carry viruses.
              </p>
            </LegalSection>

            <LegalSection title="2. Cookies we use">
              <p>We use three categories of cookies:</p>

              <div style={{ marginTop: '1.25rem' }}>
                <p><strong>Strictly necessary cookies</strong></p>
                <p>
                  These are required for the Platform to function. They do not require your consent
                  and cannot be disabled through our banner. They include:
                </p>
                <CookieTable rows={[
                  ['casanova_consent', 'Stores your cookie consent preference', 'casanova.ng', '12 months'],
                ]} />
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <p><strong>Analytics cookies</strong> <em>(requires consent)</em></p>
                <p>
                  These help us understand how visitors interact with the Platform so we can improve it.
                  All data is anonymised and aggregated.
                </p>
                <CookieTable rows={[
                  ['_ga', 'Google Analytics client ID', 'casanova.ng', '2 years'],
                  ['_ga_*', 'Google Analytics session', 'casanova.ng', '2 years'],
                ]} />
              </div>
            </LegalSection>

            <LegalSection title="3. Cookies we do not use">
              <p>CasaNova does not use:</p>
              <ul>
                <li>Advertising or targeting cookies</li>
                <li>Social media tracking pixels</li>
                <li>Third-party retargeting</li>
                <li>Fingerprinting or device identification beyond analytics</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Your choices">
              <p>
                When you first visit the Platform, a consent banner gives you the choice to accept or
                decline analytics cookies. Strictly necessary cookies are always active. You can change
                your preference at any time by clearing the <code>casanova_consent</code> cookie in
                your browser settings and refreshing the page.
              </p>
              <p>
                You can also control cookies directly through your browser. Most browsers allow you
                to refuse all cookies, delete existing cookies, or set preferences per site.
              </p>
            </LegalSection>

            <LegalSection title="5. Third-party cookies">
              <p>
                Google Analytics sets cookies under the <code>google.com</code> domain. These are
                governed by{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent-base)' }}
                >
                  Google's Privacy Policy
                </a>.
                We use IP anonymisation and have disabled data sharing with Google advertising products.
              </p>
            </LegalSection>

            <LegalSection title="6. Changes to this policy">
              <p>
                We may update this Cookie Policy periodically. The date at the top of this page reflects
                the most recent revision.
              </p>
            </LegalSection>

            <LegalSection title="7. Contact">
              <p>
                Questions about our use of cookies can be directed to{' '}
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

function CookieTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            {['Name', 'Purpose', 'Domain', 'Expires'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px 8px 0',
                  color: 'var(--color-text-muted)',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, purpose, domain, expires]) => (
            <tr key={name} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
              <td style={{ padding: '10px 12px 10px 0', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-text-primary)' }}>{name}</td>
              <td style={{ padding: '10px 12px 10px 0', color: 'var(--color-text-secondary)' }}>{purpose}</td>
              <td style={{ padding: '10px 12px 10px 0', color: 'var(--color-text-secondary)' }}>{domain}</td>
              <td style={{ padding: '10px 12px 10px 0', color: 'var(--color-text-secondary)' }}>{expires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
