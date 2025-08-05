import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4
         w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0"
    >
      {/* SVG Background */}
        <div className="absolute inset-0 z-0">
<svg
  width="100%"
  height="100%"
  viewBox="0 0 1220 810"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid slice"
>
  <defs>
    {/* Dark purple base */}
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stopColor="#1b0b29" />
      <stop offset="100%" stopColor="#0a0412" />
    </radialGradient>

    {/* Triangle gradient fill */}
    <linearGradient id="triGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#8b5cf6" />
      <stop offset="100%" stopColor="#d946ef" />
    </linearGradient>

    <style>
      {`
        @keyframes floatTriangle {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50%  { transform: translateY(-20px) rotate(15deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
        }
      `}
    </style>
  </defs>

  {/* Background */}
  <rect width="1220" height="810" fill="url(#bgGrad)" />

  {/* Animated Triangles */}
  {[
    { points: "0,30 30,60 60,30",        x: 200,  y: 150, size: 60, delay: "0s" },
    { points: "0,40 40,80 80,40",        x: 800,  y: 100, size: 80, delay: "1s" },
    { points: "0,25 25,50 50,25",        x: 400,  y: 500, size: 50, delay: "2s" },
    { points: "0,35 35,70 70,35",        x: 1000, y: 400, size: 70, delay: "1.5s" },
    { points: "0,45 45,90 90,45",        x: 600,  y: 300, size: 90, delay: "0.7s" },
    { points: "0,20 20,40 40,20",        x: 300,  y: 650, size: 40, delay: "2.5s" },
  ].map((tri, i) => (
    <polygon
      key={i}
      points={tri.points}
      fill="url(#triGrad)"
      transform={`translate(${tri.x},${tri.y}) scale(${tri.size / 60})`}
      style={{
        transformOrigin: `${tri.x + tri.size/2}px ${tri.y + tri.size/2}px`,
        animation: `floatTriangle 6s ease-in-out infinite ${tri.delay}`
      }}
      opacity="0.6"
    />
  ))}
</svg>

        </div>


      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] mt-20 md:mt-[120px] lg:mt-[160px] px-4">
        <h1
          className="text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight 
                    bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 
                    bg-clip-text text-transparent
                    transition-all duration-500 ease-in-out
                    hover:scale-105 hover:from-yellow-400 hover:via-pink-500 hover:to-purple-400
                    hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] 
                    cursor-pointer"
        >
          AdverAI
        </h1>
      </div>

      <div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] mt-6 md:mt-[120px] lg:mt-[10px] px-4">
        <h2 className="text-white text-1xl md:text-4xl lg:text-xl font-thin leading-tight">
          The intelligence behind your ad campaigns.
        </h2>
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => navigate("/prompt")}
        className="relative z-10 mt-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-2xl hover:shadow-purple-400/50 hover:text-black hover:font-bold"
      >
        Explore
        <ArrowRight className="w-5 h-5 hover:fill-black"/>
      </Button>
    </section>
  );
}