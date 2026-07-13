import { Link } from 'react-router-dom'
import { AtSign, Globe, Mail, MapPin, Phone, Send } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import { categories } from '../../data/categories'

const brandLinks = [
  { label: 'Donaldson Filtration', to: ROUTES.brand('donaldson') },
  { label: 'YUKO Lubricants', to: ROUTES.brand('yuko') },
  { label: 'Eurocar Batteries', to: ROUTES.brand('eurocar') },
]
const featuredCategories = categories.filter((category) => category.brand === 'spare-parts')

export default function Footer() {
  return (
    <footer className="border-t border-neutral-border bg-neutral-surface">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        <div>
          <Link to={ROUTES.home} className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-14 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-2xl font-bold tracking-tight text-brand-donaldson">
                Bluemont
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-muted">
                Engineering Services
              </span>
            </div>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-neutral-muted">
            Genuine filtration, lubricants and batteries for Ghana&rsquo;s vehicles and industry —
            authorised distributor of Donaldson, YUKO and Eurocar.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-neutral-text">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand-donaldson" />
            Tema, Community 25, Accra, Ghana
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-neutral-text">Brands &amp; Categories</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {brandLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-neutral-muted hover:text-brand-donaldson">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-wide text-neutral-text">Divisions</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to={ROUTES.brand('spare-parts')} className="text-neutral-muted hover:text-brand-donaldson">
                Genuine Spare Parts
              </Link>
            </li>
            {featuredCategories.map((category) => (
              <li key={category.slug}>
                <Link to={`${ROUTES.products}?category=${category.slug}`} className="text-neutral-muted hover:text-brand-donaldson">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-neutral-text">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-muted">
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-brand-donaldson" />
              <a href="tel:+233242561798" className="hover:text-brand-donaldson">+233 24 256 1798</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-brand-donaldson" />
              <a href="mailto:hello@bluemontgh.com" className="hover:text-brand-donaldson">hello@bluemontgh.com</a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-neutral-border p-2 text-neutral-muted hover:border-brand-donaldson hover:text-brand-donaldson">
              <Globe size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-neutral-border p-2 text-neutral-muted hover:border-brand-donaldson hover:text-brand-donaldson">
              <AtSign size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="rounded-full border border-neutral-border p-2 text-neutral-muted hover:border-brand-donaldson hover:text-brand-donaldson">
              <Send size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-border bg-status-success/10 py-2">
        <p className="mx-auto max-w-content px-4 text-center text-xs font-medium text-status-success lg:px-6">
          🇬🇭 Eurocar Batteries are proudly made in Ghana — every unit backed by a nationwide warranty.
        </p>
      </div>

      <div className="border-t border-neutral-border py-4">
        <div className="mx-auto max-w-content px-4 flex flex-col sm:flex-row items-center justify-between gap-2 lg:px-6">
          <p className="text-xs text-neutral-muted order-2 sm:order-1">
            © {new Date().getFullYear()} Bluemont Engineering Services. All rights reserved.
          </p>
          <Link to={ROUTES.admin} className="text-[10px] text-neutral-border hover:text-neutral-muted order-1 sm:order-2 transition-colors uppercase tracking-widest font-bold">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  )
}
