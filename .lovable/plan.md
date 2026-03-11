

# Phase 3: Homepage Section Light Conversion

## Problem

Despite the Phase 1 token inversion and Phase 2 About-page purge, the homepage is still **95% dark**. Of the 10 homepage sections, 8 have `data-theme="death"` forcing dark rendering. Only `TheWitnesses` and `TheWitness` use `data-theme="life"`. The site does not feel like Hickory & Rose at all — it still reads as a dark, cinematic experience.

## What Hickory & Rose Actually Looks Like

Warm white (`40 20% 98%`) background with dark brown text. Content sections on cream. Dark hero only. Alternating white/cream rhythm. Gold accents at low opacity on light backgrounds. Clean, airy, breathing space.

## Conversion Strategy

Each homepage section falls into one of three categories:

**Convert to Light** (remove `data-theme="death"`, replace hardcoded dark backgrounds with semantic tokens):
1. **TheExhale** — Sacred declaration. Currently dark. Convert to warm white with dark text. Replace grain/vignette dark overlays with subtle cream-toned ones.
2. **ProcessSection + GradientDawnBackground** — Currently dark warm tones (`35 20% 8%`). Convert CSS vars to light paper tones (`35 20% 96%`). Already has "dawn" concept — make it literal.
3. **TheInvitation** — Currently forced dark with `invitation-bg-top/bottom` CSS vars. Convert to light split layout (image left, warm white content right).
4. **TheTransformation** — Fear-to-life gradient. Convert to light: fears on cream, resolutions on white, images still anchored with subtle shadows.
5. **ThreePaths** — Pricing. Convert to warm white with cream cards. Remove dark background image overlay treatment.
6. **TheWitnesses** — Already `data-theme="life"`. Already working. Just verify.
7. **TheWitness** — Already `data-theme="life"`. Already working.

**Keep Dark** (cinematic/immersive, correct to stay dark):
1. **Hero (Vigil sequence)** — Full-bleed photo, stays dark
2. **VowMoment** — Altar interstitial, cinematic pause — stays dark
3. **TheSound** — Listening environment with audio player — stays dark
4. **CrossOver** — Final CTA with background image — stays dark

## Files to Modify

### Homepage Sections (5 files to convert light)
1. `src/components/TheExhale.tsx` — Remove `data-theme="death"`, replace dark gradient/grain with light semantic tokens, change text colors to use `text-foreground`/`text-muted-foreground`
2. `src/components/process/ProcessSection.tsx` — Change CSS vars from dark (`8%` lightness) to light (`96%` lightness)
3. `src/components/process/GradientDawnBackground.tsx` — Verify/update gradient layers for light mode
4. `src/components/TheInvitation.tsx` — Remove `data-theme="death"`, replace `invitation-bg-top/bottom` dark vars with light background, adjust text shadows
5. `src/components/TheTransformation.tsx` — Remove `data-theme="death"`, replace `transform-dark/mid/warm/light` CSS vars with light equivalents, remove dark text shadows
6. `src/components/ThreePaths.tsx` — Remove `data-theme="death"`, remove dark background image treatment, use `bg-card` for pricing cards on `bg-background`

### Section Transition Fades (within same files)
Every "section-fade-top" gradient that fades to `rich-black` needs to fade to `var(--background)` instead.

### CSS Token Updates (1 file)
7. `src/index.css` — Update `--invitation-bg-top`, `--invitation-bg-bottom`, `--transform-dark`, `--transform-mid`, `--transform-warm`, `--transform-light` CSS custom properties to light-mode values under `:root`

### Navigation (2 files)
8. `src/components/MinimalHeader.tsx` — Scrolled header background from `rich-black/0.94` to warm white with subtle shadow
9. `src/components/MobileStickyBar.tsx` — Convert from dark to light styling

### Remaining Hardcodes in Dark-Scoped Sections (cleanup)
10. `src/components/CrossOver.tsx` — Keep `data-theme="death"`, but replace bare `rich-black`/`deep-graphite` with semantic tokens from death theme
11. `src/components/VowMoment.tsx` — Same cleanup

## Key Visual Transformations

**TheExhale (dark → light):**
- Background: `hsl(var(--background))` (warm white)
- Alternating section feel: use `bg-[hsl(var(--card))]` for subtle warmth
- Gold thread/dot accent stays but at reduced opacity for light bg
- Text: `text-foreground` (dark brown) instead of white

**ProcessSection (dark → light):**
- CSS vars: `--process-bg-l: 96%` instead of `8%`
- Journal cards on cream, section on warm white
- Images get subtle warm shadow instead of dark glow

**TheInvitation (dark → light):**
- Remove dark gradient background entirely
- Use `bg-background` with image in a contained frame
- Text in `text-foreground`/`text-muted-foreground`

**TheTransformation (dark → light):**
- Fear column: cream background with subtle left border
- Life column: white background
- Images: contained with warm shadows, not full-bleed dark

**ThreePaths (dark → light):**
- Remove background image + dark overlay
- White cards with cream hover, gold accent borders
- Clean pricing typography in dark brown

**MinimalHeader (dark → light):**
- Scrolled state: `bg-background/95 backdrop-blur-md shadow-sm` instead of `rich-black/0.94`
- Logo and nav links in `text-foreground`

## Estimated Impact
- 11 files modified
- Converts ~60% of visible homepage area from dark to light
- Remaining dark sections (Hero, VowMoment, TheSound, CrossOver) become dramatic contrast moments rather than the default
- Achieves the Hickory & Rose warm-white rhythm with strategic dark punctuation

