import React from 'react';
import { 
  FolderUp, Wrench, Bot, Clock, Layers, ShieldCheck, Palette, 
  ArrowRight, ArrowLeft, Sparkles, UploadCloud, ChevronRight, ChevronLeft 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../services/localization';
import { TabType } from './BottomNav';

interface HomeViewProps {
  language: Language;
  onNavigate: (tab: TabType, toolId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ language, onNavigate }) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const popularTools = [
    { id: 'timestamp', name: t.toolTimestamp, desc: 'توقيتات ديناميكية', icon: Clock, color: '#5865F2' },
    { id: 'embed', name: t.toolEmbed, desc: 'تصميم الـ Embeds', icon: Layers, color: '#57F287' },
    { id: 'permissions', name: t.toolPermissions, desc: 'حساب بتات الصلاحيات', icon: ShieldCheck, color: '#FEE75C' },
    { id: 'color', name: t.toolColor, desc: 'HEX & Decimal ألوان', icon: Palette, color: '#EB459E' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5865F2]/20 via-[#2B2D31] to-[#1E1F22] border border-[#5865F2]/30 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/20 text-[#5865F2] text-xs font-bold mb-3 border border-[#5865F2]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discord Tools Hub v1.0</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Discord Tools
          </h1>
          <p className="text-sm sm:text-base text-[#949BA4] mt-2 leading-relaxed">
            "Everything you need for your Discord server"
          </p>
          <p className="text-xs text-[#57F287] mt-1 font-semibold">
            {t.welcomeSubtitle}
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#5865F2]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: File Center */}
        <div
          onClick={() => onNavigate('files')}
          className="group bg-[#2B2D31] hover:bg-[#313338] border border-[#383A40] hover:border-[#5865F2] p-5 rounded-2xl cursor-pointer transition-all duration-200 shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FolderUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#5865F2] transition-colors">
              {t.fileCenterCardTitle}
            </h3>
            <p className="text-xs text-[#949BA4] mt-1.5 leading-relaxed">
              {t.fileCenterCardDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#383A40] flex items-center justify-between text-xs font-bold text-[#5865F2]">
            <span>{t.openSection}</span>
            <NextIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Discord Tools */}
        <div
          onClick={() => onNavigate('tools')}
          className="group bg-[#2B2D31] hover:bg-[#313338] border border-[#383A40] hover:border-[#57F287] p-5 rounded-2xl cursor-pointer transition-all duration-200 shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#57F287]/20 text-[#57F287] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#57F287] transition-colors">
              {t.toolsCardTitle}
            </h3>
            <p className="text-xs text-[#949BA4] mt-1.5 leading-relaxed">
              {t.toolsCardDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#383A40] flex items-center justify-between text-xs font-bold text-[#57F287]">
            <span>{t.openSection}</span>
            <NextIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Discord Bots */}
        <div
          onClick={() => onNavigate('bots')}
          className="group bg-[#2B2D31] hover:bg-[#313338] border border-[#383A40] hover:border-[#FEE75C] p-5 rounded-2xl cursor-pointer transition-all duration-200 shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FEE75C]/20 text-[#FEE75C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#FEE75C] transition-colors">
              {t.botsCardTitle}
            </h3>
            <p className="text-xs text-[#949BA4] mt-1.5 leading-relaxed">
              {t.botsCardDesc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#383A40] flex items-center justify-between text-xs font-bold text-[#FEE75C]">
            <span>{t.openSection}</span>
            <NextIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Popular Tools Section */}
      <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5865F2]" />
            <h2 className="text-base font-bold text-white">
              {t.popularToolsTitle}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="text-xs text-[#5865F2] hover:underline font-bold"
          >
            عرض الكل
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {popularTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onNavigate('tools', tool.id)}
                className="bg-[#1E1F22] hover:bg-[#313338] p-3.5 rounded-xl border border-[#383A40] hover:border-[#5865F2]/50 cursor-pointer transition-all duration-200 group text-center flex flex-col items-center justify-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: `${tool.color}25`, color: tool.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#5865F2] transition-colors truncate max-w-full">
                  {tool.name}
                </h4>
                <span className="text-[10px] text-[#949BA4] mt-0.5 truncate max-w-full">
                  {tool.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
