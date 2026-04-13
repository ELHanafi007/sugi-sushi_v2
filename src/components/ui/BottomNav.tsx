'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'

type NavScreen = 'home' | 'menu' | 'reservations' | 'gallery' | 'location'

interface BottomNavProps {
  activeScreen: NavScreen
  onNavigate: (screen: NavScreen) => void
}

const navItems: { id: NavScreen; icon: React.ReactNode; labelKey: string }[] = [
  {
    id: 'home',
    labelKey: 'nav.home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'menu',
    labelKey: 'nav.menu',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'reservations',
    labelKey: 'nav.reservations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M12 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'gallery',
    labelKey: 'nav.gallery',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: 'location',
    labelKey: 'nav.location',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const { t } = useI18n()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-obsidian/90 backdrop-blur-xl border-t border-divider"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center py-1.5 px-3 min-w-0 flex-1"
                aria-label={t(item.labelKey)}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-gold/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-text-tertiary hover:text-text-secondary'}`}>
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`relative z-10 text-[0.55rem] tracking-wider mt-1 transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-text-tertiary'
                  }`}
                  style={{ letterSpacing: '0.05em' }}
                >
                  {t(item.labelKey)}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
