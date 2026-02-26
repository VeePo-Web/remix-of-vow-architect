

# Homepage Sections 3-9 — Post-Process Cinematic Polish

## Current State

The Process section (Steps 1-7) is now fully elevated with frosted glass cards, atmospheric image layers, breathing golden thread, section fades, and closing block CTA glow. However, the remaining six sections after the Process — VowMoment, TheInvitation, TheSound, TheTransformation, TheWitness, ThreePaths, TheWitnesses, and CrossOver — while already quite strong, have inconsistencies and gaps when measured against the Process section's new standard.

### Issues Identified Across Remaining Sections

1. **ThreePaths pricing cards use inline `onMouseEnter`/`onMouseLeave` JavaScript** for hover effects instead of CSS-only transitions. This is fragile, non-performant, and creates visual glitches when rapidly hovering. The cards also lack the `transition-[box-shadow] duration-[180ms]` brand standard — they use `duration-300` instead.

2. **TheWitnesses testimonial cards lack frosted glass treatment** — They use a `border-l-2` with inline border color but no `backdrop-filter`, no inset shadows, and no golden hover glow matching the Process card standard. The testimonial quotes are anonymous ("A spring bride, Canmore") which reads as placeholder text rather than real social proof.

3. **CrossOver final CTA section has no bottom fade** — It ends abruptly before the Footer. Every other section has `section-fade-bottom`; this one is missing it. The section also uses the old `ken-burns` keyframe name (generic) instead of a section-specific one.

4. **TheSound listening room panel lacks reduced-motion fallbacks** for its wave animations (`sound-wave-0` through `sound-wave-3`). The `<style>` tag injects CSS at runtime which is not ideal for performance — these keyframes should be in `index.css`.

5. **TheTransformation center divider uses duplicate `divider-breathe` animation** on both the line and the diamond, causing double-pulsing visual noise. The diamond should have its own timing offset.

6. **TheWitness "What I bring" kit list** uses generic `text-muted-foreground` styling without any hover interaction or visual hierarchy to differentiate equipment items. The gold dot separators are plain text characters, not styled consistently with the breathing diamond system.

7. **VowMoment section-fade-top uses wrong gradient direction** — `linear-gradient(to top, transparent, hsl(40 25% 90%))` fades from the Process warm tone correctly, but the CSS class `section-fade-top` is positioned at `top:0` with the gradient going upward, which means the color should be at the top blending down. Current implementation is inverted.

---

## The 7-Step Transformation

### Step 1: ThreePaths Card Hover — CSS-Only Refactor

Remove inline JavaScript `onMouseEnter`/`onMouseLeave` handlers from `ThreePaths.tsx` pricing cards and replace with pure CSS hover states.

**Changes in `ThreePaths.tsx`:**
- Remove `onMouseEnter` and `onMouseLeave` event handlers from all three path cards
- Add CSS class `three-paths-card` to each card
- Add CSS class `three-paths-card--chosen` to the "Most Selected" card
- Move all inline `style` properties (background, border, boxShadow, backdropFilter) into the CSS classes

**Changes in `src/index.css`:**
- Add `.three-paths-card` base styles with `transition: box-shadow 180ms var(--ease-sacred), border-color 180ms var(--ease-sacred), transform 260ms var(--ease-covenant)`
- Add `.three-paths-card:hover` with golden glow and border-color change
- Add `.three-paths-card--chosen` with elevated shadow and yellow border
- Add `will-change: transform` for GPU compositing on hover lift

### Step 2: TheWitnesses Testimonial Elevation

Upgrade testimonial cards with frosted glass treatment and warm atmospheric styling.

**Changes in `TheWitnesses.tsx`:**
- Add `backdrop-filter: blur(6px)` and `background: hsl(45 28% 95% / 0.7)` to each testimonial block
- Replace `border-l-2` with a more refined `border-left: 2px solid hsl(var(--vow-yellow) / 0.25)` with subtle glow
- Add `rounded-lg` for softer card edges and `p-8` padding for breathing room
- Add `transition: box-shadow 180ms` with golden hover glow on each testimonial card
- Add inset shadow: `inset 0 1px 0 rgba(255,255,255,0.1)` for top-light catch

