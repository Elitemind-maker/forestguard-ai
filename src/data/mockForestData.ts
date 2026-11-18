// Types
export type RoleType = "conservation_officer" | "lead_analyst" | "field_ranger" | "community_monitor"
export type SeverityLevel = "critical" | "high" | "medium" | "low"
export type DetectionType = "deforestation" | "degradation"
export type ReportStatus = "pending_review" | "under_investigation" | "verified" | "rejected"
export type AlertStatus = "active" | "acknowledged" | "resolved"
export type LayerType = "optical" | "ndvi" | "thermal" | "canopy" | "boundary"

export interface MonitoringZone {
  id: string
  name: string
  state: string
  lga: string
  lat: number
  lng: number
  areaHa: number
  canopyCover: number
  riskScore: number
  activeAlerts: number
  ecosystemType: string
}

export interface DetectionEvent {
  id: string
  zoneId: string
  date: string
  severity: SeverityLevel
  type: DetectionType
  confidence: number
  ndviDrop: number
  areaHa: number
  cloudCover: number
  cause: string
  verified: boolean
  lat: number
  lng: number
}

export interface CommunityReport {
  id: string
  reporter: string
  date: string
  disturbanceType: string
  description: string
  lat: number
  lng: number
  state: string
  urgency: SeverityLevel
  status: ReportStatus
  photoAttached: boolean
  contact: string
}

export interface RiskHotspot {
  id: string
  zoneName: string
  compositeScore: number
  satelliteAnomaly: number
  disturbanceArea: number
  historicalFreq: number
  communityRecurrence: number
  priorityAction: string
  trend: "rising" | "stable" | "falling"
}

export interface AlertNotification {
  id: string
  title: string
  category: string
  severity: SeverityLevel
  status: AlertStatus
  timestamp: string
  zone: string
  description: string
}

export interface ConservationInsight {
  id: string
  title: string
  recommendation: string
  impact: string
  confidence: number
  category: string
}

// Mock Data
export const ROLES: { value: RoleType; label: string }[] = [
  { value: "conservation_officer", label: "Conservation Officer" },
  { value: "lead_analyst", label: "Lead Analyst" },
  { value: "field_ranger", label: "Field Ranger" },
  { value: "community_monitor", label: "Community Monitor" },
]

export const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "SquaresFour" },
  { id: "satellite", label: "Satellite Monitoring", icon: "GlobeHemisphereWest" },
  { id: "detection", label: "Forest Detection", icon: "Brain" },
  { id: "risk", label: "Risk Intelligence", icon: "ShieldWarning" },
  { id: "community", label: "Community Reports", icon: "Users" },
  { id: "insights", label: "Conservation Insights", icon: "Lightbulb" },
  { id: "alerts", label: "Alert Centre", icon: "Bell" },
  { id: "admin", label: "Admin / Verification", icon: "ShieldCheck" },
]

export const monitoringZones: MonitoringZone[] = [
  { id: "z1", name: "Cross River National Park", state: "Cross River", lga: "Bekwarra", lat: 6.842, lng: 9.032, areaHa: 3160, canopyCover: 87.2, riskScore: 72, activeAlerts: 4, ecosystemType: "Tropical Rainforest" },
  { id: "z2", name: "Omo Forest Reserve", state: "Ogun", lga: "Ado-Odo/Ota", lat: 7.082, lng: 2.948, areaHa: 5480, canopyCover: 71.4, riskScore: 64, activeAlerts: 3, ecosystemType: "Lowland Rainforest" },
  { id: "z3", name: "Gashaka-Gumti National Park", state: "Taraba", lga: "Gashaka", lat: 7.667, lng: 11.333, areaHa: 6604, canopyCover: 79.8, riskScore: 58, activeAlerts: 2, ecosystemType: "Montane Forest" },
  { id: "z4", name: "Sambisa Forest Reserve", state: "Borno", lga: "Guzamala", lat: 11.75, lng: 12.167, areaHa: 11100, canopyCover: 42.3, riskScore: 81, activeAlerts: 6, ecosystemType: "Sudanian Savanna Woodland" },
  { id: "z5", name: "Afi Mountain Wildlife Sanctuary", state: "Cross River", lga: "Yakurr", lat: 7.017, lng: 8.833, areaHa: 1200, canopyCover: 91.5, riskScore: 45, activeAlerts: 1, ecosystemType: "Primary Rainforest" },
  { id: "z6", name: "Idanre Hills Forest", state: "Ondo", lga: "Idanre", lat: 7.083, lng: 5.15, areaHa: 972, canopyCover: 68.1, riskScore: 55, activeAlerts: 2, ecosystemType: "Montane Island Forest" },
  { id: "z7", name: "Ngel Nyaki Forest Reserve", state: "Taraba", lga: "Wukari", lat: 7.533, lng: 10.417, areaHa: 2400, canopyCover: 82.6, riskScore: 38, activeAlerts: 1, ecosystemType: "Sub-montane Forest" },
]

