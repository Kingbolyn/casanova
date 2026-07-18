'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label, Caption } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'
import { testimonials } from '@/lib/data/testimonials'

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <Section spacing="xl" bg="white" id="testimonials">
      <Container width="narrow">
        <FadeIn direction="up" className="mb-16 text-center">
          <Label color="tertiary" className="block mb-4">
            Client experiences
          </Label>
          <Heading as={2} size="h2">
            What clients say
          </Heading>
        </FadeIn>

        {/* Quote */}
        <div className="relative text-center" style={{ minHeight: '200px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Opening mark */}
              <p
                className="font-display font-light mb-6 select-none"
                style={{ fontSize: '5rem', lineHeight: '0.5', color: 'var(--color-accent-subtle)', userSelect: 'none' }}
                aria-hidden="true"
              >
                &ldquo;
              </p>

              <blockquote>
                <p
                  className="font-display font-light mb-10"
                  style={{
                    fontSize: 'var(--type-h4)',
                    lineHeight: 'var(--leading-snug)',
                    letterSpacing: 'var(--tracking-tight)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {current.quote}
                </p>
                <footer>
                  <p
                    className="font-body font-medium mb-1"
                    style={{ fontSize: 'var(--type-base)', color: 'var(--color-text-primary)' }}
                  >
                    {current.name}
                  </p>
                  <Caption color="tertiary">{current.role}</Caption>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-12" role="tablist" aria-label="Testimonials">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial from ${t.name}`}
              onClick={() => setActive(i)}
              className="transition-all"
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: i === active ? 'var(--color-accent-base)' : 'var(--color-border-default)',
                border: 'none',
                cursor: 'pointer',
                transitionDuration: 'var(--duration-normal)',
                transitionTimingFunction: 'var(--ease-architectural)',
              }}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { TestimonialsSection }
