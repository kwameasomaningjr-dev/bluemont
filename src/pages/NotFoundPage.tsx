import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { ROUTES } from '../constants/routes'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center lg:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-donaldson/10 text-brand-donaldson">
        <Compass size={32} />
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold text-neutral-text">404</h1>
      <p className="mt-2 text-lg font-semibold text-neutral-text">Page Not Found</p>
      <p className="mt-2 text-sm text-neutral-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to={ROUTES.home}
          className="inline-flex items-center justify-center rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90"
        >
          Back to Home
        </Link>
        <Link
          to={ROUTES.products}
          className="inline-flex items-center justify-center rounded-full border border-neutral-border px-6 py-3 text-sm font-semibold text-neutral-text transition hover:border-neutral-text/40"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}
