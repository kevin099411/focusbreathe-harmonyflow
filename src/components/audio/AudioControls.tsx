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
    <div className="flex items-center justify-center gap-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg">
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
            <Timer className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">
              {formatTime(remainingTime)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};