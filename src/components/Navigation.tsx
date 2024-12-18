import { Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const session = useSession();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-primary whitespace-nowrap">呼吸的奇蹟</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/meditate" className="text-gray-600 hover:text-primary whitespace-nowrap">
                靜坐
              </Link>
              <Link to="/breathwork" className="text-gray-600 hover:text-primary whitespace-nowrap">
                每日知識
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-primary whitespace-nowrap">
                價格
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!session ? (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  登入
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  我的帳戶
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};