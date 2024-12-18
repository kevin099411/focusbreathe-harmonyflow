import { useEffect, useState } from "react";
import { ArrowUp, Wind, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { language } = useLanguage();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      setError(event.error);
      toast({
        title: "發生錯誤",
        description: "很抱歉，發生了意外錯誤。請重新整理頁面或稍後再試。",
        variant: "destructive",
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

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

  const getNavText = (key: string) => {
    const translations: Record<string, { en: string; zh: string }> = {
      meditate: {
        en: "Meditate",
        zh: "冥想"
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">很抱歉，發生了錯誤</h2>
          <p className="text-gray-600 mb-6">請重新整理頁面或稍後再試</p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
            重新整理頁面
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-primary">FocusZen</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/meditate" className="text-gray-600 hover:text-primary">
                {getNavText("meditate")}
              </Link>
              <Link to="/breathwork" className="text-gray-600 hover:text-primary">
                {getNavText("breathwork")}
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-primary">
                {getNavText("pricing")}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.facebook.com/profile.php?id=100063621081761" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://www.instagram.com/maggievirgin?igsh=MTQyZ2UwNnF1YXY0NQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>

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