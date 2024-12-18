import { PlayButton } from "../PlayButton";
import { LoopButton } from "../LoopButton";

interface AudioControlButtonsProps {
  isPlaying: boolean;
  isLoaded: boolean;
  isLooping: boolean;
  onPlayPause: () => void;
  onLoopToggle: () => void;
}

export const AudioControlButtons = ({
  isPlaying,
  isLoaded,
  isLooping,
  onPlayPause,
  onLoopToggle,
}: AudioControlButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <PlayButton
        isPlaying={isPlaying}
        isLoaded={isLoaded}
        onClick={onPlayPause}
      />
      <LoopButton
        isLooping={isLooping}
        onClick={onLoopToggle}
      />
    </div>
  );
};