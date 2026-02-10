import { Activity } from "lucide-react"
import { useEffect, useState } from "react"

interface PulseData {
  time: string
  value: number
}

export function ThreatPulse() {
  const [data, setData] = useState<PulseData[]>([])

  useEffect(() => {
    const initial = Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 80) + 20,
    }))
    setData(initial)

    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)]
        const now = new Date()
        newData.push({
          time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`,
          value: Math.floor(Math.random() * 80) + 20,
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const maxVal = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">Threat Pulse</span>
        </div>
        <span className="text-xs text-muted-foreground">24h rolling</span>
      </div>

      <div className="flex items-end gap-[2px] h-32">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 rounded-t transition-all duration-500"
            style={{
              height: `${(d.value / maxVal) * 100}%`,
              backgroundColor:
                d.value > 70 ? "hsl(0, 84%, 60%)" : d.value > 40 ? "hsl(25, 95%, 53%)" : "hsl(142, 71%, 45%)",
              opacity: 0.7 + (i / data.length) * 0.3,
            }}
            title={`${d.time}: ${d.value} threats`}
          />
        ))}
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
        <span>{data[0]?.time}</span>
        <span>{data[data.length - 1]?.time}</span>
      </div>
    </div>
  )
}
