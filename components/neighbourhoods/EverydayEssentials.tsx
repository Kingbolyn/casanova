import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import type { EverydayEssentials as EssentialsData } from '@/lib/data/neighbourhoods'

interface EverydayEssentialsProps {
  data: EssentialsData
  name: string
}

const categories: Array<{ key: keyof EssentialsData; label: string; icon: React.ReactNode }> = [
  { key: 'schools',       label: 'Schools',       icon: <SchoolIcon /> },
  { key: 'restaurants',   label: 'Restaurants',   icon: <RestaurantIcon /> },
  { key: 'shopping',      label: 'Shopping',      icon: <ShoppingIcon /> },
  { key: 'healthcare',    label: 'Healthcare',    icon: <HealthIcon /> },
  { key: 'parks',         label: 'Parks',         icon: <ParkIcon /> },
  { key: 'business',      label: 'Business',      icon: <BusinessIcon /> },
  { key: 'entertainment', label: 'Entertainment', icon: <EntertainmentIcon /> },
]

export function EverydayEssentials({ data, name }: EverydayEssentialsProps) {
  return (
    <Section spacing="lg" bg="light" aria-label="Everyday essentials">
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
            Everyday Essentials in {name}
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {categories.map((cat, i) => (
            <FadeIn key={cat.key} direction="up" delay={i * 0.06}>
              <section aria-label={cat.label}>
                <div
                  style={{ color: 'var(--color-accent-base)', marginBottom: '0.75rem' }}
                  aria-hidden="true"
                >
                  {cat.icon}
                </div>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {cat.label}
                </p>
                <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(data[cat.key] as string[]).map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '0.375rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function SchoolIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 7v6M18 7v6M5 8.5v5.5a7 7 0 0 0 10 0V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function RestaurantIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 2v7a3 3 0 0 1-3 3v6M4 2v4M7 2V6M14 2v16M17 2a3 3 0 0 1-3 3v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ShoppingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14l-1.5 9H4.5L3 5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 5V4a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function HealthIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ParkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 12v6M7 18h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function BusinessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="7" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 12h16" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function EntertainmentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8 5l7 5-7 5V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}
