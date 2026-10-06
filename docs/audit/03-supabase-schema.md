# Phase 0 — Supabase Schema

Project: `tdpxgxftlaklrezqseok`
Region: ap-south-1
Database: PostgreSQL 17.6

## programs
`id` is bigint.

Verified columns:
id, program_code, program_date, event_type, place, program_type, booking_source, income, expense, profit, created_at, updated_at, program_status, contact_name, contact_phone, notes, advance_received, balance_to_collect, updated_by, program_time, maps_url, alt_phone, required_artists, confirmed_at, cancelled_reason, deleted_at, version.

Existing lifecycle values are compatible with the requested compatibility model: enquiry, confirmed, completed, cancelled.

## Current public tables
admins, app_settings, audit_log, backup_log, message_outbox, message_templates, notifications, profiles, program_assignments, program_audit, program_backup_snapshots, program_reminders, programs, push_subscriptions, whatsapp_senders.

All these public tables currently have RLS enabled.

## Key indexes
- programs primary key on id
- unique programs_program_code_key
- programs date/status/deleted_at indexes
- program_assignments indexes on artist_id and program_id plus unique (program_id, artist_id)
- notifications recipient/created_at index

## Functions
Verified database functions include:
is_admin, is_active_artist, effective_status, next_program_code, save_program, save_and_confirm_program, confirm_program, cancel_program, delete_program, restore_program, set_my_availability, admin_set_approval, artist_my_programs, artist_program_detail, availability_summary, update_my_profile, public_upcoming_programs, dispatch_reminders.

## Triggers
Verified triggers include program audit, vNext program audit, programs updated_at, vNext version touch, and profile updated_at.

## Migration history
Supabase reports migrations through `vnext_007_atomic_confirm` dated 2026-10-06. The corresponding migration files were NOT found in the GitHub main tree during this audit. This is source/database migration drift and must be reconciled before future schema work.

## Realtime
`supabase_realtime` currently contains only `programs`. This is below the target specification.
