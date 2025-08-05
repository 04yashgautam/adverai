import React, { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

const SidebarRouteExample = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-3xl font-bold text-gradient mb-4">Sidebar Route Page</h1>
        <p>This page has a working collapsible sidebar.</p>
      </div>
    </div>
  );
};

export default SidebarRouteExample;
