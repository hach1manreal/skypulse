
import React from "react";
import Layout from "@/components/Layout";
import { useWeather } from "@/context/WeatherContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { unitSettings, updateUnitSettings } = useWeather();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleTemperatureChange = (value: "celsius" | "fahrenheit") => {
    updateUnitSettings({ temperature: value });
    toast({
      description: `Temperature unit changed to ${value === "celsius" ? "Celsius" : "Fahrenheit"}`,
    });
  };

  const handleDistanceChange = (value: "kilometers" | "miles") => {
    updateUnitSettings({ distance: value });
    toast({
      description: `Distance unit changed to ${value === "kilometers" ? "Kilometers" : "Miles"}`,
    });
  };

  const handleTimeFormatChange = (value: "12h" | "24h") => {
    updateUnitSettings({ timeFormat: value });
    toast({
      description: `Time format changed to ${value === "12h" ? "12-hour" : "24-hour"}`,
    });
  };

  return (
    <Layout backgroundImage="https://source.unsplash.com/random/1920x1080/?weather,settings">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white text-shadow text-center mb-8">Settings</h1>

        <Card className="bg-black/50 backdrop-blur-md text-white border-white/10 shadow-xl mb-6 animate-fadeIn">
          <CardHeader>
            <CardTitle>Units</CardTitle>
            <CardDescription className="text-white/70">
              Configure your preferred measurement units
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Temperature</h3>
              <RadioGroup
                value={unitSettings.temperature}
                onValueChange={(value) => handleTemperatureChange(value as "celsius" | "fahrenheit")}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="celsius" 
                    id="celsius" 
                    className="border-white/50 text-white"
                  />
                  <Label htmlFor="celsius" className="text-white">Celsius (°C)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="fahrenheit" 
                    id="fahrenheit" 
                    className="border-white/50 text-white"
                  />
                  <Label htmlFor="fahrenheit" className="text-white">Fahrenheit (°F)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Distance</h3>
              <RadioGroup
                value={unitSettings.distance}
                onValueChange={(value) => handleDistanceChange(value as "kilometers" | "miles")}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="kilometers" 
                    id="kilometers" 
                    className="border-white/50 text-white"
                  />
                  <Label htmlFor="kilometers" className="text-white">Kilometers (km)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="miles" 
                    id="miles" 
                    className="border-white/50 text-white"
                  />
                  <Label htmlFor="miles" className="text-white">Miles (mi)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Time Format</h3>
              <RadioGroup
                value={unitSettings.timeFormat}
                onValueChange={(value) => handleTimeFormatChange(value as "12h" | "24h")}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="12h" 
                    id="12h" 
                    className="border-white/50 text-white"
                  />
                  <Label htmlFor="12h" className="text-white">12-hour (1:00 PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="24h" 
                    id="24h" 
                    className="border-white/50 text-white"
                  />
                  <Label htmlFor="24h" className="text-white">24-hour (13:00)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 backdrop-blur-md text-white border-white/10 shadow-xl animate-fadeIn">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription className="text-white/70">
              Configure your alert preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Severe Weather Alerts</Label>
                <p className="text-sm text-white/70">
                  Receive notifications about severe weather conditions
                </p>
              </div>
              <Switch checked id="severe-weather" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Daily Forecast</Label>
                <p className="text-sm text-white/70">
                  Receive daily weather forecasts in the morning
                </p>
              </div>
              <Switch id="daily-forecast" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;
