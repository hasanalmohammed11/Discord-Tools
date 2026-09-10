import 'package:flutter/foundation.dart';

class StartIoService {
  static const String appId = '208250285';
  static bool _initialized = false;

  static Future<void> init() async {
    if (_initialized) return;
    try {
      // In production Flutter builds with Start.io SDK:
      // await StartAppSdk.instance.init(appId: appId);
      _initialized = true;
      debugPrint('Start.io Ads initialized with App ID: $appId');
    } catch (e) {
      debugPrint('Failed to initialize Start.io: $e');
    }
  }

  static Future<void> showInterstitial() async {
    try {
      debugPrint('Start.io Interstitial requested');
    } catch (e) {
      debugPrint('Start.io Interstitial error: $e');
    }
  }
}
