import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:file_picker/file_picker.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../constants/theme.dart';
import '../main.dart';
import '../services/supabase_service.dart';

class FilesScreen extends StatefulWidget {
  const FilesScreen({super.key});

  @override
  State<FilesScreen> createState() => _FilesScreenState();
}

class _FilesScreenState extends State<FilesScreen> {
  PlatformFile? _selectedFile;
  String? _errorMessage;
  double _uploadProgress = 0.0;
  String? _uploadedUrl;

  static const int maxFileSizeBytes = 50 * 1024 * 1024; // 50 MB

  Future<void> _pickFile() async {
    setState(() {
      _errorMessage = null;
      _uploadedUrl = null;
      _uploadProgress = 0.0;
    });

    final result = await FilePicker.platform.pickFiles(
      withData: true,
      allowMultiple: false,
    );

    if (result != null && result.files.isNotEmpty) {
      final file = result.files.first;

      // Strict 50 MB validation before upload!
      if (file.size > maxFileSizeBytes) {
        setState(() {
          _errorMessage = 'عذراً! حجم الملف يتجاوز الحد الأقصى (50 ميغابايت).';
          _selectedFile = null;
        });
        return;
      }

      setState(() {
        _selectedFile = file;
      });
    }
  }

  Future<void> _startUpload() async {
    if (_selectedFile == null || _selectedFile!.bytes == null) return;

    final uploadProvider = context.read<UploadStateProvider>();
    uploadProvider.setUploading(true);

    setState(() {
      _uploadProgress = 0.1;
      _errorMessage = null;
    });

    try {
      // Simulate progress tick for user feedback
      for (int i = 2; i <= 9; i++) {
        await Future.delayed(const Duration(milliseconds: 100));
        if (mounted) setState(() => _uploadProgress = i / 10);
      }

      final url = await SupabaseService.uploadFile(
        fileName: _selectedFile!.name,
        bytes: _selectedFile!.bytes!,
        mimeType: _selectedFile!.extension != null
            ? 'application/${_selectedFile!.extension}'
            : 'application/octet-stream',
      );

      if (mounted) {
        setState(() {
          _uploadProgress = 1.0;
          _uploadedUrl = url;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = 'فشل الرفع: $e';
        });
      }
    } finally {
      uploadProvider.setUploading(false);
    }
  }

  void _copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('تم النسخ إلى الحافظة بنجاح!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    final isUploading = context.watch<UploadStateProvider>().isUploading;

    return Scaffold(
      appBar: AppBar(
        title: Text(isArabic ? 'مركز الملفات 📁' : 'File Center 📁'),
        backgroundColor: DiscordColors.darkCanvas,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Upload Drop Area
            InkWell(
              onTap: isUploading ? null : _pickFile,
              borderRadius: BorderRadius.circular(16),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(28),
                decoration: BoxDecoration(
                  color: DiscordColors.darkSurface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: _selectedFile != null ? DiscordColors.blurple : DiscordColors.darkBorder,
                    width: 2,
                  ),
                ),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: DiscordColors.blurple.withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.cloud_upload_outlined, size: 36, color: DiscordColors.blurple),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      _selectedFile != null
                          ? _selectedFile!.name
                          : (isArabic ? 'اضغط لاختيار ملف من هاتفك' : 'Tap to select file from phone'),
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      isArabic ? 'الحد الأقصى: 50 MB (جميع الملفات مدعومة)' : 'Maximum: 50 MB (All file types)',
                      style: const TextStyle(fontSize: 11, color: DiscordColors.textMuted),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Error Message
            if (_errorMessage != null)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: DiscordColors.red.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: DiscordColors.red.withOpacity(0.3)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.error_outline, color: DiscordColors.red, size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        _errorMessage!,
                        style: const TextStyle(color: DiscordColors.red, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),

            // Selected File Details Card
            if (_selectedFile != null && _errorMessage == null)
              Container(
                margin: const EdgeInsets.only(top: 12),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: DiscordColors.darkSurface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: DiscordColors.darkBorder),
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.insert_drive_file, color: DiscordColors.blurple),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _selectedFile!.name,
                                style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
                                overflow: TextOverflow.ellipsis,
                              ),
                              Text(
                                '${(_selectedFile!.size / (1024 * 1024)).toStringAsFixed(2)} MB',
                                style: const TextStyle(fontSize: 11, color: DiscordColors.textMuted),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    if (!isUploading && _uploadedUrl == null) ...[
                      const SizedBox(height: 12),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: _startUpload,
                          icon: const Icon(Icons.upload),
                          label: Text(isArabic ? 'بدء الرفع الآن' : 'Start Upload'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: DiscordColors.blurple,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
              ),

            // Progress Bar
            if (isUploading) ...[
              const SizedBox(height: 16),
              LinearProgressIndicator(
                value: _uploadProgress,
                backgroundColor: DiscordColors.darkSurface,
                valueColor: const AlwaysStoppedAnimation<Color>(DiscordColors.blurple),
              ),
              const SizedBox(height: 6),
              Text(
                '${(_uploadProgress * 100).toInt()}%',
                style: const TextStyle(color: DiscordColors.blurple, fontWeight: FontWeight.bold, fontSize: 12),
              ),
            ],

            // Success & Link Card
            if (_uploadedUrl != null) ...[
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: DiscordColors.green.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: DiscordColors.green.withOpacity(0.3)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.check_circle, color: DiscordColors.green),
                        const SizedBox(width: 8),
                        Text(
                          isArabic ? 'تم الرفع بنجاح!' : 'Uploaded Successfully!',
                          style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    SelectableText(
                      _uploadedUrl!,
                      style: const TextStyle(fontSize: 12, color: DiscordColors.blurple, fontFamily: 'monospace'),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () => _copyToClipboard(_uploadedUrl!),
                            icon: const Icon(Icons.copy, size: 16),
                            label: Text(isArabic ? 'نسخ' : 'Copy'),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: () => Share.share(_uploadedUrl!),
                            icon: const Icon(Icons.share, size: 16),
                            label: Text(isArabic ? 'مشاركة' : 'Share'),
                            style: ElevatedButton.styleFrom(backgroundColor: DiscordColors.blurple),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
