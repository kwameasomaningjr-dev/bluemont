import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2, MessageCircle, Package } from 'lucide-react'
import { ROUTES } from '../constants/routes'
import { whatsappLink } from '../constants/brands'

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order') ?? `BLU-${new Date().getFullYear()}-0001`

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center lg:px-6">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-status-success/10 text-status-success">
        <CheckCircle2 size={36} />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-neutral-text sm:text-3xl">Order Placed Successfully!</h1>
      <p className="mt-3 text-sm text-neutral-muted sm:text-base">
        Thank you for your order. We&rsquo;ve received it and our team will be in touch shortly to confirm delivery
        details.
      </p>

      <div className="mt-8 rounded-2xl border border-neutral-border bg-neutral-surface p-6">
        <p className="text-xs uppercase tracking-wide text-neutral-muted">Order Reference</p>
        <p className="mt-1 font-display text-xl font-bold text-brand-donaldson">{orderId}</p>
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-muted">
          <Package size={16} />
          A confirmation has been sent to your email and you can track this order from your account.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to={ROUTES.accountOrders}
          className="inline-flex items-center justify-center rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90"
        >
          View My Orders
        </Link>
        <Link
          to={ROUTES.products}
          className="inline-flex items-center justify-center rounded-full border border-neutral-border px-6 py-3 text-sm font-semibold text-neutral-text transition hover:border-neutral-text/40"
        >
          Continue Shopping
        </Link>
      </div>

      <a
        href={whatsappLink(`Hi Bluemont, I'd like to follow up on my order ${orderId}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-status-success hover:underline"
      >
        <MessageCircle size={16} />
        Chat with us on WhatsApp about this order
      </a>
    </div>
  )
}
