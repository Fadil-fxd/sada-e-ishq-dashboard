# Phase 0 — Data Flow

## Supabase is currently the master
The database contains 26 rows in `public.programs`. The current main client loads admin programs with a direct `select('*')`; artists load via `artist_my_programs()`.

## Current finance facts
Live database query:
- rows: 26
- income: ₹355,000
- expense: ₹39,286
- advance_received: ₹4,002

Important: the original implementation prompt says expense ₹28,786. That figure is STALE relative to the live database. No migration or UI change should overwrite the live value to match the prompt. The current live database is authoritative.

## Finance calculation
Current client normalises:
- balance = max(income - advance_received, 0)
- profit = income - expense

The server RPCs also recompute balance. There is not yet a single frontend `domain/finance.js` module because the app remains monolithic.

## Writes
- `save_program()` is SECURITY DEFINER and admin-gated.
- `save_and_confirm_program()` performs save + confirmation effects in one transaction and is admin-gated.
- `confirm_program()` is admin-gated.
- `set_my_availability()` is the artist write path.
- Soft delete/restore RPCs exist in the database.

## Realtime
Database publication currently contains only `programs`. The target requires notifications and assignments too.
Current client subscribes to:
- admin: programs + assignments
- artist: own assignments + own notifications

The admin client does not subscribe to notifications in the current source.

## Cache
The current client removes a per-user localStorage key on sign-out. A broader persistent cache strategy is NOT VERIFIED.

## Data safety
The current source uses `x.data || []` in several loads, so the specified “never replace good state with empty/failed data” rule is NOT fully verified in the current client.
