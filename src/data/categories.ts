import type { Category } from '../types'

export const categories: Category[] = [
  // Donaldson Filtration
  {
    slug: 'air-filters',
    label: 'Air Filters',
    description: 'Engine air intake filtration for cars, trucks and heavy equipment.',
    brand: 'donaldson',
    icon: 'wind',
  },
  {
    slug: 'oil-filters',
    label: 'Oil Filters',
    description: 'Lubrication system filters that protect engines from contaminants.',
    brand: 'donaldson',
    icon: 'droplet',
  },
  {
    slug: 'fuel-filters',
    label: 'Fuel Filters',
    description: 'Fuel line filtration for diesel and petrol engines.',
    brand: 'donaldson',
    icon: 'fuel',
  },
  {
    slug: 'hydraulic-filters',
    label: 'Hydraulic Filters',
    description: 'High-pressure hydraulic system filtration for heavy machinery.',
    brand: 'donaldson',
    icon: 'gauge',
  },

  // YUKO Lubricants
  {
    slug: 'engine-oils',
    label: 'Engine Oils',
    description: 'Mineral and synthetic engine oils for petrol and diesel vehicles.',
    brand: 'yuko',
    icon: 'droplet',
  },
  {
    slug: 'gear-oils',
    label: 'Gear Oils',
    description: 'Transmission and differential gear oils for heavy-duty use.',
    brand: 'yuko',
    icon: 'cog',
  },
  {
    slug: 'hydraulic-fluids',
    label: 'Hydraulic Fluids',
    description: 'Hydraulic system fluids for industrial and automotive applications.',
    brand: 'yuko',
    icon: 'gauge',
  },
  {
    slug: 'greases',
    label: 'Greases',
    description: 'Multi-purpose and extreme-pressure greases for lubrication points.',
    brand: 'yuko',
    icon: 'beaker',
  },

  // Eurocar Batteries
  {
    slug: 'car-batteries',
    label: 'Car Batteries',
    description: 'Starter batteries for sedans and compact passenger vehicles.',
    brand: 'eurocar',
    icon: 'battery',
  },
  {
    slug: 'suv-batteries',
    label: 'SUV / 4x4 Batteries',
    description: 'High-capacity batteries for SUVs and four-wheel-drive vehicles.',
    brand: 'eurocar',
    icon: 'battery',
  },
  {
    slug: 'truck-batteries',
    label: 'Truck Batteries',
    description: 'Heavy-duty batteries for commercial trucks and buses.',
    brand: 'eurocar',
    icon: 'battery',
  },
  {
    slug: 'deep-cycle-batteries',
    label: 'Deep Cycle Batteries',
    description: 'Deep cycle batteries for marine, solar and backup power use.',
    brand: 'eurocar',
    icon: 'battery-charging',
  },
]
