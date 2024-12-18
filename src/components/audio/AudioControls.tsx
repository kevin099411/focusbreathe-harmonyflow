import { PlayButton } from "../PlayButton";
import { LoopButton } from "../LoopButton";
import { Timer } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  isLoaded: boolean;
  isLooping: boolean;
  remainingTime: number | null;
  onPlayPause: () => void;
  onLoopToggle: () => void;
}

export const AudioControls = ({
  isPlaying,
  isLoaded,
  isLooping,
  remainingTime,
  onPlayPause,
  onLoopToggle,
}: AudioControlsProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 p-3 bg-gray-900/30 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 hover:bg-gray-900/40">
      <PlayButton 
        isPlaying={isPlaying}
        isLoaded={isLoaded}
        onClick={onPlayPause}
      />
      <div className="flex items-center gap-3">
        <LoopButton 
          isLooping={isLooping}
          onClick={onLoopToggle}
        />
        {remainingTime !== null && (
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-white/80" />
            <span className="text-sm font-medium text-white/90">
              {formatTime(remainingTime)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};