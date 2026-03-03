

# Fix: "Meet the witness" Button — Copy and Quality

## The Change

In `src/components/TheInvitation.tsx`, line 318, replace "Meet the witness" with "Hear my story" — verb-forward, first-person, composed. It invites without commanding, and connects to the emotional journey (hearing = Parker's medium). "Parker's Story" reads third-person and breaks voice rules.

The existing `.invitation-cta--pill` styling is already high-quality (breathing glow, extending underline, gilded border). Two refinements to elevate it:

1. **Hover lift:** Add `transform: translateY(-1px)` on `.invitation-cta--pill:hover` with 180ms timing — matching the CTA hover standard just fixed on the process button.
2. **Active press:** Add `.invitation-cta--pill:active` with `translateY(0)` and 80ms transition for tactile feedback.

## Files

- `src/components/TheInvitation.tsx` — line 318: text change only
- `src/index.css` — add translateY lift to `.invitation-cta--pill:hover` and `:active` rules (~4 lines)

