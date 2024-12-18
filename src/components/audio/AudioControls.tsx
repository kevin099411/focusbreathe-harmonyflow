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
    <div className="flex items-center gap-3 p-2 rounded-2xl">
      <PlayButton 
        isPlaying={isPlaying}
        isLoaded={isLoaded}
        onClick={onPlayPause}
      />
      <div className="flex items-center gap-2">
        <LoopButton 
          isLooping={isLooping}
          onClick={onLoopToggle}
        />
        {remainingTime !== null && (
          <div className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full">
            <Timer className="h-4 w-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-800">
              {formatTime(remainingTime)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};