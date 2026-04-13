'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

interface StorytellingSectionProps {
  onContinue: () => void
}

const storyImages = [
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
  'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
  'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800&q=80',
  'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80',
]

export function StorytellingSection({ onContinue }: StorytellingSectionProps) {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* ── Story Lines — Each appears on scroll ── */}
      <StoryLine
        text={t('storytelling.line1')}
        imageIndex={0}
        scrollProgress={scrollYProgress}
        range={[0.05, 0.15, 0.25, 0.35]}
      />

      <StoryLine
        text={t('storytelling.line2')}
        imageIndex={1}
        scrollProgress={scrollYProgress}
        range={[0.35, 0.45, 0.55, 0.65]}
      />

      <StoryLine
        text={t('storytelling.line3')}
        imageIndex={2}
        scrollProgress={scrollYProgress}
        range={[0.6, 0.7, 0.8, 0.85]}
      />

      {/* ── CTA — Final line ── */}
      <motion.div
        className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          className="font-serif text-2xl md:text-3xl text-text-primary mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {t('storytelling.line4')}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="mt-8 px-10 py-3.5 border border-gold/30 text-gold text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500"
          style={{ letterSpacing: '0.25em' }}
        >
          {t('storytelling.line5')}
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

/* ── Individual Story Line Component ── */
function StoryLine({
  text,
  imageIndex,
  scrollProgress,
  range,
}: {
  text: string
  imageIndex: number
  scrollProgress: any
  range: [number, number, number, number]
}) {
  const ref = useRef(null)

  const opacity = useTransform(scrollProgress, [range[0], range[1]], [0, 1])
  const y = useTransform(scrollProgress, [range[0], range[1]], [40, 0])
  const imgOpacity = useTransform(scrollProgress, [range[2], range[3]], [0, 0.6])
  const imgScale = useTransform(scrollProgress, [range[2], range[3]], [1.1, 1])

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center px-6 relative">
      {/* Background image — subtle */}
      <motion.div
        style={{ opacity: imgOpacity, scale: imgScale }}
        className="absolute inset-0 overflow-hidden"
      >
        <img
          src={storyImages[imageIndex]}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian" />
      </motion.div>

      {/* Text */}
      <motion.p
        style={{ opacity, y, fontFamily: 'var(--font-playfair), serif' }}
        className="relative z-10 font-serif text-2xl md:text-4xl text-text-primary/90 text-center max-w-md"
      >
        {text}
      </motion.p>
    </div>
  )
}
