import { create } from 'zustand'

interface CurrencyState {
  eurToGhsRate: number
  isLoading: boolean
  error: string | null
  fetchRate: () => Promise<void>
  formatGHS: (priceInEur: number) => string
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  eurToGhsRate: 17.5, // Fallback rate
  isLoading: false,
  error: null,
  
  formatGHS: (priceInEur: number) => {
    const rate = get().eurToGhsRate
    const converted = priceInEur * rate
    return `GHS ${converted.toLocaleString('en-GH', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`
  },

  fetchRate: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/EUR')
      if (!response.ok) throw new Error('Failed to fetch exchange rate')
      const data = await response.json()
      const rate = data.rates.GHS
      if (rate) {
        set({ eurToGhsRate: rate, isLoading: false })
      } else {
        throw new Error('GHS rate not found in response')
      }
    } catch (err) {
      console.error('Currency fetch error:', err)
      set({ error: (err as Error).message, isLoading: false })
      // Keep using fallback
    }
  },
}))