export const detectionEvents: DetectionEvent[] = [
  { id: "d1", zoneId: "z4", date: "2025-01-14", severity: "critical", type: "deforestation", confidence: 94.2, ndviDrop: 0.31, areaHa: 47.8, cloudCover: 3.1, cause: "Illegal Logging", verified: false, lat: 11.752, lng: 12.169 },
  { id: "d2", zoneId: "z1", date: "2025-01-12", severity: "high", type: "degradation", confidence: 88.7, ndviDrop: 0.19, areaHa: 23.4, cloudCover: 8.2, cause: "Bush Burning", verified: true, lat: 6.845, lng: 9.035 },
  { id: "d3", zoneId: "z2", date: "2025-01-10", severity: "high", type: "deforestation", confidence: 91.3, ndviDrop: 0.27, areaHa: 35.1, cloudCover: 2.4, cause: "Agriculture Encroachment", verified: true, lat: 7.084, lng: 2.951 },
  { id: "d4", zoneId: "z3", date: "2025-01-08", severity: "medium", type: "degradation", confidence: 76.4, ndviDrop: 0.14, areaHa: 12.8, cloudCover: 15.3, cause: "Mining Activity", verified: false, lat: 7.669, lng: 11.335 },
  { id: "d5", zoneId: "z4", date: "2025-01-06", severity: "critical", type: "deforestation", confidence: 96.1, ndviDrop: 0.35, areaHa: 62.3, cloudCover: 1.8, cause: "Charcoal Production", verified: true, lat: 11.748, lng: 12.172 },
  { id: "d6", zoneId: "z5", date: "2025-01-04", severity: "low", type: "degradation", confidence: 68.9, ndviDrop: 0.08, areaHa: 5.2, cloudCover: 22.1, cause: "Selective Logging", verified: false, lat: 7.019, lng: 8.835 },
  { id: "d7", zoneId: "z6", date: "2025-01-02", severity: "medium", type: "deforestation", confidence: 82.3, ndviDrop: 0.18, areaHa: 18.7, cloudCover: 6.7, cause: "Land Clearing", verified: true, lat: 7.085, lng: 5.152 },
  { id: "d8", zoneId: "z1", date: "2024-12-28", severity: "high", type: "deforestation", confidence: 89.5, ndviDrop: 0.24, areaHa: 29.6, cloudCover: 4.2, cause: "Illegal Logging", verified: true, lat: 6.840, lng: 9.030 },
]

