'use client'

import { useDeviceStore } from '@/stores/device-store'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function AnalyticsPage() {
  const { history } = useDeviceStore()
  
  // Format data for chart
  const data = history.map(h => ({
    time: formatTime(h.timestamp),
    temperature: h.temperature,
    humidity: h.humidity,
    moisture: h.moisture
  }))

  return (
    <div className="flex flex-col max-w-6xl mx-auto gap-8 pb-10">
      <div>
        <h2 className="text-4xl font-serif tracking-tight mb-2">Live Analytics</h2>
        <p className="text-muted-foreground text-lg">Real-time telemetry direct from your local hardware.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Moisture & Humidity Chart */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h3 className="font-serif text-xl mb-6">Moisture & Humidity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                  axisLine={false} 
                  tickLine={false}
                  minTickGap={30}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#4a6b53" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                  name="Soil Moisture (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                  name="Air Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h3 className="font-serif text-xl mb-6">Temperature</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                  axisLine={false} 
                  tickLine={false}
                  minTickGap={30}
                />
                <YAxis 
                  domain={['dataMin - 2', 'dataMax + 2']} 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#ea580c" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
      
      {data.length === 0 && (
        <div className="text-center p-12 text-muted-foreground bg-white/50 rounded-2xl border border-dashed border-border">
          Waiting for live data... Connect your device on the Settings page.
        </div>
      )}
    </div>
  )
}
