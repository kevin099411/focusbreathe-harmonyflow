import { Card } from "../ui/card";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  audioUrls: {
    [key: string]: string;
  };
}

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: (category: Category) => void;
}

export const CategoryCard = ({ category, isActive, onClick }: CategoryCardProps) => {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 
        ${isActive 
          ? 'bg-[#1A1F2C] text-white' 
          : 'bg-white/70 hover:bg-gradient-to-br hover:from-[#FFDEE2]/20 hover:to-[#E7F0FD]/20'} 
        backdrop-blur-md shadow-lg hover:shadow-xl rounded-xl border border-transparent hover:border-[#FFDEE2]/50`}
      onClick={() => onClick(category)}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <span className="text-2xl md:text-3xl">{category.icon}</span>
        <h3 className={`text-base md:text-lg font-medium ${
          isActive ? 'text-white' : 'text-[#333333]'
        }`}>
          {category.title}
        </h3>
        <p className={`text-xs md:text-sm ${
          isActive ? 'text-gray-200' : 'text-gray-600'
        }`}>
          {category.description}
        </p>
      </div>
    </Card>
  );
};