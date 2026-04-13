// ============================================================
// SUGI SUSHI LUXURY — Design Tokens
// Apple-level minimalism × Japanese Zen aesthetics
// ============================================================

export const colors = {
  // Base — Deep obsidian foundation
  obsidian:    '#0A0A0A',
  ink:         '#111111',
  charcoal:    '#1A1A1A',
  slate:       '#2A2A2A',

  // Accent — Kintsugi gold (luxury warmth)
  gold:        '#C9A96E',
  goldLight:   '#D4BA8A',
  goldDark:    '#A68B5B',
  goldGlow:    'rgba(201, 169, 110, 0.15)',

  // Surface
  surface:     '#141414',
  surfaceLight:'#1E1E1E',
  surfaceElev: '#242424',

  // Text hierarchy
  textPrimary:   '#F5F0EB',   // Warm white
  textSecondary: '#A8A09A',   // Muted silver-warmth
  textTertiary:  '#6B6560',   // Subtle
  textInverse:   '#0A0A0A',   // On gold/light backgrounds

  // Semantic
  success: '#4A9E7A',
  divider: 'rgba(201, 169, 110, 0.12)',
  overlay: 'rgba(10, 10, 10, 0.85)',
} as const

export const typography = {
  // EN: Inter (body) + Playfair Display (display)
  // AR: IBM Plex Sans Arabic (body) + Noto Naskh Arabic (display)
  fontSans: {
    en: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    ar: "'IBM Plex Sans Arabic', sans-serif",
  },
  fontSerif: {
    en: "'Playfair Display', Georgia, serif",
    ar: "'Noto Naskh Arabic', serif",
  },
  fontMono: "'JetBrains Mono', monospace",

  // Scale — mobile-first, refined
  sizes: {
    hero:      { fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: '1.05', letterSpacing: '-0.03em' },
    h1:        { fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: '1.1', letterSpacing: '-0.02em' },
    h2:        { fontSize: 'clamp(1.25rem, 3.5vw, 2rem)', lineHeight: '1.2', letterSpacing: '-0.01em' },
    h3:        { fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: '1.3', letterSpacing: '0em' },
    body:      { fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)', lineHeight: '1.65', letterSpacing: '0.01em' },
    bodySmall: { fontSize: 'clamp(0.8125rem, 1.75vw, 0.9375rem)', lineHeight: '1.6', letterSpacing: '0.01em' },
    caption:   { fontSize: '0.75rem', lineHeight: '1.5', letterSpacing: '0.08em', textTransform: 'uppercase' as const },
    label:     { fontSize: '0.6875rem', lineHeight: '1.4', letterSpacing: '0.12em', textTransform: 'uppercase' as const },
    price:     { fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: '1.3', letterSpacing: '0.02em' },
  },
} as const

export const spacing = {
  xs:   '0.25rem',
  sm:   '0.5rem',
  md:   '1rem',
  lg:   '1.5rem',
  xl:   '2rem',
  '2xl':'3rem',
  '3xl':'4rem',
  '4xl':'6rem',
  '5xl':'8rem',
} as const

export const borderRadius = {
  sm:   '0.5rem',
  md:   '0.75rem',
  lg:   '1rem',
  xl:   '1.5rem',
  '2xl':'2rem',
  full: '9999px',
} as const

export const shadows = {
  soft:    '0 4px 24px rgba(0,0,0,0.3)',
  medium:  '0 8px 40px rgba(0,0,0,0.4)',
  heavy:   '0 16px 64px rgba(0,0,0,0.5)',
  gold:    `0 4px 32px ${colors.goldGlow}`,
  inner:   'inset 0 1px 0 rgba(255,255,255,0.05)',
} as const

export const transitions = {
  fast:    '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base:    '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow:    '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  cinematic:'700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring:  '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const zLayers = {
  base:     0,
  elevated: 10,
  overlay:  20,
  modal:    30,
  toast:    40,
} as const
