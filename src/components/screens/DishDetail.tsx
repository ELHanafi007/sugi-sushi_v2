'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'
import type { MenuItem } from '@/data/menu'

interface DishDetailProps {
  dish: MenuItem
  onBack: () => void
}

export function DishDetail({ dish, onBack }: DishDetailProps) {
  const { t } = useI18n()
  const [activeImage, setActiveImage] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  heroOpacity

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen bg-obsidian"
    >
      {/* ── Back Button — Fixed ── */}
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

      {/* ── Hero Image — Cinematic ── */}
      <div className="relative h-[55vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            src={dish.images[activeImage]}
            alt={dish.name.en}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />

        {/* Signature badge */}
        {dish.isSignature && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-16 right-4 px-3 py-1 rounded-full border border-gold/40 bg-obsidian/60 backdrop-blur-sm"
          >
            <span className="text-gold text-[0.6rem] tracking-[0.2em] uppercase">Signature</span>
          </motion.div>
        )}
      </div>

      {/* ── Image Gallery — Swipeable dots ── */}
      {dish.images.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-2 -mt-6 relative z-10"
        >
          {dish.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300
                ${i === activeImage
                  ? 'bg-gold w-6'
                  : 'bg-text-tertiary/40 hover:bg-text-tertiary/60'
                }
              `}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </motion.div>
      )}

      {/* ── Content ── */}
      <div className="px-6 pt-8 pb-24 max-w-lg mx-auto">
        {/* Popular badge */}
        {dish.tags?.includes('popular') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gold">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
            </svg>
            <span className="text-gold text-[0.65rem] tracking-[0.15em] uppercase" style={{ letterSpacing: '0.15em' }}>
              {t('menu.popular')}
            </span>
          </motion.div>
        )}

        {/* Name & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h1
            className="font-serif text-3xl md:text-4xl text-text-primary mb-2"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {dish.name.en}
          </h1>
          <p className="text-gold/70 text-sm italic">
            {dish.tagline.en}
          </p>
        </motion.div>

        {/* Price — Elegant */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-2xl font-light text-text-primary">
            {dish.price}
          </span>
          <span className="text-text-tertiary text-sm">
            {t('common.sar')}
          </span>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-8 h-px bg-gold/40 mb-8 origin-left"
          style={{ transformOrigin: 'left' }}
        />

        {/* Description — Storytelling */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className={`text-text-secondary leading-relaxed text-sm ${!showFullDescription ? 'line-clamp-3' : ''}`}>
            {dish.description.en}
          </p>
          {dish.description.en.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-gold/60 text-xs mt-2 hover:text-gold transition-colors duration-200"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </motion.div>

        {/* Chef's Note */}
        {dish.chefNote && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 p-5 rounded-lg bg-surface border border-divider"
          >
            <div className="flex items-start gap-3">
              <span className="text-gold/50 mt-0.5">◆</span>
              <div>
                <p className="text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
                  {t('common.chefNote')}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed italic">
                  {dish.chefNote.en}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Ingredients */}
        {dish.allergens && dish.allergens.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <p className="text-text-tertiary text-xs tracking-[0.15em] uppercase mb-3" style={{ letterSpacing: '0.15em' }}>
              {t('common.allergens')}
            </p>
            <div className="flex flex-wrap gap-2">
              {dish.allergens.map((allergen) => (
                <span
                  key={allergen}
                  className="px-3 py-1.5 rounded-full bg-surface-light border border-divider text-text-tertiary text-xs capitalize"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        {dish.tags && dish.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-2"
          >
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="text-text-tertiary/60 text-xs tracking-wider uppercase"
              >
                #{tag.replace(/-/g, '')}
              </span>
            ))}
          </motion.div>
        )}

        {/* ── Sake Pairing ── */}
        {dish.isSignature && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 pt-8 border-t border-divider"
          >
            <p className="text-text-tertiary text-xs tracking-[0.15em] uppercase mb-4" style={{ letterSpacing: '0.15em' }}>
              {t('menu.pairing')}
            </p>
            <div className="p-5 rounded-lg bg-surface border border-divider">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-charcoal flex-shrink-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold/60">
                    <path d="M8 2h8l2 10H6L8 2z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 12v6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 22h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 18c-3 0-5 1-5 2s2 2 5 2 5-1 5-2-2-2-5-2z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <span className="text-text-primary text-sm block">Dassai 23 Junmai Daiginjo</span>
                  <span className="text-text-tertiary text-xs block mt-1">
                    Crisp, elegant, with notes of melon and white flowers. Complements the richness of this dish.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Share Button ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 pt-6 border-t border-divider flex justify-center"
        >
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: dish.name.en,
                  text: dish.tagline.en,
                  url: window.location.href,
                }).catch(() => {})
              } else {
                navigator.clipboard.writeText(window.location.href)
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-divider text-text-tertiary text-xs tracking-[0.15em] uppercase hover:border-gold/20 hover:text-gold/70 transition-all duration-300"
            style={{ letterSpacing: '0.15em' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share this dish
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
