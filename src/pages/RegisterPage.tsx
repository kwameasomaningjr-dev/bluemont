import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from '../constants/routes'

export default function RegisterPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login({
      name: name || 'Customer',
      email: email || 'demo@bluemontgh.com',
      accountType: 'Retail Customer',
    })
    navigate(ROUTES.storefront)
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 lg:px-6">
      <h1 className="font-display text-2xl font-bold text-neutral-text">Create Your Account</h1>
      <p className="mt-1.5 text-sm text-neutral-muted">Sign up to track orders and request quotes faster.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-text">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Kwame Mensah"
            className="w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-2.5 text-sm text-neutral-text outline-none focus:border-brand-donaldson"
          />
        </div>
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
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-muted">
        Already have an account?{' '}
        <Link to={ROUTES.login} className="font-semibold text-brand-donaldson hover:underline">
          Sign in
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-neutral-muted">
        This is a demo store — enter any details to continue.
      </p>
    </div>
  )
}
