import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatGHS(price: number): string {
  return `GHS ${price.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const realisticImageSets = {
  donaldson: [
    'https://unsplash.com/photos/new-clean-car-filter-vehicle-fresh-air-automobile-maintenance-MXTxUV8KEY4/download?force=true',
    'https://unsplash.com/photos/a-close-up-of-a-cars-air-filter-Sh6xyQQYDz4/download?force=true',
    'https://unsplash.com/photos/a-yellow-pleated-oil-filter-with-gray-ends-0_TINhcZOK0/download?force=true',
    'https://unsplash.com/photos/close-up-of-a-dirty-fuel-filter-on-a-vehicle-jXcdwIuhqFc/download?force=true',
    'https://unsplash.com/photos/blue-industrial-machinery-with-orange-cable-and-netting-qAFMMvbphRs/download?force=true',
  ],
  yuko: [
    'https://unsplash.com/photos/a-castrol-oil-drum-sits-in-the-grass-LuV70D0oizA/download?force=true',
    'https://unsplash.com/photos/several-old-oil-drums-stacked-in-a-dark-space-eXa2qtgNXLI/download?force=true',
    'https://unsplash.com/photos/industrial-machinery-over-bubbling-liquid-rH609EVqJIk/download?force=true',
  ],
  eurocar: [
    'https://unsplash.com/photos/a-white-battery-on-a-white-background-H4lM3DoHvqc/download?force=true',
    'https://unsplash.com/photos/a-black-car-battery-Lxsr9TSHFl4/download?force=true',
    'https://unsplash.com/photos/a-close-up-of-a-car-battery-_u72m1SRxQk/download?force=true',
    'https://unsplash.com/photos/rows-of-batteries-with-red-and-blue-terminals-CH7kRmyBQ4I/download?force=true',
    'https://unsplash.com/photos/close-up-photo-of-car-s-battery-4374843/download?force=true',
  ],
}

function seededPick(seed: string, options: string[]): string {
  let hash = 0
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return options[hash % options.length]
}

export function placeholderImage(seed: string, width = 600, height = 600): string {
  const normalized = seed.toLowerCase()

  if (normalized.includes('donaldson-hero') || normalized.includes('air') || normalized.includes('fuel') || normalized.includes('filter') || normalized.includes('hydraulic')) {
    return seededPick(seed, realisticImageSets.donaldson)
  }

  if (normalized.includes('yuko-hero') || normalized.includes('oil') || normalized.includes('grease') || normalized.includes('fluid')) {
    return seededPick(seed, realisticImageSets.yuko)
  }

  if (normalized.includes('eurocar-hero') || normalized.includes('battery') || normalized.includes('truck') || normalized.includes('deep-cycle') || normalized.includes('suv')) {
    return seededPick(seed, realisticImageSets.eurocar)
  }

  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
}
