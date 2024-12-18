import { VideoList } from "@/components/VideoList";
import { useLanguage } from "@/contexts/LanguageContext";

const Breathwork = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#121212] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {language === 'zh' ? '每日知識' : 'Daily Knowledge'}
        </h2>
        <VideoList />
      </div>
    </div>
  );
};

export default Breathwork;