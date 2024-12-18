import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface BoxBreathingVisualProps {
  phase: "INHALE" | "HOLD1" | "EXHALE" | "HOLD2";
  progress: number;
}

export const BoxBreathingVisual = ({ phase, progress }: BoxBreathingVisualProps) => {
  const [audioContext] = useState(() => new (window.AudioContext || (window as any).webkitAudioContext)());
  
  useEffect(() => {
    if (phase === "INHALE" || phase === "EXHALE") {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for inhale/exhale
      oscillator.frequency.value = phase === "INHALE" ? 396 : 417;
      gainNode.gain.value = 0.1; // Quiet volume
      
      oscillator.start();
      setTimeout(() => oscillator.stop(), 100); // Short duration
      
      return () => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
      };
    }
  }, [phase, audioContext]);

  return (
    <div className="relative w-full h-full">
      {/* Center circle */}
      <div className={cn(
        "absolute inset-0 m-auto w-24 h-24 rounded-full",
        "transition-all duration-500 ease-in-out",
        "flex items-center justify-center text-sm font-medium",
        phase === "INHALE" && "bg-[#87f5b1]/20 scale-125",
        phase === "HOLD1" && "bg-[#9b87f5]/20 scale-110",
        phase === "EXHALE" && "bg-[#0EA5E9]/20 scale-90",
        phase === "HOLD2" && "bg-[#D946EF]/20 scale-100"
      )}>
        <div className={cn(
          "absolute inset-0 rounded-full",
          "transition-opacity duration-300",
          "animate-pulse"
        )} />
        <span className={cn(
          "relative z-10",
          phase === "INHALE" && "text-[#87f5b1]",
          phase === "HOLD1" && "text-[#9b87f5]",
          phase === "EXHALE" && "text-[#0EA5E9]",
          phase === "HOLD2" && "text-[#D946EF]"
        )}>
          {phase === "INHALE" && "吸氣"}
          {phase === "HOLD1" && "屏息"}
          {phase === "EXHALE" && "呼氣"}
          {phase === "HOLD2" && "屏息"}
        </span>
      </div>

      {/* Animated border */}
      <div className={cn(
        "absolute inset-0",
        "border-4 rounded-lg",
        "transition-all duration-500",
        phase === "INHALE" && "border-[#87f5b1]/50 scale-105",
        phase === "HOLD1" && "border-[#9b87f5]/50",
        phase === "EXHALE" && "border-[#0EA5E9]/50 scale-95",
        phase === "HOLD2" && "border-[#D946EF]/50"
      )} />

      {/* Progress indicator */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 h-1 bg-gradient-to-r",
          phase === "INHALE" && "from-[#87f5b1] to-[#9b87f5]",
          phase === "HOLD1" && "from-[#9b87f5] to-[#0EA5E9]",
          phase === "EXHALE" && "from-[#0EA5E9] to-[#D946EF]",
          phase === "HOLD2" && "from-[#D946EF] to-[#87f5b1]"
        )}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};