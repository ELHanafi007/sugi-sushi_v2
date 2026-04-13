import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { I18nProvider } from '@/contexts/i18n'

// ── Primary Fonts ──
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Sugi Sushi | Luxury Dining Experience',
    template: '%s — Sugi Sushi',
  },
  description: 'A refined journey through Japanese culinary artistry. Signature sushi crafted for the discerning palate in the heart of Saudi Arabia.',
  keywords: ['luxury sushi', 'fine dining', 'Saudi Arabia', 'Japanese cuisine', 'omakase', 'sashimi'],
  authors: [{ name: 'Sugi Sushi' }],
  creator: 'Sugi Sushi',
  publisher: 'Sugi Sushi',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    url: 'https://sugisushi.sa',
    siteName: 'Sugi Sushi',
    title: 'Sugi Sushi | Luxury Dining Experience',
    description: 'A refined journey through Japanese culinary artistry.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sugi Sushi | Luxury Dining Experience',
    description: 'A refined journey through Japanese culinary artistry.',
  },
  robots: {
    index: false, // QR-based — no need for search engines
    follow: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Sugi Sushi',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/ibm-plex-sans-arabic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/noto-naskh-arabic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* iOS meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
