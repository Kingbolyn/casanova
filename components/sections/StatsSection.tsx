'use client'

import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Label, Caption } from '@/components/ui/Typography'

const pillars = [
  {
    title: 'Curated Selection',
    body:  'Properties chosen for architectural distinction, location quality, and permanent value — not volume.',
  },
  {
    title: 'Editorial Presentation',
    body:  'Each property experienced before it is evaluated. Photography, copy, and digital experience built for discovery.',
  },
  {
    title: 'Personal Guidance',
    body:  'An advisor alongside you from first enquiry through to handover. Never anonymous. Always accountable.',
  },
  {
    title: 'Honest Representation',
    body:  'Every detail verified. Precise descriptions. Clear pricing. No exaggeration, no pressure, no fabricated claims.',
  },
]

function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section spacing="xl" bg="primary" id="pillars">
      <Container>
        <div ref={ref} role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-0)' }}>
          {pillars.map((pillar, i) => (
            <m.div
              key={pillar.title}
              role="listitem"
              className="flex flex-col px-6 py-8 relative"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Vertical divider between items on large screens */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                />
              )}

              {/* Accent line */}
              <div
                aria-hidden="true"
                style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-accent-base)', marginBottom: '1.25rem' }}
              />

              <Label
                className="block mb-3"
                style={{ color: 'var(--color-text-inverse)', letterSpacing: 'var(--tracking-wider)' }}
              >
                {pillar.title}
              </Label>

              <Caption style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                {pillar.body}
              </Caption>
            </m.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { StatsSection }
