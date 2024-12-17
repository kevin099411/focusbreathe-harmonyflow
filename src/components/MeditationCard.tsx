import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
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

  const handlePlayPause = () => {
    if (!audioUrl) {
      toast({
        title: "Audio not available",
        description: "This meditation doesn't have audio content yet.",
        variant: "destructive",
      });
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          toast({
            title: "Playback Error",
            description: "There was an error playing the audio. Please try again.",
            variant: "destructive",
          });
        });
      }
      setIsPlaying(!isPlaying);
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
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
            console.error("Audio error:", e);
            toast({
              title: "Audio Error",
              description: "There was an error with the audio file.",
              variant: "destructive",
            });
          }}
        />
      )}
    </div>
  );
};