
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";
import RadarPage from "./pages/RadarPage";
import { WeatherProvider } from "./context/WeatherContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Private route component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

// App routes with auth check
const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/settings" element={
        <PrivateRoute>
          <SettingsPage />
        </PrivateRoute>
      } />
      <Route path="/radar" element={
        <PrivateRoute>
          <RadarPage />
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <WeatherProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </WeatherProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
