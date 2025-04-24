
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Home, Radar } from "lucide-react";

const Layout = ({ children, backgroundImage, showNav = true }) => {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const location = useLocation();
  
  return (
    <div 
      className="min-h-screen flex flex-col relative bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" />
      <div className="relative z-10 flex-1 flex flex-col">
        {isLoggedIn && showNav && (
          <nav className="py-3 px-4 flex justify-between items-center bg-black/70 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center">
              <Link to="/" className="text-white font-bold text-xl">
                SkyPulse
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="bg-blue-600/80 hover:bg-blue-700/80 text-white"
              >
                <Link to="/">
                  <Home className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="bg-blue-600/80 hover:bg-blue-700/80 text-white"
              >
                <Link to="/radar">
                  <Radar className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Radar</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="bg-blue-600/80 hover:bg-blue-700/80 text-white"
              >
                <Link to="/settings">
                  <Settings className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="bg-red-600/80 hover:bg-red-700/80 text-white border-none"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </nav>
        )}

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
