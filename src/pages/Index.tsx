import { useState, useEffect } from "react"
import { generateThreat, generateThreats, type Threat } from "@/lib/threat-data"
import { ThreatPulse } from "@/components/aegis/threat-pulse"
import { RiskMatrix } from "@/components/aegis/risk-matrix"
import { KillChain } from "@/components/aegis/kill-chain"
import { NetworkGraph } from "@/components/aegis/network-graph"
import { PredictionCard } from "@/components/aegis/prediction-card"
import { EventFeed } from "@/components/aegis/event-feed"
import { CommandCenter } from "@/components/aegis/command-center"
import { StatsBar } from "@/components/aegis/stats-bar"
import { WorldMap } from "@/components/aegis/world-map"
import { MLModelSelector } from "@/components/aegis/ml-model-selector"
import { HistoricalAnalysis } from "@/components/aegis/historical-analysis"
import { NavigationTabs } from "@/components/aegis/navigation-tabs"
import { ConnectDBDialog } from "@/components/aegis/connect-db-dialog"
import { ExportDialog } from "@/components/aegis/export-dialog"
import { ChatPanel } from "@/components/aegis/chat-panel"
import { SettingsPanel, defaultSettings, type DashboardSettings } from "@/components/aegis/settings-panel"
import { Hexagon, Bell, BellOff, Settings, Download, MessageSquare, Database, History } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AegisDashboard() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [stats, setStats] = useState({
    threats: 47,
    blocked: 892,
    critical: 12,
    monitoring: 156,
  })
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("analytics")
  const [showHistorical, setShowHistorical] = useState(false)
  const [showConnectDB, setShowConnectDB] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings)

  useEffect(() => {
    setThreats(generateThreats(15))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = generateThreat()
      setThreats((prev) => [newThreat, ...prev.slice(0, 24)])

      setStats((prev) => ({
        threats: Math.max(0, prev.threats + Math.floor(Math.random() * 3) - 1),
        blocked: prev.blocked + Math.floor(Math.random() * 3),
        critical: Math.max(0, prev.critical + (Math.random() > 0.7 ? 1 : Math.random() > 0.5 ? -1 : 0)),
        monitoring: Math.max(100, prev.monitoring + Math.floor(Math.random() * 5) - 2),
      }))
    }, settings.refreshInterval * 1000)

    return () => clearInterval(interval)
  }, [settings.refreshInterval])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "historical") setShowHistorical(true)
  }

  const gridClass =
    settings.layout === "compact"
      ? "grid grid-cols-1 lg:grid-cols-4 gap-4"
      : settings.layout === "expanded"
        ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
        : "grid grid-cols-1 lg:grid-cols-3 gap-6"

  const renderTabContent = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <>
            <WorldMap />
            <MLModelSelector />
            <div className={gridClass}>
              <div className="space-y-6"><ThreatPulse /><RiskMatrix /></div>
              <div className="space-y-6"><NetworkGraph /><KillChain /><CommandCenter /></div>
              <div className="space-y-6"><PredictionCard /><EventFeed threats={threats} /></div>
            </div>
          </>
        )
      case "threat-feed":
        return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="lg:col-span-2"><EventFeed threats={threats} expanded /></div></div>
      case "incident":
        return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><KillChain /><CommandCenter /><div className="lg:col-span-2"><EventFeed threats={threats.filter((t) => t.severity === "critical")} expanded /></div></div>
      case "threat-intel":
        return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><WorldMap /><RiskMatrix /></div>
      case "ip-verify":
        return (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto"><Database className="h-8 w-8 text-primary" /></div>
              <h3 className="text-xl font-semibold">IP Verification</h3>
              <p className="text-muted-foreground">Enter an IP address to check against known threat databases.</p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input type="text" placeholder="Enter IP address..." className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring/20" />
                <Button>Verify</Button>
              </div>
            </div>
          </div>
        )
      case "network":
        return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><NetworkGraph /><ThreatPulse /></div>
      case "ai-predictions":
        return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><MLModelSelector /><PredictionCard /></div>
      case "upload":
        return (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto"><Download className="h-8 w-8 text-primary" /></div>
              <h3 className="text-xl font-semibold">Static Upload</h3>
              <p className="text-muted-foreground">Upload threat logs, PCAP files, or CSV data for analysis.</p>
              <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors cursor-pointer">
                <p className="text-sm text-muted-foreground">Drag and drop files here or click to browse</p>
              </div>
            </div>
          </div>
        )
      case "api":
        return (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto"><MessageSquare className="h-8 w-8 text-primary" /></div>
              <h3 className="text-xl font-semibold">API Data Integration</h3>
              <p className="text-muted-foreground">Connect to external threat intelligence APIs and data feeds.</p>
              <Button>Configure API</Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
                <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <Hexagon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">AEGIS</h1>
                <p className="text-xs text-muted-foreground">Threat Intelligence Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                100% Secured
              </div>

              <Button variant="outline" size="sm" className="hidden md:flex gap-2 bg-transparent" onClick={() => setShowConnectDB(true)}>
                <Database className="h-4 w-4" />Connect DB
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 bg-transparent" onClick={() => setShowExport(true)}>
                <Download className="h-4 w-4" />Export
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 bg-transparent" onClick={() => setShowChat(true)}>
                <MessageSquare className="h-4 w-4" />Chat
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 bg-transparent" onClick={() => setShowHistorical(true)}>
                <History className="h-4 w-4" />History
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setAlertsEnabled(!alertsEnabled)} className={alertsEnabled ? "text-primary" : "text-muted-foreground"}>
                {alertsEnabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setShowSettings(true)}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        <StatsBar {...stats} />
        <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />
        {renderTabContent()}
      </main>

      <footer className="border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>AEGIS v2.1 - Threat Intelligence Platform</span>
            <span>Last sync: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </footer>

      <HistoricalAnalysis isOpen={showHistorical} onClose={() => setShowHistorical(false)} />
      <ConnectDBDialog isOpen={showConnectDB} onClose={() => setShowConnectDB(false)} />
      <ExportDialog isOpen={showExport} onClose={() => setShowExport(false)} />
      <ChatPanel isOpen={showChat} onClose={() => setShowChat(false)} />
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} settings={settings} onSettingsChange={setSettings} />
    </div>
  )
}
