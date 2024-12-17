import { MeditationCategories } from "@/components/MeditationCategories";
import { TimeSelection } from "@/components/TimeSelection";
import { AudioPlayer } from "@/components/AudioPlayer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-[#222222] text-white pt-16">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">冥想練習</h1>
          <LanguageSwitcher />
        </div>
        <div className="space-y-8">
          <MeditationCategories />
          <TimeSelection />
          <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] p-4 border-t border-gray-800">
            <div className="max-w-4xl mx-auto">
              <AudioPlayer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditate;