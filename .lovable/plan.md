

# Phase 13: Weddings-Adjacent Pages — Strip Card Chrome, Golden Threads, and Breathing Vignettes

The Events and Teaching verticals are now clean. But four high-traffic weddings-adjacent pages — **Pricing**, **FAQ**, **Proof**, and **Listen** — still carry the exact same cheap patterns we eliminated from Events/Teaching: `Card` component wrappers with rounded corners and shadows, `GoldenThread` separators with breathing dots between every section, breathing vignettes on light backgrounds, and `frameIndex` props still being passed to `GoldCornerImage`.

Additionally, the **About** page uses `AboutScrollProgress` and `VerticalRhythmDots` — decorative chrome that adds visual noise without editorial value.

---

## Part A: Strip GoldenThread Separators from Pricing, Proof, FAQ

**Pricing.tsx** uses `GoldenThread` 7 times (lines 113, 122, 258, 267, 284, 293, 302, 311). These breathing-dot separators between every section create visual noise. Replace with simple whitespace — the sections already have `section-padding` and `RevealOnScroll` handles the visual rhythm.

**Proof.tsx** uses `GoldenThread` 6 times (lines 135, 144, 165, 174, 183, 192). Same treatment — remove all and let generous vertical padding breathe.

**FAQ.tsx** uses inline golden thread divs 4 times (lines 91-93, 112-115, 122-125, 132-135). Remove all.

**Files:** `src/pages/Pricing.tsx`, `src/pages/Proof.tsx`, `src/pages/FAQ.tsx`

## Part B: Strip Card Component from Pricing Tiers

**Pricing.tsx** wraps all three pricing tiers in `<Card>` (lines 138, 184, 219) with `bg-card/80 backdrop-blur-[8px] border-border/50 card-sacred card-sacred-hover`. The middle card has a `border-primary/15 border-2` and an inset box-shadow. This is the same SaaS card chrome we removed from EventsOffering.

Replace with clean borderless typographic blocks separated by thin 1px lines, matching the EventsOffering pattern. Keep the `MostSelectedPill` on the middle tier. Also remove the diamond bullet points (`rotate-45` squares with gold glow) — replace with simple `·` or `—` text markers.

Also strip the `<Card>` from the comparison table wrapper (line 278).

Remove the `GoldCornerImage` with `frameIndex="FR·03"` that was inserted between the first and second pricing cards (lines 171-181) — this breaks the 3-column grid and looks awkward.

**File:** `src/pages/Pricing.tsx`

## Part C: Remove frameIndex Props from GoldCornerImage Usage

The `GoldCornerImage` component no longer renders frame index marks (cleaned in Phase 11), but several pages still pass `frameIndex` props. Remove these dead props for code cleanliness:

- `FAQ.tsx` line 107: `frameIndex="FR·02"`
- `Proof.tsx` line 161: `frameIndex="FR·04"`
- `Pricing.tsx` line 178: `frameIndex="FR·03"`

**Files:** `src/pages/FAQ.tsx`, `src/pages/Proof.tsx`, `src/pages/Pricing.tsx`

## Part D: Remove Breathing Vignettes from Light-Background Heroes

Three pages have breathing vignette animations on light backgrounds where they are imperceptible:

- **Pricing.tsx** lines 86-93: `pricing-vignette-breathe` animation on `hsl(var(--background))` — invisible, remove
- **FAQ.tsx** lines 58-66: `faq-vignette-breathe` animation — invisible, remove
- **Proof.tsx** lines 84-91: `vignette-breathe` animation — invisible, remove

Also remove the corresponding `@keyframes` definitions from inline `<style>` blocks.

**Files:** `src/pages/Pricing.tsx`, `src/pages/FAQ.tsx`, `src/pages/Proof.tsx`

## Part E: Simplify About Page Chrome

**About.tsx** renders `<AboutScrollProgress />` and `<VerticalRhythmDots>` — decorative overlays that add visual clutter without editorial purpose. Remove both component usages (the PianoKeyNav already handles section navigation).

**File:** `src/pages/About.tsx`

---

## Summary

| File | Changes |
|------|---------|
| `src/pages/Pricing.tsx` | Remove 7 GoldenThreads, strip Card wrappers from 3 tiers + comparison, remove diamond bullets, remove mid-grid image bleed, remove breathing vignette, remove frameIndex |
| `src/pages/FAQ.tsx` | Remove 4 golden thread divs, remove breathing vignette, remove frameIndex |
| `src/pages/Proof.tsx` | Remove 6 GoldenThreads, remove breathing vignette, remove frameIndex |
| `src/pages/About.tsx` | Remove AboutScrollProgress and VerticalRhythmDots |

## What Does NOT Change
- Weddings homepage (locked)
- All copy, scroll-reveal animations, and content
- Listen.tsx (already clean — no golden threads or cards)
- Hero background images and atmospheric layers on dark sections
- CTA sections with warm glows (these serve functional contrast on dark backgrounds)

