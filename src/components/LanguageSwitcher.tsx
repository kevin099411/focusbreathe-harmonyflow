import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="fixed top-4 left-4 z-50"
    >
      {language === 'en' ? '中文' : 'English'}
    </Button>
  );
};