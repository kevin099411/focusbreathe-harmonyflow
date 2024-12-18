import { Wind, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const session = useSession();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-primary" />
              <span className="text-base font-bold text-primary whitespace-nowrap">呼吸的奇蹟</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/meditate" className="text-gray-600 hover:text-primary text-sm whitespace-nowrap">
              靜坐
            </Link>
            <Link to="/breathwork" className="text-gray-600 hover:text-primary text-sm whitespace-nowrap">
              每日知識
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary text-sm whitespace-nowrap">
              價格
            </Link>
            {!session ? (
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-sm">
                  登入
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};