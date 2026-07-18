'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Heading, Body, Label } from '@/components/ui/Typography'

interface EnquiryFormProps {
  propertyTitle: string
  priceLabel:    string
}

type FormState = 'idle' | 'submitting' | 'success'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--color-border-base)',
  borderRadius: 0,
  backgroundColor: 'transparent',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
  padding: '0.75rem 1rem',
  outline: 'none',
  transition: 'border-color 200ms ease',
}

function EnquiryForm({ propertyTitle, priceLabel }: EnquiryFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitting')
    await new Promise((r) => setTimeout(r, 1200))
    setState('success')
  }

  return (
    <div
      style={{
        border: '1px solid var(--color-border-base)',
        padding: '2rem',
        backgroundColor: 'var(--color-surface-primary)',
        position: 'sticky',
        top: '100px',
      }}
    >
      {/* Price */}
      <div className="mb-6">
        <Label style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
          Guide price
        </Label>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', fontWeight: 300 }}>
          {priceLabel}
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border-base)', paddingTop: '1.5rem' }}>
        <Heading as={3} size="h5" className="mb-6">
          Enquire about this property
        </Heading>

        <AnimatePresence mode="wait">
          {state === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div
                className="inline-flex items-center justify-center mb-4"
                style={{ width: '48px', height: '48px', border: '1px solid var(--color-accent-base)' }}
              >
                <span style={{ color: 'var(--color-accent-base)', fontSize: '1.25rem' }}>✓</span>
              </div>
              <Heading as={4} size="h5" className="mb-2">Enquiry sent</Heading>
              <Body size="sm" color="secondary">
                We'll be in touch within 24 hours to arrange a viewing.
              </Body>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>
                <label
                  htmlFor="enq-name"
                  style={{ display: 'block', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}
                >
                  Full name *
                </label>
                <input
                  id="enq-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  style={inputStyle}
                  placeholder="Your name"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent-base)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-base)')}
                />
              </div>

              <div>
                <label
                  htmlFor="enq-email"
                  style={{ display: 'block', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}
                >
                  Email address *
                </label>
                <input
                  id="enq-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  style={inputStyle}
                  placeholder="you@example.com"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent-base)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-base)')}
                />
              </div>

              <div>
                <label
                  htmlFor="enq-phone"
                  style={{ display: 'block', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}
                >
                  Phone number
                </label>
                <input
                  id="enq-phone"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  style={inputStyle}
                  placeholder="+234 000 000 0000"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent-base)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-base)')}
                />
              </div>

              <div>
                <label
                  htmlFor="enq-message"
                  style={{ display: 'block', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}
                >
                  Message
                </label>
                <textarea
                  id="enq-message"
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  placeholder={`I'm interested in ${propertyTitle}...`}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent-base)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-base)')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={state === 'submitting'}
                className="w-full mt-2"
              >
                Send Enquiry
              </Button>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)', textAlign: 'center', lineHeight: 1.5 }}>
                By submitting you agree to our privacy policy. We will not share your details with third parties.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export { EnquiryForm }
