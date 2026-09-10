import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, ExternalLink, RefreshCw, KeyRound } from 'lucide-react';
import { Language, PermissionBit } from '../../types';
import { translations } from '../../services/localization';

interface PermissionsCalculatorProps {
  language: Language;
}

const ALL_PERMISSIONS: PermissionBit[] = [
  // General
  { id: 'ADMINISTRATOR', nameEn: 'Administrator', nameAr: 'مدير كامل (Administrator)', descriptionEn: 'Bypasses all channel permissions', descriptionAr: 'تجاوز جميع صلاحيات الرومات والأدوار', value: 8n, category: 'general' },
  { id: 'VIEW_AUDIT_LOG', nameEn: 'View Audit Log', nameAr: 'عرض سجل النشاط (Audit Log)', descriptionEn: 'View server audit logs', descriptionAr: 'الاطلاع على سجلات إشراف السيرفر', value: 128n, category: 'general' },
  { id: 'MANAGE_SERVER', nameEn: 'Manage Server', nameAr: 'إدارة السيرفر', descriptionEn: 'Change server name, icon, etc.', descriptionAr: 'تغيير إعدادات واسم السيرفر', value: 32n, category: 'general' },
  { id: 'MANAGE_ROLES', nameEn: 'Manage Roles', nameAr: 'إدارة الرتب والأدوار', descriptionEn: 'Create and edit lower roles', descriptionAr: 'إنشاء وتعديل رتب الأعضاء', value: 268435456n, category: 'general' },
  { id: 'MANAGE_CHANNELS', nameEn: 'Manage Channels', nameAr: 'إدارة القنوات', descriptionEn: 'Create, edit, delete channels', descriptionAr: 'إنشاء وتعديل وحذف الرومات', value: 16n, category: 'general' },
  { id: 'KICK_MEMBERS', nameEn: 'Kick Members', nameAr: 'طرد الأعضاء (Kick)', descriptionEn: 'Remove members from the server', descriptionAr: 'طرد الأعضاء المخالفين', value: 2n, category: 'membership' },
  { id: 'BAN_MEMBERS', nameEn: 'Ban Members', nameAr: 'حظر الأعضاء (Ban)', descriptionEn: 'Permanently ban members', descriptionAr: 'حظر الأعضاء نهائياً من السيرفر', value: 4n, category: 'membership' },
  { id: 'CREATE_INSTANT_INVITE', nameEn: 'Create Invite', nameAr: 'إنشاء دعوة للسيرفر', descriptionEn: 'Create invitation links', descriptionAr: 'توليد روابط دعوة للأعضاء', value: 1n, category: 'general' },
  { id: 'CHANGE_NICKNAME', nameEn: 'Change Nickname', nameAr: 'تغيير الاسم المستعار', descriptionEn: 'Change own server nickname', descriptionAr: 'تعديل اسمه في السيرفر', value: 67108864n, category: 'general' },
  { id: 'MANAGE_NICKNAMES', nameEn: 'Manage Nicknames', nameAr: 'إدارة أسماء الأعضاء', descriptionEn: 'Change other members\' nicknames', descriptionAr: 'تعديل أسماء الآخرين المستعارة', value: 134217728n, category: 'membership' },
  { id: 'MANAGE_EMOJIS_AND_STICKERS', nameEn: 'Manage Emojis', nameAr: 'إدارة الإيموجيات والستيكرات', descriptionEn: 'Upload and delete emojis', descriptionAr: 'إضافة وحذف إيموجيات السيرفر', value: 1073741824n, category: 'general' },
  { id: 'MANAGE_WEBHOOKS', nameEn: 'Manage Webhooks', nameAr: 'إدارة الويب هوك (Webhooks)', descriptionEn: 'Create and edit webhooks', descriptionAr: 'إنشاء وتعديل روابط الويب هوك', value: 536870912n, category: 'general' },
  { id: 'VIEW_CHANNEL', nameEn: 'View Channels', nameAr: 'رؤية القنوات (قراءة الرسائل)', descriptionEn: 'Read messages and view channels', descriptionAr: 'مشاهدة قنوات السيرفر والرسائل', value: 1024n, category: 'general' },

  // Text
  { id: 'SEND_MESSAGES', nameEn: 'Send Messages', nameAr: 'إرسال الرسائل', descriptionEn: 'Post messages in text channels', descriptionAr: 'الكتابة في الرومات النصية', value: 2048n, category: 'text' },
  { id: 'SEND_TTS_MESSAGES', nameEn: 'Send TTS Messages', nameAr: 'إرسال رسائل صوتية TTS', descriptionEn: 'Send text-to-speech messages', descriptionAr: 'نطق الرسائل صوتياً', value: 4096n, category: 'text' },
  { id: 'MANAGE_MESSAGES', nameEn: 'Manage Messages', nameAr: 'إدارة الرسائل (حذف وتثبيت)', descriptionEn: 'Delete messages from others', descriptionAr: 'حذف وتثبيت رسائل الأعضاء', value: 8192n, category: 'text' },
  { id: 'EMBED_LINKS', nameEn: 'Embed Links', nameAr: 'تضمين الروابط (Embeds)', descriptionEn: 'Post embeds with preview cards', descriptionAr: 'إظهار بطاقات الروابط والـ Embeds', value: 16384n, category: 'text' },
  { id: 'ATTACH_FILES', nameEn: 'Attach Files', nameAr: 'إرفاق الملفات والصور', descriptionEn: 'Upload files and photos', descriptionAr: 'رفع ومشاركة الصور والملفات', value: 32768n, category: 'text' },
  { id: 'READ_MESSAGE_HISTORY', nameEn: 'Read Message History', nameAr: 'قراءة سجل المحادثة السابق', descriptionEn: 'Read older messages', descriptionAr: 'الاطلاع على الرسائل القديمة', value: 65536n, category: 'text' },
  { id: 'MENTION_EVERYONE', nameEn: 'Mention @everyone', nameAr: 'منشن الكل (@everyone)', descriptionEn: 'Notify all server members', descriptionAr: 'إرسال تنبيه جماعي للجميع', value: 131072n, category: 'text' },
  { id: 'USE_EXTERNAL_EMOJIS', nameEn: 'Use External Emojis', nameAr: 'استخدام إيموجيات خارجية', descriptionEn: 'Use emojis from other servers', descriptionAr: 'استعمال إيموجي من سيرفرات أخرى', value: 262144n, category: 'text' },
  { id: 'ADD_REACTIONS', nameEn: 'Add Reactions', nameAr: 'إضافة تفاعلات (Reactions)', descriptionEn: 'React with emojis on messages', descriptionAr: 'التفاعل بالإيموجي على الرسائل', value: 64n, category: 'text' },

  // Voice
  { id: 'CONNECT', nameEn: 'Connect to Voice', nameAr: 'الانضمام للرومات الصوتية', descriptionEn: 'Join voice channels', descriptionAr: 'الدخول للقنوات الصوتية', value: 1048576n, category: 'voice' },
  { id: 'SPEAK', nameEn: 'Speak in Voice', nameAr: 'التحدث في الروم الصوتي', descriptionEn: 'Talk in voice channels', descriptionAr: 'الكلام والتحدث بالميكروفون', value: 2097152n, category: 'voice' },
  { id: 'MUTE_MEMBERS', nameEn: 'Mute Members', nameAr: 'كتم صوت الأعضاء', descriptionEn: 'Mute members in voice', descriptionAr: 'إسكات ميكروفون الآخرين', value: 4194304n, category: 'voice' },
  { id: 'DEAFEN_MEMBERS', nameEn: 'Deafen Members', nameAr: 'تعطيل سماع الأعضاء', descriptionEn: 'Deafen members in voice', descriptionAr: 'تعطيل سماعة الآخرين', value: 8388608n, category: 'voice' },
  { id: 'MOVE_MEMBERS', nameEn: 'Move Members', nameAr: 'نقل الأعضاء بين الرومات', descriptionEn: 'Move members between channels', descriptionAr: 'سحب ونقل الأعضاء', value: 16777216n, category: 'voice' },
  { id: 'USE_VAD', nameEn: 'Use Voice Activity', nameAr: 'استخدام التحسس التلقائي للصوت', descriptionEn: 'Talk without Push-to-Talk', descriptionAr: 'التحدث بدون زر الضغط', value: 33554432n, category: 'voice' },
  { id: 'PRIORITY_SPEAKER', nameEn: 'Priority Speaker', nameAr: 'المتحدث ذو الأولوية', descriptionEn: 'Lower others\' volume when speaking', descriptionAr: 'خفض صوت الآخرين تلقائياً عند التحدث', value: 256n, category: 'voice' },
  { id: 'STREAM', nameEn: 'Video / Screen Share', nameAr: 'مشاركة الشاشة والبث', descriptionEn: 'Broadcast video and screens', descriptionAr: 'بث الشاشة والكاميرا في الروم', value: 512n, category: 'voice' },
];

