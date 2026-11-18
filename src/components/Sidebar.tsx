import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TreeEvergreen, SquaresFour, GlobeHemisphereWest, Brain, ShieldWarning,
  Users, Lightbulb, Bell, ShieldCheck, CaretDown, Plus, X
} from "@phosphor-icons/react"
import { NAV_ITEMS, ROLES, type RoleType } from "@/data/mockForestData"

const iconMap: Record<string, React.FC<any>> = {
  SquaresFour, GlobeHemisphereWest, Brain, ShieldWarning, Users, Lightbulb, Bell, ShieldCheck,
}

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  role: RoleType
  onRoleChange: (role: RoleType) => void
  onReportIncident: () => void
  counts: Record<string, number>
}

export default function Sidebar({ activeView, onViewChange, role, onRoleChange, onReportIncident, counts }: SidebarProps) {
  const [roleOpen, setRoleOpen] = useState(false)
  const currentRole = ROLES.find(r => r.value === role)

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#0D2B1F] text-white flex flex-col z-50 shadow-2xl">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#16845B] flex items-center justify-center">
            <TreeEvergreen size={20} weight="fill" className="text-[#A3D977]" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">ForestGuard AI</h1>
            <p className="text-[10px] text-emerald-300/70 font-medium uppercase tracking-wider">Nigeria Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] || SquaresFour
          const isActive = activeView === item.id
          const count = counts[item.id] || 0
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-[#16845B]/20 text-[#A3D977] shadow-sm"
                  : "text-emerald-100/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} weight={isActive ? "fill" : "regular"} className={isActive ? "text-[#A3D977]" : "text-emerald-300/50 group-hover:text-emerald-200"} />
              <span className="flex-1 text-left">{item.label}</span>
              {count > 0 && (
                <span className={`min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  isActive ? "bg-[#A3D977] text-[#0D2B1F]" : "bg-white/10 text-emerald-200"
                }`}>
                  {count}
                </span>
              )}
              {isActive && (
                <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-[#A3D977]" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Role Switcher */}
      <div className="px-3 pb-3">
        <div className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[12px] text-emerald-100/80 hover:bg-white/10 transition-colors"
          >
            <Users size={14} className="text-[#A3D977]" />
            <span className="flex-1 text-left truncate">{currentRole?.label}</span>
            <CaretDown size={12} className={`transition-transform ${roleOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {roleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                className="absolute bottom-full mb-2 left-0 right-0 bg-[#1A4A35] rounded-lg border border-white/10 shadow-xl overflow-hidden"
              >
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => { onRoleChange(r.value); setRoleOpen(false) }}
                    className={`w-full px-3 py-2 text-[12px] text-left hover:bg-white/10 transition-colors ${
                      r.value === role ? "text-[#A3D977] font-medium bg-white/5" : "text-emerald-100/80"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Report CTA */}
      <div className="px-3 pb-4">
        <button
          onClick={onReportIncident}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#E53E3E] hover:bg-[#C53030] text-white text-[12px] font-semibold transition-colors shadow-lg shadow-red-900/30"
        >
          <Plus size={14} weight="bold" />
          Report Incident
        </button>
      </div>

      {/* Telemetry */}
      <div className="px-5 pb-4 border-t border-white/10 pt-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A3D977] animate-pulse" />
          <span className="text-[10px] text-emerald-200/60 font-medium">LIVE TELEMETRY ACTIVE</span>
        </div>
        <p className="text-[10px] text-emerald-200/40 mt-1">Last sync: 2 min ago</p>
      </div>
    </aside>
  )
}