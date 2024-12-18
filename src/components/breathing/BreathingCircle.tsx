import { cn } from "@/lib/utils";

interface BreathingCircleProps {
  phase: string;
  text: string;
  timeRemaining: number;
  gradientColors: {
    from: string;
    to: string;
  };
  scale: string;
  borderColor: string;
  textColor: string;
}

export const BreathingCircle = ({
  phase,
  text,
  timeRemaining,
  gradientColors,
  scale,
  borderColor,
  textColor,
}: BreathingCircleProps) => {
  return (
    <div className="relative w-64 h-64">
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-1000",
          `bg-gradient-to-br from-${gradientColors.from} to-${gradientColors.to}`,
          phase.includes("HOLD") ? "animate-breathe" : "animate-wind"
        )}
      />

      {/* Main breathing circle */}
      <div
        className={cn(
          "absolute inset-4 rounded-full",
          "flex items-center justify-center backdrop-blur-sm",
          "bg-white/90 shadow-lg border-2",
          "transition-all duration-1000",
          scale,
          `border-${borderColor}`
        )}
      >
        <div className="text-center">
          <p className={cn("text-2xl font-semibold transition-colors duration-300", textColor)}>
            {text}
          </p>
          <p className="text-lg text-[#8E9196]">{timeRemaining}</p>
        </div>
      </div>
    </div>
  );
};