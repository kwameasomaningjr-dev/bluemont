import type { BrandSlug } from '../types'

export const BRAND_COLORS: Record<BrandSlug, string> = {
  donaldson: '#1A3A6B',
  yuko: '#B8860B',
  eurocar: '#2D6A2D',
  'spare-parts': '#475569',
  toyota: '#EB0A1E',
  mitsubishi: '#E60012',
  howo: '#005CAF',
}

export const BRAND_LABELS: Record<BrandSlug, string> = {
  donaldson: 'Donaldson Filtration',
  yuko: 'YUKO Lubricants',
  eurocar: 'Eurocar Batteries',
  'spare-parts': 'Genuine Spare Parts',
  toyota: 'Toyota Genuine Parts',
  mitsubishi: 'Mitsubishi Genuine Parts',
  howo: 'Howo Truck Parts',
}

export const WHATSAPP_NUMBER = '233242561798'

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
