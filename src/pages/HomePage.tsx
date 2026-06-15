import { Award, Zap, ArrowRight } from 'lucide-react'
import { HomepageHero } from '../components/marketing/HomepageHero'
import { BrandShowcaseCards } from '../components/marketing/BrandShowcaseCards'
import { TrustBadges } from '../components/marketing/TrustBadges'
import { FeaturedProducts } from '../components/marketing/FeaturedProducts'
import { SectionHeading } from '../components/utility/SectionHeading'
import { ROUTES } from '../constants/routes'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <HomepageHero />

      <section className="mx-auto max-w-content px-4 py-14 lg:px-6">
        <SectionHeading label="Premium Brands" heading="Trusted Solutions, Global Excellence" />
        <div className="mt-6">
          <BrandShowcaseCards />
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-6 lg:px-6">
        <FeaturedProducts />
      </section>

      {/* Genuine Spare Parts Division */}
      <section className="bg-neutral-surface border-y border-neutral-border">
        <div className="mx-auto max-w-content px-4 py-20 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading 
                label="Spare Parts Division" 
                heading="Genuine Spare Parts for Toyota, Mitsubishi & Howo"
                subtext="From high-precision fuel injection pumps to complete diesel engines and hydraulic systems. We supply only authentic parts to ensure the longevity of your fleet."
              />
              <div className="mt-8 flex flex-wrap gap-4">
                 <Link 
                  to={ROUTES.products} 
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-text px-6 py-3 font-bold text-white transition hover:bg-neutral-text/90"
                >
                  Request a Quote <ArrowRight size={18} />
                </Link>
                <Link 
                  to={ROUTES.about} 
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-border bg-white px-6 py-3 font-bold text-neutral-text transition hover:bg-neutral-bg"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-border flex flex-col items-center text-center">
                  <Zap className="text-brand-yuko mb-4" size={32} />
                  <h4 className="font-bold text-neutral-text">Bulk Supply</h4>
                  <p className="text-xs text-neutral-muted mt-1">Industrial scale procurement</p>
               </div>
               <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-border flex flex-col items-center text-center">
                  <Award className="text-brand-donaldson mb-4" size={32} />
                  <h4 className="font-bold text-neutral-text">100% Genuine</h4>
                  <p className="text-xs text-neutral-muted mt-1">Direct from manufacturers</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-14 lg:px-6">
        <SectionHeading label="Why Bluemont" heading="Built on Trust & Genuine Parts" />
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
