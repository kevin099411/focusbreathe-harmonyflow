import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "@/hooks/use-toast";
import { CategoryCard } from "./meditation/CategoryCard";
import { CategoryHeader } from "./meditation/CategoryHeader";
import { CategoryIntro } from "./meditation/CategoryIntro";
import { AudioController } from "./meditation/AudioController";

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
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const session = useSession();

  const handleShuffle = () => {
    const availableCategories = categories;
    const randomIndex = Math.floor(Math.random() * availableCategories.length);
    setSelectedCategory(availableCategories[randomIndex].id);
    onSelect?.(availableCategories[randomIndex].id);
  };

  const handleSelect = (category: Category) => {
    setSelectedCategory(category.id);
    setActiveCard(category.id);
    onSelect?.(category.id);
  };

  const handleTimerEnd = () => {
    toast({
      title: "靜坐結束",
      description: "您的靜坐時間已結束。",
    });
    setSelectedCategory(null);
    setActiveCard(null);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const selectedAudioUrl = selectedCategoryData?.audioUrls[selectedDuration.toString()];

  return (
    <div className="space-y-3 bg-gradient-to-br from-[#E7F0FD]/30 to-[#FFDEE2]/30 p-3 rounded-3xl backdrop-blur-sm pb-24">
      <div className="flex flex-col space-y-2">
        <CategoryHeader onShuffle={handleShuffle} />
        <CategoryIntro onStartPractice={() => handleSelect(categories[0])} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isActive={activeCard === category.id}
            onClick={handleSelect}
          />
        ))}
      </div>
      
      <AudioController
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        audioUrl={selectedAudioUrl}
        onTimerEnd={handleTimerEnd}
      />
    </div>
  );
};
