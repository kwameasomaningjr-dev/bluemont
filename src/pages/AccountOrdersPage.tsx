import { Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { mockOrders } from '../data/mockOrders'
import { ROUTES } from '../constants/routes'
import { formatGHS } from '../lib/utils'
import { SectionHeading } from '../components/utility/SectionHeading'
import { BrandBadge } from '../components/product/BrandBadge'

const STATUS_STYLES: Record<string, string> = {
  delivered: 'bg-status-success/10 text-status-success',
  processing: 'bg-status-warning/10 text-status-warning',
  pending: 'bg-neutral-muted/10 text-neutral-muted',
}

export default function AccountOrdersPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.login} replace />
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
      <Link to={ROUTES.account} className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-muted hover:text-neutral-text">
        <ArrowLeft size={16} />
        Back to account
      </Link>

      <div className="mt-4">
        <SectionHeading label="My Account" heading="Order History" subtext={`${mockOrders.length} orders placed`} />
      </div>

      <div className="mt-8 space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-neutral-border bg-neutral-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border pb-4">
              <div>
                <p className="font-display text-base font-bold text-neutral-text">{order.id}</p>
                <p className="text-xs text-neutral-muted">Placed on {order.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}>
                {order.status}
              </span>
            </div>

            <ul className="mt-4 space-y-3">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2.5">
                    <BrandBadge brand={item.brand} />
                    <span className="text-neutral-text">{item.name}</span>
                    <span className="text-neutral-muted">&times; {item.qty}</span>
                  </div>
                  <span className="font-semibold text-neutral-text">{formatGHS(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between border-t border-neutral-border pt-4 font-display text-base font-bold text-neutral-text">
              <span>Order Total</span>
              <span>{formatGHS(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
