import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  LogOut, 
  Menu, 
  X, 
  User,
  Bell
} from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { ROUTES } from '../../constants/routes'
import ToastStack from '../utility/ToastStack'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login)
  }

  const navItems = [
    { label: 'Dashboard', path: ROUTES.admin, icon: LayoutDashboard },
    { label: 'Inventory', path: ROUTES.adminInventory, icon: Package },
  ]

  return (
    <div className="flex h-screen bg-neutral-bg">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-col border-r border-neutral-border bg-neutral-surface lg:flex">
        <div className="flex h-16 items-center border-b border-neutral-border px-6">
          <Link to={ROUTES.home} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-donaldson flex items-center justify-center text-white font-bold text-xs">B</div>
            <span className="font-display text-lg font-bold tracking-tight text-neutral-text">
              Bluemont Admin
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-donaldson text-white shadow-md shadow-brand-donaldson/20' 
                    : 'text-neutral-muted hover:bg-neutral-bg hover:text-neutral-text'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-neutral-border p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-status-danger transition-colors hover:bg-status-danger/10"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-border bg-neutral-surface px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-bg lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <button className="relative rounded-full p-2 text-neutral-muted hover:bg-neutral-bg">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-donaldson border-2 border-neutral-surface" />
            </button>
            
            <div className="h-8 w-px bg-neutral-border" />
            
            <div className="flex items-center gap-3">
              <div className="hidden text-right lg:block">
                <p className="text-sm font-semibold text-neutral-text">{user?.name}</p>
                <p className="text-xs text-neutral-muted">Administrator</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-bg text-brand-donaldson border border-neutral-border font-bold">
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">
          <Outlet />
          </div>
          </main>
          </div>

          <ToastStack />

          {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-neutral-surface transition-transform duration-300 ease-in-out lg:hidden ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-between border-b border-neutral-border px-6">
          <span className="font-display text-lg font-bold text-neutral-text">Bluemont Admin</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-bg"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-donaldson text-white shadow-md shadow-brand-donaldson/20' 
                    : 'text-neutral-muted hover:bg-neutral-bg hover:text-neutral-text'
                }`}
              >
                <Icon size={22} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-neutral-border p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-status-danger"
          >
            <LogOut size={22} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  )
}
