import { MeditationCategories } from "@/components/MeditationCategories";
import { TimeSelection } from "@/components/TimeSelection";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BreathingExercise } from "@/components/BreathingExercise";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-[#222222] text-white pt-16">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">冥想練習</h1>
          <LanguageSwitcher />
        </div>
        <div className="space-y-12">
          <BreathingExercise />
          <div className="border-t border-gray-800 pt-12">
            <MeditationCategories />
          </div>
          <TimeSelection />
        </div>
      </div>
    </div>
  );
};

export default Meditate;