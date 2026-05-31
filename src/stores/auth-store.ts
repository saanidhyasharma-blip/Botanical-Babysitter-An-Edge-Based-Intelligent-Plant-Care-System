import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Use environment variables for credentials, fallback to default 'admin'/'admin' for local testing
const LOCAL_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      login: (username: string, password: string) => {
        if (username === LOCAL_CREDENTIALS.username && password === LOCAL_CREDENTIALS.password) {
          set({ isAuthenticated: true, username })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false, username: null }),
    }),
    {
      name: 'botanical-auth-storage',
    }
  )
)
