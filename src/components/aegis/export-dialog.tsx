import { X, Download, FileText, Table, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ExportDialogProps {
  isOpen: boolean
  onClose: () => void
}

const formats = [
  { id: "csv", label: "CSV", icon: Table, desc: "Comma-separated values" },
  { id: "json", label: "JSON", icon: Code, desc: "Structured data format" },
  { id: "pdf", label: "PDF Report", icon: FileText, desc: "Formatted report" },
]

export function ExportDialog({ isOpen, onClose }: ExportDialogProps) {
  const [selected, setSelected] = useState("csv")
  const [exporting, setExporting] = useState(false)

  if (!isOpen) return null

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Export Data</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-3">
          {formats.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setSelected(fmt.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                selected === fmt.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted"
              }`}
            >
              <fmt.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{fmt.label}</p>
                <p className="text-xs text-muted-foreground">{fmt.desc}</p>
              </div>
            </button>
          ))}

          <Button onClick={handleExport} disabled={exporting} className="w-full mt-4">
            {exporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>
    </div>
  )
}
