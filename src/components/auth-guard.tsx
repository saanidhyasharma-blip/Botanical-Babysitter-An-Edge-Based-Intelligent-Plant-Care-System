'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/login') {
      router.replace('/login')
    }
  }, [mounted, isAuthenticated, pathname, router])

  // Don't render anything until hydrated to prevent flash
  if (!mounted) return null

  // If on login page, always render
  if (pathname === '/login') return <>{children}</>

  // If not authenticated, show nothing (redirect in progress)
  if (!isAuthenticated) return null

  return <>{children}</>
}
