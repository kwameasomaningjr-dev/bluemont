import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { BrandShowcaseCards } from '../components/marketing/BrandShowcaseCards'
import { TrustBadges } from '../components/marketing/TrustBadges'
import { SectionHeading } from '../components/utility/SectionHeading'

const headlineWords = ["Expert", "Engineering", "Solutions", "for", "Ghana's", "Heavy", "Industry"]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const word = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

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
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0, transparent 35%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.12) 0, transparent 40%)',
            }}
          />
          <div className="relative mx-auto max-w-content px-4 lg:px-6 text-center">
            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="font-display text-4xl font-bold leading-tight sm:text-6xl"
            >
              {headlineWords.map((w, i) => (
                <motion.span key={i} variants={word} className="mr-3 inline-block">
                  {w}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-6 mx-auto max-w-2xl text-lg text-white/80 sm:text-xl"
            >
              Your trusted partner for genuine Donaldson filtration, YUKO lubricants, and Eurocar batteries. 
              We provide the critical components that keep your fleet moving and your machinery running efficiently.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link
                to={ROUTES.register}
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-brand-donaldson transition hover:bg-white/90 shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                to={ROUTES.login}
                className="rounded-full border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                Sign In to Shop
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="mx-auto max-w-content px-4 py-20 lg:px-6">
          <SectionHeading label="Our Brands" heading="Only the Best for Your Equipment" />
          <div className="mt-10">
            <BrandShowcaseCards />
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="bg-neutral-surface py-20">
          <div className="mx-auto max-w-content px-4 lg:px-6">
            <SectionHeading label="Why Bluemont" heading="Reliability You Can Count On" />
            <div className="mt-10">
              <TrustBadges />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-content px-4 py-24 lg:px-6 text-center">
          <div className="rounded-3xl bg-brand-donaldson px-8 py-16 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to power your operations?</h2>
              <p className="mt-4 mx-auto max-w-xl text-lg text-white/80">
                Join hundreds of businesses in Ghana who trust Bluemont for their engineering and maintenance needs.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to={ROUTES.register}
                  className="rounded-full bg-white px-8 py-4 text-base font-bold text-brand-donaldson transition hover:bg-white/90 shadow-lg"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-yuko/20 rounded-full blur-3xl" />
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-border bg-neutral-surface py-12">
        <div className="mx-auto max-w-content px-4 lg:px-6 text-center">
          <p className="text-sm text-neutral-muted">
            &copy; {new Date().getFullYear()} Bluemont Engineering Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
