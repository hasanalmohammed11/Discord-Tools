import 'package:flutter/material.dart';
import '../constants/theme.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Discord Tools', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: DiscordColors.darkCanvas,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    DiscordColors.blurple.withOpacity(0.25),
                    DiscordColors.darkSurface,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: DiscordColors.blurple.withOpacity(0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Discord Tools',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    isArabic
                        ? 'كل ما تحتاجه لسيرفر ديسكورد الخاص بك'
                        : 'Everything you need for your Discord server',
                    style: const TextStyle(fontSize: 14, color: DiscordColors.textMuted),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Main Section Cards
            _buildSectionCard(
              context,
              icon: Icons.folder,
              iconColor: DiscordColors.blurple,
              title: isArabic ? '📁 مركز الملفات (File Center)' : '📁 File Center',
              subtitle: isArabic
                  ? 'رفع ومشاركة الملفات حتى 50MB بدون تسجيل دخول'
                  : 'Upload & share files up to 50MB with instant links',
            ),
            const SizedBox(height: 12),
            _buildSectionCard(
              context,
              icon: Icons.build,
              iconColor: DiscordColors.green,
              title: isArabic ? '🛠️ أدوات ديسكورد (Discord Tools)' : '🛠️ Discord Tools',
              subtitle: isArabic
                  ? 'طوابع زمنية، صانع Embeds، حاسبة الصلاحيات، ويب هوك'
                  : 'Timestamp generator, embed builder, permissions calculator',
            ),
            const SizedBox(height: 12),
            _buildSectionCard(
              context,
              icon: Icons.smart_toy,
              iconColor: DiscordColors.yellow,
              title: isArabic ? '🤖 دليل البوتات (Discord Bots)' : '🤖 Discord Bots',
              subtitle: isArabic
                  ? 'أفضل بوتات الديسكورد الموثوقة مع روابط الدعوة المباشرة'
                  : 'Curated list of verified bots with one-click invite',
            ),
            const SizedBox(height: 24),

            // Popular Tools
            Text(
              isArabic ? 'الأدوات الأكثر استخداماً' : 'Popular Tools',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildToolChip(
                    context,
                    title: isArabic ? 'طوابع زمنية' : 'Timestamp',
                    icon: Icons.schedule,
                    color: DiscordColors.blurple,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _buildToolChip(
                    context,
                    title: isArabic ? 'صانع Embed' : 'Embed Builder',
                    icon: Icons.layers,
                    color: DiscordColors.green,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _buildToolChip(
                    context,
                    title: isArabic ? 'حاسبة صلاحيات' : 'Permissions',
                    icon: Icons.security,
                    color: DiscordColors.yellow,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionCard(BuildContext context, {
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: DiscordColors.darkSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: DiscordColors.darkBorder),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: iconColor.withOpacity(0.15),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Icon(icon, color: iconColor, size: 24),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white)),
                const SizedBox(height: 4),
                Text(subtitle, style: const TextStyle(fontSize: 12, color: DiscordColors.textMuted)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildToolChip(BuildContext context, {
    required String title,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
      decoration: BoxDecoration(
        color: DiscordColors.darkSurface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: DiscordColors.darkBorder),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(height: 6),
          Text(
            title,
            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
