

# Phase 4: Events & Teaching Light Conversion + Remaining Dark Purge

## Current State

After Phases 1-3, the **Weddings homepage** has been converted to light-first with strategic dark punctuation (Hero, VowMoment, TheSound, CrossOver). However, two entire verticals and several component categories remain fully dark:

**Events page (`/events`):** ALL 7 sections still have `data-theme="death"` with hardcoded dark backgrounds (`--events-dark`, `--events-approach-bg`, `--rich-black`). The entire page reads as dark.

**Teaching page (`/teaching`):** 3 sections are dark-scoped (`TeachingHero`, `TeachingMethodology`, `TeachingThreshold`). The remaining 5 sections (`TeachingExhale`, `TeachingPillars`, `TeachingStories`, `TeachingOffering`, `TeachingCrossing`) use `--teaching-bg` / `--teaching-bg-alt` tokens which ARE already light values (`40 30% 95%` / `38 35% 93%`) — these should render correctly already. However they may have dark text shadows or grain overlays that need cleanup.

**Remaining hardcoded `rich-black` references:** 352 matches across 28 files. Most are in legitimately dark-scoped sections (CrossOver, TheSound, VowMoment, PianoPanel, Footer, Hero) which is correct. But some are in components that should be theme-agnostic (e.g., `card.tsx` shadow).

---

## Work Items

### A. Events Page Light Conversion (6 sections → light)

Convert these from `data-theme="death"` to light backgrounds:

| Component | Current BG | New BG | Notes |
|---|---|---|---|
| `EventsExhale` | `--rich-black` + death | `hsl(var(--background))` | Remove `data-theme="death"` |
| `EventsOccasions` | `--events-dark` + death | `hsl(var(--card))` | Warm cream cards on white |
| `EventsApproach` | `--events-approach-bg` + death | `hsl(var(--background))` | Clean white with step cards on cream |
| `EventsThreshold` | `--rich-black` + death | `hsl(var(--card))` | FAQ on cream, subtle warmth |
| `EventsExperience` | Check | `hsl(var(--background))` | Testimonials on white |
| `EventsOffering` | `--events-dark` + death | `hsl(var(--background))` | Pricing cards on cream |

**Keep dark:** `EventsHero` (already correct), `EventsCrossing` (CTA — already correct).

For each file: remove `data-theme="death"`, replace `background` style with semantic token, verify text uses `text-foreground` / `text-muted-foreground`.

### B. Teaching Page Cleanup (5 light sections)

The light teaching sections already use correct light tokens. Audit for:
- Dark text shadows referencing `--rich-black` that are invisible on light backgrounds
- Grain overlay opacity too high for light backgrounds (reduce to 0.03)
- Any hardcoded dark ink colors

**Keep dark:** `TeachingHero`, `TeachingMethodology`, `TeachingThreshold` (immersive dark studio sections).

### C. Section Fade Updates in Teaching & Events Pages

The `SectionFade` components in `Teaching.tsx` and `Events.tsx` pages reference dark tokens for transitions between sections. Update `from`/`to` values to use light-compatible tokens where sections have been converted.

### D. Component-Level Cleanup (3 files)

1. **`card.tsx`** — Shadow uses `rich-black` hardcoded. Replace with `0 0% 0%` (pure black at low opacity works on both themes).
2. **`HeroTagline.tsx`** — Lives inside dark Hero, verify dark scoping is inherited. No change needed if parent has `data-theme="death"`.
3. **`TeachingMethodology.tsx`** — text shadows use `rich-black`. This section stays dark, so these are correct within `data-theme="death"` scope. No change needed.

### E. CSS Token Cleanup

In `src/index.css`:
- Update `--events-approach-bg` from dark (`30 8% 14%`) to light value for non-dark usage, OR remove its usage from light sections
- Verify `--events-dark` / `--events-dark-elevated` / `--events-dark-card` are only used within `data-theme="death"` scoped sections

---

## Files to Modify

1. `src/components/events/EventsExhale.tsx` — remove death theme, use `--background`
2. `src/components/events/EventsOccasions.tsx` — remove death theme, use `--card`
3. `src/components/events/EventsApproach.tsx` — remove death theme, use `--background`
4. `src/components/events/EventsThreshold.tsx` — remove death theme, use `--card`
5. `src/components/events/EventsOffering.tsx` — remove death theme, use `--background`
6. `src/components/events/EventsExperience.tsx` — check and convert if dark
7. `src/pages/Events.tsx` — update SectionFade from/to values
8. `src/pages/Teaching.tsx` — update SectionFade from/to values
9. `src/components/teaching/TeachingExhale.tsx` — audit text shadows
10. `src/components/teaching/TeachingPillars.tsx` — audit text shadows
11. `src/components/teaching/TeachingStories.tsx` — audit text shadows
12. `src/components/teaching/TeachingOffering.tsx` — audit text shadows
13. `src/components/teaching/TeachingCrossing.tsx` — audit text shadows
14. `src/components/ui/card.tsx` — replace `rich-black` shadow with neutral

**Estimated scope:** ~14 files, eliminates ~80 more dark references, makes Events and Teaching pages light-first.

