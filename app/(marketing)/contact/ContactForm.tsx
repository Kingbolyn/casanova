'use client'

import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { DUR, EASE } from '@/lib/motion'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  name?:    string
  email?:   string
  subject?: string
  message?: string
  form?:    string
}

export function ContactForm() {
  const [status, setStatus]       = useState<Status>('idle')
  const [errors, setErrors]       = useState<FieldErrors>({})
  const loadedAtRef               = useRef<number>(0)

  useEffect(() => {
    loadedAtRef.current = Date.now()
  }, [])

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setStatus('submitting')

    const fd = new FormData(e.currentTarget)

    const payload = {
      name:      (fd.get('name')    as string ?? '').trim(),
      email:     (fd.get('email')   as string ?? '').trim(),
      subject:   (fd.get('subject') as string ?? '').trim(),
      message:   (fd.get('message') as string ?? '').trim(),
      // spam signals
      _honey:    (fd.get('_honey')  as string ?? '').trim(),
      _loadedAt: loadedAtRef.current,
    }

    // Client-side pre-check (mirrors server rules)
    const clientErrors: FieldErrors = {}
    if (!payload.name)    clientErrors.name    = 'Name is required.'
    if (!payload.email)   clientErrors.email   = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email))
                          clientErrors.email   = 'Please enter a valid email address.'
    if (!payload.subject) clientErrors.subject = 'Subject is required.'
    if (!payload.message) clientErrors.message = 'Message is required.'

    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      setStatus('idle')
      return
    }

    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json() as { success: boolean; errors?: { field: string; message: string }[]; error?: string }

      if (data.success) {
        setStatus('success')
        return
      }

      if (res.status === 422 && data.errors) {
        const fieldErrors: FieldErrors = {}
        for (const { field, message } of data.errors) {
          fieldErrors[field as keyof FieldErrors] = message
        }
        setErrors(fieldErrors)
        setStatus('idle')
        return
      }

      if (res.status === 429) {
        setErrors({ form: data.error ?? 'Too many requests. Please wait before trying again.' })
        setStatus('error')
        return
      }

      setErrors({ form: data.error ?? 'Something went wrong. Please try again or email us directly.' })
      setStatus('error')

    } catch {
      setErrors({ form: 'Network error. Please check your connection and try again.' })
      setStatus('error')
    }
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
              width: '48px', height: '48px',
              border: '1px solid var(--color-accent-base)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
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
          aria-busy={status === 'submitting'}
          noValidate
        >
          {/* Honeypot — hidden from humans, filled by bots */}
          <input
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
                padding: '0.875rem 1rem',
                border: '1px solid var(--color-error-base)',
                backgroundColor: 'var(--color-error-light)',
                color: 'var(--color-error-base)',
                fontSize: 'var(--text-sm)',
                marginBottom: '1.5rem',
                lineHeight: 1.5,
              }}
            >
              {errors.form}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <Input
                label="Full Name"
                placeholder="Your name"
                name="name"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
                onChange={() => clearError('name')}
              />
              {errors.name && (
                <p id="err-name" role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-base)', marginTop: '0.375rem' }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <Input
                label="Email Address"
                placeholder="your@email.com"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
                onChange={() => clearError('email')}
              />
              {errors.email && (
                <p id="err-email" role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-base)', marginTop: '0.375rem' }}>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <Input
              label="Subject"
              placeholder="How can we help?"
              name="subject"
              required
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'err-subject' : undefined}
              onChange={() => clearError('subject')}
            />
            {errors.subject && (
              <p id="err-subject" role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-base)', marginTop: '0.375rem' }}>
                {errors.subject}
              </p>
            )}
          </div>

          <div className="mb-10">
            <Textarea
              label="Message"
              placeholder="Tell us about the property you're looking for…"
              name="message"
              rows={6}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'err-message' : undefined}
              onChange={() => clearError('message')}
            />
            {errors.message && (
              <p id="err-message" role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error-base)', marginTop: '0.375rem' }}>
                {errors.message}
              </p>
            )}
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
