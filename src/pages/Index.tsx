import { Navigation } from "@/components/Navigation";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { DailyPricingPopup } from "@/components/DailyPricingPopup";
import { ChatDrawer } from "@/components/ChatDrawer";
import { Wind, Waves, Moon, Sun, Music2, BookOpen } from "lucide-react";
import { MeditationCard } from "@/components/MeditationCard";

const Index = () => {
  const session = useSession();
  
  const meditationSessions = [
    {
      title: "早晨冥想",
      duration: "10 分鐘",
      description: "以平靜的心態開始新的一天",
      image: "/lovable-uploads/f9eb763f-9881-4ec7-9087-fa5a993f7e47.png",
      audioUrl: "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/1%20Minute%20of%20Peaceful%20Rain%20Sounds%20_%20Clear%20Your%20Mind%20_%20Relax%20_%20Calming%20Rain_1734424276340.mp3"
    }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#9b87f5]/5 to-[#D946EF]/5">
      <DailyPricingPopup />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Wave Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(155,135,245,0.1),rgba(217,70,239,0.05))] animate-wind" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9b87f5]/20 rounded-full filter blur-3xl animate-wind" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D946EF]/20 rounded-full filter blur-3xl animate-wind delay-1000" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-primary/30 animate-float">
          <Wind className="w-12 h-12" />
        </div>
        <div className="absolute top-40 right-20 text-accent/30 animate-float delay-1000">
          <Moon className="w-8 h-8" />
        </div>
        <div className="absolute bottom-32 left-1/4 text-primary/30 animate-float delay-2000">
          <Sun className="w-10 h-10" />
        </div>
        <div className="absolute bottom-20 right-1/3 text-accent/30 animate-float delay-3000">
          <Waves className="w-14 h-14" />
        </div>
      </div>
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="relative">
              {/* Glowing circle behind title */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
              
              <h1 className="relative text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-fade-in">
                『強大的呼吸法』為自己細胞充電！
              </h1>
              
              <p className="relative text-xl md:text-2xl text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in delay-100">
                對生命至關重要！跟隨 呼吸的奇蹟 的呼吸技巧，轉變您的生活。
              </p>
              
              {/* CTA Buttons with glow effect */}
              <div className="relative flex flex-col sm:flex-row justify-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full blur-xl animate-pulse" />
                  <Link 
                    to="/breathwork"
                    className="relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-200"
                  >
                    <span className="mr-2">開始練習</span>
                    <Wind className="w-5 h-5 animate-wind" />
                  </Link>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/50 to-primary/50 rounded-full blur-xl animate-pulse" />
                  <Link 
                    to="/meditate"
                    className="relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-white font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-300"
                  >
                    <span className="mr-2">靜坐指南</span>
                    <BookOpen className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meditation Cards Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              精選冥想課程
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {meditationSessions.map((session, index) => (
                <MeditationCard
                  key={index}
                  title={session.title}
                  duration={session.duration}
                  description={session.description}
                  image={session.image}
                  audioUrl={session.audioUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Breathing Circle Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl" />
              
              {/* Content */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    體驗呼吸的力量
                  </h2>
                  <p className="text-gray-600 mb-6">
                    通過我們的引導式呼吸練習，找到內心的平靜與力量。每一次呼吸都是重新連接身心的機會。
                  </p>
                  <Link
                    to="/breathwork"
                    className="inline-flex items-center text-primary hover:text-accent transition-colors"
                  >
                    開始練習 →
                  </Link>
                </div>
                
                <div className="relative">
                  {/* Glowing background for breathing circle */}
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