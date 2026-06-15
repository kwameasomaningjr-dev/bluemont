import { Navigate, Link } from 'react-router-dom'
import { LogOut, Package, User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCurrencyStore } from '../store/currencyStore'
import { mockOrders } from '../data/mockOrders'
import { ROUTES } from '../constants/routes'
import { SectionHeading } from '../components/utility/SectionHeading'

const STATUS_STYLES: Record<string, string> = {
  delivered: 'bg-status-success/10 text-status-success',
  processing: 'bg-status-warning/10 text-status-warning',
  pending: 'bg-neutral-muted/10 text-neutral-muted',
}

export default function AccountPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const formatGHS = useCurrencyStore((state) => state.formatGHS)

  if (!isLoggedIn || !user) {
    return <Navigate to={ROUTES.login} replace />
  }

  const recentOrders = mockOrders.slice(0, 2)

  return (
    <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
      <SectionHeading label="My Account" heading={`Welcome back, ${user.name}`} />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-border bg-neutral-surface p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-donaldson/10 text-brand-donaldson">
              <User size={22} />
            </span>
            <h2 className="mt-4 font-display text-base font-bold text-neutral-text">{user.name}</h2>
            <p className="text-sm text-neutral-muted">{user.email}</p>
            <span className="mt-2 inline-flex rounded-full bg-neutral-bg px-3 py-1 text-xs font-semibold text-neutral-muted">
              {user.accountType}
            </span>
          </div>

          <nav className="space-y-1.5 rounded-2xl border border-neutral-border bg-neutral-surface p-2">
            <Link
              to={ROUTES.accountOrders}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-text transition hover:bg-neutral-bg"
            >
              <Package size={18} />
              My Orders
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-status-danger transition hover:bg-status-danger/5"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-neutral-text">Recent Orders</h2>
            <Link to={ROUTES.accountOrders} className="text-sm font-semibold text-brand-donaldson hover:underline">
              View all
            </Link>
          </div>

          {recentOrders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-neutral-border bg-neutral-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-bold text-neutral-text">{order.id}</p>
                  <p className="text-xs text-neutral-muted">Placed on {order.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-neutral-muted">
                {order.items.map((item) => (
                  <li key={item.productId} className="flex justify-between">
                    <span>
                      {item.name} &times; {item.qty}
                    </span>
                    <span className="text-neutral-text">{formatGHS(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-neutral-border pt-3 text-sm font-semibold text-neutral-text">
                <span>Total</span>
                <span>{formatGHS(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
