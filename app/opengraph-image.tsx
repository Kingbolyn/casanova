import { ImageResponse } from 'next/og'

export const alt = 'CasaNova: Exceptional Properties'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Accent line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div style={{ width: 40, height: 1, background: '#C9A96E' }} />
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, letterSpacing: '0.2em', fontFamily: 'sans-serif' }}>
            EXCEPTIONAL PROPERTIES
          </span>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 80,
            fontWeight: 300,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          CasaNova
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: 20,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.5,
            maxWidth: 600,
          }}
        >
          Discover exceptional properties through an immersive experience designed to help you find not just a house, but a home.
        </div>

        {/* Gold accent bar at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: '#C9A96E',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
