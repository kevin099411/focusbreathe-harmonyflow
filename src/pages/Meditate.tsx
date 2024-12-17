import { MeditationCategories } from "@/components/MeditationCategories";
import { TimeSelection } from "@/components/TimeSelection";
import { AudioPlayer } from "@/components/AudioPlayer";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-[#222222] text-white pt-20 px-4">
      <div className="container mx-auto space-y-12 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Meditation Practice</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose from various meditation practices designed to enhance your focus,
            relaxation, and overall well-being.
          </p>
        </div>
        
        <div className="space-y-8">
          <MeditationCategories />
          <TimeSelection />
          
          {/* Player Section */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] p-4 border-t border-gray-800">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-primary">🧘</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Current Session</h3>
                  <p className="text-xs text-gray-400">Select a practice to begin</p>
                </div>
              </div>
              <AudioPlayer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditate;