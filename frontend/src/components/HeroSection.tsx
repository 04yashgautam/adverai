import React, { useState, useEffect, useRef, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AIContext } from "@/context/AIContextDefinition";
import { getAIResponse } from "@/api/aiService";
import {
  Search,
  TrendingUp,
  BarChart3,
  ArrowUp,
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";


interface HeroSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ prompt, setPrompt }) => {
  const navigate = useNavigate();
  const aiContext = useContext(AIContext);
  if (!aiContext) {
    throw new Error("AIContext must be used within an AIContextProvider");
  }
  const { setAiResponse } = aiContext;
  const [typingText, setTypingText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const phrases = React.useMemo(() => [
    "Show me impression trend on 5th July",
    "Analyze performance",
    "Create performance report",
  ], []);

  const quickActions = [
    { icon: BarChart3, label: "Performance", query: "Show me yesterday's ROAS rate" },
    { icon: TrendingUp, label: "Trends", query: "Show me the impressions up until now" },
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let charIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setTypingText(currentPhrase.slice(0, charIndex + 1));
        charIndex++;
      } else if (isDeleting && charIndex > 0) {
        setTypingText(currentPhrase.slice(0, charIndex - 1));
        charIndex--;
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        isDeleting = false;
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentPhraseIndex, phrases]);

  // const toggleRecording = () => {
  //   // ... (unchanged)
  // };

  const handleQuickAction = (query: string) => {
    setPrompt(query);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await getAIResponse(prompt);
      setAiResponse(res);
      setTimeout(() => {
        setLoading(false);
        navigate("/results");
      }, 1000);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
          transform: "scale(1.02)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/95 via-[#1a1a2e]/90 to-[#0f0f1a]/95 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-5xl text-center">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white mb-2">
              Unlock Your Data's
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-fuchsia-400 bg-clip-text text-transparent block transition-all duration-1000 ease-out">
              Hidden Stories with AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ask questions in natural language and watch as AI instantly transforms your data into beautiful, actionable insights.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-full mb-8"
        >
          <Search className="w-5 h-5 text-white/70 ml-2" />
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Try asking: "${typingText}"`}
            className="flex-1 bg-transparent outline-none text-white px-2 placeholder-white/60"
          />
          <button
            type="button"
            // onClick={toggleRecording}
          >
          </button>
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowUp className="w-5 h-5 text-white" />
            )}
          </button>
        </form>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action.query)}
                className="group px-4 py-2 flex items-center gap-2 text-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105"
              >
                <Icon className="w-4 h-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-white/60 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <span className="font-medium">Note:</span> The request may not work because of rate limitations by the OpenRouter API's server. 
            Try again if needed (Free Plan limitations).
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;