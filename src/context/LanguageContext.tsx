"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dictionary } from "@/data/translations";

export type Language = "TR" | "EN";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof dictionary.TR) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>("TR");

  useEffect(() => {
    const saved = localStorage.getItem("los_karel_lang") as Language;
    if (saved === "TR" || saved === "EN") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("los_karel_lang", newLang);
  };

  const t = (key: keyof typeof dictionary.TR): string => {
    return dictionary[lang][key] || dictionary.TR[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
