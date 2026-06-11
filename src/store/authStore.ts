import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MockUser } from '../types'

interface AuthStore {
  isLoggedIn: boolean
  user: MockUser | null
  login: (user: MockUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    { name: 'bluemont-auth' },
  ),
)
