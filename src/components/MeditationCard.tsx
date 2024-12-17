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
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow">
      <MeditationImage image={image} title={title} />
      <div className="p-6">
        <MeditationInfo 
          title={title}
          duration={duration}
          description={description}
        />
        <div className="flex justify-between items-center">
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      </div>
    </div>
  );
};