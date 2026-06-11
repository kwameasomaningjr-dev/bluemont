import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { products } from '../data/products'
import { whatsappLink } from '../constants/brands'
import { SectionHeading } from '../components/utility/SectionHeading'

interface QuoteForm {
  name: string
  company: string
  phone: string
  email: string
  productSlug: string
  quantity: string
  message: string
}

export default function QuotePage() {
  const [searchParams] = useSearchParams()
  const presetSlug = searchParams.get('product') ?? ''
  const presetProduct = useMemo(() => products.find((p) => p.slug === presetSlug), [presetSlug])

  const [form, setForm] = useState<QuoteForm>({
    name: '',
    company: '',
    phone: '',
    email: '',
    productSlug: presetProduct?.slug ?? '',
    quantity: '',
    message: presetProduct ? `I'd like a quote for ${presetProduct.name} (SKU: ${presetProduct.sku}).` : '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof QuoteForm) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const selectedProduct = products.find((p) => p.slug === form.productSlug)

  const whatsappMessage = [
    `Hi Bluemont, I'd like to request a quote.`,
    form.name && `Name: ${form.name}`,
    form.company && `Company: ${form.company}`,
    selectedProduct && `Product: ${selectedProduct.name} (SKU: ${selectedProduct.sku})`,
    form.quantity && `Quantity: ${form.quantity}`,
    form.message && `Notes: ${form.message}`,
  ]
    .filter(Boolean)
    .join('\n')

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center lg:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-status-success/10 text-status-success">
          <CheckCircle2 size={36} />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold text-neutral-text sm:text-3xl">Quote Request Received</h1>
        <p className="mt-3 text-sm text-neutral-muted sm:text-base">
          Thanks, {form.name || 'there'}! Our sales team will review your request and get back to you within one
          business day with pricing and availability.
        </p>
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-status-success px-6 py-3 text-sm font-semibold text-white transition hover:bg-status-success/90"
        >
          <MessageCircle size={16} />
          Or get a faster reply on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <SectionHeading
        label="Bulk &amp; Trade Pricing"
        heading="Request a Quote"
        subtext="Tell us what you need and our team will send you a tailored price for bulk or trade orders."
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-neutral-border bg-neutral-surface p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name" required value={form.name} onChange={update('name')} />
          <Field label="Company (optional)" value={form.company} onChange={update('company')} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Phone Number" required value={form.phone} onChange={update('phone')} placeholder="+233 24 000 0000" />
          <Field label="Email Address" type="email" required value={form.email} onChange={update('email')} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-text">Product</label>
          <select
            value={form.productSlug}
            onChange={update('productSlug')}
            className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
          >
            <option value="">Select a product (optional)</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name} — {product.sku}
              </option>
            ))}
          </select>
        </div>

        <Field label="Quantity Needed" value={form.quantity} onChange={update('quantity')} placeholder="e.g. 50 units" />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-text">Additional Details</label>
          <textarea
            value={form.message}
            onChange={update('message')}
            rows={4}
            className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90 sm:w-auto"
        >
          Submit Quote Request
        </button>
      </form>
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
