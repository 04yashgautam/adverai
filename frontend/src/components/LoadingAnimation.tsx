import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Database, TrendingUp } from 'lucide-react';

interface LoadingAnimationProps {
  isVisible: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isVisible }: LoadingAnimationProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { icon: Database, label: "Analyzing query", description: "Understanding your request" },
    { icon: Cpu, label: "Processing data", description: "Crunching the numbers" },
    { icon: Brain, label: "Generating insights", description: "Finding patterns and trends" },
    { icon: TrendingUp, label: "Creating visualizations", description: "Building beautiful charts" }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStage(0);
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentStage(current => {
            if (current < stages.length - 1) {
              return current + 1;
            }
            return current;
          });
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isVisible, currentStage]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg"
      style={{
        background: "linear-gradient(180deg, rgba(15,15,26,0.95) 0%, rgba(26,26,46,0.95) 100%)"
      }}
    >
      <div
        className="glass-card p-8 max-w-md w-full mx-4"
        style={{
          backgroundColor: "rgba(20,20,35,0.9)",
          borderColor: "rgba(255,255,255,0.08)"
        }}
      >
        {/* Neural Network Background */}
        <div className="neural-network">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="neural-node"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 25}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
          
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="neural-connection"
              style={{
                left: `${25 + (i % 3) * 20}%`,
                top: `${25 + Math.floor(i / 3) * 20}%`,
                width: '15%',
                transform: `rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 text-center">
          {/* Current Stage Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto glass-card rounded-full flex items-center justify-center mb-4">
              {React.createElement(stages[currentStage].icon, {
                className: "w-10 h-10 text-primary animate-pulse"
              })}
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">
              {stages[currentStage].label}
            </h3>
            
            <p className="text-white/80">
              {stages[currentStage].description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full h-2 bg-background-tertiary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-button transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-white/70 mt-2">
              {Math.round(progress)}% complete
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="flex justify-center gap-2">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentStage 
                    ? 'bg-primary' 
                    : index === currentStage 
                      ? 'bg-primary animate-pulse' 
                      : 'bg-background-tertiary'
                }`}
              />
            ))}
          </div>

          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* AI Thinking Indicator */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-sm text-white">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
