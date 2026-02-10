import { type Threat, severityColors, threatTypeLabels } from "@/lib/threat-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Radio, Clock, MapPin, Search } from "lucide-react"
import { useState } from "react"

interface EventFeedProps {
  threats: Threat[]
  expanded?: boolean
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

function getSeverityBg(severity: string) {
  switch (severity) {
    case "critical": return "bg-red-50 border-red-200"
    case "high": return "bg-orange-50 border-orange-200"
    case "medium": return "bg-amber-50 border-amber-200"
    default: return "bg-emerald-50 border-emerald-200"
  }
}

export function EventFeed({ threats, expanded = false }: EventFeedProps) {
  const [search, setSearch] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")

  const filteredThreats = threats.filter((threat) => {
    const matchesSearch =
      search === "" ||
      threatTypeLabels[threat.type].toLowerCase().includes(search.toLowerCase()) ||
      threat.location.toLowerCase().includes(search.toLowerCase()) ||
      threat.source.includes(search) ||
      threat.target.includes(search)
    const matchesSeverity = severityFilter === "all" || threat.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${expanded ? "h-auto" : "h-full"}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Radio className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">Live Events</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">{filteredThreats.length} events</span>
        </div>
      </div>

      {expanded && (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search threats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      )}

      <ScrollArea className={expanded ? "h-[500px]" : "h-[320px]"}>
        <div className={`space-y-2 pr-2 ${expanded ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}`}>
          {filteredThreats.map((threat, i) => (
            <div
              key={threat.id}
              className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-md ${getSeverityBg(threat.severity)} ${i === 0 ? "animate-slide-in-right" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full animate-dot-pulse" style={{ backgroundColor: severityColors[threat.severity] }} />
                    <span className="text-sm font-medium">{threatTypeLabels[threat.type]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{threat.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatTime(threat.timestamp)}</span>
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted-foreground bg-white/50 rounded px-2 py-1 truncate">
                    {threat.source} → {threat.target}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  threat.status === "blocked" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {threat.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
