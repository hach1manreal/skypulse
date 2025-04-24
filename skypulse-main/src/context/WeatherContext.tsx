
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

// Weather API key
const API_KEY = "eed1d5ad55534e29ae5131825250804";

// Weather data types
export type WeatherData = {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    humidity: number;
    pressure_mb: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
};

export type ForecastDay = {
  date: string;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
  hour: Array<{
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  }>;
};

export type ForecastData = {
  forecastday: ForecastDay[];
};

// Settings types
export type UnitSettings = {
  temperature: "celsius" | "fahrenheit";
  distance: "kilometers" | "miles";
  timeFormat: "12h" | "24h";
};

export type WeatherContextType = {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchWeather: (location: string | GeolocationCoordinates) => Promise<void>;
  unitSettings: UnitSettings;
  updateUnitSettings: (settings: Partial<UnitSettings>) => void;
  lastSearchedLocation: string | null;
};

const DEFAULT_UNIT_SETTINGS: UnitSettings = {
  temperature: "celsius",
  distance: "kilometers",
  timeFormat: "12h",
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [unitSettings, setUnitSettings] = useState<UnitSettings>(() => {
    const savedSettings = localStorage.getItem("weatherUnitSettings");
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_UNIT_SETTINGS;
  });
  const [lastSearchedLocation, setLastSearchedLocation] = useState<string | null>(null);

  // Save unit settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("weatherUnitSettings", JSON.stringify(unitSettings));
  }, [unitSettings]);

  // Fetch forecast data
  const fetchForecast = useCallback(async (location: string | GeolocationCoordinates) => {
    try {
      let url = typeof location === "string"
        ? `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=no`
        : `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.latitude},${location.longitude}&days=5&aqi=no`;

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Failed to fetch forecast");
      }
      
      setForecastData(data.forecast);
    } catch (error) {
      console.error("Forecast error:", error);
      setError("Failed to fetch forecast data");
    }
  }, []);

  // Fetch weather data
  const fetchWeather = useCallback(async (location: string | GeolocationCoordinates) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let url = typeof location === "string"
        ? `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
        : `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.latitude},${location.longitude}&aqi=no`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "City not found");
      }

      setWeatherData(data);
      setLastSearchedLocation(typeof location === "string" ? location : `${location.latitude},${location.longitude}`);
      
      // Now fetch the forecast data
      await fetchForecast(location);
      
    } catch (error: any) {
      console.error("Weather error:", error);
      setError(error.message || "Failed to fetch weather data");
      toast({
        title: "Error",
        description: error.message || "Failed to fetch weather data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchForecast]);

  // Get current location and fetch weather
  const getCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      await fetchWeather(position.coords);
    } catch (error: any) {
      console.error("Geolocation error:", error);
      setError("Failed to get your location. Please search for a city.");
      toast({
        title: "Location Error",
        description: "Unable to get your location. Please search for a city.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [fetchWeather]);

  // Update unit settings
  const updateUnitSettings = (settings: Partial<UnitSettings>) => {
    setUnitSettings(prev => ({ ...prev, ...settings }));
  };

  // Initial location fetch
  useEffect(() => {
    const lastLocation = localStorage.getItem("lastWeatherLocation");
    
    if (lastLocation) {
      fetchWeather(lastLocation);
    } else {
      getCurrentLocation();
    }
  }, [getCurrentLocation, fetchWeather]);

  // Save last searched location
  useEffect(() => {
    if (lastSearchedLocation) {
      localStorage.setItem("lastWeatherLocation", lastSearchedLocation);
    }
  }, [lastSearchedLocation]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        isLoading,
        error,
        searchQuery,
        setSearchQuery,
        fetchWeather,
        unitSettings,
        updateUnitSettings,
        lastSearchedLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
