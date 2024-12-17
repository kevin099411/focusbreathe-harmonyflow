import { Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface MeditationCardProps {
  title: string;
  duration: string;
  description: string;
  image: string;
  audioUrl?: string;
}

export const MeditationCard = ({ title, duration, description, image, audioUrl }: MeditationCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element when component mounts
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Add event listeners
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

      // Cleanup function
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
        title: "Audio not available",
        description: "This meditation doesn't have audio content yet.",
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
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePlayPause}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
    </div>
  );
};