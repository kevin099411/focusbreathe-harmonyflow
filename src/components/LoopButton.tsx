import { Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface LoopButtonProps {
  isLooping: boolean;
  onClick: () => void;
  className?: string;
}

export const LoopButton = ({ isLooping, onClick, className }: LoopButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(`
        w-10 h-10 rounded-full
        transition-all duration-200
        hover:scale-105
        ${isLooping ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-white'}
      `, className)}
      onClick={onClick}
    >
      <Repeat className="h-5 w-5" />
    </Button>
  );
};