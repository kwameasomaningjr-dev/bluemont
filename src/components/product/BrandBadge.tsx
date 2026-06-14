import { CheckCircle2 } from 'lucide-react'
import type { BrandSlug } from '../../types'
import { BRAND_LABELS } from '../../constants/brands'

const badgeStyles: Record<BrandSlug, string> = {
  donaldson: 'bg-brand-donaldson/10 text-brand-donaldson border-brand-donaldson/20',
  yuko: 'bg-brand-yuko/10 text-brand-yuko border-brand-yuko/20',
  eurocar: 'bg-brand-eurocar/10 text-brand-eurocar border-brand-eurocar/20',
}

interface BrandBadgeProps {
  brand: BrandSlug
}

export function BrandBadge({ brand }: BrandBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[brand]}`}>
      {brand === 'donaldson' && <CheckCircle2 size={10} />}
      {BRAND_LABELS[brand]}
    </span>
  )
}
