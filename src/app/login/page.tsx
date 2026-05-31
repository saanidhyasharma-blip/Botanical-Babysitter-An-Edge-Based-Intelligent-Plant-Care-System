'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { Sprout, LogIn, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuthStore()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    setTimeout(() => {
      const ok = login(username, password)
      if (ok) {
        router.replace('/')
      } else {
        setError(true)
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#1a2f24] p-4 rounded-2xl mb-4">
            <Sprout className="h-10 w-10 text-[#b5cdb8]" />
          </div>
          <h1 className="text-3xl font-serif text-[#1a2f24] tracking-tight">Botanical Babysitter</h1>
          <p className="text-[#1a2f24]/50 mt-2">Smart plant monitoring platform</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-[#e8ebe6] p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-serif text-[#1a2f24] mb-1">Welcome back</h2>
          <p className="text-[#1a2f24]/50 mb-8">Sign in to your dashboard</p>

          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">Invalid username or password.</p>
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#1a2f24]">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="flex h-12 w-full rounded-xl border border-[#e8ebe6] bg-[#f9f9f6] px-4 text-base text-[#1a2f24] placeholder:text-[#1a2f24]/30 focus:outline-none focus:ring-2 focus:ring-[#4a6b53]/30 focus:border-[#4a6b53] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#1a2f24]">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="flex h-12 w-full rounded-xl border border-[#e8ebe6] bg-[#f9f9f6] px-4 text-base text-[#1a2f24] placeholder:text-[#1a2f24]/30 focus:outline-none focus:ring-2 focus:ring-[#4a6b53]/30 focus:border-[#4a6b53] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#1a2f24] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#2c4c3b] transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-block h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-[#1a2f24]/40 mt-6">
          Default local login: admin / admin
        </p>
      </div>
    </div>
  )
}
