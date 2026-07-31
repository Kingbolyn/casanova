import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import type { AtAGlance as AtAGlanceData } from '@/lib/data/neighbourhoods'

interface AtAGlanceProps {
  data: AtAGlanceData
  name: string
}

const chips: Array<{
  key:   keyof AtAGlanceData
  label: string
  icon:  React.ReactNode
  format: (v: AtAGlanceData[keyof AtAGlanceData]) => string | null
}> = [
  {
    key:    'propertyCount',
    label:  'Properties',
    icon:   <GridIcon />,
    format: (v) => `${v} Available`,
  },
  {
    key:    'priceRange',
    label:  'Price Range',
    icon:   <PriceIcon />,
    format: (v) => String(v),
  },
  {
    key:    'security',
    label:  'Security',
    icon:   <ShieldIcon />,
    format: (v) => String(v),
  },
  {
    key:    'familyFriendly',
    label:  'Family Friendly',
    icon:   <HouseIcon />,
    format: (v) => (v ? 'Yes' : 'No'),
  },
  {
    key:    'waterfront',
    label:  'Waterfront',
    icon:   <WaveIcon />,
    format: (v) => (v ? String(v) : 'No'),
  },
  {
    key:    'businessAccess',
    label:  'Business Access',
    icon:   <BriefcaseIcon />,
    format: (v) => String(v),
  },
  {
    key:    'lifestyleRating',
    label:  'Lifestyle',
    icon:   <StarIcon />,
    format: (v) => String(v),
  },
]

export function AtAGlance({ data, name }: AtAGlanceProps) {
  return (
    <Section
      spacing="md"
      bg="light"
      aria-label="At a glance"
    >
      <Container width="wide">
        <FadeIn direction="up">
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            {name} at a glance
          </p>
        </FadeIn>
        <ul
          className="flex flex-wrap"
          style={{ gap: '0.75rem' }}
          role="list"
          aria-label={`${name} at a glance`}
        >
          {chips.map((chip, i) => {
            const value = chip.format(data[chip.key])
            if (!value) return null
            return (
              <FadeIn key={chip.key} direction="up" delay={i * 0.05}>
                <li
                  role="listitem"
                  className="inline-flex items-center"
                  style={{
                    gap: '0.5rem',
                    padding: '0.625rem 1rem',
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border-base)',
                    borderRadius: '2px',
                  }}
                >
                  <span aria-hidden="true" style={{ color: 'var(--color-accent-base)', flexShrink: 0 }}>
                    {chip.icon}
                  </span>
                  <span className="sr-only">{chip.label}: </span>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-text-primary)',
                      fontWeight: 300,
                    }}
                  >
                    {value}
                  </span>
                </li>
              </FadeIn>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function PriceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4.5V6M8 10v1.5M6 7.5c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5S9.33 9 8.5 9h-1C6.67 9 6 9.67 6 10.5S6.67 12 7.5 12h1c.83 0 1.5-.67 1.5-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L2.5 4v4c0 3 2.5 5.5 5.5 6 3-0.5 5.5-3 5.5-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function HouseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8.5L8 2.5l6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 6.5V13.5h3v-3h2v3h3V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 9c1-2 2-2 3 0s2 2 3 0 2-2 3 0 2 2 3 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M1 12c1-2 2-2 3 0s2 2 3 0 2-2 3 0 2 2 3 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="5.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 9.5h13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}
