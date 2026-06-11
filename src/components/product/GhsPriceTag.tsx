import { formatGHS } from '../../lib/utils'

const sizeStyles = {
  card: 'text-base font-semibold',
  table: 'text-sm font-medium',
  hero: 'text-2xl font-bold',
} as const

interface GhsPriceTagProps {
  price: number
  size?: keyof typeof sizeStyles
  className?: string
}

export function GhsPriceTag({ price, size = 'card', className = '' }: GhsPriceTagProps) {
  return <span className={`font-mono text-neutral-text ${sizeStyles[size]} ${className}`}>{formatGHS(price)}</span>
}
