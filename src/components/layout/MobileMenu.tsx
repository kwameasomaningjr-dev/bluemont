import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { ROUTES } from '../../constants/routes'
import { whatsappLink } from '../../constants/brands'

const links = [
  { label: 'All Products', to: ROUTES.products },
  { label: 'Donaldson Filtration', to: ROUTES.brand('donaldson') },
  { label: 'YUKO Lubricants', to: ROUTES.brand('yuko') },
  { label: 'Eurocar Batteries', to: ROUTES.brand('eurocar') },
  { label: 'Request a Quote', to: ROUTES.quote },
  { label: 'About', to: ROUTES.about },
  { label: 'Contact', to: ROUTES.contact },
]

export default function MobileMenu() {
  const open = useUIStore((s) => s.mobileMenuOpen)
  const close = useUIStore((s) => s.closeMobileMenu)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col bg-neutral-surface lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-neutral-border px-4 py-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="h-9 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold text-brand-donaldson">Bluemont</span>
                <span className="text-[9px] font-semibold uppercase tracking-wide text-neutral-muted">Engineering Services</span>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              className="rounded-md p-2 text-neutral-text hover:bg-neutral-bg"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={close}
                className="rounded-lg px-3 py-3 text-base font-medium text-neutral-text hover:bg-neutral-bg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-neutral-border p-4">
            <a
              href={whatsappLink('Hello Bluemont, I would like to ask about your products.')}
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-full bg-status-success px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
