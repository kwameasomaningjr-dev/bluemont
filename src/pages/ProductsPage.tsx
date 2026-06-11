import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { products } from '../data/products'
import type { BrandSlug, FilterState } from '../types'
import { SectionHeading } from '../components/utility/SectionHeading'
import { ProductGrid } from '../components/product/ProductGrid'
import { FilterSidebar } from '../components/product/FilterSidebar'
import { FilterChips } from '../components/product/FilterChips'
import { SortDropdown } from '../components/product/SortDropdown'
import { Pagination } from '../components/utility/Pagination'

const PAGE_SIZE = 12
const VALID_BRANDS: BrandSlug[] = ['donaldson', 'yuko', 'eurocar']
const VALID_SORTS: FilterState['sort'][] = ['newest', 'price_asc', 'price_desc', 'popularity']

function filtersFromParams(params: URLSearchParams): FilterState {
  const brands = (params.get('brand')?.split(',').filter(Boolean) ?? []).filter((b): b is BrandSlug =>
    VALID_BRANDS.includes(b as BrandSlug),
  )
  const cats = params.get('category')?.split(',').filter(Boolean) ?? []
  const sortParam = params.get('sort')
  const sort = VALID_SORTS.includes(sortParam as FilterState['sort']) ? (sortParam as FilterState['sort']) : 'newest'
  const priceMax = Number(params.get('priceMax') ?? 5000)

  return {
    brands,
    categories: cats,
    priceMin: 0,
    priceMax: Number.isFinite(priceMax) ? priceMax : 5000,
    inStockOnly: params.get('inStock') === '1',
    sort,
  }
}

function paramsFromFilters(filters: FilterState, page: number): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.brands.length) params.set('brand', filters.brands.join(','))
  if (filters.categories.length) params.set('category', filters.categories.join(','))
  if (filters.priceMax < 5000) params.set('priceMax', String(filters.priceMax))
  if (filters.inStockOnly) params.set('inStock', '1')
  if (filters.sort !== 'newest') params.set('sort', filters.sort)
  if (page > 1) params.set('page', String(page))
  return params
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams])
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))

  const updateFilters = (next: FilterState, nextPage = 1) => {
    setSearchParams(paramsFromFilters(next, nextPage))
  }

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (p.price > filters.priceMax) return false
      if (filters.inStockOnly && p.stockStatus === 'out_of_stock') return false
      return true
    })

    switch (filters.sort) {
      case 'price_asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'popularity':
        result = [...result].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
        break
      default:
        result = [...result].reverse()
    }

    return result
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  useEffect(() => {
    if (page > totalPages) {
      setSearchParams(paramsFromFilters(filters, totalPages), { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages])

  return (
    <div className="mx-auto max-w-content px-4 py-10 lg:px-6">
      <SectionHeading label="Catalogue" heading="All Products" subtext="Browse genuine filtration, lubricants and batteries." />

      <div className="mt-8 flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-border px-4 py-2 text-sm font-semibold text-neutral-text"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
        <SortDropdown value={filters.sort} onChange={(sort) => updateFilters({ ...filters, sort }, safePage)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={(next) => updateFilters(next)} />
        </aside>

        <div>
          <div className="hidden items-center justify-between gap-4 lg:flex">
            <p className="text-sm text-neutral-muted">
              Showing <span className="font-semibold text-neutral-text">{paged.length}</span> of{' '}
              <span className="font-semibold text-neutral-text">{filtered.length}</span> products
            </p>
            <SortDropdown value={filters.sort} onChange={(sort) => updateFilters({ ...filters, sort }, safePage)} />
          </div>

          <p className="mt-3 text-sm text-neutral-muted lg:hidden">
            Showing <span className="font-semibold text-neutral-text">{paged.length}</span> of{' '}
            <span className="font-semibold text-neutral-text">{filtered.length}</span> products
          </p>

          <div className="mt-4">
            <FilterChips filters={filters} onChange={(next) => updateFilters(next)} />
          </div>

          <div className="mt-6">
            <ProductGrid products={paged} emptyMessage="No products match your filters — try widening your search." />
          </div>

          <Pagination page={safePage} totalPages={totalPages} onChange={(p) => updateFilters(filters, p)} />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-neutral-surface p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-neutral-text">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 text-neutral-muted hover:bg-neutral-bg"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6">
              <FilterSidebar filters={filters} onChange={(next) => updateFilters(next)} />
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full rounded-full bg-brand-donaldson px-5 py-3 text-sm font-semibold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
