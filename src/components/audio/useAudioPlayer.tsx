import { useState, useEffect } from "react";
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
    console.log('AudioPlayer: Handling play/pause');
    if (!isPlaying) {
      console.log('AudioPlayer: Starting timer with duration:', duration);
      resetTimer(duration);
    }
    await togglePlay();
    startTimer(!isPlaying);
  };

  useEffect(() => {
    console.log('AudioPlayer: Component mounted with URL:', audioUrl);
    return () => {
      console.log('AudioPlayer: Component unmounted');
    };
  }, [audioUrl]);

  return {
    isPlaying,
    isLoaded,
    isLooping,
    remainingTime,
    handlePlayPause,
    toggleLoop,
  };
};