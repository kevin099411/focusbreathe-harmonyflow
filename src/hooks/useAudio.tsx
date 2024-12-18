import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const useAudio = (audioUrl?: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log('AudioPlayer: URL changed:', audioUrl);
    
    setIsPlaying(false);
    setIsLoaded(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    if (!audioUrl) {
      console.log('No audio URL provided');
      return;
    }

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
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleLoadError);
    audio.addEventListener('ended', handleEnded);
    audio.loop = isLooping;
    
    audio.src = audioUrl;
    audio.load();

    return () => {
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

  const togglePlay = async () => {
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

  return {
    isPlaying,
    isLoaded,
    isLooping,
    togglePlay,
    toggleLoop,
    audioRef
  };
};