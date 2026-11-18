import { motion } from "framer-motion"
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { MapPin, TrendDown, ShieldWarning, Users, Bell, Clock } from "@phosphor-icons/react"
import { monitoringZones, detectionEvents, communityReports, alerts, monthlyTrends, disturbanceCauses, regionalRisk } from "@/data/mockForestData"

const kpiCards = [
  { label: "Total Monitored Area", value: "20,716", unit: "Ha", icon: MapPin, color: "#16845B", bg: "#F0FDF4" },
  { label: "Canopy Loss (YTD)", value: "1,512", unit: "Ha", icon: TrendDown, color: "#E53E3E", bg: "#FEF2F2" },
  { label: "Active Hotspots", value: "19", unit: "zones", icon: ShieldWarning, color: "#DD6B20", bg: "#FFFBEB" },
  { label: "Verified Reports", value: "3", unit: "this week", icon: Users, color: "#16845B", bg: "#F0FDF4" },
  { label: "Critical Alerts", value: "2", unit: "pending", icon: Bell, color: "#E53E3E", bg: "#FEF2F2" },
  { label: "Avg Response Time", value: "4.2", unit: "hrs", icon: Clock, color: "#805AD5", bg: "#FAF5FF" },
]

export default function OverviewDashboard() {
  const recentActivity = [
    ...detectionEvents.slice(0, 3).map(d => ({ type: "detection" as const, title: `${d.cause} detected in zone`, time: d.date, severity: d.severity })),
    ...communityReports.slice(0, 2).map(c => ({ type: "report" as const, title: c.disturbanceType, time: c.date, severity: c.urgency })),
  ]

  return (
    <div className="p-6 space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl border border-[#16845B]/8 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.bg }}>
                <kpi.icon size={16} style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-[#123B2A] tracking-tight">{kpi.value}<span className="text-[10px] font-medium text-[#123B2A]/50 ml-1">{kpi.unit}</span></p>
            <p className="text-[11px] text-[#123B2A]/60 mt-0.5 font-medium">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Forest Loss vs Reforestation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white rounded-xl border border-[#16845B]/8 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#123B2A]">Forest Loss vs Reforestation (Ha)</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold border border-amber-200">DEMO DATA</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
              <Area type="monotone" dataKey="forestLoss" stackId="1" stroke="#E53E3E" fill="#E53E3E" fillOpacity={0.15} name="Loss" />
              <Area type="monotone" dataKey="reforestation" stackId="2" stroke="#16845B" fill="#16845B" fillOpacity={0.15} name="Reforestation" />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Disturbance Causes */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl border border-[#16845B]/8 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#123B2A] mb-3">Disturbance by Cause</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={disturbanceCauses} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {disturbanceCauses.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {disturbanceCauses.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                <span className="text-[#123B2A]/70 flex-1">{c.name}</span>
                <span className="font-semibold text-[#123B2A]">{c.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Regional Risk + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-xl border border-[#16845B]/8 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#123B2A] mb-4">Regional Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={regionalRisk} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#6B7280" }} domain={[0, 100]} />
              <YAxis type="category" dataKey="region" tick={{ fontSize: 11, fill: "#6B7280" }} width={90} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="risk" fill="#16845B" radius={[0, 4, 4, 0]} name="Risk Score" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Feed */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="bg-white rounded-xl border border-[#16845B]/8 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#123B2A] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-[#F5F8F5] border border-[#16845B]/5">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.severity === "critical" ? "bg-[#E53E3E]" : item.severity === "high" ? "bg-[#DD6B20]" : "bg-[#16845B]"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-[#123B2A] truncate">{item.title}</p>
                  <p className="text-[10px] text-[#123B2A]/50 mt-0.5">{item.time}</p>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                  item.type === "detection" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                }`}>{item.type}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Priority Hotspots */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-xl border border-[#16845B]/8 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#123B2A] mb-3">Priority Monitoring Zones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {monitoringZones.slice(0, 5).map(zone => (
            <div key={zone.id} className="p-3 rounded-lg bg-[#F5F8F5] border border-[#16845B]/8 hover:border-[#16845B]/20 transition-colors">
              <p className="text-[11px] font-semibold text-[#123B2A] truncate">{zone.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[#16845B]/10 overflow-hidden">
                  <div className="h-full rounded-full bg-[#16845B]" style={{ width: `${zone.canopyCover}%` }} />
                </div>
                <span className="text-[10px] font-medium text-[#123B2A]/60">{zone.canopyCover}%</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                  zone.riskScore > 70 ? "bg-red-50 text-red-600" : zone.riskScore > 50 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                }`}>Risk: {zone.riskScore}</span>
                <span className="text-[9px] text-[#123B2A]/40">{zone.activeAlerts} alerts</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
