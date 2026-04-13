'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

interface WelcomeScreenProps {
  onEnter: () => void
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const { t } = useI18n()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Cinematic Background Layer ── */}
      <div className="absolute inset-0 z-0">
        {/* Ambient gradient — simulating Japanese washi paper warmth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(201, 169, 110, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 70%, rgba(201, 169, 110, 0.04) 0%, transparent 40%),
              linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)
            `,
          }}
        />

        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold accent line — top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-32 bg-gold"
          style={{ transformOrigin: 'center' }}
        />

        {/* Gold accent line — bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-32 bg-gold"
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* ── Hero Content ── */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-lg mx-auto"
      >
        {/* 杉 — Sugi kanji watermark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.06, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 text-[12rem] font-serif leading-none select-none pointer-events-none"
          style={{ fontFamily: 'serif' }}
        >
          杉
        </motion.div>

        {/* Welcome text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary text-xs tracking-[0.3em] uppercase mb-6"
          style={{ letterSpacing: '0.3em' }}
        >
          {t('hero.welcome')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-5xl md:text-7xl text-text-primary mb-4"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            lineHeight: '1.05',
          }}
        >
          {t('hero.restaurantName')}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-12 h-px bg-gold mx-auto my-6"
          style={{ transformOrigin: 'center' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-text-tertiary text-sm max-w-xs mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Enter Button — Minimal, confident */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          className="mt-12 px-10 py-3.5 border border-gold/30 text-gold text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500 ease-cinematic"
          style={{ letterSpacing: '0.25em' }}
        >
          {t('common.enterMenu')}
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-transparent via-gold/30 to-transparent"
        />
      </motion.div>
    </motion.section>
  )
}
