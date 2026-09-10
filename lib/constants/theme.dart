import 'package:flutter/material.dart';

class DiscordColors {
  static const Color blurple = Color(0xFF5865F2);
  static const Color green = Color(0xFF57F287);
  static const Color yellow = Color(0xFFFEE75C);
  static const Color fuchsia = Color(0xFFEB459E);
  static const Color red = Color(0xFFED4245);

  static const Color darkCanvas = Color(0xFF1E1F22);
  static const Color darkSurface = Color(0xFF2B2D31);
  static const Color darkCard = Color(0xFF313338);
  static const Color darkInput = Color(0xFF383A40);
  static const Color darkBorder = Color(0xFF3F4147);
  static const Color textMuted = Color(0xFF949BA4);
  static const Color textNormal = Color(0xFFF2F3F5);
}

class AppThemes {
  static final ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: DiscordColors.darkCanvas,
    primaryColor: DiscordColors.blurple,
    colorScheme: const ColorScheme.dark(
      primary: DiscordColors.blurple,
      surface: DiscordColors.darkSurface,
      background: DiscordColors.darkCanvas,
      error: DiscordColors.red,
      onPrimary: Colors.white,
      onSurface: DiscordColors.textNormal,
    ),
    cardTheme: CardTheme(
      color: DiscordColors.darkSurface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: DiscordColors.darkBorder, width: 1),
      ),
    ),
    navigationBarTheme: NavigationBarThemeData(
      backgroundColor: DiscordColors.darkCanvas,
      indicatorColor: DiscordColors.blurple.withOpacity(0.2),
      labelTextStyle: MaterialStateProperty.all(
        const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
      ),
    ),
  );

  static final ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    scaffoldBackgroundColor: const Color(0xFFF2F3F5),
    primaryColor: DiscordColors.blurple,
    colorScheme: const ColorScheme.light(
      primary: DiscordColors.blurple,
      surface: Colors.white,
      error: DiscordColors.red,
    ),
  );
}
