'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Menu, X } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { LogOut } from 'lucide-react'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { logout, username } = useAuthStore()
  
  // Don't render shell on login page
  if (pathname === '/login') {
    return <>{children}</>
  }

  const title = pathname === '/' ? 'Overview' : 
                pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar — always visible on desktop, overlay drawer on mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-out
        lg:relative lg:translate-x-0 lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="flex h-16 sm:h-20 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-md px-4 sm:px-10 sticky top-0 z-10">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="lg:hidden p-2 -ml-1 rounded-xl hover:bg-black/5 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <div className="flex flex-1 items-center justify-between min-w-0">
            <h1 className="text-xl sm:text-3xl font-serif text-foreground tracking-tight truncate">
              {title.replace('-', ' ')}
            </h1>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="text-sm text-muted-foreground hidden sm:block">{username}</span>
              <button
                onClick={logout}
                className="p-2 rounded-xl hover:bg-black/5 transition-colors text-muted-foreground hover:text-foreground"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
