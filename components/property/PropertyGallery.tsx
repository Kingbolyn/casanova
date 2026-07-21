'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PanoramaViewer } from './PanoramaViewer'
import { DUR, EASE } from '@/lib/motion'

interface PropertyGalleryProps {
  images:    string[]
  title:     string
  panorama?: string
}

function PropertyGallery({ images, title, panorama }: PropertyGalleryProps) {
  const [active, setActive]     = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [immersive, setImmersive] = useState(false)

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length])

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'Escape')     setLightbox(false)
    if (e.key === 'Enter')      setLightbox(true)
  }, [prev, next])

  return (
    <>
      {/* Main image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: 'var(--color-surface-secondary)', cursor: 'zoom-in' }}
        onClick={() => setLightbox(true)}
        role="button"
        tabIndex={0}
        aria-label={`View gallery for ${title}`}
        onKeyDown={handleKey}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.large, ease: EASE.standard }}
          >
            <Image
              src={images[active]}
              alt={`${title}, image ${active + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: '40px', height: '40px',
                backgroundColor: 'rgba(0,0,0,0.45)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                backdropFilter: 'blur(4px)',
              }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: '40px', height: '40px',
                backgroundColor: 'rgba(0,0,0,0.45)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                backdropFilter: 'blur(4px)',
              }}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* Counter */}
        <div
          className="absolute bottom-4 right-4"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            padding: '0.25rem 0.625rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          {active + 1} / {images.length}
        </div>

        {/* Immersive view trigger */}
        {panorama && (
          <button
            onClick={(e) => { e.stopPropagation(); setImmersive(true) }}
            className="absolute bottom-4 left-4 flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(0,0,0,0.55)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.18)',
              cursor: 'pointer',
              padding: '0.4rem 0.875rem',
              backdropFilter: 'blur(6px)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            aria-label="Enter 360° immersive view"
          >
            {/* 360 icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <ellipse cx="8" cy="8" rx="7" ry="4" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
            </svg>
            360° VIEW
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, 1fr)` }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/3',
                border: i === active ? '2px solid var(--color-accent-base)' : '2px solid transparent',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: 'var(--color-surface-secondary)',
              }}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="200px"
              />
              {i !== active && (
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 'var(--z-modal)', backgroundColor: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            onKeyDown={handleKey}
            tabIndex={-1}
            role="dialog"
            aria-label="Image lightbox"
            aria-modal="true"
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6"
              style={{ color: '#fff', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}
              aria-label="Close lightbox"
            >
              ×
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative"
                style={{ width: '90vw', maxWidth: '1200px', maxHeight: '85vh', aspectRatio: '16/9' }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: DUR.standard, ease: EASE.standard }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[active]}
                  alt={`${title}, image ${active + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-6 top-1/2 -translate-y-1/2"
                  style={{ color: '#fff', background: 'none', border: 'none', fontSize: '3rem', cursor: 'pointer', lineHeight: 1 }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-6 top-1/2 -translate-y-1/2"
                  style={{ color: '#fff', background: 'none', border: 'none', fontSize: '3rem', cursor: 'pointer', lineHeight: 1 }}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panorama viewer */}
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
