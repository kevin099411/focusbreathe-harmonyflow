import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BreathingBackground } from "./breathing/BreathingBackground";
import { BreathingTimer } from "./breathing/BreathingTimer";
import { BreathingProgressCircle } from "./breathing/BreathingProgressCircle";
import { BreathingControlButton } from "./breathing/BreathingControlButton";
import { BoxBreathingVisual } from "./breathing/BoxBreathingVisual";

const BREATH_PHASES = {
  INHALE: { 
    text: "吸氣",
    duration: 4000 
  },
  HOLD1: { 
    text: "屏息",
    duration: 4000 
  },
  EXHALE: { 
    text: "呼氣",
    duration: 4000 
  },
  HOLD2: { 
    text: "屏息",
    duration: 4000 
  },
};

type Phase = keyof typeof BREATH_PHASES;

export const BoxBreathing = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>("INHALE");
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const getGradientColors = () => {
    switch (currentPhase) {
      case "INHALE":
        return { from: "[#FFDEE2]", to: "[#FFDEE2]" };
      case "HOLD1":
        return { from: "[#FFDEE2]", to: "[#FFDEE2]" };
      case "EXHALE":
        return { from: "[#FFDEE2]", to: "[#FFDEE2]" };
      case "HOLD2":
        return { from: "[#FFDEE2]", to: "[#FFDEE2]" };
    }
  };

  const getTextColor = () => {
    switch (currentPhase) {
      case "INHALE":
        return "text-[#FFDEE2]";
      case "HOLD1":
        return "text-[#FFDEE2]";
      case "EXHALE":
        return "text-[#FFDEE2]";
      case "HOLD2":
        return "text-[#FFDEE2]";
    }
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const buttonText = {
    start: "開始",
    pause: "暫停"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <div className="relative w-64 h-64">
        <BreathingBackground 
          phase={currentPhase}
          gradientColors={getGradientColors()}
        />
        
        <div className={cn(
          "absolute inset-4 rounded-xl transition-all duration-500",
          "flex items-center justify-center backdrop-blur-sm",
          "bg-white/90 shadow-lg"
        )}>
          <BoxBreathingVisual
            phase={currentPhase}
            progress={progress}
          />
        </div>

        <BreathingProgressCircle
          progress={progress}
          strokeColor={getTextColor()}
        />
      </div>

      <BreathingControlButton
        isActive={isActive}
        onClick={handleStartPause}
        text={isActive ? buttonText.pause : buttonText.start}
      />

      <audio ref={audioRef} src={audioUrl} loop />
    </div>
  );
};