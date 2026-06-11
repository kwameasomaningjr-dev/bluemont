import type { StockStatus } from '../../types'

const stockStyles: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: 'In Stock', className: 'bg-status-success/10 text-status-success' },
  low_stock: { label: 'Low Stock', className: 'bg-status-warning/10 text-status-warning' },
  out_of_stock: { label: 'Out of Stock', className: 'bg-status-danger/10 text-status-danger' },
}

interface StockChipProps {
  status: StockStatus
}

export function StockChip({ status }: StockChipProps) {
  const { label, className } = stockStyles[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {label}
    </span>
  )
}
