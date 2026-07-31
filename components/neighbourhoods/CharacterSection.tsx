import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'

interface CharacterSectionProps {
  name:      string
  character: string[]
}

export function CharacterSection({ name, character }: CharacterSectionProps) {
  return (
    <Section
      spacing="lg"
      bg="default"
      aria-label={`The character of ${name}`}
    >
      <Container width="wide">
        <div style={{ maxWidth: '70ch' }}>
          {character.map((paragraph, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.08}>
              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.85,
                  marginBottom: i < character.length - 1 ? '1.5rem' : 0,
                }}
              >
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
