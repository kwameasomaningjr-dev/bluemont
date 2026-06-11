import { Award } from 'lucide-react'
import { HomepageHero } from '../components/marketing/HomepageHero'
import { BrandShowcaseCards } from '../components/marketing/BrandShowcaseCards'
import { TrustBadges } from '../components/marketing/TrustBadges'
import { FeaturedProducts } from '../components/marketing/FeaturedProducts'
import { SectionHeading } from '../components/utility/SectionHeading'

export default function HomePage() {
  return (
    <div>
      <HomepageHero />

      <section className="mx-auto max-w-content px-4 py-14 lg:px-6">
        <SectionHeading label="Our Brands" heading="Three Trusted Brands, One Supplier" />
        <div className="mt-6">
          <BrandShowcaseCards />
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-6 lg:px-6">
        <FeaturedProducts />
      </section>

      <section className="mx-auto max-w-content px-4 py-14 lg:px-6">
        <SectionHeading label="Why Bluemont" heading="Built on Trust &amp; Genuine Parts" />
        <div className="mt-6">
          <TrustBadges />
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pb-16 lg:px-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-status-success/30 bg-status-success/10 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="rounded-xl bg-status-success/15 p-3 text-status-success">
              <Award size={28} />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-neutral-text">🇬🇭 Proudly Made in Ghana</h3>
              <p className="mt-1 max-w-xl text-sm text-neutral-muted">
                Eurocar Batteries are manufactured locally in Tema, supporting Ghanaian jobs and giving you faster
                access to genuine, climate-tested batteries — every unit backed by a comprehensive 1-year warranty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
