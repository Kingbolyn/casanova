import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'

interface NeighbourhoodHeroProps {
  variant:   'index' | 'individual'
  image:     string
  focalY:    string
  eyebrow:   string
  heading:   string
  tagline?:  string
}

export function NeighbourhoodHero({
  variant,
  image,
  focalY,
  eyebrow,
  heading,
  tagline,
}: NeighbourhoodHeroProps) {
  const height = variant === 'index' ? '100svh' : '90svh'

  return (
    <section
      className="relative overflow-hidden"
      style={{ height, minHeight: '580px', backgroundColor: '#111' }}
      aria-label={`${heading} hero`}
    >
      <Image
        src={image}
        alt={heading}
        fill
        priority
        sizes="100vw"
        quality={80}
        style={{ objectFit: 'cover', objectPosition: `center ${focalY}`, opacity: 0.65 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.05) 100%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 pb-16 lg:pb-24">
        <Container width="wide">
          <FadeIn direction="up">
            <p
              className="mb-4"
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {eyebrow}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-h1)',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: tagline ? '1rem' : 0,
              }}
            >
              {heading}
            </h1>
            {tagline && (
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--type-h3)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--color-accent-base)',
                  lineHeight: 1.4,
                }}
              >
                {tagline}
              </p>
            )}
          </FadeIn>
        </Container>
      </div>
    </section>
  )
}
