

# Phase 11: Kill the Cheap — Surgical Visual Quality Upgrade

## Diagnosis

After examining every section on `/teaching` and `/events`, the following elements are making the site feel cheap, tacky, and off-putting:

### 1. AI-Generated Images Are Obvious and Terrible
The 6 AI-generated images created in Phase 10 (`events-ballroom-grand.jpg`, `hands-keys-closeup.jpg`, `piano-macro-hammers.jpg`, `student-learning-moment.jpg`, `teaching-studio-warm.jpg`, `venue-empty-golden.jpg`) are visibly AI-generated with telltale artifacts — uncanny compositions, plastic lighting, impossible geometry. The grand piano in front of mountains on the Events page is particularly egregious. These must be regenerated with far better prompts using the higher-quality model (`google/gemini-3-pro-image-preview`), or replaced with the existing real photography assets.

### 2. Occasion Cards on Events Page Look Like a Bootstrap Template
The `EventsOccasions` component uses `rounded-2xl border border-border p-8` cards with `hover:-translate-y-1 hover:shadow-md`. This is generic SaaS card styling — rounded corners, border, lift-on-hover shadow. Hickory & Rose uses borderless editorial layouts with no card chrome. These need to be redesigned as clean typographic blocks without card containers.

### 3. GoldCornerImage L-Bracket Hover Effects Are Gimmicky
The gold L-bracket corners, letterbox bars, shimmer sweep, and "FR01" frame index marks on every editorial image are excessive decoration. They make the images feel like a filter app rather than editorial photography. The hover effects need to be stripped back to subtle scale + slight shadow, matching H&R's clean image presentation.

### 4. Golden Dots/Threads/Breathing Vignettes Are Everywhere
Every single section has: golden dot anchor, vertical golden thread, breathing vignette, warm glow radial, film grain, pencil annotation, closing golden thread. This repetitive decorative system creates visual noise rather than luxury. The golden threads and breathing dots should be used sparingly — only at key threshold moments — not in every section.

### 5. Section Background Transitions Are Muddy
The alternating `teaching-bg` / `teaching-bg-alt` / `teaching-studio-bg` backgrounds create an unclear visual hierarchy. The warm cream tones are too similar to each other, and the dark sections (methodology, threshold) appear abruptly. H&R uses clean white with generous whitespace, letting the photography do the atmospheric work.

---

## Remediation Plan

### Part A: Regenerate AI Images with Pro Model
Use `google/gemini-3-pro-image-preview` (Nano banana pro) to create 6 replacement images with photorealistic prompts emphasizing natural lighting, shallow depth of field, editorial composition, and warm color grading. Prompts will be much more specific:
- Warm studio: "Professional DSLR photo, Nikon D850, 85mm f/1.4, piano keys in warm golden hour light from a window, shallow depth of field, dust particles visible in light beam, warm color grading, no people, editorial style"
- Grand piano room: "Professional DSLR photo, Canon 5D Mark IV, 35mm, elegant reception room with grand piano, ambient warm lighting, real candles, natural tones, editorial style"
- etc.

**Files:** Replace binary content of 6 files in `src/assets/`

### Part B: Strip Card Chrome from EventsOccasions
Remove `rounded-2xl border border-border p-8 hover:-translate-y-1 hover:shadow-md` card wrappers. Replace with clean borderless typographic blocks separated by thin 1px lines or whitespace. The gold numeral stays but the card container goes.

**File:** `src/components/events/EventsOccasions.tsx`

### Part C: Simplify GoldCornerImage Hover Effects
Strip the L-bracket corners, letterbox bars, shimmer sweep, and frame index marks. Keep the image container with subtle `overflow: hidden`, Ken Burns drift, and a simple scale(1.02) on hover. Remove the gold overlays entirely.

**File:** `src/components/ui/gold-corner-image.tsx`

### Part D: Reduce Golden Thread Repetition
Only the following sections should retain golden dots/threads:
- **Heroes** (all verticals) — keep the dot + scroll cue
- **Process/Methodology** sections — keep the anchor dot
- **Crossing/CTA** sections — keep the thread from above + CTA halo

Remove golden dots, vertical threads, breathing vignettes, pencil annotations, and closing threads from these sections:
- `TeachingExhale` — remove dot, threads, pencil annotation
- `TeachingPillars` — remove dot, threads, pencil annotation
- `TeachingStories` — remove dot separator between stories
- `TeachingOffering` — simplify to just CTA with halo
- `EventsExhale` — remove excessive golden elements
- `EventsExperience` — simplify

**Files:** 6-8 teaching/events component files

### Part E: Clean Up Section Backgrounds
Unify light sections to use `hsl(var(--background))` (the warm white) instead of multiple cream variants. Reserve `card` background for truly elevated surfaces. Remove breathing vignette animations from light-background sections entirely — they're imperceptible on light backgrounds and just add rendering cost.

**Files:** Multiple teaching/events components — background color simplification

---

## Summary of Changes

| Area | Current Problem | Fix |
|------|----------------|-----|
| 6 AI images | Visibly fake, plastic lighting | Regenerate with pro model + better prompts |
| Occasion cards | Bootstrap-style rounded cards | Borderless typographic blocks |
| GoldCornerImage | Gimmicky gold corners + shimmer | Simple hover scale, no decorative overlays |
| Golden dots/threads | In every section (visual noise) | Only in heroes, process, crossings |
| Section backgrounds | 5+ similar cream variants | Unified warm white + white |
| Breathing vignettes | On light backgrounds (invisible) | Remove from light sections |

### Files to Modify
- `src/assets/*.jpg` — 6 image replacements
- `src/components/ui/gold-corner-image.tsx` — strip decorative overlays
- `src/components/events/EventsOccasions.tsx` — remove card chrome
- `src/components/teaching/TeachingExhale.tsx` — strip golden decorations
- `src/components/teaching/TeachingPillars.tsx` — strip golden decorations
- `src/components/teaching/TeachingStories.tsx` — strip golden decorations
- `src/components/teaching/TeachingOffering.tsx` — simplify background + decorations
- `src/components/events/EventsExhale.tsx` — strip golden decorations
- `src/components/events/EventsExperience.tsx` — simplify decorations

