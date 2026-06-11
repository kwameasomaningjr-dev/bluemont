import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ROUTES } from '../../constants/routes'

interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: Crumb[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const crumbs: Crumb[] = [{ label: 'Home', to: ROUTES.home }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-muted">
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb.label}>
          {index > 0 && <ChevronRight size={14} className="text-neutral-muted" />}
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-brand-donaldson">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-neutral-text">{crumb.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
