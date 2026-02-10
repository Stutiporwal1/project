import { BarChart3, Radio, Target, Globe, Search, Network, Brain, Upload, Plug } from "lucide-react"

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "threat-feed", label: "Threat Feed", icon: Radio },
  { id: "incident", label: "Incidents", icon: Target },
  { id: "threat-intel", label: "Threat Intel", icon: Globe },
  { id: "ip-verify", label: "IP Verify", icon: Search },
  { id: "network", label: "Network", icon: Network },
  { id: "ai-predictions", label: "AI Predictions", icon: Brain },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "api", label: "API", icon: Plug },
]

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </button>
      ))}
    </div>
  )
}
