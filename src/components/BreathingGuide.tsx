import { useState, useEffect } from "react";

interface BreathingGuideProps {
  phase: "inhale" | "hold" | "exhale" | "rest";
  duration: number;
}

export const BreathingGuide = ({ phase, duration }: BreathingGuideProps) => {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const timing = {
      inhale: { scale: 1.4, duration: duration * 1000 },
      hold: { scale: 1.4, duration: duration * 1000 },
      exhale: { scale: 1, duration: duration * 1000 },
      rest: { scale: 1, duration: duration * 1000 }
    };

    setScale(timing[phase].scale);
  }, [phase, duration]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div 
        className="absolute w-72 h-72 bg-primary/10 rounded-full transition-transform flex items-center justify-center"
        style={{ 
          transform: `scale(${scale})`,
          transitionDuration: `${duration}s`
        }}
      >
        <div className="absolute w-64 h-64 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute w-56 h-56 bg-primary/30 rounded-full" />
        <span className="text-4xl font-bold text-primary/80 uppercase">
          {phase}
        </span>
      </div>
    </div>
  );
};