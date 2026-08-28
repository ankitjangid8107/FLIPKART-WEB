---
name: gsk-google-drive
version: 1.0.0
description: 'Google Drive file operations. Actions: list, search, read, upload, share.'
metadata:
  category: general
  requires:
    bins:
    - gsk
  cliHelp: gsk gdrive --help
---

# gsk-google-drive

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

> **Note:** a unified `gsk connector` flow is rolling out (see `../gsk-connector/SKILL.md`: `gsk connector tools <id>` / `gsk connector call <id> -t <tool>`) and may not be enabled for every account yet. THIS command remains fully supported — use it directly, and it stays the fallback whenever `gsk connector` is unavailable.

Google Drive file operations. Actions: list, search, read, upload, share.

## Usage

```bash
gsk gdrive [options]
```

**Aliases:** `gdrive`

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<action>` (positional) | Yes | Action to perform. 'list': List files directly inside a Google Drive folder; 'search': Search files by name, type, or owner; 'read': Read and extract content from a file; 'upload': Upload a new file to Google Drive, or overwrite an existing one in place by passing its file_id (the ID, link, and shares are preserved); 'share': Grant access to a file (specific emails or anyone-with-link; app-created/opened files only under drive.file) (string, one of: list, search, read, upload, share) |
| `--folder_id` | No | [list] Google Drive folder ID or folder URL. \| [search] Search within a specific folder for 'search' action. Accepts a folder ID or Google Drive folder URL. \| [upload] Google Drive folder ID to upload to. Optional, uploads to root if not specified. Ignored when 'file_id' is set. (string) |
| `--folder_url` | No | [list] Google Drive folder URL. \| [search] Google Drive folder URL to list/search within. (string) |
| `--mime_type` | No | [list] Optional MIME type filter. \| [search] Filter by MIME type for 'search' (e.g., 'application/pdf'). \| [upload] The MIME type of the file (optional, will be auto-detected from file_name extension). Examples: 'text/plain', 'text/csv', 'application/json', 'image/png'. (string) |
| `--trashed` | No | [list] Include trashed files. \| [search] Include trashed files in search results for 'search' action (boolean) |
| `--all_pages` | No | [list] List every page in the selected folder. Use for complete programmatic inventory; default false. (boolean) |
| `--query` | No | [search] Use keywords simply, terms will be combined into advanced search query in the later process.For example, if user ask for 'tax related documents', just use 'tax' as the query,DO NOT use advanced search query like 'name contains 'tax'' or 'fullText contains 'tax''. Use '*' to list all authorized files, especially when folder_id is supplied. (string) |
| `--owner` | No | [search] Filter by file owner (email address) for 'search' action (string) |
| `--file_id` | No | [read] The ID of the file to read from Google Drive. \| [upload] Existing Google Drive file ID to OVERWRITE in place instead of creating a new file (from google_drive search/list/upload results). The content is replaced while the file ID, link, and existing shares are preserved — use this when the user wants to update a document they already have, not get a new one. \| [share] Google Drive file ID to share (from google_drive search/list/upload results). (string) |
| `--question` | No | [read] The question to answer about the file content. (string) |
| `--raw_content` | No | [read] Return the complete converted document text (markdown) without question-answering. For programmatic consumers that need full fidelity; ignores 'question'. (boolean) |
| `--content` | No | [upload] Text content to create as a file. Use this for creating text-based files (e.g., .txt, .md, .csv, .json, .html). Provide exactly one of 'content', 'file_path', or 'file_url'. (string) |
| `--file_path` | No | [upload] Local server file path to upload (only resolvable when the caller IS the backend filesystem). For remote clients, pass 'file_url' instead. Provide exactly one of 'content', 'file_path', or 'file_url'. (string) |
| `--file_url` | No | [upload] URL whose bytes the server downloads and uploads. Accepts a Genspark file-wrapper URL (e.g. 'https://www.genspark.ai/api/files/s/<code>' or '.../api/files/v1/<encrypt>') or any public http(s) URL. Use this for binary files (.docx, .xlsx, .pptx, .pdf, images) or large text files that can't be passed inline via 'content'. Provide exactly one of 'content', 'file_path', or 'file_url'. (string) |
| `--file_name` | No | [upload] File name in Google Drive (include extension, e.g., 'report.txt'). MIME type will be auto-detected from extension if not specified. (string) |
| `--convert_to_google_format` | No | [upload] Whether to convert to Google Workspace format (e.g., .docx → Google Docs, .xlsx → Google Sheets, .pptx → Google Slides). Default: false (boolean, default: `False`) |
| `--share_publicly` | No | [upload] Whether to share the file publicly for viewing. Default: false (boolean, default: `False`) |
| `--share_type` | No | [share] 'user' (default) grants the people listed in ``emails``; 'anyone' makes the file accessible to anyone with the link. (string, one of: user, anyone) |
| `--emails` | No | [share] Email addresses to grant access to. Required when share_type is 'user'; ignored for 'anyone'. (array) |
| `--role` | No | [share] Access level to grant: 'reader' (default), 'commenter', or 'writer'. (string, one of: reader, commenter, writer) |
| `--send_notification` | No | [share] Send Google's notification email to the grantees (share_type 'user' only). Default: true. (boolean, default: `True`) |
| `--message` | No | [share] Optional personal message included in the notification email. (string) |

## Local File Support

Parameters that accept URLs (`--folder_url`, `--file_url`) also accept local file paths. The CLI automatically uploads local files before sending to the API.

## Write Confirmation (double-call)

Write actions (send / create / update / delete / react / upload, and write methods through `api` where present) may be confirmation-gated. A response carrying `status: "pending_confirmation"` (or a similar needs-confirmation payload) is NOT a failure — it executes nothing and summarizes what would happen. To complete the write, re-run the IDENTICAL command: the pending record (15-minute TTL) is matched and the operation executes; success clears the record (a further identical call pends again) and a failed execution keeps it, so the retry arc stays open. Where the Flags table lists `--skip_confirmation` for an action, passing `--skip_confirmation true` right after a pending response is honored; gated actions without that flag complete ONLY via the double-call.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
