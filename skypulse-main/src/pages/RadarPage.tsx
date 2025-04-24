
import React from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import WeatherRadar from "@/components/Weather/WeatherRadar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Satellite } from "lucide-react";

const RadarPage = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Layout backgroundImage="https://source.unsplash.com/random/1920x1080/?storm,clouds">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-shadow text-center mb-6">
          Live Weather Radar
        </h1>
        
        <Tabs defaultValue="radar" className="w-full animate-fadeIn">
          <TabsList className="bg-black/40 w-full mx-auto grid grid-cols-2 gap-1 p-1 mb-4">
            <TabsTrigger 
              value="radar" 
              className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600/80 data-[state=active]:text-white"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Interactive Radar</span>
              <span className="sm:hidden">Radar</span>
            </TabsTrigger>
            <TabsTrigger 
              value="satellite" 
              className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600/80 data-[state=active]:text-white"
            >
              <Satellite className="h-4 w-4" />
              <span className="hidden sm:inline">Satellite View</span>
              <span className="sm:hidden">Satellite</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="radar" className="mt-0 space-y-4">
            <WeatherRadar />
            
            <Card className="bg-black/40 border-white/10 text-white">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-medium mb-2">About Weather Radar</h3>
                <p className="text-white/80 text-sm">
                  Track storms, rain, snow, and weather patterns in real-time with our interactive radar. Use pinch gestures to zoom and drag to pan across different areas.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="satellite" className="mt-0 space-y-4">
            <Card className="bg-black/40 border-white/10 text-white overflow-hidden">
              <div className="aspect-video w-full h-[70vh]">
                <iframe 
                  src="https://www.windy.com/-Satellite-satellite?satellite,38.350,-98.173,5"
                  className="w-full h-full border-0"
                  title="Weather Satellite"
                  allow="geolocation"
                />
              </div>
            </Card>
            
            <Card className="bg-black/40 border-white/10 text-white">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-medium mb-2">About Satellite View</h3>
                <p className="text-white/80 text-sm">
                  View cloud formations and weather systems from space. Perfect for tracking large-scale weather patterns and storm development.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RadarPage;
