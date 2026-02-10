import { X, History, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HistoricalAnalysisProps {
  isOpen: boolean
  onClose: () => void
}

const historicalData = [
  { month: "Jul", attacks: 1234, blocked: 1180 },
  { month: "Aug", attacks: 1456, blocked: 1398 },
  { month: "Sep", attacks: 1123, blocked: 1089 },
  { month: "Oct", attacks: 1678, blocked: 1612 },
  { month: "Nov", attacks: 1890, blocked: 1834 },
  { month: "Dec", attacks: 2134, blocked: 2056 },
]

export function HistoricalAnalysis({ isOpen, onClose }: HistoricalAnalysisProps) {
  if (!isOpen) return null

  const maxVal = Math.max(...historicalData.map((d) => d.attacks))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Historical Analysis</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {historicalData.map((d) => (
              <div key={d.month} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{d.month}</span>
                  <span className="text-muted-foreground">
                    {d.blocked}/{d.attacks} blocked ({((d.blocked / d.attacks) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-500 rounded-l-full"
                    style={{ width: `${(d.blocked / maxVal) * 100}%` }}
                  />
                  <div
                    className="h-full bg-red-400"
                    style={{ width: `${((d.attacks - d.blocked) / maxVal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              Blocked
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-400" />
              Unblocked
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <TrendingUp className="h-3 w-3 text-red-500" />
              <span>Attack volume trending up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
