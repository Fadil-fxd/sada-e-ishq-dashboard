# Phase 0 — Mobile UX Audit

## Source measurements verified
Current main source contains mobile breakpoints at approximately 1279px, 900px and 767px, plus a <=380px adjustment.
Inputs in the newer vNext source use 16px sizing in several mobile forms and bottom-nav buttons are present.

## Target rules
The requested rules are: no text below 12px, body 14–16px, inputs >=16px, touch targets >=44x44px, no horizontal overflow at 320px, WCAG AA.

## Current deviations
The source still contains many 7–11px UI labels, status labels and table text. Therefore the “no text below 12px” rule is NOT met.
The exact measured touch-target matrix at 375x812, 390x844, 768x1024 and 1440x900 is NOT VERIFIED because a browser screenshot/measurement environment was not available in this audit.

Dialog accessibility attributes `role="dialog"` and `aria-modal` were NOT found in the current main source. Focus trapping/return-focus is NOT VERIFIED.

A browser visual pass on the live Render URL is still required before P1/P4 acceptance.
