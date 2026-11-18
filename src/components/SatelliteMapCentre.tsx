import { useState } from "react"
import { motion } from "framer-motion"
import { GlobeHemisphereWest, Stack, MapPin, Eye, Crosshair } from "@phosphor-icons/react"
import { monitoringZones, type LayerType } from "@/data/mockForestData"

const layers: { id: LayerType; label: string; color: string }[] = [
  { id: "optical", label: "True Color Optical", color: "#16845B" },
  { id: "ndvi", label: "False-Color NDVI", color: "#DD6B20" },
  { id: "thermal", label: "Thermal / Fire Hotspots", color: "#E53E3E" },
  { id: "canopy", label: "Canopy Height Model", color: "#805AD5" },
  { id: "boundary", label: "Protected Boundaries", color: "#A3D977" },
]

export default function SatelliteMapCentre() {
  const [activeLayer, setActiveLayer] = useState<LayerType>("optical")
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [sliderPos, setSliderPos] = useState(50)

  const zone = monitoringZones.find(z => z.id === selectedZone)

  return (
    <div className="p-6 space-y-5">
      {/* Demo Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200">
        <Eye size={16} className="text-amber-600" />
        <span className="text-[12px] font-semibold text-amber-700">DEMONSTRATION DATA</span>
        <span className="text-[11px] text-amber-600/80">Satellite imagery simulated for illustration purposes</span>
      </div>

      {/* Layer Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <Stack size={16} className="text-[#123B2A]/60" />
        <span className="text-[11px] font-semibold text-[#123B2A]/60 mr-2">Layers:</span>
        {layers.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLayer(l.id)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
              activeLayer === l.id
                ? "bg-[#123B2A] text-white border-[#123B2A] shadow-sm"
                : "bg-white text-[#123B2A]/70 border-[#16845B]/15 hover:border-[#16845B]/40"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="relative rounded-xl overflow-hidden border border-[#16845B]/15 shadow-lg bg-[#0D2B1F]">
        <svg viewBox="0 0 800 500" className="w-full h-[400px] md:h-[500px]">
          {/* Nigeria outline simplified */}
          <path
            d="M 200,80 L 280,60 L 380,50 L 480,70 L 560,100 L 620,140 L 660,200 L 680,280 L 660,340 L 620,380 L 560,420 L 480,440 L 400,450 L 320,440 L 240,420 L 180,380 L 140,320 L 130,260 L 140,200 L 160,140 Z"
            fill={activeLayer === "ndvi" ? "#1a4a2e" : activeLayer === "thermal" ? "#2d1b1b" : activeLayer === "canopy" ? "#1a2d4a" : "#163B2A"}
            stroke="#A3D977"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="100" y1={60 + i * 55} x2="700" y2={60 + i * 55} stroke="#A3D977" strokeWidth="0.3" opacity="0.2" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={100 + i * 65} y1="50" x2={100 + i * 65} y2="460" stroke="#A3D977" strokeWidth="0.3" opacity="0.2" />
          ))}
          {/* Zone pins */}
          {monitoringZones.map((z, i) => {
            const x = 150 + ((z.lng - 2.5) / 10) * 550
            const y = 450 - ((z.lat - 4.5) / 8) * 400
            return (
              <g key={z.id} onClick={() => setSelectedZone(z.id)} className="cursor-pointer">
                <circle cx={x} cy={y} r={selectedZone === z.id ? 14 : 10}
                  fill={z.riskScore > 70 ? "#E53E3E" : z.riskScore > 50 ? "#DD6B20" : "#16845B"}
                  opacity={selectedZone === z.id ? 1 : 0.8}
                  stroke="#fff" strokeWidth={selectedZone === z.id ? 2 : 1}
                />
                <circle cx={x} cy={y} r={20} fill="none" stroke={z.riskScore > 70 ? "#E53E3E" : "#16845B"} strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" from="12" to="24" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x={x} y={y + 3} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{i + 1}</text>
              </g>
            )
          })}
        </svg>

        {/* Map Legend */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-3">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E53E3E]" /><span className="text-[9px] text-white/80">Critical</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#DD6B20]" /><span className="text-[9px] text-white/80">High</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#16845B]" /><span className="text-[9px] text-white/80">Moderate</span></div>
        </div>

        {/* Zone Detail Tooltip */}
        {zone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 right-3 w-56 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-[#16845B]/15"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-bold text-[#123B2A]">{zone.name}</h4>
              <button onClick={() => setSelectedZone(null)} className="text-[#123B2A]/40 hover:text-[#123B2A] text-xs">&times;</button>
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between"><span className="text-[#123B2A]/60">State:</span><span className="font-medium text-[#123B2A]">{zone.state}</span></div>
              <div className="flex justify-between"><span className="text-[#123B2A]/60">LGA:</span><span className="font-medium text-[#123B2A]">{zone.lga}</span></div>
              <div className="flex justify-between"><span className="text-[#123B2A]/60">Coordinates:</span><span className="font-medium text-[#123B2A]">{zone.lat.toFixed(3)}, {zone.lng.toFixed(3)}</span></div>
              <div className="flex justify-between"><span className="text-[#123B2A]/60">Area:</span><span className="font-medium text-[#123B2A]">{zone.areaHa.toLocaleString()} Ha</span></div>
              <div className="flex justify-between"><span className="text-[#123B2A]/60">Canopy:</span><span className="font-medium text-[#16845B]">{zone.canopyCover}%</span></div>
              <div className="flex justify-between"><span className="text-[#123B2A]/60">Risk Score:</span><span className={`font-bold ${zone.riskScore > 70 ? "text-red-600" : zone.riskScore > 50 ? "text-amber-600" : "text-emerald-600"}`}>{zone.riskScore}/100</span></div>
              <div className="flex justify-between"><span className="text-[#123B2A]/60">Ecosystem:</span><span className="font-medium text-[#123B2A]">{zone.ecosystemType}</span></div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Before/After Slider */}
      <div className="bg-white rounded-xl border border-[#16845B]/10 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#123B2A] flex items-center gap-2">
            <Crosshair size={16} className="text-[#16845B]" />
            Before/After Satellite Comparison
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold border border-amber-200">DEMO DATA</span>
        </div>

        <div className="relative rounded-lg overflow-hidden h-[280px] border border-[#16845B]/10">
          {/* Before (2022 baseline) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
            <div className="w-full h-full bg-gradient-to-br from-[#1a5c3a] via-[#16845B] to-[#0D4A2A] flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/90 text-lg font-bold">2022 Baseline</p>
                <p className="text-white/60 text-xs mt-1">Canopy Cover: 87.2% | Dense forest</p>
                <div className="mt-3 grid grid-cols-6 gap-1 opacity-40">
                  {[...Array(24)].map((_, i) => <div key={i} className="w-4 h-4 rounded-sm bg-[#A3D977]" />)}
                </div>
              </div>
            </div>
          </div>
          {/* After (2025 current) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${sliderPos}%` }}>
            <div className="w-full h-full bg-gradient-to-br from-[#3d2b1a] via-[#6b4423] to-[#8b5e3c] flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/90 text-lg font-bold">2025 Current</p>
                <p className="text-white/60 text-xs mt-1">Canopy Cover: 61.4% | Disturbance detected</p>
                <div className="mt-3 grid grid-cols-6 gap-1 opacity-40">
                  {[...Array(24)].map((_, i) => <div key={i} className={`w-4 h-4 rounded-sm ${i < 14 ? "bg-[#A3D977]" : "bg-[#E53E3E]"}`} />)}
                </div>
              </div>
            </div>
          </div>
          {/* Slider handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize" style={{ left: `${sliderPos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-[#16845B]">
              <GlobeHemisphereWest size={14} className="text-[#16845B]" />
            </div>
          </div>
          {/* Range input overlay */}
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>

        <div className="flex justify-between mt-3 text-[11px] text-[#123B2A]/50 font-medium">
          <span>← 2022 Baseline (Sentinel-2 L2A)</span>
          <span>2025 Current (Landsat-9) →</span>
        </div>
      </div>
    </div>
  )
}
