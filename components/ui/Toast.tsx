'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

/* ─── Types ──────────────────────────────────────────────── */

type ToastVariant = 'success' | 'error' | 'info'

interface Toast {
  id:       string
  message:  string
  variant:  ToastVariant
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void
}

/* ─── Context ────────────────────────────────────────────── */

const ToastContext = createContext<ToastContextValue | null>(null)

/* ─── Icons ──────────────────────────────────────────────── */

const icons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 7.5v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="8" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
  ),
}

const variantStyles: Record<ToastVariant, React.CSSProperties> = {
  success: { borderLeftColor: 'var(--color-success-base)',  color: 'var(--color-success-base)'  },
  error:   { borderLeftColor: 'var(--color-error-base)',    color: 'var(--color-error-base)'    },
  info:    { borderLeftColor: 'var(--color-accent-base)',   color: 'var(--color-accent-base)'   },
}

/* ─── Provider ───────────────────────────────────────────── */

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) { clearTimeout(timer); timers.current.delete(id) }
  }, [])

  const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    setToasts((prev) => [...prev.slice(-3), { id, message, variant }])
    const timer = setTimeout(() => dismiss(id), 4500)
    timers.current.set(id, timer)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Portal */}
      <div
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          zIndex: 'var(--z-toast, 9000)' as React.CSSProperties['zIndex'],
          maxWidth: '380px',
          width: 'calc(100vw - 3rem)',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <m.div
              key={t.id}
              role="alert"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: 4,  scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ pointerEvents: 'auto' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'var(--color-surface-white)',
                  borderLeft: '3px solid',
                  borderLeftColor: variantStyles[t.variant].borderLeftColor,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                }}
              >
                <span style={{ flexShrink: 0, paddingTop: '1px', color: variantStyles[t.variant].color }}>
                  {icons[t.variant]}
                </span>
                <p
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--type-small)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {t.message}
                </p>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  style={{
                    flexShrink: 0,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-tertiary)',
                    padding: '2px',
                    lineHeight: 1,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

/* ─── Hook ───────────────────────────────────────────────── */

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export { ToastProvider, useToast }
export type { Toast, ToastVariant }
