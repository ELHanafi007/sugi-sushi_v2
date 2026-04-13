import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Sugi Sushi — Luxury Dining Experience'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        {/* Kanji watermark */}
        <div
          style={{
            position: 'absolute',
            fontSize: 400,
            color: '#C9A96E',
            opacity: 0.04,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          杉
        </div>

        {/* Gold line top */}
        <div style={{ width: 120, height: 1, background: '#C9A96E', opacity: 0.4, marginBottom: 40 }} />

        {/* Restaurant name */}
        <div style={{ fontSize: 72, color: '#F5F0EB', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Sugi Sushi
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 20, color: '#A8A09A', marginTop: 16, fontStyle: 'italic' }}>
          A refined journey through Japanese culinary artistry
        </div>

        {/* Gold line bottom */}
        <div style={{ width: 120, height: 1, background: '#C9A96E', opacity: 0.4, marginTop: 40 }} />

        {/* Price hint */}
        <div style={{ fontSize: 14, color: '#6B6560', marginTop: 24, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Premium Dining · Saudi Arabia
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
