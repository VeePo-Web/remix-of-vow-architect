
# Three Keys — Step 2: Atmospheric, Interaction & Mobile Refinement

## Overview

The Three Keys section has strong structural bones — real piano-key 3D materials, Ken Burns background, vignette layers, and the MOST CHOSEN badge system. Step 2 brings it to Fantasy.co standard through four precise workstreams: atmospheric layer tuning, hover/press choreography, reveal animation polish, and a mobile-specific reimagination.

---

## Workstream 1: Atmospheric Layer Refinement

### File: `src/components/ThreePaths.tsx`

**Current state:** 5 atmospheric layers (top fade, background image with Ken Burns, warm spotlight, cinematic vignette, warm glow pool). This is structurally correct but can be tightened.

**Changes:**
- Add `role="region"` and `aria-label="Pricing options"` to the section for accessibility
- Update section padding from `py-32 md:py-40` to `py-[80px] md:py-[120px]` — aligning to the Fitzgerald scale (fitz-9 mobile, fitz-10 desktop), matching TheWitnesses and other refined sections
- Update header overline tracking from `tracking-[0.3em]` to `tracking-[0.22em]` — matching the brand standard used in TheWitnesses and other sections
- Add `font-sans` to overline to ensure Inter rendering (not inherited Cormorant)
- Update heading `tracking-[0.01em]` to `tracking-[0.02em]` — matching the brand standard for display headings
- Update heading `clamp(32px,4.5vw,44px)` to `clamp(30px,4.5vw,40px)` — matching the 3xl-to-4xl range (section heading, not hero display)
- Reduce reveal `translate-y-4` on header elements to `translate-y-[12px]` — matching brand 12px reveal standard
- Reduce reveal `translate-y-6` on key cards to `translate-y-3` (12px) — same
- Reduce `translate-y-4` on reassurance text to `translate-y-[12px]`
- Add a subtle warm fog layer (vow-yellow at 2% opacity, full-width, positioned at 60% height) to create atmospheric haze between the keys and the background — this is the "standing in a room" depth cue currently missing

---

## Workstream 2: Interaction Choreography

### File: `src/index.css`

**Hover state sequencing (desktop white keys):**
- Current hover transition is `120ms` — too fast for sacred pacing. Update `.piano-white-key` base transition to `180ms cubic-bezier(0.4, 0, 0.2, 1)` for transform/box-shadow (the "acknowledgment" timing)
- Add a hover transition for the golden underline inside keys: on hover, the underline opacity shifts from 0.65 to 0.85 over 250ms — a subtle "warming" that rewards exploration without demanding attention
- Add `.piano-white-key:hover .piano-key__name` rule: color shifts from `hsl(240 9% 10%)` to `hsl(240 9% 4%)` over 180ms — the name becomes more present on hover

**Press feedback (active states):**
- Current active transition is `60ms` — correct for the "snap" of a key depression
- Ensure the active state box-shadow collapse includes a brief golden flash: add `0 0 8px rgba(255,224,138,0.08)` to the active box-shadow — barely perceptible but rewards the press
- Add `.piano-white-key:active .piano-key__cta--chosen` and `--flanking` rules: CTA gets a `scale(0.97)` during key press for cascaded tactile feedback

**CTA hover refinement:**
- `.piano-key__cta--chosen:hover`: add `transition: all 180ms cubic-bezier(0.4, 0, 0.2, 1)` explicitly, and increase box-shadow spread slightly for warmth
- `.piano-key__cta--flanking:hover`: add golden thread underline effect — a 1px bottom border animating from `scaleX(0)` to `scaleX(1)` over 250ms, using the golden gradient

**MOST CHOSEN badge breathing:**
- Add a subtle badge glow pulse: the outer `box-shadow` on `.paths-chosen-badge` breathes between `rgba(255,224,138,0.06)` and `rgba(255,224,138,0.12)` over 4s — synced with the `chosen-key-breathe` animation for harmonic coherence

---

## Workstream 3: Reveal Animation Polish

### File: `src/components/ThreePaths.tsx`

**Stagger timing refinement:**
- Current: center 450ms, left 550ms, right 650ms — 100ms gaps. This is acceptable but should be tightened to 80ms for organic cohesion: center 450ms, left 530ms, right 610ms
- Black key delays: tighten from 500/600 to 480/560 — they should appear slightly after their adjacent white keys but not lag

**Header reveal sequence:**
- Overline: 0ms delay (first element, already correct)
- Heading: 120ms delay (tighten from 150ms for organic rhythm)
- Golden thread: 300ms delay (tighten from 400ms — it should connect to the heading reveal, not feel separated)

**Reassurance reveal:**
- Diamond: delay from 900ms to 800ms
- Text: delay from 950ms to 880ms — tighter coupling with the diamond

**Easing:**
- All reveal transitions already use `duration-700` which is correct for "sacred reveal" timing
- No easing changes needed — the browser default CSS `ease` on `transition-all` is acceptable; adding explicit `cubic-bezier(0.4, 0, 0.2, 1)` to the transition class would be ideal but not critical

---

## Workstream 4: Mobile-Specific Reimagination

### File: `src/components/ThreePaths.tsx`

**Mobile card spacing:**
- Current `MobileGoldenThread` has `my-2` (8px vertical margin). Increase to `my-4` (16px) — the cards need more breathing room on mobile (fitz-4)
- Mobile golden thread width: increase from `w-16` to `w-12` — narrower thread, more precious (matching TheWitnesses separator width)

**Mobile card reveal stagger:**
- On mobile, the three cards stack vertically. The current stagger (450/550/650ms) works for simultaneous desktop reveal but on mobile, cards reveal one-at-a-time as the user scrolls. The stagger has less impact. Keep the timing but reduce the translate distance — `translate-y-3` (12px) is already planned.

**Mobile touch targets:**
- CTAs already have `min-height: 48px` — correct (exceeds 44px minimum)
- Ensure the entire mobile card is tappable by wrapping the card content — actually, this would change the interaction model. Keep as-is; the CTA button is the primary touch target.

**Mobile MOST CHOSEN badge:**
- Current badge has `-mt-4 mb-2` on mobile. The badge should feel more integrated — change to `-mt-2 mb-3` for tighter coupling with the card top edge.

### File: `src/index.css`

**Mobile active state:**
- `.piano-white-key--mobile:active` currently presses 2px. Add a golden flash to the box-shadow matching the desktop behavior: `0 0 6px rgba(255,224,138,0.06)` — barely visible but sensorially consistent.

**Mobile chosen key:**
- On mobile, the chosen key should have a subtle left-edge golden accent instead of the desktop top-border press-down. Add `.piano-white-key--mobile.piano-white-key--chosen` rule: `border-left: 2px solid hsl(var(--vow-yellow) / 0.35)` replacing the top border — this creates a vertical "spine" accent that works better in the stacked layout.

---

## Summary

| Workstream | File | Changes |
|-----------|------|---------|
| Atmospheric | TSX | Fitzgerald spacing, typography alignment, fog layer, accessibility |
| Interaction | CSS | Hover 180ms, name color shift, active golden flash, CTA underline, badge breathing |
| Reveal | TSX | Tighter stagger (80ms gaps), header sequence, reassurance coupling |
| Mobile | TSX + CSS | Card breathing room, golden thread width, badge positioning, active golden flash, chosen left-accent |

**Two files modified.** Zero new dependencies. Zero new images. Zero new keyframes beyond the badge glow pulse (which can reuse `chosen-key-breathe` timing). Pure interaction choreography and atmospheric calibration.
