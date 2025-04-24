
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register, users } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      toast({
        title: "Oops!",
        description: "Please fill in all fields to continue",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (isLogin) {
      // Login logic
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        login(username);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${username}`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "The username or password you entered is incorrect",
          variant: "destructive",
        });
      }
    } else {
      // Register logic
      if (password !== confirmPassword) {
        toast({
          title: "Mismatch",
          description: "Your passwords don't match. Please try again",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const success = register(username, password);
      
      if (success) {
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully!",
        });
        setIsLogin(true);
        setPassword("");
        setConfirmPassword("");
      } else {
        toast({
          title: "Taken",
          description: "This username is already in use. Please choose another",
          variant: "destructive",
        });
      }
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-[350px] sm:w-[400px] bg-black/50 backdrop-blur-md text-white border-white/10 shadow-xl animate-fadeIn">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {isLogin ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center text-white/70">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Enter your details to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                autoComplete="new-password"
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full text-white/80 hover:text-white"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New to SkyPulse? Join Now"
            : "Already have an account? Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
