import { Timer } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { PlayButton } from "./PlayButton";
import { LoopButton } from "./LoopButton";

interface AudioPlayerProps {
  audioUrl?: string;
  duration?: number; // Duration in minutes
  onTimerEnd?: () => void;
}

export const AudioPlayer = ({ audioUrl, duration, onTimerEnd }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('AudioPlayer: URL changed:', audioUrl);
    
    // Reset states when URL changes
    setIsPlaying(false);
    setIsLoaded(false);
    setRemainingTime(duration ? duration * 60 : null);

    // Cleanup previous audio instance
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    if (!audioUrl) {
      console.log('No audio URL provided');
      return;
    }

    // Create new audio instance
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoaded(true);
    };

    const handleLoadError = (e: ErrorEvent) => {
      console.error('Audio loading error:', e);
      setIsLoaded(false);
      toast({
        title: "音頻加載錯誤",
        description: "無法加載音頻文件，請重試。",
        variant: "destructive",
      });
    };

    const handleEnded = () => {
      console.log('Audio playback ended');
      if (isLooping && remainingTime && remainingTime > 0) {
        console.log('Restarting audio (loop)');
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Error restarting audio:', error);
          handlePlayError(error);
        });
      } else if (!remainingTime) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleLoadError);
    audio.addEventListener('ended', handleEnded);
    
    audio.src = audioUrl;
    audio.load();

    return () => {
      console.log('Cleaning up audio element');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audio) {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleLoadError);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audio.src = '';
      }
    };
  }, [audioUrl, isLooping, remainingTime]);

  useEffect(() => {
    if (isPlaying && remainingTime !== null) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
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
  }, [isPlaying, onTimerEnd]);

  const handlePlayError = (error: any) => {
    console.error('Playback error:', error);
    toast({
      title: "播放錯誤",
      description: "播放音頻時發生錯誤，請重試。",
      variant: "destructive",
    });
    setIsPlaying(false);
  };

  const handlePlayPause = async () => {
    if (!audioUrl) {
      toast({
        title: "請選擇音頻",
        description: "請先選擇一個冥想練習。",
        variant: "destructive",
      });
      return;
    }

    if (!isLoaded) {
      toast({
        title: "請稍候",
        description: "音頻正在加載中...",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isPlaying && audioRef.current) {
        console.log('Pausing audio');
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (audioRef.current) {
        console.log('Playing audio:', audioUrl);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      handlePlayError(error);
    }
  };

  const toggleLoop = () => {
    console.log('Toggling loop:', !isLooping);
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

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
        onClick={handlePlayPause}
      />
      <div className="flex items-center gap-3">
        <LoopButton 
          isLooping={isLooping}
          onClick={toggleLoop}
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