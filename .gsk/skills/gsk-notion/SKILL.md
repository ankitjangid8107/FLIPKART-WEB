---
name: gsk-notion
version: 1.0.0
description: 'Notion page operations. Actions: search, read, create.'
metadata:
  category: general
  requires:
    bins:
    - gsk
  cliHelp: gsk notion --help
---

# gsk-notion

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

> **Note:** a unified `gsk connector` flow is rolling out (see `../gsk-connector/SKILL.md`: `gsk connector tools <id>` / `gsk connector call <id> -t <tool>`) and may not be enabled for every account yet. THIS command remains fully supported — use it directly, and it stays the fallback whenever `gsk connector` is unavailable.

Notion page operations. Actions: search, read, create.

## Usage

```bash
gsk notion [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<action>` (positional) | Yes | Action to perform. 'search': Search pages and databases; 'read': Read content from a page; 'create': Create a new page (string, one of: search, read, create) |
| `--query` | No | [search] Query to search for in Notion pages. Leave empty or omit to list all available documents. (string) |
| `--page_id` | No | [read] The ID of the Notion page to read and summarize. (string) |
| `--title` | No | [create] The title of the new page. (string) |
| `--content` | No | [create] The content of the page in markdown format. Supports headings, lists, code blocks, links, etc. (string) |
| `--parent_id` | No | [create] The ID of the parent page or database where the new page will be created. Use notion_search to find available pages/databases first. (string) |
| `--parent_type` | No | [create] The type of parent: 'page_id' for creating under a page, 'database_id' for creating in a database. Default is 'page_id'. (string, one of: page_id, database_id) |

## Write Confirmation (double-call)

Write actions (send / create / update / delete / react / upload, and write methods through `api` where present) may be confirmation-gated. A response carrying `status: "pending_confirmation"` (or a similar needs-confirmation payload) is NOT a failure — it executes nothing and summarizes what would happen. To complete the write, re-run the IDENTICAL command: the pending record (15-minute TTL) is matched and the operation executes; success clears the record (a further identical call pends again) and a failed execution keeps it, so the retry arc stays open. Where the Flags table lists `--skip_confirmation` for an action, passing `--skip_confirmation true` right after a pending response is honored; gated actions without that flag complete ONLY via the double-call.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
