'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'

export type Locale = 'en' | 'ar'

const translations: Record<Locale, Record<string, unknown>> = { en, ar }

interface I18nContextType {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: (key: string) => string
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

function resolvePath(obj: Record<string, unknown>, path: string): string {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return path // fallback to key
    }
  }
  return typeof current === 'string' ? current : path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  }, [])

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  const t = useCallback(
    (key: string): string => {
      const dict = translations[locale]
      return resolvePath(dict, key)
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, dir, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
