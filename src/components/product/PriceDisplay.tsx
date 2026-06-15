import { Link } from 'react-router-dom'
import { useCurrencyStore } from '../../store/currencyStore'
import { ROUTES } from '../../constants/routes'
import type { Product } from '../../types'

interface PriceDisplayProps {
  product: Pick<Product, 'slug' | 'price' | 'compareAtPrice' | 'quoteEnabled' | 'buyNowEnabled'>
  size?: 'card' | 'hero'
}

export function PriceDisplay({ product, size = 'card' }: PriceDisplayProps) {
  const formatPrice = useCurrencyStore((state) => state.formatPrice)

  if (!product.buyNowEnabled && product.quoteEnabled) {
    const priceClasses = size === 'hero' ? 'text-2xl font-bold' : 'text-base font-semibold'

    if (size === 'hero') {
      return (
        <Link
          to={`${ROUTES.quote}?product=${product.slug}`}
          className={`inline-flex rounded-full bg-brand-donaldson px-4 py-2 text-white transition hover:bg-brand-donaldson/90 ${priceClasses}`}
        >
          Contact for Price
        </Link>
      )
    }

    return <span className={`text-brand-donaldson ${priceClasses}`}>Contact for Price</span>
  }

  const priceClass = size === 'hero' ? 'text-2xl font-bold' : 'text-base font-semibold'

  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    const percentOff = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`font-mono text-neutral-text ${priceClass}`}>{formatPrice(product.price)}</span>
        <span className="font-mono text-sm text-neutral-muted line-through">{formatPrice(product.compareAtPrice)}</span>
        <span className="rounded-full bg-status-danger/10 px-2 py-0.5 text-xs font-semibold text-status-danger">
          -{percentOff}%
        </span>
      </div>
    )
  }

  return <span className={`font-mono text-neutral-text ${priceClass}`}>{formatPrice(product.price)}</span>
}
