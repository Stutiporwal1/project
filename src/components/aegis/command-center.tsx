import type React from "react"
import { useState } from "react"
import { Shield, Zap, Lock, RefreshCw, Bell, Download } from "lucide-react"

interface Action {
  id: string
  icon: React.ReactNode
  label: string
  shortcut: string
  color: string
  bgColor: string
}

const actions: Action[] = [
  { id: "block", icon: <Shield className="h-5 w-5" />, label: "Block All", shortcut: "B", color: "text-red-600", bgColor: "bg-red-50 hover:bg-red-100 border-red-200" },
  { id: "isolate", icon: <Lock className="h-5 w-5" />, label: "Isolate", shortcut: "I", color: "text-amber-600", bgColor: "bg-amber-50 hover:bg-amber-100 border-amber-200" },
  { id: "scan", icon: <RefreshCw className="h-5 w-5" />, label: "Full Scan", shortcut: "S", color: "text-primary", bgColor: "bg-primary/5 hover:bg-primary/10 border-primary/20" },
  { id: "alert", icon: <Bell className="h-5 w-5" />, label: "Alert", shortcut: "A", color: "text-orange-600", bgColor: "bg-orange-50 hover:bg-orange-100 border-orange-200" },
  { id: "export", icon: <Download className="h-5 w-5" />, label: "Export", shortcut: "E", color: "text-emerald-600", bgColor: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200" },
]

export function CommandCenter() {
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleAction = (id: string) => {
    setActiveAction(id)
    if (id === "scan") {
      setIsScanning(true)
      setTimeout(() => setIsScanning(false), 2000)
    }
    setTimeout(() => setActiveAction(null), 300)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">Quick Actions</span>
        </div>
        <span className="text-xs text-muted-foreground">Press key to trigger</span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {actions.map((action, idx) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${action.bgColor} ${action.color} ${
              activeAction === action.id ? "scale-95 ring-2 ring-ring/30" : "hover:scale-105"
            } animate-fade-in-up`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className={action.id === "scan" && isScanning ? "animate-spin" : ""}>{action.icon}</div>
            <span className="text-xs font-medium">{action.label}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/80 text-[10px] font-mono shadow-sm">{action.shortcut}</kbd>
          </button>
        ))}
      </div>
    </div>
  )
}
