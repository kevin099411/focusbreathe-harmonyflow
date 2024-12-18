import { Navigation } from "@/components/Navigation";
import { MeditationCard } from "@/components/MeditationCard";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { DailyPricingPopup } from "@/components/DailyPricingPopup";
import { GroupChat } from "@/components/GroupChat";

const Index = () => {
  const session = useSession();
  
  const featuredMeditations = [
    {
      title: "一分鐘專注重置",
      duration: "30 秒",
      description: "使用852赫茲頻率進行快速冥想，提升心智清晰度",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
      audioUrl: "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/focus%205%20min.mp3?t=2024-12-18T03%3A12%3A19.823Z",
    },
    {
      title: "平靜紛亂思緒",
      duration: "30 秒",
      description: "引導式冥想，幫助平靜過度活躍的思維",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
      audioUrl: "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/rainblow.m4a",
    },
    {
      title: "852赫茲能量提升",
      duration: "30 秒",
      description: "使用治癒頻率的能量提升冥想",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
      audioUrl: "https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/852%20Hz%20Sound%20Bath%20_%205%20Minute%20Meditation%20_%20Awaken%20Intuition%20_%20Solfeggio%20Frequency%20Series_1734427956931.mp3",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/10">
      <DailyPricingPopup />
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center opacity-10 animate-wind scale-110 origin-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')`
        }}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-fade-in">
            『強大的呼吸法』為自己細胞充電！
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl animate-fade-in delay-100">
            對生命至關重要！跟隨 呼吸的奇蹟 的呼吸技巧，轉變您的生活。
          </p>
          <Link 
            to="/breathwork"
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-200"
          >
            開始您的旅程
          </Link>
        </div>
        <div className="absolute -right-40 top-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute -left-40 bottom-20 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </section>

      {/* Group Chat Section */}
      <section className="py-8 md:py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <GroupChat />
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-8 md:py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 md:mb-8 text-center">
            呼吸的奇蹟呼吸技巧
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredMeditations.map((meditation, index) => (
              <MeditationCard key={index} {...meditation} />
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Exercise */}
      <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 md:mb-8">
            練習正念呼吸
          </h2>
          <BreathingCircle />
        </div>
      </section>

      {/* Featured Meditations */}
      <section className="py-8 md:py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 md:mb-8 text-center">
            精選冥想
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredMeditations.map((meditation, index) => (
              <MeditationCard key={index} {...meditation} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
