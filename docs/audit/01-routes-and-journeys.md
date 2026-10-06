# Phase 0 — Routes and Journeys

## Current source
The current main app uses hash URLs such as `#/`, `#/programs`, etc., while also calling `history.pushState` and listening to `popstate`. This is NOT the specified clean History API route structure yet.

### Admin views found in source
overview, programs, calendar, availability, artists, finance, fund, analytics, notifications, settings.

### Artist views found in source
home, shows, calendar, notifications, profile.

### Admin journey
Welcome → Admin sign-in → profile role lookup → Admin UI → load programs/profiles/notifications → CRUD via RPCs → confirm workflow → artist availability/approval → WhatsApp composer → ICS calendar download.

### Artist journey
Welcome → Artist email magic-link request → role/profile check → `artist_my_programs()` → availability response via `set_my_availability()` → calendar/ICS → notifications/profile.

### WhatsApp
Verified Stage-A style `wa.me` opening exists in `index.html`. The UI prepares a message and opens WhatsApp on the signed-in admin device. However, the current UI does NOT implement the requested outbox state transition `draft → ready → sent/skipped`, nor a truthful “Mark as sent” flow.

### Excel
Current live main source does not show an Excel integration. The old dashboard footer described an Excel → Sync Agent → Supabase flow, but its current implementation location is NOT VERIFIED. No Excel sync code was verified in the current main `index.html`.

### Backups
Supabase currently has `program_backup_snapshots`, `backup_log`, and an active daily `pg_cron` backup job. A full external CSV/JSON/schema backup artifact was NOT VERIFIED in the repository.

## Missing / incomplete target journeys
- Artist invite/reset/deactivation UI is only partially represented; only one Edge Function (`invite-artist`) is currently deployed.
- Push delivery infrastructure is NOT VERIFIED.
- PWA/service worker/manifest are absent from current `index.html`.
- Google Calendar deep link is NOT VERIFIED.
- Full notifications realtime for admins is incomplete in the current client.
