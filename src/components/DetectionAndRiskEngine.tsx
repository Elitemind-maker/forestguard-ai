import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, ShieldWarning, List, Eye, X, MapPin, TrendUp, TrendDown } from "@phosphor-icons/react"
import { detectionEvents, riskHotspots, monitoringZones, type SeverityLevel, type DetectionType } from "@/data/mockForestData"

export default function DetectionAndRiskEngine() {
  const [selectedDetection, setSelectedDetection] = useState<string | null>(null)
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "all">("all")
  const [typeFilter, setTypeFilter] = useState<DetectionType | "all">("all")

  const filtered = detectionEvents.filter(d => {
    if (severityFilter !== "all" && d.severity !== severityFilter) return false
    if (typeFilter !== "all" && d.type !== typeFilter) return false
    return true
  })

  const detection = detectionEvents.find(d => d.id === selectedDetection)
  const zone = detection ? monitoringZones.find(z => z.id === detection.zoneId) : null

  return (
    <div className="p-6 space-y-5">
      {/* AI Detection Section */}
      <div className="bg-white rounded-xl border border-[#16845B]/10 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#16845B]/8 flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-sm font-semibold text-[#123B2A] flex items-center gap-2">
            <Brain size={18} className="text-[#16845B]" />
            AI Forest Detection Engine
          </h3>
          <div className="flex items-center gap-2">
            <List size={14} className="text-[#123B2A]/40" />
            <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value as any)} className="text-[11px] px-2 py-1 rounded border border-[#16845B]/15 bg-[#F5F8F5] text-[#123B2A] outline-none">
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)} className="text-[11px] px-2 py-1 rounded border border-[#16845B]/15 bg-[#F5F8F5] text-[#123B2A] outline-none">
              <option value="all">All Types</option>
              <option value="deforestation">Deforestation</option>
              <option value="degradation">Degradation</option>
            </select>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold border border-amber-200">DEMO</span>
          </div>
        </div>

        {/* Detection Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="bg-[#F5F8F5]">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Date</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Cause</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Type</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Severity</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Area (Ha)</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Confidence</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Status</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <motion.tr
                  key={d.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-[#16845B]/5 hover:bg-[#F5F8F5]/50"
                >
                  <td className="px-4 py-2.5 text-[#123B2A]/70">{d.date}</td>
                  <td className="px-4 py-2.5 font-medium text-[#123B2A]">{d.cause}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${d.type === "deforestation" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                      {d.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      d.severity === "critical" ? "bg-red-100 text-red-700" : d.severity === "high" ? "bg-orange-100 text-orange-700" : d.severity === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                    }`}>{d.severity}</span>
                  </td>
                  <td className="px-4 py-2.5 font-medium text-[#123B2A]">{d.areaHa}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#16845B]/10 overflow-hidden">
                        <div className="h-full rounded-full bg-[#16845B]" style={{ width: `${d.confidence}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-[#123B2A]">{d.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] font-semibold ${d.verified ? "text-emerald-600" : "text-[#123B2A]/40"}`}>
                      {d.verified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => setSelectedDetection(d.id)} className="text-[11px] px-2 py-1 rounded bg-[#16845B]/10 text-[#16845B] font-medium hover:bg-[#16845B]/20 transition-colors flex items-center gap-1">
                      <Eye size={12} /> Inspect
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Intelligence */}
      <div className="bg-white rounded-xl border border-[#16845B]/10 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#16845B]/8 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#123B2A] flex items-center gap-2">
            <ShieldWarning size={18} className="text-[#DD6B20]" />
            Forest Risk Intelligence
          </h3>
          <span className="text-[10px] text-[#123B2A]/50">Composite = Satellite(40%) + Area(25%) + History(20%) + Community(15%)</span>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskHotspots.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-lg border border-[#16845B]/10 bg-[#F5F8F5] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[12px] font-bold text-[#123B2A]">{r.zoneName}</h4>
                <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${r.trend === "rising" ? "text-red-600" : r.trend === "falling" ? "text-emerald-600" : "text-[#123B2A]/50"}`}>
                  {r.trend === "rising" ? <TrendUp size={12} /> : r.trend === "falling" ? <TrendDown size={12} /> : null}
                  {r.trend}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: r.compositeScore > 70 ? "#E53E3E" : r.compositeScore > 50 ? "#DD6B20" : "#16845B" }}>
                  {r.compositeScore}
                </div>
                <div className="flex-1 space-y-1">
                  {[
                    { label: "Satellite", val: r.satelliteAnomaly },
                    { label: "Area", val: r.disturbanceArea },
                    { label: "History", val: r.historicalFreq },
                    { label: "Community", val: r.communityRecurrence },
                  ].map(f => (
                    <div key={f.label} className="flex items-center gap-2">
                      <span className="text-[9px] text-[#123B2A]/50 w-16">{f.label}</span>
                      <div className="flex-1 h-1 rounded-full bg-[#16845B]/10 overflow-hidden">
                        <div className="h-full rounded-full bg-[#16845B]" style={{ width: `${f.val}%` }} />
                      </div>
                      <span className="text-[9px] font-medium text-[#123B2A]/70 w-6 text-right">{f.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[10px] px-2 py-1.5 rounded bg-white border border-[#16845B]/10 text-[#123B2A]/70">
                <span className="font-semibold text-[#16845B]">Action:</span> {r.priorityAction}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {detection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-end"
            onClick={() => setSelectedDetection(null)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              className="relative w-full max-w-sm bg-white h-full shadow-2xl overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-[#16845B]/10 px-5 py-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#123B2A]">Detection Inspector</h3>
                <button onClick={() => setSelectedDetection(null)} className="w-7 h-7 rounded-lg bg-[#F5F8F5] flex items-center justify-center hover:bg-[#16845B]/10">
                  <X size={14} className="text-[#123B2A]/60" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="p-3 rounded-lg bg-[#F5F8F5] border border-[#16845B]/10">
                  <p className="text-[10px] text-[#123B2A]/50 font-medium uppercase tracking-wide mb-1">Cause</p>
                  <p className="text-sm font-bold text-[#123B2A]">{detection.cause}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Date", value: detection.date },
                    { label: "Type", value: detection.type },
                    { label: "Severity", value: detection.severity },
                    { label: "Area", value: `${detection.areaHa} Ha` },
                    { label: "Confidence", value: `${detection.confidence}%` },
                    { label: "NDVI Drop", value: detection.ndviDrop.toFixed(2) },
                    { label: "Cloud Cover", value: `${detection.cloudCover}%` },
                    { label: "Verified", value: detection.verified ? "Yes" : "No" },
                  ].map(f => (
                    <div key={f.label} className="p-2.5 rounded-lg bg-[#F5F8F5] border border-[#16845B]/8">
                      <p className="text-[9px] text-[#123B2A]/50 font-medium uppercase">{f.label}</p>
                      <p className="text-[12px] font-semibold text-[#123B2A] mt-0.5">{f.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-[#F5F8F5] border border-[#16845B]/10">
                  <p className="text-[10px] text-[#123B2A]/50 font-medium uppercase tracking-wide mb-2">Location</p>
                  <div className="flex items-center gap-2 text-[11px] text-[#123B2A]">
                    <MapPin size={14} className="text-[#16845B]" />
                    <span>{detection.lat.toFixed(4)}, {detection.lng.toFixed(4)}</span>
                  </div>
                  {zone && (
                    <div className="mt-2 text-[11px] text-[#123B2A]/60">
                      <p>{zone.lga}, {zone.state}</p>
                      <p className="mt-0.5">{zone.name}</p>
                    </div>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-[#F5F8F5] border border-[#16845B]/10">
                  <p className="text-[10px] text-[#123B2A]/50 font-medium uppercase tracking-wide mb-2">Spectral Analysis</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-[#16845B] to-[#E53E3E] relative">
                      <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#E53E3E] shadow" style={{ left: `${detection.ndviDrop * 200}%` }} />
                    </div>
                  </div>
                  <p className="text-[10px] text-[#123B2A]/50 mt-1.5">NDVI shift: -{detection.ndviDrop} (vegetation stress)</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}