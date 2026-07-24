'use client'

import { useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ModalProps {
  open:        boolean
  onClose:     () => void
  size?:       ModalSize
  title?:      string
  children:    React.ReactNode
  className?:  string
  closeOnOverlay?: boolean
}

const maxWidth: Record<ModalSize, string> = {
  sm:   '400px',
  md:   '560px',
  lg:   '720px',
  xl:   '960px',
  full: '100%',
}

function Modal({
  open,
  onClose,
  size = 'md',
  title,
  children,
  className,
  closeOnOverlay = true,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <m.div
            className="fixed inset-0"
            style={{
              backgroundColor: 'var(--color-overlay-dark)',
              zIndex: 'var(--z-modal)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 'var(--z-modal)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            <m.div
              className={cn(
                'relative w-full rounded-[--radius-lg] overflow-hidden',
                'shadow-[--shadow-6]',
                className
              )}
              style={{
                maxWidth: maxWidth[size],
                backgroundColor: 'var(--color-surface-white)',
              }}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: 8,  scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <div
                  className="flex items-center justify-between px-8 py-6 border-b"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <h2
                    id="modal-title"
                    className="font-display font-light"
                    style={{ fontSize: 'var(--type-h5)', color: 'var(--color-text-primary)' }}
                  >
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-[--radius-sm] transition-colors hover:bg-[--color-surface-light]"
                    style={{ transitionDuration: 'var(--duration-fast)', color: 'var(--color-text-tertiary)' }}
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Body */}
              <div className="p-8">{children}</div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export { Modal }
export type { ModalProps, ModalSize }
