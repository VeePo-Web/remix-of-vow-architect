

# Phase 12: Final Cleanup — Strip Remaining Cheap Elements

After reviewing the current state of both the `/events` and `/teaching` pages, several elements from the plan in Phase 11 were not fully executed. The EventsOffering cards still use Bootstrap-style chrome, the TeachingMethodology and TeachingThreshold sections still have excessive decorative layers, and multiple background color variants create visual muddiness. This phase completes the cleanup.

---

## Part A: Strip EventsOffering Card Chrome

`src/components/events/EventsOffering.tsx` still uses `rounded-2xl p-8 border border-border hover:-translate-y-1 hover:shadow-md shadow-sm` on tier cards (lines 74-86). This is generic SaaS card styling.

**Fix:** Replace the 3-column card grid with clean borderless typographic blocks. Remove all `rounded-2xl`, `border`, `shadow`, `hover:-translate-y-1`, `backdrop-blur`. Use thin 1px separator lines between tiers instead. Keep the MostSelectedPill for the middle tier but remove card elevation.

**File:** `src/components/events/EventsOffering.tsx`

---

## Part B: Strip Remaining Golden Decorative Elements

Several sections still have golden dots, vertical threads, breathing vignettes, and pencil annotations that create visual noise:

### B1. TeachingMethodology
Still has: golden dot anchor (line 209-223), vertical golden thread (line 226-238), pencil annotation "— we start by talking" (line 290-303), closing golden thread (line 306-318), breathing vignette, dual fog layers, fog drift animation, bloom animation, dot breathe animation.

**Fix:** Remove golden dot, both golden threads, pencil annotation. Keep the background image at low opacity and one fog layer for depth, but remove the breathing vignette animation and bloom animation. Simplify to essential atmosphere only.

### B2. TeachingThreshold
Still has: golden thread below header (line 352-364), golden dot separators between fear pairs (line 211-230), breathing semicolon at closing (line 380-401), pencil annotation "— these are normal to feel" (line 403-416), multiple fog layers, fog drift animation, bloom animation.

**Fix:** Remove the header golden thread, dot separators between fears, closing semicolon glow, and pencil annotation. Replace dot separators with thin 1px horizontal lines. Keep the background texture and one fog layer.

### B3. TeachingCrossing
Still has: golden thread from above (line 224-235), golden dot arrival marker (line 256-268), closing golden thread (line 374-386), pencil annotation "— no commitment required" (line 389-402), CTA halo with breathing animation.

**Fix:** Remove the top golden thread, golden dot, closing golden thread, and pencil annotation. Keep the CTA halo — it serves a functional purpose for button visibility on the dark background.

**Files:**
- `src/components/teaching/TeachingMethodology.tsx`
- `src/components/teaching/TeachingThreshold.tsx`
- `src/components/teaching/TeachingCrossing.tsx`

---

## Part C: Remove Breathing Vignettes and Excessive Fog from Light Sections

Several sections apply breathing vignettes and dual-origin fog to light backgrounds where they are invisible or just add rendering cost:

### C1. EventsApproach
Has: Background texture image + dual-origin fog + film grain + breathing vignette — all on `hsl(var(--background))`. The breathing vignette is imperceptible on white. The dual-origin fog adds nothing visible.

**Fix:** Remove the dual-origin fog divs (lines 50-63), the breathing vignette div (lines 69-76), and its keyframe animation. Keep the background texture image at 0.06 opacity and grain at 0.04.

### C2. EventsThreshold
Has: Background texture + film grain + dual-origin fog + breathing vignette — on `hsl(var(--card))`.

**Fix:** Remove the dual-origin fog div (lines 54-61) and breathing vignette div (lines 64-71). Keep the background texture and grain.

### C3. EventsCrossing
Has: Background texture + breathing warm glow + film grain + dual-origin fog — on dark background.

**Fix:** Keep the warm glow (it's visible on dark), remove the dual-origin fog div (lines 43-50). The warm glow and grain are sufficient atmosphere for a dark section.

**Files:**
- `src/components/events/EventsApproach.tsx`
- `src/components/events/EventsThreshold.tsx`
- `src/components/events/EventsCrossing.tsx`

---

## Part D: Unify Section Backgrounds

The teaching sections use 5 different background variables: `--teaching-bg`, `--teaching-bg-alt`, `--teaching-studio-bg`, `--teaching-vignette`, `--teaching-vignette-alt`. This creates visual muddiness.

**Fix:**
- Light sections (Exhale, Pillars, Stories, Offering): all use `hsl(var(--background))`
- Dark sections (Methodology, Threshold): keep `hsl(var(--teaching-studio-bg))` — these are intentionally dark for contrast
- TeachingCrossing: currently uses `--teaching-bg-alt` — change to `hsl(var(--background))` for consistency with the light section pattern, or keep dark if it serves as a closing CTA

**Files:** `src/components/teaching/TeachingCrossing.tsx` (background change)

---

## Summary

| File | Changes |
|------|---------|
| `src/components/events/EventsOffering.tsx` | Remove card chrome, use borderless typography |
| `src/components/events/EventsApproach.tsx` | Remove fog + vignette overlays |
| `src/components/events/EventsThreshold.tsx` | Remove fog + vignette overlays |
| `src/components/events/EventsCrossing.tsx` | Remove dual-origin fog |
| `src/components/teaching/TeachingMethodology.tsx` | Remove golden dots, threads, pencil annotations, excess fog |
| `src/components/teaching/TeachingThreshold.tsx` | Remove golden threads, dot separators, breathing semicolon, pencil annotation |
| `src/components/teaching/TeachingCrossing.tsx` | Remove golden threads, dot, pencil annotation; unify background |

## What Does NOT Change
- Weddings homepage (locked)
- All copy, scroll-reveal word animations, and content structure
- Hero sections (all verticals)
- GoldCornerImage component (already cleaned in Phase 11)
- Images (already swapped in Phase 10-11)

