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

        {/* Breathing Guide Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-[#333333]">呼吸練習指南</h2>
                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#FFDEE2]/20">
                    <h3 className="text-xl font-medium text-[#333333] mb-2">方箱呼吸法 4-4-4-4</h3>
                    <p className="text-[#666666]">
                      1. 吸氣4秒<br/>
                      2. 屏息4秒<br/>
                      3. 呼氣4秒<br/>
                      4. 屏息4秒<br/>
                      重複此循環以達到平靜效果
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#FFDEE2]/20">
                    <h3 className="text-xl font-medium text-[#333333] mb-2">4-7-8呼吸法</h3>
                    <p className="text-[#666666]">
                      1. 吸氣4秒<br/>
                      2. 屏息7秒<br/>
                      3. 呼氣8秒<br/>
                      特別適合幫助入睡和減輕焦慮
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-[#333333]">靜坐指南</h2>
                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#FFDEE2]/20">
                    <h3 className="text-xl font-medium text-[#333333] mb-2">初學者建議</h3>
                    <p className="text-[#666666]">
                      1. 選擇安靜的環境<br/>
                      2. 保持舒適的坐姿<br/>
                      3. 專注於呼吸<br/>
                      4. 從5-10分鐘開始<br/>
                      5. 保持耐心和規律
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#FFDEE2]/20">
                    <h3 className="text-xl font-medium text-[#333333] mb-2">進階技巧</h3>
                    <p className="text-[#666666]">
                      1. 身體掃描練習<br/>
                      2. 觀察思緒流動<br/>
                      3. 延長練習時間<br/>
                      4. 結合呼吸技巧
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-[#FFDEE2]/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFDEE2]/5 to-[#D946EF]/5 rounded-2xl" />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4 text-[#333333]">
                    準備好開始您的呼吸之旅了嗎？
                  </h2>
                  <p className="text-[#666666] mb-6">
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