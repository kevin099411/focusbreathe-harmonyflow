import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

interface Category {
  id: string;
  title: string;
  description: string;
  color: string;
}

const categories: Category[] = [
  {
    id: "autoplay",
    title: "Autoplay",
    description: "Continuous meditation sessions",
    color: "bg-primary/10",
  },
  {
    id: "colored-noise",
    title: "Colored Noise",
    description: "White, pink, and brown noise for focus",
    color: "bg-secondary/10",
  },
  {
    id: "focus",
    title: "Focus",
    description: "Enhance concentration and clarity",
    color: "bg-primary/20",
  },
  {
    id: "relax",
    title: "Relax",
    description: "Deep relaxation and stress relief",
    color: "bg-secondary/20",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    description: "Extended focus sessions",
    color: "bg-primary/30",
  },
  {
    id: "read",
    title: "Reading",
    description: "Background sounds for reading",
    color: "bg-secondary/30",
  },
  {
    id: "power-nap",
    title: "Power Nap",
    description: "Quick rejuvenation breaks",
    color: "bg-primary/40",
  },
];

export const MeditationCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    setSelectedCategory(categories[randomIndex].id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-secondary">Choose Your Practice</h2>
        <Button onClick={handleShuffle} variant="outline" className="gap-2">
          <Shuffle className="h-4 w-4" />
          Shuffle
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`p-6 cursor-pointer transition-all hover:scale-105 ${
              category.color
            } ${
              selectedCategory === category.id
                ? "ring-2 ring-primary"
                : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-600">{category.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};