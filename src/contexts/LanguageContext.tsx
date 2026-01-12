/**
 * Language Context - Internationalization Provider
 * 
 * Manages the current language state and provides translation functions.
 * Language preference is persisted to localStorage.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, Language, TranslationsType } from '@/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'mediasuite-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
