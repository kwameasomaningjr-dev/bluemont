import type { BrandSlug } from '../../types'
import { BRAND_LABELS } from '../../constants/brands'

const badgeStyles: Record<BrandSlug, string> = {
  donaldson: 'bg-brand-donaldson/10 text-brand-donaldson',
  yuko: 'bg-brand-yuko/10 text-brand-yuko',
  eurocar: 'bg-brand-eurocar/10 text-brand-eurocar',
}

interface BrandBadgeProps {
  brand: BrandSlug
}

export function BrandBadge({ brand }: BrandBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[brand]}`}>
      {BRAND_LABELS[brand]}
    </span>
  )
}
