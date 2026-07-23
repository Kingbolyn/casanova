'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Label, Caption } from '@/components/ui/Typography'

const stats = [
  { value: '340+',  label: 'Properties Placed',    note: 'across 12 cities'       },
  { value: '$2.4B', label: 'Portfolio Value',       note: 'under management'       },
  { value: '97%',   label: 'Client Satisfaction',  note: 'verified post-placement' },
  { value: '8 yrs', label: 'Market Experience',    note: 'in premium real estate'  },
]

function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section spacing="xl" bg="primary" id="stats">
      <Container>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-0)' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center px-3 py-6 sm:px-6 sm:py-8 relative"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Vertical divider between items */}
              {i > 0 && (
                <span
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.1)' }}
                />
              )}

              <p
                className="font-display font-light mb-2"
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  lineHeight: '1',
                  color: 'var(--color-accent-base)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {stat.value}
              </p>
              <Label
                className="block mb-1"
                style={{ color: 'var(--color-text-inverse)', letterSpacing: 'var(--tracking-wider)' }}
              >
                {stat.label}
              </Label>
              <Caption style={{ color: 'rgba(255,255,255,0.4)' }}>
                {stat.note}
              </Caption>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { StatsSection }
