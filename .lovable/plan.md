

# Phase 15: Section-by-Section Color, Contrast, and Image Bleed Overhaul

## Current State Assessment

After Phases 12-14, the site is structurally cleaner but still has systemic issues that undermine the luxury editorial standard:

### Problem 1: Remaining Sub-12px Text
`text-[0.625rem]` (10px) still appears in **luxury-input labels, error messages, pill-selector options, submit button text, and back-link text** across all contact pages, the LuxuryInput/LuxuryTextarea component, PillSelector component, and ContactCelebration. This violates the 12px minimum floor established in Phase 14.

**Files with 0.625rem:**
- `src/components/ui/luxury-input.tsx` (lines 17, 48, 69, 96) — labels and errors
- `src/components/ui/pill-selector.tsx` (line 36) — pill text
- `src/pages/Contact.tsx` (line 275) — submit button text
- `src/pages/TeachingContact.tsx` (line 182) — submit button text
- `src/pages/EventsContact.tsx` (line 268) — submit button text
- `src/components/ContactCelebration.tsx` (line 147) — back link
- `src/components/FullScreenMenu.tsx` (line 488) — nav index numbers at `text-[0.5rem]` (8px)

**Fix:** Replace all `text-[0.625rem]` with `text-xs` (12px). Replace `text-[0.5rem]` with `text-xs`.

### Problem 2: Crushed Opacity on Teaching Section Labels
Teaching sections use `opacity-25`, `opacity-35`, `opacity-45` on section labels and decorative elements — below the 0.60 floor. On white/light backgrounds these are near-invisible.

**Instances:**
- `TeachingExhale.tsx` line 194: `opacity-45` on "Where we start" label
- `TeachingPillars.tsx` line 147: `opacity-25` on roman numerals (vow-yellow text)
- `TeachingPillars.tsx` line 237: `opacity-45` on "How I teach" label
- `TeachingMethodology.tsx` line 155: `opacity-35` on "The first conversation" label
- `TeachingCrossing.tsx` line 287: `opacity-45` on "This is a beginning" text
- `TeachingStories.tsx` line 261: `opacity-50` on "Student stories" label

**Fix:** Boost all section labels to `opacity-60` minimum. Roman numerals: change from `opacity-25` on yellow to `text-muted-foreground opacity-60`.

### Problem 3: Yellow Text on White Backgrounds
`EventsOccasions.tsx` `GoldNumeral` uses `color: hsl(var(--vow-yellow) / 0.5)` — yellow at 50% opacity on white is essentially invisible. Same issue with `EventsApproach.tsx` step numbers using `text-primary opacity-60`.

**Fix:** Replace yellow numerals/markers with `text-muted-foreground` for legibility. The gold accent should be reserved for underlines and subtle decorative elements, never for text that needs to be read.

### Problem 4: Duplicate Image Usage in Teaching Stories
`TeachingStories.tsx` line 8 reuses `teachingStudioImg` from `@/assets/teaching-studio-warm.jpg` — which is already used in `TeachingExhale.tsx`. This violates the no-duplicate-images rule.

**Fix:** Remove the third story image (or replace with a unique asset). Since we cannot commission photography, we should use AI image generation to create a unique replacement image for the third story card.

### Problem 5: Missing Image Bleeds on Events Page
The Events page has fewer editorial image bleeds than Teaching. `EventsApproach` and `EventsThreshold` have no interstitial images at all — they are pure text blocks. This makes the page feel text-heavy compared to the Hickory & Rose editorial standard.

**Fix:** Add one editorial image bleed to `EventsApproach` (after the 3-step process) and one to the `EventsThreshold` section (between the 2nd and 3rd concern).

---

## Implementation Plan

### A. Fix Sub-12px Text (6 files)

| File | Line | Current | Fix |
|------|------|---------|-----|
| `luxury-input.tsx` | 17, 69 | `text-[0.625rem]` labels | `text-xs` |
| `luxury-input.tsx` | 48, 96 | `text-[0.625rem]` errors | `text-xs` |
| `pill-selector.tsx` | 36 | `text-[0.625rem]` pills | `text-xs` |
| `Contact.tsx` | 275 | `text-[0.625rem]` submit | `text-xs` |
| `TeachingContact.tsx` | 182 | `text-[0.625rem]` submit | `text-xs` |
| `EventsContact.tsx` | 268 | `text-[0.625rem]` submit | `text-xs` |
| `ContactCelebration.tsx` | 147 | `text-[0.625rem]` back link | `text-xs` |
| `FullScreenMenu.tsx` | 488 | `text-[0.5rem]` nav index | `text-xs` |

### B. Fix Teaching Section Label Opacities (6 files)

All section labels (`"Where we start"`, `"How I teach"`, `"Student stories"`, etc.) boosted from `opacity-25/35/45` to `opacity-60`.

Roman numerals in `TeachingPillars`: change from yellow at `opacity-25` to `text-muted-foreground` at `opacity-60`.

### C. Fix Yellow-on-White Text in Events (2 files)

- `EventsOccasions.tsx` `GoldNumeral`: change from `color: hsl(var(--vow-yellow) / 0.5)` to `text-muted-foreground`
- `EventsApproach.tsx` step numbers: change from `text-primary opacity-60` to `text-muted-foreground`

### D. Fix Duplicate Image in Teaching Stories

Replace `teachingStudioImg` (3rd story) with `sound-keys-intimate-ai.jpg` or another unused asset from the assets directory. Need to verify which images are unused.

### E. Add Editorial Image Bleeds to Events Page (2 files)

- `EventsApproach.tsx`: Add a full-bleed `GoldCornerImage` after the 3-step process using `piano-macro-hammers.jpg` (currently unused on events page)
- `EventsThreshold.tsx`: Add an asymmetric side-bleed image between concerns 2 and 3 using `sound-cathedral-ai.jpg`

---

## Summary

| File | Changes |
|------|---------|
| `src/components/ui/luxury-input.tsx` | 4x `text-[0.625rem]` to `text-xs` |
| `src/components/ui/pill-selector.tsx` | 1x `text-[0.625rem]` to `text-xs` |
| `src/pages/Contact.tsx` | 1x submit button text size |
| `src/pages/TeachingContact.tsx` | 1x submit button text size |
| `src/pages/EventsContact.tsx` | 1x submit button text size |
| `src/components/ContactCelebration.tsx` | 1x back link text size |
| `src/components/FullScreenMenu.tsx` | 1x nav index text size |
| `src/components/teaching/TeachingExhale.tsx` | Label opacity 45 to 60 |
| `src/components/teaching/TeachingPillars.tsx` | Label opacity 45 to 60, numeral color fix |
| `src/components/teaching/TeachingMethodology.tsx` | Label opacity 35 to 60 |
| `src/components/teaching/TeachingCrossing.tsx` | Text opacity 45 to 60 |
| `src/components/teaching/TeachingStories.tsx` | Label opacity 50 to 60, fix duplicate image |
| `src/components/events/EventsOccasions.tsx` | Yellow numeral to muted-foreground |
| `src/components/events/EventsApproach.tsx` | Step number color fix, add image bleed |
| `src/components/events/EventsThreshold.tsx` | Add editorial image bleed |

Total: 15 files, ~30 targeted fixes. No layout changes, no content changes.

