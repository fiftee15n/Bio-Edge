import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '', 
  showIcon = true 
}) => {
  const { language, toggleLanguage, isBangla } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`lang-toggle-btn ${className}`}
      aria-label={isBangla ? 'Switch language to English' : 'বাংলা ভাষায় পরিবর্তন করুন'}
      title={isBangla ? 'Switch language to English' : 'বাংলা ভাষায় পরিবর্তন করুন'}
    >
      {showIcon && <Globe size={14} className="lang-globe-icon" />}
      <span className={isBangla ? 'lang-pill-active' : 'lang-pill-inactive'}>
        বাংলা
      </span>
      <span className="lang-divider">/</span>
      <span className={!isBangla ? 'lang-pill-active' : 'lang-pill-inactive'}>
        EN
      </span>
    </button>
  );
};
