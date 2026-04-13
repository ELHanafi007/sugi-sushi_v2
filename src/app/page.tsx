'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WelcomeScreen } from '@/components/screens/WelcomeScreen'
import { StorytellingSection } from '@/components/screens/StorytellingSection'
import { CategoryView } from '@/components/screens/CategoryView'
import { DishDetail } from '@/components/screens/DishDetail'
import { AboutChef } from '@/components/screens/AboutChef'
import { Reservations } from '@/components/screens/Reservations'
import { Location } from '@/components/screens/Location'
import { Gallery } from '@/components/screens/Gallery'
import { Reviews } from '@/components/screens/Reviews'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { BottomNav } from '@/components/ui/BottomNav'
import { Particles } from '@/components/ui/Particles'
import { Footer } from '@/components/ui/Footer'
import { useI18n } from '@/contexts/i18n'
import type { MenuCategory, MenuItem } from '@/data/menu'

type MainScreen = 'welcome' | 'storytelling' | 'categories' | 'dish'
type NavScreen = 'home' | 'menu' | 'reservations' | 'gallery' | 'location'
type AppScreen = MainScreen | 'about' | 'reservations' | 'location' | 'gallery' | 'reviews'

export default function Home() {
  const [mainScreen, setMainScreen] = useState<MainScreen>('welcome')
  const [navScreen, setNavScreen] = useState<NavScreen>('home')
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null)
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null)
  const [showParticles, setShowParticles] = useState(false)
  const [extraPage, setExtraPage] = useState<'about' | 'reviews' | null>(null)
  const { locale } = useI18n()

  const handleEnterMenu = useCallback(() => {
    setMainScreen('storytelling')
  }, [])

  const handleSelectCategory = useCallback((category: MenuCategory) => {
    setActiveCategory(category)
    setMainScreen('categories')
  }, [])

  const handleSelectDish = useCallback((dish: MenuItem) => {
    setActiveDish(dish)
    setMainScreen('dish')
  }, [])

  const handleBackFromDish = useCallback(() => {
    setActiveDish(null)
  }, [])

  const handleNavigate = useCallback((screen: NavScreen) => {
    setNavScreen(screen)
    if (screen === 'home' || screen === 'menu') {
      setMainScreen('categories')
    }
  }, [])

  const handleBackToNav = useCallback(() => {
    if (mainScreen === 'categories' || mainScreen === 'dish') {
      setNavScreen('menu')
    } else {
      setNavScreen('home')
    }
  }, [mainScreen])

  // Determine which screen to render
  const renderContent = () => {
    // Extra pages (about, reviews)
    if (extraPage === 'about') {
      return <AboutChef onBack={() => setExtraPage(null)} />
    }
    if (extraPage === 'reviews') {
      return <Reviews onBack={() => setExtraPage(null)} />
    }

    // Nav-driven screens
    if (navScreen === 'reservations') {
      return <Reservations onBack={handleBackToNav} />
    }
    if (navScreen === 'gallery') {
      return <Gallery onBack={handleBackToNav} />
    }
    if (navScreen === 'location') {
      return <Location onBack={handleBackToNav} />
    }

    // Main flow screens
    switch (mainScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            key="welcome"
            onEnter={() => {
              handleEnterMenu()
              setShowParticles(true)
            }}
          />
        )
      case 'storytelling':
        return (
          <StorytellingSection
            key="storytelling"
            onContinue={() => {
              setMainScreen('categories')
              setNavScreen('menu')
            }}
          />
        )
      case 'categories':
        return (
          <>
            <CategoryView
              key="categories"
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              onSelectDish={handleSelectDish}
            />
            <Footer />
          </>
        )
      case 'dish':
        return activeDish ? (
          <DishDetail
            key="dish"
            dish={activeDish}
            onBack={handleBackFromDish}
          />
        ) : null
      default:
        return null
    }
  }

  const showBottomNav = mainScreen !== 'welcome' && mainScreen !== 'storytelling'

  return (
    <main className="min-h-screen bg-obsidian text-text-primary overflow-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Gold Particles — Ambient luxury */}
      {showParticles && <Particles count={25} opacity={0.35} size={[1, 2.5]} speed={[0.15, 0.35]} />}

      {/* Language Toggle — Always accessible */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      {/* Bottom Navigation — Visible after welcome */}
      {showBottomNav && (
        <BottomNav
          activeScreen={navScreen}
          onNavigate={handleNavigate}
        />
      )}

      {/* Bottom padding when nav is visible */}
      {showBottomNav && <div className="h-16" />}
    </main>
  )
}
