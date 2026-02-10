export type ThreatType = "malware" | "ddos" | "phishing" | "ransomware" | "sql_injection" | "xss" | "brute_force" | "zero_day" | "man_in_the_middle" | "insider_threat"

export type Severity = "critical" | "high" | "medium" | "low"

export type ThreatStatus = "blocked" | "detected" | "investigating" | "resolved"

export interface Threat {
  id: string
  timestamp: Date
  type: ThreatType
  severity: Severity
  source: string
  target: string
  location: string
  status: ThreatStatus
  affectedSystems: number
  detectionTime: number
}

export const threatTypeLabels: Record<ThreatType, string> = {
  malware: "Malware",
  ddos: "DDoS Attack",
  phishing: "Phishing",
  ransomware: "Ransomware",
  sql_injection: "SQL Injection",
  xss: "XSS Attack",
  brute_force: "Brute Force",
  zero_day: "Zero-Day Exploit",
  man_in_the_middle: "Man-in-the-Middle",
  insider_threat: "Insider Threat",
}

export const severityColors: Record<Severity, string> = {
  critical: "hsl(0, 84%, 60%)",
  high: "hsl(25, 95%, 53%)",
  medium: "hsl(45, 93%, 47%)",
  low: "hsl(142, 71%, 45%)",
}

const threatTypes: ThreatType[] = Object.keys(threatTypeLabels) as ThreatType[]
const severities: Severity[] = ["critical", "high", "medium", "low"]
const statuses: ThreatStatus[] = ["blocked", "detected", "investigating", "resolved"]
const countries = ["United States", "China", "Russia", "Germany", "Brazil", "India", "United Kingdom", "Japan", "South Korea", "Australia", "France", "Iran", "North Korea", "Ukraine", "Canada"]

function randomIP(): string {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

export function generateThreat(): Threat {
  return {
    id: `T-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date(),
    type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    source: randomIP(),
    target: randomIP(),
    location: countries[Math.floor(Math.random() * countries.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    affectedSystems: Math.floor(Math.random() * 50) + 1,
    detectionTime: Math.floor(Math.random() * 120) + 1,
  }
}

export function generateThreats(count: number): Threat[] {
  return Array.from({ length: count }, () => generateThreat())
}
