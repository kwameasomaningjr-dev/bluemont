import type { LucideIcon } from 'lucide-react'
import { PackageSearch } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon = PackageSearch, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-border bg-neutral-surface px-6 py-16 text-center">
      <Icon size={40} className="text-neutral-muted" />
      <h3 className="font-display text-lg font-semibold text-neutral-text">{title}</h3>
      {description && <p className="max-w-sm text-sm text-neutral-muted">{description}</p>}
      {action}
    </div>
  )
}
