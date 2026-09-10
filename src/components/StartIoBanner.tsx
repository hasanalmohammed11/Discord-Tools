import React, { useState } from 'react';
import { Sparkles, X, ExternalLink } from 'lucide-react';

interface StartIoBannerProps {
  isUploading: boolean;
}

export const StartIoBanner: React.FC<StartIoBannerProps> = ({ isUploading }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Requirement: Do NOT show ad during file upload!
  if (isUploading || isDismissed) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-1.5 transition-all">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2B2D31] via-[#313338] to-[#2B2D31] border border-[#3F4147]/70 p-2.5 flex items-center justify-between shadow-md">
        {/* Ad Tag & Visual */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/40 flex items-center justify-center text-[#5865F2] flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#383A40] text-[#949BA4] border border-[#3F4147]">
                Start.io Ad • 208250285
              </span>
              <span className="text-xs font-bold text-white">
                Level Up Your Discord Server
              </span>
            </div>
            <p className="text-[11px] text-[#949BA4] line-clamp-1">
              Explore powerful Discord integrations, custom emojis, and community perks.
            </p>
          </div>
        </div>

        {/* Action / Dismiss */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-xs font-bold text-[#5865F2] hover:text-white hover:bg-[#5865F2] rounded-md transition-colors flex items-center gap-1"
          >
            <span>Learn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded text-[#949BA4] hover:text-white hover:bg-[#383A40] transition-colors"
            title="Dismiss ad"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
