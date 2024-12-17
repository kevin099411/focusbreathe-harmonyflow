import { Play } from "lucide-react";

interface MeditationCardProps {
  title: string;
  duration: string;
  description: string;
  image: string;
}

export const MeditationCard = ({ title, duration, description, image }: MeditationCardProps) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all duration-300">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90 mb-2">{duration}</p>
          <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        </div>
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Play className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};