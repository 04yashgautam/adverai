import React from "react";
import {
  Home,
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Target,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
} from "lucide-react";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { id: "overview", icon: Home, label: "Overview", badge: null, path: "/dashboard" },
  { id: "analytics", icon: BarChart3, label: "Analytics", badge: "New", path: "/analytics" },
  { id: "trends", icon: TrendingUp, label: "Trends", badge: null, path: "/trends" },
  { id: "users", icon: Users, label: "User Behavior", badge: "3", path: "/users" },
  { id: "sales", icon: ShoppingCart, label: "Sales", badge: null, path: "/sales" },
  { id: "performance", icon: Target, label: "Performance", badge: null, path: "/performance" },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  return (
    <div
      className={`group relative flex flex-col h-screen border-r shadow-md transition-[width] duration-300 ease-out ${
        isCollapsed ? "w-16" : "w-72"
      }`}
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
        <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : ""}`}>
          <span
            className={`font-bold text-lg tracking-wide transition-all duration-300 ${
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            } bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}
          >
            AdverAI
          </span>
        </div>

        {/* Professional Toggle Button - Shows on hover when collapsed */}
        <button
          onClick={onToggle}
          className={`p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
            isCollapsed ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white/70" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white/70" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-1 px-3">
        {navigationItems.map(({ id, icon: Icon, label, badge, path }, index) => {
          const isActive = index === 0; // Mock first item as active

          return (
            <button
              key={id}
              onClick={() => console.log(`Navigate to ${path}`)}
              className={`w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 text-left ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />

              <span
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                  isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-xs"
                }`}
              >
                {label}
              </span>

              {!isCollapsed && badge && (
                <span
                  className={`ml-auto px-2 py-0.5 text-xs rounded-full font-medium ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-purple-600/20 text-purple-200"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 mt-auto space-y-1 border-t border-white/10">
        {[
          { id: "profile", icon: User, label: "Profile", path: "/profile" },
          { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
        ].map(({ id, icon: Icon, label, path }) => {
          const isActive = false; // Mock no active state

          return (
            <button
              key={id}
              onClick={() => console.log(`Navigate to ${path}`)}
              className={`w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 text-left ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />

              <span
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                  isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-xs"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSidebar;