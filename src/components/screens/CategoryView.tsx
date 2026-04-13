'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/contexts/i18n'
import { categories, getItemsByCategory, type MenuCategory, type MenuItem } from '@/data/menu'
import { MenuItemCard } from '@/components/ui/MenuItemCard'

interface CategoryViewProps {
  activeCategory: MenuCategory | null
  onSelectCategory: (category: MenuCategory) => void
  onSelectDish: (dish: MenuItem) => void
}

type FilterType = 'all' | 'signature' | 'popular' | 'gluten-free' | 'dairy-free'

const FILTERS: { id: FilterType; icon?: string }[] = [
  { id: 'all' },
  { id: 'signature' },
  { id: 'popular' },
  { id: 'gluten-free' },
  { id: 'dairy-free' },
]

export function CategoryView({
  activeCategory,
  onSelectCategory,
  onSelectDish,
}: CategoryViewProps) {
  const { t } = useI18n()
  const [viewingCategory, setViewingCategory] = useState<MenuCategory | null>(activeCategory)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleCategorySelect = (category: MenuCategory) => {
    setViewingCategory(category)
    onSelectCategory(category)
  }

  const items = viewingCategory ? getItemsByCategory(viewingCategory.id) : []

  // Apply filters
  const filteredItems = items.filter((item) => {
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const matchesName = item.name.en.toLowerCase().includes(q) || item.name.ar.includes(q)
      const matchesTagline = item.tagline.en.toLowerCase().includes(q)
      const matchesTag = item.tags?.some((tag) => tag.toLowerCase().includes(q))
      if (!matchesName && !matchesTagline && !matchesTag) return false
    }

    // Type filter
    if (activeFilter === 'signature') return item.isSignature
    if (activeFilter === 'popular') return item.tags?.includes('popular')
    if (activeFilter === 'gluten-free') return !item.allergens?.includes('gluten')
    if (activeFilter === 'dairy-free') return !item.allergens?.includes('dairy')
    return true
  })

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pb-24"
    >
      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="px-6 pt-16 pb-8 text-center"
      >
        <p
          className="text-text-tertiary text-xs tracking-[0.3em] uppercase mb-2"
          style={{ letterSpacing: '0.3em' }}
        >
          {t('categories.subtitle')}
        </p>
        <h1
          className="font-serif text-3xl md:text-4xl text-text-primary"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {t('categories.title')}
        </h1>

        {/* Gold divider */}
        <div className="w-8 h-px bg-gold/40 mx-auto mt-6" />
      </motion.header>

      {/* ── Category Tabs — Horizontal scroll ── */}
      <nav className="px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              onClick={() => handleCategorySelect(category)}
              className={`
                flex-shrink-0 snap-start px-5 py-3 rounded-lg text-xs tracking-[0.15em] uppercase transition-all duration-300 border
                ${viewingCategory?.id === category.id
                  ? 'bg-gold/10 border-gold/30 text-gold'
                  : 'bg-surface border-divider text-text-secondary hover:border-gold/20 hover:text-gold/70'
                }
              `}
              style={{ letterSpacing: '0.15em' }}
            >
              <span className="mr-2 opacity-50">{category.icon}</span>
              {category.name.en}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* ── Search Bar ── */}
      {viewingCategory && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 mb-4"
        >
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('menu.search')}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-divider rounded-lg text-text-primary text-sm placeholder:text-text-tertiary/50 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>
        </motion.div>
      )}

      {/* ── Dietary / Special Filters ── */}
      {viewingCategory && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-6 mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-300 border ${
                  activeFilter === filter.id
                    ? 'bg-gold/10 border-gold/30 text-gold'
                    : 'bg-transparent border-divider text-text-tertiary hover:border-gold/20'
                }`}
                style={{ letterSpacing: '0.12em' }}
              >
                {t(`menu.filter${filter.id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`)}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Category Content ── */}
      <AnimatePresence mode="wait">
        {viewingCategory ? (
          <motion.div
            key={viewingCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-6"
          >
            {/* Category header */}
            <div className="mb-8">
              <h2
                className="font-serif text-2xl text-text-primary mb-1"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {viewingCategory.name.en}
              </h2>
              <p className="text-text-tertiary text-sm italic">
                {viewingCategory.subtitle.en}
              </p>
              <div className="w-6 h-px bg-gold/30 mt-4" />
            </div>

            {/* Menu items — Card layout, NOT a list */}
            <div className="space-y-6">
              {filteredItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-text-tertiary text-sm">
                    {searchQuery ? 'No dishes match your search' : 'No items in this category'}
                  </p>
                </motion.div>
              ) : (
                filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <MenuItemCard item={item} onClick={() => onSelectDish(item)} />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          /* No category selected — show category grid */
          <motion.div
            key="category-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6"
          >
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {categories.map((category, i) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleCategorySelect(category)}
                  className="group relative overflow-hidden rounded-xl bg-surface border border-divider p-6 text-left transition-all duration-300 hover:border-gold/20"
                >
                  {/* Background image hint */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <img
                      src={`https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=60`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="relative z-10">
                    <span className="text-gold/40 text-lg mb-2 block">{category.icon}</span>
                    <h3
                      className="font-serif text-lg text-text-primary mb-1"
                      style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                      {category.name.en}
                    </h3>
                    <p className="text-text-tertiary text-xs">
                      {category.subtitle.en}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/30 transition-all duration-500" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
