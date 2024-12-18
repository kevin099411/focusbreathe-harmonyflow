import { AudioPlayer } from "../AudioPlayer";

interface VideoOverlayProps {
  title: string;
  audioUrl?: string;
  isPlaying: boolean;
}

export const VideoOverlay = ({ title, audioUrl, isPlaying }: VideoOverlayProps) => {
  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent 
        transform transition-all duration-300 ${
          isPlaying ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        } group-hover:translate-y-0 group-hover:opacity-100`}
    >
      <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
      {audioUrl && (
        <div className="transform transition-all duration-300">
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      )}
    </div>
  );
};