export const communityReports: CommunityReport[] = [
  { id: "c1", reporter: "Emeka Okonkwo", date: "2025-01-13", disturbanceType: "Illegal Logging", description: "Multiple chainsaw operators spotted near river bend at dawn. Approximately 15 large trees felled.", lat: 6.843, lng: 9.034, state: "Cross River", urgency: "critical", status: "under_investigation", photoAttached: true, contact: "+234-803-XXX-1234" },
  { id: "c2", reporter: "Amina Bello", date: "2025-01-11", disturbanceType: "Bush Burning", description: "Controlled burn escaped into protected zone. Smoke visible for 3km. Fire spreading toward eastern boundary.", lat: 7.083, lng: 2.950, state: "Ogun", urgency: "high", status: "verified", photoAttached: true, contact: "+234-812-XXX-5678" },
  { id: "c3", reporter: "Tunde Adeyemi", date: "2025-01-09", disturbanceType: "Land Clearing", description: "Excavator clearing forest edge for commercial agriculture. No permit displayed.", lat: 7.084, lng: 5.151, state: "Ondo", urgency: "medium", status: "pending_review", photoAttached: false, contact: "+234-705-XXX-9012" },
  { id: "c4", reporter: "Fatima Yusuf", date: "2025-01-07", disturbanceType: "Charcoal Production", description: "Active charcoal kilns operating within reserve boundary. Heavy smoke and tree stumps observed.", lat: 11.750, lng: 12.170, state: "Borno", urgency: "critical", status: "verified", photoAttached: true, contact: "+234-903-XXX-3456" },
  { id: "c5", reporter: "Chidi Nwosu", date: "2025-01-05", disturbanceType: "Wildlife Poaching", description: "Snare traps found along game trail. Two colobus monkeys observed trapped.", lat: 7.018, lng: 8.834, state: "Cross River", urgency: "high", status: "under_investigation", photoAttached: true, contact: "+234-809-XXX-7890" },
  { id: "c6", reporter: "Grace Ekanem", date: "2025-01-03", disturbanceType: "Forest Encroachment", description: "New settlement structures erected within 200m of protected boundary markers.", lat: 7.668, lng: 11.334, state: "Taraba", urgency: "medium", status: "pending_review", photoAttached: false, contact: "+234-706-XXX-2345" },
]

export const riskHotspots: RiskHotspot[] = [
  { id: "r1", zoneName: "Sambisa Forest Reserve", compositeScore: 81, satelliteAnomaly: 88, disturbanceArea: 79, historicalFreq: 75, communityRecurrence: 82, priorityAction: "Drone Reconnaissance + Military Escort", trend: "rising" },
  { id: "r2", zoneName: "Cross River National Park", compositeScore: 72, satelliteAnomaly: 74, disturbanceArea: 68, historicalFreq: 71, communityRecurrence: 75, priorityAction: "Forestry Commission Dispatch", trend: "stable" },
  { id: "r3", zoneName: "Omo Forest Reserve", compositeScore: 64, satelliteAnomaly: 62, disturbanceArea: 71, historicalFreq: 58, communityRecurrence: 67, priorityAction: "Community Dialogue + Buffer Enforcement", trend: "rising" },
  { id: "r4", zoneName: "Gashaka-Gumti National Park", compositeScore: 58, satelliteAnomaly: 55, disturbanceArea: 60, historicalFreq: 52, communityRecurrence: 65, priorityAction: "Patrol Frequency Increase", trend: "stable" },
  { id: "r5", zoneName: "Idanre Hills Forest", compositeScore: 55, satelliteAnomaly: 50, disturbanceArea: 58, historicalFreq: 62, communityRecurrence: 48, priorityAction: "Ranger Deployment", trend: "falling" },
]

