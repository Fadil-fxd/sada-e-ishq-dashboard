# Phase 0 — RLS and Auth

## Role model
Live database has exactly one active profile row: role=admin. No active artist profile is currently present.

The current frontend reads the role from `profiles` after Supabase Auth sign-in. The database has `is_admin()` and `is_active_artist()` SECURITY DEFINER functions that check role + active state.

## Programs RLS
Verified policy:
`programs_admin_all` for authenticated, using/checking `is_admin()`.
There is no anon or artist policy on programs.

## Other RLS
Verified policies exist for profiles, assignments, notifications, reminders, outbox, templates, senders, audit log, settings and backup/audit tables.

## Critical grant finding
Information-schema grants show broad default table privileges to `anon` and `authenticated` on several protected tables, including profiles, notifications, assignments, message_outbox and audit_log. RLS is currently the primary protection. Least-privilege grants are not yet implemented.

More importantly, information-schema routine grants show EXECUTE to `anon` and `authenticated` on many private RPCs, including save_program, confirm_program, delete_program, admin_set_approval, set_my_availability and internal trigger functions. Some RPC bodies perform role checks, but this does NOT satisfy the target requirement to revoke public/anon execution and grant only the intended roles.

## Anonymous access test
A true request using the public publishable key as an anonymous HTTP identity was NOT VERIFIED with the available toolchain. Do not claim it passed. The SQL/RLS metadata above is verified.

## Auth
One active admin profile is verified. Artist authentication is implemented in the client using a magic-link request, but a live artist account is NOT VERIFIED.

## Edge Functions
Live Supabase reports:
- sada-dashboard — ACTIVE, verify_jwt=false
- invite-artist — ACTIVE, verify_jwt=true

The target requires additional server-side functions for artist lifecycle, push and reminders. Only invite-artist is currently deployed from that list.
