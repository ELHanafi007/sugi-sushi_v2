'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

interface LocationProps {
  onBack?: () => void
}

const hoursData = [
  { day: 'Monday', lunch: 'Closed', dinner: '18:00 – 23:00' },
  { day: 'Tuesday', lunch: '12:00 – 15:00', dinner: '18:00 – 23:00' },
  { day: 'Wednesday', lunch: '12:00 – 15:00', dinner: '18:00 – 23:00' },
  { day: 'Thursday', lunch: '12:00 – 15:00', dinner: '18:00 – 00:00' },
  { day: 'Friday', lunch: '12:00 – 16:00', dinner: '18:00 – 00:00' },
  { day: 'Saturday', lunch: '12:00 – 16:00', dinner: '18:00 – 23:00' },
  { day: 'Sunday', lunch: '12:00 – 15:00', dinner: '18:00 – 23:00' },
]

export function Location({ onBack }: LocationProps) {
  const { t } = useI18n()

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

      {/* ── Hero Header ── */}
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
          {t('location.subtitle')}
        </p>
        <h1
          className="font-serif text-4xl md:text-5xl text-text-primary"
          style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: '1.1' }}
        >
          {t('location.title')}
        </h1>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-6" />
      </motion.header>

      <div className="px-6 max-w-lg mx-auto space-y-10">
        {/* ── Map Placeholder ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-divider"
        >
          <div className="relative h-64 bg-surface">
            {/* Stylized map placeholder */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(135deg, #1A1A1A 25%, transparent 25%) -50px 0,
                  linear-gradient(225deg, #1A1A1A 25%, transparent 25%) -50px 0,
                  linear-gradient(315deg, #1A1A1A 25%, transparent 25%),
                  linear-gradient(45deg, #1A1A1A 25%, transparent 25%)
                `,
                backgroundSize: '40px 40px',
                backgroundColor: '#141414',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian/60" />

            {/* Location pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-gold text-4xl"
              >
                ◆
              </motion.div>
            </div>

            {/* Open in maps button */}
            <a
              href="https://maps.google.com/?q=Sugi+Sushi+Riyadh"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 right-4 px-4 py-2.5 bg-obsidian/90 backdrop-blur-sm rounded-lg border border-divider text-center text-gold text-xs tracking-[0.15em] uppercase hover:border-gold/30 transition-all duration-300"
              style={{ letterSpacing: '0.15em' }}
            >
              {t('location.openMaps')}
            </a>
          </div>
        </motion.div>

        {/* ── Address & Contact ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="p-5 rounded-lg bg-surface border border-divider">
            <p className="text-text-tertiary text-xs tracking-[0.15em] uppercase mb-3" style={{ letterSpacing: '0.15em' }}>
              {t('location.address')}
            </p>
            <p className="text-text-primary leading-relaxed">
              {t('location.addressLine1')}
              <br />
              {t('location.addressLine2')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-5 rounded-lg bg-surface border border-divider text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 text-gold/60">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <a href="tel:+966112345678" className="text-text-primary text-sm hover:text-gold transition-colors">
                +966 11 234 5678
              </a>
            </div>
            <div className="p-5 rounded-lg bg-surface border border-divider text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 text-gold/60">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <a href="mailto:reservations@sugisushi.sa" className="text-text-primary text-sm hover:text-gold transition-colors break-all">
                reservations@sugisushi.sa
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Opening Hours ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2
            className="font-serif text-2xl text-text-primary mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {t('location.hoursTitle')}
          </h2>

          <div className="space-y-3">
            {hoursData.map((day, i) => {
              const today = new Date().getDay()
              const dayIndex = (today + 6) % 7 // Monday = 0
              const isToday = i === dayIndex

              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all ${
                    isToday
                      ? 'bg-gold/5 border border-gold/20'
                      : 'bg-transparent'
                  }`}
                >
                  <span className={`text-sm ${isToday ? 'text-gold' : 'text-text-primary'}`}>
                    {t(`location.${day.day.toLowerCase()}`)}
                  </span>
                  <div className="flex gap-4">
                    <span className={`text-xs ${isToday ? 'text-gold/70' : 'text-text-tertiary'}`}>
                      {day.lunch}
                    </span>
                    <span className={`text-xs ${isToday ? 'text-gold' : 'text-text-secondary'}`}>
                      {day.dinner}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ── Note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-5 rounded-lg bg-surface border border-divider"
        >
          <div className="flex items-start gap-3">
            <span className="text-gold/50 mt-0.5">◆</span>
            <p className="text-text-tertiary text-sm leading-relaxed">
              {t('location.note')}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
