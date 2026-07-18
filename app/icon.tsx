import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18,
            fontWeight: 300,
            color: '#C9A96E',
            letterSpacing: '-0.04em',
          }}
        >
          C
        </div>
      </div>
    ),
    { ...size }
  )
}
