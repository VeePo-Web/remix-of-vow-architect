

# Light-First Overhaul — Phase 2: Remaining Hardcoded Dark Purge

## Current State

Phase 1 (foundation) is complete: `:root` tokens are now light, `defaultTheme` is `"life"`, and `data-theme="death"` has been added to ~18 intentionally-dark sections. However, **513 hardcoded references** to `rich-black`, `ebon-charcoal`, and `deep-graphite` remain across **40 component files**. Many sections that should render on warm white still have dark gradients, vignettes, and text shadows baked in.

The Gateway page renders correctly on warm white. The About page hero still works (dark hero with `data-theme="death"` implied by its hardcoded background). But sections like WitnessSustain, WitnessCovenant, Presence cards, and all About-page crossing/covenant sections still render with dark gradients on what should now be a light page.

## Strategy

Two categories of remaining work:

**Category A — Sections that should be LIGHT** (replace dark hardcodes with semantic tokens or warm-cream alternatives):
- `WitnessSustain`, `EventsAboutSustain`, `TeachingAboutSustain` — gradients use `deep-graphite`, should use `var(--card)` or warm cream
- `WitnessCovenant`, `EventsAboutCovenant`, `TeachingAboutCovenant` — certificate cards use `deep-graphite` bg, should use `var(--card)` with warm border
- `WitnessPresence`, `EventsAboutPresence`, `TeachingAboutPresence` — moment cards use `rich-black`/`ebon-charcoal` hover backgrounds, should use `var(--card)` hover
- `WitnessOrigin`, `EventsAboutOrigin`, `TeachingAboutOrigin` — section fades reference dark tokens
- `GradientDawnBackground` (process section journal) — uses warm paper tones but has dark fallbacks
- `PricingPreview`, `ComparisonTable`, `PricingAddOns` and other pricing components
- `FAQTopTen`, `FAQChips`, `FAQTrustStack` and FAQ components
- `ContactReassuranceCards`, `ContactSLATimeline` and contact components

**Category B — Sections that should stay DARK** (already have or need `data-theme="death"`, keep hardcodes but ensure text is readable):
- All Hero sections (already handled)
- `WitnessCrossing`, `EventsAboutCrossing`, `TeachingAboutCrossing` — CTA sections, stay dark
- `EventsAboutHero`, `TeachingAboutHero` — stay dark
- `TeachingHero`, `EventsHero` — stay dark (already handled)
- `PianoPanel`, `GenreCard`, `GenreTrackPanel` — audio/listening UI, stay dark
- `HeroTagline` — text shadows on dark hero image, stays as-is

## Files to Modify

### Batch A: About Page Sections → Light (9 files)
1. `src/components/witness/WitnessSustain.tsx` — replace `deep-graphite` gradient with `var(--card)` gradient
2. `src/components/witness/WitnessCovenant.tsx` — certificate card: `bg-card` instead of `bg-deep-graphite`, warm shadows, remove dark bottom fade
3. `src/components/witness/WitnessPresence.tsx` — moment card hover: `var(--card)` instead of `rich-black`
4. `src/components/events-about/EventsAboutSustain.tsx` — same as WitnessSustain
5. `src/components/events-about/EventsAboutCovenant.tsx` — same as WitnessCovenant
6. `src/components/events-about/EventsAboutPresence.tsx` — same as WitnessPresence
7. `src/components/teaching-about/TeachingAboutSustain.tsx` — same
8. `src/components/teaching-about/TeachingAboutCovenant.tsx` — same
9. `src/components/teaching-about/TeachingAboutPresence.tsx` — same

### Batch B: About Page Sections → Dark scoping (6 files)
10. `src/components/events-about/EventsAboutHero.tsx` — add `data-theme="death"`
11. `src/components/events-about/EventsAboutCrossing.tsx` — add `data-theme="death"`
12. `src/components/teaching-about/TeachingAboutHero.tsx` — add `data-theme="death"`
13. `src/components/teaching-about/TeachingAboutCrossing.tsx` — add `data-theme="death"`
14. `src/components/witness/WitnessCrossing.tsx` — already has `data-theme="death"` but verify
15. `src/components/witness/WitnessHero.tsx` — already has changes, verify

### Batch C: Teaching/Events dark sections → Dark scoping (4 files)
16. `src/components/teaching/TeachingExhale.tsx` — add `data-theme="death"`
17. `src/components/teaching/TeachingPillars.tsx` — add `data-theme="death"`
18. `src/components/teaching/TeachingStories.tsx` — add `data-theme="death"`
19. `src/components/teaching/TeachingOffering.tsx` — add `data-theme="death"`
20. `src/components/teaching/TeachingCrossing.tsx` — add `data-theme="death"`

### Batch D: Audio/Listen dark scoping (4 files)
21. `src/components/PianoPanel.tsx` — add `data-theme="death"`
22. `src/components/GenreCard.tsx` — stays dark, add `data-theme="death"`
23. `src/components/GenreTrackPanel.tsx` — add `data-theme="death"`
24. `src/components/AudioPlayer.tsx` — add `data-theme="death"`

### Batch E: Remaining pages with dark references (6+ files)
25. `src/pages/Gateway.tsx` — card overlays use `rich-black`, fine for image overlays
26. `src/pages/Contact.tsx` — check for dark references
27. `src/pages/Pricing.tsx` — check for dark references
28. `src/pages/FAQ.tsx` — check for dark references
29. `src/pages/Listen.tsx` — stays dark, add `data-theme="death"`
30. `src/pages/Proof.tsx` — check for dark references

### Batch F: Remaining components
31. `src/components/process/GradientDawnBackground.tsx` — uses CSS classes, verify index.css has correct light values
32. `src/components/SoundDirectorSection.tsx` — dark section scoping
33. Various smaller components with text shadows referencing `rich-black`

## Key Transformations

**Sustain sections** (light):
```
Before: background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--deep-graphite)) 50%, hsl(var(--background)) 100%)"
After:  background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 50%, hsl(var(--background)) 100%)"
```

**Covenant certificate** (light):
```
Before: bg-[hsl(var(--deep-graphite))] with rich-black shadows
After:  bg-card with warm shadows (0 20px 60px hsl(30 10% 10% / 0.06))
```

**Presence cards** (light):
```
Before: background: hsl(var(--rich-black)) on hover
After:  background: hsl(var(--card)) on hover
```

**Bottom fades** (light sections):
```
Before: background: "linear-gradient(to bottom, transparent, hsl(var(--rich-black)) 85%)"
After:  background: "linear-gradient(to bottom, transparent, hsl(var(--background)) 85%)"
```

## Estimated Scope
- ~30 files modified
- Eliminates remaining ~400 hardcoded dark references
- All light sections use semantic tokens exclusively
- All dark sections properly scoped with `data-theme="death"`

