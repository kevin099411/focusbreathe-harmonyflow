import { Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navigation = () => {
  const { language } = useLanguage();
  
  const getNavText = (key: string) => {
    const translations: Record<string, { en: string; zh: string }> = {
      meditate: {
        en: "Meditate",
        zh: "靜坐"
      },
      breathwork: {
        en: "Daily Knowledge",
        zh: "每日知識"
      },
      pricing: {
        en: "Pricing",
        zh: "價格"
      }
    };
    return translations[key][language];
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-primary">呼吸的奇蹟</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/meditate" className="text-gray-600 hover:text-primary">
              {getNavText("meditate")}
            </Link>
            <Link to="/breathwork" className="text-gray-600 hover:text-primary">
              {getNavText("breathwork")}
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary">
              {getNavText("pricing")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};