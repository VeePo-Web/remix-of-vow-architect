

# Upgrade "The Sound" Section to Fantasy.co Quality

## Current State Assessment

The "Hear Me Play" experience currently spans three interconnected systems:

1. **TheSound.tsx** (homepage section) -- Genre card grid with expandable track panel, now-playing bar
2. **AmbientAudioPill.tsx + PianoPanel.tsx** -- Global floating pill trigger with dropdown listening room
3. **Listen.tsx + ListeningMovement.tsx** -- Dedicated full-page immersive listening experience

The homepage section (TheSound) is the primary "hear me play" touchpoint. It has solid foundations (atmospheric layers, parallax, glass materials, genre cards) but several areas fall short of Fantasy.co standards.

---

## What Needs to Change

### 1. Section Atmosphere -- Add Missing Depth Layers

The section currently has a background image, vignette, warm floor, and bokeh overlay -- but lacks the film grain overlay and transition fades that every other premium section has. The atmospheric depth feels thinner than the hero or Process sections.

**Changes:**
- Add `section-grain` class film grain overlay (currently referenced in className but the visual grain div is missing)
- Add breathing warm glow layer that pulses subtly (3-4s cycle) to give the section life
- Strengthen the vignette to match the hero's cinematic density

### 2. Genre Cards -- Elevate to Ceremony-Grade Material

The cards have good bones but their `rounded-xl` (12px) violates the brand rule of max 8px radius. The play/pause icons inside circles feel like a music app, not a sacred instrument. The hover animations are functional but lack the "held" feeling.

**Changes:**
- Reduce border-radius from `rounded-xl` to `rounded-lg` (8px max) on all cards and panels
- Replace the circular play indicator with a subtler visual -- a breathing golden dot or the genre's accent color as a soft inner glow, removing the app-like play/pause icons from the card face entirely
- Add film grain inside each card for tactile depth
- Refine the Ken Burns drift to only activate when the card is active (not on hover -- hover triggers movement which draws attention to itself, violating rule 10)

### 3. Track Panel -- From App UI to Sacred Instrument

The GenreTrackPanel uses glass material correctly but feels like a music player dropdown rather than a sacred listening instrument. The "Coming Soon" labels and track numbering feel utilitarian.

**Changes:**
- Remove "Coming Soon" labels (they break the luxury feeling -- absence speaks louder)
- Replace mono track numbers with a subtle golden accent bar (already partially there, make it the sole indicator)
- Add a breathing golden thread along the left edge of the panel that connects to the genre card above
- Refine the footer copy from "Recordings arriving soon" to a more brand-aligned phrase: "Each piece, arranged for your ceremony"
- Add atmospheric inner glow to the panel when a track is active

### 4. Section Copy -- Sharpen to Brand Voice

Current copy is close but can be more emotionally precise:
- "Hear me play." is strong -- keep it
- "Browse. Listen. Imagine it at yours." feels instructional/casual. Replace with something that honors the vigil: "Each piece begins with someone in mind."
- The closing quote duplicates this sentiment -- differentiate the two

**Changes:**
- Subhead: "Browse. Listen. Imagine it at yours." becomes "Five rooms. One instrument. Your ceremony."
- Closing quote remains but gets a more atmospheric presentation -- wider spacing, slower reveal

### 5. Now Playing Bar -- Refine Material Quality

The bar is solid but needs:
- Border-radius capped at 0 (it is a full-width bar, no rounding needed -- currently correct)
- The seek dot should breathe when idle
- Golden thread connecting the bar to the section when in-section

### 6. Ambient Audio Pill -- Minor Refinements

The pill is well-crafted. Minor adjustments:
- Ensure the `rounded-full` stays (pills are exempt from the 8px rule as a capsule form)
- The breathing animation timing should match the golden thread cycle (4s, not the current 4s -- already aligned, confirm)

### 7. Animation Timing Audit

Several timings need alignment with the Sacred timing language:
- Genre card hover: currently 300ms, should be 180ms (hover acknowledgment)
- Track panel entrance: currently 300ms, should be 400ms (deliberate reveal)
- Card stagger: currently 80ms, good (within 80-120ms range)
- Ken Burns on cards: currently 30s, good (within 25-35s range)

---

## Technical Implementation Plan

### File: `src/components/GenreCard.tsx`
- Change `rounded-xl` to `rounded-lg` on the outer button
- Remove the circular play indicator div entirely; replace with a subtle inner glow that intensifies when active
- Remove `CircleWaveform` component (app-like, draws attention to itself)
- Add the genre label as the sole content -- centered, serif, with the context phrase below
- Add grain overlay div inside the card
- Change hover transition from 300ms to 180ms
- Remove Ken Burns on hover (only on active)

### File: `src/components/GenreTrackPanel.tsx`
- Change `rounded-xl` to `rounded-lg`
- Remove "Coming Soon" span
- Update footer copy
- Add breathing inner glow when track is active
- Change entrance animation from 300ms to 400ms

### File: `src/components/TheSound.tsx`
- Update subhead copy
- Add breathing warm glow layer with 4s animation cycle
- Ensure film grain layer is visually present (not just a className)
- Widen the closing quote section spacing

### File: `src/components/PianoPanel.tsx`
- Change `rounded-[16px]` to `rounded-lg` (8px)

### File: `src/components/ListeningMovement.tsx`
- Change `rounded-xl` on the track card to `rounded-lg`

---

## Summary of Changes

| Area | Current | After |
|------|---------|-------|
| Card radius | 12px (rounded-xl) | 8px (rounded-lg) |
| Card play icon | Circular play/pause button | Removed -- replaced with inner glow |
| Card hover timing | 300ms | 180ms |
| Panel entrance | 300ms | 400ms |
| Panel "Coming Soon" | Visible | Removed |
| Panel footer | "Recordings arriving soon" | "Each piece, arranged for your ceremony" |
| Section subhead | "Browse. Listen. Imagine it at yours." | "Five rooms. One instrument. Your ceremony." |
| Atmospheric depth | Missing breathing glow | Added 4s cycle warm glow |
| PianoPanel radius | 16px | 8px |
| Ken Burns on hover | Active | Removed (active-only) |

All changes respect reduced motion fallbacks, maintain WCAG AA contrast, and follow the Fitzgerald spacing scale.
