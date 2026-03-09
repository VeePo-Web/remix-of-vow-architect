

# Luxury Polish — Round 8: About Pages Elevated to Hickory & Rose Standard

## Analysis

After studying the [hickoryandrose](/projects/7f1ad5b8-2dd7-4239-9f44-54c33d440e80) reference project in depth, several world-class patterns are absent from our three About pages that would dramatically elevate the perceived quality:

### What Hickory & Rose Does That We Don't

1. **Gold corner reveals on images** — On hover, gradient gold L-brackets fade in at all 4 corners of images, creating a "gallery frame" effect
2. **Cinematic letterbox bars on images** — Black bars slide in from top/bottom on hover, creating a film-frame feel
3. **Gold shimmer sweep on images** — A diagonal gold gradient sweeps across images on hover
4. **Parallax watermark text** — Giant faded serif text ("Promise", "Moments") floats behind sections at 1.5-2% opacity
5. **Editorial section numerals with flanking lines** — Section headers use `01`, `02` style numbering with gold gradient rules
6. **Gold spine timeline** — Promises/values connected by an animated vertical gold gradient line
7. **Image clip-path reveals** — Images reveal with a wipe mask rather than simple fade-in
8. **Pull quotes with gold left-rule** — Blockquotes use a 2px gold gradient left border

### What Our About Pages Are Missing (Specific)

All three About pages (Wedding `/about`, Events `/events/about`, Teaching `/teaching/about`) share structurally identical sections but lack these Hickory & Rose-level polish details. The biggest gaps:

- **Origin section images**: Plain `img` tags with no hover interaction, no corner reveals, no letterbox treatment
- **No parallax watermark text** behind any section
- **No editorial section numbering** (01, 02, 03...) in the About pages
- **Covenant certificate**: Missing gold shimmer sweep effect on the card
- **Crossing CTA**: Missing the gold-framed inset treatment around the background image
- **Presence section**: Moment cards lack the gold-bordered interactive polish

---

## Implementation Plan

### Priority 1: Reusable `GoldCornerImage` Component

Create a new component that wraps images with:
- 4 gold gradient L-bracket corners that fade in on hover (700ms)
- Cinematic letterbox bars sliding in on hover (600ms)
- Gold shimmer sweep on hover (1000ms diagonal translate)
- Ken Burns drift on the image itself
- Film grain overlay
- Frame index mark (top-right, e.g. "FR01")

**New file:** `src/components/ui/gold-corner-image.tsx`

This replaces the plain `<img>` tags in WitnessOrigin, EventsAboutOrigin, and TeachingAboutOrigin.

### Priority 2: Parallax Watermark Text

Add giant faded serif watermark text behind key sections:
- WitnessOrigin: "Origin" at 2% opacity
- WitnessSustain: "Sustain" at 1.5% opacity  
- WitnessPresence: "Presence" at 2% opacity
- WitnessCovenant: "Promise" at 1.5% opacity

Same pattern applied to Events and Teaching About variants. Uses scroll-linked opacity (fade in when section enters viewport).

**Modified files:** All 6 Origin/Sustain/Presence/Covenant sections across 3 verticals.

### Priority 3: Editorial Section Numbering

Add Hickory & Rose-style section numbering to each About page section:
- Large faded numeral (01-06) positioned top-left of section header
- Flanking gold gradient rules around section labels
- Consistent with the pattern already used in the homepage sections

**Modified files:** All witness/events-about/teaching-about section components.

### Priority 4: Gold Pull Quote Left-Rule

Upgrade the LetterPressQuote in WitnessOrigin and equivalents with:
- A 2px gold gradient left border (matching Hickory & Rose's `AboutFounderSection` pull quote pattern)
- Slightly inset left padding (pl-5)

**Modified file:** `src/components/ui/letterpress-quote.tsx`

### Priority 5: Covenant Certificate Gold Shimmer

Add the Hickory & Rose gold shimmer sweep to the covenant certificate card:
- A `translate-x` animated gold gradient overlay that sweeps across on hover
- Matching the `AboutFounderSection` image shimmer

**Modified files:** `WitnessCovenant.tsx`, `EventsAboutCovenant.tsx`, `TeachingAboutCovenant.tsx`

### Priority 6: Witness Moment Cards Enhancement

Upgrade the WitnessPresence moment cards with:
- Gold corner L-brackets on hover (matching image treatment)
- Subtle gold left-rule border (2px, gradient)
- Frame index marks ("01", "02", etc.)

**Modified file:** `WitnessPresence.tsx` and equivalents

---

## Files to Create
1. `src/components/ui/gold-corner-image.tsx` — Reusable editorial image with all hover treatments

## Files to Modify (12 total)
1. `src/components/witness/WitnessOrigin.tsx` — Add GoldCornerImage, watermark, section numeral
2. `src/components/witness/WitnessSustain.tsx` — Add watermark, section numeral
3. `src/components/witness/WitnessPresence.tsx` — Add watermark, section numeral, card upgrades
4. `src/components/witness/WitnessCovenant.tsx` — Add watermark, shimmer sweep, section numeral
5. `src/components/witness/WitnessCrossing.tsx` — Add section numeral
6. `src/components/witness/WitnessHero.tsx` — Add section numeral
7. `src/components/events-about/EventsAboutOrigin.tsx` — Same treatments
8. `src/components/events-about/EventsAboutSustain.tsx` — Same treatments
9. `src/components/events-about/EventsAboutPresence.tsx` — Same treatments
10. `src/components/events-about/EventsAboutCovenant.tsx` — Same treatments
11. `src/components/teaching-about/TeachingAboutOrigin.tsx` — Same treatments
12. `src/components/ui/letterpress-quote.tsx` — Add gold left-rule border

## Technical Notes
- All hover effects use pure CSS transitions (no framer-motion needed)
- Gold corner brackets: `w-8 h-8` absolute positioned spans with gradient `border-l`/`border-t` etc.
- Watermark text: `pointer-events-none select-none` with `font-display text-[10rem]` at 1.5-2% opacity
- Shimmer sweep: `translate-x` from `-full` to `full` on group-hover with 1000ms duration
- All effects respect `motion-reduce` via `motion-reduce:hidden` or `motion-reduce:transition-none`
- No new dependencies required

