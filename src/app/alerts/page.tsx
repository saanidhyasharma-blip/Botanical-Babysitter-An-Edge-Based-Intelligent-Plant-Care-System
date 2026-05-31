'use client'

import { useDeviceStore } from '@/stores/device-store'
import { AlertCircle, AlertTriangle, Info, Trash2 } from 'lucide-react'

function formatDate(ts: number) {
  const d = new Date(ts)
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export default function AlertsPage() {
  const { alerts, clearAlerts } = useDeviceStore()

  return (
    <div className="flex flex-col max-w-4xl mx-auto gap-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-serif tracking-tight mb-2">Alerts</h2>
          <p className="text-muted-foreground text-lg">System notifications and warnings.</p>
        </div>
        
        {alerts.length > 0 && (
          <button 
            onClick={clearAlerts}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-full transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="text-center p-16 bg-white/50 border border-dashed border-border rounded-3xl mt-4">
          <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="h-8 w-8 text-primary/40" />
          </div>
          <h3 className="text-xl font-serif mb-2">No alerts right now</h3>
          <p className="text-muted-foreground">Your plant is happy and healthy. Any issues will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`flex items-start gap-4 p-6 rounded-2xl border shadow-sm transition-all
                ${alert.type === 'critical' ? 'bg-destructive/5 border-destructive/20 text-destructive' : ''}
                ${alert.type === 'warning' ? 'bg-warning/10 border-warning/30 text-warning-foreground' : ''}
                ${alert.type === 'info' ? 'bg-card border-border text-foreground' : ''}
              `}
            >
              <div className="shrink-0 mt-1">
                {alert.type === 'critical' && <AlertCircle className="h-6 w-6" />}
                {alert.type === 'warning' && <AlertTriangle className="h-6 w-6" />}
                {alert.type === 'info' && <Info className="h-6 w-6 text-primary" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-lg leading-snug">{alert.message}</p>
                <p className="text-sm opacity-60 mt-2 font-medium">
                  {formatDate(alert.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