export const alerts: AlertNotification[] = [
  { id: "a1", title: "Critical Canopy Loss Detected", category: "Critical Hotspots", severity: "critical", status: "active", timestamp: "2025-01-14T08:23:00", zone: "Sambisa Forest Reserve", description: "47.8 Ha deforested in 72 hours. NDVI drop of 0.31 confirmed by Sentinel-2 pass." },
  { id: "a2", title: "Unconfirmed Bushfire Anomaly", category: "Bushfire Anomaly", severity: "high", status: "active", timestamp: "2025-01-13T14:05:00", zone: "Cross River National Park", description: "VIIRS thermal hotspot cluster with 3 active burn points near Bekwarra corridor." },
  { id: "a3", title: "Logging Report Escalated", category: "Logging Reports", severity: "high", status: "acknowledged", timestamp: "2025-01-12T09:40:00", zone: "Omo Forest Reserve", description: "Community report verified by satellite. 35 Ha cleared for agriculture." },
  { id: "a4", title: "Protected Boundary Breach", category: "Boundary Breaches", severity: "critical", status: "active", timestamp: "2025-01-11T16:30:00", zone: "Gashaka-Gumti National Park", description: "New settlement structures 180m inside gazetted boundary. GPS coordinates logged." },
  { id: "a5", title: "Charcoal Kiln Operations", category: "Logging Reports", severity: "medium", status: "resolved", timestamp: "2025-01-09T11:15:00", zone: "Sambisa Forest Reserve", description: "Ranger team confirmed and dismantled 4 active kilns." },
  { id: "a6", title: "Accelerated Canopy Thinning", category: "Critical Hotspots", severity: "medium", status: "acknowledged", timestamp: "2025-01-08T07:50:00", zone: "Idanre Hills Forest", description: "Canopy height model shows 12% reduction in eastern sector over 6 months." },
]

export const conservationInsights: ConservationInsight[] = [
  { id: "i1", title: "Corridor Restoration Priority", recommendation: "Re-establish 2.3km forest corridor between Cross River and Afi Mountain to reconnect isolated primate populations.", impact: "High biodiversity gain, reduces edge effects by 34%", confidence: 87, category: "Biodiversity" },
  { id: "i2", title: "Community Carbon Incentive", recommendation: "Deploy REDD+ payment scheme for 5 border communities in Sambisa zone to reduce charcoal dependency.", impact: "Estimated 40% reduction in charcoal-driven deforestation", confidence: 79, category: "Livelihoods" },
  { id: "i3", title: "Buffer Zone Enforcement", recommendation: "Install GPS-monitored boundary markers at 12 critical breach points in Gashaka-Gumti with automated alert triggers.", impact: "Prevents 60% of encroachment events within first year", confidence: 91, category: "Governance" },
  { id: "i4", title: "Agroforestry Transition", recommendation: "Partner with Omo reserve communities to shift from slash-and-burn to cacao/coffee agroforestry within 500m buffer.", impact: "Sustainable income for 1,200 households, 28% less forest pressure", confidence: 82, category: "Agriculture" },
  { id: "i5", title: "Firebreak Network", recommendation: "Create 8km firebreak grid in Cross River eastern sector ahead of dry season (November-February).", impact: "Reduces uncontrolled fire spread risk by 55%", confidence: 85, category: "Fire Management" },
]

// Time series for charts
export const monthlyTrends = [
  { month: "Feb", forestLoss: 142, reforestation: 38 },
  { month: "Mar", forestLoss: 189, reforestation: 45 },
  { month: "Apr", forestLoss: 98, reforestation: 72 },
  { month: "May", forestLoss: 67, reforestation: 95 },
  { month: "Jun", forestLoss: 54, reforestation: 112 },
  { month: "Jul", forestLoss: 78, reforestation: 88 },
  { month: "Aug", forestLoss: 112, reforestation: 64 },
  { month: "Sep", forestLoss: 156, reforestation: 42 },
  { month: "Oct", forestLoss: 203, reforestation: 35 },
  { month: "Nov", forestLoss: 245, reforestation: 28 },
  { month: "Dec", forestLoss: 198, reforestation: 41 },
  { month: "Jan", forestLoss: 176, reforestation: 52 },
]

export const disturbanceCauses = [
  { name: "Illegal Logging", value: 34, color: "#E53E3E" },
  { name: "Bush Burning", value: 22, color: "#DD6B20" },
  { name: "Agriculture", value: 26, color: "#16845B" },
  { name: "Mining", value: 11, color: "#805AD5" },
  { name: "Charcoal", value: 7, color: "#A3D977" },
]

export const regionalRisk = [
  { region: "Cross River", risk: 72, alerts: 4 },
  { region: "Borno", risk: 81, alerts: 6 },
  { region: "Ogun", risk: 64, alerts: 3 },
  { region: "Taraba", risk: 58, alerts: 2 },
  { region: "Ondo", risk: 55, alerts: 2 },
]
