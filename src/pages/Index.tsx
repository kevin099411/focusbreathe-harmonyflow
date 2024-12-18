import { DailyPricingPopup } from "@/components/DailyPricingPopup";
import { BreathingCircle } from "@/components/breathing/BreathingCircle";
import { Link } from "react-router-dom";

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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float-delay" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float-delay" />
        </div>
      </div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#333333]">
              靜坐與呼吸練習
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              通過正念靜坐和呼吸練習，找到內心的平靜。每天只需幾分鐘，就能改善身心健康。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/meditate"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#FFDEE2] text-[#333333] hover:bg-[#FFDEE2]/90 transition-colors duration-200"
              >
                開始靜坐
              </Link>
              <Link
                to="/breathwork"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 text-[#333333] hover:bg-white/90 transition-colors duration-200"
              >
                呼吸練習
              </Link>
            </div>
          </div>
        </section>

        {/* Meditation Introduction Section with Video */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border border-[#FFDEE2]/20">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-center text-[#333333] mb-8">
                  靜坐的好處
                </h2>
                
                {/* Video */}
                <div className="mb-8">
                  <video 
                    className="w-full h-auto rounded-xl"
                    src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7274838978107411758.mp4"
                    controls
                    autoPlay
                    loop
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#333333]">身體健康</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 降低血壓和心率</li>
                      <li>• 增強免疫系統</li>
                      <li>• 改善睡眠質量</li>
                      <li>• 減輕身體疼痛</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#333333]">心理健康</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 減輕壓力和焦慮</li>
                      <li>• 提高專注力</li>
                      <li>• 增強情緒控制</li>
                      <li>• 促進心靈平靜</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breathing Exercise CTA */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-[#FFDEE2]/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFDEE2]/5 to-[#D946EF]/5 rounded-2xl" />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]">
                    準備好開始您的呼吸之旅了嗎？
                  </h2>
                  <p className="text-gray-600 mb-6">
                    通過我們的引導式呼吸練習，學習如何正確呼吸，改善身心健康。
                  </p>
                  <Link
                    to="/breathwork"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#FFDEE2] text-[#333333] hover:bg-[#FFDEE2]/90 transition-colors duration-200"
                  >
                    開始練習 →
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFDEE2]/20 to-[#D946EF]/20 rounded-full blur-2xl animate-pulse" />
                  <BreathingCircle
                    phase="INHALE"
                    text="深呼吸"
                    timeRemaining={4}
                    gradientColors={{
                      from: "pink-300",
                      to: "purple-400"
                    }}
                    scale="scale-100"
                    borderColor="pink-300"
                    textColor="text-[#333333]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;