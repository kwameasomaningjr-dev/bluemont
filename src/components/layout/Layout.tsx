import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import CartDrawer from './CartDrawer'
import WhatsAppFAB from './WhatsAppFAB'
import ToastStack from '../utility/ToastStack'
import { useAuthStore } from '../../store/authStore'
import { ROUTES } from '../../constants/routes'

export default function Layout() {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  // Auto-logout admin when returning to storefront homepage
  useEffect(() => {
    if (user?.accountType === 'admin' && location.pathname === ROUTES.storefront) {
      logout()
    }
  }, [user, location.pathname, logout])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileMenu />
      <CartDrawer />
      <WhatsAppFAB />
      <ToastStack />
    </div>
  )
}
