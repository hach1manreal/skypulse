
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout backgroundImage="https://source.unsplash.com/random/1920x1080/?stormy,weather">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-black/50 backdrop-blur-md p-8 rounded-lg border border-white/10 max-w-md animate-fadeIn">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-white/80 mb-6">Oops! This forecast isn't available</p>
          <p className="text-white/60 mb-8">We couldn't find the page you're looking for. It might have moved or doesn't exist.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
