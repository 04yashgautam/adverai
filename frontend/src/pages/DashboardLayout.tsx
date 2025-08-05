import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar"; // adjust the import path as needed
import HeroSection from "../components/HeroSection"; // adjust the import path as needed

const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <HeroSection prompt={prompt} setPrompt={setPrompt} />
      </main>
    </div>
  );
};

export default DashboardLayout;
