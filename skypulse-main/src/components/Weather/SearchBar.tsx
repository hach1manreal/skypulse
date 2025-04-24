
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/context/WeatherContext";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, fetchWeather } = useWeather();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      fetchWeather(localQuery);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 w-full max-w-md animate-fadeIn px-4 sm:px-0"
    >
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full bg-black/50 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 pr-10 h-12 text-lg"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
      </div>
      <Button 
        type="submit" 
        className="h-12 px-6 bg-blue-600/90 hover:bg-blue-700 text-white text-lg font-medium"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
