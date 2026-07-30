'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { DUR, EASE } from '@/lib/motion'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'

const PanoramaViewer = dynamic(
  () => import('./PanoramaViewer').then((m) => ({ default: m.PanoramaViewer })),
  { ssr: false }
)

interface PropertyGalleryProps {
  images:    string[]
  title:     string
  panorama?: string
}

/* ─── Icon primitives ────────────────────────────────────── */

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function Icon360() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <ellipse cx="8" cy="8" rx="7" ry="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

/* ─── Style constants ────────────────────────────────────── */

const glassBtn: React.CSSProperties = {
  borderRadius: '50%',
  background: 'rgba(0,0,0,0.35)',
  border: '1px solid rgba(255,255,255,0.14)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  color: 'rgba(255,255,255,0.85)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s, border-color 0.2s',
  padding: 0,
  flexShrink: 0,
}

/* ─── Component ──────────────────────────────────────────── */

function PropertyGallery({ images, title, panorama }: PropertyGalleryProps) {
  const [active, setActive]       = useState(0)
  const [lightbox, setLightbox]   = useState(false)
  const [immersive, setImmersive] = useState(false)

  const lightboxRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<Element | null>(null)
  const touchStartX = useRef(0)

  useFocusTrap(lightboxRef, lightbox)

  /* Body scroll lock + focus management */
  useEffect(() => {
    if (lightbox) {
      returnFocus.current = document.activeElement
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeBtnRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
      if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus()
      returnFocus.current = null
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length])

  const handleLightboxKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'Escape')     setLightbox(false)
  }, [prev, next])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
  }, [prev, next])

  /* ── Main hero image ── */
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: 'var(--color-surface-secondary)', cursor: 'zoom-in' }}
        onClick={() => setLightbox(true)}
        role="button"
        tabIndex={0}
        aria-label={`Open photo gallery for ${title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightbox(true) }
          if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
          if (e.key === 'ArrowRight') { e.preventDefault(); next() }
        }}
      >
        <AnimatePresence mode="wait">
          <m.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.large, ease: EASE.standard }}
          >
            <Image
              src={images[active]}
              alt={`${title}, photo ${active + 1} of ${images.length}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={active === 0}
            />
          </m.div>
        </AnimatePresence>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ ...glassBtn, width: '40px', height: '40px' }}
              aria-label="Previous photo"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ ...glassBtn, width: '40px', height: '40px' }}
              aria-label="Next photo"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Counter */}
        <div
          className="absolute bottom-4 right-4"
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-widest)',
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: '0.2rem 0.6rem',
          }}
        >
          {active + 1} / {images.length}
        </div>

        {/* 360° trigger */}
        {panorama && (
          <button
            onClick={(e) => { e.stopPropagation(); setImmersive(true) }}
            className="absolute bottom-4 left-4 flex items-center gap-2"
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.4rem 0.875rem',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            aria-label="Enter 360° immersive view"
          >
            <Icon360 />
            360° VIEW
          </button>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div
          className="flex gap-1.5 mt-2"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '2px' }}
          role="list"
          aria-label="Gallery thumbnails"
        >
          {images.map((src, i) => (
            <button
              key={i}
              role="listitem"
              onClick={() => setActive(i)}
              className="relative flex-shrink-0"
              style={{
                width: '72px',
                height: '54px',
                overflow: 'hidden',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: 'var(--color-surface-secondary)',
                border: i === active
                  ? '1.5px solid var(--color-accent-base)'
                  : '1.5px solid transparent',
                transition: 'border-color 0.2s',
              }}
              aria-label={`Photo ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="72px"
              />
              {i !== active && (
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.28)' }} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <m.div
            ref={lightboxRef}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 'var(--z-modal)', backgroundColor: 'rgba(0,0,0,0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE.standard }}
            onClick={() => setLightbox(false)}
            onKeyDown={handleLightboxKey}
            role="dialog"
            aria-label={`Photo gallery for ${title}`}
            aria-modal="true"
          >

            {/* Close */}
            <button
              ref={closeBtnRef}
              onClick={() => setLightbox(false)}
              className="absolute flex items-center justify-center"
              style={{
                ...glassBtn,
                width: '48px',
                height: '48px',
                top: '20px',
                right: '20px',
                position: 'absolute',
                zIndex: 20,
              }}
              aria-label="Close gallery"
            >
              <CloseIcon />
            </button>

            {/* Image container - arrows anchored inside, swipe gestures here */}
            <AnimatePresence mode="wait">
              <m.div
                key={active}
                style={{
                  position: 'relative',
                  width: '92vw',
                  maxWidth: '1400px',
                  height: '78vh',
                  flexShrink: 0,
                }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE.entrance }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={images[active]}
                  alt={`${title}, photo ${active + 1} of ${images.length}`}
                  fill
                  className="object-contain"
                  sizes="92vw"
                  priority
                />

                {/* Prev arrow - anchored inside the image container */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); prev() }}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ ...glassBtn, width: '48px', height: '48px' }}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft />
                  </button>
                )}

                {/* Next arrow - anchored inside the image container */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); next() }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ ...glassBtn, width: '48px', height: '48px' }}
                    aria-label="Next photo"
                  >
                    <ChevronRight />
                  </button>
                )}
              </m.div>
            </AnimatePresence>

            {/* Counter + thumbnails - beneath the image */}
            <m.div
              className="flex flex-col items-center"
              style={{ gap: '0.875rem', marginTop: '1.125rem', zIndex: 10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.18, ease: EASE.standard }}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-widest)',
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1,
                }}
              >
                {active + 1} / {images.length}
              </p>

              {images.length > 1 && (
                <div
                  className="flex gap-1.5"
                  style={{ overflowX: 'auto', scrollbarWidth: 'none', maxWidth: 'min(92vw, 1400px)', paddingBottom: '2px' }}
                  role="list"
                  aria-label="Photo thumbnails"
                >
                  {images.map((src, i) => (
                    <button
                      key={i}
                      role="listitem"
                      onClick={(e) => { e.stopPropagation(); setActive(i) }}
                      className="relative flex-shrink-0"
                      style={{
                        width: '56px',
                        height: '42px',
                        overflow: 'hidden',
                        padding: 0,
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: i === active
                          ? '1.5px solid var(--color-accent-base)'
                          : '1.5px solid rgba(255,255,255,0.10)',
                        opacity: i === active ? 1 : 0.52,
                        transition: 'border-color 0.2s, opacity 0.2s',
                      }}
                      aria-label={`Photo ${i + 1}`}
                      aria-pressed={i === active}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </m.div>

          </m.div>
        )}
      </AnimatePresence>

      {/* ── Panorama viewer ── */}
      <AnimatePresence>
        {immersive && panorama && (
          <PanoramaViewer
            url={panorama}
            title={title}
            onClose={() => setImmersive(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export { PropertyGallery }
