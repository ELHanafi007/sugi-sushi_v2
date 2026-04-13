'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

interface ReservationsProps {
  onBack?: () => void
}

type FormState = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  requests: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

export function Reservations({ onBack }: ReservationsProps) {
  const { t } = useI18n()
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    requests: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const timeSlots = [
    '18:00', '18:30', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00',
  ]

  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8']

  const occasions = [
    { value: '', label: t('reservations.occasionNone') },
    { value: 'birthday', label: t('reservations.occasionBirthday') },
    { value: 'anniversary', label: t('reservations.occasionAnniversary') },
    { value: 'business', label: t('reservations.occasionBusiness') },
    { value: 'other', label: t('reservations.occasionOther') },
  ]

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = t('reservations.errorName')
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('reservations.errorEmail')
    }
    if (!form.phone.trim()) newErrors.phone = t('reservations.errorPhone')
    if (!form.date) newErrors.date = t('reservations.errorDate')
    if (!form.time) newErrors.time = t('reservations.errorTime')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (submitted) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-16 h-16 rounded-full border-2 border-gold mx-auto mb-8 flex items-center justify-center"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 16L14 22L24 10"
                stroke="#C9A96E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {t('reservations.successTitle')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-text-secondary leading-relaxed mb-8"
          >
            {t('reservations.successMessage')}
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 border border-gold/30 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500"
            style={{ letterSpacing: '0.2em' }}
          >
            {t('reservations.newReservation')}
          </motion.button>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pb-24"
    >
      {/* ── Hero Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 pt-24 pb-12 text-center"
      >
        <p
          className="text-gold text-xs tracking-[0.3em] uppercase mb-4"
          style={{ letterSpacing: '0.3em' }}
        >
          {t('reservations.subtitle')}
        </p>
        <h1
          className="font-serif text-4xl md:text-5xl text-text-primary"
          style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: '1.1' }}
        >
          {t('reservations.title')}
        </h1>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-6" />
      </motion.header>

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

      {/* ── Reservation Form ── */}
      <motion.form
        ref={containerRef}
        onSubmit={handleSubmit}
        className="px-6 max-w-lg mx-auto space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
            {t('reservations.name')} *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t('reservations.namePlaceholder')}
            className={`w-full px-4 py-3 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-tertiary/50 focus:outline-none focus:border-gold/40 transition-colors ${errors.name ? 'border-red-500/50' : 'border-divider'}`}
          />
          {errors.name && <p className="text-red-400/70 text-xs mt-1.5">{errors.name}</p>}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
              {t('reservations.email')} *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={`w-full px-4 py-3 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-tertiary/50 focus:outline-none focus:border-gold/40 transition-colors ${errors.email ? 'border-red-500/50' : 'border-divider'}`}
            />
            {errors.email && <p className="text-red-400/70 text-xs mt-1.5">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
              {t('reservations.phone')} *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+966 5X XXX XXXX"
              className={`w-full px-4 py-3 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-tertiary/50 focus:outline-none focus:border-gold/40 transition-colors ${errors.phone ? 'border-red-500/50' : 'border-divider'}`}
            />
            {errors.phone && <p className="text-red-400/70 text-xs mt-1.5">{errors.phone}</p>}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
              {t('reservations.date')} *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 bg-surface border rounded-lg text-text-primary text-sm focus:outline-none focus:border-gold/40 transition-colors ${errors.date ? 'border-red-500/50' : 'border-divider'}`}
            />
            {errors.date && <p className="text-red-400/70 text-xs mt-1.5">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
              {t('reservations.time')} *
            </label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-surface border rounded-lg text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none ${form.time ? 'text-text-primary' : 'text-text-tertiary/50'} ${errors.time ? 'border-red-500/50' : 'border-divider'}`}
            >
              <option value="" disabled>{t('reservations.selectTime')}</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-400/70 text-xs mt-1.5">{errors.time}</p>}
          </div>
        </div>

        {/* Guests & Occasion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
              {t('reservations.guests')}
            </label>
            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface border border-divider rounded-lg text-sm text-text-primary focus:outline-none focus:border-gold/40 transition-colors appearance-none"
            >
              {guestOptions.map((g) => (
                <option key={g} value={g}>
                  {g} {g === '1' ? t('reservations.guest') : t('reservations.guestsCount')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
              {t('reservations.occasion')}
            </label>
            <select
              name="occasion"
              value={form.occasion}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface border border-divider rounded-lg text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none"
            >
              {occasions.map((occ) => (
                <option key={occ.value} value={occ.value} className={occ.value ? 'text-text-primary' : 'text-text-tertiary/50'}>
                  {occ.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-text-tertiary text-xs tracking-[0.15em] uppercase mb-2" style={{ letterSpacing: '0.15em' }}>
            {t('reservations.requests')}
          </label>
          <textarea
            name="requests"
            value={form.requests}
            onChange={handleChange}
            rows={4}
            placeholder={t('reservations.requestsPlaceholder')}
            className="w-full px-4 py-3 bg-surface border border-divider rounded-lg text-text-primary text-sm placeholder:text-text-tertiary/50 focus:outline-none focus:border-gold/40 transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
          className={`w-full py-4 mt-4 border text-xs tracking-[0.25em] uppercase transition-all duration-500 ${
            isSubmitting
              ? 'border-gold/20 text-gold/40 cursor-not-allowed'
              : 'border-gold/30 text-gold hover:bg-gold hover:text-obsidian'
          }`}
          style={{ letterSpacing: '0.25em' }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {t('reservations.submitting')}
            </span>
          ) : (
            t('reservations.submit')
          )}
        </motion.button>
      </motion.form>
    </motion.section>
  )
}
