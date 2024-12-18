import { MeditationCategories } from "@/components/MeditationCategories";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BoxBreathing } from "@/components/BoxBreathing";
import { BreathingFourSevenEight } from "@/components/BreathingFourSevenEight";
import { DailyProgress } from "@/components/breathing/DailyProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const Meditate = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Meditation",
      meditation: "Meditation",
      breathing: "Breathing Exercise",
      sleep: "Sleep Aid Breathing",
      boxBreathingTitle: "Box Breathing Exercise",
      boxBreathingDesc: "Follow the animation for 4-4-4-4 breathing technique",
      sleepBreathingTitle: "Sleep Aid Breathing",
      sleepBreathingDesc: "Follow the animation for 4-7-8 breathing technique",
      dailyProgress: "Daily Progress"
    },
    zh: {
      title: "靜坐",
      meditation: "靜坐",
      breathing: "呼吸練習",
      sleep: "幫助睡眠呼吸法",
      boxBreathingTitle: "方箱呼吸練習",
      boxBreathingDesc: "跟隨動畫指示，進行4-4-4-4呼吸法",
      sleepBreathingTitle: "幫助睡眠呼吸法",
      sleepBreathingDesc: "跟隨動畫指示，進行4-7-8呼吸法",
      dailyProgress: "每日進度"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#222222] text-white pt-16">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">{t.title}</h1>
          <LanguageSwitcher />
        </div>
        
        <Tabs defaultValue="meditation" className="space-y-8">
          <TabsList className="bg-[#1a1a1a] border-gray-800">
            <TabsTrigger 
              value="meditation"
              className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-primary"
            >
              {t.meditation}
            </TabsTrigger>
            <TabsTrigger 
              value="breathing"
              className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-primary"
            >
              {t.breathing}
            </TabsTrigger>
            <TabsTrigger 
              value="sleep"
              className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-primary"
            >
              {t.sleep}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meditation" className="mt-6">
            <MeditationCategories />
          </TabsContent>
          
          <TabsContent value="breathing" className="mt-6">
            <div className="bg-[#1a1a1a] rounded-lg p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4 text-center">
                  {t.boxBreathingTitle}
                </h2>
                <p className="text-gray-400 text-center mb-8">
                  {t.boxBreathingDesc}
                </p>
                <BoxBreathing />
              </div>
              
              <div className="pt-8 border-t border-gray-800">
                <DailyProgress />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="mt-6">
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4 text-center">
                  {t.sleepBreathingTitle}
                </h2>
                <p className="text-gray-400 text-center mb-8">
                  {t.sleepBreathingDesc}
                </p>
                <BreathingFourSevenEight />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Meditate;