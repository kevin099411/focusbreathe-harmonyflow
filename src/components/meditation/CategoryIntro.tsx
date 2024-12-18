import { Button } from "../ui/button";

interface CategoryIntroProps {
  onStartPractice: () => void;
}

export const CategoryIntro = ({ onStartPractice }: CategoryIntroProps) => {
  return (
    <div className="text-center space-y-2">
      <p className="text-[#333333] text-base md:text-lg">準備好開始您的呼吸之旅了嗎？</p>
      <p className="text-[#333333] text-sm md:text-base">通過我們的引導式呼吸練習，學習如何正確呼吸，改善身心健康。</p>
      <Button 
        onClick={onStartPractice}
        variant="ghost" 
        size="lg"
        className="mt-2 gap-2 text-[#333333] hover:text-[#FFDEE2] hover:bg-white/50 transition-all duration-300 rounded-full px-4 md:px-8 shadow-lg hover:shadow-xl"
      >
        開始練習 → 方箱呼吸練習
      </Button>
    </div>
  );
};