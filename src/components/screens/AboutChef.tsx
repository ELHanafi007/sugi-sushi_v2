'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

interface AboutChefProps {
  onBack?: () => void
}

const chefImages = [
  'https://images.unsplash.com/photo-1581299142478-7255e17d7d6c?w=800&q=80',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
  'https://images.unsplash.com/photo-1577219491135-ce39422589c3?w=800&q=80',
]

const awards = [
  { year: '2023', title: 'Michelin Star', location: 'Tokyo Guide' },
  { year: '2022', title: 'Best Omakase Experience', location: 'Asia\'s 50 Best' },
  { year: '2021', title: 'Rising Chef Award', location: 'Saudi Culinary Awards' },
  { year: '2020', title: 'Sustainable Seafood Champion', location: 'Gulf Hospitality Forum' },
]

export function AboutChef({ onBack }: AboutChefProps) {
  const { t } = useI18n()
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pb-24"
    >
      {/* ── Hero Image ── */}
      <div className="relative h-[65vh] overflow-hidden">
        <motion.img
          style={{ opacity: heroOpacity, y: heroY, scale: 1.05 }}
          src={chefImages[0]}
          alt="Chef Takeshi"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian" />
      </div>

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

      {/* ── Chef Introduction ── */}
      <div className="px-6 -mt-24 relative z-10 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <p
            className="text-gold text-xs tracking-[0.3em] uppercase mb-4"
            style={{ letterSpacing: '0.3em' }}
          >
            {t('about.subtitle')}
          </p>

          <h1
            className="font-serif text-4xl md:text-5xl text-text-primary mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: '1.1' }}
          >
            {t('about.title')}
          </h1>

          <p className="text-text-secondary leading-relaxed mb-4">
            {t('about.paragraph1')}
          </p>

          <p className="text-text-secondary leading-relaxed mb-8">
            {t('about.paragraph2')}
          </p>

          {/* Gold divider */}
          <div className="w-12 h-px bg-gold/40 mb-8" />
        </motion.div>

        {/* ── Philosophy Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className="font-serif text-2xl text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {t('about.philosophyTitle')}
          </h2>

          <p className="text-text-secondary leading-relaxed mb-6">
            {t('about.philosophy')}
          </p>

          {/* Philosophy pillars */}
          <div className="space-y-4">
            {[
              { kanji: '素材', romaji: 'Sozai', en: 'Ingredient' },
              { kanji: '技術', romaji: 'Gijutsu', en: 'Technique' },
              { kanji: '心', romaji: 'Kokoro', en: 'Heart' },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.romaji}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-divider"
              >
                <span
                  className="text-gold/60 text-3xl"
                  style={{ fontFamily: 'serif' }}
                >
                  {pillar.kanji}
                </span>
                <div>
                  <span className="text-text-primary text-sm">{pillar.en}</span>
                  <span className="text-text-tertiary text-xs ml-2 italic">{pillar.romaji}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Photo Collage ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-3 mb-12"
        >
          {chefImages.slice(1).map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden"
            >
              <img
                src={img}
                alt=""
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Awards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className="font-serif text-2xl text-text-primary mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {t('about.awardsTitle')}
          </h2>

          <div className="space-y-4">
            {awards.map((award, i) => (
              <motion.div
                key={award.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="text-gold/40 text-xs tracking-wider">{award.year}</span>
                <div className="w-px h-4 bg-gold/30" />
                <div>
                  <span className="text-text-primary text-sm">{award.title}</span>
                  <span className="text-text-tertiary text-xs ml-2 block">{award.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Quote ── */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 border-t border-b border-divider"
        >
          <p
            className="font-serif text-2xl text-text-primary/90 italic mb-4"
            style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: '1.4' }}
          >
            {t('about.quote')}
          </p>
          <cite className="text-text-tertiary text-xs tracking-wider not-italic">
            — {t('about.quoteAuthor')}
          </cite>
        </motion.blockquote>
      </div>
    </motion.section>
  )
}
