import React, { useState } from "react";
import {
  Maximize2,
  Download,
  Share2,
  MoreHorizontal,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Heart,
  Bookmark,
} from "lucide-react";

interface VisualizationHubProps {
  aiResponse: any;
}

const VisualizationHub: React.FC<VisualizationHubProps> = ({ aiResponse }) => {
  const [selectedViz, setSelectedViz] = useState<number | null>(null);
  const [layout, setLayout] = useState<"grid" | "masonry">("masonry");

  const getIconForType = (type: string) => {
    switch (type?.toLowerCase()) {
      case "line":
        return LineChart;
      case "bar":
        return BarChart3;
      case "pie":
        return PieChart;
      default:
        return TrendingUp;
    }
  };

  const handleExport = (viz: any, format: string) => {
    console.log(`Exporting ${viz.title} as ${format}`);
  };

  const handleShare = (viz: any) => {
    console.log(`Sharing ${viz.title}`);
  };

  if (!aiResponse?.visualizations?.length) {
    return (
      <div className="glass-card p-12 text-center">
        <TrendingUp className="w-16 h-16 text-foreground-secondary mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-foreground-secondary mb-2">
          No Visualizations Yet
        </h3>
        <p className="text-foreground-secondary">
          Ask a question about your data to see beautiful visualizations appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hub Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Data Insights</h2>
          <p className="text-sm text-foreground-secondary mt-1">
            {aiResponse.visualizations.length} visualization
            {aiResponse.visualizations.length !== 1 ? "s" : ""} generated
          </p>
        </div>

        {/* Layout Toggle */}
        <div className="glass-card flex gap-1 p-1 rounded-xl">
          <button
            onClick={() => setLayout("grid")}
            className={`p-2 rounded-lg transition-all duration-200 ${
              layout === "grid"
                ? "bg-primary text-white shadow-glow"
                : "hover:bg-background-tertiary"
            }`}
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-current rounded-sm" />
              ))}
            </div>
          </button>
          <button
            onClick={() => setLayout("masonry")}
            className={`p-2 rounded-lg transition-all duration-200 ${
              layout === "masonry"
                ? "bg-primary text-white shadow-glow"
                : "hover:bg-background-tertiary"
            }`}
          >
            <div className="w-4 h-4 flex flex-col gap-0.5">
              <div className="bg-current h-1 rounded-sm" />
              <div className="bg-current h-2 rounded-sm" />
              <div className="bg-current h-1.5 rounded-sm" />
            </div>
          </button>
        </div>
      </div>

      {/* Visualizations */}
      <div
        className={`grid gap-6 ${
          layout === "grid"
            ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {aiResponse.visualizations.map((viz: any, index: number) => {
          const IconComponent = getIconForType(viz.type);

          return (
            <div
              key={index}
              className="viz-card group hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer"
              onClick={() =>
                setSelectedViz(selectedViz === index ? null : index)
              }
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-button rounded-lg flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {viz.title}
                    </h3>
                    <p className="text-xs text-foreground-secondary capitalize">
                      {viz.type} Chart
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExport(viz, "png");
                    }}
                    className="icon-btn"
                    title="Export"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(viz);
                    }}
                    className="icon-btn"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="icon-btn" title="More">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="bg-background-tertiary rounded-lg p-4 relative flex items-center justify-center h-56">
                <IconComponent className="w-12 h-12 text-primary opacity-60" />
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-foreground-secondary">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> 24
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark className="w-4 h-4" /> Save
                  </span>
                </div>
                <span>Generated 2 min ago</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {aiResponse.summary && (
        <div className="glass-card p-6 mt-8">
          <h3 className="text-lg font-semibold text-gradient mb-3">
            AI Analysis Summary
          </h3>
          <p className="text-sm text-foreground-secondary">
            {aiResponse.summary}
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedViz !== null && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedViz(null)}
        >
          <div
            className="glass-card p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gradient">
                {aiResponse.visualizations[selectedViz].title}
              </h2>
              <button
                onClick={() => setSelectedViz(null)}
                className="icon-btn"
              >
                <Maximize2 className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="bg-background-tertiary rounded-lg p-8 h-96 flex items-center justify-center">
              <TrendingUp className="w-20 h-20 text-primary opacity-60" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationHub;
