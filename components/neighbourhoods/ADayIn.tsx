import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import type { DayEntry } from '@/lib/data/neighbourhoods'

interface ADayInProps {
  name:    string
  entries: DayEntry[]
}

export function ADayIn({ name, entries }: ADayInProps) {
  return (
    <section
      aria-label={`A day in ${name}`}
      style={{ backgroundColor: '#080808', padding: '6rem 0' }}
    >
      <Container width="wide">
        <FadeIn direction="up">
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-accent-base)',
              marginBottom: '3rem',
            }}
          >
            A Day in {name}
          </p>
        </FadeIn>

        <ol
          role="list"
          aria-label={`A day in ${name}`}
          style={{ maxWidth: '800px', listStyle: 'none', padding: 0, margin: 0 }}
        >
          {entries.map((entry, i) => (
            <FadeIn key={entry.time} direction="up" delay={i * 0.07}>
              <li
                role="listitem"
                style={{ marginBottom: i < entries.length - 1 ? '2.5rem' : 0 }}
              >
                <div className="flex gap-0 md:gap-6">
                  <time
                    dateTime={entry.time}
                    style={{
                      display: 'none',
                    }}
                    className="md:block"
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        letterSpacing: 'var(--tracking-widest)',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent-base)',
                        display: 'block',
                        width: '80px',
                        flexShrink: 0,
                        paddingTop: '0.2em',
                      }}
                    >
                      {entry.time}
                    </span>
                  </time>

                  <div>
                    <p
                      className="md:hidden"
                      style={{
                        fontSize: 'var(--text-xs)',
                        letterSpacing: 'var(--tracking-widest)',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent-base)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {entry.time}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.80,
                      }}
                    >
                      {entry.copy}
                    </p>
                  </div>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </section>
  )
}
