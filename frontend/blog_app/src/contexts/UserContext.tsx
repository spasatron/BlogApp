// UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (newToken: string) => {
    console.log("New Token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
