import { Cpu } from "lucide-react"
import { useState } from "react"

const models = [
  { id: "anomaly", name: "Anomaly Detection", accuracy: 94.2, status: "active" },
  { id: "classification", name: "Threat Classification", accuracy: 91.8, status: "active" },
  { id: "prediction", name: "Attack Prediction", accuracy: 87.5, status: "training" },
  { id: "behavior", name: "Behavioral Analysis", accuracy: 96.1, status: "active" },
]

export function MLModelSelector() {
  const [selectedModel, setSelectedModel] = useState("anomaly")

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">ML Models</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedModel === model.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  model.status === "active" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                }`}
              />
              <span className="text-[10px] text-muted-foreground capitalize">{model.status}</span>
            </div>
            <p className="text-xs font-medium truncate">{model.name}</p>
            <p className="text-lg font-bold font-mono text-primary">{model.accuracy}%</p>
          </button>
        ))}
      </div>
    </div>
  )
}
