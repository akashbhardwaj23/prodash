"use client";

import LoginForm from "@/components/auth/LoginForm";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


interface AuthContextInterface {
    isAuthenticated : boolean;
    loading : boolean;
    login : (token : string, user : unknown) => void
    logout : () => void
}


const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

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


export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("AuthContext must be provided");
    }

    return context;
}
