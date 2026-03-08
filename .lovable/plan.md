

# About Page — Round 5: Igloo.inc-Grade Transitions, Hero Centering, and Final Craft Polish

## Issues Identified

### 1. Hero "THE WITNESS" Label Is Left-Aligned, Not Centered
The hero label renders left of center. It lacks `text-center` on its parent — the `max-w-4xl mx-auto text-center` wrapper should handle it, but the label itself uses template literal classes without explicit `text-center`. The `text-muted-foreground` color also competes with the `opacity-60` — on dark backgrounds this produces an overly faint label. Increase to `opacity-70` for consistency with other section labels (Sustain already uses 0.70).

**Fix in `WitnessHero.tsx`:** Add `text-center` explicitly to the label `p` tag class for safety, increase opacity from 0.60 to 0.70.

### 2. Hero Vibrating String Lacks Reduced Motion Fallback
The vibrating string uses a custom CSS animation class `vibrating-string` but has no `motion-reduce:` fallback on the two `div` elements. Only the center glow dot has `motion-reduce:animate-none`. The string itself would continue vibrating for users who prefer reduced motion.

**Fix in `WitnessHero.tsx`:** Add `motion-reduce:animate-none` class to both `.vibrating-string` divs (lines 84-85).

### 3. Origin Section Image Has Inline Ken Burns at 30s — Not Using CSS Class
The origin image applies `animation: "ken-burns 30s ease-in-out infinite alternate"` via inline style. The project has a standardized `.animate-ken-burns` class (60s timing). However, 30s is intentional for this section (shorter section = faster drift). The issue is that inline animation style lacks `will-change: transform` which can cause jank.

**Fix in `WitnessOrigin.tsx`:** Add `will-change: transform` to the image inline style.

### 4. Presence Section — Witnessed Moments Lack Hover Warmth
The six witnessed moments have `hover:border-primary/30` but no warmth transition — they feel static. Adding a subtle golden thread glow on hover would elevate the interactivity to luxury-grade.

**Fix in `WitnessPresence.tsx`:** Add a hover box-shadow with vow-yellow glow, and transition duration 180ms per Sacred Pacing standards.

### 5. Covenant Certificate — bg-card May Resolve to Wrong Theme Color
`bg-card` in dark theme resolves to the card background variable. If this is a light cream on a dark section, the certificate text (`text-foreground`) may be low contrast. The certificate should use explicit dark styling: a slightly elevated dark surface rather than relying on the theme variable.

**Fix in `WitnessCovenant.tsx`:** Replace `bg-card` with an explicit dark surface: `bg-[hsl(var(--deep-graphite))]` with a subtle warm inner glow, and use `border-primary/20` (up from /15) for the border to make the certificate frame more visible.

### 6. Crossing CTA Button Halo Radius Too Tight
The breathing halo uses `-inset-x-4 -inset-y-3` which creates a tight halo. For a luxury CTA at the page climax, this should breathe wider: `-inset-x-8 -inset-y-5` with a larger gradient spread.

**Fix in `WitnessCrossing.tsx`:** Expand halo insets and increase gradient opacity slightly for more visible warmth.

### 7. Section Transitions Are Uniform — No igloo.inc Variation
All sections use identical `transition-all duration-700` with `translate-y` reveals. Igloo.inc-style transitions use varied entrance choreography: some elements scale, some blur-in, some slide horizontally. The hero already has scale-x on the string, but the other five sections all use the same vertical fade-up. Adding blur-to-sharp on the Covenant certificate and a slight scale entrance on the Presence number would create differentiation.

**Fix in `WitnessPresence.tsx`:** Add `scale-95 blur-sm` to the hidden state of the big "500+" number, transitioning to `scale-100 blur-none`.

**Fix in `WitnessCovenant.tsx`:** Add `blur-sm` to the hidden state of the certificate container, transitioning to `blur-none` — creating a "focus reveal" effect.

### 8. Missing aria-label on Sections
The hero has no `role="region"` or `aria-label`. For accessibility, each section should have proper landmark roles to assist screen reader navigation.

**Fix across all 6 components:** Add `aria-label` to each `<section>` matching its narrative name (e.g., "The Witness — Hero", "The Origin", etc.).

---

## Implementation Plan

### File 1: `WitnessHero.tsx`
- Line 69: Add `text-center` class, change opacity to 0.70
- Lines 84-85: Add `motion-reduce:animate-none` to vibrating-string divs
- Line 18: Add `aria-label="The Witness"`

### File 2: `WitnessOrigin.tsx`
- Line 127-129: Add `willChange: "transform"` to image inline style
- Line 13: Add `aria-label="The Origin"`

### File 3: `WitnessPresence.tsx`
- Lines 134-141: Add hover box-shadow glow and `transition-all duration-[180ms]`
- Lines 89-91: Add `scale-95 blur-sm` / `scale-100 blur-none` to the big number reveal
- Line 23: Add `aria-label="The Presence"`

### File 4: `WitnessCovenant.tsx`
- Line 64: Replace `bg-card` with `bg-[hsl(var(--deep-graphite))]`; add `blur-sm` hidden state
- Line 64: Increase border from `border-primary/15` to `border-primary/20`
- Line 31: Add `aria-label="The Covenant"`

### File 5: `WitnessCrossing.tsx`
- Line 113: Expand halo to `-inset-x-8 -inset-y-5`
- Line 15: Add `aria-label="The Crossing"`

### File 6: `WitnessSustain.tsx`
- Line 30: Add `aria-label="The Sustain"`

---

## Summary

| File | Changes | Purpose |
|------|---------|---------|
| WitnessHero | Label centering, opacity, reduced motion fix | Accessibility + polish |
| WitnessOrigin | will-change, aria-label | Performance + a11y |
| WitnessPresence | Hover glow, scale+blur reveal, aria-label | Igloo.inc transitions |
| WitnessCovenant | Dark bg fix, blur reveal, border visibility, aria-label | Contrast + transitions |
| WitnessCrossing | Wider CTA halo, aria-label | Luxury warmth |
| WitnessSustain | aria-label | Accessibility |

6 files, no new dependencies, no structural changes.

