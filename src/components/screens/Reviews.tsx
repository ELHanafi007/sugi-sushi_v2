'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

interface ReviewsProps {
  onBack?: () => void
}

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    text: 'An extraordinary experience. Every dish was a revelation. The Omakase was the finest meal I\'ve ever had — each piece telling its own story.',
    date: 'March 2026',
    source: 'Google Reviews',
  },
  {
    id: 2,
    name: 'Ahmed K.',
    rating: 5,
    text: 'The attention to detail is unmatched. From the moment you walk in, you know this is something special. The truffle omakase roll alone is worth the visit.',
    date: 'February 2026',
    source: 'TripAdvisor',
  },
  {
    id: 3,
    name: 'Elena V.',
    rating: 5,
    text: 'I\'ve dined at sushi restaurants across Tokyo, New York, and London. Sugi Sushi holds its own against the best. The chef\'s commitment to quality is evident in every bite.',
    date: 'January 2026',
    source: 'Google Reviews',
  },
  {
    id: 4,
    name: 'Mohammed R.',
    rating: 5,
    text: 'Booked the Omakase Experience for our anniversary. Two hours of pure artistry. The sake pairing was perfectly curated. An unforgettable evening.',
    date: 'December 2025',
    source: 'OpenTable',
  },
  {
    id: 5,
    name: 'Lisa T.',
    rating: 5,
    text: 'The Caviar Nigiri is decadent perfection. The space itself is stunning — dark, intimate, and incredibly refined. This is fine dining at its absolute best.',
    date: 'November 2025',
    source: 'Google Reviews',
  },
  {
    id: 6,
    name: 'James H.',
    rating: 5,
    text: 'Chef Takeshi\'s vision is clear in every detail. The Golden Dragon roll is theatrical and delicious. Service is impeccable — attentive without being intrusive.',
    date: 'October 2025',
    source: 'TripAdvisor',
  },
]

export function Reviews({ onBack }: ReviewsProps) {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          className={i < rating ? 'text-gold' : 'text-text-tertiary/30'}
        >
          <path
            d="M8 0L10 6H16L11 9.5L13 16L8 12L3 16L5 9.5L0 6H6L8 0Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  )

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
          {t('reviews.subtitle')}
        </p>
        <h1
          className="font-serif text-4xl md:text-5xl text-text-primary"
          style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: '1.1' }}
        >
          {t('reviews.title')}
        </h1>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-6 mb-4" />

        {/* Average rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <StarRating rating={5} />
          <span className="text-text-secondary text-sm">
            {t('reviews.ratingText')}
          </span>
        </motion.div>
      </motion.header>

      {/* ── Featured Review Carousel ── */}
      <div className="px-6 mb-12" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-6 md:p-8 rounded-xl bg-surface border border-divider"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-text-primary font-serif text-lg" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {reviews[activeIndex].name}
                </h3>
                <p className="text-text-tertiary text-xs mt-1">
                  {reviews[activeIndex].date} · {reviews[activeIndex].source}
                </p>
              </div>
              <StarRating rating={reviews[activeIndex].rating} />
            </div>

            <blockquote className="text-text-secondary leading-relaxed italic">
              "{reviews[activeIndex].text}"
            </blockquote>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-gold w-6'
                  : 'bg-text-tertiary/30 hover:bg-text-tertiary/50'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── All Reviews Grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 max-w-5xl mx-auto"
      >
        <h2
          className="font-serif text-2xl text-text-primary mb-6 text-center"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {t('reviews.allReviews')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} StarRating={StarRating} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

function ReviewCard({
  review,
  index,
  StarRating,
}: {
  review: typeof reviews[0]
  index: number
  StarRating: React.FC<{ rating: number }>
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="p-5 rounded-lg bg-surface border border-divider hover:border-gold/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-text-primary text-sm">{review.name}</h3>
          <p className="text-text-tertiary text-xs mt-0.5">
            {review.date} · {review.source}
          </p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <blockquote className="text-text-secondary text-sm leading-relaxed line-clamp-3">
        "{review.text}"
      </blockquote>
    </motion.div>
  )
}
