import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance: Output standalone for Docker
  output: 'standalone',

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Headers for PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },

  // Redirects: root only
  async redirects() {
    return []
  },

  // Compress responses
  compress: true,

  // React strict mode
  reactStrictMode: true,

  // Power header
  poweredByHeader: false,
}

export default nextConfig
