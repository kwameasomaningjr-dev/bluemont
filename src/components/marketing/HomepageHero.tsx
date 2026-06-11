import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const headlineWords = ["Ghana's", 'Home', 'for', 'Genuine', 'Filters,', 'Oils', '&', 'Batteries']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const word = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export function HomepageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1F38] via-[#1A3A6B] to-[#264E8C] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0, transparent 35%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.12) 0, transparent 40%)',
        }}
      />
      <div className="relative mx-auto max-w-content px-4 py-20 sm:py-28 lg:px-6">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-3xl font-bold leading-tight sm:text-5xl"
        >
          {headlineWords.map((w, i) => (
            <motion.span key={i} variants={word} className="mr-2 inline-block">
              {w}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-5 max-w-xl text-base text-white/80 sm:text-lg"
        >
          Authorised distributor of Donaldson filtration, YUKO lubricants and Eurocar batteries — genuine parts,
          fast nationwide delivery, and expert support for every engine and fleet.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            to={ROUTES.products}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-donaldson transition hover:bg-white/90"
          >
            Shop All Products
          </Link>
          <Link
            to={ROUTES.quote}
            className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Request a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
