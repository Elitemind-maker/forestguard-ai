import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from "sonner"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import OverviewDashboard from "@/components/OverviewDashboard"
import SatelliteMapCentre from "@/components/SatelliteMapCentre"
import DetectionAndRiskEngine from "@/components/DetectionAndRiskEngine"
import CommunityAndAdminPortal from "@/components/CommunityAndAdminPortal"
import { NAV_ITEMS, type RoleType } from "@/data/mockForestData"

export default function App() {
  const [activeView, setActiveView] = useState("overview")
  const [role, setRole] = useState<RoleType>("conservation_officer")
  const [showReportForm, setShowReportForm] = useState(false)

  const counts: Record<string, number> = {
    alerts: 3,
    community: 2,
    detection: 4,
    risk: 2,
  }

  const viewLabel = NAV_ITEMS.find(n => n.id === activeView)?.label || "Overview"

  const renderView = () => {
    switch (activeView) {
      case "overview": return <OverviewDashboard />
      case "satellite": return <SatelliteMapCentre />
      case "detection": return <DetectionAndRiskEngine />
      case "risk": return <DetectionAndRiskEngine />
      case "community": return <CommunityAndAdminPortal activeView="community" />
      case "insights": return <CommunityAndAdminPortal activeView="insights" />
      case "alerts": return <CommunityAndAdminPortal activeView="alerts" />
      case "admin": return <CommunityAndAdminPortal activeView="admin" />
      default: return <OverviewDashboard />
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#F5F8F5]">
      <Toaster richColors position="top-right" closeButton />
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        role={role}
        onRoleChange={setRole}
        onReportIncident={() => { setActiveView("community"); setShowReportForm(true) }}
        counts={counts}
      />
      <div className="ml-[260px]">
        <Header activeView={activeView} viewLabel={viewLabel} />
        <AnimatePresence mode="wait">
          <motion.main
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
