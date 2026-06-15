import { create } from 'zustand'

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'GHS'

interface CurrencyInfo {
  code: CurrencyCode
  symbol: string
  label: string
  locale: string
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', label: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', label: 'Euro', locale: 'en-IE' },
  GBP: { code: 'GBP', symbol: '£', label: 'British Pound', locale: 'en-GB' },
  GHS: { code: 'GHS', symbol: 'GH₵', label: 'Ghana Cedi', locale: 'en-GH' },
}

const INITIAL_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  GHS: 15.0,
}

function createFormatter(currency: CurrencyCode, rates: Record<CurrencyCode, number>) {
  return (priceInBase: number) => {
    const info = CURRENCIES[currency] ?? CURRENCIES.USD
    const rate = rates[currency] ?? 1
    const converted = (priceInBase || 0) * rate

    try {
      return new Intl.NumberFormat(info.locale, {
        style: 'currency',
        currency: info.code,
        minimumFractionDigits: 2,
      }).format(converted)
    } catch (err) {
      console.error('Format error:', err)
      return `${info.symbol}${converted.toFixed(2)}`
    }
  }
}

interface CurrencyState {
  baseCurrency: CurrencyCode
  currentCurrency: CurrencyCode
  rates: Record<CurrencyCode, number>
  isLoading: boolean
  error: string | null
  setCurrency: (code: CurrencyCode) => void
  fetchRate: () => Promise<void>
  formatPrice: (priceInBase: number) => string
  formatGHS: (priceInBase: number) => string
  convert: (priceInBase: number, to: CurrencyCode) => number
}

export const useCurrencyStore = create<CurrencyState>()((set, get) => ({
  baseCurrency: 'USD',
  currentCurrency: 'GHS',
  rates: INITIAL_RATES,
  isLoading: false,
  error: null,
  formatPrice: createFormatter('GHS', INITIAL_RATES),
  formatGHS: createFormatter('GHS', INITIAL_RATES),

  setCurrency: (code: CurrencyCode) =>
    set((state) => ({
      currentCurrency: code,
      formatPrice: createFormatter(code, state.rates),
      formatGHS: createFormatter(code, state.rates),
    })),

  convert: (priceInBase: number, to: CurrencyCode) => {
    const rates = get().rates
    return priceInBase * (rates[to] || 1)
  },

  fetchRate: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD')
      if (!response.ok) throw new Error('Failed to fetch exchange rates')
      const data = await response.json()

      if (data.rates) {
        set((state) => {
          const rates = {
            USD: 1,
            EUR: data.rates.EUR,
            GBP: data.rates.GBP,
            GHS: data.rates.GHS,
          }

          return {
            rates,
            isLoading: false,
            formatPrice: createFormatter(state.currentCurrency, rates),
            formatGHS: createFormatter(state.currentCurrency, rates),
          }
        })
      }
    } catch (err) {
      console.error('Currency fetch error:', err)
      set({ error: (err as Error).message, isLoading: false })
    }
  },
}))
