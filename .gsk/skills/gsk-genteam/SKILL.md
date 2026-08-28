---
name: gsk-genteam
version: 1.0.0
description: 'GenTeam (Genspark team workspace) operations as the calling user. Actions:
  join, channels, agents, read, search, send, create_channel, update_channel, invite_link,
  members, tasks.'
metadata:
  category: general
  requires:
    bins:
    - gsk
  cliHelp: gsk genteam --help
---

# gsk-genteam

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

GenTeam (Genspark team workspace) operations as the calling user. Actions: join, channels, agents, read, search, send, create_channel, update_channel, invite_link, members, tasks.

## Usage

```bash
gsk genteam [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<action>` (positional) | Yes | Action to perform. 'join': Join a GenTeam workspace or channel from an invite link; 'channels': List the caller's workspaces, or one workspace's channels by server_slug; 'agents': List a workspace's agents visible to the caller by server_slug; each id is a mention target for send; 'read': Read recent messages from a channel, DM, or thread; 'search': Search a workspace (messages, tasks, members, channels, agents) by server_slug, or find-in-channel by channel_id; 'send': Send a message (text, attachment, or thread reply) to a channel or DM as the caller; supports native @mentions (humans and agents) and native quote replies; 'create_channel': Create a channel in a workspace; the caller becomes its manager and auto-joins; 'update_channel': Edit a channel's display name, description, or member permission switches (manager only); 'invite_link': Create, list, or revoke the invite links that genteam_join consumes (workspace or channel scoped); 'members': List, add, or remove channel members (humans and agents) by actor id; 'tasks': Task board: list a channel's or workspace's tasks, get one task with its event history, claim/unclaim it, or change its status (string, one of: join, channels, agents, read, search, send, create_channel, update_channel, invite_link, members, tasks) |
| `--invite_url` | No | [join] Full invite link URL, including the token query parameter. (string) |
| `--invite_id` | No | [join] Invite link id (alternative to invite_url; requires token). \| [invite_link] Invite link id to revoke (from op=list or the create result). (string) |
| `--token` | No | [join] Invite link token (alternative to invite_url; requires invite_id). (string) |
| `--server_slug` | No | [channels] Workspace slug (from the workspace list or a GenTeam URL path segment). \| [agents] Workspace slug (from genteam_list_channels or a GenTeam URL path segment). \| [search] Workspace slug (from genteam_list_channels or a GenTeam URL path segment). Required unless channel_id is given. \| [create_channel] Workspace slug (from genteam_list_channels or a GenTeam URL path segment). \| [invite_link] Workspace slug; required unless channel_id is given. \| [tasks] list: workspace slug (from genteam_list_channels) for the caller's cross-channel board. (string) |
| `--mine` | No | [agents] When true, return only agents the caller created. Default false. (boolean) |
| `--channel_id` | No | [read] Channel id (from genteam_list_channels). \| [search] Find-in-channel target (from genteam_list_channels). When given, the search is scoped to this one channel. \| [send] Target channel id (from genteam_list_channels). \| [update_channel] Channel id (from genteam_list_channels). \| [invite_link] Channel id — scopes create/list to that channel's join links. \| [members] Channel id (from genteam_list_channels). \| [tasks] list: channel board target (from genteam_list_channels). Mutually exclusive with server_slug. (string) |
| `--limit` | No | [read] Messages to return (1..200). Default 20. \| [search] Workspace mode only: max hits per group (default 8). Channel mode pages are a fixed 20 per request. \| [tasks] list (channel mode): page size, 1..100 (default 20). (integer) |
| `--before_message_id` | No | [read] Message id cursor: return messages strictly older than this id. (string) |
| `--after_message_id` | No | [read] Message id cursor: return messages strictly newer than this id. Mutually exclusive with before_message_id. (string) |
| `--query` | No | [search] Search keywords. (string) |
| `--scope` | No | [search] Workspace mode: everything (default), messages, tasks, members, channels, or agents. Channel mode: messages (default), contacts, or files. (string) |
| `--cursor` | No | [search] Channel mode only: opaque paging cursor echoed by the previous page. \| [tasks] list (channel mode): opaque paging cursor echoed by the previous page as next_cursor. (string) |
| `--content` | No | [send] Plain-text message body; with file_path it is the attachment caption (optional in that case). (string) |
| `--file_path` | No | [send] File to attach: a Genspark file-wrapper URL (https://…/api/files/s/<code>, from `gsk upload`) or an AI Drive path (aidrive://…). (string) |
| `--file_name` | No | [send] Display file name for the attachment; defaults to the name derived from file_path. (string) |
| `--mentions` | No | [send] Members to @mention — humans or agents: agent ids (agent_…, from genteam_list_agents), human member ids (UUID), or exact display names (must be unambiguous in the channel). Each must already be a member of the target channel. Mention chips are rendered natively and the mentioned members are notified (agents wake and process the message). (array) |
| `--quote_message_id` | No | [send] comet_message_id of an existing message in this channel (from genteam_read) to quote — renders as the app's native quote block. Text sends only. (string) |
| `--operation_id` | No | [send] Idempotency key: retries with the same operation_id return the already-sent message instead of posting a duplicate. (string) |
| `--name` | No | [create_channel] Channel slug: lowercase letters, digits, '-' and '_', max 30 chars (e.g. 'release-train'). Immutable after creation — URLs and mentions depend on it; only display_name can change later. (string) |
| `--display_name` | No | [create_channel] Optional human-readable channel name (max 80 chars). \| [update_channel] New human-readable channel name (max 80 chars); empty string clears the override. (string) |
| `--description` | No | [create_channel] Optional channel description (max 500 chars). \| [update_channel] New channel description (max 500 chars); empty string clears it. (string) |
| `--member_invite_enabled` | No | [update_channel] Whether ordinary members may create invite links for this channel. (boolean) |
| `--member_agent_add_enabled` | No | [update_channel] Whether ordinary members may add their own agents to this channel. (boolean) |
| `--op` | No | [invite_link] Operation to perform. \| [members] Operation to perform. \| [tasks] Operation to perform. (string, one of: create, list, revoke) |
| `--max_uses` | No | [invite_link] create: how many joins the link allows (default per workspace size). (integer) |
| `--expires_days` | No | [invite_link] create: link validity in days (default per workspace size). (integer) |
| `--actor_type` | No | [members] add/remove: whether the target is a human or an agent. (string, one of: human, agent) |
| `--actor_id` | No | [members] add/remove: the member id — a cogen UUID for humans, an agent_… id for agents. (string) |
| `--task_id` | No | [tasks] get/claim/unclaim/status: the task id (task_…, from op=list). (string) |
| `--status` | No | [tasks] op=list: status filter — active (default, = not done), all, or a comma list of todo, in_progress, in_review, done. op=status: the new status (one of those four). (string) |
| `--reason` | No | [tasks] op=status: optional note recorded on the status-change event. (string) |
| `--involvement` | No | [tasks] list (channel mode): me narrows to tasks the caller has a tie to (assignee, requester, creator, or thread participant). Default all. (string, one of: all, me) |
| `--assignee` | No | [tasks] list: assignee filter — current (the caller), unassigned, agent:<id>, or human:<cogen_id>. (string) |
| `--requester` | No | [tasks] list: requester/owner filter — same forms as assignee. (string) |

## Local File Support

Parameters that accept URLs (`--invite_url`) also accept local file paths. The CLI automatically uploads local files before sending to the API.

## Write Confirmation (double-call)

Write actions (send / create / update / delete / react / upload, and write methods through `api` where present) may be confirmation-gated. A response carrying `status: "pending_confirmation"` (or a similar needs-confirmation payload) is NOT a failure — it executes nothing and summarizes what would happen. To complete the write, re-run the IDENTICAL command: the pending record (15-minute TTL) is matched and the operation executes; success clears the record (a further identical call pends again) and a failed execution keeps it, so the retry arc stays open. Where the Flags table lists `--skip_confirmation` for an action, passing `--skip_confirmation true` right after a pending response is honored; gated actions without that flag complete ONLY via the double-call.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
