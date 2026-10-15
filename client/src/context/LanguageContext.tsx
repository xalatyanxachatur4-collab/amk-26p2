import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types/i18n.js';
import { translations, TranslationKeys } from '../i18n/index.js';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationKeys;
  localize: (obj: { en: string; hy: string; ru: string } | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('aee_lang') as SupportedLanguage | null;
    if (saved === 'en' || saved === 'hy' || saved === 'ru') return saved;
    // Check browser language
    const navLang = navigator.language.slice(0, 2);
    if (navLang === 'hy') return 'hy';
    if (navLang === 'ru') return 'ru';
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('aee_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = translations[language] || translations.en;

  const localize = (obj: { en: string; hy: string; ru: string } | undefined): string => {
    if (!obj) return '';
    return obj[language] || obj.en || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
