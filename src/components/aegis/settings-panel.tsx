import { X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export interface DashboardSettings {
  refreshInterval: number
  layout: "default" | "compact" | "expanded"
  showAnimations: boolean
}

export const defaultSettings: DashboardSettings = {
  refreshInterval: 5,
  layout: "default",
  showAnimations: true,
}

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  settings: DashboardSettings
  onSettingsChange: (settings: DashboardSettings) => void
}

export function SettingsPanel({ isOpen, onClose, settings, onSettingsChange }: SettingsPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Refresh Interval (seconds)</Label>
            <select
              value={settings.refreshInterval}
              onChange={(e) => onSettingsChange({ ...settings, refreshInterval: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            >
              <option value={3}>3s</option>
              <option value={5}>5s</option>
              <option value={10}>10s</option>
              <option value={30}>30s</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Layout</Label>
            <div className="flex gap-2">
              {(["default", "compact", "expanded"] as const).map((layout) => (
                <button
                  key={layout}
                  onClick={() => onSettingsChange({ ...settings, layout })}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors capitalize ${
                    settings.layout === layout
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  {layout}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Animations</Label>
            <button
              onClick={() => onSettingsChange({ ...settings, showAnimations: !settings.showAnimations })}
              className={`w-10 h-6 rounded-full transition-colors ${
                settings.showAnimations ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${
                  settings.showAnimations ? "translate-x-4" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
