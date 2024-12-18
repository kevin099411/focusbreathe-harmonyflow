import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AudioPlayer } from "./AudioPlayer";
import { ScrollArea } from "./ui/scroll-area";
import { DurationSelector } from "./DurationSelector";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  audioUrls: {
    [key: string]: string;
  };
}

const categories: Category[] = [
  {
    id: "adhd",
    title: "ADHD 852hz 改善",
    description: "閱讀時的背景聲音",
    icon: "🧠",
    audioUrls: {
      "5": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3",
      "10": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3",
      "20": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3",
      "30": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3"
    }
  },
  {
    id: "colored-noise",
    title: "彩色噪音",
    description: "白噪音、粉噪音和棕噪音助於專注",
    icon: "🌊",
    audioUrls: {
      "5": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/rainblow.m4a",
      "10": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/rainblow.m4a",
      "20": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/rainblow.m4a",
      "30": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/rainblow.m4a"
    }
  },
  {
    id: "focus",
    title: "專注",
    description: "增強集中力和清晰度",
    icon: "🎯",
    audioUrls: {
      "5": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3",
      "10": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3",
      "20": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3",
      "30": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3"
    }
  },
  {
    id: "relax",
    title: "放鬆",
    description: "深度放鬆和緩解壓力",
    icon: "🧘",
    audioUrls: {
      "5": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3",
      "10": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3",
      "20": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3",
      "30": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3"
    }
  },
  {
    id: "deep-work",
    title: "深度工作",
    description: "延長專注時段",
    icon: "💪",
    audioUrls: {
      "5": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3",
      "10": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3",
      "20": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3",
      "30": "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Ultimate%20Focus%20Playlist_%20Instrumental%20Music%20for%20Deep%20Work%20&%20Productivity_1734491684407.mp3"
    }
  }
];

export const MeditationCategories = ({ onSelect }: { onSelect?: (category: string) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(5);
  const session = useSession();
  const navigate = useNavigate();

  const handleShuffle = () => {
    const availableCategories = categories;
    const randomIndex = Math.floor(Math.random() * availableCategories.length);
    setSelectedCategory(availableCategories[randomIndex].id);
    onSelect?.(availableCategories[randomIndex].id);
  };

  const handleSelect = (category: Category) => {
    setSelectedCategory(category.id);
    onSelect?.(category.id);
  };

  const handleTimerEnd = () => {
    toast({
      title: "靜坐結束",
      description: "您的靜坐時間已結束。",
    });
    setSelectedCategory(null);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const selectedAudioUrl = selectedCategoryData?.audioUrls[selectedDuration.toString()];

  return (
    <div className="space-y-6 bg-gradient-to-br from-[#E7F0FD]/30 to-[#FFDEE2]/30 p-4 md:p-8 rounded-3xl backdrop-blur-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-medium text-[#333333] tracking-wide">選擇您的練習</h2>
          <Button onClick={handleShuffle} variant="ghost" size="sm" className="gap-1 text-[#333333] hover:text-[#FFDEE2] transition-colors duration-300">
            <Shuffle className="h-4 w-4" />
            隨機選擇
          </Button>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-[#333333] text-base md:text-lg">準備好開始您的呼吸之旅了嗎？</p>
          <p className="text-[#333333] text-sm md:text-base">通過我們的引導式呼吸練習，學習如何正確呼吸，改善身心健康。</p>
          <Button 
            onClick={() => handleSelect(categories[0])} 
            variant="ghost" 
            size="lg"
            className="mt-4 gap-2 text-[#333333] hover:text-[#FFDEE2] hover:bg-white/50 transition-all duration-300 rounded-full px-4 md:px-8 shadow-lg hover:shadow-xl"
          >
            開始練習 → 方箱呼吸練習
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-24rem)] md:h-[400px] rounded-xl pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`p-4 md:p-6 cursor-pointer transition-all duration-300 hover:scale-105 
                ${selectedCategory === category.id 
                  ? 'bg-gradient-to-br from-[#FFDEE2]/30 to-[#E7F0FD]/30 border-[#FFDEE2]' 
                  : 'bg-white/70 hover:bg-gradient-to-br hover:from-[#FFDEE2]/20 hover:to-[#E7F0FD]/20'} 
                backdrop-blur-md shadow-lg hover:shadow-xl rounded-xl border border-transparent hover:border-[#FFDEE2]/50`}
              onClick={() => handleSelect(category)}
            >
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                <span className="text-2xl md:text-3xl">{category.icon}</span>
                <h3 className="text-base md:text-lg font-medium text-[#333333]">{category.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{category.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      {selectedAudioUrl && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#E7F0FD]/95 to-[#FFDEE2]/95 backdrop-blur-md border-t border-[#FFDEE2]/20">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 px-4 py-3">
            <DurationSelector
              duration={selectedDuration}
              onDurationChange={setSelectedDuration}
            />
            <AudioPlayer 
              audioUrl={selectedAudioUrl}
              duration={selectedDuration}
              onTimerEnd={handleTimerEnd}
            />
          </div>
        </div>
      )}
    </div>
  );
};