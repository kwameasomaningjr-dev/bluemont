import { useCurrencyStore } from '../../store/currencyStore'
import type { Product } from '../../types'

interface PriceDisplayProps {
  product: Pick<Product, 'price' | 'compareAtPrice' | 'quoteEnabled' | 'buyNowEnabled'>
  size?: 'card' | 'hero'
}

export function PriceDisplay({ product, size = 'card' }: PriceDisplayProps) {
  const formatGHS = useCurrencyStore((state) => state.formatGHS)

  if (!product.buyNowEnabled && product.quoteEnabled) {
    return <span className="text-sm font-semibold text-brand-donaldson">Contact for Price</span>
  }

  const priceClass = size === 'hero' ? 'text-2xl font-bold' : 'text-base font-semibold'

  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    const percentOff = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`font-mono text-neutral-text ${priceClass}`}>{formatGHS(product.price)}</span>
        <span className="font-mono text-sm text-neutral-muted line-through">{formatGHS(product.compareAtPrice)}</span>
        <span className="rounded-full bg-status-danger/10 px-2 py-0.5 text-xs font-semibold text-status-danger">
          -{percentOff}%
        </span>
      </div>
    )
  }

  return <span className={`font-mono text-neutral-text ${priceClass}`}>{formatGHS(product.price)}</span>
}
