import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const BREATH_PHASES = {
  INHALE: { text: "Inhale", duration: 4000 },
  HOLD1: { text: "Hold", duration: 4000 },
  EXHALE: { text: "Exhale", duration: 4000 },
  HOLD2: { text: "Hold", duration: 4000 },
};

type Phase = keyof typeof BREATH_PHASES;

export const BoxBreathing = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>("INHALE");
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const phases: Phase[] = ["INHALE", "HOLD1", "EXHALE", "HOLD2"];
    let currentPhaseIndex = phases.indexOf(currentPhase);
    let startTime = Date.now();
    const phaseDuration = BREATH_PHASES[currentPhase].duration;

    const animationFrame = requestAnimationFrame(function animate() {
      const elapsed = Date.now() - startTime;
      const phaseProgress = Math.min(elapsed / phaseDuration, 1);
      setProgress(phaseProgress);

      if (phaseProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        setCurrentPhase(phases[currentPhaseIndex]);
        startTime = Date.now();
        requestAnimationFrame(animate);
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, currentPhase]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <div className="relative w-64 h-64">
        {/* Decorative background circles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/20 to-[#D946EF]/20 rounded-full animate-pulse" />
        <div className="absolute inset-2 bg-gradient-to-tr from-[#E5DEFF]/30 to-[#FFDEE2]/30 rounded-full" />
        
        {/* Main breathing circle */}
        <div className={cn(
          "absolute inset-4 rounded-full border-4 border-[#9b87f5] transition-all duration-500",
          "flex items-center justify-center",
          "bg-white/90 backdrop-blur-sm shadow-lg",
          currentPhase === "INHALE" && "scale-110",
          currentPhase === "EXHALE" && "scale-90"
        )}>
          <div className="text-center">
            <p className="text-lg font-semibold text-[#7E69AB]">
              {BREATH_PHASES[currentPhase].text}
            </p>
            <p className="text-sm text-[#8E9196]">
              {Math.ceil((1 - progress) * 4)} seconds
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-gray-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-[#9b87f5] transition-all duration-500"
            strokeWidth="4"
            strokeDasharray={283}
            strokeDashoffset={283 * (1 - progress)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
        </svg>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          "px-6 py-2 rounded-full text-white font-medium transition-all",
          "shadow-lg hover:shadow-xl",
          "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
          "hover:from-[#8B5CF6] hover:to-[#D946EF]",
          "active:scale-95"
        )}
      >
        {isActive ? "Pause" : "Start"} Box Breathing
      </button>

      <p className="text-center text-gray-600 max-w-md">
        Box breathing can help reduce stress and improve focus. Each phase lasts 4 seconds,
        forming a square pattern of breath control.
      </p>
    </div>
  );
};