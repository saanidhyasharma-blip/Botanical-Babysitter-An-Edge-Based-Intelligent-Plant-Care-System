'use client'

import { useEffect } from 'react'
import { useDeviceStore } from '@/stores/device-store'

export function DevicePoller() {
  const { deviceIp, addHistory, addAlert } = useDeviceStore()

  useEffect(() => {
    if (!deviceIp) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://${deviceIp}/api/status`)
        if (!res.ok) return
        
        const data = await res.json()
        
        // Add to history
        addHistory({
          temperature: data.temperature,
          humidity: data.humidity,
          moisture: data.moisture,
          pumpState: data.pumpState,
          autoMode: data.autoMode
        })

        // Generate alerts if needed
        if (data.moisture < 30) {
          addAlert({ message: 'Critical: Soil moisture is very low!', type: 'critical' })
        } else if (data.moisture < 45 && !data.pumpState) {
          addAlert({ message: 'Warning: Soil moisture is getting low.', type: 'warning' })
        }

        if (data.temperature > 35) {
          addAlert({ message: 'Critical: Temperature is too high!', type: 'critical' })
        }
        
      } catch (err) {
        // Silently fail if device is unreachable
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [deviceIp, addHistory, addAlert])

  return null
}
