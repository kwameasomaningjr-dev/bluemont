import { Link } from 'react-router-dom'
import { useProductStore } from '../../store/productStore'
import { ROUTES } from '../../constants/routes'
import { ProductGrid } from '../product/ProductGrid'
import { SectionHeading } from '../utility/SectionHeading'

export function FeaturedProducts() {
  const products = useProductStore((state) => state.products)
  const featured = products.filter((p) => p.isFeatured).slice(0, 6)

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading label="Handpicked" heading="Featured Products" />
        <Link to={ROUTES.products} className="text-sm font-semibold text-brand-donaldson hover:underline">
          View All →
        </Link>
      </div>
      <div className="mt-6">
        <ProductGrid products={featured} />
      </div>
    </div>
  )
}
