import { MeditationCategories } from "@/components/MeditationCategories";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BoxBreathing } from "@/components/BoxBreathing";
import { BreathingFourSevenEight } from "@/components/BreathingFourSevenEight";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-[#222222] text-white pt-16">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">靜坐</h1>
          <LanguageSwitcher />
        </div>
        
        <Tabs defaultValue="meditation" className="space-y-8">
          <TabsList className="bg-[#1a1a1a] border-gray-800">
            <TabsTrigger 
              value="meditation"
              className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-primary"
            >
              靜坐
            </TabsTrigger>
            <TabsTrigger 
              value="breathing"
              className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-primary"
            >
              呼吸練習
            </TabsTrigger>
            <TabsTrigger 
              value="sleep"
              className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-primary"
            >
              幫助睡眠呼吸法
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meditation" className="mt-6">
            <MeditationCategories />
          </TabsContent>
          
          <TabsContent value="breathing" className="mt-6">
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4 text-center">
                  方箱呼吸練習
                </h2>
                <p className="text-gray-400 text-center mb-8">
                  跟隨動畫指示，進行4-4-4-4呼吸法
                </p>
                <BoxBreathing />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="mt-6">
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4 text-center">
                  幫助睡眠呼吸法
                </h2>
                <p className="text-gray-400 text-center mb-8">
                  跟隨動畫指示，進行4-7-8呼吸法
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