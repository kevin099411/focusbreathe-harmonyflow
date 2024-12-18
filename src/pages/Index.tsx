import { DailyPricingPopup } from "@/components/DailyPricingPopup";
import { Link } from "react-router-dom";
import { MeditationVideo } from "@/components/MeditationVideo";
import { SmallBreathingCircle } from "@/components/SmallBreathingCircle";

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

        {/* Video Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <MeditationVideo 
                src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7274838978107411758.mp4"
                title="靜心冥想"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#333333]">冥想的好處</h2>
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