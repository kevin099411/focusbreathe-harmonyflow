import { useAudio } from "@/hooks/useAudio";
import { useTimer } from "@/hooks/useTimer";

export const useAudioPlayer = (audioUrl?: string, duration?: number, onTimerEnd?: () => void) => {
  const {
    isPlaying,
    isLoaded,
    isLooping,
    togglePlay,
    toggleLoop,
  } = useAudio(audioUrl);

  const {
    remainingTime,
    startTimer,
    resetTimer
  } = useTimer(duration ? duration * 60 : null, onTimerEnd);

  const handlePlayPause = async () => {
    if (!isPlaying) {
      resetTimer(duration);
    }
    await togglePlay();
    startTimer(!isPlaying);
  };

  return {
    isPlaying,
    isLoaded,
    isLooping,
    remainingTime,
    handlePlayPause,
    toggleLoop,
  };
};