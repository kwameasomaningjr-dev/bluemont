import { useCurrencyStore } from '../../store/currencyStore'

const sizeStyles = {
  card: 'text-base font-semibold',
  table: 'text-sm font-medium',
  hero: 'text-2xl font-bold',
} as const

interface GhsPriceTagProps {
  price: number // Base price in EUR
  size?: keyof typeof sizeStyles
  className?: string
}

export function GhsPriceTag({ price, size = 'card', className = '' }: GhsPriceTagProps) {
  const formatGHS = useCurrencyStore((state) => state.formatGHS)
  return (
    <span className={`font-mono text-neutral-text ${sizeStyles[size]} ${className}`}>
      {formatGHS(price)}
    </span>
  )
}
