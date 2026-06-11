import { products } from '../../data/products'
import type { Product } from '../../types'
import { ProductCard } from './ProductCard'

interface RelatedProductsProps {
  product: Product
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand || p.category === product.category),
    )
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-neutral-text">You May Also Like</h2>
      <div className="mt-4 flex gap-5 overflow-x-auto pb-2">
        {related.map((item) => (
          <div key={item.id} className="w-64 shrink-0">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
