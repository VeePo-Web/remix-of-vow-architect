

# Round 15 — Process Intro Block: Fantasy.co-Quality Background and Scroll Animation

## Current State Assessment

The process intro block ("The Process / Excellence on the big day...") already has:
- A `GradientDawnBackground` with warm walnut-to-espresso gradient, paper texture, candlelight glow pools, grain, and vignette
- A staggered scroll-reveal animation (anchor dot at T+200ms through statement at T+1800ms)
- Centered text layout with max-width constraints

### What falls short of Fantasy.co quality:

1. **The background gradient starts abruptly** -- the transition from the previous section (TheExhale) into the warm dawn gradient has no cinematic entry. The top 8-25% of the gradient jumps from `hsl(40 25% 90%)` (bright cream) to dark tones, creating a jarring warm band at the very top.

2. **No scroll-linked parallax on the background** -- the gradient dawn is completely static. At Fantasy.co, backgrounds respond subtly to scroll position, creating depth and presence. The candlelight glow pools animate on a timer but have no relationship to the user's scroll.

3. **The golden anchor dot is tiny and underwhelming** -- it appears as an 8px circle. For a section entrance at this emotional weight, it needs to feel like a single candle flame igniting in darkness, not a UI dot.

4. **No vertical golden thread connecting intro to movements** -- the intro block ends and the movement cards begin with no visual connective tissue. A thin golden line growing downward from the anchor dot would create narrative continuity.

5. **The "First Moment" emphasis lacks a reveal flourish** -- the vow-yellow italic text just fades in. At Fantasy.co quality, this would have a subtle underline draw or glow bloom to mark it as the emotional peak of the intro.

---

## The 5-Step Plan

### Step 1: Refine the Gradient Dawn Entry -- Cinematic Top Transition

The top of the gradient currently starts with `hsl(40 25% 90%)` (bright cream) which creates a visible warm seam against the dark section above. Fix by adjusting the journal gradient to start dark and warm into the walnut tones, ensuring a seamless transition from TheExhale's dark exit.

**File:** `src/index.css` (lines 3227-3237)
- Change the gradient's first two stops: start from `hsl(220 15% 6%)` (matching TheExhale's dark exit), then transition smoothly into the warm walnut tones by 15-20%.
- This creates a "dawn emerging from darkness" effect rather than a hard color cut.

### Step 2: Add Scroll-Linked Background Parallax

Add a subtle scroll-responsive vertical shift to the `GradientDawnBackground` layers. As the user scrolls through the intro, the candlelight pools and paper texture shift at different rates (0.05x and 0.02x parallax), creating depth without performance cost.

**File:** `src/components/process/ProcessSection.tsx`
- Add a scroll listener (using `useEffect` + `requestAnimationFrame`) scoped to the intro block that calculates a `--scroll-y` CSS variable.
- Keep it lightweight: only active when section is in viewport (use existing IntersectionObserver pattern).

**File:** `src/index.css`
- Add `transform: translateY(calc(var(--scroll-y, 0) * 0.05))` to `.gradient-dawn--journal .gradient-dawn__candlelight` elements.
- Add `transform: translateY(calc(var(--scroll-y, 0) * 0.02))` to `.gradient-dawn--journal .gradient-dawn__paper`.
- Use `will-change: transform` only when active.

### Step 3: Elevate the Golden Anchor Dot to a Flame Ignition

Transform the 8px anchor dot into a cinematic flame ignition moment. When the intro scrolls into view, the dot scales from 0 to full size with a radial glow bloom that expands outward (like lighting a candle), then settles into the existing 4.2s breathing pulse.

**File:** `src/index.css` (lines 1768-1791)
- Increase dot size to 10px with a larger `box-shadow` glow spread (three layers: tight bright, medium warm, wide ambient).
- Add a one-time `@keyframes flame-ignite` animation: scale(0) -> scale(1.8) -> scale(1) with glow bloom expanding over 900ms.
- Chain: flame-ignite plays once on reveal, then the breathing pulse takes over via `animation` shorthand with comma-separated values.

### Step 4: Add a Growing Golden Thread Below the Intro

After the intro block reveals, a thin golden vertical line (1px, vow-yellow at 30% opacity) grows downward from the anchor dot toward the first movement card. This creates visual continuity -- the "thread" that stitches the narrative together.

**File:** `src/components/process/ProcessSection.tsx`
- Add a `<div className="process-intro__thread" aria-hidden="true" />` after the intro block, inside the section.

**File:** `src/index.css`
- Style `.process-intro__thread`: 1px wide, centered, vow-yellow at 30% opacity, `height: 0`, positioned between intro and movements.
- On `.process-intro.is-visible ~ .process-intro__thread` (or via a sibling/parent class): animate height from 0 to 80px over 1200ms with `transition-delay: 2200ms` (after the last intro element reveals).
- Add a soft radial glow at the thread's tip (4px spread, vow-yellow at 15% opacity).

### Step 5: Add Underline Draw to "First Moment" Emphasis

The "First Moment" text currently uses `.exhale-emphasis` (vow-yellow italic). Add a subtle underline draw animation that activates at T+2000ms (200ms after the statement text reveals), using a `scaleX(0) -> scaleX(1)` pseudo-element.

**File:** `src/index.css` (around line 1915-1918)
- Add `::after` pseudo-element to `.process-intro__statement .exhale-emphasis`: 2px height, vow-yellow background, `transform: scaleX(0)`, `transform-origin: left`, `transition: transform 450ms var(--ease-sacred)`.
- On `.process-intro.is-visible .process-intro__statement .exhale-emphasis::after`: `transform: scaleX(1)`, `transition-delay: 2200ms`.
- Reduced motion: skip the draw, show underline immediately with opacity fade.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/index.css` | Fix gradient dawn top stops for dark-to-warm transition |
| 2 | `src/components/process/ProcessSection.tsx` | Add scroll-linked `--scroll-y` CSS variable |
| 2 | `src/index.css` | Add parallax transforms to candlelight and paper layers |
| 3 | `src/index.css` | Flame ignition keyframes and elevated glow for anchor dot |
| 4 | `src/components/process/ProcessSection.tsx` | Add golden thread div element |
| 4 | `src/index.css` | Thread grow animation styles |
| 5 | `src/index.css` | "First Moment" underline draw animation |

No copy changes. No pricing changes. No new dependencies. Pure visual and animation refinement for Fantasy.co-level cinematic quality.

