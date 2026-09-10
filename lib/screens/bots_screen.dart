import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../constants/theme.dart';

class BotsScreen extends StatefulWidget {
  const BotsScreen({super.key});

  @override
  State<BotsScreen> createState() => _BotsScreenState();
}

class _BotsScreenState extends State<BotsScreen> {
  String _selectedCategory = 'All';
  String _searchQuery = '';

  final List<Map<String, dynamic>> _bots = [
    {
      'name': 'ProBot',
      'category': 'Moderation',
      'description': 'بوت متعدد المهام متقدم للإشراف والترحيب، نظام المستويات، ومكافحة السبام.',
      'inviteUrl': 'https://discord.com/oauth2/authorize?client_id=282859044593598464&scope=bot&permissions=8',
      'icon': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    },
    {
      'name': 'MEE6',
      'category': 'Moderation',
      'description': 'البوت الأكثر شهرة لإدارة السيرفرات والتنبيهات المباشرة وتخصيص الرتب.',
      'inviteUrl': 'https://discord.com/oauth2/authorize?client_id=159985870458322944&scope=bot&permissions=8',
      'icon': 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150',
    },
    {
      'name': 'FredBoat',
      'category': 'Music',
      'description': 'بوت موسيقى مجاني وعالي الجودة يدعم قوائم التشغيل والبحث المباشر.',
      'inviteUrl': 'https://discord.com/oauth2/authorize?client_id=184405311681986560&scope=bot&permissions=36700160',
      'icon': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
    },
    {
      'name': 'Captcha.bot',
      'category': 'Security',
      'description': 'حماية السيرفر من هجمات الروبوتات والسبام بواسطة كود تحقق كابتشا فوري.',
      'inviteUrl': 'https://discord.com/oauth2/authorize?client_id=512333785338216465&scope=bot&permissions=268435456',
      'icon': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150',
    },
    {
      'name': 'Carl-bot',
      'category': 'Utility',
      'description': 'أقوى بوت للرتب التفاعلية وسجلات الأحداث المتقدمة والرسائل المؤتمتة.',
      'inviteUrl': 'https://discord.com/oauth2/authorize?client_id=235148963517005824&scope=bot&permissions=8',
      'icon': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150',
    },
    {
      'name': 'Dank Memer',
      'category': 'Fun',
      'description': 'أكبر بوت ترفيه وميمز مع نظام اقتصاد شامل، حيوانات أليفة، وألعاب مصغرة.',
      'inviteUrl': 'https://discord.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=8',
      'icon': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150',
    },
    {
      'name': 'UnbelievaBoat',
      'category': 'Economy',
      'description': 'نظام اقتصاد وسيرفر كازينو متكامل، متجر أدوار مخصص، رواتب تلقائية.',
      'inviteUrl': 'https://discord.com/oauth2/authorize?client_id=292953664492929025&scope=bot&permissions=8',
      'icon': 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=150',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    final categories = ['All', 'Moderation', 'Music', 'Security', 'Utility', 'Fun', 'Economy'];

    final filtered = _bots.where((b) {
      final matchCat = _selectedCategory == 'All' || b['category'] == _selectedCategory;
      final matchSearch = _searchQuery.isEmpty ||
          b['name'].toLowerCase().contains(_searchQuery.toLowerCase()) ||
          b['description'].toLowerCase().contains(_searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: Text(isArabic ? 'دليل البوتات 🤖' : 'Discord Bots 🤖'),
        backgroundColor: DiscordColors.darkCanvas,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Search Box
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              decoration: InputDecoration(
                hintText: isArabic ? 'ابحث عن بوت...' : 'Search bots...',
                prefixIcon: const Icon(Icons.search, color: DiscordColors.textMuted),
                filled: true,
                fillColor: DiscordColors.darkSurface,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: DiscordColors.darkBorder),
                ),
              ),
            ),
          ),

          // Categories horizontal scroll
          SizedBox(
            height: 40,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: categories.length,
              itemBuilder: (context, idx) {
                final cat = categories[idx];
                final isSelected = _selectedCategory == cat;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: FilterChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (_) => setState(() => _selectedCategory = cat),
                    selectedColor: DiscordColors.blurple,
                    backgroundColor: DiscordColors.darkSurface,
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 10),

          // Bots List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: filtered.length,
              itemBuilder: (context, idx) {
                final bot = filtered[idx];
                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: DiscordColors.darkSurface,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: DiscordColors.darkBorder),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          CircleAvatar(
                            backgroundImage: NetworkImage(bot['icon']),
                            radius: 24,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      bot['name'],
                                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
                                    ),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: DiscordColors.blurple.withOpacity(0.15),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Text(
                                        bot['category'],
                                        style: const TextStyle(color: DiscordColors.blurple, fontSize: 10, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        bot['description'],
                        style: const TextStyle(fontSize: 12, color: DiscordColors.textMuted),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: () => launchUrl(Uri.parse(bot['inviteUrl'])),
                              icon: const Icon(Icons.open_in_new, size: 16),
                              label: Text(isArabic ? 'دعوة البوت' : 'Invite Bot'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: DiscordColors.blurple,
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
