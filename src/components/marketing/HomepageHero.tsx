import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import { brands } from '../../data/brands'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const word = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

const staticHeadline = ["Your", 'Premier', 'Partner', 'for', 'Genuine', 'Donaldson', 'Filtration']
const staticTagline = "Authorised distributor of Donaldson's industry-leading filtration solutions. Engineered for maximum engine protection and fleet performance."

export function HomepageHero() {
  const [index, setIndex] = useState(0)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % brands.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentBrand = brands[index]

  // Define unique gradients based on brand
  const gradients = {
    donaldson: 'from-[#0F1F38] via-[#1A3A6B] to-[#264E8C]',
    yuko: 'from-[#2C1F0A] via-[#B8860B] to-[#D4A017]',
    eurocar: 'from-[#0F240F] via-[#2D6A2D] to-[#3E8E3E]',
  }

  const currentGradient = gradients[currentBrand.slug as keyof typeof gradients] || gradients.donaldson

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`${ROUTES.search}?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="relative h-[520px] overflow-hidden bg-neutral-900 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBrand.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentBrand.heroImage})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${currentGradient} opacity-80`} />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto flex h-full max-w-content flex-col justify-center px-4 lg:px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2"
          >
            <span className="rounded bg-brand-donaldson/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/10">
              Bluemont Engineering Services
            </span>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display text-4xl font-bold leading-tight sm:text-6xl"
          >
            {staticHeadline.map((w, i) => (
              <motion.span key={i} variants={word} className="mr-2 inline-block">
                {w}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-6 max-w-2xl text-lg text-white/90"
          >
            {staticTagline}
          </motion.p>

          {/* Large Utility Search Bar - Mirrors Shop Donaldson Feel */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onSubmit={handleSearch}
            className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Part Number, Cross-Reference or Equipment..."
                className="h-14 w-full rounded-xl border-none bg-white pl-12 pr-4 text-neutral-900 shadow-2xl outline-none ring-2 ring-transparent focus:ring-brand-donaldson"
              />
            </div>
            <button
              type="submit"
              className="h-14 rounded-xl bg-brand-donaldson px-8 font-bold text-white shadow-xl transition hover:bg-brand-donaldson/90 active:scale-95"
            >
              Find Parts
            </button>
          </motion.form>
        </div>

        <div className="absolute bottom-10 left-4 flex gap-2 lg:left-6">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
