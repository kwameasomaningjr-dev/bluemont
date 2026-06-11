import { useMemo, useState } from 'react'
import { brands } from '../data/brands'
import { categories } from '../data/categories'
import { products } from '../data/products'
import type { BrandSlug } from '../types'
import { BrandHero } from '../components/marketing/BrandHero'
import { BrandCategoryNav } from '../components/marketing/BrandCategoryNav'
import { ProductGrid } from '../components/product/ProductGrid'

interface BrandPageProps {
  brand: BrandSlug
}

export default function BrandPage({ brand }: BrandPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const brandData = brands.find((b) => b.slug === brand)!
  const brandCategories = categories.filter((c) => c.brand === brand)
  const brandProducts = useMemo(() => products.filter((p) => p.brand === brand), [brand])

  const filtered = activeCategory ? brandProducts.filter((p) => p.category === activeCategory) : brandProducts

  return (
    <div>
      <BrandHero brand={brandData} productCount={brandProducts.length} />

      <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-muted sm:text-base">{brandData.description}</p>

        <div className="mt-8">
          <BrandCategoryNav
            categories={brandCategories}
            active={activeCategory}
            onSelect={setActiveCategory}
            accentColor={brandData.colorPrimary}
          />
        </div>

        <div className="mt-6">
          <ProductGrid products={filtered} emptyMessage="No products in this category yet — check back soon." />
        </div>
      </div>
    </div>
  )
}
