'use client'

import { motion } from 'framer-motion'
import { useI18n, type Locale } from '@/contexts/i18n'

export function LanguageToggle() {
  const { locale, t, setLocale } = useI18n()

  const toggleLocale = () => {
    const next: Locale = locale === 'en' ? 'ar' : 'en'
    setLocale(next)
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.4 }}
      onClick={toggleLocale}
      className="relative group flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian/60 backdrop-blur-md border border-divider hover:border-gold/20 transition-all duration-300"
      aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
    >
      {/* Globe icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-text-secondary group-hover:text-gold transition-colors duration-300">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Language label */}
      <span className="text-text-secondary group-hover:text-gold text-xs tracking-wider transition-colors duration-300">
        {t('common.language')}
      </span>

      {/* Active indicator */}
      <motion.div
        layoutId="lang-dot"
        className="w-1.5 h-1.5 rounded-full bg-gold"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </motion.button>
  )
}
