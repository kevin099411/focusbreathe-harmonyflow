import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeditationCategories } from "@/components/MeditationCategories";
import { BoxBreathing } from "@/components/BoxBreathing";
import { BreathingFourSevenEight } from "@/components/BreathingFourSevenEight";
import { DailyProgress } from "@/components/breathing/DailyProgress";

export const MeditationTabs = () => {
  return (
    <Tabs defaultValue="meditation" className="space-y-3 md:space-y-6 pb-16">
      <TabsList className="w-full md:w-auto bg-white/70 backdrop-blur-sm border border-[#FFDEE2]/30 rounded-full p-1 animate-fade-in [animation-delay:600ms] overflow-x-auto flex-nowrap">
        <TabsTrigger 
          value="meditation"
          className="rounded-full px-3 md:px-6 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFDEE2] data-[state=active]:to-[#E7F0FD] data-[state=active]:text-[#333333] transition-all duration-300"
        >
          靜坐
        </TabsTrigger>
        <TabsTrigger 
          value="breathing"
          className="rounded-full px-3 md:px-6 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFDEE2] data-[state=active]:to-[#E7F0FD] data-[state=active]:text-[#333333] transition-all duration-300"
        >
          呼吸練習
        </TabsTrigger>
        <TabsTrigger 
          value="sleep"
          className="rounded-full px-3 md:px-6 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFDEE2] data-[state=active]:to-[#E7F0FD] data-[state=active]:text-[#333333] transition-all duration-300"
        >
          幫助睡眠呼吸法
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="meditation" className="mt-4 animate-fade-in [animation-delay:800ms]">
        <MeditationCategories />
      </TabsContent>
      
      <TabsContent value="breathing" className="mt-4 animate-fade-in [animation-delay:800ms]">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-[#FFDEE2]/30 space-y-6 transition-all duration-300 hover:shadow-2xl">
          <div>
            <h2 className="text-2xl font-semibold text-[#333333] mb-3 text-center">
              方箱呼吸練習
            </h2>
            <p className="text-gray-600 text-center mb-6">
              跟隨動畫指示，進行4-4-4-4呼吸法
            </p>
            <BoxBreathing />
          </div>
          
          <div className="pt-6 border-t border-[#FFDEE2]/30">
            <DailyProgress />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="sleep" className="mt-4 animate-fade-in [animation-delay:800ms]">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-[#FFDEE2]/30 transition-all duration-300 hover:shadow-2xl">
          <div>
            <h2 className="text-2xl font-semibold text-[#333333] mb-3 text-center">
              幫助睡眠呼吸法
            </h2>
            <p className="text-gray-600 text-center mb-6">
              跟隨動畫指示，進行4-7-8呼吸法
            </p>
            <BreathingFourSevenEight />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};