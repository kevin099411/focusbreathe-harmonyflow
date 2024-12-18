import { cn } from "@/lib/utils";

interface BreathingProgressCircleProps {
  progress: number;
  strokeColor: string;
}

export const BreathingProgressCircle = ({ progress, strokeColor }: BreathingProgressCircleProps) => {
  return (
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
        className={cn("transition-all duration-300", strokeColor)}
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
  );
};