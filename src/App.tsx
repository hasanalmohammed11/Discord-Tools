import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { StartIoBanner } from './components/StartIoBanner';
import { HomeView } from './components/HomeView';
import { FileCenter } from './components/FileCenter';
import { ToolsHub } from './components/Tools/ToolsHub';
import { BotsDirectory } from './components/BotsDirectory';
import { SettingsView } from './components/SettingsView';
import { Language, ThemeMode } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeToolId, setActiveToolId] = useState<string>('timestamp');
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Sync RTL / LTR document direction with language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync Dark / Light theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const handleNavigate = (tab: TabType, toolId?: string) => {
    setActiveTab(tab);
    if (toolId) {
      setActiveToolId(toolId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#1E1F22] text-[#F2F3F5]' : 'bg-[#F2F3F5] text-[#2B2D31]'}`}>
      {/* Top Header Navbar */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 pb-36">
        {activeTab === 'home' && (
          <HomeView
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'files' && (
          <FileCenter
            language={language}
            onUploadStateChange={setIsUploading}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsHub
            language={language}
            initialTool={activeToolId}
          />
        )}

        {activeTab === 'bots' && (
          <BotsDirectory
            language={language}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            language={language}
            theme={theme}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
          />
        )}
      </main>

      {/* Bottom Floating Area: Start.io Ad Banner + Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col pointer-events-none">
        {/* Banner ad container (clickable) - automatically hidden when isUploading === true */}
        <div className="pointer-events-auto">
          <StartIoBanner isUploading={isUploading} />
        </div>

        {/* Bottom Nav (clickable) */}
        <div className="pointer-events-auto relative">
          <BottomNav
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
