import { create } from 'zustand'
import type { FilterState, Toast } from '../types'

const defaultFilters: FilterState = {
  brands: [],
  categories: [],
  priceMin: 0,
  priceMax: 5000,
  inStockOnly: false,
  sort: 'newest',
}

interface UIStore {
  mobileMenuOpen: boolean
  openMobileMenu: () => void
  closeMobileMenu: () => void
  toggleMobileMenu: () => void

  activeFilters: FilterState
  setActiveFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void

  searchQuery: string
  setSearchQuery: (query: string) => void

  toasts: Toast[]
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  mobileMenuOpen: false,
  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  activeFilters: defaultFilters,
  setActiveFilters: (filters) =>
    set((state) => ({ activeFilters: { ...state.activeFilters, ...filters } })),
  resetFilters: () => set({ activeFilters: defaultFilters }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  toasts: [],
  addToast: (toast) => set((state) => ({ toasts: [...state.toasts, toast] })),
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
