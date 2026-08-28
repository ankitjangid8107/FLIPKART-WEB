---
name: gsk-google-chat
version: 1.0.0
description: 'Google Chat operations. Actions: list_spaces, read, list_members, send,
  upload, react, update, delete. Sent messages carry a visible Genspark app attribution
  next to the sender''s name (added by Google, cannot be hidden).'
metadata:
  category: general
  requires:
    bins:
    - gsk
  cliHelp: gsk google_chat --help
---

# gsk-google-chat

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

> **Note:** a unified `gsk connector` flow is rolling out (see `../gsk-connector/SKILL.md`: `gsk connector tools <id>` / `gsk connector call <id> -t <tool>`) and may not be enabled for every account yet. THIS command remains fully supported — use it directly, and it stays the fallback whenever `gsk connector` is unavailable.

Google Chat operations. Actions: list_spaces, read, list_members, send, upload, react, update, delete. Sent messages carry a visible Genspark app attribution next to the sender's name (added by Google, cannot be hidden).

## Usage

```bash
gsk google_chat [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<action>` (positional) | Yes | Action to perform. 'list_spaces': List spaces (rooms, group chats, and DMs); 'read': Read recent messages from a space; 'send': Send a message to a space (recipients see a Genspark app label next to the sender's name — Google adds it, it cannot be hidden); 'upload': Upload a file (local path, file-wrapper URL, AI Drive path, or text content) to a space as a message attachment; 'update': Edit the text of one of your own messages; 'delete': Delete one of your own messages; 'react': Add or remove an emoji reaction on a message (unicode emoji; remove affects your own reaction only); 'list_members': List all members of a space (full roster) (string, one of: list_spaces, read, send, upload, update, delete, react, list_members) |
| `--search_query` | No | [list_spaces] Optional case-insensitive filter on the space display name. (string) |
| `--limit` | No | [list_spaces] Maximum number of spaces to return (1-200). Default: 50 \| [read] Maximum number of messages to return (1-100). Default: 25 (integer) |
| `--space` | No | [read] Space resource name, e.g. 'spaces/AAAAxxxx'. \| [send] Space resource name, e.g. 'spaces/AAAAxxxx'. \| [upload] Space resource name, e.g. 'spaces/AAAAxxxx'. \| [list_members] Space resource name, e.g. 'spaces/AAAAxxxx'. (string) |
| `--thread` | No | [read] Optional thread resource name (e.g. 'spaces/AAAAxxxx/threads/yyyy') to return only that thread's messages — e.g. to verify where a threaded reply landed. \| [send] Optional thread resource name (e.g. 'spaces/AAAAxxxx/threads/yyyy') to reply in a thread. Omit to start a new thread. If the thread cannot be replied to, the API starts a NEW thread instead — the response then carries 'thread_fallback': true and 'actual_thread' (set 'strict_thread' to fail instead). \| [upload] Optional thread resource name (e.g. 'spaces/AAAAxxxx/threads/yyyy') to attach in a thread. Omit to start a new thread. If the thread cannot be replied to, the API starts a NEW thread instead — the response then carries 'thread_fallback': true and 'actual_thread' (set 'strict_thread' to fail instead). (string) |
| `--message` | No | [send] The message text to send. Supports Google Chat formatting. To @mention someone, embed '<users/{user_id}>' in the text — a plain '@Name' renders as literal text and notifies nobody. User ids come from google_chat_list_members ('user' field) or the 'mentions' field on read messages; '<users/all>' mentions the whole space. 'content' is accepted as an alias for this parameter. \| [upload] Optional caption text sent with the attachment. \| [update] Message resource name to edit, e.g. 'spaces/AAAAxxxx/messages/yyyy'. \| [delete] Message resource name to delete, e.g. 'spaces/AAAAxxxx/messages/yyyy'. \| [react] Message resource name, e.g. 'spaces/AAAAxxxx/messages/yyyy'. (string) |
| `--strict_thread` | No | [send] If true and 'thread' is set, fail with an error when the thread cannot be replied to instead of falling back to a new thread. Default: false. \| [upload] If true and 'thread' is set, fail with an error when the thread cannot be replied to instead of falling back to a new thread. Default: false. (boolean, default: `False`) |
| `--file_path` | No | [upload] Path or URL of the file to upload. Accepts (1) a local server filesystem path; (2) a Genspark file-wrapper URL (``https://www.genspark.ai/api/files/s/<code>``); or (3) an AI Drive path (``/mnt/aidrive/...``, ``/aidrive/...``, ``aidrive://...``). Mutually exclusive with ``content``. (string) |
| `--content` | No | [upload] Text content to upload as the file body (UTF-8). Requires ``file_name``. Mutually exclusive with ``file_path``. (string) |
| `--file_name` | No | [upload] File name including extension (e.g. 'report.pdf'). Required with ``content``; defaults to the source basename with ``file_path``. (string) |
| `--text` | No | [update] The new message text (replaces the current text). Supports Google Chat formatting, including '<users/{user_id}>' @mention syntax (a plain '@Name' is literal text, not a mention). (string) |
| `--emoji` | No | [react] The emoji as a unicode character, e.g. '👍' or '🎉'. (string) |
| `--remove` | No | [react] true removes YOUR OWN existing reaction instead of adding one. Default: false. (boolean, default: `False`) |

## Write Confirmation (double-call)

Write actions (send / create / update / delete / react / upload, and write methods through `api` where present) may be confirmation-gated. A response carrying `status: "pending_confirmation"` (or a similar needs-confirmation payload) is NOT a failure — it executes nothing and summarizes what would happen. To complete the write, re-run the IDENTICAL command: the pending record (15-minute TTL) is matched and the operation executes; success clears the record (a further identical call pends again) and a failed execution keeps it, so the retry arc stays open. Where the Flags table lists `--skip_confirmation` for an action, passing `--skip_confirmation true` right after a pending response is honored; gated actions without that flag complete ONLY via the double-call.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
