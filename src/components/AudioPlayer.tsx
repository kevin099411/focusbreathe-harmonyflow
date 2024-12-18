import { useAudioPlayer } from "./audio/useAudioPlayer";
import { AudioControls } from "./audio/AudioControls";

interface AudioPlayerProps {
  audioUrl?: string;
  duration?: number;
  onTimerEnd?: () => void;
}

export const AudioPlayer = ({ audioUrl, duration, onTimerEnd }: AudioPlayerProps) => {
  const {
    isPlaying,
    isLoaded,
    isLooping,
    remainingTime,
    handlePlayPause,
    toggleLoop,
  } = useAudioPlayer(audioUrl, duration, onTimerEnd);

  return (
    <AudioControls
      isPlaying={isPlaying}
      isLoaded={isLoaded}
      isLooping={isLooping}
      remainingTime={remainingTime}
      onPlayPause={handlePlayPause}
      onLoopToggle={toggleLoop}
    />
  );
};