export type Language = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light';

export interface DiscordBot {
  id: string;
  name: string;
  description: {
    ar: string;
    en: string;
  };
  icon_url: string;
  invite_url: string;
  category: 'Moderation' | 'Music' | 'Security' | 'Utility' | 'Fun' | 'Economy';
  developer?: string;
  prefix?: string;
  features?: {
    ar: string[];
    en: string[];
  };
}

export interface UploadedFile {
  id: string;
  file_name: string;
  storage_path: string;
  file_size: number;
  mime_type: string;
  download_count: number;
  created_at: string;
  public_url: string;
}

export interface EmbedField {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

export interface EmbedData {
  title: string;
  description: string;
  url: string;
  color: string;
  authorName: string;
  authorIconUrl: string;
  authorUrl: string;
  footerText: string;
  footerIconUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  timestamp: boolean;
  fields: EmbedField[];
}

export interface PermissionBit {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  value: bigint;
  category: 'general' | 'text' | 'voice' | 'membership';
}
