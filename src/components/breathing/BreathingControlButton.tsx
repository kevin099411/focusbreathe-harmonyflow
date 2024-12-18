import { cn } from "@/lib/utils";

interface BreathingControlButtonProps {
  isActive: boolean;
  onClick: () => void;
  text: string;
}

export const BreathingControlButton = ({
  isActive,
  onClick,
  text,
}: BreathingControlButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-full text-white font-medium",
        "transition-all duration-1000 transform hover:scale-105",
        "shadow-lg hover:shadow-xl active:scale-95",
        "bg-gradient-to-r from-[#9b87f5] to-[#D946EF]",
        "hover:from-[#8B5CF6] hover:to-[#D946EF]",
        "animate-glow"
      )}
    >
      {text}
    </button>
  );
};