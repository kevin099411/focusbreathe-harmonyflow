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
      className={`text-gray-400 hover:text-white ${isLooping ? 'text-primary' : ''}`}
      onClick={onClick}
    >
      <Repeat className="h-5 w-5" />
    </Button>
  );
};