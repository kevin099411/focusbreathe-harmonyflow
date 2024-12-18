import { MeditationCategories } from "@/components/MeditationCategories";
import { BoxBreathing } from "@/components/BoxBreathing";
import { BreathingFourSevenEight } from "@/components/BreathingFourSevenEight";
import { DailyProgress } from "@/components/breathing/DailyProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeditationVideo } from "@/components/MeditationVideo";

const Meditate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7F0FD] to-[#FFDEE2] bg-opacity-50">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl animate-fade-in">
        <h1 className="text-2xl md:text-4xl font-bold text-[#333333] mb-6">呼吸的奇蹟</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="animate-fade-in [animation-delay:200ms]">
            <MeditationVideo 
              src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7256086520346496282.mp4"
              title="寧靜靜坐"
              audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7256086520346496282%20(1).mp3"
            />
          </div>
          <div className="animate-fade-in [animation-delay:400ms]">
            <MeditationVideo 
              src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7327725062625266976.mp4"
              title="自然靜坐"
              audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7327725062625266976%20(1).mp3"
            />
          </div>
        </div>
        
        <Tabs defaultValue="meditation" className="space-y-8">
          <TabsList className="bg-white/70 backdrop-blur-sm border border-[#FFDEE2]/30 rounded-full p-1 animate-fade-in [animation-delay:600ms]">
            <TabsTrigger 
              value="meditation"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFDEE2] data-[state=active]:to-[#E7F0FD] data-[state=active]:text-[#333333] transition-all duration-300"
            >
              靜坐
            </TabsTrigger>
            <TabsTrigger 
              value="breathing"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFDEE2] data-[state=active]:to-[#E7F0FD] data-[state=active]:text-[#333333] transition-all duration-300"
            >
              呼吸練習
            </TabsTrigger>
            <TabsTrigger 
              value="sleep"
              className="rounded-full px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFDEE2] data-[state=active]:to-[#E7F0FD] data-[state=active]:text-[#333333] transition-all duration-300"
            >
              幫助睡眠呼吸法
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meditation" className="mt-6 animate-fade-in [animation-delay:800ms]">
            <MeditationCategories />
          </TabsContent>
          
          <TabsContent value="breathing" className="mt-6 animate-fade-in [animation-delay:800ms]">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#FFDEE2]/30 space-y-8 transition-all duration-300 hover:shadow-2xl">
              <div>
                <h2 className="text-2xl font-semibold text-[#333333] mb-4 text-center">
                  方箱呼吸練習
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  跟隨動畫指示，進行4-4-4-4呼吸法
                </p>
                <BoxBreathing />
              </div>
              
              <div className="pt-8 border-t border-[#FFDEE2]/30">
                <DailyProgress />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="mt-6 animate-fade-in [animation-delay:800ms]">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#FFDEE2]/30 transition-all duration-300 hover:shadow-2xl">
              <div>
                <h2 className="text-2xl font-semibold text-[#333333] mb-4 text-center">
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