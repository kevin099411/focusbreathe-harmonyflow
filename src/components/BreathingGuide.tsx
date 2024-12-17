import { useState, useEffect } from "react";

interface BreathingGuideProps {
  phase: "inhale" | "hold" | "exhale" | "rest";
  duration: number;
}

export const BreathingGuide = ({ phase, duration }: BreathingGuideProps) => {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const timing = {
      inhale: { scale: 1.4, duration: 4000 },
      hold: { scale: 1.4, duration: 7000 },
      exhale: { scale: 1, duration: 8000 },
      rest: { scale: 1, duration: 2000 }
    };

    setScale(timing[phase].scale);
  }, [phase]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div 
        className="absolute w-72 h-72 bg-primary/10 rounded-full transition-transform duration-[4000ms] flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
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