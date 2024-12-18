import { MeditationImage } from "./MeditationImage";
import { MeditationInfo } from "./MeditationInfo";
import { AudioPlayer } from "./AudioPlayer";

interface MeditationCardProps {
  title: string;
  duration: string;
  description: string;
  image: string;
  audioUrl?: string;
}

export const MeditationCard = ({ title, duration, description, image, audioUrl }: MeditationCardProps) => {
  return (
    <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <div className="transform transition-transform duration-500 group-hover:scale-110">
          <MeditationImage image={image} title={title} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 bg-gradient-to-b from-primary/5 to-secondary/5">
        <MeditationInfo 
          title={title}
          duration={duration}
          description={description}
        />
        <div className="mt-4 transform transition-all duration-300 group-hover:translate-y-0 opacity-90 group-hover:opacity-100">
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      </div>
    </div>
  );
};