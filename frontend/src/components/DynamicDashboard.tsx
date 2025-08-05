import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface Visualization {
  type: string;
  title: string;
  value_key?: string;
  x_key?: string;
  y_keys?: string[];
}

interface AIResponse {
  visualizations: Visualization[];
  data?: Record<string, number | string>[];
}

interface DynamicDashboardProps {
  aiResponse: AIResponse | null;
}

export default function DynamicDashboard({ aiResponse }: DynamicDashboardProps) {
  if (!aiResponse || !aiResponse.visualizations || aiResponse.visualizations.length === 0) {
    return <p className="text-white/70">No Data Available</p>;
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] rounded-lg">
      {/* 🔹 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {aiResponse.visualizations
          .filter((v) => v.type === "metric-card")
          .map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg shadow-lg"
              style={{
                background: "rgba(30,30,46,0.85)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <h2 className="text-lg font-semibold text-white">{metric.title}</h2>
              <p className="text-3xl font-bold text-white">
                {aiResponse.data && aiResponse.data.length > 0 && metric.value_key
                  ? aiResponse.data.reduce(
                      (sum, row) => sum + (Number(row[metric.value_key]) || 0),
                      0
                    )
                  : 0}
              </p>
            </div>
          ))}
      </div>

      {/* 🔹 Bar Charts */}
      {aiResponse.visualizations
        .filter((v) => v.type === "bar" || v.type === "bar-chart")
        .map((chart, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg shadow-lg"
            style={{
              background: "rgba(30,30,46,0.85)",
              border: "1px solid rgba(255,255,255,0.08)"
            }}
          >
            <h2 className="text-lg font-semibold text-white mb-4">{chart.title}</h2>
            {aiResponse.data && aiResponse.data.length > 0 && chart.x_key && chart.y_keys ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={aiResponse.data}
                  barSize={40}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey={chart.x_key}
                    tick={{ fill: "#fff" }}
                    axisLine={{ stroke: "#8884d8" }}
                  />
                  <YAxis
                    tick={{ fill: "#fff" }}
                    axisLine={{ stroke: "#8884d8" }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "rgba(20,20,35,0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff"
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      color: "#fff"
                    }}
                  />
                  {chart.y_keys.map((key, i) => (
                    <Bar
                      key={i}
                      dataKey={key}
                      fill={i === 0 ? "#a855f7" : "#ec4899"}
                      radius={[6, 6, 0, 0]}
                      animationDuration={800}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-white/50">No data for chart</p>
            )}
          </div>
        ))}
    </div>
  );
}
