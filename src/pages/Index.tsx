import { Navigation } from "@/components/Navigation";
import { MeditationCard } from "@/components/MeditationCard";
import { BreathingCircle } from "@/components/BreathingCircle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredMeditations = [
    {
      title: "五分鐘專注重置",
      duration: "1 分鐘",
      description: "使用852赫茲頻率進行快速冥想，提升心智清晰度",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
      audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/relax%20forrest%20music.mp3",
    },
    {
      title: "平靜紛亂思緒",
      duration: "1 分鐘",
      description: "引導式冥想，幫助平靜過度活躍的思維",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
      audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/relax%20forrest%20music.mp3",
    },
    {
      title: "852赫茲能量提升",
      duration: "1 分鐘",
      description: "使用治癒頻率的能量提升冥想",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
      audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/852hz.mp3",
    },
  ];

  const sriSriBreathingTechniques = [
    {
      name: "火神呼吸法",
      description: "增強體內生命能量的活力呼吸技巧",
      steps: ["舒適坐姿", "深呼吸", "用力呼氣", "重複20次"],
    },
    {
      name: "交替鼻孔呼吸法",
      description: "交替鼻孔呼吸，提升心智清晰度和平衡",
      steps: ["關閉右鼻孔", "左鼻吸氣", "關閉左鼻孔", "右鼻呼氣"],
    },
    {
      name: "勝利呼吸法",
      description: "能夠平靜神經系統的海洋呼吸法",
      steps: ["收緊喉嚨", "深呼吸", "製造海浪聲", "保持節奏"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-blue-50">
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center opacity-10 animate-wind scale-110 origin-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')`
        }}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary">
              體驗Sri Sri Ravi Shankar呼吸的力量
            </h1>
            <LanguageSwitcher />
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
            通過古老的呼吸技巧、引導式冥想和治癒頻率，轉變您的生活。
          </p>
          <Link 
            to="/breathwork"
            className="inline-block bg-primary text-white px-6 md:px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            開始您的旅程
          </Link>
        </div>
      </section>

      {/* Sri Sri Breathing Techniques */}
      <section className="py-8 md:py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 md:mb-8 text-center">
            Sri Sri Ravi Shankar呼吸技巧
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sriSriBreathingTechniques.map((technique, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow border border-orange-100"
              >
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {technique.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {technique.description}
                </p>
                <ul className="space-y-2">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center mr-2 text-sm">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
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