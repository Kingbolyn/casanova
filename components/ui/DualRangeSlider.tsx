'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

interface DualRangeSliderProps {
  min:      number
  max:      number
  value:    [number, number]
  onChange: (value: [number, number]) => void
  step?:    number
  format?:  (v: number) => string
}

export function DualRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  format: _format = (v) => String(v),
}: DualRangeSliderProps) {
  const [localMin, setLocalMin] = useState(String(value[0]))
  const [localMax, setLocalMax] = useState(value[1] >= max ? '' : String(value[1]))
  const trackRef = useRef<HTMLDivElement>(null)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setLocalMin(String(value[0]))
    setLocalMax(value[1] >= max ? '' : String(value[1]))
  }, [value, max])
  /* eslint-enable react-hooks/set-state-in-effect */

  const pct = (v: number) => ((v - min) / (max - min)) * 100

  const clamp = useCallback((v: number) => Math.max(min, Math.min(max, v)), [min, max])
  const snap  = useCallback((v: number) => Math.round(v / step) * step, [step])

  const fromTrack = useCallback((clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return min
    return snap(clamp(min + ((clientX - rect.left) / rect.width) * (max - min)))
  }, [min, max, snap, clamp])

  /* Drag logic for thumb */
  const dragThumb = (which: 'min' | 'max') => (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) => {
      const v = fromTrack(ev.clientX)
      if (which === 'min') onChange([Math.min(v, value[1] - step), value[1]])
      else                 onChange([value[0], Math.max(v, value[0] + step)])
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const commitMin = () => {
    const v = snap(clamp(Number(localMin) || min))
    onChange([Math.min(v, value[1] - step), value[1]])
  }
  const commitMax = () => {
    const v = localMax === '' ? max : snap(clamp(Number(localMax)))
    onChange([value[0], Math.max(v, value[0] + step)])
  }

  const minPct = pct(value[0])
  const maxPct = pct(Math.min(value[1], max))

  return (
    <div>
      {/* Track */}
      <div ref={trackRef} className="relative" style={{ height: '20px', display: 'flex', alignItems: 'center', userSelect: 'none' }}>
        {/* Base track */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', backgroundColor: 'var(--color-border-base)' }} />
        {/* Fill */}
        <div
          style={{
            position: 'absolute',
            left: `${minPct}%`,
            right: `${100 - maxPct}%`,
            height: '1px',
            backgroundColor: 'var(--color-accent-base)',
          }}
        />
        {/* Min thumb */}
        <div
          onPointerDown={dragThumb('min')}
          style={{
            position:     'absolute',
            left:         `${minPct}%`,
            transform:    'translateX(-50%)',
            width:        '14px',
            height:       '14px',
            border:       '1px solid var(--color-accent-base)',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface-primary)',
            cursor:       'grab',
            touchAction:  'none',
          }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={value[1]}
          aria-valuenow={value[0]}
          aria-label="Minimum price"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft')  onChange([Math.max(min, value[0] - step), value[1]])
            if (e.key === 'ArrowRight') onChange([Math.min(value[0] + step, value[1] - step), value[1]])
          }}
        />
        {/* Max thumb */}
        <div
          onPointerDown={dragThumb('max')}
          style={{
            position:     'absolute',
            left:         `${maxPct}%`,
            transform:    'translateX(-50%)',
            width:        '14px',
            height:       '14px',
            border:       '1px solid var(--color-accent-base)',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface-primary)',
            cursor:       'grab',
            touchAction:  'none',
          }}
          role="slider"
          aria-valuemin={value[0]}
          aria-valuemax={max}
          aria-valuenow={value[1]}
          aria-label="Maximum price"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft')  onChange([value[0], Math.max(value[0] + step, value[1] - step)])
            if (e.key === 'ArrowRight') onChange([value[0], Math.min(max, value[1] + step)])
          }}
        />
      </div>

      {/* Editable inputs */}
      <div className="flex items-center gap-3 mt-4">
        <div className="flex-1">
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-wide)', marginBottom: '4px' }}>
            MIN
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={localMin === '0' ? '' : localMin}
            placeholder="No min"
            onChange={(e) => setLocalMin(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={commitMin}
            onKeyDown={(e) => e.key === 'Enter' && commitMin()}
            style={{
              width:           '100%',
              border:          '1px solid var(--color-border-base)',
              backgroundColor: 'var(--color-surface-primary)',
              color:           'var(--color-text-primary)',
              fontFamily:      'var(--font-body)',
              fontSize:        'var(--text-xs)',
              padding:         '0.5rem 0.75rem',
              outline:         'none',
              borderRadius:    0,
            }}
          />
        </div>
        <div style={{ width: '16px', height: '1px', backgroundColor: 'var(--color-border-base)', flexShrink: 0, marginTop: '16px' }} />
        <div className="flex-1">
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-wide)', marginBottom: '4px' }}>
            MAX
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={localMax}
            placeholder="No max"
            onChange={(e) => setLocalMax(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={commitMax}
            onKeyDown={(e) => e.key === 'Enter' && commitMax()}
            style={{
              width:           '100%',
              border:          '1px solid var(--color-border-base)',
              backgroundColor: 'var(--color-surface-primary)',
              color:           'var(--color-text-primary)',
              fontFamily:      'var(--font-body)',
              fontSize:        'var(--text-xs)',
              padding:         '0.5rem 0.75rem',
              outline:         'none',
              borderRadius:    0,
            }}
          />
        </div>
      </div>
    </div>
  )
}
