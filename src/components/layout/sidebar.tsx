'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, Bell, LayoutDashboard, Settings, Sprout, HardDrive } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Plant Health', href: '/health', icon: Sprout },
  { name: 'Analytics', href: '/analytics', icon: Activity },
  { name: 'Devices', href: '/devices', icon: HardDrive },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-[#1a2f24] text-white/90">
      <div className="flex h-20 items-center px-8 border-b border-white/10 shrink-0">
        <Sprout className="h-7 w-7 text-[#b5cdb8] mr-3" />
        <span className="text-xl font-serif tracking-tight text-white">Botanical</span>
      </div>
      <div className="px-6 py-4 flex-1 overflow-y-auto">
        <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-4">Menu</p>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                    isActive ? 'text-[#b5cdb8]' : 'text-white/40 group-hover:text-white/80'
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="p-6 shrink-0">
        <div className="rounded-xl bg-white/5 p-4 border border-white/10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#4a6b53] flex items-center justify-center flex-shrink-0 border border-white/20">
            <span className="font-serif text-white">JD</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">John Dou&apos;s Plant</p>
            <p className="text-xs text-white/50 truncate">Local Connection</p>
          </div>
        </div>
      </div>
    </div>
  )
}
