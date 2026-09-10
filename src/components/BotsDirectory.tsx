import React, { useState } from 'react';
import { Search, Bot, ExternalLink, Info, Shield, Music, Wrench, Sparkles, DollarSign, X } from 'lucide-react';
import { DiscordBot, Language } from '../types';
import { translations } from '../services/localization';
import { DEFAULT_BOTS } from '../services/supabase';

interface BotsDirectoryProps {
  language: Language;
}

export const BotsDirectory: React.FC<BotsDirectoryProps> = ({ language }) => {
  const t = translations[language];

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBotModal, setActiveBotModal] = useState<DiscordBot | null>(null);

  const categories = [
    { id: 'All', label: t.categoryAll, icon: Bot },
    { id: 'Moderation', label: t.catModeration, icon: Shield },
    { id: 'Music', label: t.catMusic, icon: Music },
    { id: 'Security', label: t.catSecurity, icon: Shield },
    { id: 'Utility', label: t.catUtility, icon: Wrench },
    { id: 'Fun', label: t.catFun, icon: Sparkles },
    { id: 'Economy', label: t.catEconomy, icon: DollarSign },
  ];

  // Filter bots
  const filteredBots = DEFAULT_BOTS.filter((bot) => {
    const matchesCategory = selectedCategory === 'All' || bot.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const desc = bot.description[language].toLowerCase();
    const name = bot.name.toLowerCase();
    const matchesSearch = !query || name.includes(query) || desc.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {t.botsTitle}
            </h1>
            <p className="text-xs text-[#949BA4]">
              {t.botsSubtitle}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-[#949BA4] absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchBotsPlaceholder}
            className="w-full bg-[#1E1F22] text-sm text-white placeholder-[#949BA4] pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl border border-[#3F4147] focus:border-[#5865F2] outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-3 text-[#949BA4] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30 scale-105'
                  : 'bg-[#2B2D31] text-[#949BA4] hover:text-white hover:bg-[#313338] border border-[#383A40]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bots Grid */}
      {filteredBots.length === 0 ? (
        <div className="bg-[#2B2D31] rounded-2xl p-10 text-center text-[#949BA4] border border-[#383A40]">
          <Bot className="w-12 h-12 mx-auto text-[#949BA4]/50 mb-3" />
          <p className="text-sm font-semibold">{t.noBotsFound}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredBots.map((bot) => (
            <div
              key={bot.id}
              className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] hover:border-[#5865F2]/50 transition-all duration-200 shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Top Info */}
                <div className="flex items-start gap-3.5 mb-3">
                  <img
                    src={bot.icon_url}
                    alt={bot.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#3F4147] bg-[#1E1F22] flex-shrink-0 shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-base text-white truncate">
                        {bot.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#5865F2]/15 text-[#5865F2] border border-[#5865F2]/30">
                        {bot.category}
                      </span>
                    </div>
                    {bot.prefix && (
                      <span className="text-[11px] font-mono text-[#949BA4] mt-0.5 block">
                        Prefix: <strong className="text-white">{bot.prefix}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#949BA4] line-clamp-3 leading-relaxed mb-4">
                  {bot.description[language]}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#383A40]">
                <button
                  onClick={() => setActiveBotModal(bot)}
                  className="py-2 px-3 rounded-xl bg-[#313338] hover:bg-[#383A40] text-[#F2F3F5] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#3F4147] transition-all"
                >
                  <Info className="w-3.5 h-3.5 text-[#5865F2]" />
                  <span>{t.botDetails}</span>
                </button>

                <a
                  href={bot.invite_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#5865F2]/25 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.inviteBot}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bot Details Modal */}
      {activeBotModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#2B2D31] rounded-2xl max-w-md w-full p-6 border border-[#3F4147] shadow-2xl space-y-5 animate-scale-up">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#383A40]">
              <div className="flex items-center gap-3">
                <img
                  src={activeBotModal.icon_url}
                  alt={activeBotModal.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#3F4147]"
                />
                <div>
                  <h3 className="font-extrabold text-lg text-white">
                    {activeBotModal.name}
                  </h3>
                  <span className="text-xs text-[#5865F2] font-semibold">
                    {activeBotModal.category} • {activeBotModal.developer}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveBotModal(null)}
                className="text-[#949BA4] hover:text-white text-xs font-bold p-1 bg-[#1E1F22] rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-[#949BA4] block mb-1">
                الوصف:
              </label>
              <p className="text-xs text-white leading-relaxed">
                {activeBotModal.description[language]}
              </p>
            </div>

            {/* Features */}
            {activeBotModal.features && (
              <div>
                <label className="text-xs font-bold text-[#949BA4] block mb-1.5">
                  {t.features}
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {activeBotModal.features[language].map((f, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-[#1E1F22] border border-[#383A40] text-xs text-[#F2F3F5] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#57F287]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setActiveBotModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#313338] text-white text-xs font-semibold hover:bg-[#383A40]"
              >
                {t.closeDetails}
              </button>
              <a
                href={activeBotModal.invite_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-[#5865F2]/30"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.inviteBot}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
