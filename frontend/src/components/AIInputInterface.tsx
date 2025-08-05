// import React, { useState, useRef, useEffect } from "react";
// import {
//   Search,
//   Mic,
//   Sparkles,
//   TrendingUp,
//   BarChart3,
//   PieChart,
//   Lightbulb
// } from "lucide-react";

// interface AIInputInterfaceProps {
//   prompt: string;
//   setPrompt: (prompt: string) => void;
//   onSubmit: (e: React.FormEvent) => void;
//   loading: boolean;
// }

// const AIInputInterface: React.FC<AIInputInterfaceProps> = ({
//   prompt,
//   setPrompt,
//   onSubmit,
//   loading
// }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const quickActions = [
//     { icon: TrendingUp, label: "Trends", query: "Show me trending metrics" },
//     { icon: BarChart3, label: "Performance", query: "Analyze performance data" },
//     { icon: PieChart, label: "Distribution", query: "Show data distribution" },
//     { icon: Lightbulb, label: "Insights", query: "Find key insights" }
//   ];

//   const placeholderTexts = [
//     "Ask about your data insights...",
//     "What patterns do you want to explore?",
//     "Discover hidden trends in your data...",
//     "Transform data into stories..."
//   ];

//   const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPlaceholder((prev) => (prev + 1) % placeholderTexts.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const toggleRecording = () => {
//     setIsRecording(!isRecording);
//     // Future: integrate Web Speech API
//   };

//   const handleQuickAction = (query: string) => {
//     setPrompt(query);
//     inputRef.current?.focus();
//   };

//   return (
//     <div className="sticky bottom-0 left-0 right-0 z-50 border-t border-border bg-background-secondary/70 backdrop-blur-xl p-4">
//       <form
//         onSubmit={onSubmit}
//         className="max-w-5xl mx-auto glass-card p-2 flex items-center gap-3"
//       >
//         <Search className="w-5 h-5 text-foreground-secondary ml-2" />

//         <input
//           ref={inputRef}
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder={placeholderTexts[currentPlaceholder]}
//           className="flex-1 bg-transparent border-0 outline-none text-base placeholder:text-foreground-secondary/60"
//           disabled={loading}
//         />

//         <button
//           type="button"
//           onClick={toggleRecording}
//           className={`p-2 rounded-md transition-all duration-300 ${
//             isRecording
//               ? "bg-red-500 text-white animate-pulse"
//               : "hover:bg-background-tertiary text-foreground-secondary"
//           }`}
//         >
//           <Mic className="w-5 h-5" />
//         </button>

//         <button
//           type="submit"
//           disabled={loading || !prompt.trim()}
//           className="glass-button flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-50"
//         >
//           {loading ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             <>
//               <Sparkles className="w-5 h-5" />
//               <span className="hidden sm:inline">Generate</span>
//             </>
//           )}
//         </button>
//       </form>

//       {/* Quick Actions */}
//       <div className="flex flex-wrap justify-center gap-2 mt-3">
//         {quickActions.map((action, index) => (
//           <button
//             key={index}
//             type="button"
//             onClick={() => handleQuickAction(action.query)}
//             className="glass-card px-3 py-1 flex items-center gap-1 text-sm hover:scale-105 transition-all"
//           >
//             <action.icon className="w-4 h-4 text-primary" />
//             {action.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AIInputInterface;
