import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useCurrencyStore } from '../../store/currencyStore'
import { ROUTES } from '../../constants/routes'
import { BrandBadge } from '../product/BrandBadge'

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.subtotal())
  const formatGHS = useCurrencyStore((s) => s.formatGHS)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-neutral-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-border px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-neutral-text">Your Cart</h2>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-md p-2 text-neutral-text hover:bg-neutral-bg"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingCart size={40} className="text-neutral-muted" />
                <p className="text-sm font-medium text-neutral-text">Your cart is empty</p>
                <p className="text-sm text-neutral-muted">Browse our products and add items to your cart.</p>
                <Link
                  to={ROUTES.products}
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-brand-donaldson px-5 py-2 text-sm font-semibold text-white hover:bg-brand-donaldson/90"
                >
                  Shop Products
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-neutral-border overflow-y-auto px-5">
                  {items.map(({ product, qty }) => (
                    <li key={product.id} className="flex gap-3 py-4">
                      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-neutral-bg p-2 text-center border border-neutral-border">
                        <span className="font-display text-[10px] font-bold text-neutral-text leading-tight truncate w-full">
                          {product.name.split(' ').slice(-1)}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-muted mt-1 truncate w-full">
                          {product.sku}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <BrandBadge brand={product.brand} />
                            <p className="mt-1 text-sm font-medium text-neutral-text">{product.name}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="text-xs font-medium text-neutral-muted hover:text-status-danger"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-neutral-border px-2 py-1">
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, qty - 1)}
                              className="rounded-full p-1 text-neutral-text hover:bg-neutral-bg"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-5 text-center text-sm font-medium">{qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, qty + 1)}
                              className="rounded-full p-1 text-neutral-text hover:bg-neutral-bg"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-mono text-sm font-semibold text-neutral-text">
                            {formatGHS(product.price * qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-neutral-border px-5 py-5">
                  <div className="flex items-center justify-between text-sm text-neutral-muted">
                    <span>Subtotal</span>
                    <span className="font-mono text-base font-semibold text-neutral-text">{formatGHS(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-muted">Shipping calculated at checkout.</p>
                  <Link
                    to={ROUTES.checkout}
                    onClick={closeCart}
                    className="mt-4 block w-full rounded-full bg-brand-donaldson px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-donaldson/90"
                  >
                    Go to Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
