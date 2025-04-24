
import React from "react";
import { Card } from "@/components/ui/card";
import { useWeather } from "@/context/WeatherContext";

const WeatherRadar = () => {
  const { weatherData } = useWeather();

  const iframeSrc = weatherData 
    ? `https://embed.windy.com/embed2.html?lat=${weatherData.location.lat}&lon=${weatherData.location.lon}&zoom=5&level=surface&overlay=radar&product=radar&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`
    : "https://embed.windy.com/embed2.html?lat=40&lon=-95&zoom=4&level=surface&overlay=radar&product=radar&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1";

  return (
    <Card className="weather-card overflow-hidden animate-fadeIn">
      <div className="aspect-video w-full h-[70vh] relative">
        <iframe
          src={iframeSrc}
          className="w-full h-full border-0"
          title="Weather Radar"
          allow="geolocation"
        />
      </div>
    </Card>
  );
};

export default WeatherRadar;
