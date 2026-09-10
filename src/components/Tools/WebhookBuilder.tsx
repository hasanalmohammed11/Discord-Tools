import React, { useState } from 'react';
import { Send, Copy, Check, AlertCircle, Bot, MessageSquare } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../services/localization';

interface WebhookBuilderProps {
  language: Language;
}

export const WebhookBuilder: React.FC<WebhookBuilderProps> = ({ language }) => {
  const t = translations[language];

  const [webhookUrl, setWebhookUrl] = useState('');
  const [username, setUsername] = useState('Discord Tools Bot');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80');
  const [content, setContent] = useState('Hello from Discord Tools Hub! 🚀 All systems are running smoothly.');
  const [attachSampleEmbed, setAttachSampleEmbed] = useState(true);

  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

  const getPayloadJson = () => {
    const payload: any = {
      content: content || undefined,
      username: username || undefined,
      avatar_url: avatarUrl || undefined,
    };

    if (attachSampleEmbed) {
      payload.embeds = [
        {
          title: 'Discord Tools Notification',
          description: 'This is an example embed dispatched via Webhook Builder.',
          color: 5793266, // #5865F2 Blurple
          fields: [
            { name: 'Status', value: 'Online & Verified', inline: true },
            { name: 'Timestamp', value: new Date().toLocaleTimeString(), inline: true }
          ],
          footer: { text: 'Discord Tools Hub' }
        }
      ];
    }

    return JSON.stringify(payload, null, 2);
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(getPayloadJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendTestWebhook = async () => {
    if (!webhookUrl.trim() || !webhookUrl.includes('discord.com/api/webhooks')) {
      setSendResult({
        success: false,
        message: language === 'ar' ? 'يرجى إدخال رابط Discord Webhook صحيح يبدأ بـ discord.com/api/webhooks' : 'Please enter a valid Discord Webhook URL'
      });
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      const response = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: getPayloadJson()
      });

      if (response.ok || response.status === 204) {
        setSendResult({ success: true, message: t.webhookSentSuccess });
      } else {
        const text = await response.text();
        setSendResult({ success: false, message: `${t.webhookSendError} (${response.status}) ${text}` });
      }
    } catch (err: any) {
      setSendResult({ success: false, message: `${t.webhookSendError}: ${err.message || ''}` });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#2B2D31] rounded-2xl p-5 border border-[#383A40] shadow-lg space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">
            {t.toolWebhook}
          </h2>
          <p className="text-xs text-[#949BA4]">
            {t.webhookDesc}
          </p>
        </div>
      </div>

      {/* Webhook URL Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#949BA4] block">
          {t.webhookUrlLabel}
        </label>
        <input
          type="text"
          placeholder="https://discord.com/api/webhooks/..."
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="w-full bg-[#1E1F22] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#3F4147] focus:border-[#5865F2] outline-none font-mono"
        />
      </div>

      {/* Bot Customizer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#949BA4] block">
            {t.webhookUsername}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#1E1F22] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#3F4147] outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#949BA4] block">
            {t.webhookAvatar}
          </label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full bg-[#1E1F22] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#3F4147] outline-none"
          />
        </div>
      </div>

      {/* Message Content */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#949BA4] block">
          {t.webhookContent}
        </label>
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-[#1E1F22] text-xs text-white px-3.5 py-2.5 rounded-xl border border-[#3F4147] focus:border-[#5865F2] outline-none"
        />
      </div>

      {/* Embed toggle */}
      <label className="flex items-center gap-2 text-xs text-[#949BA4] cursor-pointer">
        <input
          type="checkbox"
          checked={attachSampleEmbed}
          onChange={(e) => setAttachSampleEmbed(e.target.checked)}
          className="accent-[#5865F2] rounded"
        />
        <span>{t.attachEmbedToggle}</span>
      </label>

      {/* Live Message Preview */}
      <div className="p-4 rounded-xl bg-[#1E1F22] border border-[#383A40] space-y-2">
        <span className="text-[11px] text-[#949BA4] font-bold block">معاينة الرسالة في ديسكورد:</span>
        <div className="flex items-start gap-3">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover bg-[#313338]"
          />
          <div className="min-w-0 flex-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{username || 'Webhook Bot'}</span>
              <span className="text-[10px] font-bold px-1 py-0.2 rounded bg-[#5865F2] text-white">BOT</span>
              <span className="text-[10px] text-[#949BA4]">Today at 12:00</span>
            </div>
            <p className="text-[#DBDEE1] mt-1 whitespace-pre-wrap">{content}</p>

            {attachSampleEmbed && (
              <div className="mt-2.5 p-3 rounded-lg bg-[#2B2D31] border-l-4 border-[#5865F2] rtl:border-l-0 rtl:border-r-4 rtl:border-[#5865F2]">
                <h5 className="font-bold text-white text-xs">Discord Tools Notification</h5>
                <p className="text-[11px] text-[#DBDEE1] mt-0.5">This is an example embed dispatched via Webhook Builder.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {sendResult && (
        <div className={`p-3.5 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
          sendResult.success 
            ? 'bg-[#57F287]/15 border-[#57F287]/30 text-[#57F287]'
            : 'bg-[#ED4245]/15 border-[#ED4245]/30 text-[#ED4245]'
        }`}>
          {sendResult.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{sendResult.message}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={copyPayload}
          className="flex-1 py-2.5 rounded-xl bg-[#313338] hover:bg-[#383A40] text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-[#3F4147]"
        >
          {copied ? <Check className="w-4 h-4 text-[#57F287]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t.copiedSuccess : t.copyWebhookJson}</span>
        </button>

        <button
          onClick={sendTestWebhook}
          disabled={sending}
          className="flex-1 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#5865F2]/25 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{sending ? 'جاري الإرسال...' : t.sendWebhookBtn}</span>
        </button>
      </div>
    </div>
  );
};
