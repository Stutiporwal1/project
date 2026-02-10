import { Globe } from "lucide-react"
import { useEffect, useState } from "react"

interface AttackPoint {
  id: string
  x: number
  y: number
  severity: "critical" | "high" | "medium" | "low"
  country: string
}

const initialPoints: AttackPoint[] = [
  { id: "1", x: 20, y: 35, severity: "critical", country: "US" },
  { id: "2", x: 48, y: 25, severity: "high", country: "UK" },
  { id: "3", x: 52, y: 30, severity: "medium", country: "Germany" },
  { id: "4", x: 75, y: 35, severity: "critical", country: "China" },
  { id: "5", x: 70, y: 25, severity: "high", country: "Russia" },
  { id: "6", x: 35, y: 60, severity: "medium", country: "Brazil" },
  { id: "7", x: 65, y: 40, severity: "low", country: "India" },
  { id: "8", x: 82, y: 55, severity: "high", country: "Australia" },
  { id: "9", x: 80, y: 30, severity: "critical", country: "Japan" },
  { id: "10", x: 55, y: 50, severity: "medium", country: "Kenya" },
]

const severityDotColor: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-400",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
}

export function WorldMap() {
  const [points, setPoints] = useState(initialPoints)
  const [activePoint, setActivePoint] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * points.length)
      setActivePoint(points[randIdx].id)
      setTimeout(() => setActivePoint(null), 1000)
    }, 3000)
    return () => clearInterval(interval)
  }, [points])

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">Global Threat Map</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          {Object.entries(severityDotColor).map(([sev, color]) => (
            <div key={sev} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-muted-foreground capitalize">{sev}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-48 bg-gradient-to-b from-muted/20 to-muted/40 rounded-lg overflow-hidden border border-border/50">
        {/* Simplified grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[20, 40, 60, 80].map((y) => (
            <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="currentColor" />
          ))}
          {[20, 40, 60, 80].map((x) => (
            <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="currentColor" />
          ))}
        </svg>

        {points.map((point) => (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            {activePoint === point.id && (
              <span className={`absolute inset-0 w-6 h-6 -ml-1.5 -mt-1.5 rounded-full ${severityDotColor[point.severity]} opacity-30 animate-ping`} />
            )}
            <div className={`w-3 h-3 rounded-full ${severityDotColor[point.severity]} shadow-lg cursor-pointer hover:scale-150 transition-transform`} />
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 bg-card px-1 rounded">
              {point.country}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
