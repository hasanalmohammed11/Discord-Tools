import React from 'react';
import { Home, FolderUp, Wrench, Bot, Settings } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../services/localization';

export type TabType = 'home' | 'files' | 'tools' | 'bots' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  language,
}) => {
  const t = translations[language];

  const navItems = [
    { id: 'home' as TabType, label: t.navHome, icon: Home },
    { id: 'files' as TabType, label: t.navFiles, icon: FolderUp },
    { id: 'tools' as TabType, label: t.navTools, icon: Wrench },
    { id: 'bots' as TabType, label: t.navBots, icon: Bot },
    { id: 'settings' as TabType, label: t.navSettings, icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1E1F22]/95 backdrop-blur-md border-t border-[#313338] px-2 py-1 pb-[max(env(safe-area-inset-bottom),0.35rem)] shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 min-h-[48px] ${
                isActive
                  ? 'text-[#5865F2] font-bold bg-[#5865F2]/15 shadow-inner'
                  : 'text-[#949BA4] hover:text-[#F2F3F5] hover:bg-[#2B2D31]/60'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-[#5865F2]' : ''
                }`}
              />
              <span className="text-[11px] mt-1 truncate max-w-full tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
