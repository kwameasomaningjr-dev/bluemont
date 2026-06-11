import type { FilterState } from '../../types'

const sortOptions: { value: FilterState['sort']; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' },
]

interface SortDropdownProps {
  value: FilterState['sort']
  onChange: (value: FilterState['sort']) => void
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-muted">
      Sort by
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FilterState['sort'])}
        className="rounded-full border border-neutral-border bg-neutral-surface px-3 py-1.5 text-sm font-medium text-neutral-text outline-none focus:border-brand-donaldson"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
