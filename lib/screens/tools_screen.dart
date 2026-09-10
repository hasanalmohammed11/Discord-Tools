import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/theme.dart';

class ToolsScreen extends StatefulWidget {
  const ToolsScreen({super.key});

  @override
  State<ToolsScreen> createState() => _ToolsScreenState();
}

class _ToolsScreenState extends State<ToolsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      appBar: AppBar(
        title: Text(isArabic ? 'أدوات ديسكورد 🛠️' : 'Discord Tools 🛠️'),
        backgroundColor: DiscordColors.darkCanvas,
        elevation: 0,
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: DiscordColors.blurple,
          tabs: [
            Tab(text: isArabic ? 'الطابع الزمني' : 'Timestamp'),
            Tab(text: isArabic ? 'Embed Builder' : 'Embed'),
            Tab(text: isArabic ? 'الصلاحيات' : 'Permissions'),
            Tab(text: isArabic ? 'Webhook' : 'Webhook'),
            Tab(text: isArabic ? 'الألوان' : 'Colors'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildTimestampTab(isArabic),
          _buildEmbedTab(isArabic),
          _buildPermissionsTab(isArabic),
          _buildWebhookTab(isArabic),
          _buildColorTab(isArabic),
        ],
      ),
    );
  }

  // Tool 1: Timestamp Generator
  Widget _buildTimestampTab(bool isArabic) {
    DateTime selected = DateTime.now();
    int unix = (selected.millisecondsSinceEpoch / 1000).round();
    String code = '<t:$unix:f>';

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            isArabic ? 'مولد الطوابع الزمنية الديناميكية لرسائل ديسكورد' : 'Dynamic Discord Timestamp Generator',
            style: const TextStyle(color: DiscordColors.textMuted, fontSize: 13),
          ),
          const SizedBox(height: 16),
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
                Text(
                  isArabic ? 'الكود المولد:' : 'Generated Code:',
                  style: const TextStyle(fontSize: 12, color: DiscordColors.textMuted),
                ),
                const SizedBox(height: 6),
                SelectableText(
                  code,
                  style: const TextStyle(fontSize: 16, fontFamily: 'monospace', color: DiscordColors.green, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  onPressed: () {
                    Clipboard.setData(ClipboardData(text: code));
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(isArabic ? 'تم نسخ كود الطابع الزمني!' : 'Timestamp copied!')),
                    );
                  },
                  icon: const Icon(Icons.copy, size: 16),
                  label: Text(isArabic ? 'نسخ كود ديسكورد' : 'Copy Discord Code'),
                  style: ElevatedButton.styleFrom(backgroundColor: DiscordColors.blurple),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Tool 2: Embed Builder
  Widget _buildEmbedTab(bool isArabic) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(isArabic ? 'صانع رسائل الـ Embeds لـ ديسكورد' : 'Discord Embed Builder',
              style: const TextStyle(color: DiscordColors.textMuted, fontSize: 13)),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: DiscordColors.darkSurface,
              borderRadius: BorderRadius.circular(16),
              border: const Border(left: BorderSide(color: DiscordColors.blurple, width: 4)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Discord Announcement', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white)),
                const SizedBox(height: 6),
                const Text('Welcome to our community server! Check out the rules.', style: TextStyle(fontSize: 13, color: Colors.white70)),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  onPressed: () {
                    const sampleJson = '{"embeds": [{"title": "Discord Announcement", "color": 5793266}]}';
                    Clipboard.setData(const ClipboardData(text: sampleJson));
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم نسخ كود Embed JSON!')),
                    );
                  },
                  icon: const Icon(Icons.copy, size: 16),
                  label: const Text('نسخ Embed JSON'),
                  style: ElevatedButton.styleFrom(backgroundColor: DiscordColors.blurple),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Tool 3: Permissions Calculator
  Widget _buildPermissionsTab(bool isArabic) {
    BigInt sampleBit = BigInt.from(8); // Administrator

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
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
                Text(isArabic ? 'حاسبة صلاحيات ديسكورد (Permissions Bitmask)' : 'Discord Permissions Bitmask',
                    style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 8),
                Text('Value: $sampleBit (Administrator)',
                    style: const TextStyle(fontSize: 16, fontFamily: 'monospace', color: DiscordColors.green, fontWeight: FontWeight.bold)),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  onPressed: () {
                    Clipboard.setData(ClipboardData(text: sampleBit.toString()));
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم نسخ قيمة الصلاحيات!')),
                    );
                  },
                  icon: const Icon(Icons.copy, size: 16),
                  label: const Text('نسخ القيمة'),
                  style: ElevatedButton.styleFrom(backgroundColor: DiscordColors.blurple),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Tool 4: Webhook Builder
  Widget _buildWebhookTab(bool isArabic) {
    final TextEditingController urlCtrl = TextEditingController();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          TextField(
            controller: urlCtrl,
            decoration: InputDecoration(
              hintText: 'https://discord.com/api/webhooks/...',
              labelText: isArabic ? 'رابط الويب هوك (Webhook URL)' : 'Webhook URL',
              filled: true,
              fillColor: DiscordColors.darkSurface,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            onPressed: () {
              const samplePayload = '{"content": "Hello from Discord Tools!"}';
              Clipboard.setData(const ClipboardData(text: samplePayload));
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('تم نسخ Webhook Payload JSON!')),
              );
            },
            icon: const Icon(Icons.copy, size: 16),
            label: const Text('نسخ Webhook Payload'),
            style: ElevatedButton.styleFrom(backgroundColor: DiscordColors.blurple),
          ),
        ],
      ),
    );
  }

  // Tool 5: Color Generator
  Widget _buildColorTab(bool isArabic) {
    const String hex = '#5865F2';
    const int decimal = 5793266;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: DiscordColors.darkSurface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: DiscordColors.darkBorder),
            ),
            child: Column(
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: DiscordColors.blurple,
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                const SizedBox(height: 12),
                const Text('HEX: #5865F2', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                const Text('Decimal: 5793266 (Discord Embeds)', style: TextStyle(color: DiscordColors.green, fontFamily: 'monospace')),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  onPressed: () {
                    Clipboard.setData(const ClipboardData(text: decimal.toString()));
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('تم نسخ Decimal Color!')),
                    );
                  },
                  icon: const Icon(Icons.copy, size: 16),
                  label: const Text('نسخ Decimal'),
                  style: ElevatedButton.styleFrom(backgroundColor: DiscordColors.blurple),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
