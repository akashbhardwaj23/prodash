"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";


interface AuthContextInterface {
    isAuthenticated : boolean;
    loading : boolean;
    login : (token : string, user : unknown) => void
    logout : () => void
}


export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export function AuthProvider({
    children
} : {
    children : React.ReactNode
}){
     const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    setIsAuthenticated(Boolean(token));
    setLoading(false);
  }, []);

   const login = (token: string, user: unknown) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{
    isAuthenticated,
    loading,
    login,
    logout
  }}>
    {children}
  </AuthContext.Provider>

}
