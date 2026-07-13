import type { Brand } from '../types'

export const brands: Brand[] = [
  {
    name: 'Donaldson Filtration',
    slug: 'donaldson',
    tagline: 'The Gold Standard in Technology-Led Filtration.',
    description:
      'Founded in 1915, Donaldson is a global leader in technology-led filtration, dedicated to delivering solutions that improve equipment performance and protect the environment. Renowned for over a century of innovation, Donaldson engineering is the trusted gold standard across the world’s most demanding industries. As an authorized distributor, we bring Donaldson’s premium, OEM-grade filtration technology directly to your operations, specializing in Gas Turbine Systems and critical industrial filtration.',
    colorPrimary: '#1A3A6B',
    categories: ['air-filters', 'oil-filters', 'fuel-filters', 'hydraulic-filters'],
    heroImage: '/images/donaldson.png',
  },
  {
    name: 'YUKO Lubricants',
    slug: 'yuko',
    tagline: 'Your Unique Key Opportunity.',
    description:
      'Established in 2002, YUKO is Ukraine\'s best-selling automotive oil brand, exported to over 80 countries. YUKO stands for "Your Unique Key Opportunity," representing a commitment to providing partners with a competitive edge. Built with a "principle of primacy," YUKO maintains one of Eastern Europe\'s most advanced blending plants and laboratories, ensuring every drop meets the highest international standards for extreme performance—even in Antarctica.',
    colorPrimary: '#B8860B',
    categories: ['engine-oils', 'gear-oils', 'hydraulic-fluids', 'greases'],
    heroImage: '/images/yuko.png',
  },
  {
    name: 'Eurocar Batteries',
    slug: 'eurocar',
    tagline: 'Superior Power for Every Class of Vehicle.',
    description:
      'Eurocar/Eurotruk is an automotive battery produced for vehicles with demand of superior starting, performance, and reliability. Adopted to resist high vibration levels and hot weather, offering excellent power, capacity, start performance, and reliability. This is a high-quality product for vehicles of every class.',
    colorPrimary: '#2D6A2D',
    categories: ['car-batteries', 'suv-batteries', 'truck-batteries', 'deep-cycle-batteries'],
    heroImage: '/images/eurocar.png',
  },
  {
    name: 'Genuine Spare Parts',
    slug: 'spare-parts',
    tagline: 'Authentic components for Toyota, Mitsubishi, Howo and more.',
    description: 'We supply genuine spare parts for leading brands including Toyota, Mitsubishi, and Howo. From high-precision fuel injection pumps to complete diesel engines and hydraulic systems, we ensure your equipment runs on authentic components sourced directly from authorized manufacturers.',
    colorPrimary: '#475569',
    categories: ['fuel-injection-pumps', 'diesel-engines', 'hydraulic-pumps', 'main-valves', 'tyres'],
    heroImage: '/images/genuine-spare-parts.jpg',
  },
]
