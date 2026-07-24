'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { DUR, EASE } from '@/lib/motion'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('success')
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <m.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.standard, ease: EASE.entrance }}
          className="flex flex-col items-center text-center py-16"
          role="status"
          aria-live="polite"
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid var(--color-accent-base)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              color: 'var(--color-accent-base)',
              fontSize: '1.25rem',
            }}
          >
            ✓
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 300, marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
            Message received
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '40ch', lineHeight: 1.7 }}>
            We&apos;ll be in touch within 24 hours.
          </p>
        </m.div>
      ) : (
        <m.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.micro, ease: EASE.standard }}
          onSubmit={handleSubmit}
          aria-label="Contact form"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Input label="Full Name"     placeholder="Your name"      name="name"    required />
            <Input label="Email Address" placeholder="your@email.com" name="email"   type="email" required />
          </div>
          <div className="mb-8">
            <Input label="Subject" placeholder="How can we help?" name="subject" required />
          </div>
          <div className="mb-10">
            <Textarea
              label="Message"
              placeholder="Tell us about the property you&apos;re looking for…"
              name="message"
              rows={6}
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </Button>
          <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)', marginTop: '1rem', lineHeight: 'var(--leading-normal)' }}>
            We typically respond within 24 hours. Your details are kept strictly private.
          </p>
        </m.form>
      )}
    </AnimatePresence>
  )
}
