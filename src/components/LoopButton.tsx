import { Repeat } from "lucide-react";
import { Button } from "./ui/button";

interface LoopButtonProps {
  isLooping: boolean;
  onClick: () => void;
}

export const LoopButton = ({ isLooping, onClick }: LoopButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`
        w-10 h-10 rounded-full
        transition-all duration-200
        hover:scale-105
        ${isLooping ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-white'}
      `}
      onClick={onClick}
    >
      <Repeat className="h-5 w-5" />
    </Button>
  );
};