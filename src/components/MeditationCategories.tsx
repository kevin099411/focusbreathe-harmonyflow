import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AudioPlayer } from "./AudioPlayer";
import { ScrollArea } from "./ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  audioUrl?: string;
}

const categories: Category[] = [
  {
    id: "meditation-bells",
    title: "冥想鈴聲",
    description: "傳統的西藏頌缽聲音",
    icon: "🔔",
    audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/tingsha-bell-sound-7571.mp3"
  },
  {
    id: "nature",
    title: "大自然聲音",
    description: "放鬆的森林和流水聲",
    icon: "🌳",
    audioUrl: `${supabase.storage.from('audio').getPublicUrl('relax forrest music.mp3').data.publicUrl}`
  },
  {
    id: "crystal-bowls",
    title: "水晶缽",
    description: "深層放鬆的水晶缽聲音",
    icon: "🎵",
    audioUrl: `${supabase.storage.from('audio').getPublicUrl('10 Minute Crystal Singing Bowl Meditation _ Sound Healing For Relaxation & Stress Relief.m4a').data.publicUrl}`
  },
  {
    id: "focus",
    title: "專注音樂",
    description: "幫助集中注意力的音樂",
    icon: "🎯",
    audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/Focus%20Music%20for%20Work%20and%20Studying%20Background%20Music%20for%20Better%20Co.mp3"
  },
  {
    id: "ambient",
    title: "環境音樂",
    description: "平靜的環境音樂",
    icon: "🌊",
    audioUrl: `${supabase.storage.from('audio').getPublicUrl('Inner Voicings.mp3').data.publicUrl}`
  },
  {
    id: "om-chanting",
    title: "唵音誦念",
    description: "傳統的梵文誦念",
    icon: "🕉️",
    audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/Inner%20Voicings.mp3"
  }
];

export const MeditationCategories = ({ onSelect }: { onSelect?: (category: string) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const session = useSession();
  const navigate = useNavigate();

  const handleShuffle = () => {
    const availableCategories = categories;
    const randomIndex = Math.floor(Math.random() * availableCategories.length);
    setSelectedCategory(availableCategories[randomIndex].id);
    onSelect?.(availableCategories[randomIndex].id);
  };

  const handleSelect = (category: Category) => {
    console.log('Selected category:', category);
    console.log('Audio URL:', category.audioUrl);
    setSelectedCategory(category.id);
    onSelect?.(category.id);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">選擇您的練習</h2>
        <Button onClick={handleShuffle} variant="ghost" size="sm" className="gap-1 text-gray-300 hover:text-white">
          <Shuffle className="h-3 w-3" />
          隨機選擇
        </Button>
      </div>
      <ScrollArea className="h-[400px] rounded-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-1">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`p-2 cursor-pointer transition-all hover:scale-105 bg-[#1a1a1a] border-gray-800 relative ${
                selectedCategory === category.id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => handleSelect(category)}
            >
              <div className="flex flex-col items-center text-center space-y-1">
                <span className="text-xl">{category.icon}</span>
                <h3 className="text-sm font-medium text-white">{category.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{category.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] p-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <AudioPlayer audioUrl={selectedCategoryData?.audioUrl} />
        </div>
      </div>
    </div>
  );
};
