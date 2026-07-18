'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { properties } from '@/lib/data/properties'
import type { Property } from '@/lib/types'

interface SearchOverlayProps {
  isOpen:  boolean
  onClose: () => void
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} style={{ backgroundColor: 'rgba(201,169,110,0.25)', color: 'inherit', padding: '0 1px' }}>{part}</mark>
      : part
  )
}

function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<Property[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) { setResults([]); return }
    const found = properties.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.location.neighbourhood.toLowerCase().includes(q) ||
      p.location.city.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q)
    )
    setResults(found)
  }, [query])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0"
          style={{ zIndex: 'var(--z-modal)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="absolute left-0 right-0"
            style={{ top: '80px', maxHeight: 'calc(100vh - 120px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', maxHeight: 'inherit' }}>
              {/* Search input */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  backgroundColor: 'var(--color-surface-primary)',
                  borderBottom: '2px solid var(--color-accent-base)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }} />
                  <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'var(--color-text-muted)' }} />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by property, neighbourhood, city…"
                  aria-label="Search properties"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 300,
                    color: 'var(--color-text-primary)',
                  }}
                />
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '1.5rem', lineHeight: 1 }}
                >
                  ×
                </button>
              </div>

              {/* Results */}
              <div style={{ overflowY: 'auto', backgroundColor: 'var(--color-surface-primary)' }}>
                {query.trim() && results.length === 0 && (
                  <div style={{ padding: '2rem 1.5rem', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                    No properties found for "{query}"
                  </div>
                )}

                {results.length > 0 && (
                  <ul role="listbox" aria-label="Search results" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {results.map((p) => (
                      <li key={p.id} role="option" aria-selected="false">
                        <Link
                          href={`/property/${p.slug}`}
                          onClick={onClose}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', textDecoration: 'none', borderBottom: '1px solid var(--color-border-subtle)', transition: 'background 150ms' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                        >
                          <div style={{ position: 'relative', width: '64px', height: '48px', flexShrink: 0, overflow: 'hidden', backgroundColor: 'var(--color-surface-secondary)' }}>
                            <Image src={p.media.hero} alt={p.title} fill className="object-cover" sizes="64px" />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', fontWeight: 400, marginBottom: '0.125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {highlight(p.title, query.trim())}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-wide)' }}>
                              {highlight(`${p.location.neighbourhood}, ${p.location.city}`, query.trim())}
                            </p>
                          </div>
                          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--color-accent-base)', flexShrink: 0, fontWeight: 300 }}>
                            {p.priceLabel}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {!query.trim() && (
                  <div style={{ padding: '1.5rem', color: 'var(--color-text-subtle)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)' }}>
                    TRY: VICTORIA ISLAND · PENTHOUSE · BANANA ISLAND
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { SearchOverlay }
