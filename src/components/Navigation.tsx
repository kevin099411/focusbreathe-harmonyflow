import { Wind, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const Navigation = () => {
  const session = useSession();
  const navigate = useNavigate();
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

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#e89eb8] hover:opacity-80 transition-opacity"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/meditate" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              靜坐
            </Link>
            <Link to="/breathwork" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              每日知識
            </Link>
            <Link to="/pricing" className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm whitespace-nowrap">
              價格
            </Link>
            {!session ? (
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-sm border-[#e89eb8] text-[#e89eb8] hover:bg-[#e89eb8]/10">
                  登入
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white/95 border-t border-gray-100">
            <div className="flex flex-col space-y-4 px-4">
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
                to="/pricing" 
                className="text-[#e89eb8] hover:opacity-80 transition-opacity text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                價格
              </Link>
              {!session ? (
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full text-sm border-[#e89eb8] text-[#e89eb8] hover:bg-[#e89eb8]/10">
                    登入
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};