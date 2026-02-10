import { Brain, TrendingUp, TrendingDown } from "lucide-react"

const predictions = [
  { label: "DDoS surge", probability: 78, trend: "up", timeframe: "Next 6h" },
  { label: "Ransomware wave", probability: 45, trend: "down", timeframe: "Next 24h" },
  { label: "Phishing campaign", probability: 62, trend: "up", timeframe: "Next 12h" },
  { label: "Zero-day exploit", probability: 23, trend: "down", timeframe: "Next 48h" },
]

export function PredictionCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Brain className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-medium">AI Predictions</span>
      </div>

      <div className="space-y-3">
        {predictions.map((pred, i) => (
          <div key={pred.label} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">{pred.label}</span>
              <div className="flex items-center gap-1">
                {pred.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-red-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-emerald-500" />
                )}
                <span className="text-xs font-mono font-bold">{pred.probability}%</span>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  pred.probability > 60 ? "bg-red-500" : pred.probability > 40 ? "bg-amber-400" : "bg-emerald-500"
                }`}
                style={{ width: `${pred.probability}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">{pred.timeframe}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
