import { Home, Wind } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wind className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">FocusZen</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-primary">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/meditate" className="text-gray-600 hover:text-primary">
              冥想
            </Link>
            <Link to="/breathwork" className="text-gray-600 hover:text-primary">
              呼吸練習
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary">
              價格方案
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};