'use client'

import { useRef, useEffect, useCallback, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { DUR, EASE } from '@/lib/motion'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'

/* ─── Sphere scene ──────────────────────────────────────── */

function PanoramaSphere({ url }: { url: string }) {
  const texture = useTexture(url)
  texture.colorSpace = THREE.SRGBColorSpace

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

/* ─── Drag-to-look controls ─────────────────────────────── */

function DragControls() {
  const { camera, gl } = useThree()
  const isDragging = useRef(false)
  const prev = useRef({ x: 0, y: 0 })
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const autoRotate = useRef(true)

  useEffect(() => {
    const canvas = gl.domElement

    const onDown = (e: PointerEvent) => {
      isDragging.current = true
      autoRotate.current = false
      prev.current = { x: e.clientX, y: e.clientY }
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      const dx = (e.clientX - prev.current.x) * 0.003
      const dy = (e.clientY - prev.current.y) * 0.003
      euler.current.y -= dx
      euler.current.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, euler.current.x - dy))
      camera.quaternion.setFromEuler(euler.current)
      prev.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => { isDragging.current = false }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
    }
  }, [gl, camera])

  useFrame((_, delta) => {
    if (autoRotate.current) {
      euler.current.y -= delta * 0.06
      camera.quaternion.setFromEuler(euler.current)
    }
  })

  return null
}

/* ─── Loading fallback ──────────────────────────────────── */

function PanoramaLoading() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid rgba(201,169,110,0.3)',
            borderTopColor: 'var(--color-accent-base)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', color: 'rgba(255,255,255,0.35)' }}>
          ENTERING SPACE
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

/* ─── Public component ──────────────────────────────────── */

interface PanoramaViewerProps {
  url:      string
  title:    string
  onClose:  () => void
}

export function PanoramaViewer({ url, title, onClose }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const closeBtnRef  = useRef<HTMLButtonElement>(null)

  useFocusTrap(containerRef, true)

  /* Close on Escape */
  const onKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }, [onClose])
  useEffect(() => {
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onKey])

  /* Auto-focus close button */
  useEffect(() => {
    setTimeout(() => closeBtnRef.current?.focus(), 1050)
  }, [])

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DUR.cinematic, ease: EASE.cinematic }}
      className="fixed inset-0 z-[200]"
      style={{ backgroundColor: '#0a0a0a' }}
      role="dialog"
      aria-modal="true"
      aria-label={`360° immersive view of ${title}`}
    >
      {/* Threshold veil — fades out after entry */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#000', zIndex: 10 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: DUR.cinematic, delay: 0.15, ease: EASE.cinematic }}
        aria-hidden="true"
      />

      {/* Canvas */}
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: false }}
      >
        <Suspense fallback={null}>
          <PanoramaSphere url={url} />
          <DragControls />
        </Suspense>
      </Canvas>

      <Suspense fallback={<PanoramaLoading />} />

      {/* UI overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.large, delay: 1.0, ease: EASE.entrance }}
      >
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          <div>
            <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>
              IMMERSIVE VIEW
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.9)', fontWeight: 300 }}>
              {title}
            </p>
          </div>

          {/* Drag hint */}
          <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', color: 'rgba(255,255,255,0.3)' }}>
            DRAG TO EXPLORE
          </p>
        </div>

        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-5 right-5"
          style={{
            pointerEvents: 'all',
            width: '40px',
            height: '40px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)',
            color: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          aria-label="Exit immersive view"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Accent line bottom centre */}
        <div
          className="absolute bottom-8 left-1/2"
          style={{ transform: 'translateX(-50%)', width: '32px', height: '1px', backgroundColor: 'var(--color-accent-base)', opacity: 0.5 }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  )
}
