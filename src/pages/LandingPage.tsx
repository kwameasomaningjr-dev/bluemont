import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../constants/routes'
import { SectionHeading } from '../components/utility/SectionHeading'
import { brands } from '../data/brands'

const headlineWords = ["Expert", "Engineering", "Solutions", "for", "Ghana's", "Heavy", "Industry"]
const featuredBrand = brands.find((brand) => brand.slug === 'donaldson')!
const secondaryBrands = brands.filter((brand) => brand.slug !== 'donaldson')

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-bg">
      {/* Navbar Minimal */}
      <nav className="border-b border-neutral-border bg-neutral-surface/95 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 lg:px-6">
          <Link to={ROUTES.home} className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-10 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold tracking-tight text-brand-donaldson">
                Bluemont
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-muted">
                Engineering Services
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link to={ROUTES.login} className="text-sm font-semibold text-neutral-text hover:text-brand-donaldson transition">
              Sign In
            </Link>
            <Link 
              to={ROUTES.register} 
              className="rounded-full bg-brand-donaldson px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1F38] via-[#1A3A6B] to-[#264E8C] text-white py-24 sm:py-32">
          <div className="relative mx-auto max-w-content px-4 lg:px-6 text-center">
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
              {headlineWords.join(' ')}
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-white/80 sm:text-xl">
              Your trusted partner for genuine Donaldson filtration, YUKO lubricants, and Eurocar batteries. 
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to={ROUTES.register}
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-brand-donaldson transition hover:bg-white/90 shadow-lg"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="mx-auto max-w-content px-4 py-20 lg:px-6">
          <SectionHeading label="Our Brands" heading="Only the Best for Your Equipment" />
          <div className="mt-10">
            <div className="flex flex-col gap-8">
              {featuredBrand && (
                <div className="relative overflow-hidden rounded-2xl border-2 border-brand-donaldson/20 bg-white p-1 shadow-md lg:p-2">
                  <div className="flex flex-col lg:flex-row lg:items-center p-6 lg:p-10">
                    <div className="flex-1">
                      <h3 className="font-display text-3xl font-bold text-neutral-text">{featuredBrand.name}</h3>
                      <p className="mt-3 text-lg text-neutral-muted">{featuredBrand.description}</p>
                      <Link to={ROUTES.register} className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-donaldson px-8 py-3.5 text-sm font-bold text-white shadow-lg">
                        Shop Genuine Parts <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {secondaryBrands.map((brand) => (
                  <div key={brand.slug} className="rounded-2xl border border-neutral-border bg-neutral-surface p-6">
                    <h4 className="font-display text-lg font-bold text-neutral-text">{brand.name}</h4>
                    <p className="mt-1 text-sm text-neutral-muted">{brand.tagline}</p>
                    <Link to={ROUTES.register} className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-brand-donaldson">
                      View Catalog &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
