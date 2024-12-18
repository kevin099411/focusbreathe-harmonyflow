import { MeditationHeader } from "@/features/meditation/MeditationHeader";
import { MeditationVideoGrid } from "@/features/meditation/MeditationVideoGrid";
import { MeditationTabs } from "@/features/meditation/MeditationTabs";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7F0FD] to-[#FFDEE2] bg-opacity-50">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl animate-fade-in">
        <MeditationHeader title="呼吸的奇蹟" />
        <MeditationVideoGrid />
        <MeditationTabs />
      </div>
    </div>
  );
};

export default Meditate;