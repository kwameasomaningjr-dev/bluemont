import type { Category } from '../../types'

interface BrandCategoryNavProps {
  categories: Category[]
  active: string | null
  onSelect: (slug: string | null) => void
  accentColor: string
}

export function BrandCategoryNav({ categories, active, onSelect, accentColor }: BrandCategoryNavProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
          active === null
            ? 'border-transparent text-white'
            : 'border-neutral-border text-neutral-text hover:border-neutral-text/40'
        }`}
        style={active === null ? { backgroundColor: accentColor } : undefined}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          type="button"
          onClick={() => onSelect(category.slug)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
            active === category.slug
              ? 'border-transparent text-white'
              : 'border-neutral-border text-neutral-text hover:border-neutral-text/40'
          }`}
          style={active === category.slug ? { backgroundColor: accentColor } : undefined}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
