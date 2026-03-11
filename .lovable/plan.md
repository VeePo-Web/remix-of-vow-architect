

# Full Visual Overhaul: Dark-First to Light-First (Hickory & Rose Aesthetic)

## Scope Assessment

The current site defaults to a dark "Death" theme with 544 hardcoded references to dark palette tokens (`rich-black`, `ebon-charcoal`, `deep-graphite`) across 44 component files. There is already a `[data-theme="life"]` variant defined in `index.css` (lines 294-336) with light token mappings, but it was designed as a secondary theme for specific pages only.

The overhaul requires three phases:

---

## Phase 1: Foundation — Theme System Inversion

**File: `src/index.css`**

Swap the default `:root` tokens so light is the default experience:
- `--background` becomes warm white (`40 20% 98%`, matching Hickory & Rose)
- `--foreground` becomes dark text (`30 18% 16%`)
- `--card` becomes warm cream (`40 30% 95%`)
- `--primary` remains `--vow-yellow` but with dark foreground for contrast
- `--muted-foreground` shifts to warm brown-grey (`30 12% 32%`)
- `--border` / `--input` become warm light borders (`35 20% 88%`)
- Surface/ink/lines tokens all remapped for light-first

The existing `[data-theme="life"]` block becomes the new `:root`. The current `:root` dark values move into `[data-theme="death"]` as the alternate dark theme (preserved for the Vigil hero sequence and any future dark sections).

**File: `src/components/ThemeProvider.tsx`**
- Change `defaultTheme` from `"death"` to `"life"`

**File: `src/hooks/usePageTheme.ts`**
- Invert route mapping: most routes default to `"life"`, with only specific cinematic sections optionally using `"death"`

---

## Phase 2: Component Hardcode Purge (44 files)

Every component that hardcodes `hsl(var(--rich-black))`, `hsl(var(--ebon-charcoal))`, or `hsl(var(--deep-graphite))` as inline backgrounds/gradients needs migration. This is the bulk of the work.

**Strategy:** Rather than rewriting every section to be light, convert hardcoded dark backgrounds to use semantic tokens (`var(--background)`, `var(--foreground)`, `var(--card)`) so they automatically respond to the new light default. Sections that are intentionally dark (hero, crossing CTA, dark bands) keep their explicit dark treatment but use a CSS class like `section--dark` that applies a local dark scope.

**Priority files (highest visual impact):**
1. `TheExhale.tsx` — hardcoded `rich-black`/`ebon-charcoal` gradient background
2. `CrossOver.tsx` — hardcoded `deep-graphite`/`rich-black` radial
3. `TheSound.tsx` — dark listening environment
4. `VowMoment.tsx` — altar interstitial
5. `TheTransformation.tsx` — fear-to-life section
6. `TheWitness.tsx` — exhale surface
7. `TheWitnesses.tsx` — testimonials
8. `ThreePaths.tsx` — pricing paths
9. `TheInvitation.tsx` — meet section
10. `ProcessSection.tsx` + `GradientDawnBackground.tsx` — journal system
11. All witness/* sections (WitnessHero, WitnessOrigin, etc.)
12. All events/* and teaching/* sections
13. `MinimalHeader.tsx` — header atmospheric layers
14. `Footer.tsx` — footer dark band
15. `FullScreenMenu.tsx` — menu overlay
16. `PianoKeyNav.tsx` — piano navigation
17. `HeroTagline.tsx` — hero text shadows
18. `GenreTrackPanel.tsx` — audio player
19. `Gateway.tsx` — service gateway cards
20. All contact/pricing pages

**For each file:** Replace hardcoded dark HSL values with semantic tokens. Sections meant to remain dark get wrapped in a `data-theme="death"` scope or use the `section--dark` class.

---

## Phase 3: Visual Language Alignment with Hickory & Rose

With the light foundation in place, refine the aesthetic to match the Hickory & Rose warmth:

1. **Typography warmth** — Body text color shifts from pure white-on-black to warm dark brown (`30 18% 16%`) on warm white. Muted text becomes warm grey-brown rather than cool grey.

2. **Card surfaces** — Cards use warm cream (`40 30% 95%`) instead of dark charcoal. Borders become warm hairlines (`35 20% 88%`).

3. **Gold accent recalibration** — `--vow-yellow` opacity thresholds adjust for light backgrounds (lower opacity needed for subtlety on white vs. on black).

4. **Hero section** — The Vigil hero with its dark cinematic image stays dark (it's a full-bleed photo with overlay). This is the one section that retains the dark atmosphere.

5. **Section rhythm** — Alternate between `bg-background` (warm white) and `bg-card` (warm cream) for visual rhythm, matching Hickory & Rose's alternating white/cream pattern.

6. **Shadows** — Shift from `rich-black` based shadows to warm, subtle shadows: `0 4px 20px hsl(30 10% 10% / 0.06)`.

7. **Selection color** — Add `::selection` styling with primary color tint.

---

## Execution Order

Given the scale (~44 files), implementation will proceed in batches:

**Batch 1** (Foundation): `index.css`, `ThemeProvider.tsx`, `usePageTheme.ts`
**Batch 2** (Homepage sections): `TheExhale`, `ProcessSection`, `VowMoment`, `TheInvitation`, `TheSound`, `TheTransformation`, `TheWitness`, `ThreePaths`, `TheWitnesses`, `CrossOver`
**Batch 3** (Navigation): `MinimalHeader`, `FullScreenMenu`, `PianoKeyNav`, `Footer`, `MobileStickyBar`
**Batch 4** (About pages): All witness/*, events-about/*, teaching-about/* sections
**Batch 5** (Remaining pages): Gateway, Contact, Pricing, FAQ, Proof, Listen, Events, Teaching landing pages
**Batch 6** (UI components): `GoldCornerImage`, `GenreTrackPanel`, `AudioPlayer`, `ShimmerButton`, policy pages

---

## What Stays Dark

- **Hero section** — Full-bleed cinematic image with dark overlays (stays as-is)
- **Footer dark band** — Classic luxury footer pattern (dark bottom bookend)
- **Full-screen menu overlay** — Remains dark for dramatic contrast
- **Audio player / listening environment** — Dark for immersive focus

These sections will use explicit `data-theme="death"` scoping or hardcoded dark values intentionally.

---

## Risk Mitigation

- The dual-theme system is preserved — users can still toggle, and the "death" theme exists as an alternate
- All 44 files with hardcoded dark values are identified; none will be missed
- Gold gradient numerals and editorial marks work on both light and dark backgrounds (they use `--vow-yellow` which is theme-aware)
- `motion-reduce` and accessibility patterns are unaffected

