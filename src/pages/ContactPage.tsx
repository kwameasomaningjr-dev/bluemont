import { useState, type ChangeEvent, type FormEvent } from 'react'
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { whatsappLink } from '../constants/brands'
import { SectionHeading } from '../components/utility/SectionHeading'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const emptyForm: ContactForm = { name: '', email: '', subject: '', message: '' }

const contactDetails = [
  { icon: MapPin, label: 'Visit Us', value: 'Tema, Community 25, Accra, Ghana' },
  { icon: Phone, label: 'Call Us', value: '+233 24 256 1798' },
  { icon: Mail, label: 'Email Us', value: 'hello@bluemontgh.com' },
]

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof ContactForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
      <SectionHeading
        label="Get In Touch"
        heading="Contact Bluemont Engineering Services"
        subtext="Have a question about a product, an order, or bulk pricing? We'd love to hear from you."
      />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {contactDetails.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-neutral-border bg-neutral-surface p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-donaldson/10 text-brand-donaldson">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-muted">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-neutral-text">{value}</p>
              </div>
            </div>
          ))}

          <a
            href={whatsappLink("Hi Bluemont, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-status-success/30 bg-status-success/10 p-5 text-status-success transition hover:bg-status-success/15"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-status-success/15">
              <MessageCircle size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold">Chat with us on WhatsApp</p>
              <p className="text-xs">Usually replies within minutes during business hours</p>
            </div>
          </a>
        </div>

        <div className="rounded-2xl border border-neutral-border bg-neutral-surface p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-status-success/10 text-status-success">
                <CheckCircle2 size={30} />
              </span>
              <h3 className="font-display text-lg font-bold text-neutral-text">Message Sent</h3>
              <p className="max-w-sm text-sm text-neutral-muted">
                Thanks for reaching out, {form.name || 'there'}! Our team will respond to your enquiry within one
                business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display text-lg font-bold text-neutral-text">Send Us a Message</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" required value={form.name} onChange={update('name')} />
                <Field label="Email Address" type="email" required value={form.email} onChange={update('email')} />
              </div>
              <Field label="Subject" required value={form.subject} onChange={update('subject')} />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-text">Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={update('message')}
                  rows={5}
                  className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90 sm:w-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
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
}

function Field({ label, value, onChange, type = 'text', required }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-text">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
      />
    </div>
  )
}
