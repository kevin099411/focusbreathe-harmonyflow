import { AudioProgress } from "./AudioProgress";
import { AudioControlButtons } from "./AudioControlButtons";

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
  return (
    <div className="flex items-center justify-between w-full max-w-[200px]">
      <AudioControlButtons
        isPlaying={isPlaying}
        isLoaded={isLoaded}
        isLooping={isLooping}
        onPlayPause={onPlayPause}
        onLoopToggle={onLoopToggle}
      />
      <AudioProgress remainingTime={remainingTime} />
    </div>
  );
};