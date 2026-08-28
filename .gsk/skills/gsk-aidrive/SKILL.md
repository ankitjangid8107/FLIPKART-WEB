---
name: gsk-aidrive
version: 1.0.0
description: 'AI-Drive file storage and management. Actions: ls, find, mkdir, rm,
  move, get_readable_url, download, download_video, download_audio, download_file,
  upload. `ls` lists ONE directory (non-recursive) — to locate files by name anywhere
  in the drive, use `find` (one indexed query) instead of walking directories with
  repeated `ls`. `download <ai-drive-path> [local-path]` copies a drive file OUT to
  local disk (the path may be spelled `aidrive://...`); `download_file --file_url
  <url>` goes the OPPOSITE direction, saving an external URL INTO the drive.'
metadata:
  category: general
  requires:
    bins:
    - gsk
  cliHelp: gsk drive --help
---

# gsk-aidrive

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

AI-Drive file storage and management. Actions: ls, find, mkdir, rm, move, get_readable_url, download, download_video, download_audio, download_file, upload. `ls` lists ONE directory (non-recursive) — to locate files by name anywhere in the drive, use `find` (one indexed query) instead of walking directories with repeated `ls`. `download <ai-drive-path> [local-path]` copies a drive file OUT to local disk (the path may be spelled `aidrive://...`); `download_file --file_url <url>` goes the OPPOSITE direction, saving an external URL INTO the drive.

## Usage

```bash
gsk drive [options]
```

**Aliases:** `drive`

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<action>` (positional) | Yes | Action to perform (string, one of: ls, find, mkdir, rm, move, get_readable_url, download, download_video, download_audio, download_file, upload) |
| `--workspace` | No | AI Drive workspace. personal (default) is your own Drive, shared reaches folders other people shared with you, and public_brain is the system-owned Ask Org public knowledge workspace when you have editor access. (string, one of: personal, public_brain, shared, default: `personal`) |
| `--share` | No | Which shared folder to work in, by name or id. Only for workspace=shared; omit it with ls to list everything shared with you. (string) |
| `--to` | No | Who to share with, for the share/unshare actions: an email address, or 'org' / 'group:<uid>' for a whole organization or one of its groups. (string) |
| `--permission` | No | What the recipient may do: view or edit (share action). The link audience can only ever view. (string, one of: view, edit, default: `view`) |
| `--general_access` | No | Who else can open it, for the share action without a recipient: restricted, org, or link. (string, one of: restricted, org, link) |
| `--organization_id` | No | Which organization to share with, when you belong to more than one and use to=org or to=group:<uid>. (string) |
| `--expires_at` | No | Optional ISO-8601 UTC instant after which the access stops, e.g. 2026-12-31T00:00:00+00:00. (string) |
| `-p`, `--path` | No | Path to file or folder for actions: ls, mkdir, rm, move, get_readable_url. For compress: folder path to compress. For decompress: archive file path to decompress. For find: directory to search within (default '/' searches everywhere). (string) |
| `-q`, `--query` | No | Filename search keyword for find action. Matches files and directories whose name contains the keyword. Case-insensitive. Supports partial matches. (string) |
| `-f`, `--filter_type` | No | Filter by entry type for ls action (improves performance): all (default), file, directory. Use 'file' when only need files. (string, one of: all, file, directory) |
| `--file_type` | No | Filter by file MIME type for ls action (improves performance): all (default), audio, video, image. Combine with filter_type='file' for best results. (string, one of: all, audio, video, image) |
| `--target_path` | No | Destination path, for move action only (string) |
| `--target_folder` | No | Destination folder, for download_video, download_audio and download_file actions (string) |
| `--video_url` | No | URL of video to download, for download_video action (string) |
| `--audio_url` | No | URL of audio/video to download audio from, for download_audio action (string) |
| `--file_url` | No | URL of file to download, for download_file action (string) |
| `--file_name` | No | User-friendly filename with appropriate extension (e.g. annual_report.pdf) for download_file action. If not provided, system will auto-generate filename (string) |
| `--file_content` | No | Content to upload to AI Drive. Can be plain text or base64-encoded binary data. For text files (txt, md, json, csv, etc.), provide plain text content. For binary files, provide base64-encoded content with 'base64:' prefix. Size limit: 1MB without confirmation, 5MB absolute maximum. (string) |
| `--upload_path` | No | Target path for upload action (must start with '/' and include filename). To upload a new version of an existing file, reuse the same path with overwrite=true instead of creating v2/_final name variants; give genuinely new artifacts (e.g. each run of a recurring workflow) their own path. Create parent directories with mkdir action first if they don't exist. (string) |
| `--overwrite` | No | Set to true to overwrite the existing file at upload_path (upload action only; default false fails if the path exists). (boolean) |
| `--content_type` | No | MIME type of the content. If not provided, will be auto-detected from filename. Common types: text/plain, text/markdown, application/json, text/csv (string) |
| `--confirmed` | No | Set to true to confirm upload when: (1) file size > 1MB, or (2) content contains potentially sensitive patterns. If confirmation is required but not provided, upload will fail with a warning. (boolean) |

## Local File Support

Parameters that accept URLs (`--video_url`, `--audio_url`, `--file_url`) also accept local file paths. The CLI automatically uploads local files before sending to the API.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
