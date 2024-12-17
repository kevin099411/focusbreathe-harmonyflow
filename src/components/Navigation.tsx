import { Home, Moon, Sun, Wind } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80')`
        }}
      />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 relative">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80" 
                alt="Lotus" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-primary block">FocusZen</span>
              <span className="text-xs text-gray-600">Sri Sri Art of Living</span>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/meditate" className="text-gray-600 hover:text-primary transition-colors">
              Meditate
            </Link>
            <Link to="/breathwork" className="text-gray-600 hover:text-primary transition-colors">
              Breathwork
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};