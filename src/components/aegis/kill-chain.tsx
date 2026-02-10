import { Crosshair } from "lucide-react"

const phases = [
  { name: "Recon", count: 34, color: "bg-blue-500" },
  { name: "Weaponize", count: 18, color: "bg-indigo-500" },
  { name: "Deliver", count: 25, color: "bg-violet-500" },
  { name: "Exploit", count: 12, color: "bg-orange-500" },
  { name: "Install", count: 8, color: "bg-red-500" },
  { name: "C2", count: 5, color: "bg-red-700" },
  { name: "Actions", count: 2, color: "bg-red-900" },
]

export function KillChain() {
  const maxCount = Math.max(...phases.map((p) => p.count))

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Crosshair className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-medium">Kill Chain Analysis</span>
      </div>

      <div className="space-y-2">
        {phases.map((phase, i) => (
          <div key={phase.name} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="w-20 text-xs font-medium text-muted-foreground">{phase.name}</span>
            <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${phase.color} rounded-full transition-all duration-1000 flex items-center justify-end pr-2`}
                style={{ width: `${(phase.count / maxCount) * 100}%` }}
              >
                <span className="text-[10px] font-bold text-white">{phase.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
