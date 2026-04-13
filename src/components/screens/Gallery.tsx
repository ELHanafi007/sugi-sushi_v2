'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

interface GalleryProps {
  onBack?: () => void
}

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=85', alt: 'Signature sushi plating', category: 'food' },
  { src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=85', alt: 'Interior ambiance', category: 'space' },
  { src: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=1200&q=85', alt: 'Chef preparation', category: 'chef' },
  { src: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1200&q=85', alt: 'Sashimi selection', category: 'food' },
  { src: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=85', alt: 'Dining area', category: 'space' },
  { src: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=1200&q=85', alt: 'Plating detail', category: 'food' },
  { src: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=1200&q=85', alt: 'Sake collection', category: 'drinks' },
  { src: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=1200&q=85', alt: 'Roll presentation', category: 'food' },
  { src: 'https://images.unsplash.com/photo-1577219491135-ce39422589c3?w=1200&q=85', alt: 'Behind the counter', category: 'chef' },
  { src: 'https://images.unsplash.com/photo-1534482421-64566f976cfc?w=1200&q=85', alt: 'Fresh ingredients', category: 'food' },
  { src: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=1200&q=85', alt: 'Nigiri art', category: 'food' },
  { src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=85', alt: 'Omakase moment', category: 'chef' },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Dishes' },
  { id: 'space', label: 'Space' },
  { id: 'chef', label: 'Chef' },
  { id: 'drinks', label: 'Drinks' },
]

export function Gallery({ onBack }: GalleryProps) {
  const { t } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }

  const navigateLightbox = (direction: number) => {
    if (lightboxIndex === null) return
    const newIdx = (lightboxIndex + direction + filtered.length) % filtered.length
    setLightboxIndex(newIdx)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pb-24"
    >
      {/* ── Back Button ── */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onBack}
          className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-obsidian/80 backdrop-blur-sm border border-divider flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-300"
          aria-label={t('common.back')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 pt-24 pb-8 text-center"
      >
        <p
          className="text-gold text-xs tracking-[0.3em] uppercase mb-4"
          style={{ letterSpacing: '0.3em' }}
        >
          {t('gallery.subtitle')}
        </p>
        <h1
          className="font-serif text-4xl md:text-5xl text-text-primary"
          style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: '1.1' }}
        >
          {t('gallery.title')}
        </h1>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-6" />
      </motion.header>

      {/* ── Category Filter ── */}
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-8"
      >
        <div className="flex gap-2 justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-gold/10 border-gold/30 text-gold'
                  : 'bg-transparent border-divider text-text-secondary hover:border-gold/20'
              }`}
              style={{ letterSpacing: '0.15em' }}
            >
              {t(`gallery.${cat.id}`)}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* ── Gallery Grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-6"
      >
        <div className="columns-2 md:columns-3 gap-3 space-y-3 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-text-primary text-xs">{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox() }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-obsidian/80 border border-divider flex items-center justify-center text-text-secondary hover:text-gold transition-colors"
            >
              ✕
            </button>

            {/* Previous */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1) }}
              className="absolute left-4 z-10 w-10 h-10 rounded-full bg-obsidian/80 border border-divider flex items-center justify-center text-text-secondary hover:text-gold transition-colors"
            >
              ‹
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl max-h-[85vh] px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1) }}
              className="absolute right-4 z-10 w-10 h-10 rounded-full bg-obsidian/80 border border-divider flex items-center justify-center text-text-secondary hover:text-gold transition-colors"
            >
              ›
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-tertiary text-xs tracking-wider">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
