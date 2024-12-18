import { MeditationCategories } from "@/components/MeditationCategories";
import { BoxBreathing } from "@/components/BoxBreathing";
import { BreathingFourSevenEight } from "@/components/BreathingFourSevenEight";
import { DailyProgress } from "@/components/breathing/DailyProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeditationVideo } from "@/components/MeditationVideo";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
        <h1 className="text-2xl md:text-4xl font-bold text-pink-500 mb-6">靜坐</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MeditationVideo 
            src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7256086520346496282.mp4?t=2024-12-18T07%3A14%3A25.545Z"
            title="Peaceful Meditation"
          />
          <MeditationVideo 
            src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7327725062625266976.mp4"
            title="Nature Meditation"
          />
        </div>
        
        <Tabs defaultValue="meditation" className="space-y-8">
          <TabsList className="bg-white/70 backdrop-blur-sm border border-pink-100 rounded-full p-1">
            <TabsTrigger 
              value="meditation"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-blue-400 data-[state=active]:text-white"
            >
              靜坐
            </TabsTrigger>
            <TabsTrigger 
              value="breathing"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-blue-400 data-[state=active]:text-white"
            >
              呼吸練習
            </TabsTrigger>
            <TabsTrigger 
              value="sleep"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-blue-400 data-[state=active]:text-white"
            >
              幫助睡眠呼吸法
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meditation" className="mt-6">
            <MeditationCategories />
          </TabsContent>
          
          <TabsContent value="breathing" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-pink-500 mb-4 text-center">
                  方箱呼吸練習
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  跟隨動畫指示，進行4-4-4-4呼吸法
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
                  幫助睡眠呼吸法
                </h2>
                <p className="text-gray-600 text-center mb-8">
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