import { useState } from "react";
import { MeditationVideoPlayer } from "./meditation/MeditationVideoPlayer";
import { VideoOverlay } from "./meditation/VideoOverlay";

interface MeditationVideoProps {
  src: string;
  title?: string;
  audioUrl?: string;
}

export const MeditationVideo = ({ src, title, audioUrl }: MeditationVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white/10 backdrop-blur-sm">
      <MeditationVideoPlayer 
        src={src}
        onPlayStateChange={setIsPlaying}
      />
      <VideoOverlay 
        title={title || ""}
        audioUrl={audioUrl}
        isPlaying={isPlaying}
      />
    </div>
  );
};