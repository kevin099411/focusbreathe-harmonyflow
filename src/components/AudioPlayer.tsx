import { Play, Pause, Timer, Repeat } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  audioUrl?: string;
}

export const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log('AudioPlayer: URL changed:', audioUrl);
    setIsPlaying(false);
    setIsLoaded(false);

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
        setIsLoaded(true);
      });

      audio.addEventListener('ended', () => {
        console.log('Audio playback ended');
        if (isLooping) {
          console.log('Restarting audio (loop)');
          audio.currentTime = 0;
          audio.play().catch(error => {
            console.error('Error restarting audio:', error);
            toast({
              title: "播放錯誤",
              description: "重新播放時發生錯誤，請重試。",
              variant: "destructive",
            });
          });
        } else {
          setIsPlaying(false);
        }
      });

      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsLoaded(false);
        toast({
          title: "音頻錯誤",
          description: "加載音頻文件時出錯。請重試。",
          variant: "destructive",
        });
        setIsPlaying(false);
      });

      return () => {
        console.log('Cleaning up audio element');
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current.remove();
          audioRef.current = null;
        }
      };
    }
  }, [audioUrl, isLooping]);

  const handlePlayPause = async () => {
    if (!audioUrl) {
      toast({
        title: "選擇練習",
        description: "請選擇一個冥想練習開始。",
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
      console.error('Error playing audio:', error);
      toast({
        title: "播放錯誤",
        description: "播放音頻時發生錯誤。請重試。",
        variant: "destructive",
      });
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    console.log('Toggling loop:', !isLooping);
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handlePlayPause}
        size="icon"
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
        disabled={!isLoaded}
      >
        {isPlaying ? 
          <Pause className="h-6 w-6 text-white" /> : 
          <Play className="h-6 w-6 text-white ml-1" />
        }
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`text-gray-400 hover:text-white ${isLooping ? 'text-primary' : ''}`}
        onClick={toggleLoop}
      >
        <Repeat className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-white"
      >
        <Timer className="h-5 w-5" />
      </Button>
    </div>
  );
};