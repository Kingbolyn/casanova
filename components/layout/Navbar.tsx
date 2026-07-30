'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { useNavScroll } from '@/lib/hooks/useNavScroll'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/lib/hooks/useLockBodyScroll'
import { primaryNav } from '@/lib/data/navigation'
import { Button } from '@/components/ui/Button'
import { SearchOverlay } from '@/components/ui/SearchOverlay'
import { cn } from '@/lib/utils/cn'

function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const { scrolled, hidden } = useNavScroll()
  const pathname = usePathname()
  const router   = useRouter()

  const hamburgerRef  = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useLockBodyScroll(mobileOpen)
  useFocusTrap(mobileMenuRef, mobileOpen)

  useEffect(() => {
    if (mobileOpen) {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>('a, button')
      setTimeout(() => firstLink?.focus(), 80)
    } else {
      hamburgerRef.current?.focus()
    }
  }, [mobileOpen])


  const isHome = pathname === '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0',
          scrolled ? 'bg-[--color-surface-white] shadow-[--shadow-2]' : 'bg-transparent'
        )}
        style={{
          zIndex: 'var(--z-nav)',
          transform: (hidden && !mobileOpen) ? 'translateY(-100%)' : 'translateY(0)',
          transition: `
            transform    var(--dur-standard) var(--ease-standard),
            background   var(--dur-standard) var(--ease-standard),
            box-shadow   var(--dur-standard) var(--ease-standard)
          `.trim(),
        }}
      >
        <div className="container-content">
          <nav
            className="flex items-center justify-between"
            style={{ height: scrolled ? '72px' : '88px', transition: 'height var(--dur-standard) var(--ease-standard)' }}
            aria-label="Primary navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="font-display font-light tracking-tight"
              style={{
                fontSize: 'var(--type-h5)',
                color: isHome && !scrolled ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                transition: 'color var(--dur-micro) var(--ease-standard)',
              }}
              aria-label="CasaNova Home"
            >
              CasaNova
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-10 list-none" role="list">
              {primaryNav.map((item) => {
                const active = pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative inline-block font-body font-medium tracking-widest uppercase text-[11px] transition-colors"
                      style={{
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        color: isHome && !scrolled
                          ? active ? 'var(--color-text-inverse)' : 'rgba(255,255,255,0.85)'
                          : active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        transitionDuration: 'var(--dur-micro)',
                        transitionTimingFunction: 'var(--ease-standard)',
                      }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                      {active && (
                        <m.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px"
                          style={{ backgroundColor: 'var(--color-accent-base)' }}
                          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Search + CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isHome && !scrolled ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <Button
                variant={isHome && !scrolled ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => router.push('/contact')}
                style={
                  isHome && !scrolled
                    ? {
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'var(--color-text-inverse)',
                        background: 'transparent',
                      }
                    : undefined
                }
              >
                Book a Viewing
              </Button>
            </div>

            {/* Mobile search + toggle */}
            <button
              ref={hamburgerRef}
              className="flex md:hidden flex-col justify-center items-center gap-1.5 w-10 h-10"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {[0, 1, 2].map((i) => (
                <m.span
                  key={i}
                  className="block w-6 h-px origin-center"
                  style={{ backgroundColor: isHome && !scrolled ? 'var(--color-text-inverse)' : 'var(--color-text-primary)' }}
                  animate={
                    mobileOpen
                      ? i === 0 ? { rotate: 45,  y: 8,  opacity: 1 }
                      : i === 1 ? { opacity: 0 }
                      :           { rotate: -45, y: -8, opacity: 1 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              ))}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen ? (
          <m.div
            key="mobile-backdrop"
            className="fixed inset-0 md:hidden"
            style={{ backgroundColor: 'rgba(10,10,10,0.55)', zIndex: 'calc(var(--z-nav) - 1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <m.div
            key="mobile-drawer"
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed top-0 right-0 bottom-0 md:hidden flex flex-col overflow-y-auto"
            style={{
              width: 'min(90vw, 420px)',
              backgroundColor: '#F7F4EF',
              zIndex: 'var(--z-nav)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
          >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  zIndex: 10,
                }}
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* ── Header ── */}
              <m.div
                style={{ padding: '56px 32px 36px' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                  }}
                >
                  CasaNova
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    color: 'var(--color-text-muted)',
                    marginTop: '8px',
                    fontWeight: 500,
                    lineHeight: 1.8,
                  }}
                >
                  LUXURY REAL ESTATE<br />
                  LAGOS · ABUJA
                </div>
              </m.div>

              {/* ── Navigation ── */}
              <nav aria-label="Mobile navigation links" style={{ flex: 1 }}>
                <div style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                  {primaryNav.map((item, i) => {
                    const active = pathname.startsWith(item.href)
                    return (
                      <m.div
                        key={item.href}
                        style={{ position: 'relative' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18 + 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Active indicator */}
                        {active && (
                          <m.span
                            layoutId="mobile-nav-bar"
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '2px',
                              height: '28px',
                              backgroundColor: 'var(--color-accent-base)',
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        <Link
                          href={item.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 32px',
                            minHeight: '76px',
                            fontFamily: 'var(--font-display)',
                            fontSize: '2.125rem',
                            fontWeight: 300,
                            lineHeight: 1,
                            color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                            textDecoration: 'none',
                            borderBottom: '1px solid var(--color-border-subtle)',
                            transition: 'color 0.2s',
                          }}
                          onClick={() => setMobileOpen(false)}
                          aria-current={active ? 'page' : undefined}
                        >
                          {item.label}
                        </Link>
                      </m.div>
                    )
                  })}
                </div>
              </nav>

              {/* ── CTA ── */}
              <m.div
                style={{ padding: '32px 32px 0' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 + 0.06 * primaryNav.length, duration: 0.35 }}
              >
                <button
                  onClick={() => { router.push('/contact'); setMobileOpen(false) }}
                  style={{
                    width: '100%',
                    padding: '17px 24px',
                    backgroundColor: 'var(--color-text-primary)',
                    color: 'var(--color-text-inverse)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    transition: 'background 0.2s',
                  }}
                >
                  BOOK A VIEWING
                </button>
              </m.div>

              {/* ── Footer ── */}
              <m.div
                style={{ padding: '28px 32px 44px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 + 0.06 * primaryNav.length + 0.1, duration: 0.35 }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-muted)',
                    lineHeight: 2.2,
                  }}
                >
                  <div>hello@casanova.ng</div>
                  <div>+234 (0) 800 123 4567</div>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '18px' }}>
                  <a
                    href="#"
                    aria-label="CasaNova on Instagram"
                    style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="CasaNova on LinkedIn"
                    style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="3" />
                      <path d="M7 10v7M7 7.01V7M11 17v-4c0-1.5 1-3 3-3s3 1.5 3 3v4M11 10v7" />
                    </svg>
                  </a>
                </div>
              </m.div>

          </m.div>
        ) : null}
      </AnimatePresence>

      {/* Search overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export { Navbar }
