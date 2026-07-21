'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyFilters, type FilterState } from './PropertyFilters'

interface FilterModalProps {
  open:           boolean
  onClose:        () => void
  filters:        FilterState
  onChange:       (f: FilterState) => void
  neighbourhoods: string[]
  total:          number
}

export function FilterModal({ open, onClose, filters, onChange, neighbourhoods, total }: FilterModalProps) {
  /* Lock scroll */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  /* Escape to close */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 150 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — slides up from bottom */}
          <motion.div
            className="fixed bottom-0 left-0 right-0"
            style={{
              zIndex:          151,
              backgroundColor: 'var(--color-surface-primary)',
              maxHeight:       '90dvh',
              display:         'flex',
              flexDirection:   'column',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-modal="true"
            aria-label="Filter properties"
          >
            {/* Handle + header */}
            <div
              style={{
                padding:      '1rem 1.25rem',
                borderBottom: '1px solid var(--color-border-base)',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'space-between',
                flexShrink:   0,
              }}
            >
              <div
                style={{
                  position:   'absolute',
                  top:        '8px',
                  left:       '50%',
                  transform:  'translateX(-50%)',
                  width:      '36px',
                  height:     '3px',
                  borderRadius: '2px',
                  backgroundColor: 'var(--color-border-base)',
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'var(--text-base)',
                  color:         'var(--color-text-primary)',
                  fontWeight:    300,
                  letterSpacing: 'var(--tracking-snug)',
                  marginTop:     '4px',
                }}
              >
                Refine your search
              </p>
              <button
                onClick={onClose}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-text-muted)', lineHeight: 1,
                  fontSize: '1.5rem', padding: '0 0 0 1rem',
                }}
                aria-label="Close filters"
              >
                ×
              </button>
            </div>

            {/* Scrollable filter content */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '1.25rem' }}>
              <PropertyFilters
                total={total}
                filters={filters}
                onChange={onChange}
                neighbourhoods={neighbourhoods}
              />
            </div>

            {/* Footer — show results */}
            <div
              style={{
                padding:      '1rem 1.25rem',
                borderTop:    '1px solid var(--color-border-base)',
                flexShrink:   0,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  width:           '100%',
                  padding:         '0.875rem',
                  backgroundColor: 'var(--color-accent-base)',
                  color:           '#fff',
                  border:          'none',
                  cursor:          'pointer',
                  fontFamily:      'var(--font-body)',
                  fontSize:        'var(--text-xs)',
                  letterSpacing:   'var(--tracking-widest)',
                }}
              >
                VIEW {total} {total === 1 ? 'RESIDENCE' : 'RESIDENCES'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
