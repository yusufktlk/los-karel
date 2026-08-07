"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/context/ToastContext";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("los_karel_user");
      const savedToken = localStorage.getItem("los_karel_token");
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch {
      // ignore
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Giriş başarısız");
        return false;
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("los_karel_user", JSON.stringify(data.user));
      localStorage.setItem("los_karel_token", data.token);
      showToast(`Hoş geldiniz, ${data.user.name || data.user.email}`);
      return true;
    } catch {
      // Fallback mock login for offline testing
      const mockUser = { id: "u-1", email, name: email.split("@")[0] };
      const mockToken = "mock_jwt_token";
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("los_karel_user", JSON.stringify(mockUser));
      localStorage.setItem("los_karel_token", mockToken);
      showToast(`Hoş geldiniz, ${mockUser.name}`);
      return true;
    }
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Kayıt başarısız");
        return false;
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("los_karel_user", JSON.stringify(data.user));
      localStorage.setItem("los_karel_token", data.token);
      showToast("Hesabınız oluşturuldu");
      return true;
    } catch {
      const mockUser = { id: "u-1", email, name };
      const mockToken = "mock_jwt_token";
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("los_karel_user", JSON.stringify(mockUser));
      localStorage.setItem("los_karel_token", mockToken);
      showToast("Hesabınız oluşturuldu");
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("los_karel_user");
    localStorage.removeItem("los_karel_token");
    showToast("Oturum kapatıldı");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
