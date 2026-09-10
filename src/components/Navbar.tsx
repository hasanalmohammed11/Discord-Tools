import React from 'react';
import { Globe, Wrench, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../services/localization';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onToggleLanguage }) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#1E1F22]/95 backdrop-blur-md border-b border-[#313338] px-4 py-3 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5865F2] to-[#3B45B5] flex items-center justify-center text-white shadow-lg shadow-[#5865F2]/25 ring-1 ring-white/20">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white font-['Inter',sans-serif]">
                Discord Tools
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
                Hub
              </span>
            </div>
            <p className="text-xs text-[#949BA4] line-clamp-1">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Supabase Ready Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#57F287]/10 text-[#57F287] text-xs font-semibold border border-[#57F287]/20">
            <span className="w-2 h-2 rounded-full bg-[#57F287] animate-pulse"></span>
            <span>Supabase Cloud</span>
          </div>

          {/* Language Switch Button */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B2D31] hover:bg-[#383A40] text-[#F2F3F5] text-xs font-bold border border-[#3F4147] transition-all active:scale-95 shadow-sm"
            title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#5865F2]" />
            <span>{language === 'ar' ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
