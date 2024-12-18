import { DailyPricingPopup } from "@/components/DailyPricingPopup";
import { BreathingCircle } from "@/components/breathing/BreathingCircle";
import { Link } from "react-router-dom";
import { MeditationVideo } from "@/components/MeditationVideo";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#9b87f5]/5 to-[#D946EF]/5">
      <DailyPricingPopup />
      
      <div className="fixed inset-0 -z-10">
        {/* Wave Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(155,135,245,0.1),rgba(217,70,239,0.05))] animate-wind" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(155,135,245,0.1),rgba(217,70,239,0.05))] animate-wind" />
        
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              冥想與呼吸練習
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              通過正念冥想和呼吸練習，找到內心的平靜。每天只需幾分鐘，就能改善身心健康。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/meditate"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
              >
                開始冥想
              </Link>
              <Link
                to="/breathwork"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 text-gray-800 hover:bg-white/90 transition-colors duration-200"
              >
                呼吸練習
              </Link>
            </div>
          </div>
        </section>

        {/* Meditation Videos Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border border-white/20">
                <MeditationVideo
                  src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7256086520346496282.mp4?t=2024-12-18T07%3A14%3A25.545Z"
                  title="寧靜冥想"
                  audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/meditation-1.mp3"
                />
              </div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border border-white/20">
                <MeditationVideo
                  src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7327725062625266976.mp4"
                  title="自然冥想"
                  audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/meditation-2.mp3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Meditation Introduction Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border border-white/20">
              <div className="aspect-video w-full">
                <MeditationVideo
                  src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7274838978107411758.mp4"
                  title="靜心冥想的力量"
                />
              </div>
              <div className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  靜心冥想的好處
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">身體健康</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 降低血壓和心率</li>
                      <li>• 增強免疫系統</li>
                      <li>• 改善睡眠質量</li>
                      <li>• 減輕身體疼痛</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-accent">心理健康</h3>
                    <ul className="space-y-2 text-gray-700">
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
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl" />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    準備好開始您的呼吸之旅了嗎？
                  </h2>
                  <p className="text-gray-600 mb-6">
                    通過我們的引導式呼吸練習，學習如何正確呼吸，改善身心健康。
                  </p>
                  <Link
                    to="/breathwork"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
                  >
                    開始練習 →
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse" />
                  <BreathingCircle />
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
