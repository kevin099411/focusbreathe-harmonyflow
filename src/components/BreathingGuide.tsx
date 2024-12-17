import { useState, useEffect } from "react";

interface BreathingGuideProps {
  phase: "inhale" | "hold" | "exhale" | "rest";
  duration: number;
}

export const BreathingGuide = ({ phase, duration }: BreathingGuideProps) => {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const timing = {
      inhale: { scale: 1.5, duration: duration * 1000 },
      hold: { scale: 1.5, duration: duration * 1000 },
      exhale: { scale: 1, duration: duration * 1000 },
      rest: { scale: 1, duration: duration * 1000 }
    };

    setScale(timing[phase].scale);
  }, [phase, duration]);

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-blue-400/30";
      case "hold":
        return "bg-purple-400/30";
      case "exhale":
        return "bg-green-400/30";
      case "rest":
        return "bg-orange-400/30";
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "吸氣";
      case "hold":
        return "屏息";
      case "exhale":
        return "呼氣";
      case "rest":
        return "休息";
    }
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div 
        className={`absolute w-72 h-72 ${getPhaseColor()} rounded-full transition-all flex items-center justify-center backdrop-blur-lg`}
        style={{ 
          transform: `scale(${scale})`,
          transitionDuration: `${duration}s`,
          transitionTimingFunction: "linear"
        }}
      >
        <div className="absolute w-64 h-64 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute w-56 h-56 bg-white/20 rounded-full animate-wind" />
        <div className="text-center">
          <span className="text-4xl font-bold text-white">
            {getPhaseText()}
          </span>
          <div className="text-xl text-white/80 mt-2">
            {duration}秒
          </div>
        </div>
      </div>
    </div>
  );
};