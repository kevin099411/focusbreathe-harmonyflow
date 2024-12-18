import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const BREATH_PHASES = {
  INHALE: { 
    en: { text: "Inhale" },
    zh: { text: "吸氣" },
    duration: 4000 
  },
  HOLD1: { 
    en: { text: "Hold" },
    zh: { text: "屏息" },
    duration: 4000 
  },
  EXHALE: { 
    en: { text: "Exhale" },
    zh: { text: "呼氣" },
    duration: 4000 
  },
  HOLD2: { 
    en: { text: "Hold" },
    zh: { text: "屏息" },
    duration: 4000 
  },
};

type Phase = keyof typeof BREATH_PHASES;

export const BoxBreathing = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>("INHALE");
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { language } = useLanguage();

  const audioUrl = "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3";

  useEffect(() => {
    if (!isActive) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    const phases: Phase[] = ["INHALE", "HOLD1", "EXHALE", "HOLD2"];
    let currentPhaseIndex = phases.indexOf(currentPhase);
    let startTime = Date.now();
    const phaseDuration = BREATH_PHASES[currentPhase].duration;

    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }

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

    return () => {
      cancelAnimationFrame(animationFrame);
      if (!isActive && audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isActive, currentPhase]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const buttonText = {
    en: { start: "Start", pause: "Pause" },
    zh: { start: "開始", pause: "暫停" }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <div className="relative w-64 h-64">
        {/* Background gradients */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br rounded-full transition-all duration-500",
          currentPhase === "INHALE" && "from-[#9b87f5]/30 to-[#D946EF]/30 animate-wind",
          currentPhase === "HOLD1" && "from-[#87f5b1]/30 to-[#46ef8d]/30 animate-pulse",
          currentPhase === "EXHALE" && "from-[#0EA5E9]/30 to-[#46ef8d]/30 animate-wind",
          currentPhase === "HOLD2" && "from-[#D946EF]/30 to-[#9b87f5]/30 animate-pulse"
        )} />
        
        {/* Main breathing circle */}
        <div className={cn(
          "absolute inset-4 rounded-full transition-all duration-500",
          "flex items-center justify-center backdrop-blur-sm",
          "bg-white/90 shadow-lg border-2",
          currentPhase === "INHALE" && "scale-110 border-[#9b87f5]",
          currentPhase === "HOLD1" && "scale-105 border-[#87f5b1] animate-glow",
          currentPhase === "EXHALE" && "scale-90 border-[#0EA5E9]",
          currentPhase === "HOLD2" && "scale-95 border-[#D946EF] animate-glow"
        )}>
          <div className="text-center">
            <p className={cn(
              "text-2xl font-semibold transition-colors duration-300",
              currentPhase === "INHALE" && "text-[#9b87f5]",
              currentPhase === "HOLD1" && "text-[#87f5b1]",
              currentPhase === "EXHALE" && "text-[#0EA5E9]",
              currentPhase === "HOLD2" && "text-[#D946EF]"
            )}>
              {BREATH_PHASES[currentPhase][language].text}
            </p>
            <p className="text-lg text-[#8E9196]">
              {Math.ceil((1 - progress) * 4)}
            </p>
          </div>
        </div>

        {/* Progress circle */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-gray-200/50"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={cn(
              "transition-all duration-300",
              currentPhase === "INHALE" && "text-[#9b87f5]",
              currentPhase === "HOLD1" && "text-[#87f5b1]",
              currentPhase === "EXHALE" && "text-[#0EA5E9]",
              currentPhase === "HOLD2" && "text-[#D946EF]"
            )}
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
        onClick={handleStartPause}
        className={cn(
          "px-6 py-2 rounded-full text-white font-medium",
          "transition-all duration-300 transform hover:scale-105",
          "shadow-lg hover:shadow-xl active:scale-95",
          "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
          "hover:from-[#8B5CF6] hover:to-[#D946EF]",
          "animate-glow"
        )}
      >
        {isActive ? buttonText[language].pause : buttonText[language].start}
      </button>

      <audio ref={audioRef} src={audioUrl} loop />
    </div>
  );
};