### Step 3: CrossOver Bottom Fade and Animation Fix

Add the missing bottom fade to CrossOver and fix the generic keyframe name.

**Changes in `CrossOver.tsx`:**
- Add `section-fade-bottom` div before closing `</section>` with gradient fading to Footer's dark background
- Rename inline animation from `crossover-ken-burns` to match existing definition or add new keyframe

**Changes in `src/index.css`:**
- Add `@keyframes crossover-ken-burns` if not already defined (it may be referenced but missing, causing no animation)
- Verify `crossover-dust` keyframe also exists

### Step 4: TheSound Wave Keyframes — Move to CSS

Move the runtime `<style>` tag keyframes from `TheSound.tsx` into `src/index.css` for performance and add reduced-motion fallbacks.

**Changes in `TheSound.tsx`:**
- Remove the `<style>` tag containing `sound-wave-0` through `sound-wave-3` keyframes

**Changes in `src/index.css`:**
- Add the four `@keyframes sound-wave-N` definitions
- Add `@media (prefers-reduced-motion: reduce)` rule that sets all waveform bars to static height with `animation: none`
- Add `@keyframes sound-ken-burns` if not already defined

### Step 5: TheTransformation Divider Fix

Fix the double-pulse issue on the center divider by offsetting the diamond's animation timing.

**Changes in `TheTransformation.tsx`:**
- Add `animationDelay: '2s'` to the diamond's `divider-breathe` animation, creating an offset from the line's pulse so they alternate rather than double-pulse
- Alternatively, create a separate `diamond-focal-breathe` keyframe with different opacity range

**Changes in `src/index.css`:**
- Add `@keyframes transform-fear-kb` and `@keyframes transform-life-kb` if not already defined (they are referenced in TheTransformation but may be missing from CSS)

### Step 6: TheWitness Kit List Polish

Upgrade the "What I bring" equipment list with subtle visual hierarchy.

**Changes in `TheWitness.tsx`:**
- Replace plain text dot separators (`·`) with styled `<span>` elements matching the breathing diamond aesthetic (smaller, golden, with subtle glow)
- Add `font-display` to kit item labels for typographic consistency
- Add subtle hover state to each kit item: `transition: color 180ms` with `hover:text-foreground`

### Step 7: VowMoment Fade Direction Fix and Performance Audit

Fix the inverted section-fade-top gradient and audit all remaining sections.

**Changes in `VowMoment.tsx`:**
- Fix `section-fade-top` inline background: change from `linear-gradient(to top, transparent, hsl(40 25% 90%))` to `linear-gradient(180deg, hsl(40 25% 90%) 0%, transparent 100%)` — the color should be at the top of the div, fading to transparent downward

**Across all modified files:**
- Verify all Ken Burns animations have corresponding `@keyframes` in `src/index.css`
- Verify all `will-change` properties are present on animated elements
- Verify all hover transitions use `180ms` (brand standard)
- Verify `prefers-reduced-motion` fallbacks exist for all new animations
- Verify no horizontal overflow on mobile from blur effects

---

## Summary of Files Modified

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `ThreePaths.tsx`, `src/index.css` | CSS-only card hover, remove JS handlers |
| 2 | `TheWitnesses.tsx` | Frosted glass testimonial cards |
| 3 | `CrossOver.tsx`, `src/index.css` | Bottom fade + keyframe verification |
| 4 | `TheSound.tsx`, `src/index.css` | Move wave keyframes to CSS + reduced-motion |
| 5 | `TheTransformation.tsx`, `src/index.css` | Divider animation offset + missing keyframes |
| 6 | `TheWitness.tsx` | Kit list polish + typography |
| 7 | `VowMoment.tsx`, all files | Fade fix + performance audit |

No content changes. No new dependencies. Copy remains identical. Pure refinement of interactions, performance, and visual consistency.

