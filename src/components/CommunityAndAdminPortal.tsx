import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Plus, X, Check, Bell, Lightbulb, ShieldCheck, Camera, MapPin, Clock, CaretDown } from "@phosphor-icons/react"
import { toast } from "sonner"
import { communityReports, alerts, conservationInsights, type CommunityReport, type AlertNotification, type ReportStatus } from "@/data/mockForestData"

const DISTURBANCE_TYPES = ["Illegal Logging", "Forest Encroachment", "Bush Burning", "Land Clearing", "Charcoal Production", "Wildlife Poaching"]
const NIGERIAN_STATES = ["Cross River", "Ogun", "Taraba", "Borno", "Ondo", "Benue", "Niger", "Kaduna"]

export default function CommunityAndAdminPortal({ activeView }: { activeView: string }) {
  // Community Reports State
  const [reports, setReports] = useState<CommunityReport[]>(() => {
    const saved = localStorage.getItem("fg_community_reports")
    return saved ? JSON.parse(saved) : communityReports
  })
  const [showForm, setShowForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all")

  // Alerts State
  const [alertList, setAlertList] = useState<AlertNotification[]>(() => {
    const saved = localStorage.getItem("fg_alerts")
    return saved ? JSON.parse(saved) : alerts
  })
  const [alertTab, setAlertTab] = useState("all")

  // Form State
  const [formData, setFormData] = useState<{
    reporter: string; disturbanceType: string; description: string;
    lat: string; lng: string; state: string; urgency: string; contact: string;
  }>({
    reporter: "", disturbanceType: DISTURBANCE_TYPES[0], description: "",
    lat: "", lng: "", state: NIGERIAN_STATES[0], urgency: "medium", contact: "",
  })

  useEffect(() => { localStorage.setItem("fg_community_reports", JSON.stringify(reports)) }, [reports])
  useEffect(() => { localStorage.setItem("fg_alerts", JSON.stringify(alertList)) }, [alertList])

  const submitReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.reporter || !formData.description) {
      toast.error("Please fill in reporter name and description")
      return
    }
    const newReport: CommunityReport = {
      id: `c${Date.now()}`, reporter: formData.reporter, date: new Date().toISOString().split("T")[0],
      disturbanceType: formData.disturbanceType, description: formData.description,
      lat: parseFloat(formData.lat) || 6.5, lng: parseFloat(formData.lng) || 3.4,
      state: formData.state, urgency: formData.urgency as any, status: "pending_review",
      photoAttached: false, contact: formData.contact,
    }
    setReports(prev => [newReport, ...prev])
    setShowForm(false)
    setFormData({ reporter: "", disturbanceType: DISTURBANCE_TYPES[0], description: "", lat: "", lng: "", state: NIGERIAN_STATES[0], urgency: "medium", contact: "" })
    toast.success("Incident report submitted successfully")
  }

  const updateReportStatus = (id: string, status: ReportStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    toast.success(`Report marked as ${status.replace("_", " ")}`)
  }

  const updateAlertStatus = (id: string, status: "acknowledged" | "resolved") => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    toast.success(`Alert ${status}`)
  }

  const filteredReports = statusFilter === "all" ? reports : reports.filter(r => r.status === statusFilter)
  const filteredAlerts = alertTab === "all" ? alertList : alertList.filter(a => a.category === alertTab)
  const alertCategories = ["all", ...Array.from(new Set(alerts.map(a => a.category)))]

  // Render based on active view
  if (activeView === "community") return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#123B2A] flex items-center gap-2">
          <Users size={20} className="text-[#16845B]" /> Community Intelligence Portal
        </h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#16845B] text-white text-[12px] font-semibold hover:bg-[#123B2A] transition-colors shadow-sm">
          <Plus size={14} /> New Report
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "pending_review", "under_investigation", "verified", "rejected"] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
            statusFilter === s ? "bg-[#123B2A] text-white border-[#123B2A]" : "bg-white text-[#123B2A]/60 border-[#16845B]/15 hover:border-[#16845B]/40"
          }`}>{s.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}</button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-[#16845B]/10 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-[13px] font-bold text-[#123B2A]">{r.disturbanceType}</h4>
                <p className="text-[10px] text-[#123B2A]/50 mt-0.5">{r.reporter} &bull; {r.date}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                r.status === "verified" ? "bg-emerald-100 text-emerald-700" : r.status === "under_investigation" ? "bg-blue-100 text-blue-700" :
                r.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              }`}>{r.status.replace("_", " ")}</span>
            </div>
            <p className="text-[11px] text-[#123B2A]/70 leading-relaxed mb-3">{r.description}</p>
            <div className="flex items-center gap-3 text-[10px] text-[#123B2A]/50">
              <span className="flex items-center gap-1"><MapPin size={11} />{r.state}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{r.urgency}</span>
              {r.photoAttached && <span className="flex items-center gap-1"><Camera size={11} />Photo</span>}
            </div>
            {r.status === "pending_review" && (
              <div className="mt-3 pt-3 border-t border-[#16845B]/8 flex gap-2">
                <button onClick={() => updateReportStatus(r.id, "under_investigation")} className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-600 font-medium hover:bg-blue-100">Investigate</button>
                <button onClick={() => updateReportStatus(r.id, "verified")} className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100">Verify</button>
                <button onClick={() => updateReportStatus(r.id, "rejected")} className="text-[10px] px-2 py-1 rounded bg-red-50 text-red-600 font-medium hover:bg-red-100">Reject</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Report Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-[#16845B]/10 px-5 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-sm font-bold text-[#123B2A]">Report Forest Incident</h3>
                <button onClick={() => setShowForm(false)} className="w-7 h-7 rounded-lg bg-[#F5F8F5] flex items-center justify-center"><X size={14} className="text-[#123B2A]/60" /></button>
              </div>
              <form onSubmit={submitReport} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">Full Name</label>
                    <input value={formData.reporter} onChange={e => setFormData({...formData, reporter: e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg border border-[#16845B]/15 text-[12px] outline-none focus:border-[#16845B]" placeholder="Your name" /></div>
                  <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">Contact</label>
                    <input value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg border border-[#16845B]/15 text-[12px] outline-none focus:border-[#16845B]" placeholder="Phone number" /></div>
                </div>
                <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">Disturbance Type</label>
                  <select value={formData.disturbanceType} onChange={e => setFormData({...formData, disturbanceType: e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg border border-[#16845B]/15 text-[12px] outline-none focus:border-[#16845B] bg-white">
                    {DISTURBANCE_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select></div>
                <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="mt-1 w-full px-3 py-2 rounded-lg border border-[#16845B]/15 text-[12px] outline-none focus:border-[#16845B] resize-none" placeholder="Describe what you observed..." /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">State</label>
                    <select value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg border border-[#16845B]/15 text-[12px] outline-none bg-white">
                      {NIGERIAN_STATES.map(s => <option key={s}>{s}</option>)}
                    </select></div>
                  <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">Latitude</label>
                    <input value={formData.lat} onChange={e => setFormData({...formData, lat: e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg border border-[#16845B]/15 text-[12px] outline-none" placeholder="6.5244" /></div>
                  <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">Longitude</label>
                    <input value={formData.lng} onChange={e => setFormData({...formData, lng: e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg border border-[#16845B]/15 text-[12px] outline-none" placeholder="3.3792" /></div>
                </div>
                <div><label className="text-[10px] font-semibold text-[#123B2A]/60 uppercase">Urgency</label>
                  <div className="mt-1.5 flex gap-2">
                    {(["low", "medium", "high", "critical"] as const).map(u => (
                      <button type="button" key={u} onClick={() => setFormData({...formData, urgency: u})} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                        formData.urgency === u ? "bg-[#123B2A] text-white border-[#123B2A]" : "bg-white text-[#123B2A]/60 border-[#16845B]/15"
                      }`}>{u.charAt(0).toUpperCase() + u.slice(1)}</button>
                    ))}
                  </div></div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F5F8F5] border border-dashed border-[#16845B]/20">
                  <Camera size={18} className="text-[#16845B]/50" />
                  <span className="text-[11px] text-[#123B2A]/50">Photo upload (simulation)</span>
                </div>
                <button type="submit" className="w-full py-2.5 rounded-lg bg-[#16845B] text-white text-[13px] font-semibold hover:bg-[#123B2A] transition-colors shadow-sm">
                  Submit Report
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (activeView === "alerts") return (
    <div className="p-6 space-y-5">
      <h2 className="text-base font-bold text-[#123B2A] flex items-center gap-2">
        <Bell size={20} className="text-[#DD6B20]" /> Alert Centre
      </h2>
      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {alertCategories.map(cat => (
          <button key={cat} onClick={() => setAlertTab(cat)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
            alertTab === cat ? "bg-[#123B2A] text-white border-[#123B2A]" : "bg-white text-[#123B2A]/60 border-[#16845B]/15 hover:border-[#16845B]/40"
          }`}>{cat === "all" ? "All Alerts" : cat}</button>
        ))}
      </div>
      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-[#16845B]/10 p-4 shadow-sm flex items-start gap-4">
            <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
              a.severity === "critical" ? "bg-[#E53E3E] animate-pulse" : a.severity === "high" ? "bg-[#DD6B20]" : "bg-[#16845B]"
            }`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-[13px] font-bold text-[#123B2A]">{a.title}</h4>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                  a.status === "active" ? "bg-red-50 text-red-600" : a.status === "acknowledged" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                }`}>{a.status}</span>
              </div>
              <p className="text-[11px] text-[#123B2A]/60 mt-1">{a.description}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-[#123B2A]/40">
                <span>{a.zone}</span><span>&bull;</span><span>{new Date(a.timestamp).toLocaleDateString()}</span><span>&bull;</span><span>{a.category}</span>
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              {a.status === "active" && <button onClick={() => updateAlertStatus(a.id, "acknowledged")} className="text-[10px] px-2 py-1 rounded bg-amber-50 text-amber-600 font-medium hover:bg-amber-100">Acknowledge</button>}
              {a.status !== "resolved" && <button onClick={() => updateAlertStatus(a.id, "resolved")} className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100 flex items-center gap-1"><Check size={10} />Resolve</button>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  if (activeView === "insights") return (
    <div className="p-6 space-y-5">
      <h2 className="text-base font-bold text-[#123B2A] flex items-center gap-2">
        <Lightbulb size={20} className="text-[#DD6B20]" /> Conservation Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conservationInsights.map((ins, i) => (
          <motion.div key={ins.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-xl border border-[#16845B]/10 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#16845B]/10 text-[#16845B] font-semibold uppercase">{ins.category}</span>
              <span className="text-[10px] font-bold text-[#16845B]">{ins.confidence}% confidence</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#123B2A] mb-2">{ins.title}</h4>
            <p className="text-[11px] text-[#123B2A]/70 leading-relaxed mb-3">{ins.recommendation}</p>
            <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#16845B]/10">
              <p className="text-[10px] font-semibold text-[#16845B]">Expected Impact</p>
              <p className="text-[11px] text-[#123B2A]/70 mt-0.5">{ins.impact}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  // Admin view
  return (
    <div className="p-6 space-y-5">
      <h2 className="text-base font-bold text-[#123B2A] flex items-center gap-2">
        <ShieldCheck size={20} className="text-[#16845B]" /> Admin / Verification Workflow
      </h2>
      <div className="bg-white rounded-xl border border-[#16845B]/10 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-[#16845B]/8 bg-[#F5F8F5]">
          <p className="text-[11px] text-[#123B2A]/60 font-medium">Compare community evidence against satellite detections. Approve or reject ground-truth incidents.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="bg-[#F5F8F5]/50">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Reporter</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Type</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">State</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Evidence</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Status</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[#123B2A]/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.filter(r => r.status === "pending_review" || r.status === "under_investigation").map(r => (
                <tr key={r.id} className="border-b border-[#16845B]/5 hover:bg-[#F5F8F5]/50">
                  <td className="px-4 py-3 font-medium text-[#123B2A]">{r.reporter}</td>
                  <td className="px-4 py-3 text-[#123B2A]/70">{r.disturbanceType}</td>
                  <td className="px-4 py-3 text-[#123B2A]/70">{r.state}</td>
                  <td className="px-4 py-3">{r.photoAttached ? <span className="flex items-center gap-1 text-[10px] text-[#16845B] font-medium"><Camera size={12} />Photo</span> : <span className="text-[10px] text-[#123B2A]/30">None</span>}</td>
                  <td className="px-4 py-3"><span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                    r.status === "under_investigation" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                  }`}>{r.status.replace("_", " ")}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => updateReportStatus(r.id, "verified")} className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100 flex items-center gap-1"><Check size={10} />Approve</button>
                      <button onClick={() => updateReportStatus(r.id, "rejected")} className="text-[10px] px-2 py-1 rounded bg-red-50 text-red-600 font-medium hover:bg-red-100 flex items-center gap-1"><X size={10} />Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.filter(r => r.status === "pending_review" || r.status === "under_investigation").length === 0 && (
            <div className="p-8 text-center text-[12px] text-[#123B2A]/40">No pending verifications. All reports reviewed.</div>
          )}
        </div>
      </div>
    </div>
  )
}