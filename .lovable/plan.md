

# Phase 9: Visual UI/UX Upgrade — Events Page + Teaching Page Polish

The Teaching page has rich atmospheric layering, editorial image bleeds, and cinematic depth. The Events page, by comparison, is visually flat — no editorial photography, plain single-tone backgrounds, and no atmospheric layers. This phase brings the Events page up to the same Hickory & Rose editorial standard, and adds further visual polish to the Teaching page.

---

## Part A: Events Page — Editorial Image Bleeds & Atmospheric Depth

The Events page currently uses simple `hsl(var(--background))` and `hsl(var(--card))` backgrounds with no imagery, no vignettes, no grain, and no editorial photography. Every section needs atmospheric layering and at least one editorial image to match the Teaching page standard.

### A1. EventsExhale — Add editorial image + atmospheric layers
- Add a right-bleed `GoldCornerImage` after the four recognition lines, using `events-hero.jpg` or `gateway-events.jpg`
- Add breathing vignette + warm glow radial gradient layers
- Add film grain at 0.04 opacity

### A2. EventsOccasions — Add interstitial image between occasion 2 and 3
- Insert a full-bleed `GoldCornerImage` using `gallery-setup.jpg` with `aspectRatio="16/9"` and negative margin full-width pattern
- Add warm radial glow background layer

### A3. EventsApproach — Add background texture + atmospheric depth
- Add `sound-bokeh-ai.jpg` as a low-opacity (0.06) background image with Ken Burns drift
- Add dual-origin fog layers, breathing vignette, and grain
- This section discusses "How I Work" — the atmospheric depth makes it feel more immersive

### A4. EventsExperience — Add editorial side-image
- Add an asymmetric left-bleed `GoldCornerImage` using `witness-setup-ai.jpg`
- Add atmospheric glow and grain

### A5. EventsThreshold — Add background texture
- Similar to TeachingThreshold: add `events-hero.jpg` at very low opacity as background
- Add fog layers and breathing vignette for depth

### A6. EventsCrossing — Add editorial image + CTA halo
- Add bench/keys background image at 0.04 opacity
- Add CTA button golden halo (like TeachingCrossing has)

### Files to modify:
- `src/components/events/EventsExhale.tsx`
- `src/components/events/EventsOccasions.tsx`
- `src/components/events/EventsApproach.tsx`
- `src/components/events/EventsExperience.tsx`
- `src/components/events/EventsThreshold.tsx`
- `src/components/events/EventsCrossing.tsx`

### Image assets to use (already in project):
- `src/assets/events-hero.jpg`
- `src/assets/gateway-events.jpg`
- `src/assets/gallery-setup.jpg`
- `src/assets/sound-bokeh-ai.jpg`
- `src/assets/witness-setup-ai.jpg`
- `src/assets/witnesses-venue-ai.jpg`

---

## Part B: Teaching Page — Visual Polish & Missing Atmospheric Layers

The TeachingOffering section currently has minimal atmospheric depth compared to siblings. The TeachingCrossing section is missing grain and fog layers.

### B1. TeachingOffering — Add background texture image
- Add `sound-keys.jpg` at 0.03 opacity with Ken Burns for subtle warmth
- Add grain layer at 0.04

### B2. TeachingCrossing — Add grain + fog layers
- Add grain overlay at 0.04 opacity
- Add dual-origin fog for depth consistency

---

## Part C: Events Page — Section Transitions

The Events page currently has no `SectionFade` or `GoldenThread` separators between sections (unlike Teaching which has both). Add them for visual rhythm.

### C1. Add GoldenThread separators between same-tone sections
- Between EventsExhale and EventsOccasions
- Between EventsApproach and EventsThreshold

### C2. Add SectionFade gradients between different-tone sections
- Between EventsOccasions (card bg) and EventsApproach (background bg)

### File to modify:
- `src/pages/Events.tsx` — add GoldenThread and SectionFade components (can reuse the pattern from Teaching.tsx)

---

## Summary of Files

| File | Changes |
|------|---------|
| `src/components/events/EventsExhale.tsx` | Image bleed + atmospheric layers |
| `src/components/events/EventsOccasions.tsx` | Interstitial image + warm glow |
| `src/components/events/EventsApproach.tsx` | Background texture + fog/grain |
| `src/components/events/EventsExperience.tsx` | Side-bleed editorial image |
| `src/components/events/EventsThreshold.tsx` | Background texture + vignette |
| `src/components/events/EventsCrossing.tsx` | Background image + CTA halo |
| `src/components/teaching/TeachingOffering.tsx` | Background texture + grain |
| `src/components/teaching/TeachingCrossing.tsx` | Grain + fog layers |
| `src/pages/Events.tsx` | GoldenThread + SectionFade separators |

## What Does NOT Change
- All existing copy, animations, scroll-reveal patterns
- Weddings homepage (locked per style guide)
- Teaching section animations (only additive layers)

