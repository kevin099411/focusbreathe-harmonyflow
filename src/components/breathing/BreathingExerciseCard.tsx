import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface BreathingExerciseCardProps {
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const BreathingExerciseCard = ({
  title,
  description,
  duration,
  icon,
  onClick,
  className,
}: BreathingExerciseCardProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center p-8 bg-[#1A1A1A] rounded-xl",
        "border border-gray-800/20 backdrop-blur-sm",
        "transition-all duration-500",
        "hover:border-[#0EA5E9]/20",
        className
      )}
    >
      <div className="mb-4 text-[#0EA5E9]">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-2">Last time: {duration}</p>
      <p className="text-sm text-gray-400 text-center mb-6 max-w-xs">
        {description}
      </p>
      <Button 
        onClick={onClick}
        className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white"
      >
        Select exercise
      </Button>
    </div>
  );
};