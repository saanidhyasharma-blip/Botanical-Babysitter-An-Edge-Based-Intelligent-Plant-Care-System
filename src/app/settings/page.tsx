'use client'

import { useState } from 'react'
import { useDeviceStore } from '@/stores/device-store'
import { Settings, Save, Wifi, CheckCircle2 } from 'lucide-react'

export default function SettingsPage() {
  const { deviceIp, setDeviceIp } = useDeviceStore()
  const [ipInput, setIpInput] = useState(deviceIp)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setDeviceIp(ipInput)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto gap-8 pb-10">
      <div>
        <h2 className="text-4xl font-serif tracking-tight mb-2">Settings</h2>
        <p className="text-muted-foreground text-lg">Configure your hardware connection.</p>
      </div>

      <div className="flex flex-col rounded-[2rem] border border-border bg-card p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Settings className="w-32 h-32" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#4a6b53]/10 p-4 rounded-2xl text-[#4a6b53]">
              <Wifi className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-serif">Local Network Connection</h3>
              <p className="text-muted-foreground mt-1">Connect directly to your ESP32 on the local WiFi network.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="deviceIp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                ESP32 IP Address
              </label>
              <input
                id="deviceIp"
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="e.g., 192.168.1.100"
                className="flex h-14 w-full rounded-xl border border-input bg-transparent px-4 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-sm text-muted-foreground">
                Enter the local IP address printed in your Arduino Serial Monitor when the ESP32 connects to WiFi.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-xl bg-[#1a2f24] px-8 py-4 text-sm font-medium text-white shadow transition-colors hover:bg-[#2c4c3b] disabled:opacity-50 w-full sm:w-auto"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Settings Saved
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
