import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import type { Product } from '../../types'
import { useCartStore } from '../../store/cartStore'
import { useUIStore } from '../../store/uiStore'
import { ROUTES } from '../../constants/routes'

interface BuyOrQuoteCTAProps {
  product: Product
}

export function BuyOrQuoteCTA({ product }: BuyOrQuoteCTAProps) {
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const addToast = useUIStore((s) => s.addToast)
  const navigate = useNavigate()

  const disabled = product.stockStatus === 'out_of_stock'

  function handleAddToCart() {
    addItem(product, qty)
    addToast({ id: crypto.randomUUID(), type: 'success', message: `Added ${qty} × ${product.name} to cart` })
  }

  function handleRequestQuote() {
    navigate(`${ROUTES.quote}?product=${product.slug}`)
  }

  return (
    <div className="flex flex-col gap-4">
      {product.buyNowEnabled && (
        <div className="flex items-center gap-2 rounded-full border border-neutral-border px-3 py-2 self-start">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="rounded-full p-1.5 text-neutral-text hover:bg-neutral-bg"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center text-sm font-semibold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="rounded-full p-1.5 text-neutral-text hover:bg-neutral-bg"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {product.buyNowEnabled && (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={disabled}
            className="rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {disabled ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
        {product.quoteEnabled && (
          <button
            type="button"
            onClick={handleRequestQuote}
            className={
              product.buyNowEnabled
                ? 'rounded-full border border-brand-donaldson px-6 py-3 text-sm font-semibold text-brand-donaldson transition hover:bg-brand-donaldson/5'
                : 'rounded-full border border-brand-donaldson bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90'
            }
          >
            Request a Quote
          </button>
        )}
      </div>
    </div>
  )
}
