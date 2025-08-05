import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { ArrowLeft, TrendingUp, DollarSign, Eye, MousePointer, Zap } from "lucide-react";

interface Metric {
  title: string;
  value_key: string;
  format?: "number" | "currency" | "percentage";
}

interface Visualization {
  type: string;
  title: string;
  x_key?: string;
  y_keys?: string[];
  value_key?: string;
}

interface AIResponse {
  metrics?: Metric[];
  visualizations: Visualization[];
  data?: Record<string, number | string>[];
  summary?: string;
  line_chart_data?: { date: string; impressions: number }[];
}

interface CombinedDashboardProps {
  aiResponse: AIResponse | null;
}

const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899"];
const GRADIENT_COLORS = [
  "from-violet-500/20 to-purple-600/20",
  "from-emerald-500/20 to-green-600/20",
  "from-amber-500/20 to-orange-600/20",
  "from-red-500/20 to-rose-600/20",
  "from-blue-500/20 to-indigo-600/20",
  "from-pink-500/20 to-rose-600/20"
];

const CombinedDashboard: React.FC<CombinedDashboardProps> = ({ aiResponse }) => {
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>("all");

  const handleBackClick = () => {
    // In a real app, you'd use React Router: navigate('/prompt')
    window.history.back();
  };

  if (!aiResponse || !aiResponse.data || aiResponse.data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBackClick}
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              <span className="text-white/70 group-hover:text-white text-sm">Back to Prompt</span>
            </button>
          </div>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-violet-400" />
              </div>
              <p className="text-white/60 text-lg">No data available to display</p>
              <p className="text-white/40 text-sm mt-2">Upload your analytics data to see insights</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate key metrics
  const totalImpressions = aiResponse.data.reduce((sum, row) => sum + (Number(row.impressions) || 0), 0);
  const totalClicks = aiResponse.data.reduce((sum, row) => sum + (Number(row.clicks) || 0), 0);
  const totalSpend = aiResponse.data.reduce((sum, row) => sum + (Number(row.spend) || 0), 0);
  const totalRevenue = aiResponse.data.reduce((sum, row) => sum + (Number(row.spend) || 0) * (Number(row.roas) || 0), 0);
  const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100) : 0;
  const totalROAS = totalSpend > 0 ? (totalRevenue / totalSpend) : 0;

  const keyMetrics = [
    { icon: Eye, label: "Total Impressions", value: totalImpressions.toLocaleString(), color: "violet", trend: "+12%" },
    { icon: MousePointer, label: "Total Clicks", value: totalClicks.toLocaleString(), color: "emerald", trend: "+8%" },
    { icon: DollarSign, label: "Total Spend", value: `$${totalSpend.toLocaleString()}`, color: "amber", trend: "-3%" },
    { icon: TrendingUp, label: "ROAS", value: `${totalROAS.toFixed(2)}x`, color: "blue", trend: "+15%" },
    { icon: Zap, label: "CTR", value: `${avgCTR.toFixed(2)}%`, color: "pink", trend: "+5%" },
  ];

  const lineChartData = aiResponse.line_chart_data?.map((item, idx) => ({
    index: idx + 1,
    date: item.date,
    impressions: item.impressions
  })) || [];

  const pieData = [
    { name: "Ad Spend", value: totalSpend, color: COLORS[3] },
    { name: "Revenue", value: totalRevenue, color: COLORS[1] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header */}
      <div className="border-b border-white/5 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackClick}
                className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-white/70 group-hover:text-white text-sm font-medium">Back</span>
              </button>
              {/* <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-white/50 text-sm">Real-time campaign performance insights</p>
              </div> */}
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                <span className="text-emerald-300 text-xs font-medium">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {keyMetrics.map((metric, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br ${GRADIENT_COLORS[index]} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${metric.color}-500/25`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${metric.color}-500/20`}>
                    <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    metric.trend.startsWith('+') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
                <p className="text-white/60 text-sm font-medium mb-1">{metric.label}</p>
                <p className="text-white text-xl font-bold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Bar Chart - Takes 2 columns */}
          <div className="xl:col-span-2">
            <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1">Campaign Performance</h2>
                    <p className="text-white/50 text-sm">Impressions, Clicks & Conversions</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={aiResponse.data} barSize={35}>
                    <defs>
                      <linearGradient id="impressionsBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#be185d" stopOpacity={0.8}/>
                      </linearGradient>
                      <linearGradient id="clicksBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#047857" stopOpacity={0.8}/>
                      </linearGradient>
                      <linearGradient id="conversionsBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#d97706" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="campaign_name" 
                      tick={{ fill: "#cbd5e1", fontSize: 11 }}
                      tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    />
                    <YAxis 
                      tick={{ fill: "#cbd5e1", fontSize: 11 }}
                      tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)"
                      }}
                      itemStyle={{ color: "#fff", fontSize: "12px" }}
                      labelStyle={{ color: "#fff", fontWeight: "600" }}
                    />
                    <Legend />
                    <Bar dataKey="impressions" fill="url(#impressionsBar)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="clicks" fill="url(#clicksBar)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="conversions" fill="url(#conversionsBar)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-1">Spend vs Revenue</h2>
                <p className="text-white/50 text-sm">Financial performance overview</p>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <RePieChart>
                  <defs>
                    <linearGradient id="spendSlice" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="revenueSlice" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <RechartsTooltip
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`,
                      name
                    ]}
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(20px)"
                    }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#fff", fontWeight: "600" }}
                  />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    dataKey="value"
                    onMouseEnter={(_, i) => setActivePieIndex(i)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={index === 0 ? "url(#spendSlice)" : "url(#revenueSlice)"}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={activePieIndex === index ? 3 : 1}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Impressions Trend</h2>
              <p className="text-white/50 text-sm">Daily impression performance over time</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={lineChartData}>
                <defs>
                  <linearGradient id="impressionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: "#cbd5e1", fontSize: 11 }}
                  tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                />
                <YAxis 
                  tick={{ fill: "#cbd5e1", fontSize: 11 }}
                  tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                />
                <RechartsTooltip
                  formatter={(value: number) => [value.toLocaleString(), "Impressions"]}
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(20px)"
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff", fontWeight: "600" }}
                />
                <Area
                  type="monotone"
                  dataKey="impressions"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#impressionGradient)"
                  dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Summary */}
        {aiResponse.summary && (
          <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 backdrop-blur-sm border border-violet-500/20 hover:border-violet-400/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-violet-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-violet-500/20">
                  <Zap className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI-Powered Insights</h3>
              </div>
              <p className="text-white/80 leading-relaxed">{aiResponse.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedDashboard;