---
name: gsk-phone-call
version: 1.0.0
description: >-
  Make a real AI phone call on the user's behalf. Validates prerequisites
  (membership, phone setup, credits), resolves the contact, then dials and returns
  status, real audio duration, dial attempts, summary, and transcript. After every
  call, present the outcome, disclose every dial attempt, point to call_log or
  call_detail, and show short transcripts inline. Never fabricate a phone number or
  Maps place_id; contact_info must have verified lineage. A dry run validates only
  and never places a call. On code=setup_incomplete, show setup_url, wait for setup,
  and use phone_call_setup_status before retrying.
metadata:
  category: phone-call
  requires:
    bins:
    - gsk
  cliHelp: gsk telephony call dial --help
---

# gsk-phone-call

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Make a real AI phone call on the user's behalf. Validates prerequisites (membership, phone setup, credits), resolves the contact (Google Maps place data for businesses; number validation for personal contacts), then dials, converses by voice, and returns the outcome: call status, true audio duration (audio_duration_seconds), dial attempts (dial_attempts), summary, and transcript. A persistent call record (summary, transcript, recording) is saved with the call's project.
MANDATORY after every call, without being asked: (1) present the outcome to the user — who was called, final status, real call duration, and the key result; (2) disclose EVERY dial attempt made, including automatic retries and any accidental extra dials; (3) tell the user a persistent call record exists and how to see it (the call_log / call_detail tools, or the call's project page). Show the transcript inline when short; offer it otherwise.
Phone numbers must have verifiable lineage (user-provided, prior tool results, or the built-in Maps lookup) — never fabricate a number. contact_info accepts a phone number, a calllog: contact_ref, or a Google Maps place_id from maps_search — the type is detected automatically from its shape. With --dry-run, only validates and resolves the contact (plus the from_number choice when one is given); no call is placed.
First-time users must finish a one-time web setup before any real call: if the result carries code=setup_incomplete, show the user its setup_url (browser page ending in a short test call to their own phone), wait for them to confirm, then retry. Use phone_call_setup_status to pre-check instead of dialing blind when the user may not have set up yet.

## Usage

```bash
gsk telephony call dial [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<recipient>` (positional) | Yes | The name of the person or business to call. Examples: - Personal: 'John Smith', 'Dr. Sarah Johnson' - Business: 'Starbucks George Street', 'Hilton Hotel Downtown' (string) |
| `-c`, `--contact_info` | Yes | Contact information — a phone number, a calllog: contact_ref, or a Google Maps place_id; the type is detected automatically from its shape.  **Phone numbers**: include the international country code ('+1-555-123-4567'); numbers without one are treated as US. MUST have verified data lineage from (1) user-provided info, (2) previous tool results, or (3) explicit context — NEVER fabricate, estimate, or infer a number.  **calllog: contact_ref** (from the call_log tool's contacts view, `--view contacts`): the preferred way to re-dial someone previously called — their real number stays masked.  **Google Maps place_id** (e.g. 'ChIJcawkWTyuEmsRG56o5LAc0LQ'): must come from maps_search results — never fabricate or guess one. The call then uses the business's Maps phone number and enriches the call record with the place data. (string) |
| `-p`, `--purpose` | Yes | The clear reason for making the call (e.g., 'Check reservation availability', 'Inquire about business hours'). (string) |

> **CAUTION:** This command performs a write/send operation. Double-check parameters before executing.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
