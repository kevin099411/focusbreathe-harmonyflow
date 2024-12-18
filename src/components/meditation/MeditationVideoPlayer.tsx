import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MeditationVideoPlayerProps {
  src: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const MeditationVideoPlayer = ({ src, onPlayStateChange }: MeditationVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadStart = () => {
        console.log('Video loading started:', src);
        setIsLoading(true);
      };

      const handleCanPlay = () => {
        console.log('Video can play:', src);
        setIsLoading(false);
        video.play().catch(error => {
          console.error('Error autoplaying video:', error);
          toast({
            title: "無法自動播放影片",
            description: "請點擊影片開始播放",
          });
        });
      };

      const handleError = (error: ErrorEvent) => {
        console.error('Video loading error:', error);
        setIsLoading(false);
        toast({
          title: "影片載入錯誤",
          description: "請重新整理頁面再試一次",
          variant: "destructive",
        });
      };

      const handlePlay = () => {
        console.log('Video started playing:', src);
        onPlayStateChange?.(true);
      };

      const handlePause = () => {
        console.log('Video paused:', src);
        onPlayStateChange?.(false);
      };

      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [src, onPlayStateChange]);

  return (
    <div className="relative aspect-video">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loop
        muted
        playsInline
        autoPlay
        controls={false}
      />
    </div>
  );
};