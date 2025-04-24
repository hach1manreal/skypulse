
import React from "react";
import { Card } from "@/components/ui/card";
import { useWeather } from "@/context/WeatherContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const ForecastWeather: React.FC = () => {
  const { forecastData, unitSettings } = useWeather();

  if (!forecastData) return null;

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { 
      hour: "numeric", 
      minute: "2-digit",
      hour12: unitSettings.timeFormat === "12h" 
    });
  };

  return (
    <Card className="weather-card bg-black/40 backdrop-blur-md text-white border-white/10 shadow-lg overflow-hidden w-full max-w-6xl animate-fadeIn">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">5-Day Forecast</h3>
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-2">
            {forecastData.forecastday.map((day) => (
              <div
                key={day.date}
                className="min-w-[140px] bg-white/10 p-4 rounded-lg flex flex-col items-center"
              >
                <p className="text-sm font-medium">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="w-14 h-14 my-2"
                />
                <p className="text-xs text-white/80">{day.day.condition.text}</p>
                <div className="flex justify-between w-full mt-2">
                  <span className="text-sm font-medium">
                    {Math.round(
                      unitSettings.temperature === "celsius"
                        ? day.day.mintemp_c
                        : day.day.mintemp_f
                    )}°
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      unitSettings.temperature === "celsius"
                        ? day.day.maxtemp_c
                        : day.day.maxtemp_f
                    )}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {forecastData.forecastday[0]?.hour && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Today's Hourly Forecast</h3>
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-2">
                {forecastData.forecastday[0].hour
                  .filter((_, index) => index % 2 === 0) // Show every other hour to reduce clutter
                  .map((hour) => (
                    <div
                      key={hour.time}
                      className="min-w-[80px] bg-white/10 p-3 rounded-lg flex flex-col items-center"
                    >
                      <p className="text-sm font-medium">
                        {formatTime(hour.time)}
                      </p>
                      <img
                        src={`https:${hour.condition.icon}`}
                        alt={hour.condition.text}
                        className="w-12 h-12 my-2"
                      />
                      <p className="text-lg font-medium">
                        {Math.round(
                          unitSettings.temperature === "celsius"
                            ? hour.temp_c
                            : hour.temp_f
                        )}°
                      </p>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ForecastWeather;
