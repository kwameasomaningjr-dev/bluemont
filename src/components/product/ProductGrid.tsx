import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import type { Product } from '../../types'
import { ProductCard } from './ProductCard'
import { EmptyState } from '../utility/EmptyState'

interface ProductGridProps {
  products: Product[]
  emptyMessage?: string
}

export function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description={emptyMessage ?? 'Try adjusting your filters or browse a different category.'}
        action={
          <Link
            to={ROUTES.products}
            className="mt-1 rounded-full bg-brand-donaldson px-5 py-2 text-sm font-semibold text-white hover:bg-brand-donaldson/90"
          >
            View All Products
          </Link>
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
