# Phase 0 — Workflow Maps

## Admin
Auth → role/profile verification → dashboard → programs → save enquiry/edit → confirm transaction → artist assignments/notifications → availability review → approval → client WhatsApp composer → calendar/finance/analytics.

## Artist
Magic-link auth → active artist profile → assigned show list → availability response → admin approval → notification → calendar/ICS.

## Client
Client data is stored on programs. Current client-facing communication is manual WhatsApp opening through the admin device. No automated client portal was verified.

## Data
Supabase programs is master. Client source contains direct admin reads plus RPC writes. Excel is NOT VERIFIED in the current main source.

## Notifications
Database notifications table + artist client subscription exist. Admin live notification subscription is missing in current main.

## Backup
Daily Supabase cron job calls capture_program_backup(). Backup snapshot tables exist. External CSV/JSON/schema backup files are NOT VERIFIED.

## WhatsApp
Current Stage A link flow is verified. Stage B Cloud API is not deployed.

## Deployment
Render live service auto-deploys main. Several duplicate static services also point at main, increasing ambiguity over which service represents production.
