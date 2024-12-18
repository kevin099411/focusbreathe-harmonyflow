import { cn } from "@/lib/utils";

interface AudioProgressProps {
  remainingTime: number | null;
  className?: string;
}

export const AudioProgress = ({ remainingTime, className }: AudioProgressProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("text-sm text-gray-500", className)}>
      {remainingTime !== null ? formatTime(remainingTime) : '--:--'}
    </div>
  );
};