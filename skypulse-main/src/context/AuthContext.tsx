
import React, { createContext, useState, useEffect, useContext } from "react";

type User = {
  username: string;
  password: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  currentUser: string | null;
  users: User[];
  login: (username: string) => void;
  logout: () => void;
  register: (username: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem("weatherAppUsers");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Save users to localStorage
    if (users.length > 0) {
      localStorage.setItem("weatherAppUsers", JSON.stringify(users));
    }
  }, [users]);

  const login = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", username);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
  };

  const register = (username: string, password: string): boolean => {
    if (users.some((u) => u.username === username)) {
      return false;
    }
    
    const updatedUsers = [...users, { username, password }];
    setUsers(updatedUsers);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        users,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
