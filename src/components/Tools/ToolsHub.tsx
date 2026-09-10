import React, { useState } from 'react';
import { Clock, Layers, ShieldCheck, MessageSquare, Palette, Wrench } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../services/localization';
import { TimestampGenerator } from './TimestampGenerator';
import { EmbedBuilder } from './EmbedBuilder';
import { PermissionsCalculator } from './PermissionsCalculator';
import { WebhookBuilder } from './WebhookBuilder';
import { ColorGenerator } from './ColorGenerator';

interface ToolsHubProps {
  language: Language;
  initialTool?: string;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ language, initialTool = 'timestamp' }) => {
  const t = translations[language];
  const [activeTool, setActiveTool] = useState<string>(initialTool);

  const toolsList = [
    { id: 'timestamp', label: t.toolTimestamp, icon: Clock },
    { id: 'embed', label: t.toolEmbed, icon: Layers },
    { id: 'permissions', label: t.toolPermissions, icon: ShieldCheck },
    { id: 'webhook', label: t.toolWebhook, icon: MessageSquare },
    { id: 'color', label: t.toolColor, icon: Palette },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tools Segmented Switcher */}
      <div className="bg-[#2B2D31] p-1.5 rounded-2xl border border-[#383A40] shadow-md flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {toolsList.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30 scale-100'
                  : 'text-[#949BA4] hover:text-white hover:bg-[#313338]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tool Body */}
      <div>
        {activeTool === 'timestamp' && <TimestampGenerator language={language} />}
        {activeTool === 'embed' && <EmbedBuilder language={language} />}
        {activeTool === 'permissions' && <PermissionsCalculator language={language} />}
        {activeTool === 'webhook' && <WebhookBuilder language={language} />}
        {activeTool === 'color' && <ColorGenerator language={language} />}
      </div>
    </div>
  );
};
