import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { brands } from '../../data/brands'
import { products } from '../../data/products'
import { ROUTES } from '../../constants/routes'

export function BrandShowcaseCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {brands.map((brand) => {
        const count = products.filter((p) => p.brand === brand.slug).length
        return (
          <div
            key={brand.slug}
            className="flex flex-col gap-4 rounded-2xl border border-neutral-border bg-neutral-surface p-6 shadow-sm"
          >
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: brand.colorPrimary }}
            >
              {brand.name.charAt(0)}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-neutral-text">{brand.name}</h3>
              <p className="mt-1 text-sm text-neutral-muted">{brand.tagline}</p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-muted">
              {count} products available
            </p>
            <Link
              to={ROUTES.brand(brand.slug)}
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: brand.colorPrimary }}
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
