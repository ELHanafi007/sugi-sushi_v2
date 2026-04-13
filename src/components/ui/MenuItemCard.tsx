'use client'

import { motion } from 'framer-motion'
import type { MenuItem } from '@/data/menu'

interface MenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group w-full text-left overflow-hidden rounded-xl bg-surface border border-divider transition-all duration-500 hover:border-gold/20"
    >
      <div className="flex gap-4 p-4">
        {/* Image — Small, refined preview */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-charcoal">
          <img
            src={item.images[0]}
            alt={item.name.en}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Signature indicator */}
          {item.isSignature && (
            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold/80 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4 0L5 3H8L5.5 5L6.5 8L4 6L1.5 8L2.5 5L0 3H3L4 0Z" fill="#0A0A0A" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-serif text-base text-text-primary leading-tight truncate"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {item.name.en}
            </h3>
            <span className="text-gold text-sm font-light flex-shrink-0">
              {item.price}
            </span>
          </div>

          <p className="text-text-tertiary text-xs italic mb-2 line-clamp-1">
            {item.tagline.en}
          </p>

          {/* "Discover" hint — subtle */}
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-gold/60 text-[0.6rem] tracking-[0.15em] uppercase">
              Discover
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gold/40">
              <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom gold line on hover */}
      <div className="h-px bg-gold/0 group-hover:bg-gold/30 transition-all duration-500" />
    </motion.button>
  )
}
