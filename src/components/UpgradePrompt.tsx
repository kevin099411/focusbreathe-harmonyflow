import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const UpgradePrompt = () => {
  return (
    <div className="col-span-full text-center mt-6">
      <p className="text-gray-600 mb-4">想要觀看更多影片嗎？</p>
      <Link to="/pricing">
        <Button>升級會員</Button>
      </Link>
    </div>
  );
};