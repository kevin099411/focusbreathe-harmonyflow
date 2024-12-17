import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export const UpgradePrompt = () => {
  const handleClick = () => {
    try {
      // Additional logic if needed before navigation
      console.log('Navigating to pricing page');
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "導航錯誤",
        description: "無法前往價格頁面，請重試。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="col-span-full text-center mt-6">
      <p className="text-gray-600 mb-4">想要觀看更多影片嗎？</p>
      <Link to="/pricing" onClick={handleClick}>
        <Button>升級會員</Button>
      </Link>
    </div>
  );
};