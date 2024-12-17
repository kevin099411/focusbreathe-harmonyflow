import { MeditationCategories } from "@/components/MeditationCategories";
import { TimeSelection } from "@/components/TimeSelection";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PayPalButton } from "@/components/PayPalButton";
import { useState } from "react";

const Meditate = () => {
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#222222] text-white pt-20 px-4">
      <div className="container mx-auto space-y-12 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">冥想練習</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            從各種冥想練習中選擇，旨在提升您的專注力、放鬆度和整體健康。
          </p>
        </div>
        
        <div className="space-y-8">
          <MeditationCategories onSelect={setSelectedPractice} />
          <TimeSelection />
          
          {/* PayPal Integration */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">高級冥想訪問</h2>
            <p className="text-gray-300 mb-6">
              通過高級訂閱解鎖所有冥想練習和可下載內容。
            </p>
            <PayPalButton 
              amount="29.99"
              planTitle="高級冥想"
            />
          </div>

          {/* Player Section */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] p-4 border-t border-gray-800">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-primary">🧘</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">當前練習</h3>
                  <p className="text-xs text-gray-400">
                    {selectedPractice || "選擇練習開始"}
                  </p>
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