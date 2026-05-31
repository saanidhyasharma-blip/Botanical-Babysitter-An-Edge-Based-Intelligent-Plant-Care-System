import { cn } from "@/lib/utils"

interface SensorCardProps {
  title: string
  value: string | number
  unit: string
  icon: React.ReactNode
  status?: 'normal' | 'warning' | 'critical'
}

export function SensorCard({ title, value, unit, icon, status = 'normal' }: SensorCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={cn(
          "rounded-full p-2",
          status === 'normal' && "bg-primary/10 text-primary",
          status === 'warning' && "bg-warning/10 text-warning",
          status === 'critical' && "bg-destructive/10 text-destructive",
        )}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        <span className="text-sm font-medium text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}
