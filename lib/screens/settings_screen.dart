import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/theme.dart';
import '../main.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = context.watch<AppSettingsProvider>();
    final isArabic = settings.locale.languageCode == 'ar';

    return Scaffold(
      appBar: AppBar(
        title: Text(isArabic ? 'الإعدادات ⚙️' : 'Settings ⚙️'),
        backgroundColor: DiscordColors.darkCanvas,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Language switcher
          ListTile(
            tileColor: DiscordColors.darkSurface,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.language, color: DiscordColors.blurple),
            title: Text(isArabic ? 'اللغة (Language)' : 'Language (اللغة)'),
            subtitle: Text(isArabic ? 'العربية (RTL)' : 'English (LTR)'),
            trailing: Switch(
              value: isArabic,
              activeColor: DiscordColors.blurple,
              onChanged: (val) {
                settings.setLocale(val ? const Locale('ar') : const Locale('en'));
              },
            ),
          ),
          const SizedBox(height: 12),

          // Theme switcher
          ListTile(
            tileColor: DiscordColors.darkSurface,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.dark_mode, color: DiscordColors.yellow),
            title: Text(isArabic ? 'المظهر' : 'Theme'),
            subtitle: Text(settings.themeMode == ThemeMode.dark ? 'Dark Mode' : 'Light Mode'),
            trailing: Switch(
              value: settings.themeMode == ThemeMode.dark,
              activeColor: DiscordColors.blurple,
              onChanged: (val) {
                settings.setThemeMode(val ? ThemeMode.dark : ThemeMode.light);
              },
            ),
          ),
          const SizedBox(height: 20),

          // About App
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: DiscordColors.darkSurface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: DiscordColors.darkBorder),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('About Discord Tools', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 6),
                Text(
                  isArabic
                      ? 'تطبيق مستقل يوفر أدوات مساعدة وميزات رفع ملفات لمستخدمي ومطوري منصة ديسكورد. غير تابع رسميًا لشركة ديسكورد.'
                      : 'An independent utility suite and file-sharing tool for Discord server owners and power users. Not affiliated with Discord Inc.',
                  style: const TextStyle(fontSize: 12, color: DiscordColors.textMuted),
                ),
                const SizedBox(height: 12),
                const Text('Start.io Ads Integration: App ID 208250285',
                    style: TextStyle(fontSize: 11, color: DiscordColors.green, fontFamily: 'monospace')),
                const SizedBox(height: 4),
                const Text('Version 1.0.0 (Build 100)', style: TextStyle(fontSize: 11, color: DiscordColors.textMuted)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
