# Phase 0 — Problems and Risks

| Severity | Finding | Status |
|---|---|---|
| Critical | Private RPCs are executable by anon according to information_schema grants | VERIFIED |
| Critical | Migration history exists in Supabase but corresponding migration files were not found in GitHub main | VERIFIED |
| High | Realtime publication contains only programs; target requires assignments + notifications | VERIFIED |
| High | Main client is still one monolithic index.html, not target modular architecture | VERIFIED |
| High | Live expense total is ₹39,286, not prompt baseline ₹28,786 | VERIFIED |
| High | Admin notification realtime subscription is missing | VERIFIED |
| High | WhatsApp outbox “mark as sent” state flow is missing from current UI | VERIFIED |
| High | PWA/service worker/manifest not found | VERIFIED |
| Medium | chart-enhancement.js remains as a separate legacy layer and another Render service still injects it | VERIFIED |
| Medium | Hash routing remains instead of clean URL routing | VERIFIED |
| Medium | Dialog ARIA/focus management not verified | VERIFIED/NOT FOUND |
| Medium | Empty/failed responses can replace state with empty arrays in current client | VERIFIED |
| Medium | Anonymous publishable-key HTTP test not completed | NOT VERIFIED |
| Medium | Exact mobile screenshots/measurements not completed | NOT VERIFIED |
| Low | Duplicate Render static services create deployment ambiguity | VERIFIED |

## Phase 0 recommendation
Do not start another redesign patch on main. Treat `feat/p0-audit` as the audit checkpoint branch. Reconcile database/source migration drift and fix the RPC grants before any new feature work. Preserve recovery/pre-redesign-2026-10-06 and restore-working-2026-10-03-da03.
