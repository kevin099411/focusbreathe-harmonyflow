import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const BREATH_PHASES = {
  INHALE: { 
    en: { text: "Inhale" },
    zh: { text: "吸氣" },
    duration: 4000 
  },
  HOLD: { 
    en: { text: "Hold" },
    zh: { text: "屏息" },
    duration: 7000 
  },
  EXHALE: { 
    en: { text: "Exhale" },
    zh: { text: "呼氣" },
    duration: 8000 
  },
};

type Phase = keyof typeof BREATH_PHASES;

export const BreathingFourSevenEight = () => {
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

    const phases: Phase[] = ["INHALE", "HOLD", "EXHALE"];
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#87f5b1]/20 to-[#46ef8d]/20 rounded-full animate-pulse" />
        <div className="absolute inset-2 bg-gradient-to-tr from-[#deffed]/30 to-[#def2ff]/30 rounded-full" />
        
        <div className={cn(
          "absolute inset-4 rounded-full border-4 border-[#87f5b1] transition-all duration-500",
          "flex items-center justify-center",
          "bg-white/90 backdrop-blur-sm shadow-lg",
          currentPhase === "INHALE" && "scale-110",
          currentPhase === "EXHALE" && "scale-90"
        )}>
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#6bab87]">
              {BREATH_PHASES[currentPhase][language].text}
            </p>
            <p className="text-lg text-[#8E9196]">
              {Math.ceil((1 - progress) * BREATH_PHASES[currentPhase].duration / 1000)}
            </p>
          </div>
        </div>

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
            className="text-[#87f5b1] transition-all duration-500"
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

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleStartPause}
          className={cn(
            "px-6 py-2 rounded-full text-white font-medium transition-all",
            "shadow-lg hover:shadow-xl",
            "bg-gradient-to-r from-[#87f5b1] to-[#46ef8d]",
            "hover:from-[#5cf68b] hover:to-[#46ef8d]",
            "active:scale-95"
          )}
        >
          {isActive ? buttonText[language].pause : buttonText[language].start}
        </button>

        <audio ref={audioRef} src={audioUrl} loop />
      </div>
    </div>
  );
};