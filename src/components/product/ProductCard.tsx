import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import type { Product } from '../../types'
import { BrandBadge } from './BrandBadge'
import { StockChip } from './StockChip'
import { PriceDisplay } from './PriceDisplay'
import { useCartStore } from '../../store/cartStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    openCart()
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.15 }}>
      <Link
        to={ROUTES.product(product.slug)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-border bg-neutral-surface shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="aspect-square flex flex-col items-center justify-center bg-neutral-bg p-6 text-center border-b border-neutral-border">
          <div className="rounded bg-brand-donaldson/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-donaldson mb-2">
            {product.brand}
          </div>
          <span className="font-display text-lg font-bold leading-tight text-neutral-text">
            {product.name.split(' ').slice(-1)}
          </span>
          <span className="mt-1 font-mono text-[10px] text-neutral-muted">
            {product.sku}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <BrandBadge brand={product.brand} />
            <StockChip status={product.stockStatus} />
          </div>
          <h3 className="font-display text-sm font-semibold leading-snug text-neutral-text">
            {product.name}
          </h3>
          <p className="font-mono text-xs text-neutral-muted">{product.sku}</p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <PriceDisplay product={product} />
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-[#1A3A6B] p-2 text-white transition hover:bg-[#1A3A6B]/90"
              title="Add to Cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
