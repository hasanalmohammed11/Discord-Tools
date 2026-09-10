import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'constants/theme.dart';
import 'services/supabase_service.dart';
import 'services/start_io_service.dart';
import 'screens/home_screen.dart';
import 'screens/files_screen.dart';
import 'screens/tools_screen.dart';
import 'screens/bots_screen.dart';
import 'screens/settings_screen.dart';
import 'widgets/start_io_banner.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Supabase using Project URL and Anonymous Publishable Key
  await Supabase.initialize(
    url: SupabaseService.projectUrl,
    anonKey: SupabaseService.anonKey,
  );

  // Initialize Start.io Ads SDK (App ID: 208250285)
  await StartIoService.init();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppSettingsProvider()),
        ChangeNotifierProvider(create: (_) => UploadStateProvider()),
      ],
      child: const DiscordToolsApp(),
    ),
  );
}

class AppSettingsProvider extends ChangeNotifier {
  Locale _locale = const Locale('ar');
  ThemeMode _themeMode = ThemeMode.dark;

  Locale get locale => _locale;
  ThemeMode get themeMode => _themeMode;

  void setLocale(Locale newLocale) {
    _locale = newLocale;
    notifyListeners();
  }

  void toggleLocale() {
    _locale = _locale.languageCode == 'ar' ? const Locale('en') : const Locale('ar');
    notifyListeners();
  }

  void setThemeMode(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
  }
}

class UploadStateProvider extends ChangeNotifier {
  bool _isUploading = false;
  bool get isUploading => _isUploading;

  void setUploading(bool value) {
    _isUploading = value;
    notifyListeners();
  }
}

class DiscordToolsApp extends StatelessWidget {
  const DiscordToolsApp({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = context.watch<AppSettingsProvider>();

    return MaterialApp(
      title: 'Discord Tools',
      debugShowCheckedModeBanner: false,
      theme: AppThemes.lightTheme,
      darkTheme: AppThemes.darkTheme,
      themeMode: settings.themeMode,
      locale: settings.locale,
      supportedLocales: const [
        Locale('ar'),
        Locale('en'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    FilesScreen(),
    ToolsScreen(),
    BotsScreen(),
    SettingsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final isUploading = context.watch<UploadStateProvider>().isUploading;
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Banner Ad is strictly hidden during active file uploads!
          if (!isUploading)
            const StartIoBannerWidget(),
          NavigationBar(
            selectedIndex: _currentIndex,
            onDestinationSelected: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
            destinations: [
              NavigationDestination(
                icon: const Icon(Icons.home_outlined),
                selectedIcon: const Icon(Icons.home, color: DiscordColors.blurple),
                label: isArabic ? 'الرئيسية' : 'Home',
              ),
              NavigationDestination(
                icon: const Icon(Icons.folder_outlined),
                selectedIcon: const Icon(Icons.folder, color: DiscordColors.blurple),
                label: isArabic ? 'الملفات' : 'Files',
              ),
              NavigationDestination(
                icon: const Icon(Icons.build_outlined),
                selectedIcon: const Icon(Icons.build, color: DiscordColors.blurple),
                label: isArabic ? 'الأدوات' : 'Tools',
              ),
              NavigationDestination(
                icon: const Icon(Icons.smart_toy_outlined),
                selectedIcon: const Icon(Icons.smart_toy, color: DiscordColors.blurple),
                label: isArabic ? 'البوتات' : 'Bots',
              ),
              NavigationDestination(
                icon: const Icon(Icons.settings_outlined),
                selectedIcon: const Icon(Icons.settings, color: DiscordColors.blurple),
                label: isArabic ? 'الإعدادات' : 'Settings',
              ),
            ],
          ),
        ],
      ),
    );
  }
}
