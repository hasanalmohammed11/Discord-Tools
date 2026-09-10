import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../services/localization';

interface ColorGeneratorProps {
  language: Language;
}

export const ColorGenerator: React.FC<ColorGeneratorProps> = ({ language }) => {
  const t = translations[language];

  const [hexColor, setHexColor] = useState<string>('#5865F2');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Convert Hex to RGB
  const hexToRgb = (hex: string) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return { r, g, b };
  };

  // Convert Hex to Discord Decimal (e.g. #5865F2 -> 5793266)
  const hexToDecimal = (hex: string) => {
    const clean = hex.replace('#', '');
    return parseInt(clean, 16) || 0;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(hexColor);
  const decimal = hexToDecimal(hexColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copyValue = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const presets = [
    { name: 'Discord Blurple', hex: '#5865F2' },
    { name: 'Green (Online)', hex: '#57F287' },
    { name: 'Yellow (Idle)', hex: '#FEE75C' },
    { name: 'Fuchsia', hex: '#EB459E' },
    { name: 'Red (DND)', hex: '#ED4245' },
    { name: 'Dark Charcoal', hex: '#2B2D31' },
    { name: 'Nitro Pink', hex: '#FF73FA' },
    { name: 'Pure White', hex: '#FFFFFF' },
  ];

  return (
    <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
          <Palette className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">
            {t.toolColor}
          </h2>
          <p className="text-xs text-[#949BA4]">
            {t.colorDesc}
          </p>
        </div>
      </div>

      {/* Main Color Picker Card */}
      <div className="p-5 rounded-2xl bg-[#1E1F22] border border-[#383A40] flex flex-col sm:flex-row items-center gap-6">
        {/* Big Preview Swatch */}
        <div
          className="w-28 h-28 rounded-2xl shadow-xl ring-2 ring-white/10 flex-shrink-0 transition-all flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: hexColor }}
        >
          <input
            type="color"
            value={hexColor}
            onChange={(e) => setHexColor(e.target.value.toUpperCase())}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            title="Choose Color"
          />
        </div>

        {/* Input and Controls */}
        <div className="flex-1 space-y-3 w-full">
          <div>
            <label className="text-xs font-bold text-[#949BA4] block mb-1">
              اختر اللون أو اكتب رمز HEX:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={hexColor}
                onChange={(e) => setHexColor(e.target.value)}
                className="w-36 bg-[#2B2D31] text-sm text-white font-mono uppercase px-3 py-2 rounded-xl border border-[#3F4147] focus:border-[#5865F2] outline-none"
              />
              <input
                type="color"
                value={hexColor}
                onChange={(e) => setHexColor(e.target.value.toUpperCase())}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-none"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="text-xs font-bold text-[#949BA4] block mb-1.5">
              {t.discordPresets}
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {presets.map((p) => (
                <button
                  key={p.hex}
                  onClick={() => setHexColor(p.hex)}
                  className="w-7 h-7 rounded-xl border border-white/20 transition-transform hover:scale-110 active:scale-95 shadow-sm"
                  style={{ backgroundColor: p.hex }}
                  title={p.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Formats Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* HEX */}
        <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#383A40] flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-[#949BA4] font-bold block">{t.hexLabel}</span>
            <span className="text-sm font-mono font-bold text-white">{hexColor}</span>
          </div>
          <button
            onClick={() => copyValue(hexColor, 'hex')}
            className="p-2 rounded-lg bg-[#2B2D31] hover:bg-[#383A40] text-white transition-colors"
          >
            {copiedKey === 'hex' ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4 text-[#949BA4]" />}
          </button>
        </div>

        {/* Discord Decimal */}
        <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#383A40] flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-[#5865F2] font-bold block">{t.decimalLabel}</span>
            <span className="text-sm font-mono font-bold text-[#57F287]">{decimal}</span>
          </div>
          <button
            onClick={() => copyValue(decimal.toString(), 'decimal')}
            className="p-2 rounded-lg bg-[#2B2D31] hover:bg-[#383A40] text-white transition-colors"
          >
            {copiedKey === 'decimal' ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4 text-[#949BA4]" />}
          </button>
        </div>

        {/* RGB */}
        <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#383A40] flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-[#949BA4] font-bold block">{t.rgbLabel}</span>
            <span className="text-xs font-mono font-bold text-white">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
          </div>
          <button
            onClick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
            className="p-2 rounded-lg bg-[#2B2D31] hover:bg-[#383A40] text-white transition-colors"
          >
            {copiedKey === 'rgb' ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4 text-[#949BA4]" />}
          </button>
        </div>

        {/* HSL */}
        <div className="p-3.5 rounded-xl bg-[#1E1F22] border border-[#383A40] flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-[#949BA4] font-bold block">{t.hslLabel}</span>
            <span className="text-xs font-mono font-bold text-white">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
          </div>
          <button
            onClick={() => copyValue(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
            className="p-2 rounded-lg bg-[#2B2D31] hover:bg-[#383A40] text-white transition-colors"
          >
            {copiedKey === 'hsl' ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4 text-[#949BA4]" />}
          </button>
        </div>
      </div>
    </div>
  );
};
