import React, { useState } from 'react';
import { 
  Globe, Moon, Sun, Database, Shield, Info, Copy, Check, 
  ExternalLink, Key, Sparkles, FileCode, CheckCircle2 
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { translations } from '../services/localization';
import { 
  SUPABASE_URL, STORAGE_BUCKET, getSupabaseAnonKey, setSupabaseAnonKey 
} from '../services/supabase';

interface SettingsViewProps {
  language: Language;
  theme: ThemeMode;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (theme: ThemeMode) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}) => {
  const t = translations[language];

  const [anonKeyInput, setAnonKeyInput] = useState(getSupabaseAnonKey());
  const [keySaved, setKeySaved] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const saveAnonKey = () => {
    setSupabaseAnonKey(anonKeyInput);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const fullSqlScript = `-- ===================================================
-- Discord Tools - Complete Supabase Database & Storage Setup
-- Project URL: https://isjcjuacqgtdmhtslxvf.supabase.co
-- ===================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create 'bots' table
CREATE TABLE IF NOT EXISTS public.bots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_url TEXT NOT NULL,
    invite_url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Moderation', 'Music', 'Security', 'Utility', 'Fun', 'Economy')),
    developer TEXT,
    prefix TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create 'files' table
CREATE TABLE IF NOT EXISTS public.files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL UNIQUE,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    download_count BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies: Allow public read access (No Login required)
CREATE POLICY "Public Read Bots" ON public.bots
    FOR SELECT USING (true);

CREATE POLICY "Public Read Files" ON public.files
    FOR SELECT USING (true);

CREATE POLICY "Public Insert Files" ON public.files
    FOR INSERT WITH CHECK (true);

-- 6. Storage Bucket setup for 'discord-files'
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'discord-files',
    'discord-files',
    true,
    52428800, -- 50 MB strict limit in bytes
    NULL -- All MIME types allowed
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800;

-- 7. Storage RLS Policies: Allow anyone to view and upload files
CREATE POLICY "Public can view discord-files"
ON storage.objects FOR SELECT
USING (bucket_id = 'discord-files');

CREATE POLICY "Public can upload to discord-files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'discord-files');
`;

  const copySql = () => {
    navigator.clipboard.writeText(fullSqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg">
        <h1 className="text-xl font-bold text-white tracking-tight">
          {t.settingsTitle}
        </h1>
        <p className="text-xs text-[#949BA4] mt-1">
          {t.settingsSubtitle}
        </p>
      </div>

      {/* Language & Theme Customization */}
      <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-4">
        {/* Language */}
        <div className="flex items-center justify-between py-2 border-b border-[#383A40]">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#5865F2]" />
            <div>
              <span className="text-sm font-bold text-white block">{t.langSetting}</span>
              <span className="text-xs text-[#949BA4]">العربية (RTL) / English (LTR)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1E1F22] p-1 rounded-xl border border-[#383A40]">
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'ar'
                  ? 'bg-[#5865F2] text-white shadow-sm'
                  : 'text-[#949BA4] hover:text-white'
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#5865F2] text-white shadow-sm'
                  : 'text-[#949BA4] hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-[#57F287]" />
            <div>
              <span className="text-sm font-bold text-white block">{t.themeSetting}</span>
              <span className="text-xs text-[#949BA4]">Discord Dark Canvas</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1E1F22] p-1 rounded-xl border border-[#383A40]">
            <button
              onClick={() => onThemeChange('dark')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                theme === 'dark'
                  ? 'bg-[#5865F2] text-white shadow-sm'
                  : 'text-[#949BA4] hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{t.themeDark}</span>
            </button>
            <button
              onClick={() => onThemeChange('light')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                theme === 'light'
                  ? 'bg-[#5865F2] text-white shadow-sm'
                  : 'text-[#949BA4] hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t.themeLight}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Start.io Ads Integration Section */}
      <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[#EB459E]" />
          <h2 className="text-sm font-bold text-white">
            {t.startIoSection}
          </h2>
        </div>
        <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#383A40] space-y-1.5 text-xs">
          <p className="font-mono text-[#5865F2] font-bold">
            {t.startIoAppId}
          </p>
          <p className="text-[#949BA4]">
            {t.startIoStatus}
          </p>
          <p className="text-[11px] text-[#57F287]">
            ✓ Banner Ad يتم إخفاؤه تلقائياً أثناء رفع الملفات ولا يعيق أزرار التنقل.
          </p>
        </div>
      </div>

      {/* Supabase Storage Integration & SQL */}
      <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#57F287]" />
            <h2 className="text-sm font-bold text-white">
              {t.supabaseSection}
            </h2>
          </div>
          <button
            onClick={copySql}
            className="px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center gap-1.5"
          >
            {copiedSql ? <Check className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
            <span>نسخ SQL لـ Supabase</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#383A40] space-y-2 text-xs">
          <div>
            <span className="text-[#949BA4] block">{t.supabaseProjectUrl}</span>
            <span className="font-mono text-[#5865F2] font-semibold">{SUPABASE_URL}</span>
          </div>
          <div>
            <span className="text-[#949BA4] block">{t.supabaseStorageBucket}</span>
          </div>
          <div>
            <span className="text-[#57F287] font-semibold">{t.supabaseStatus}</span>
          </div>
        </div>

        {/* Anon Key Customizer */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#949BA4] block">
            Supabase Publishable Key (Anon Key):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="password"
              value={anonKeyInput}
              onChange={(e) => setAnonKeyInput(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="flex-1 bg-[#1E1F22] text-xs font-mono text-white px-3 py-2 rounded-xl border border-[#3F4147] outline-none"
            />
            <button
              onClick={saveAnonKey}
              className="px-4 py-2 rounded-xl bg-[#313338] hover:bg-[#383A40] text-white text-xs font-bold border border-[#3F4147]"
            >
              {keySaved ? <Check className="w-4 h-4 text-[#57F287]" /> : 'حفظ'}
            </button>
          </div>
        </div>
      </div>

      {/* About & Privacy */}
      <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white mb-1">
            {t.aboutSection}
          </h3>
          <p className="text-xs text-[#949BA4] leading-relaxed">
            {t.aboutText}
          </p>
          <p className="text-[11px] text-[#949BA4]/70 mt-2 italic">
            {t.disclaimer}
          </p>
        </div>

        <div className="pt-3 border-t border-[#383A40]">
          <h3 className="text-sm font-bold text-white mb-1">
            {t.privacySection}
          </h3>
          <p className="text-xs text-[#949BA4] leading-relaxed">
            {t.privacyText}
          </p>
        </div>

        <div className="pt-3 border-t border-[#383A40] flex items-center justify-between text-xs text-[#949BA4]">
          <span>{t.appVersion}</span>
          <span className="font-mono text-white font-bold">v1.0.0 (Build 100)</span>
        </div>
      </div>
    </div>
  );
};
