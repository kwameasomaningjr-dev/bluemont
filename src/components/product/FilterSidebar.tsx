import { categories } from '../../data/categories'
import { BRAND_LABELS } from '../../constants/brands'
import type { BrandSlug, FilterState } from '../../types'

const ALL_BRANDS: BrandSlug[] = ['donaldson', 'yuko', 'eurocar', 'spare-parts']
const PRICE_CEILING = 5000

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleBrand = (brand: BrandSlug) => {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onChange({ ...filters, brands })
  }

  const toggleCategory = (slug: string) => {
    const cats = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug]
    onChange({ ...filters, categories: cats })
  }

  const visibleCategories = filters.brands.length
    ? categories.filter((c) => filters.brands.includes(c.brand))
    : categories

  return (
    <div className="space-y-7">
      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-neutral-text">Brand</h3>
        <div className="mt-3 space-y-2">
          {ALL_BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 text-sm text-neutral-muted">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-neutral-border text-brand-donaldson focus:ring-brand-donaldson"
              />
              {BRAND_LABELS[brand]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-neutral-text">Category</h3>
        <div className="mt-3 space-y-2">
          {visibleCategories.map((category) => (
            <label key={category.slug} className="flex items-center gap-2.5 text-sm text-neutral-muted">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
                className="h-4 w-4 rounded border-neutral-border text-brand-donaldson focus:ring-brand-donaldson"
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-neutral-text">Price (GHS)</h3>
        <div className="mt-3 space-y-2">
          <input
            type="range"
            min={0}
            max={PRICE_CEILING}
            step={50}
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="w-full accent-brand-donaldson"
          />
          <div className="flex items-center justify-between text-xs text-neutral-muted">
            <span>GHS 0</span>
            <span>Up to GHS {filters.priceMax.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2.5 text-sm text-neutral-muted">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="h-4 w-4 rounded border-neutral-border text-brand-donaldson focus:ring-brand-donaldson"
          />
          In stock only
        </label>
      </div>
    </div>
  )
}
