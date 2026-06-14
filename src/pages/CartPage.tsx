import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useCurrencyStore } from '../store/currencyStore'
import { ROUTES } from '../constants/routes'
import { SectionHeading } from '../components/utility/SectionHeading'
import { EmptyState } from '../components/utility/EmptyState'
import { BrandBadge } from '../components/product/BrandBadge'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQty = useCartStore((state) => state.updateQty)
  const removeItem = useCartStore((state) => state.removeItem)
  const subtotal = useCartStore((state) => state.subtotal())
  const formatGHS = useCurrencyStore((state) => state.formatGHS)

  if (!items.length) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 lg:px-6">
        <SectionHeading label="Your Cart" heading="Shopping Cart" />
        <div className="mt-8">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Browse our catalogue of genuine filters, lubricants and batteries to get started."
            action={
              <Link
                to={ROUTES.products}
                className="mt-2 inline-flex items-center rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90"
              >
                Shop Products
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
      <SectionHeading label="Your Cart" heading="Shopping Cart" subtext={`${items.length} item${items.length > 1 ? 's' : ''} in your cart`} />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {items.map(({ product, qty }) => (
            <li
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-neutral-border bg-neutral-surface p-4 sm:flex-row sm:items-center"
            >
              <Link to={ROUTES.product(product.slug)} className="shrink-0">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-neutral-bg p-3 text-center border border-neutral-border">
                  <span className="font-display text-xs font-bold text-neutral-text leading-tight truncate w-full">
                    {product.name.split(' ').slice(-1)}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-muted mt-1 truncate w-full">
                    {product.sku}
                  </span>
                </div>
              </Link>

              <div className="min-w-0 flex-1">
                <BrandBadge brand={product.brand} />
                <Link to={ROUTES.product(product.slug)} className="mt-1 block truncate font-display text-base font-semibold text-neutral-text hover:underline">
                  {product.name}
                </Link>
                <p className="text-xs text-neutral-muted">SKU: {product.sku}</p>
                <p className="mt-1 font-semibold text-neutral-text">{formatGHS(product.price)}</p>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <div className="inline-flex items-center rounded-full border border-neutral-border">
                  <button
                    type="button"
                    onClick={() => updateQty(product.id, qty - 1)}
                    className="flex h-9 w-9 items-center justify-center text-neutral-muted transition hover:text-neutral-text"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-neutral-text">{qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(product.id, qty + 1)}
                    className="flex h-9 w-9 items-center justify-center text-neutral-muted transition hover:text-neutral-text"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-status-danger transition hover:underline"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>

              <p className="shrink-0 text-right font-display text-base font-bold text-neutral-text sm:w-28">
                {formatGHS(product.price * qty)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-neutral-border bg-neutral-surface p-6">
          <h2 className="font-display text-lg font-bold text-neutral-text">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm text-neutral-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-text">{formatGHS(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-semibold text-neutral-text">Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-border pt-4 font-display text-base font-bold text-neutral-text">
            <span>Total</span>
            <span>{formatGHS(subtotal)}</span>
          </div>
          <Link
            to={ROUTES.checkout}
            className="mt-6 block w-full rounded-full bg-brand-donaldson px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-donaldson/90"
          >
            Proceed to Checkout
          </Link>
          <Link
            to={ROUTES.products}
            className="mt-3 block w-full rounded-full border border-neutral-border px-6 py-3 text-center text-sm font-semibold text-neutral-text transition hover:border-neutral-text/40"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
