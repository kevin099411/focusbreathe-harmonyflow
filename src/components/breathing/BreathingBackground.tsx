import { cn } from "@/lib/utils";

interface BreathingBackgroundProps {
  phase: string;
  gradientColors: {
    from: string;
    to: string;
  };
}

export const BreathingBackground = ({ phase, gradientColors }: BreathingBackgroundProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-full transition-all duration-500",
        `bg-gradient-to-br from-${gradientColors.from}/30 to-${gradientColors.to}/30`,
        phase.includes("HOLD") ? "animate-pulse" : "animate-wind"
      )}
    />
  );
};