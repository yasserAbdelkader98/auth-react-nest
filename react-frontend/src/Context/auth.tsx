// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { AuthContextType } from '../InterFaces/auth.interface';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return localStorage.getItem('token') ? true : false;
  });

  const [userId, setUserId] = useState<string>(() => {
    return localStorage.getItem('userId') ?? ''
  });

  const loginContext = (token: string, userId: string) => {
    setIsLogged(true);
    setUserId(userId)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
  };

  const logoutContext = () => {
    setIsLogged(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userId, isLogged, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
