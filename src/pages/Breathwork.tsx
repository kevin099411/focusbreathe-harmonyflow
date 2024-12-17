import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { VideoList } from "@/components/VideoList";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Breathwork = () => {
  const { toast } = useToast();
  const [hasShownNotification, setHasShownNotification] = useState(false);

  useEffect(() => {
    // Check if it's around lunch time (12:00)
    const checkLunchTime = () => {
      const now = new Date();
      const hours = now.getHours();
      
      if (hours === 12 && !hasShownNotification) {
        toast({
          title: "午餐時間到了！",
          description: "休息一下，觀看今日的知識影片吧！",
          duration: 5000,
        });
        setHasShownNotification(true);
      }
    };

    // Check every minute
    const interval = setInterval(checkLunchTime, 60000);
    checkLunchTime(); // Initial check

    return () => clearInterval(interval);
  }, [hasShownNotification, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">每日知識</h1>
          <LanguageSwitcher />
        </div>
        <VideoList />
      </div>
    </div>
  );
};

export default Breathwork;