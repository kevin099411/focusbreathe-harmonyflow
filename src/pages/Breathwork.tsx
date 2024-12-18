import { useNavigate } from "react-router-dom";
import { BreathingExerciseCard } from "@/components/breathing/BreathingExerciseCard";
import { Flower2, Focus, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { VideoList } from "@/components/VideoList";

const Breathwork = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const exercises = [
    {
      id: "calm",
      title: language === 'zh' ? "平靜呼吸" : "Calm",
      description: language === 'zh' 
        ? "在一天開始或結束時放鬆心情，清空思緒的理想練習。"
        : "Ideal for a calm down breathe session at the beginning or at the end of the day to relax and clear your mind.",
      duration: "5 mins",
      icon: <Flower2 className="w-12 h-12" />,
      onClick: () => navigate("/breathwork/calm")
    },
    {
      id: "focus",
      title: language === 'zh' ? "專注呼吸" : "Focus",
      description: language === 'zh'
        ? "通過這個練習，您將恢復專注力，提高工作效率。"
        : "With this exercise you'll get your desired focus back, so you can be even more productive.",
      duration: "2 mins",
      icon: <Focus className="w-12 h-12" />,
      onClick: () => navigate("/breathwork/focus")
    },
    {
      id: "sleep",
      title: language === 'zh' ? "睡眠呼吸" : "Sleep",
      description: language === 'zh'
        ? "幫助您放鬆身心，為一夜好眠做準備的呼吸練習。"
        : "A breathing exercise to help you relax and prepare for a good night's sleep.",
      duration: "4 mins",
      icon: <Moon className="w-12 h-12" />,
      onClick: () => navigate("/breathwork/sleep")
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          {language === 'zh' ? '呼吸練習' : 'Breathing Exercises'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {exercises.map((exercise) => (
            <BreathingExerciseCard
              key={exercise.id}
              title={exercise.title}
              description={exercise.description}
              duration={exercise.duration}
              icon={exercise.icon}
              onClick={exercise.onClick}
            />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            {language === 'zh' ? '每日知識' : 'Daily Knowledge'}
          </h2>
          <VideoList />
        </div>
      </div>
    </div>
  );
};

export default Breathwork;