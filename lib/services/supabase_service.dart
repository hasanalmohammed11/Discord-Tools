import 'dart:typed_data';
import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseService {
  static const String projectUrl = 'https://isjcjuacqgtdmhtslxvf.supabase.co';
  
  // Replace with your Supabase Anon / Publishable Key from Project Settings > API
  static String anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzamNqdWFjcWd0ZG1odHNseHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDAwMDAsImV4cCI6MjA1NTU1NTU1NX0.placeholder';

  static const String bucketName = 'discord-files';

  static SupabaseClient get client => Supabase.instance.client;

  /// Uploads a file to Supabase Storage with size validation
  static Future<String> uploadFile({
    required String fileName,
    required Uint8List bytes,
    required String mimeType,
  }) async {
    // Enforce 50 MB check in code
    const int maxBytes = 50 * 1024 * 1024;
    if (bytes.length > maxBytes) {
      throw Exception('File size exceeds the 50 MB maximum limit.');
    }

    final String path = 'public/${DateTime.now().millisecondsSinceEpoch}_$fileName';

    await client.storage.from(bucketName).uploadBinary(
      path,
      bytes,
      fileOptions: FileOptions(
        contentType: mimeType,
        upsert: true,
      ),
    );

    final String publicUrl = client.storage.from(bucketName).getPublicUrl(path);

    // Optional: Log record to 'files' table
    try {
      await client.from('files').insert({
        'file_name': fileName,
        'storage_path': path,
        'file_size': bytes.length,
        'mime_type': mimeType,
      });
    } catch (_) {
      // Ignore database insert if table is not yet migrated
    }

    return publicUrl;
  }

  /// Fetch bots from Supabase 'bots' table
  static Future<List<Map<String, dynamic>>> fetchBots() async {
    try {
      final data = await client.from('bots').select().order('name');
      return List<Map<String, dynamic>>.from(data);
    } catch (e) {
      return [];
    }
  }
}
