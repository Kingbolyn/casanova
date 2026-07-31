import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import type { LivingHereCard } from '@/lib/data/neighbourhoods'

interface LivingHereCardsProps {
  cards: [LivingHereCard, LivingHereCard, LivingHereCard]
  name:  string
}

export function LivingHereCards({ cards, name }: LivingHereCardsProps) {
  return (
    <Section
      spacing="lg"
      bg="default"
      aria-label={`Living in ${name}`}
    >
      <Container width="wide">
        <FadeIn direction="up">
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '2.5rem',
            }}
          >
            Living Here
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <FadeIn key={card.category} direction="up" delay={i * 0.1}>
              <div
                style={{
                  backgroundColor: 'var(--color-surface-elevated)',
                  border: '1px solid var(--color-border-base)',
                  padding: '2rem 2.5rem',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '2px',
                    backgroundColor: 'var(--color-accent-base)',
                    marginBottom: '1.5rem',
                  }}
                  aria-hidden="true"
                />
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {card.category}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.75,
                  }}
                >
                  {card.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
