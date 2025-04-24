import React from "react";
import { Card } from "@/components/ui/card";
import { useWeather } from "@/context/WeatherContext";

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  PH: "Philippines",
  CA: "Canada",
  GB: "United Kingdom",
  AU: "Australia",
  FR: "France",
  DE: "Germany",
  IN: "India",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  AR: "Argentina",
  EU: "European Union",
  ID: "Indonesia",
  IT: "Italy",
  BR: "Brazil",
};

const CurrentWeather: React.FC = () => {
  const { weatherData, unitSettings } = useWeather();

  if (!weatherData) return null;

  const convertedTemp = unitSettings.temperature === "celsius"
    ? weatherData.current.temp_c
    : weatherData.current.temp_f;

  const convertedFeelsLike = unitSettings.temperature === "celsius"
    ? weatherData.current.feelslike_c
    : weatherData.current.feelslike_f;

  const windSpeed =
    unitSettings.distance === "kilometers"
      ? weatherData.current.wind_kph
      : weatherData.current.wind_mph;

  const country = COUNTRY_NAMES[weatherData.location.country] || weatherData.location.country;

  return (
    <Card className="weather-card overflow-hidden w-full max-w-md animate-fadeIn">
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white text-shadow">
          {weatherData.location.name}
        </h2>
        <p className="text-lg text-white/80 mb-4">{country}</p>
        
        <div className="flex items-center justify-center mb-2">
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            className="w-24 h-24"
          />
        </div>
        
        <div className="text-6xl font-extralight mb-2 text-white text-shadow">
          {Math.round(convertedTemp)}°{unitSettings.temperature === "celsius" ? "C" : "F"}
        </div>
        
        <p className="text-xl mb-4 text-white/90">
          {weatherData.current.condition.text}
        </p>
        
        <p className="text-md text-white/80 mb-6">
          Feels like {Math.round(convertedFeelsLike)}°
          {unitSettings.temperature === "celsius" ? "C" : "F"}
        </p>
        
        <div className="grid grid-cols-3 gap-4 w-full text-center">
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm">Humidity</span>
            <span className="text-lg font-medium text-white">{weatherData.current.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm">Wind</span>
            <span className="text-lg font-medium text-white">
              {Math.round(windSpeed)} {unitSettings.distance === "kilometers" ? "km/h" : "mph"}
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm">UV Index</span>
            <span className="text-lg font-medium text-white">{weatherData.current.uv}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
