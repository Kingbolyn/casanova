import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { Container } from '@/components/layout/Container'

interface NeighbourhoodAdvisorCTAProps {
  name?:    string
  variant?: 'index' | 'individual'
}

export function NeighbourhoodAdvisorCTA({
  name,
  variant = 'individual',
}: NeighbourhoodAdvisorCTAProps) {
  const eyebrow = variant === 'index'
    ? 'Ready to Find Where You Belong?'
    : `Ready to Explore ${name}?`

  return (
    <section
      aria-label="Speak with an advisor"
      style={{ backgroundColor: '#0a0a0a', padding: '6rem 0 8rem' }}
    >
      <Container width="wide">
        <FadeIn direction="up">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
              }}
            >
              {eyebrow}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h2)',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              Our advisors know these streets.
            </h2>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'rgba(255,255,255,0.60)',
                marginBottom: '2.5rem',
                lineHeight: 1.75,
              }}
            >
              Every neighbourhood has its own rhythm. We will help you find the home that belongs in the right one for you.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.875rem 2rem',
                backgroundColor: 'var(--color-accent-base)',
                color: '#ffffff',
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              Speak With an Advisor
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
