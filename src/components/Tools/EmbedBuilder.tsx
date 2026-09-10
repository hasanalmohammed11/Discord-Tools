import React, { useState } from 'react';
import { Layers, Copy, Check, Plus, Trash2, Image, Link, Sparkles } from 'lucide-react';
import { EmbedData, EmbedField, Language } from '../../types';
import { translations } from '../../services/localization';

interface EmbedBuilderProps {
  language: Language;
}

export const EmbedBuilder: React.FC<EmbedBuilderProps> = ({ language }) => {
  const t = translations[language];

  const [embed, setEmbed] = useState<EmbedData>({
    title: 'Announcement: Community Tournament!',
    description: 'Welcome to our official server event! Check out the details below and join the voice channel.',
    url: 'https://discord.com',
    color: '#5865F2',
    authorName: 'Server Event Team',
    authorIconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    authorUrl: '',
    footerText: 'Discord Tools Hub • Powered by Community',
    footerIconUrl: '',
    imageUrl: '',
    thumbnailUrl: '',
    timestamp: true,
    fields: [
      { id: '1', name: '🏆 Grand Prize', value: 'Discord Nitro + VIP Role', inline: true },
      { id: '2', name: '⏰ Start Time', value: 'Today at 8:00 PM UTC', inline: true },
      { id: '3', name: '📜 Rules', value: 'Be respectful and follow server guidelines.', inline: false },
    ],
  });

  const [copied, setCopied] = useState(false);

  // Convert hex color to Discord decimal integer
  const colorToDecimal = (hex: string): number => {
    const cleanHex = hex.replace('#', '');
    return parseInt(cleanHex, 16) || 0;
  };

  // Generate Discord API compliant Embed JSON
  const getEmbedJson = () => {
    const json: any = {
      title: embed.title || undefined,
      description: embed.description || undefined,
      url: embed.url || undefined,
      color: colorToDecimal(embed.color),
    };

    if (embed.authorName) {
      json.author = {
        name: embed.authorName,
        icon_url: embed.authorIconUrl || undefined,
        url: embed.authorUrl || undefined,
      };
    }

    if (embed.footerText) {
      json.footer = {
        text: embed.footerText,
        icon_url: embed.footerIconUrl || undefined,
      };
    }

    if (embed.imageUrl) {
      json.image = { url: embed.imageUrl };
    }

    if (embed.thumbnailUrl) {
      json.thumbnail = { url: embed.thumbnailUrl };
    }

    if (embed.timestamp) {
      json.timestamp = new Date().toISOString();
    }

    if (embed.fields.length > 0) {
      json.fields = embed.fields.map(f => ({
        name: f.name,
        value: f.value,
        inline: f.inline,
      }));
    }

    return JSON.stringify({ embeds: [json] }, null, 2);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(getEmbedJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addField = () => {
    const newField: EmbedField = {
      id: Date.now().toString(),
      name: 'New Field',
      value: 'Field value goes here',
      inline: true,
    };
    setEmbed({ ...embed, fields: [...embed.fields, newField] });
  };

  const updateField = (id: string, key: keyof EmbedField, value: any) => {
    setEmbed({
      ...embed,
      fields: embed.fields.map(f => f.id === id ? { ...f, [key]: value } : f)
    });
  };

  const removeField = (id: string) => {
    setEmbed({
      ...embed,
      fields: embed.fields.filter(f => f.id !== id)
    });
  };

  const colorPresets = ['#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245', '#9B59B6', '#1ABC9C', '#34495E'];

  return (
    <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {t.toolEmbed}
            </h2>
            <p className="text-xs text-[#949BA4]">
              {t.embedDesc}
            </p>
          </div>
        </div>

        <button
          onClick={copyJson}
          className="px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#5865F2]/25"
        >
          {copied ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t.copiedSuccess : t.copyEmbedJson}</span>
        </button>
      </div>

      {/* Grid: Editor Left/Top, Preview Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="space-y-4">
          {/* Title & URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#949BA4] block">
              {t.embedTitle}
            </label>
            <input
              type="text"
              value={embed.title}
              onChange={(e) => setEmbed({ ...embed, title: e.target.value })}
              className="w-full bg-[#1E1F22] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#3F4147] focus:border-[#5865F2] outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#949BA4] block">
              {t.embedDescLabel}
            </label>
            <textarea
              rows={3}
              value={embed.description}
              onChange={(e) => setEmbed({ ...embed, description: e.target.value })}
              className="w-full bg-[#1E1F22] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#3F4147] focus:border-[#5865F2] outline-none"
            />
          </div>

          {/* Color Chooser */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#949BA4] block">
              {t.embedColor} ({embed.color})
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="color"
                value={embed.color}
                onChange={(e) => setEmbed({ ...embed, color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none"
              />
              {colorPresets.map(preset => (
                <button
                  key={preset}
                  onClick={() => setEmbed({ ...embed, color: preset })}
                  className="w-6 h-6 rounded-full border border-white/20 transition-transform hover:scale-110"
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#949BA4] block">{t.authorName}</label>
              <input
                type="text"
                value={embed.authorName}
                onChange={(e) => setEmbed({ ...embed, authorName: e.target.value })}
                className="w-full bg-[#1E1F22] text-xs text-white px-3 py-2 rounded-xl border border-[#3F4147] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#949BA4] block">{t.authorIcon}</label>
              <input
                type="text"
                placeholder="https://..."
                value={embed.authorIconUrl}
                onChange={(e) => setEmbed({ ...embed, authorIconUrl: e.target.value })}
                className="w-full bg-[#1E1F22] text-xs text-white px-3 py-2 rounded-xl border border-[#3F4147] outline-none"
              />
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-2 pt-2 border-t border-[#383A40]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{t.fieldsSection}</span>
              <button
                onClick={addField}
                className="text-xs font-bold text-[#5865F2] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addField}</span>
              </button>
            </div>

            {embed.fields.map((field) => (
              <div key={field.id} className="p-3 rounded-xl bg-[#1E1F22] border border-[#383A40] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={field.name}
                    placeholder={t.fieldName}
                    onChange={(e) => updateField(field.id, 'name', e.target.value)}
                    className="flex-1 bg-[#2B2D31] text-xs text-white px-2.5 py-1.5 rounded-lg border border-[#3F4147] outline-none"
                  />
                  <button
                    onClick={() => removeField(field.id)}
                    className="text-[#949BA4] hover:text-[#ED4245] p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={field.value}
                  placeholder={t.fieldValue}
                  onChange={(e) => updateField(field.id, 'value', e.target.value)}
                  className="w-full bg-[#2B2D31] text-xs text-white px-2.5 py-1.5 rounded-lg border border-[#3F4147] outline-none"
                />
                <label className="flex items-center gap-2 text-[11px] text-[#949BA4] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.inline}
                    onChange={(e) => updateField(field.id, 'inline', e.target.checked)}
                    className="accent-[#5865F2] rounded"
                  />
                  <span>{t.inlineToggle}</span>
                </label>
              </div>
            ))}
          </div>

          {/* Footer & Timestamp */}
          <div className="space-y-2 pt-2 border-t border-[#383A40]">
            <label className="text-xs font-bold text-[#949BA4] block">{t.footerText}</label>
            <input
              type="text"
              value={embed.footerText}
              onChange={(e) => setEmbed({ ...embed, footerText: e.target.value })}
              className="w-full bg-[#1E1F22] text-xs text-white px-3 py-2 rounded-xl border border-[#3F4147] outline-none"
            />
            <label className="flex items-center gap-2 text-xs text-[#949BA4] cursor-pointer">
              <input
                type="checkbox"
                checked={embed.timestamp}
                onChange={(e) => setEmbed({ ...embed, timestamp: e.target.checked })}
                className="accent-[#5865F2] rounded"
              />
              <span>{t.includeTimestamp}</span>
            </label>
          </div>
        </div>

        {/* Live Discord Embed Preview */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#949BA4] block">
            {t.embedLivePreview}
          </label>

          <div className="bg-[#1E1F22] p-4 rounded-2xl border border-[#383A40] shadow-inner">
            {/* Embed Container with Left Color Line */}
            <div
              className="rounded-lg bg-[#2B2D31] p-4 text-xs space-y-3 shadow-md border-l-4 rtl:border-l-0 rtl:border-r-4"
              style={{
                borderColor: embed.color,
                borderLeftColor: embed.color,
                borderRightColor: embed.color
              }}
            >
              {/* Author */}
              {embed.authorName && (
                <div className="flex items-center gap-2">
                  {embed.authorIconUrl && (
                    <img
                      src={embed.authorIconUrl}
                      alt="author"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  )}
                  <span className="font-semibold text-white text-xs">
                    {embed.authorName}
                  </span>
                </div>
              )}

              {/* Title */}
              {embed.title && (
                <h4 className="font-bold text-sm text-white hover:underline cursor-pointer">
                  {embed.title}
                </h4>
              )}

              {/* Description */}
              {embed.description && (
                <p className="text-xs text-[#DBDEE1] whitespace-pre-line leading-relaxed">
                  {embed.description}
                </p>
              )}

              {/* Fields Grid */}
              {embed.fields.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {embed.fields.map(field => (
                    <div
                      key={field.id}
                      className={field.inline ? 'col-span-1' : 'col-span-full'}
                    >
                      <span className="font-bold text-white text-[11px] block">
                        {field.name}
                      </span>
                      <span className="text-[#DBDEE1] text-[11px] block mt-0.5">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              {(embed.footerText || embed.timestamp) && (
                <div className="pt-2 border-t border-[#383A40] flex items-center gap-2 text-[10px] text-[#949BA4]">
                  {embed.footerIconUrl && (
                    <img src={embed.footerIconUrl} alt="footer" className="w-4 h-4 rounded-full" />
                  )}
                  <span>{embed.footerText}</span>
                  {embed.footerText && embed.timestamp && <span>•</span>}
                  {embed.timestamp && <span>Today at 12:00</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
