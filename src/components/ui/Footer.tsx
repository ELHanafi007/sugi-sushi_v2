'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-6 py-12 mt-16 border-t border-divider"
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Logo */}
        <p
          className="font-serif text-xl text-text-primary mb-4"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          Sugi Sushi
        </p>

        {/* Divider */}
        <div className="w-8 h-px bg-gold/30 mx-auto mb-6" />

        {/* Notes */}
        <p className="text-text-tertiary text-xs leading-relaxed mb-2">
          {t('footer.note')}
        </p>
        <p className="text-text-tertiary/70 text-xs italic">
          {t('footer.allergyNote')}
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary hover:text-gold transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary hover:text-gold transition-colors duration-300"
            aria-label="Twitter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary hover:text-gold transition-colors duration-300"
            aria-label="TikTok"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-text-tertiary/50 text-[0.6rem] tracking-wider mt-8">
          © 2026 Sugi Sushi. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}
