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
              <Link
                to="/breathwork"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 text-[#333333] hover:bg-white/90 transition-colors duration-200"
              >
                呼吸練習
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;