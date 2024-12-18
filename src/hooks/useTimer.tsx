import { useState, useRef, useEffect } from "react";

export const useTimer = (initialTime: number | null, onTimerEnd?: () => void) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = (isPlaying: boolean) => {
    if (isPlaying && remainingTime !== null) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timerRef.current!);
            onTimerEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  };

  const resetTimer = (duration: number | undefined) => {
    setRemainingTime(duration ? duration * 60 : null);
  };

  return {
    remainingTime,
    startTimer,
    resetTimer
  };
};