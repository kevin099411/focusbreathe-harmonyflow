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
        ${isPlaying ? 'bg-[#FFDEE2] hover:bg-[#FFDEE2]/90' : 'bg-[#FFDEE2] hover:bg-[#FFDEE2]/90'} 
        transition-all duration-300
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
        animate-glow
        hover:scale-110
        backdrop-blur-sm
        relative
        z-10
        before:content-['']
        before:absolute
        before:inset-0
        before:rounded-full
        before:bg-gradient-to-r
        before:from-[#FFDEE2]/20
        before:to-[#FFDEE2]/20
        before:animate-spin
        before:duration-3000
        before:-z-10
      `}
      disabled={!isLoaded}
    >
      {isPlaying ? 
        <Pause className="h-7 w-7 text-gray-700 drop-shadow-lg" /> : 
        <Play className="h-7 w-7 text-gray-700 ml-1 drop-shadow-lg" />
      }
    </Button>
  );
};