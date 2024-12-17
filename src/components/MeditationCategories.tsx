import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface MeditationCategoriesProps {
  onSelect?: (category: string) => void;
}

const categories: Category[] = [
  {
    id: "autoplay",
    title: "Autoplay",
    description: "Continuous meditation sessions",
    icon: "🔄"
  },
  {
    id: "colored-noise",
    title: "Colored Noise",
    description: "White, pink, and brown noise for focus",
    icon: "🌊"
  },
  {
    id: "focus",
    title: "Focus",
    description: "Enhance concentration and clarity",
    icon: "🎯"
  },
  {
    id: "relax",
    title: "Relax",
    description: "Deep relaxation and stress relief",
    icon: "🧘"
  },
  {
    id: "deep-work",
    title: "Deep Work",
    description: "Extended focus sessions",
    icon: "💪"
  },
  {
    id: "read",
    title: "Reading",
    description: "Background sounds for reading",
    icon: "📚"
  },
  {
    id: "power-nap",
    title: "Power Nap",
    description: "Quick rejuvenation breaks",
    icon: "😴"
  },
];

export const MeditationCategories = ({ onSelect }: MeditationCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    setSelectedCategory(categories[randomIndex].id);
    onSelect?.(categories[randomIndex].id);
  };

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onSelect?.(categoryId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Choose Your Practice</h2>
        <Button onClick={handleShuffle} variant="ghost" className="gap-2 text-gray-300 hover:text-white">
          <Shuffle className="h-4 w-4" />
          Shuffle
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`p-4 cursor-pointer transition-all hover:scale-105 bg-[#1a1a1a] border-gray-800 ${
              selectedCategory === category.id
                ? "ring-2 ring-primary"
                : ""
            }`}
            onClick={() => handleSelect(category.id)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-2xl mb-2">{category.icon}</span>
              <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};