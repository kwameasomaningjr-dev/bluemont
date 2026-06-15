import type { Brand } from '../../types'

interface BrandHeroProps {
  brand: Brand
  productCount: number
}

export function BrandHero({ brand, productCount }: BrandHeroProps) {
  const heroImage = brand.heroImage || `/${brand.slug}.png`

  return (
    <section className="relative overflow-hidden text-white min-h-[400px] flex items-center bg-neutral-900">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={brand.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-content px-4 py-16 lg:px-6">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-lg font-bold backdrop-blur">
          {brand.name.charAt(0)}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{brand.name}</h1>
        <span className="mt-5 inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
          {productCount} products available
        </span>
      </div>
    </section>
  )
}
