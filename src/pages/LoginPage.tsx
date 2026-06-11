import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from '../constants/routes'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (email.toLowerCase() === 'admin@bluemontgh.com') {
      login({
        name: 'Admin User',
        email: 'admin@bluemontgh.com',
        accountType: 'admin',
      })
      navigate(ROUTES.admin)
      return
    }

    const name = email.includes('@') ? email.split('@')[0] : 'Customer'
    login({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email || 'demo@bluemontgh.com',
      accountType: 'Retail Customer',
    })
    navigate(ROUTES.storefront)
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 lg:px-6">
      <h1 className="font-display text-2xl font-bold text-neutral-text">Welcome Back</h1>
      <p className="mt-1.5 text-sm text-neutral-muted">Sign in to view your orders and account details.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-text">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-text">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-donaldson px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-donaldson/90"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-muted">
        Don&rsquo;t have an account?{' '}
        <Link to={ROUTES.register} className="font-semibold text-brand-donaldson hover:underline">
          Create one
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-neutral-muted">
        This is a demo store — enter any email and password to continue.
      </p>
    </div>
  )
}
