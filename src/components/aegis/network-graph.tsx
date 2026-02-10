import { Network } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Node {
  id: string
  x: number
  y: number
  type: "server" | "attacker" | "firewall"
  label: string
}

interface Edge {
  from: string
  to: string
  active: boolean
}

export function NetworkGraph() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [nodes] = useState<Node[]>([
    { id: "fw", x: 50, y: 50, type: "firewall", label: "Firewall" },
    { id: "web", x: 30, y: 30, type: "server", label: "Web Server" },
    { id: "db", x: 70, y: 30, type: "server", label: "Database" },
    { id: "app", x: 50, y: 20, type: "server", label: "App Server" },
    { id: "a1", x: 15, y: 75, type: "attacker", label: "Attacker 1" },
    { id: "a2", x: 85, y: 75, type: "attacker", label: "Attacker 2" },
  ])

  const [edges] = useState<Edge[]>([
    { from: "a1", to: "fw", active: true },
    { from: "a2", to: "fw", active: true },
    { from: "fw", to: "web", active: false },
    { from: "fw", to: "db", active: false },
    { from: "web", to: "app", active: false },
    { from: "db", to: "app", active: false },
  ])

  const [activeEdge, setActiveEdge] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEdge((p) => (p + 1) % edges.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [edges.length])

  const getNodeColor = (type: string) => {
    switch (type) {
      case "attacker": return "bg-red-500"
      case "firewall": return "bg-amber-500"
      default: return "bg-primary"
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Network className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-medium">Network Topology</span>
      </div>

      <div ref={canvasRef} className="relative h-48 bg-muted/30 rounded-lg overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from)!
            const to = nodes.find((n) => n.id === edge.to)!
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={i === activeEdge ? "hsl(0, 84%, 60%)" : "hsl(var(--border))"}
                strokeWidth={i === activeEdge ? 2 : 1}
                strokeDasharray={i === activeEdge ? "5,3" : "none"}
                className={i === activeEdge ? "animate-data-flow" : ""}
              />
            )
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className={`w-4 h-4 rounded-full ${getNodeColor(node.type)} shadow-lg ${node.type === "attacker" ? "animate-pulse" : ""}`} />
            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
