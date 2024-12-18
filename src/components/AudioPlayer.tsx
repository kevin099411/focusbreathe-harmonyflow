import { useAudioPlayer } from "./audio/useAudioPlayer";
import { AudioControls } from "./audio/AudioControls";
import { toast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  audioUrl?: string;
  duration?: number;
  onTimerEnd?: () => void;
}

export const AudioPlayer = ({ audioUrl, duration, onTimerEnd }: AudioPlayerProps) => {
  if (!audioUrl) {
    console.warn('AudioPlayer: No audio URL provided');
    return null;
  }

  const {
    isPlaying,
    isLoaded,
    isLooping,
    remainingTime,
    handlePlayPause,
    toggleLoop,
  } = useAudioPlayer(audioUrl, duration, () => {
    onTimerEnd?.();
    toast({
      title: "音頻播放結束",
      description: "您可以重新播放或選擇其他音頻",
    });
  });

  if (!isLoaded) {
    console.log('AudioPlayer: Audio still loading');
  }

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