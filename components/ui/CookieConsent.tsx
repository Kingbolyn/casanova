'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'casanova_consent'

type ConsentValue = 'accepted' | 'declined'

function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(CONSENT_KEY) as ConsentValue) ?? null
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getStoredConsent() === null) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-desc"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(calc(100vw - 32px), 560px)',
        backgroundColor: 'var(--color-surface-white, #fff)',
        border: '1px solid var(--color-border-subtle, #e5e5e5)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        zIndex: 9999,
        animation: 'consent-slide-up 0.35s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <style>{`
        @keyframes consent-slide-up {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <p
        id="cookie-consent-desc"
        style={{
          flex: 1,
          margin: 0,
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          maxWidth: 'none',
        }}
      >
        We use cookies to improve your experience. See our{' '}
        <Link href="/cookies" style={{ color: 'var(--color-accent-base)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
          Cookie Policy
        </Link>.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '9px 16px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: '1px solid var(--color-border-subtle, #e5e5e5)',
            background: 'transparent',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
          aria-label="Decline non-essential cookies"
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: '9px 16px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: '1px solid var(--color-text-primary)',
            background: 'var(--color-text-primary)',
            color: 'var(--color-text-inverse)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'opacity 0.15s',
          }}
          aria-label="Accept all cookies"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