export const PermissionsCalculator: React.FC<PermissionsCalculatorProps> = ({ language }) => {
  const t = translations[language];

  const [selectedFlags, setSelectedFlags] = useState<Set<string>>(new Set(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES']));
  const [clientId, setClientId] = useState<string>('123456789012345678');
  const [copiedPerm, setCopiedPerm] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Calculate permission bitmask using BigInt
  const calculateBitmask = (): bigint => {
    let sum = 0n;
    for (const p of ALL_PERMISSIONS) {
      if (selectedFlags.has(p.id)) {
        sum |= p.value;
      }
    }
    return sum;
  };

  const bitmask = calculateBitmask();
  const bitmaskStr = bitmask.toString();
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId || 'CLIENT_ID'}&scope=bot&permissions=${bitmaskStr}`;

  const toggleFlag = (id: string) => {
    const next = new Set(selectedFlags);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedFlags(next);
  };

  const selectAll = () => {
    setSelectedFlags(new Set(ALL_PERMISSIONS.map(p => p.id)));
  };

  const clearAll = () => {
    setSelectedFlags(new Set());
  };

  const applyAdminPreset = () => {
    setSelectedFlags(new Set(['ADMINISTRATOR']));
  };

  const applyModPreset = () => {
    setSelectedFlags(new Set([
      'VIEW_AUDIT_LOG', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'KICK_MEMBERS', 'BAN_MEMBERS',
      'MANAGE_MESSAGES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES',
      'READ_MESSAGE_HISTORY', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS'
    ]));
  };

  const applyStandardPreset = () => {
    setSelectedFlags(new Set([
      'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES',
      'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'CONNECT', 'SPEAK', 'USE_VAD'
    ]));
  };

  const copyPerm = () => {
    navigator.clipboard.writeText(bitmaskStr);
    setCopiedPerm(true);
    setTimeout(() => setCopiedPerm(false), 2000);
  };

  const copyInvite = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">
            {t.toolPermissions}
          </h2>
          <p className="text-xs text-[#949BA4]">
            {t.permDesc}
          </p>
        </div>
      </div>

      {/* Bitmask Result Card */}
      <div className="p-4 rounded-xl bg-[#1E1F22] border border-[#383A40] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#949BA4] block font-semibold">{t.permTotalValue}</span>
            <span className="text-2xl font-mono font-extrabold text-[#57F287] tracking-wider">
              {bitmaskStr}
            </span>
          </div>

          <button
            onClick={copyPerm}
            className="px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#5865F2]/25"
          >
            {copiedPerm ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPerm ? t.copiedSuccess : t.copyPermValue}</span>
          </button>
        </div>

        {/* Invite Link Generator */}
        <div className="pt-3 border-t border-[#313338] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#949BA4] font-bold">{t.clientIdLabel}</span>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Application ID"
              className="bg-[#2B2D31] text-xs font-mono text-white px-3 py-1 rounded-lg border border-[#3F4147] outline-none w-48"
            />
          </div>

          <div className="p-2.5 rounded-lg bg-[#2B2D31] border border-[#3F4147] flex items-center justify-between gap-2">
            <input
              type="text"
              readOnly
              value={inviteUrl}
              className="bg-transparent text-xs font-mono text-[#5865F2] flex-1 outline-none truncate"
            />
            <button
              onClick={copyInvite}
              className="p-1.5 rounded-md bg-[#1E1F22] text-white hover:bg-[#383A40]"
              title={t.copyInviteUrl}
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#57F287]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={applyAdminPreset}
          className="px-3 py-1.5 rounded-lg bg-[#ED4245]/15 hover:bg-[#ED4245]/25 text-[#ED4245] border border-[#ED4245]/30 text-xs font-bold"
        >
          {t.permPresetAdmin}
        </button>
        <button
          onClick={applyModPreset}
          className="px-3 py-1.5 rounded-lg bg-[#5865F2]/15 hover:bg-[#5865F2]/25 text-[#5865F2] border border-[#5865F2]/30 text-xs font-bold"
        >
          {t.permPresetMod}
        </button>
        <button
          onClick={applyStandardPreset}
          className="px-3 py-1.5 rounded-lg bg-[#57F287]/15 hover:bg-[#57F287]/25 text-[#57F287] border border-[#57F287]/30 text-xs font-bold"
        >
          {t.permPresetStandard}
        </button>
        <div className="h-4 w-[1px] bg-[#3F4147] mx-1" />
        <button
          onClick={selectAll}
          className="px-3 py-1.5 rounded-lg bg-[#313338] hover:bg-[#383A40] text-white text-xs font-semibold"
        >
          {t.permSelectAll}
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1.5 rounded-lg bg-[#313338] hover:bg-[#383A40] text-[#949BA4] hover:text-white text-xs font-semibold"
        >
          {t.permClearAll}
        </button>
      </div>

      {/* Permissions List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
        {ALL_PERMISSIONS.map((perm) => {
          const isChecked = selectedFlags.has(perm.id);
          return (
            <label
              key={perm.id}
              onClick={() => toggleFlag(perm.id)}
              className={`p-3 rounded-xl border text-left rtl:text-right cursor-pointer select-none transition-all flex items-start gap-3 ${
                isChecked
                  ? 'bg-[#5865F2]/15 border-[#5865F2] text-white shadow-sm'
                  : 'bg-[#1E1F22] border-[#383A40] text-[#949BA4] hover:border-[#3F4147]'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="mt-1 accent-[#5865F2] rounded cursor-pointer"
              />
              <div className="min-w-0 flex-1">
                <span className="font-bold text-xs text-white block">
                  {language === 'ar' ? perm.nameAr : perm.nameEn}
                </span>
                <span className="text-[10px] text-[#949BA4] block mt-0.5 line-clamp-1">
                  {language === 'ar' ? perm.descriptionAr : perm.descriptionEn}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
