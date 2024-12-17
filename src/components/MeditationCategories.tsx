import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiresPremium?: boolean;
}

interface MeditationCategoriesProps {
  onSelect?: (category: string) => void;
}

const categories: Category[] = [
  {
    id: "adhd",
    title: "ADHD 852hz 改善",
    description: "閱讀時的背景聲音",
    icon: "🧠",
    requiresPremium: true
  },
  {
    id: "autoplay",
    title: "自動播放",
    description: "連續冥想課程",
    icon: "🔄"
  },
  {
    id: "colored-noise",
    title: "彩色噪音",
    description: "白噪音、粉噪音和棕噪音助於專注",
    icon: "🌊"
  },
  {
    id: "focus",
    title: "專注",
    description: "增強集中力和清晰度",
    icon: "🎯",
    requiresPremium: true
  },
  {
    id: "relax",
    title: "放鬆",
    description: "深度放鬆和緩解壓力",
    icon: "🧘",
    requiresPremium: true
  },
  {
    id: "deep-work",
    title: "深度工作",
    description: "延長專注時段",
    icon: "💪",
    requiresPremium: true
  }
];

export const MeditationCategories = ({ onSelect }: MeditationCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const session = useSession();
  const navigate = useNavigate();

  const handleShuffle = () => {
    const availableCategories = categories.filter(cat => 
      !cat.requiresPremium || (session && session.user)
    );
    const randomIndex = Math.floor(Math.random() * availableCategories.length);
    setSelectedCategory(availableCategories[randomIndex].id);
    onSelect?.(availableCategories[randomIndex].id);
  };

  const handleSelect = (category: Category) => {
    if (category.requiresPremium && (!session || !session.user)) {
      toast({
        title: "Premium Feature",
        description: "Please upgrade to access this meditation category",
        variant: "destructive",
      });
      navigate("/pricing");
      return;
    }
    setSelectedCategory(category.id);
    onSelect?.(category.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">選擇您的練習</h2>
        <Button onClick={handleShuffle} variant="ghost" className="gap-2 text-gray-300 hover:text-white">
          <Shuffle className="h-4 w-4" />
          隨機選擇
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`p-4 cursor-pointer transition-all hover:scale-105 bg-[#1a1a1a] border-gray-800 relative ${
              selectedCategory === category.id
                ? "ring-2 ring-primary"
                : ""
            } ${category.requiresPremium && (!session || !session.user) ? "opacity-50" : ""}`}
            onClick={() => handleSelect(category)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-2xl mb-2">{category.icon}</span>
              <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              <p className="text-sm text-gray-400">{category.description}</p>
              {category.requiresPremium && (!session || !session.user) && (
                <Lock className="absolute top-2 right-2 h-5 w-5 text-gray-400" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};