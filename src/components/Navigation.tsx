import { Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navigation = () => {
  const { language } = useLanguage();
  
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-primary">FocusZen</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/meditate" className="text-gray-600 hover:text-primary">
              冥想
            </Link>
            <Link to="/breathwork" className="text-gray-600 hover:text-primary">
              每日知識
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary">
              價格
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};