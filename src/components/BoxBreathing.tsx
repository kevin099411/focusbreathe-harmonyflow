import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BreathingBackground } from "./breathing/BreathingBackground";
import { BreathingTimer } from "./breathing/BreathingTimer";
import { BreathingProgressCircle } from "./breathing/BreathingProgressCircle";
import { BreathingControlButton } from "./breathing/BreathingControlButton";

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
        return { from: "[#9b87f5]", to: "[#D946EF]" };
      case "HOLD1":
        return { from: "[#87f5b1]", to: "[#46ef8d]" };
      case "EXHALE":
        return { from: "[#0EA5E9]", to: "[#46ef8d]" };
      case "HOLD2":
        return { from: "[#D946EF]", to: "[#9b87f5]" };
    }
  };

  const getTextColor = () => {
    switch (currentPhase) {
      case "INHALE":
        return "text-[#9b87f5]";
      case "HOLD1":
        return "text-[#87f5b1]";
      case "EXHALE":
        return "text-[#0EA5E9]";
      case "HOLD2":
        return "text-[#D946EF]";
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
          "absolute inset-4 rounded-full transition-all duration-500",
          "flex items-center justify-center backdrop-blur-sm",
          "bg-white/90 shadow-lg border-2",
          currentPhase === "INHALE" && "scale-110 border-[#9b87f5]",
          currentPhase === "HOLD1" && "scale-105 border-[#87f5b1]",
          currentPhase === "EXHALE" && "scale-90 border-[#0EA5E9]",
          currentPhase === "HOLD2" && "scale-95 border-[#D946EF]"
        )}>
          <BreathingTimer
            timeRemaining={Math.ceil((1 - progress) * 4)}
            textColor={getTextColor()}
            phaseText={BREATH_PHASES[currentPhase].text}
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
