import { CheckCircle2 } from 'lucide-react'
import type { BrandSlug } from '../../types'
import { BRAND_LABELS } from '../../constants/brands'

const badgeStyles: Record<BrandSlug, string> = {
  donaldson: 'bg-brand-donaldson/10 text-brand-donaldson border-brand-donaldson/20',
  yuko: 'bg-brand-yuko/10 text-brand-yuko border-brand-yuko/20',
  eurocar: 'bg-brand-eurocar/10 text-brand-eurocar border-brand-eurocar/20',
  'spare-parts': 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  toyota: 'bg-brand-toyota/10 text-brand-toyota border-brand-toyota/20',
  mitsubishi: 'bg-brand-mitsubishi/10 text-brand-mitsubishi border-brand-mitsubishi/20',
  howo: 'bg-brand-howo/10 text-brand-howo border-brand-howo/20',
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
