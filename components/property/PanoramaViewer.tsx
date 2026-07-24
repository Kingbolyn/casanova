'use client'

import { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { m } from 'framer-motion'
import { DUR, EASE } from '@/lib/motion'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'

/* ─── Public component ──────────────────────────────────── */

interface PanoramaViewerProps {
  url:      string
  title:    string
  onClose:  () => void
}

export function PanoramaViewer({ url, title, onClose }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLDivElement>(null)
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

  /* Native Three.js scene */
  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    const width  = container.clientWidth
    const height = container.clientHeight

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    /* Sphere */
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    const texture  = new THREE.TextureLoader().load(url)
    texture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
    const sphere   = new THREE.Mesh(geometry, material)
    sphere.scale.set(-1, 1, 1)
    scene.add(sphere)

    /* Drag controls */
    const euler      = new THREE.Euler(0, 0, 0, 'YXZ')
    let isDragging   = false
    let autoRotate   = true
    let prevX        = 0
    let prevY        = 0

    const onDown = (e: PointerEvent) => {
      isDragging = true
      autoRotate = false
      prevX = e.clientX
      prevY = e.clientY
      renderer.domElement.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return
      const dx = (e.clientX - prevX) * 0.003
      const dy = (e.clientY - prevY) * 0.003
      euler.y -= dx
      euler.x  = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, euler.x - dy))
      camera.quaternion.setFromEuler(euler)
      prevX = e.clientX
      prevY = e.clientY
    }
    const onUp = () => { isDragging = false }

    renderer.domElement.addEventListener('pointerdown', onDown)
    renderer.domElement.addEventListener('pointermove', onMove)
    renderer.domElement.addEventListener('pointerup',   onUp)

    /* Render loop */
    let frameId  = 0
    let lastTime = 0

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate)
      const delta = (time - lastTime) / 1000
      lastTime = time
      if (autoRotate) {
        euler.y -= delta * 0.06
        camera.quaternion.setFromEuler(euler)
      }
      renderer.render(scene, camera)
    }
    frameId = requestAnimationFrame(animate)

    /* Resize handler */
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    /* Cleanup */
    return () => {
      cancelAnimationFrame(frameId)
      renderer.domElement.removeEventListener('pointerdown', onDown)
      renderer.domElement.removeEventListener('pointermove', onMove)
      renderer.domElement.removeEventListener('pointerup',   onUp)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [url])

  return (
    <m.div
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
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#000', zIndex: 10 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: DUR.cinematic, delay: 0.15, ease: EASE.cinematic }}
        aria-hidden="true"
      />

      {/* Canvas mount point */}
      <div
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* UI overlay */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 20 }}
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
      </m.div>
    </m.div>
  )
}
