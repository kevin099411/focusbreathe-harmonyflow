import { useEffect, useRef } from "react";
import { AudioPlayer } from "./AudioPlayer";

interface MeditationVideoProps {
  src: string;
  title?: string;
  audioUrl?: string;
}

export const MeditationVideo = ({ src, title, audioUrl }: MeditationVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error autoplaying video:', error);
      });
    }
  }, [src]);

  return (
    <div className="relative group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white/10 backdrop-blur-sm">
      <div className="aspect-video">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          controls={false}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        {audioUrl && (
          <div className="transform transition-all duration-300">
            <AudioPlayer audioUrl={audioUrl} />
          </div>
        )}
      </div>
    </div>
  );
};