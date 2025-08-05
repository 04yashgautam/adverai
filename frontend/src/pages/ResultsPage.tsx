import React, { useContext, useEffect, useState } from "react";
import { AIContext } from "@/context/AIContextDefinition";
import CombinedDashboard from "@/components/CombinedDashboard";

const ResultsPage: React.FC = () => {
  const { aiResponse } = useContext(AIContext) || {};
  const [showContent, setShowContent] = useState(false);

  // Optional delay for fade-in effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 150); // slight delay to ensure smooth mount

    return () => clearTimeout(timeout);
  }, []);

  if (!aiResponse) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center text-white px-4">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No results available.</p>
          <p className="text-sm text-white/70">Please generate a prompt first from the homepage.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#0f0f1a] text-white p-6 transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <CombinedDashboard aiResponse={aiResponse} />
    </div>
  );
};

export default ResultsPage;
