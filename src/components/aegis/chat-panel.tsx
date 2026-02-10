import { useState, useRef, useEffect } from "react"
import { X, MessageSquare, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AEGIS Security Assistant. I can help you analyze threats, explain security events, and provide recommendations. How can I help you today?",
    timestamp: new Date(),
  },
]

const quickResponses = [
  "What are the current critical threats?",
  "Explain the latest DDoS attack",
  "Show me blocked attack trends",
  "Recommend security improvements",
]

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase()
    if (lower.includes("critical") || lower.includes("threat")) return "Currently monitoring 12 critical threats. The most significant is a coordinated DDoS attack originating from Eastern Europe, targeting API endpoints. I recommend enabling enhanced rate limiting."
    if (lower.includes("ddos")) return "The latest DDoS attack peaked at 2.3 Gbps from a botnet spanning 47 countries. Our systems automatically mitigated it via traffic scrubbing and CDN failover."
    if (lower.includes("blocked") || lower.includes("trends")) return "Over 24h, we blocked 892 attacks: 45% DDoS, 28% SQLi, 15% XSS, 12% credential stuffing. Volume is up 23% vs last week."
    if (lower.includes("recommend") || lower.includes("improve")) return "Recommendations: 1) Additional rate limiting on login endpoints, 2) MFA for all admin accounts, 3) Update WAF rules, 4) Schedule penetration test."
    return "I can help with threat analysis, attack explanations, trend reports, or security recommendations. Could you be more specific?"
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)
    await new Promise((r) => setTimeout(r, 1500))
    const response = generateResponse(input)
    setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() }])
    setIsTyping(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm -z-10" onClick={onClose} />
      <div className="flex flex-col h-full bg-card border-l border-border shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg"><MessageSquare className="h-5 w-5 text-primary" /></div>
            <div>
              <h2 className="font-semibold">Security Assistant</h2>
              <p className="text-xs text-muted-foreground">AI-powered threat analysis</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary" : "bg-muted"}`}>
                {msg.role === "user" ? <User className="h-4 w-4 text-primary-foreground" /> : <Bot className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <p className="text-sm">{msg.content}</p>
                <p className="text-[10px] opacity-60 mt-1">{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center"><Bot className="h-4 w-4 text-muted-foreground" /></div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickResponses.map((text, idx) => (
              <button key={idx} onClick={() => setInput(text)} className="flex-shrink-0 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors">{text}</button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about threats..." className="flex-1" />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </div>
    </div>
  )
}
