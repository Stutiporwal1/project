import { useState } from "react"
import { X, Database, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ConnectDBDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ConnectDBDialog({ isOpen, onClose }: ConnectDBDialogProps) {
  const [connectionType, setConnectionType] = useState<"postgresql" | "mysql" | "mongodb">("postgresql")
  const [host, setHost] = useState("")
  const [port, setPort] = useState("5432")
  const [database, setDatabase] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")

  const handleConnect = async () => {
    setIsConnecting(true)
    setConnectionStatus("idle")
    await new Promise((r) => setTimeout(r, 2000))
    setConnectionStatus(Math.random() > 0.2 ? "success" : "error")
    setIsConnecting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2"><Database className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold">Connect Database</h2></div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Database Type</Label>
            <div className="flex gap-2">
              {(["postgresql", "mysql", "mongodb"] as const).map((type) => (
                <button key={type} onClick={() => setConnectionType(type)} className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${connectionType === type ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-muted"}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="host">Host</Label><Input id="host" placeholder="localhost" value={host} onChange={(e) => setHost(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="port">Port</Label><Input id="port" placeholder="5432" value={port} onChange={(e) => setPort(e.target.value)} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="database">Database Name</Label><Input id="database" placeholder="threat_intel_db" value={database} onChange={(e) => setDatabase(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" placeholder="admin" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          {connectionStatus === "success" && <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200"><Check className="h-5 w-5" /><span className="text-sm font-medium">Successfully connected</span></div>}
          {connectionStatus === "error" && <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200"><AlertCircle className="h-5 w-5" /><span className="text-sm font-medium">Connection failed</span></div>}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">Cancel</Button>
            <Button onClick={handleConnect} disabled={isConnecting} className="flex-1">{isConnecting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Connecting...</> : "Connect"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
