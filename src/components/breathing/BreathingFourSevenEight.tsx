import { useState, useEffect } from "react";
import { BreathingCircle } from "./BreathingCircle";
import { BreathingControlButton } from "./BreathingControlButton";
import { ProgressCircle } from "./ProgressCircle";
import { toast } from "@/hooks/use-toast";

export const BreathingFourSevenEight = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"INHALE" | "HOLD" | "EXHALE">("INHALE");
  const [timeRemaining, setTimeRemaining] = useState(4);
  const [cycles, setCycles] = useState(0);

  const totalCycles = 3;
  const phaseDurations = {
    INHALE: 4,
    HOLD: 7,
    EXHALE: 8,
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev > 1) return prev - 1;
          
          switch (phase) {
            case "INHALE":
              setPhase("HOLD");
              return phaseDurations.HOLD;
            case "HOLD":
              setPhase("EXHALE");
              return phaseDurations.EXHALE;
            case "EXHALE":
              if (cycles < totalCycles - 1) {
                setCycles(c => c + 1);
                setPhase("INHALE");
                return phaseDurations.INHALE;
              } else {
                setIsActive(false);
                toast({
                  title: "練習完成",
                  description: "太棒了！您已完成呼吸練習。",
                });
                return 0;
              }
            default:
              return prev;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, cycles]);

  const getPhaseText = () => {
    switch (phase) {
      case "INHALE":
        return "吸氣";
      case "HOLD":
        return "屏息";
      case "EXHALE":
        return "呼氣";
    }
  };

  const getGradientColors = () => {
    switch (phase) {
      case "INHALE":
        return { from: "from-cyan-500", to: "to-blue-500" };
      case "HOLD":
        return { from: "from-purple-500", to: "to-pink-500" };
      case "EXHALE":
        return { from: "from-green-500", to: "to-emerald-500" };
    }
  };

  const getScale = () => {
    switch (phase) {
      case "INHALE":
        return "scale-100";
      case "HOLD":
        return "scale-105";
      case "EXHALE":
        return "scale-95";
    }
  };

  const getBorderColor = () => {
    switch (phase) {
      case "INHALE":
        return "border-blue-500";
      case "HOLD":
        return "border-purple-500";
      case "EXHALE":
        return "border-green-500";
    }
  };

  const getTextColor = () => {
    switch (phase) {
      case "INHALE":
        return "text-blue-500";
      case "HOLD":
        return "text-purple-500";
      case "EXHALE":
        return "text-green-500";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        <BreathingCircle
          phase={phase}
          text={getPhaseText()}
          timeRemaining={timeRemaining}
          gradientColors={getGradientColors()}
          scale={getScale()}
          borderColor={getBorderColor()}
          textColor={getTextColor()}
        />
        <ProgressCircle
          progress={(cycles + 1) / totalCycles}
          color={getTextColor()}
        />
      </div>

      <BreathingControlButton
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
        text={isActive ? "暫停" : "開始"}
      />

      <div className="text-center text-gray-400">
        <p>循環: {cycles + 1}/{totalCycles}</p>
      </div>
    </div>
  );
};