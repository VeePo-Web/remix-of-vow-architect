

# About Page — World-Class Audit and Upgrade Plan

## Critical Issues Identified

### 1. Sustain Section Cards Look Cheap
The three "Words / Silence / Memory" cards render as flat gray boxes with no atmospheric depth. They use `bg-card/60` which on the light Sustain background becomes opaque gray — visually the cheapest element on the entire page. They need the same frosted-glass material treatment used elsewhere, or better: remove the card containers entirely and let the content breathe with just the golden dot and text.

### 2. Presence Section "500+" Number Lacks Gravitas
The large number renders but the surrounding glow is barely visible. The witness moment cards below are flat frosted panels that look identical to generic UI cards. The closing line "Every one of them heard clearly." feels like an afterthought — no typographic weight.

### 3. Origin Section Image Has No Frame Treatment
The image just sits as a raw rectangle with a vignette overlay. Compared to the witness-image-frame treatment used elsewhere in the design system, this feels unfinished. Needs a subtle border/shadow frame to give it photographic authority.

### 4. Covenant Certificate Lacks Warmth
The certificate container is functional but the corner ornaments (thin border-l/border-t) feel like generic CSS, not bespoke luxury. The signature path is a generic squiggle — it doesn't feel like a real signature. The breathing glow behind it is too faint.

### 5. Hero H1 Left-Aligned on Wide Screens
The text "I don't perform at weddings." left-aligns due to natural line-break behavior despite `text-center` — it visually appears off-center because the two lines have different widths. Needs `max-width` constraint to keep the text block tighter.

### 6. Section Transitions Are Abrupt
The gradient fades between sections (h-32) are too short. Dark-to-light transitions (Hero→Origin, Presence→Covenant) need taller blends (h-48 minimum) to avoid hard cuts.

### 7. Missing Micro-Details Throughout
- No golden thread connecting sections visually
- Labels ("THE ORIGIN", "THE SUSTAIN") all use same opacity — no hierarchy
- Closing tagline in Covenant section uses generic italic — should use the sacred semicolon treatment

---

## Implementation Plan

### File 1: `src/components/witness/WitnessSustain.tsx`
**Remove card containers.** Replace the three bordered cards with a cleaner layout: golden dot → label → description directly on the gradient background, separated by generous whitespace. Remove `bg-card/60 backdrop-blur border` from the card wrappers. This transforms them from cheap UI cards into editorial text blocks.

### File 2: `src/components/witness/WitnessPresence.tsx`
- **Enhance the 500+ number** with a multi-layer text shadow (foreground shadow + golden ambient) for material authority
- **Upgrade closing statement** to `font-display text-xl` with golden thread above it
- **Increase glow radius** behind the number from `w-96 h-96` to a larger, more visible radial

### File 3: `src/components/witness/WitnessOrigin.tsx`
- **Add image frame treatment**: Apply `witness-image-frame` class (already in design system CSS) or add subtle `box-shadow` and 1px border at `primary/10` opacity to the image container
- **Increase section fade height** from `h-32` to `h-48`

### File 4: `src/components/witness/WitnessCovenant.tsx`
- **Upgrade corner ornaments** from 10px to 16px, increase opacity from `primary/25` to `primary/30`, add subtle `box-shadow` to the certificate
- **Increase signature glow** from `0.06` to `0.10` opacity
- **Style the tagline** beneath the certificate with the sacred semicolon treatment: `<span className="text-primary">;</span>`

### File 5: `src/components/witness/WitnessHero.tsx`
- **Constrain H1 width**: Add `max-w-[14ch]` to center the text block visually
- **Increase section fade height** from `h-32` to `h-48`

### File 6: `src/components/witness/WitnessCrossing.tsx`
- **Add breathing glow** around the CTA button (currently static)
- Already has semicolon treatment — just verify it renders correctly

### File 7: `src/pages/About.tsx`
- No structural changes needed — component composition is sound

---

## Summary of Changes

| File | Change | Impact |
|------|--------|--------|
| WitnessSustain | Remove card containers, editorial text layout | Eliminates cheapest element |
| WitnessPresence | Enhanced number shadows, upgraded closing | Adds gravitas |
| WitnessOrigin | Image frame, taller section fade | Photographic authority |
| WitnessCovenant | Larger ornaments, stronger glow, semicolon tagline | Certificate warmth |
| WitnessHero | H1 max-width, taller fade | Centered text balance |
| WitnessCrossing | CTA breathing glow | Consistent interaction |

Total: 6 component files modified. No new files. No dependency changes.

