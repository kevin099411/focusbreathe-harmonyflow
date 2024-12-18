import { Button } from "../ui/button";
import { Shuffle } from "lucide-react";

interface CategoryHeaderProps {
  onShuffle: () => void;
}

export const CategoryHeader = ({ onShuffle }: CategoryHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl md:text-2xl font-medium text-[#333333] tracking-wide">選擇您的練習</h2>
      <Button onClick={onShuffle} variant="ghost" size="sm" className="gap-1 text-[#333333] hover:text-[#FFDEE2] transition-colors duration-300">
        <Shuffle className="h-4 w-4" />
        隨機選擇
      </Button>
    </div>
  );
};