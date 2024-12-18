import { useEffect, useState } from "react";
import { ArrowUp, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/20">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            很抱歉，發生了錯誤
          </h2>
          <p className="text-gray-600 mb-6">
            請重新整理頁面或稍後再試
          </p>
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
      <Navigation />

      <main className="pt-14 flex-grow pb-24">
        {children}
      </main>

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

      <div className="fixed bottom-8 right-8 flex items-center gap-4 z-50">
        {showBackToTop && (
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg hover:shadow-xl"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};