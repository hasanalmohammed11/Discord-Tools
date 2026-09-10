import { createClient } from '@supabase/supabase-js';
import { DiscordBot, UploadedFile } from '../types';

export const SUPABASE_URL = 'https://isjcjuacqgtdmhtslxvf.supabase.co';

// Default Supabase Publishable / Anon Key placeholder (can be overridden via localStorage or env)
export const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzamNqdWFjcWd0ZG1odHNseHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDAwMDAsImV4cCI6MjA1NTU1NTU1NX0.placeholder';

export const getSupabaseAnonKey = (): string => {
  return localStorage.getItem('supabase_anon_key') || DEFAULT_ANON_KEY;
};

export const setSupabaseAnonKey = (key: string) => {
  localStorage.setItem('supabase_anon_key', key);
};

export const getSupabaseClient = () => {
  return createClient(SUPABASE_URL, getSupabaseAnonKey());
};

export const STORAGE_BUCKET = 'discord-files';

// Curated default Discord bots directory (available offline or as database fallback)
export const DEFAULT_BOTS: DiscordBot[] = [
  {
    id: 'probot',
    name: 'ProBot',
    category: 'Moderation',
    icon_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=282859044593598464&scope=bot&permissions=8',
    developer: 'ProBot Team',
    prefix: '/',
    description: {
      ar: 'بوت متعدد المهام متقدم للإشراف والترحيب، نظام المستويات، الحماية الشاملة ومكافحة السبام.',
      en: 'Multi-purpose bot featuring advanced auto-moderation, welcome cards, leveling, and anti-raid.'
    },
    features: {
      ar: ['أوتومود ذكي', 'نظام مستويات وتصنيف', 'رسائل ترحيب بصور مخصصة', 'أوامر حظر وطرد تلقائي'],
      en: ['Smart Auto-mod', 'Leveling & XP system', 'Custom image welcome cards', 'Anti-raid protection']
    }
  },
  {
    id: 'mee6',
    name: 'MEE6',
    category: 'Moderation',
    icon_url: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=159985870458322944&scope=bot&permissions=8',
    developer: 'MEE6 Devs',
    prefix: '!',
    description: {
      ar: 'البوت الأكثر شهرة لإدارة السيرفرات والتنبيهات المباشرة وتخصيص الرتب التفاعلية.',
      en: 'The most popular Discord bot for server management, social alerts, and custom reaction roles.'
    },
    features: {
      ar: ['تنبيهات يوتيوب وتويتش', 'رتب تفاعلية بالأزرار', 'لوحة تحكم سهلة الاستخدام', 'أوامر مخصصة'],
      en: ['YouTube & Twitch alerts', 'Reaction roles', 'Web dashboard', 'Custom commands']
    }
  },
  {
    id: 'carlbot',
    name: 'Carl-bot',
    category: 'Utility',
    icon_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=235148963517005824&scope=bot&permissions=8',
    developer: 'Carl Corp',
    prefix: '?',
    description: {
      ar: 'أقوى بوت للرتب التفاعلية (Reaction Roles) وسجلات الأحداث المتقدمة والرسائل المؤتمتة.',
      en: 'The ultimate bot for reaction roles, detailed logging, moderation, and automated feeds.'
    },
    features: {
      ar: ['رتب تفاعلية غير محدودة', 'سجلات تدقيق شاملة للرسائل والرومات', 'أوتورول للأعضاء الجدد'],
      en: ['Unlimited reaction roles', 'Extensive audit logging', 'Auto-roles for newcomers']
    }
  },
  {
    id: 'fredboat',
    name: 'FredBoat',
    category: 'Music',
    icon_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=184405311681986560&scope=bot&permissions=36700160',
    developer: 'Frekkers',
    prefix: ';;',
    description: {
      ar: 'بوت موسيقى مجاني وعالي الجودة يدعم قوائم التشغيل والبحث المباشر بدون تقطيع.',
      en: 'High-quality music bot supporting playlists, direct search, shuffle, and smooth playback.'
    },
    features: {
      ar: ['جودة صوت فائقة النقاء', 'دعم SoundCloud وBandcamp', 'قوائم تشغيل متقدمة مع خلط الأغاني'],
      en: ['Crisp audio quality', 'SoundCloud & Bandcamp', 'Advanced playlist queues & shuffle']
    }
  },
  {
    id: 'captchabot',
    name: 'Captcha.bot',
    category: 'Security',
    icon_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=512333785338216465&scope=bot&permissions=268435456',
    developer: 'Captcha Verification Team',
    prefix: '/verify',
    description: {
      ar: 'حماية السيرفر من حسابات السبام وهجمات البوتات العشوائية بواسطة كود تحقق كابتشا.',
      en: 'Protect your server from raids and fake bot accounts through interactive verification captchas.'
    },
    features: {
      ar: ['تحقق كابتشا فوري', 'عزل الحسابات المشبوهة', 'حظر تلقائي للحسابات الوهمية'],
      en: ['Interactive captcha challenge', 'Quarantine fake accounts', 'Auto-quarantine suspicious users']
    }
  },
  {
    id: 'tickettool',
    name: 'Ticket Tool',
    category: 'Utility',
    icon_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=557628352828014592&scope=bot&permissions=8',
    developer: 'Ticket Tool Support',
    prefix: '$',
    description: {
      ar: 'نظام تذاكر دعم فني احترافي لخدمة أعضاء السيرفر برومات خاصة وسجلات محفوظة.',
      en: 'Support ticket system for Discord servers with transcripts, custom panels, and role pings.'
    },
    features: {
      ar: ['فتح تذاكر بزر تفاعلي', 'حفظ سجلات المحادثة HTML', 'إشعار فريق الدعم الفني فوراً'],
      en: ['One-click ticket panels', 'HTML transcripts saving', 'Automatic support team ping']
    }
  },
  {
    id: 'dankmemer',
    name: 'Dank Memer',
    category: 'Fun',
    icon_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=8',
    developer: 'Melmsie',
    prefix: '/pls',
    description: {
      ar: 'أكبر بوت ترفيه وميمز مع نظام اقتصاد شامل، حيوانات أليفة، ألعاب مصغرة وسرقة عملات.',
      en: 'Massive meme & fun bot with rich global economy, pets, mini-games, and trading.'
    },
    features: {
      ar: ['ألعاب اقتصاد ومزادات', 'توليد أحدث الميمز', 'حيوانات أليفة واقتناء بطاقات'],
      en: ['Currency & market auction', 'Instant meme generation', 'Pets and item collection']
    }
  },
  {
    id: 'unbelievaboat',
    name: 'UnbelievaBoat',
    category: 'Economy',
    icon_url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=150&auto=format&fit=crop&q=80',
    invite_url: 'https://discord.com/oauth2/authorize?client_id=292953664492929025&scope=bot&permissions=8',
    developer: 'UnbelievaBoat Inc',
    prefix: '!',
    description: {
      ar: 'نظام اقتصاد وسيرفر كازينو متكامل، متجر أدوار مخصص، رواتب تلقائية للأعضاء.',
      en: 'Complete discord economy system with custom server shop, casino games, and job payouts.'
    },
    features: {
      ar: ['متجر رتب وسلع خاص بالسيرفر', 'ألعاب كازينو وبلاك جاك وروليت', 'رواتب يومية وسحب بنكي'],
      en: ['Custom server store for roles', 'Blackjack & roulette games', 'Daily salaries and bank deposits']
    }
  }
];

// Helper to format bytes to human readable size
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
