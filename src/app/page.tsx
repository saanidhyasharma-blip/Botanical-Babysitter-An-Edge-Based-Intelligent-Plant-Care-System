'use client'

import { useDeviceStore } from '@/stores/device-store'
import { Droplet, Thermometer, Wind, Power, Settings2 } from 'lucide-react'
import Image from 'next/image'

export default function OverviewPage() {
  const { history, deviceIp } = useDeviceStore()
  
  const currentData = history.length > 0 ? history[history.length - 1] : null
  const isConnected = !!currentData && (Date.now() - currentData.timestamp < 10000)

  return (
    <div className="flex flex-col max-w-5xl mx-auto gap-8 pb-10">
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-sm">
        <Image
          src="/hero.png"
          alt="Lush monstera plant"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-2">Monstera Deliciosa</h2>
            <p className="text-white/80 font-medium">Indoor Climate: {currentData ? 'Optimal' : 'Checking...'}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white shadow-sm">
            <div className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Offline'}</span>
          </div>
        </div>
      </div>

      {!deviceIp && (
        <div className="bg-warning/20 border border-warning/30 rounded-2xl p-6 text-warning-foreground">
          <h3 className="font-serif text-xl mb-1">Welcome to Botanical Babysitter</h3>
          <p className="opacity-80">Please go to Settings to configure your device IP address.</p>
        </div>
      )}

      {/* Sensor Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Moisture */}
        <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Droplet className="h-40 w-40" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Droplet className="h-5 w-5" />
              <span className="font-medium tracking-wide uppercase text-sm">Soil Moisture</span>
            </div>
            <p className="text-muted-foreground text-sm">Target: 40% - 60%</p>
          </div>
          <div className="mt-8">
            <span className="text-5xl font-serif tracking-tighter text-foreground">
              {currentData ? Math.round(currentData.moisture) : '--'}
            </span>
            <span className="text-2xl text-muted-foreground ml-1">%</span>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Thermometer className="h-40 w-40" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <Thermometer className="h-5 w-5" />
              <span className="font-medium tracking-wide uppercase text-sm">Temperature</span>
            </div>
            <p className="text-muted-foreground text-sm">Target: 18°C - 28°C</p>
          </div>
          <div className="mt-8">
            <span className="text-5xl font-serif tracking-tighter text-foreground">
              {currentData ? currentData.temperature.toFixed(1) : '--'}
            </span>
            <span className="text-2xl text-muted-foreground ml-1">°C</span>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wind className="h-40 w-40" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Wind className="h-5 w-5" />
              <span className="font-medium tracking-wide uppercase text-sm">Air Humidity</span>
            </div>
            <p className="text-muted-foreground text-sm">Target: 40% - 70%</p>
          </div>
          <div className="mt-8">
            <span className="text-5xl font-serif tracking-tighter text-foreground">
              {currentData ? Math.round(currentData.humidity) : '--'}
            </span>
            <span className="text-2xl text-muted-foreground ml-1">%</span>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-[#e8ebe6] rounded-3xl p-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#4a6b53] mb-1">
              <Power className="h-5 w-5" />
              <span className="font-medium tracking-wide uppercase text-sm">Irrigation Pump</span>
            </div>
            <p className="text-sm opacity-70">Current operational state</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-serif text-[#1a2f24]">
              {currentData ? (currentData.pumpState ? 'Active' : 'Standby') : 'Unknown'}
            </span>
          </div>
        </div>
        
        <div className="bg-[#e8ebe6] rounded-3xl p-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#4a6b53] mb-1">
              <Settings2 className="h-5 w-5" />
              <span className="font-medium tracking-wide uppercase text-sm">Control Mode</span>
            </div>
            <p className="text-sm opacity-70">Automation settings</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-serif text-[#1a2f24]">
              {currentData ? (currentData.autoMode ? 'Automatic' : 'Manual') : 'Unknown'}
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
