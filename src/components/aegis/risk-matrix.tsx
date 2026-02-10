import { Grid3X3 } from "lucide-react"

const matrix = [
  [2, 5, 8, 12],
  [1, 3, 6, 9],
  [0, 2, 4, 7],
  [0, 1, 2, 3],
]

const likelihoodLabels = ["Rare", "Unlikely", "Possible", "Likely"]
const impactLabels = ["Low", "Medium", "High", "Critical"]

function getCellColor(value: number): string {
  if (value >= 10) return "bg-red-500 text-white"
  if (value >= 7) return "bg-orange-400 text-white"
  if (value >= 4) return "bg-amber-300 text-amber-900"
  if (value >= 2) return "bg-yellow-200 text-yellow-800"
  return "bg-emerald-100 text-emerald-700"
}

export function RiskMatrix() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Grid3X3 className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-medium">Risk Matrix</span>
      </div>

      <div className="space-y-1">
        {matrix.map((row, ri) => (
          <div key={ri} className="flex gap-1">
            <span className="w-14 text-[10px] text-muted-foreground flex items-center">
              {likelihoodLabels[3 - ri]}
            </span>
            {row.map((val, ci) => (
              <div
                key={ci}
                className={`flex-1 h-10 rounded-md flex items-center justify-center text-xs font-bold transition-transform hover:scale-105 ${getCellColor(val)}`}
              >
                {val}
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-1 ml-14">
          {impactLabels.map((l) => (
            <span key={l} className="flex-1 text-[10px] text-center text-muted-foreground">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
