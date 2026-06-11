import type { BrandSlug } from '../types'

export const BRAND_COLORS: Record<BrandSlug, string> = {
  donaldson: '#1A3A6B',
  yuko: '#B8860B',
  eurocar: '#2D6A2D',
}

export const BRAND_LABELS: Record<BrandSlug, string> = {
  donaldson: 'Donaldson Filtration',
  yuko: 'YUKO Lubricants',
  eurocar: 'Eurocar Batteries',
}

export const WHATSAPP_NUMBER = '233242561798'

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
