import { DailyPricingPopup } from "@/components/DailyPricingPopup";
import { Link } from "react-router-dom";
import { MeditationVideo } from "@/components/MeditationVideo";
import { SmallBreathingCircle } from "@/components/SmallBreathingCircle";
import { MeditationCard } from "@/components/MeditationCard";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#FFDEE2]/5 to-[#D946EF]/5">
      <DailyPricingPopup />
      
      <div className="fixed inset-0 -z-10">
        {/* Wave Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,222,226,0.1),rgba(217,70,239,0.05))] animate-wind" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,222,226,0.1),rgba(217,70,239,0.05))] animate-wind" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFDEE2]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#FFDEE2]/10 rounded-full blur-3xl animate-float-delay" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#FFDEE2]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-[#FFDEE2]/10 rounded-full blur-3xl animate-float-delay" />
        </div>
      </div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#333333]">
              靜坐與呼吸練習
            </h1>
            <p className="text-lg md:text-xl text-[#666666] mb-8 max-w-2xl mx-auto">
              通過正念靜坐和呼吸練習，找到內心的平靜。每天只需幾分鐘，就能改善身心健康。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/meditate"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#FFDEE2] text-[#333333] hover:bg-[#FFDEE2]/90 transition-colors duration-200"
              >
                開始靜坐
              </Link>
            </div>
          </div>
        </section>

        {/* Video Section - Full Width */}
        <section className="py-8 w-full">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto aspect-[9/16]">
              <MeditationVideo 
                src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7274838978107411758.mp4"
                title="靜心冥想"
              />
            </div>
          </div>
        </section>

        {/* Meditation Cards Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MeditationCard
                title="早晨靜坐"
                duration="10"
                description="以平和的雨聲開始你的一天，讓心靈沉澱在寧靜中。"
                image="/placeholder.svg"
                audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/1%20Minute%20of%20Peaceful%20Rain%20Sounds%20_%20Clear%20Your%20Mind%20_%20Relax%20_%20Calming%20Rain_1734424276340.mp3"
              />
              <MeditationCard
                title="中午靜坐"
                duration="10"
                description="在忙碌的一天中稍作休息，重新找回平靜與專注。"
                image="/placeholder.svg"
                audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7256086520346496282%20(1).mp3"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section with Video */}
        <section className="py-12 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#333333]">冥想的好處</h2>
            
            {/* Benefits Video */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="aspect-[9/16] w-full">
                <MeditationVideo 
                  src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7274838978107411758.mp4"
                  title="冥想的好處"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white/80 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-[#333333]">減輕壓力</h3>
                <p className="text-[#666666]">通過冥想練習，幫助降低壓力水平，提升心理健康。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/80 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-[#333333]">提高專注力</h3>
                <p className="text-[#666666]">增強注意力集中度，提升工作和學習效率。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/80 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-[#333333]">改善睡眠</h3>
                <p className="text-[#666666]">幫助放鬆身心，提升睡眠質量。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Breathing Exercise Circle */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <SmallBreathingCircle duration={30} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;