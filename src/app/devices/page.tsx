'use client'

import { useDeviceStore } from '@/stores/device-store'
import { useState } from 'react'
import { Power, Settings2, Droplet, AlertCircle } from 'lucide-react'

export default function DevicesPage() {
  const { deviceIp } = useDeviceStore()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sendCommand = async (endpoint: string) => {
    if (!deviceIp) {
      setError('Please configure the Device IP in Settings first.')
      return
    }
    
    setLoading(endpoint)
    setError(null)
    try {
      // The ESP32 redirects after these commands, so we use no-cors to ignore the redirect response
      await fetch(`http://${deviceIp}${endpoint}`, { mode: 'no-cors' })
      // Assuming success if fetch didn't throw
    } catch (err) {
      console.error(err)
      setError(`Failed to connect to http://${deviceIp}. Make sure it is powered on and on the same WiFi.`)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto gap-8 pb-10">
      <div>
        <h2 className="text-4xl font-serif tracking-tight mb-2">Devices</h2>
        <p className="text-muted-foreground text-lg">Manage your hardware connections and controls.</p>
      </div>
      
      {error && (
        <div className="rounded-2xl bg-destructive/10 p-6 flex items-start gap-4 text-destructive border border-destructive/20">
          <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
          <p className="text-lg font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Control Mode */}
        <div className="flex flex-col rounded-[2rem] border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#4a6b53]/10 p-4 rounded-2xl text-[#4a6b53]">
              <Settings2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-serif">Control Mode</h3>
              <p className="text-muted-foreground mt-1">Switch between automatic irrigation or manual override.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              onClick={() => sendCommand('/auto')}
              disabled={loading !== null}
              className="flex-1 inline-flex h-14 items-center justify-center rounded-xl bg-[#e8ebe6] px-6 text-base font-medium text-[#1a2f24] transition-colors hover:bg-[#d8dbd6] disabled:opacity-50"
            >
              {loading === '/auto' ? 'Sending...' : 'Set AUTOMATIC'}
            </button>
            <button
              onClick={() => sendCommand('/manual')}
              disabled={loading !== null}
              className="flex-1 inline-flex h-14 items-center justify-center rounded-xl border-2 border-border bg-transparent px-6 text-base font-medium transition-colors hover:bg-black/5 disabled:opacity-50"
            >
              {loading === '/manual' ? 'Sending...' : 'Set MANUAL'}
            </button>
          </div>
        </div>

        {/* Water Pump */}
        <div className="flex flex-col rounded-[2rem] border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#3b82f6]/10 p-4 rounded-2xl text-[#3b82f6]">
              <Droplet className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-serif">Water Pump</h3>
              <p className="text-muted-foreground mt-1">Manually control the irrigation pump. (Requires MANUAL mode)</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              onClick={() => sendCommand('/on')}
              disabled={loading !== null}
              className="flex-1 inline-flex h-14 items-center justify-center rounded-xl bg-[#4a6b53] px-6 text-base font-medium text-white shadow-md transition-colors hover:bg-[#3b5742] disabled:opacity-50"
            >
              <Power className="mr-2 h-5 w-5" />
              {loading === '/on' ? 'Sending...' : 'Turn ON'}
            </button>
            <button
              onClick={() => sendCommand('/off')}
              disabled={loading !== null}
              className="flex-1 inline-flex h-14 items-center justify-center rounded-xl bg-destructive px-6 text-base font-medium text-destructive-foreground shadow-md transition-colors hover:bg-destructive/90 disabled:opacity-50"
            >
              <Power className="mr-2 h-5 w-5" />
              {loading === '/off' ? 'Sending...' : 'Turn OFF'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
