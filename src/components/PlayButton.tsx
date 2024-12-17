import { Play, Pause } from "lucide-react";
import { Button } from "./ui/button";

interface PlayButtonProps {
  isPlaying: boolean;
  isLoaded: boolean;
  onClick: () => void;
}

export const PlayButton = ({ isPlaying, isLoaded, onClick }: PlayButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={`
        w-14 h-14 rounded-full 
        ${isPlaying ? 'bg-secondary' : 'bg-primary'} 
        hover:scale-105 transition-all duration-200
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
      `}
      disabled={!isLoaded}
    >
      {isPlaying ? 
        <Pause className="h-7 w-7 text-white" /> : 
        <Play className="h-7 w-7 text-white ml-1" />
      }
    </Button>
  );
};