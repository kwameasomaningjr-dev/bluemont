import type { Brand } from '../types'
import { placeholderImage } from '../lib/utils'

export const brands: Brand[] = [
  {
    name: 'Donaldson Filtration',
    slug: 'donaldson',
    tagline: 'Cleaner air. Cleaner fuel. Longer engine life.',
    description:
      'Genuine Donaldson filtration products engineered to protect engines and hydraulic systems across automotive, agricultural and industrial applications.',
    colorPrimary: '#1A3A6B',
    categories: ['air-filters', 'oil-filters', 'fuel-filters', 'hydraulic-filters'],
    heroImage: placeholderImage('donaldson-hero', 1600, 700),
  },
  {
    name: 'YUKO Lubricants',
    slug: 'yuko',
    tagline: 'Engineered lubrication for every engine and gearbox.',
    description:
      'A full range of mineral and synthetic engine oils, gear oils, hydraulic fluids and greases formulated for Ghana’s climate and driving conditions.',
    colorPrimary: '#B8860B',
    categories: ['engine-oils', 'gear-oils', 'hydraulic-fluids', 'greases'],
    heroImage: placeholderImage('yuko-hero', 1600, 700),
  },
  {
    name: 'Eurocar Batteries',
    slug: 'eurocar',
    tagline: 'Reliable starting power, made in Ghana.',
    description:
      'Locally manufactured maintenance-free batteries for cars, SUVs, trucks and deep-cycle applications, backed by nationwide warranty support.',
    colorPrimary: '#2D6A2D',
    categories: ['car-batteries', 'suv-batteries', 'truck-batteries', 'deep-cycle-batteries'],
    heroImage: placeholderImage('eurocar-hero', 1600, 700),
  },
]
