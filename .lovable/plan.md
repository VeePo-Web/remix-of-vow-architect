

# Phase 16: Final Sweep — Strip Remaining Cheap Patterns from TeachingPricing, EventsPricing, TeachingAbout, EventsAbout, Listen, and Gateway

Phases 12-15 cleaned Events, Teaching, Pricing, FAQ, Proof, About, and contact pages. But several pages were missed and still carry the same cheap patterns: GoldenThread separators, Card wrappers, AboutScrollProgress/VerticalRhythmDots overlays, breathing vignettes on light backgrounds, and low-opacity decorative elements.

---

## Part A: TeachingPricing.tsx — Strip GoldenThreads, Card, Breathing Vignette

4 `GoldenThread` usages (lines 86, 106, 125, 146). Remove all — whitespace handles rhythm.

1 `<Card>` wrapper on the fears/questions section (line 134) with `card-sacred`. Strip to borderless `border-l-2 border-primary/20 pl-6` blocks matching the pattern used in EventsThreshold.

Diamond bullet markers on inclusions (line 116) with gold glow — replace with `·` text markers.

`tp-vignette-breathe` animation (line 72) on light background — invisible, remove. Also remove its `@keyframes` definition.

Remove the local `GoldenThread` function definition (lines 44-51).

**File:** `src/pages/TeachingPricing.tsx`

## Part B: EventsPricing.tsx — Strip GoldenThreads, Cards, Diamond Bullets

5 `GoldenThread` usages (lines 128, 155, 192, 227, 247). Remove all.

4 `<Card>` wrappers: inclusions card (line 138), 3 presence cards (line 167-182), comparison table card (line 200). Strip all to borderless typography with thin separators.

Diamond bullet markers on inclusions (line 142) — replace with `·`.

Remove the local `GoldenThread` function (lines 79-86) and `ep-dot-breathe` keyframes.

**File:** `src/pages/EventsPricing.tsx`

## Part C: TeachingAbout.tsx and EventsAbout.tsx — Remove Decorative Chrome

Both pages still use `<AboutScrollProgress />` and `<VerticalRhythmDots>` (lines 41-42 in both). Remove both component usages and their imports. PianoKeyNav already handles section navigation.

Both have unused `witness-vignette-breathe` keyframes in inline `<style>` — remove those blocks.

**Files:** `src/pages/TeachingAbout.tsx`, `src/pages/EventsAbout.tsx`

## Part D: Listen.tsx — Strip frameIndex, Golden Thread

Line 328: `frameIndex="FR·05"` prop on `GoldCornerImage` — dead prop, remove.

Lines 289-297: Fixed golden vertical thread overlay — remove (decorative noise).

**File:** `src/pages/Listen.tsx`

## Part E: Gateway.tsx — Strip Breathing Vignette

Lines 87-95: `gateway-vignette-breathe` animation on light background — imperceptible, remove. Also remove its `@keyframes` definition (lines 196-199).

Lines 112-117: Golden Thread separator between bento cards — remove.

**File:** `src/pages/Gateway.tsx`

## Part F: Low-opacity fixes in remaining components

| File | Line | Current | Fix |
|------|------|---------|-----|
| `FullScreenMenu.tsx` | ~625 | `opacity-25` on tagline | `opacity-60` |
| `MinimalHeader.tsx` | ~641 | `opacity-25` on semicolon | `opacity-60` |
| `SetupTimeline.tsx` | ~42 | `opacity-30` dash | `opacity-60` |
| `FullScreenMenu.tsx` | ~583, ~590 | `opacity-30` dashes | `opacity-60` |
| `GenreTrackPanel.tsx` | ~96 | `opacity-30` track count | `opacity-60` |

---

## Summary

| File | Changes |
|------|---------|
| `TeachingPricing.tsx` | Remove 4 GoldenThreads, strip Card from fears, remove diamond bullets, remove vignette |
| `EventsPricing.tsx` | Remove 5 GoldenThreads, strip 4 Cards, remove diamond bullets |
| `TeachingAbout.tsx` | Remove AboutScrollProgress, VerticalRhythmDots, unused keyframes |
| `EventsAbout.tsx` | Remove AboutScrollProgress, VerticalRhythmDots, unused keyframes |
| `Listen.tsx` | Remove frameIndex prop, remove fixed golden thread |
| `Gateway.tsx` | Remove breathing vignette, remove golden thread separator |
| `FullScreenMenu.tsx` | Boost 3 opacity values from 25/30 to 60 |
| `MinimalHeader.tsx` | Boost semicolon opacity from 25 to 60 |
| `SetupTimeline.tsx` | Boost dash opacity from 30 to 60 |
| `GenreTrackPanel.tsx` | Boost track count opacity from 30 to 60 |

Total: 10 files, ~25 fixes. No layout or content changes.

