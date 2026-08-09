'use client'

import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { DUR, EASE } from '@/lib/motion'

interface EnquiryFormProps {
  propertyTitle: string
  propertyId:    string
  priceLabel:    string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  name?:    string
  email?:   string
  phone?:   string
  message?: string
  form?:    string
}

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

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: 'var(--color-error-base)',
}

function EnquiryForm({ propertyTitle, propertyId, priceLabel }: EnquiryFormProps) {
  const [state, setState]   = useState<FormState>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '' })
  const loadedAtRef         = useRef<number>(0)
  const honeyRef            = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadedAtRef.current = Date.now()
  }, [])

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    setErrors((prev) => { const next = { ...prev }; delete next[key as keyof FieldErrors]; return next })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setState('submitting')

    // Client pre-validation
    const clientErrors: FieldErrors = {}
    if (!form.name.trim())  clientErrors.name  = 'Name is required.'
    if (!form.email.trim()) clientErrors.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
                            clientErrors.email = 'Please enter a valid email address.'

    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      setState('idle')
      return
    }

    const payload = {
      name:          form.name.trim(),
      email:         form.email.trim(),
      phone:         form.phone.trim(),
      message:       form.message.trim(),
      propertyTitle,
      propertyId,
      _honey:        honeyRef.current?.value ?? '',
      _loadedAt:     loadedAtRef.current,
    }

    try {
      const res  = await fetch('/api/enquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json() as { success: boolean; errors?: { field: string; message: string }[]; error?: string }

      if (data.success) {
        setState('success')
        return
      }

      if (res.status === 422 && data.errors) {
        const fieldErrors: FieldErrors = {}
        for (const { field, message } of data.errors) {
          fieldErrors[field as keyof FieldErrors] = message
        }
        setErrors(fieldErrors)
        setState('idle')
        return
      }

      setErrors({ form: data.error ?? 'Something went wrong. Please try again or contact us directly.' })
      setState('error')

    } catch {
      setErrors({ form: 'Network error. Please check your connection and try again.' })
      setState('error')
    }
  }

  return (
    <div
      style={{
        border: '1px solid var(--color-border-base)',
        padding: '2rem',
        backgroundColor: 'var(--color-surface-primary)',
        position: 'sticky',
        top: '6rem',
      }}
    >
      {/* Price */}
      <div className="mb-6">
        <Label style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
          Guide price
        </Label>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h4)', color: 'var(--color-text-primary)', fontWeight: 300 }}>
          {priceLabel}
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border-base)', paddingTop: '1.5rem' }}>
        <Heading as={3} size="h5" className="mb-6">
          Enquire about this property
        </Heading>

        <AnimatePresence mode="wait">
          {state === 'success' ? (
            <m.div
              key="success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.standard, ease: EASE.entrance }}
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
                We&apos;ll be in touch within 24 hours to arrange a viewing.
              </Body>
            </m.div>
          ) : (
            <m.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.micro, ease: EASE.standard }}
              aria-busy={state === 'submitting'}
              noValidate
            >
              {/* Honeypot */}
              <input
                ref={honeyRef}
                type="text"
                name="_honey"
                defaultValue=""
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
              />

              {errors.form && (
                <div
                  role="alert"
                  style={{
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--color-error-base)',
                    backgroundColor: 'var(--color-error-light)',
                    color: 'var(--color-error-base)',
                    fontSize: 'var(--text-xs)',
                    lineHeight: 1.5,
                  }}
                >
                  {errors.form}
                </div>
              )}

              {/* Name */}
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
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'enq-err-name' : undefined}
                  value={form.name}
                  onChange={set('name')}
                  style={errors.name ? inputErrorStyle : inputStyle}
                  placeholder="Your name"
                  onFocus={(e) => { if (!errors.name) e.currentTarget.style.borderColor = 'var(--color-accent-base)' }}
                  onBlur={(e)  => { if (!errors.name) e.currentTarget.style.borderColor = 'var(--color-border-base)' }}
                />
                {errors.name && (
                  <p id="enq-err-name" role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-base)', marginTop: '0.25rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
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
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'enq-err-email' : undefined}
                  value={form.email}
                  onChange={set('email')}
                  style={errors.email ? inputErrorStyle : inputStyle}
                  placeholder="you@example.com"
                  onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = 'var(--color-accent-base)' }}
                  onBlur={(e)  => { if (!errors.email) e.currentTarget.style.borderColor = 'var(--color-border-base)' }}
                />
                {errors.email && (
                  <p id="enq-err-email" role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-base)', marginTop: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
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
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'enq-err-phone' : undefined}
                  value={form.phone}
                  onChange={set('phone')}
                  style={errors.phone ? inputErrorStyle : inputStyle}
                  placeholder="+234 000 000 0000"
                  onFocus={(e) => { if (!errors.phone) e.currentTarget.style.borderColor = 'var(--color-accent-base)' }}
                  onBlur={(e)  => { if (!errors.phone) e.currentTarget.style.borderColor = 'var(--color-border-base)' }}
                />
                {errors.phone && (
                  <p id="enq-err-phone" role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-base)', marginTop: '0.25rem' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Message */}
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
                  placeholder={`I'm interested in ${propertyTitle}…`}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent-base)')}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = 'var(--color-border-base)')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={state === 'submitting'}
                disabled={state === 'submitting'}
                className="w-full mt-2"
              >
                {state === 'submitting' ? 'Sending…' : 'Send Enquiry'}
              </Button>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                By submitting you agree to our privacy policy. We will not share your details with third parties.
              </p>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export { EnquiryForm }
