import { MeditationCategories } from "@/components/MeditationCategories";
import { TimeSelection } from "@/components/TimeSelection";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 px-4">
      <div className="container mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-secondary mb-4">Meditation Practice</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Choose from various meditation practices designed to enhance your focus,
            relaxation, and overall well-being. Select a category and duration that
            suits your needs.
          </p>
        </div>
        
        <MeditationCategories />
        <TimeSelection />
      </div>
    </div>
  );
};

export default Meditate;