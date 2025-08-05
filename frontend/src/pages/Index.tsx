import React, { useState } from "react";
import axios from "axios";
import HeroSection from "@/components/HeroSection";
import AIInputInterface from "@/components/AIInputInterface";
import LoadingAnimation from "@/components/LoadingAnimation";
import DashboardSidebar from "@/components/DashboardSidebar";
import VisualizationHub from "@/components/VisualizationHub";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Sparkles } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError("");
    setShowDashboard(true);

    try {
      const res = await axios.post("http://localhost:8000/query", {
        user_prompt: prompt,
      });
      
      console.log("AI Response from backend:", res.data);
      setAiResponse(res.data);
      
      toast({
        title: "Analysis Complete!",
        description: "Your data insights have been generated successfully.",
      });
      
    } catch (err: any) {
      console.error("Error fetching AI response:", err);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (err.response) {
        errorMessage = `Server error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        errorMessage = "No response from server. Is the backend running?";
      } else {
        errorMessage = "Request failed: " + err.message;
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Loading Animation Overlay */}
      <LoadingAnimation isVisible={loading} />
      
      {!showDashboard ? (
        // Hero Landing Page
        <div className="relative">
          <HeroSection />
          
          {/* Main Input Section */}
          <section className="relative py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Start Your Data Journey
                </h2>
                <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                  Ask any question about your data and watch as AI transforms your query into beautiful, actionable insights.
                </p>
              </div>
              
              <AIInputInterface
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleSubmit}
                loading={loading}
              />
              
              {/* Error Display */}
              {error && (
                <div className="mt-6 max-w-2xl mx-auto">
                  <div className="glass-card p-4 border-red-500/30 bg-red-500/10">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-300 mb-1">Connection Error</h4>
                        <p className="text-sm text-red-200">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Feature Showcase */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Powerful Features
                </h2>
                <p className="text-lg text-foreground-secondary">
                  Everything you need to unlock your data's potential
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Natural Language Queries",
                    description: "Ask questions in plain English and get instant insights",
                    gradient: "from-blue-500 to-purple-600"
                  },
                  {
                    title: "Real-time Visualizations", 
                    description: "Beautiful charts and graphs generated automatically",
                    gradient: "from-purple-500 to-pink-600"
                  },
                  {
                    title: "AI-Powered Analysis",
                    description: "Advanced pattern recognition and trend analysis",
                    gradient: "from-pink-500 to-orange-600"
                  }
                ].map((feature, index) => (
                  <div key={index} className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-foreground-secondary">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        // Dashboard Interface
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <DashboardSidebar 
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="glass-card m-4 p-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gradient">AI Analytics Dashboard</h1>
                <p className="text-sm text-foreground-secondary">
                  Discover insights from your data with AI-powered analysis
                </p>
              </div>
              
              <button
                onClick={() => setShowDashboard(false)}
                className="glass-button px-4 py-2 text-sm"
              >
                Back to Home
              </button>
            </header>
            
            {/* Dashboard Content */}
            <main className="flex-1 overflow-auto p-4">
              {/* Input Interface */}
              <div className="mb-8">
                <AIInputInterface
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              </div>
              
              {/* Error Display */}
              {error && (
                <div className="mb-6">
                  <div className="glass-card p-4 border-red-500/30 bg-red-500/10">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-300 mb-1">Analysis Error</h4>
                        <p className="text-sm text-red-200">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Visualization Hub */}
              <VisualizationHub aiResponse={aiResponse} />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;