---
name: gsk-slack
version: 1.0.0
description: 'Slack messaging operations. Actions: send, search, read, lookup, react,
  upload, update, delete, permalink, connect_invites, connect_approve, connect_decline.'
metadata:
  category: general
  requires:
    bins:
    - gsk
  cliHelp: gsk slack --help
---

# gsk-slack

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

> **Note:** a unified `gsk connector` flow is rolling out (see `../gsk-connector/SKILL.md`: `gsk connector tools <id>` / `gsk connector call <id> -t <tool>`) and may not be enabled for every account yet. THIS command remains fully supported — use it directly, and it stays the fallback whenever `gsk connector` is unavailable.

Slack messaging operations. Actions: send, search, read, lookup, react, upload, update, delete, permalink, connect_invites, connect_approve, connect_decline.

## Usage

```bash
gsk slack [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<action>` (positional) | Yes | Action to perform. 'send': Send a message to a channel or user; 'search': Search messages by keyword; 'read': Read recent message history of a channel (or one thread); 'lookup': Look up users, channels, or groups; 'react': Emoji-react to a message (or remove your reaction); 'upload': Upload a file into a channel, group, or DM; 'update': Edit one of the user's own messages; 'delete': Delete one of the user's own messages; 'permalink': Get the permanent link for a message; 'connect_invites': List pending Slack Connect shared-channel invites (workspace owner/admin only); 'connect_approve': Approve a pending Slack Connect shared-channel invite by invite ID (workspace owner/admin only); 'connect_decline': Decline a pending Slack Connect shared-channel invite by invite ID (workspace owner/admin only) (string, one of: send, search, read, lookup, react, upload, update, delete, permalink, connect_invites, connect_approve, connect_decline) |
| `--message` | No | [send] The message content to send. Supports Slack markdown formatting. To @mention someone, embed '<@USER_ID>' (e.g. '<@U01234567>') in the text — a plain '@Name' renders as literal text and notifies nobody. User IDs come from the lookup action. 'content' is accepted as an alias for this parameter. (string) |
| `--recipient` | No | [send] Optional recipient: 'self' (default), channel ID (e.g., 'C01234567'), or user ID (e.g., 'U01234567'). If not specified, sends to yourself. (string) |
| `--title` | No | [send] Optional title for the message. If provided, creates a rich formatted message with a header. \| [upload] Optional title shown on the Slack file card. Defaults to the file name. (string) |
| `--fields` | No | [send] Optional array of field objects with 'title' and 'value' keys to create a structured message layout. (array) |
| `--thread_ts` | No | [send] Optional thread timestamp to reply in a thread. \| [read] Timestamp ('ts') of a thread's parent message. When set, returns that thread's replies instead of the channel timeline. \| [upload] Optional thread timestamp — share the file as a reply in this thread instead of the conversation root. (string) |
| `--query` | No | [search] The search query. You can use modifiers like 'in:#channel', 'from:@user', 'has:link', 'before:yyyy-mm-dd'. (string) |
| `--count` | No | [search] The maximum number of messages to return. Default is 100. \| [connect_invites] Maximum number of invites to return (default 100). (integer) |
| `--sort` | No | [search] Sort order of results. 'score' for relevance or 'timestamp' for time. Default is 'score'. (string) |
| `--question` | No | [search] A specific question to answer based on the search results. (string) |
| `--channel` | No | [read] Conversation ID (channel 'C…', private group 'G…', or DM 'D…') or a channel name (e.g. '#general' or 'general'). IDs come from the lookup action. \| [react] Conversation ID containing the message (channel 'C…', private group 'G…', or DM 'D…'). \| [upload] Target conversation ID (channel 'C…', private group 'G…', or DM 'D…') the file is shared into. \| [update] Conversation ID containing the message (channel 'C…', private group 'G…', or DM 'D…'). \| [delete] Conversation ID containing the message (channel 'C…', private group 'G…', or DM 'D…'). \| [permalink] Conversation ID containing the message (channel 'C…', private group 'G…', or DM 'D…'). (string) |
| `--limit` | No | [read] Maximum messages to return (default 20, max 100). \| [lookup] Maximum number of results to return. Default: 50 (integer) |
| `--cursor` | No | [read] Pagination cursor from a previous call's next_cursor to fetch older messages. \| [connect_invites] Pagination cursor from a previous response's 'next_cursor'; omit on the first call. (string) |
| `--lookup_type` | No | [lookup] What to look up: 'users' for team members, 'channels' for channels/conversations, 'all' for both. (string, one of: users, channels, all) |
| `--search_query` | No | [lookup] Optional search query to filter results by name. Case-insensitive partial match on name, display name, or real name. (string) |
| `--include_bots` | No | [lookup] Whether to include bot users in results. Default: false (boolean) |
| `--timestamp` | No | [react] The message's 'ts' value (e.g. '1752600000.000100'). \| [update] The message's 'ts' value (e.g. '1752600000.000100'). Must be a message the connected user authored. \| [delete] The message's 'ts' value (e.g. '1752600000.000100'). Must be a message the connected user authored. \| [permalink] The message's 'ts' value (e.g. '1752600000.000100'). (string) |
| `--reaction` | No | [react] Slack emoji name without colons, e.g. 'thumbsup', '+1', 'heart', 'joy'. (string) |
| `--remove` | No | [react] Set true to remove your existing reaction of this emoji instead of adding it. Default: false. (boolean) |
| `--content` | No | [upload] Text content to upload as a file (UTF-8). Provide exactly one of 'content' or 'file_path'. (string) |
| `--file_path` | No | [upload] File to upload: a local server file path, a Genspark file-wrapper URL (https://…/api/files/s/<code>), or an AI Drive path (aidrive://…). Provide exactly one of 'content' or 'file_path'. (string) |
| `--file_name` | No | [upload] File name shown in Slack (include the extension, e.g. 'report.pdf'). Required with 'content'; defaults to the path basename for 'file_path'. (string) |
| `--initial_comment` | No | [upload] Optional message text posted together with the file. (string) |
| `--skip_confirmation` | No | [update] Skip the user-confirmation step. Only honored right after this tool returned pending_confirmation and the user confirmed. Default: false. \| [delete] Skip the user-confirmation step. Only honored right after this tool returned pending_confirmation and the user confirmed. Default: false. \| [connect_approve] Skip the user-confirmation step. Only honored right after this tool returned pending_confirmation and the user confirmed. Default: false. \| [connect_decline] Skip the user-confirmation step. Only honored right after this tool returned pending_confirmation and the user confirmed. Default: false. (boolean) |
| `--auto_skip_confirmation` | No | [update] Internal: set by workflow nodes configured with skip_confirmation=true. Default: false. \| [delete] Internal: set by workflow nodes configured with skip_confirmation=true. Default: false. \| [connect_approve] Internal: set by workflow nodes configured with skip_confirmation=true. Default: false. \| [connect_decline] Internal: set by workflow nodes configured with skip_confirmation=true. Default: false. (boolean) |
| `--text` | No | [update] The full replacement text (mrkdwn) — Slack replaces the whole message body, not a diff. (string) |
| `--invite_id` | No | [connect_approve] The Slack Connect invite ID (e.g. 'I…'), from the connect_invites list. \| [connect_decline] The Slack Connect invite ID (e.g. 'I…'), from the connect_invites list. (string) |
| `--target_team` | No | [connect_approve] Optional team/enterprise ID of the other party in the invitation. \| [connect_decline] Optional team/enterprise ID of the other party in the invitation. (string) |

## Write Confirmation (double-call)

Write actions (send / create / update / delete / react / upload, and write methods through `api` where present) may be confirmation-gated. A response carrying `status: "pending_confirmation"` (or a similar needs-confirmation payload) is NOT a failure — it executes nothing and summarizes what would happen. To complete the write, re-run the IDENTICAL command: the pending record (15-minute TTL) is matched and the operation executes; success clears the record (a further identical call pends again) and a failed execution keeps it, so the retry arc stays open. Where the Flags table lists `--skip_confirmation` for an action, passing `--skip_confirmation true` right after a pending response is honored; gated actions without that flag complete ONLY via the double-call.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
