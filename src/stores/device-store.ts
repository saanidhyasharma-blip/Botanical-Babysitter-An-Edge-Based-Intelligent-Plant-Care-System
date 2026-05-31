import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SensorData {
  timestamp: number
  temperature: number
  humidity: number
  moisture: number
  pumpState: boolean
  autoMode: boolean
}

export interface Alert {
  id: string
  timestamp: number
  message: string
  type: 'critical' | 'warning' | 'info'
}

interface DeviceState {
  deviceIp: string
  setDeviceIp: (ip: string) => void
  history: SensorData[]
  addHistory: (data: Omit<SensorData, 'timestamp'>) => void
  alerts: Alert[]
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void
  clearAlerts: () => void
}

export const useDeviceStore = create<DeviceState>()(
  persist(
    (set) => ({
      deviceIp: '192.168.1.100', // Default example IP
      setDeviceIp: (ip) => set({ deviceIp: ip }),
      history: [],
      addHistory: (data) => set((state) => {
        const newData = { ...data, timestamp: Date.now() }
        const newHistory = [...state.history, newData]
        if (newHistory.length > 100) newHistory.shift() // Keep last 100
        return { history: newHistory }
      }),
      alerts: [],
      addAlert: (alert) => set((state) => ({
        alerts: [{ ...alert, id: Math.random().toString(36).substring(7), timestamp: Date.now() }, ...state.alerts].slice(0, 50)
      })),
      clearAlerts: () => set({ alerts: [] })
    }),
    {
      name: 'botanical-device-storage',
      partialize: (state) => ({ deviceIp: state.deviceIp, alerts: state.alerts }), // Only persist IP and alerts, history resets on load
    }
  )
)
