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
      className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
      disabled={!isLoaded}
    >
      {isPlaying ? 
        <Pause className="h-6 w-6 text-white" /> : 
        <Play className="h-6 w-6 text-white ml-1" />
      }
    </Button>
  );
};