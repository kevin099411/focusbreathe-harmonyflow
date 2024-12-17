import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-primary">專注禪修</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/meditate" className="text-gray-600 hover:text-primary">
                {language === 'en' ? 'Meditate' : '冥想'}
              </Link>
              <Link to="/breathwork" className="text-gray-600 hover:text-primary">
                {language === 'en' ? 'Daily Knowledge' : '每日知識'}
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-primary">
                {language === 'en' ? 'Pricing' : '價格'}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14">
        {children}
      </main>

      {/* Back to top button */}
      {showBackToTop && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg hover:shadow-xl z-50"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};