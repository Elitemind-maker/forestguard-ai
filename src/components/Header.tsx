import { useState } from "react"
import { motion } from "framer-motion"
import { MagnifyingGlass, Bell, GlobeHemisphereWest, CaretDown } from "@phosphor-icons/react"
import { monitoringZones } from "@/data/mockForestData"

interface HeaderProps {
  activeView: string
  viewLabel: string
}

export default function Header({ activeView, viewLabel }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedZone, setSelectedZone] = useState("All Zones")

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#16845B]/10 px-6 py-3 flex items-center gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <GlobeHemisphereWest size={16} className="text-[#16845B]" />
        <span className="text-[#123B2A]/50 font-medium">ForestGuard</span>
        <span className="text-[#123B2A]/30">/</span>
        <span className="text-[#123B2A] font-semibold">{viewLabel}</span>
      </div>

      <div className="flex-1" />

      {/* Zone Selector */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F8F5] border border-[#16845B]/10">
        <span className="text-[11px] text-[#123B2A]/60 font-medium">Zone:</span>
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="text-[12px] font-medium text-[#123B2A] bg-transparent outline-none cursor-pointer"
        >
          <option>All Zones</option>
          {monitoringZones.map(z => <option key={z.id}>{z.name}</option>)}
        </select>
        <CaretDown size={12} className="text-[#123B2A]/40" />
      </div>

      {/* Search */}
      <motion.div
        className={`flex items-center gap-2 rounded-lg border transition-all ${
          searchOpen ? "w-56 border-[#16845B]/30 bg-white px-3" : "w-8 border-transparent bg-[#F5F8F5] justify-center"
        }`}
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <MagnifyingGlass size={15} className="text-[#123B2A]/50 shrink-0" />
        {searchOpen && (
          <input
            autoFocus
            placeholder="Search detections, zones..."
            className="bg-transparent text-[12px] outline-none w-full py-1.5 text-[#123B2A]"
          />
        )}
      </motion.div>

      {/* Demo Badge */}
      <span className="hidden lg:inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide border border-amber-200">
        Demonstration Data
      </span>

      {/* Notifications */}
      <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-[#F5F8F5] hover:bg-[#16845B]/10 transition-colors">
        <Bell size={16} className="text-[#123B2A]/60" />
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E53E3E] text-white text-[9px] font-bold flex items-center justify-center">3</span>
      </button>

      {/* Telemetry */}
      <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#16845B]/15">
        <span className="w-1.5 h-1.5 rounded-full bg-[#16845B] animate-pulse" />
        <span className="text-[10px] font-semibold text-[#16845B]">LIVE</span>
      </div>
    </header>
  )
}
