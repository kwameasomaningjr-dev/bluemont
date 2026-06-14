import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { SectionHeading } from '../components/utility/SectionHeading'
import { ProductGrid } from '../components/product/ProductGrid'

export default function SearchPage() {
  const products = useProductStore((state) => state.products)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => {
    const term = initialQuery.trim().toLowerCase()
    if (!term) return []
    return products.filter((p) =>
      [p.name, p.shortDescription, p.sku, p.category, ...p.tags].join(' ').toLowerCase().includes(term),
    )
  }, [initialQuery, products])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSearchParams(query.trim() ? { q: query.trim() } : {})
  }

  return (
    <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
      <SectionHeading
        label="Search"
        heading={initialQuery ? `Search results for "${initialQuery}"` : 'Search Products'}
        subtext="Find filters, lubricants and batteries by name, SKU, or category."
      />

      <form onSubmit={handleSubmit} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-muted" />
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Search by product name, SKU, or category..."
            className="w-full rounded-full border border-neutral-border bg-neutral-surface py-3 pl-11 pr-4 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90 sm:w-auto"
        >
          Search
        </button>
      </form>

      {initialQuery && (
        <p className="mt-6 text-sm text-neutral-muted">
          {results.length} result{results.length === 1 ? '' : 's'} found
        </p>
      )}

      <div className="mt-6">
        {initialQuery ? (
          <ProductGrid products={results} emptyMessage={`No products matched "${initialQuery}". Try a different search term.`} />
        ) : (
          <p className="rounded-2xl border border-dashed border-neutral-border bg-neutral-surface px-6 py-16 text-center text-sm text-neutral-muted">
            Start typing to search our catalogue of genuine filtration, lubricants and batteries.
          </p>
        )}
      </div>
    </div>
  )
}
