import { Wind, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-[#e89eb8]" />
              <span className="text-base font-bold text-[#e89eb8] whitespace-nowrap hover:opacity-80 transition-opacity">
                呼吸的奇蹟
              </span>
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#e89eb8] hover:opacity-80 transition-opacity"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              商店
            </Link>
            <Link to="/meditate" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              靜坐
            </Link>
            <Link to="/breathwork" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              每日知識
            </Link>
            <Link to="/testing" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              會員
            </Link>
            <Link to="/pricing" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              價格
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white/95 border-t border-gray-100">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/products" 
                className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                商店
              </Link>
              <Link 
                to="/meditate" 
                className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                靜坐
              </Link>
              <Link 
                to="/breathwork" 
                className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                每日知識
              </Link>
              <Link 
                to="/testing" 
                className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                會員
              </Link>
              <Link 
                to="/pricing" 
                className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                價格
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};