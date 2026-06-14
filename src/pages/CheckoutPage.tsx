import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronLeft } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useCurrencyStore } from '../store/currencyStore'
import { GHANA_REGIONS } from '../constants/ghana'
import { ROUTES } from '../constants/routes'
import { SectionHeading } from '../components/utility/SectionHeading'

type Step = 1 | 2 | 3

interface DeliveryInfo {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  region: string
  notes: string
}

const STEP_LABELS = ['Delivery Details', 'Review Order', 'Payment']

const emptyInfo: DeliveryInfo = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  region: GHANA_REGIONS[0],
  notes: '',
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore((state) => state.subtotal())
  const clearCart = useCartStore((state) => state.clearCart)
  const formatGHS = useCurrencyStore((state) => state.formatGHS)

  const [step, setStep] = useState<Step>(1)
  const [info, setInfo] = useState<DeliveryInfo>(emptyInfo)
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'cash_on_delivery'>('mobile_money')
  const [submitting, setSubmitting] = useState(false)

  const deliveryFee = subtotal > 0 ? 3 : 0
  const total = subtotal + deliveryFee

  if (!items.length && !submitting) {
    navigate(ROUTES.cart, { replace: true })
    return null
  }

  const update = (field: keyof DeliveryInfo) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setInfo((prev) => ({ ...prev, [field]: e.target.value }))

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePlaceOrder = () => {
    setSubmitting(true)
    const orderId = `BLU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    setTimeout(() => {
      clearCart()
      navigate(`${ROUTES.orderConfirmation}?order=${orderId}`, { replace: true })
    }, 900)
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
      <SectionHeading label="Checkout" heading="Complete Your Order" />

      <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        {STEP_LABELS.map((label, i) => {
          const num = (i + 1) as Step
          const active = step === num
          const complete = step > num
          return (
            <li key={label} className="flex items-center gap-2 whitespace-nowrap">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  complete
                    ? 'bg-status-success text-white'
                    : active
                      ? 'bg-brand-donaldson text-white'
                      : 'border border-neutral-border text-neutral-muted'
                }`}
              >
                {complete ? <Check size={14} /> : num}
              </span>
              <span className={active || complete ? 'font-semibold text-neutral-text' : 'text-neutral-muted'}>{label}</span>
              {i < STEP_LABELS.length - 1 && <span className="mx-1 hidden h-px w-8 bg-neutral-border sm:block sm:w-16" />}
            </li>
          )
        })}
      </ol>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-neutral-border bg-neutral-surface p-6">
          {step === 1 && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <h2 className="font-display text-lg font-bold text-neutral-text">Delivery Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" required value={info.fullName} onChange={update('fullName')} />
                <Field label="Phone Number" required value={info.phone} onChange={update('phone')} placeholder="+233 24 000 0000" />
              </div>
              <Field label="Email Address" type="email" required value={info.email} onChange={update('email')} />
              <Field label="Delivery Address" required value={info.address} onChange={update('address')} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="City / Town" required value={info.city} onChange={update('city')} />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-text">Region</label>
                  <select
                    value={info.region}
                    onChange={update('region')}
                    className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                  >
                    {GHANA_REGIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-text">Order Notes (optional)</label>
                <textarea
                  value={info.notes}
                  onChange={update('notes')}
                  rows={3}
                  className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90 sm:w-auto"
              >
                Continue to Review
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-bold text-neutral-text">Review Your Order</h2>

              <div>
                <h3 className="text-sm font-semibold text-neutral-text">Delivery to</h3>
                <p className="mt-1 text-sm text-neutral-muted">
                  {info.fullName} &middot; {info.phone}
                  <br />
                  {info.address}, {info.city}, {info.region}
                  <br />
                  {info.email}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-text">Items</h3>
                <ul className="mt-2 divide-y divide-neutral-border">
                  {items.map(({ product, qty }) => (
                    <li key={product.id} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-neutral-text">
                        {product.name} <span className="text-neutral-muted">&times; {qty}</span>
                      </span>
                      <span className="font-semibold text-neutral-text">{formatGHS(product.price * qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-text">Payment Method</h3>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2.5 rounded-xl border border-neutral-border px-4 py-3 text-sm">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'mobile_money'}
                      onChange={() => setPaymentMethod('mobile_money')}
                      className="h-4 w-4 text-brand-donaldson focus:ring-brand-donaldson"
                    />
                    Mobile Money (MTN, Vodafone, AirtelTigo)
                  </label>
                  <label className="flex items-center gap-2.5 rounded-xl border border-neutral-border px-4 py-3 text-sm">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash_on_delivery'}
                      onChange={() => setPaymentMethod('cash_on_delivery')}
                      className="h-4 w-4 text-brand-donaldson focus:ring-brand-donaldson"
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-border px-6 py-3 text-sm font-semibold text-neutral-text transition hover:border-neutral-text/40"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-bold text-neutral-text">Confirm &amp; Pay</h2>
              <p className="text-sm text-neutral-muted">
                This is a demo storefront — no real payment will be processed. Click below to simulate placing your
                order via {paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Cash on Delivery'}.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-border px-6 py-3 text-sm font-semibold text-neutral-text transition hover:border-neutral-text/40 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="flex-1 rounded-full bg-status-success px-6 py-3 text-sm font-semibold text-white transition hover:bg-status-success/90 disabled:opacity-60"
                >
                  {submitting ? 'Placing Order…' : `Place Order — ${formatGHS(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-border bg-neutral-surface p-6">
          <h2 className="font-display text-lg font-bold text-neutral-text">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm text-neutral-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-text">{formatGHS(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-semibold text-neutral-text">{formatGHS(deliveryFee)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-border pt-4 font-display text-base font-bold text-neutral-text">
            <span>Total</span>
            <span>{formatGHS(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
}

function Field({ label, value, onChange, type = 'text', required, placeholder }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-text">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
      />
    </div>
  )
}
