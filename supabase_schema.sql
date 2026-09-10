-- ================================================================
-- Discord Tools - Complete Supabase Database & Storage Setup
-- Project URL: https://isjcjuacqgtdmhtslxvf.supabase.co
-- ================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create 'bots' Table
CREATE TABLE IF NOT EXISTS public.bots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_url TEXT NOT NULL,
    invite_url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Moderation', 'Music', 'Security', 'Utility', 'Fun', 'Economy')),
    developer TEXT,
    prefix TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create 'files' Table
CREATE TABLE IF NOT EXISTS public.files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL UNIQUE,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    download_count BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Anonymous Access (No Login Required)
-- Anyone can view bots
CREATE POLICY "Allow public read on bots"
ON public.bots FOR SELECT
USING (true);

-- Anyone can view file records
CREATE POLICY "Allow public read on files"
ON public.files FOR SELECT
USING (true);

-- Anyone can insert file records upon successful upload
CREATE POLICY "Allow public insert on files"
ON public.files FOR INSERT
WITH CHECK (true);

-- 6. Setup Storage Bucket 'discord-files'
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'discord-files',
    'discord-files',
    true,
    52428800, -- 50 MB strict maximum limit in bytes
    NULL      -- Accepts all MIME types
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800;

-- 7. Storage RLS Policies
-- Allow anyone to download / view objects from public bucket
CREATE POLICY "Public can view discord-files"
ON storage.objects FOR SELECT
USING (bucket_id = 'discord-files');

-- Allow anyone to upload objects to discord-files bucket
CREATE POLICY "Public can upload to discord-files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'discord-files');

-- 8. Seed Initial Curated Bots
INSERT INTO public.bots (name, description, icon_url, invite_url, category, developer, prefix)
VALUES
('ProBot', 'بوت متعدد المهام متقدم للإشراف والترحيب، نظام المستويات، الحماية الشاملة ومكافحة السبام.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150', 'https://discord.com/oauth2/authorize?client_id=282859044593598464&scope=bot&permissions=8', 'Moderation', 'ProBot Team', '/'),
('MEE6', 'البوت الأكثر شهرة لإدارة السيرفرات والتنبيهات المباشرة وتخصيص الرتب التفاعلية.', 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150', 'https://discord.com/oauth2/authorize?client_id=159985870458322944&scope=bot&permissions=8', 'Moderation', 'MEE6 Devs', '!'),
('Carl-bot', 'أقوى بوت للرتب التفاعلية وسجلات الأحداث المتقدمة والرسائل المؤتمتة.', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150', 'https://discord.com/oauth2/authorize?client_id=235148963517005824&scope=bot&permissions=8', 'Utility', 'Carl Corp', '?'),
('FredBoat', 'بوت موسيقى مجاني وعالي الجودة يدعم قوائم التشغيل والبحث المباشر بدون تقطيع.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150', 'https://discord.com/oauth2/authorize?client_id=184405311681986560&scope=bot&permissions=36700160', 'Music', 'Frekkers', ';;'),
('Captcha.bot', 'حماية السيرفر من هجمات الروبوتات والسبام بواسطة كود تحقق كابتشا فوري.', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150', 'https://discord.com/oauth2/authorize?client_id=512333785338216465&scope=bot&permissions=268435456', 'Security', 'Captcha Team', '/verify'),
('Dank Memer', 'أكبر بوت ترفيه وميمز مع نظام اقتصاد شامل، حيوانات أليفة، وألعاب مصغرة.', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150', 'https://discord.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=8', 'Fun', 'Melmsie', '/pls'),
('UnbelievaBoat', 'نظام اقتصاد وسيرفر كازينو متكامل، متجر أدوار مخصص، رواتب تلقائية.', 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=150', 'https://discord.com/oauth2/authorize?client_id=292953664492929025&scope=bot&permissions=8', 'Economy', 'UnbelievaBoat Inc', '!')
ON CONFLICT DO NOTHING;
