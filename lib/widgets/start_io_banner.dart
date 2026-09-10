import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../services/start_io_service.dart';

class StartIoBannerWidget extends StatefulWidget {
  const StartIoBannerWidget({super.key});

  @override
  State<StartIoBannerWidget> createState() => _StartIoBannerWidgetState();
}

class _StartIoBannerWidgetState extends State<StartIoBannerWidget> {
  bool _isDismissed = false;

  @override
  Widget build(BuildContext context) {
    if (_isDismissed) return const SizedBox.shrink();

    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: DiscordColors.darkSurface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: DiscordColors.darkBorder),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: DiscordColors.blurple.withOpacity(0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.star, color: DiscordColors.blurple, size: 18),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                      decoration: BoxDecoration(
                        color: DiscordColors.darkInput,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: const Text(
                        'Start.io Ad',
                        style: TextStyle(fontSize: 9, color: DiscordColors.textMuted, fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(width: 6),
                    const Text(
                      'Upgrade your Discord Guild',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ],
                ),
                const Text(
                  'Explore custom perks, emoji packs, and community events.',
                  style: TextStyle(fontSize: 10, color: DiscordColors.textMuted),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.close, size: 16, color: DiscordColors.textMuted),
            onPressed: () {
              setState(() {
                _isDismissed = true;
              });
            },
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
          ),
        ],
      ),
    );
  }
}
