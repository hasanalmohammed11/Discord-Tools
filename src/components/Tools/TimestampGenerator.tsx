import React, { useState } from 'react';
import { Clock, Copy, Check, Calendar, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../services/localization';

interface TimestampGeneratorProps {
  language: Language;
}

export const TimestampGenerator: React.FC<TimestampGeneratorProps> = ({ language }) => {
  const t = translations[language];

  // Current date time formatted as YYYY-MM-DDTHH:mm
  const getNowIso = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [dateTimeStr, setDateTimeStr] = useState<string>(getNowIso());
  const [formatCode, setFormatCode] = useState<string>('f');
  const [copied, setCopied] = useState(false);

  // Compute Unix timestamp in seconds
  const dateObj = new Date(dateTimeStr);
  const unixSeconds = Math.floor(dateObj.getTime() / 1000) || Math.floor(Date.now() / 1000);

  const formatStyles = [
    { code: '', labelEn: 'Default', labelAr: 'الافتراضي', example: '<t:TIMESTAMP>' },
    { code: 't', labelEn: 'Short Time', labelAr: 'وقت قصير', example: '16:20' },
    { code: 'T', labelEn: 'Long Time', labelAr: 'وقت كامل', example: '16:20:30' },
    { code: 'd', labelEn: 'Short Date', labelAr: 'تاريخ مختصر', example: '10/09/2026' },
    { code: 'D', labelEn: 'Long Date', labelAr: 'تاريخ كامل', example: '10 September 2026' },
    { code: 'f', labelEn: 'Long Date + Short Time', labelAr: 'تاريخ مع وقت (شائع)', example: '10 September 2026 16:20' },
    { code: 'F', labelEn: 'Full Date with Day', labelAr: 'تاريخ مع اليوم والوقت', example: 'Thursday, 10 September 2026 16:20' },
    { code: 'R', labelEn: 'Relative Time', labelAr: 'توقيت نسبي (منذ / بعد)', example: 'in 2 hours / 3 days ago' },
  ];

  // Discord code
  const discordCode = formatCode ? `<t:${unixSeconds}:${formatCode}>` : `<t:${unixSeconds}>`;

  // Live preview formatting
  const getPreviewString = () => {
    if (isNaN(dateObj.getTime())) return 'Invalid Date';
    try {
      if (formatCode === 't') {
        return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (formatCode === 'T') {
        return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      if (formatCode === 'd') {
        return dateObj.toLocaleDateString();
      }
      if (formatCode === 'D') {
        return dateObj.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
      }
      if (formatCode === 'f') {
        return `${dateObj.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })} ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      if (formatCode === 'F') {
        return dateObj.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      }
      if (formatCode === 'R') {
        const diffSec = unixSeconds - Math.floor(Date.now() / 1000);
        if (Math.abs(diffSec) < 60) return language === 'ar' ? 'الآن' : 'just now';
        const diffMin = Math.round(diffSec / 60);
        if (Math.abs(diffMin) < 60) {
          return diffMin > 0 
            ? (language === 'ar' ? `خلال ${diffMin} دقيقة` : `in ${diffMin} minutes`)
            : (language === 'ar' ? `منذ ${Math.abs(diffMin)} دقيقة` : `${Math.abs(diffMin)} minutes ago`);
        }
        const diffHours = Math.round(diffMin / 60);
        if (Math.abs(diffHours) < 24) {
          return diffHours > 0
            ? (language === 'ar' ? `خلال ${diffHours} ساعة` : `in ${diffHours} hours`)
            : (language === 'ar' ? `منذ ${Math.abs(diffHours)} ساعة` : `${Math.abs(diffHours)} hours ago`);
        }
        const diffDays = Math.round(diffHours / 24);
        return diffDays > 0
          ? (language === 'ar' ? `خلال ${diffDays} يوم` : `in ${diffDays} days`)
          : (language === 'ar' ? `منذ ${Math.abs(diffDays)} يوم` : `${Math.abs(diffDays)} days ago`);
      }
      return dateObj.toLocaleString();
    } catch {
      return dateObj.toLocaleString();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(discordCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">
            {t.toolTimestamp}
          </h2>
          <p className="text-xs text-[#949BA4]">
            {t.timestampDesc}
          </p>
        </div>
      </div>

      {/* Date & Time Picker */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#949BA4]">
          <span>{t.selectDate} & {t.selectTime}</span>
          <button
            onClick={() => setDateTimeStr(getNowIso())}
            className="text-[#5865F2] hover:underline font-semibold"
          >
            {t.nowBtn}
          </button>
        </div>
        <div className="relative">
          <input
            type="datetime-local"
            value={dateTimeStr}
            onChange={(e) => setDateTimeStr(e.target.value)}
            className="w-full bg-[#1E1F22] text-sm text-white px-4 py-2.5 rounded-xl border border-[#3F4147] focus:border-[#5865F2] outline-none transition-all font-mono"
          />
        </div>
      </div>

      {/* Styles Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#949BA4] block">
          {t.displayStyle}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {formatStyles.map((style) => {
            const isSelected = formatCode === style.code;
            return (
              <button
                key={style.code}
                onClick={() => setFormatCode(style.code)}
                className={`p-3 rounded-xl text-left rtl:text-right border transition-all ${
                  isSelected
                    ? 'border-[#5865F2] bg-[#5865F2]/15 text-white shadow-sm'
                    : 'border-[#383A40] bg-[#1E1F22] text-[#949BA4] hover:text-white hover:border-[#3F4147]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {language === 'ar' ? style.labelAr : style.labelEn}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#313338] text-[#5865F2]">
                    {style.code ? `:${style.code}` : 'default'}
                  </span>
                </div>
                <span className="text-[11px] text-[#949BA4] mt-1 block truncate">
                  {style.example}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Discord Message Preview */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#949BA4] block">
          {t.previewText}
        </label>
        <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#383A40] flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            DT
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Discord Member</span>
              <span className="text-[10px] text-[#949BA4]">Today at 12:00</span>
            </div>
            <div className="text-xs text-[#DBDEE1] mt-1 flex items-center gap-1.5 flex-wrap">
              <span>Event starting at:</span>
              <span className="px-1.5 py-0.5 rounded bg-[#2B2D31] text-white font-medium border border-[#383A40] select-all">
                {getPreviewString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code & Copy Button */}
      <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#3F4147] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[11px] text-[#949BA4] block">{t.generatedCode}</span>
          <span className="text-sm font-mono text-[#57F287] font-bold select-all">
            {discordCode}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="px-4 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#5865F2]/25 transition-all flex-shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t.copiedSuccess : t.copyTimestamp}</span>
        </button>
      </div>
    </div>
  );
};
