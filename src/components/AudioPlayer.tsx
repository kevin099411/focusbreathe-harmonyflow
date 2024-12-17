import { Play, Pause, Timer } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface AudioPlayerProps {
  audioUrl?: string;
}

export const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        console.log('Audio playback ended');
        setIsPlaying(false);
      });

      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        toast({
          title: "Audio Error",
          description: "There was an error loading the audio file. Please try again.",
          variant: "destructive",
        });
        setIsPlaying(false);
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current.remove();
        }
      };
    }
  }, [audioUrl]);

  const handlePlayPause = async () => {
    if (!audioUrl) {
      toast({
        title: "Select a Practice",
        description: "Please select a meditation practice to begin.",
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
        title: "Playback Error",
        description: "There was an error playing the audio. Please try again.",
        variant: "destructive",
      });
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handlePlayPause}
        size="icon"
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
      >
        {isPlaying ? 
          <Pause className="h-6 w-6 text-white" /> : 
          <Play className="h-6 w-6 text-white ml-1" />
        }
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