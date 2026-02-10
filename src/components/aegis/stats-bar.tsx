import { Shield, ShieldOff, AlertTriangle, Eye } from "lucide-react"

interface StatsBarProps {
  threats: number
  blocked: number
  critical: number
  monitoring: number
}

const stats = [
  { key: "threats", label: "Active Threats", icon: ShieldOff, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  { key: "blocked", label: "Blocked Today", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { key: "critical", label: "Critical", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50 border-red-200" },
  { key: "monitoring", label: "Monitoring", icon: Eye, color: "text-primary", bg: "bg-primary/5 border-primary/20" },
] as const

export function StatsBar({ threats, blocked, critical, monitoring }: StatsBarProps) {
  const values: Record<string, number> = { threats, blocked, critical, monitoring }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={stat.key}
          className={`rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${stat.bg} animate-fade-in-up`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} font-mono`}>{values[stat.key].toLocaleString()}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
