import React from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/Auth/AuthForm";
import { useWeather } from "@/context/WeatherContext";
import SearchBar from "@/components/Weather/SearchBar";
import CurrentWeather from "@/components/Weather/CurrentWeather";
import ForecastWeather from "@/components/Weather/ForecastWeather";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const { isLoading, weatherData } = useWeather();

  // Determine background image based on weather condition
  const getBackgroundImage = () => {
    if (!weatherData) return "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800";
    
    const condition = weatherData.current.condition.text.toLowerCase();
    
    if (condition.includes("clear") || condition.includes("sunny")) {
      return "https://source.unsplash.com/random/1920x1080/?sunny,sky";
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      return "https://source.unsplash.com/random/1920x1080/?rain";
    } else if (condition.includes("cloud")) {
      return "https://source.unsplash.com/random/1920x1080/?cloudy";
    } else if (condition.includes("snow")) {
      return "https://source.unsplash.com/random/1920x1080/?snow";
    } else if (condition.includes("thunder") || condition.includes("storm")) {
      return "https://source.unsplash.com/random/1920x1080/?storm";
    } else if (condition.includes("fog") || condition.includes("mist")) {
      return "https://source.unsplash.com/random/1920x1080/?fog";
    } else {
      return "https://source.unsplash.com/random/1920x1080/?weather";
    }
  };

  // Default background for login screen
  const defaultLoginBackground = "https://source.unsplash.com/random/1920x1080/?storm,night";

  if (!isLoggedIn) {
    return (
      <Layout showNav={false} backgroundImage={defaultLoginBackground}>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow mb-2">
              SkyPulse
            </h1>
            <p className="text-xl text-white/90 text-shadow">
              Your Weather, Your Way
            </p>
          </div>
          <AuthForm />
        </div>
      </Layout>
    );
  }

  return (
    <Layout backgroundImage={getBackgroundImage()}>
      <div className="container mx-auto px-4 py-6 min-h-screen">
        <div className="flex flex-col items-center gap-6 pt-4 md:pt-8">
          <SearchBar />
          
          {isLoading ? (
            <div className="h-64 w-full max-w-md flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                <p className="mt-4 text-white text-lg">Loading weather data...</p>
              </div>
            </div>
          ) : (
            <>
              <CurrentWeather />
              <ForecastWeather />
              
              <div className="mt-4 w-full max-w-md px-4">
                <Button 
                  asChild
                  className="w-full bg-blue-600/90 hover:bg-blue-700 text-white text-lg py-6"
                >
                  <a href="/radar">View Live Weather Radar</a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
