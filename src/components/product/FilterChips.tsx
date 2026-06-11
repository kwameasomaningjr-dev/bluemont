import { X } from 'lucide-react'
import { categories } from '../../data/categories'
import { BRAND_LABELS } from '../../constants/brands'
import type { BrandSlug, FilterState } from '../../types'

interface FilterChipsProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export function FilterChips({ filters, onChange }: FilterChipsProps) {
  const chips: { key: string; label: string; onRemove: () => void }[] = []

  filters.brands.forEach((brand) => {
    chips.push({
      key: `brand-${brand}`,
      label: BRAND_LABELS[brand as BrandSlug],
      onRemove: () => onChange({ ...filters, brands: filters.brands.filter((b) => b !== brand) }),
    })
  })

  filters.categories.forEach((slug) => {
    const category = categories.find((c) => c.slug === slug)
    chips.push({
      key: `category-${slug}`,
      label: category?.label ?? slug,
      onRemove: () => onChange({ ...filters, categories: filters.categories.filter((c) => c !== slug) }),
    })
  })

  if (filters.priceMax < 5000) {
    chips.push({
      key: 'price',
      label: `Up to GHS ${filters.priceMax.toLocaleString()}`,
      onRemove: () => onChange({ ...filters, priceMax: 5000 }),
    })
  }

  if (filters.inStockOnly) {
    chips.push({
      key: 'stock',
      label: 'In stock only',
      onRemove: () => onChange({ ...filters, inStockOnly: false }),
    })
  }

  if (!chips.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface px-3 py-1.5 text-xs font-medium text-neutral-text transition hover:border-status-danger/40 hover:text-status-danger"
        >
          {chip.label}
          <X size={13} />
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange({ brands: [], categories: [], priceMin: 0, priceMax: 5000, inStockOnly: false, sort: filters.sort })}
        className="inline-flex items-center text-xs font-semibold text-brand-donaldson hover:underline"
      >
        Clear all
      </button>
    </div>
  )
}
