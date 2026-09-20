import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.bn;
  isBangla: boolean;
  toBnNum: (num: string | number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBengaliNumber = (num: string | number): string => {
  return String(num).replace(/[0-9]/g, (digit) => BENGALI_NUMERALS[parseInt(digit, 10)]);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check localStorage, default to 'bn' as requested
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bioedge_language');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bioedge_language', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
  };

  useEffect(() => {
    // Set document lang attribute and update body class
    document.documentElement.lang = language;
    if (language === 'bn') {
      document.body.classList.add('lang-bn');
      document.body.setAttribute('data-lang', 'bn');
    } else {
      document.body.classList.remove('lang-bn');
      document.body.setAttribute('data-lang', 'en');
    }
  }, [language]);

  const toBnNum = (num: string | number): string => {
    return language === 'bn' ? toBengaliNumber(num) : String(num);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
    isBangla: language === 'bn',
    toBnNum
  };

  return (
    <LanguageContext.Provider value={value}>
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
