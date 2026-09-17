'use client';

import React from 'react';
import { Languages } from 'lucide-react';

export type CourseLanguage = 'en' | 'hinglish';

interface LanguageSelectorProps {
  currentLanguage: CourseLanguage;
  onLanguageChange?: (lang: CourseLanguage) => void;
  onChange?: (lang: CourseLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  onChange,
}) => {
  const handleSelect = (lang: CourseLanguage) => {
    try {
      localStorage.setItem('prayxis_course_language', lang);
    } catch (e) {}
    if (onChange) onChange(lang);
    if (onLanguageChange) onLanguageChange(lang);
  };

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-black/60 border border-prayxis-accent/40 rounded-xl backdrop-blur-md font-mono text-xs shadow-lg select-none">
      <div className="flex items-center gap-1.5 px-2 py-1 text-prayxis-muted text-[11px]">
        <Languages className="h-3.5 w-3.5 text-prayxis-accent" />
        <span className="hidden sm:inline font-bold uppercase tracking-wider">LANG:</span>
      </div>

      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`px-2.5 py-1 rounded-lg transition-all font-bold text-[11px] flex items-center gap-1 cursor-pointer ${
          currentLanguage === 'en'
            ? 'bg-prayxis-accent text-black cyan-glow'
            : 'text-prayxis-muted hover:text-prayxis-offwhite hover:bg-white/5'
        }`}
      >
        <span>🇬🇧</span>
        <span>ENGLISH</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('hinglish')}
        className={`px-2.5 py-1 rounded-lg transition-all font-bold text-[11px] flex items-center gap-1 cursor-pointer ${
          currentLanguage === 'hinglish'
            ? 'bg-prayxis-accent text-black cyan-glow'
            : 'text-prayxis-muted hover:text-prayxis-offwhite hover:bg-white/5'
        }`}
      >
        <span>🇮🇳</span>
        <span>HINGLISH</span>
      </button>
    </div>
  );
};
