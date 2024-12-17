import { Timer } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { PlayButton } from "./PlayButton";
import { LoopButton } from "./LoopButton";

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
    
    // Reset states when URL changes
    setIsPlaying(false);
    setIsLoaded(false);

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
      if (isLooping) {
        console.log('Restarting audio (loop)');
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Error restarting audio:', error);
          handlePlayError(error);
        });
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleLoadError);
    audio.addEventListener('ended', handleEnded);
    
    // Set the source after adding event listeners
    audio.src = audioUrl;
    audio.load();

    return () => {
      console.log('Cleaning up audio element');
      if (audio) {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleLoadError);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audio.src = '';
      }
    };
  }, [audioUrl, isLooping]);

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
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full text-gray-400 hover:text-white hover:scale-105 transition-all duration-200"
        >
          <Timer className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};