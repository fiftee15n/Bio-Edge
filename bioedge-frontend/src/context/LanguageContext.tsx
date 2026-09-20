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
  // Requirement: While opening the web first initially, it must open in Bangla ('bn').
  const [language, setLanguageState] = useState<Language>(() => {
    // Clear any obsolete legacy key from previous sessions that might have cached 'en'
    try {
      localStorage.removeItem('bioedge_language');
    } catch {
      // ignore
    }

    // Check if user has explicitly chosen a language in this active session
    try {
      const sessionLang = sessionStorage.getItem('bioedge_session_lang');
      if (sessionLang === 'en' || sessionLang === 'bn') {
        return sessionLang;
      }
    } catch {
      // ignore
    }

    // Default initial language MUST be Bangla ('bn')
    return 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      sessionStorage.setItem('bioedge_session_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
  };

  useEffect(() => {
    // Set document lang attribute, document title, and update body class
    document.documentElement.lang = language;
    if (language === 'bn') {
      document.body.classList.add('lang-bn');
      document.body.setAttribute('data-lang', 'bn');
      document.title = 'বায়ো এজ বাই আফরোজা তাহমিনা | এইচএসসি বায়োলজি ইন্টেনসিভ প্রোগ্রাম';
    } else {
      document.body.classList.remove('lang-bn');
      document.body.setAttribute('data-lang', 'en');
      document.title = 'Bio Edge by Afroza Tahmina | Premium HSC Biology Intensive Program';
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
