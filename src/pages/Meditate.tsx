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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-pink-500">{t.title}</h1>
          <LanguageSwitcher />
        </div>
        
        <Tabs defaultValue="meditation" className="space-y-8">
          <TabsList className="bg-white/70 backdrop-blur-sm border border-pink-100 rounded-full p-1">
            <TabsTrigger 
              value="meditation"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-blue-400 data-[state=active]:text-white"
            >
              {t.meditation}
            </TabsTrigger>
            <TabsTrigger 
              value="breathing"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-blue-400 data-[state=active]:text-white"
            >
              {t.breathing}
            </TabsTrigger>
            <TabsTrigger 
              value="sleep"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-blue-400 data-[state=active]:text-white"
            >
              {t.sleep}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meditation" className="mt-6">
            <MeditationCategories />
          </TabsContent>
          
          <TabsContent value="breathing" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-pink-500 mb-4 text-center">
                  {t.boxBreathingTitle}
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  {t.boxBreathingDesc}
                </p>
                <BoxBreathing />
              </div>
              
              <div className="pt-8 border-t border-pink-100">
                <DailyProgress />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100">
              <div>
                <h2 className="text-2xl font-semibold text-pink-500 mb-4 text-center">
                  {t.sleepBreathingTitle}
                </h2>
                <p className="text-gray-600 text-center mb-8">
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