import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useProductStore } from '../../store/productStore'
import { brands } from '../../data/brands'
import { ROUTES } from '../../constants/routes'

export function BrandShowcaseCards() {
  const products = useProductStore((state) => state.products)
  const donaldson = brands.find(b => b.slug === 'donaldson')!
  const others = brands.filter(b => b.slug !== 'donaldson')

  return (
    <div className="flex flex-col gap-8">
      {/* Featured Donaldson Section */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-brand-donaldson/20 bg-white p-1 shadow-md lg:p-2">
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-donaldson/5" />
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex-1 p-6 lg:p-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-full bg-brand-donaldson/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-donaldson">
                Premium Brand
              </span>
              <div className="flex items-center gap-1.5 text-status-success font-semibold text-xs">
                <CheckCircle2 size={14} /> Authorized Distributor
              </div>
            </div>
            
            <h3 className="font-display text-3xl font-bold text-neutral-text lg:text-4xl">
              {donaldson.name}
            </h3>
            <p className="mt-3 text-lg text-neutral-muted lg:max-w-xl">
              {donaldson.description}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={ROUTES.brand(donaldson.slug)}
                className="inline-flex items-center gap-2 rounded-full bg-brand-donaldson px-8 py-3.5 text-sm font-bold text-white transition hover:bg-brand-donaldson/90 shadow-lg shadow-brand-donaldson/20"
              >
                Shop Genuine Parts <ArrowRight size={18} />
              </Link>
              <Link
                to={ROUTES.quote}
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-donaldson/20 px-8 py-3.5 text-sm font-bold text-brand-donaldson transition hover:bg-brand-donaldson/5"
              >
                Request a Bulk Quote
              </Link>
            </div>
            
            <div className="mt-6 flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-neutral-muted/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-status-success" /> Genuine Guarantee
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-status-success" /> Factory Warranty
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-status-success" /> Expert Support
              </div>
            </div>
          </div>
          
          <div className="relative h-64 lg:h-auto lg:w-1/3 p-6 lg:p-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-bg opacity-40 rounded-xl m-6 lg:m-10" />
            <img 
              src="/donaldson.png" 
              alt="Donaldson Filtration" 
              className="relative z-10 max-h-full max-w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Secondary Brands Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {others.map((brand) => {
          const count = products.filter((p) => p.brand === brand.slug).length
          return (
            <div
              key={brand.slug}
              className="group flex items-start gap-6 rounded-2xl border border-neutral-border bg-neutral-surface p-6 transition-all hover:border-neutral-muted/30 hover:shadow-md"
            >
              <div 
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl p-2"
                style={{ backgroundColor: `${brand.colorPrimary}10` }}
              >
                <img src={brand.heroImage} alt="" className="h-full w-full object-contain" />
              </div>
              
              <div className="flex flex-col">
                <h4 className="font-display text-lg font-bold text-neutral-text group-hover:text-neutral-text/80 transition-colors">
                  {brand.name}
                </h4>
                <p className="mt-1 text-sm text-neutral-muted leading-relaxed">
                  {brand.tagline}
                </p>
                <Link
                  to={ROUTES.brand(brand.slug)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-all hover:gap-2"
                  style={{ color: brand.colorPrimary }}
                >
                  View Catalog <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
