'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function LazyImage({ src, alt, className = '', priority = false }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(!priority)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-surface loading-shimmer rounded-lg" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-surface flex items-center justify-center rounded-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-text-tertiary">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full h-full object-cover ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}
