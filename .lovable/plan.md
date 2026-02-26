

# Round 17 -- Process Intro: Second Refinement Pass

## Critique of Current State

After Rounds 15-16, the Process intro has a warm gradient dawn background, flame-ignite anchor dot, golden thread, parallax candlelight pools, and a "First Moment" underline draw. The CSS bugs from Round 16 are fixed. However, viewing the implementation critically against Fantasy.co standards, five issues remain:

### Issue 1: The Top Fade Color Does Not Match the New Gradient

The `process-section__fade-top` uses `hsl(20 20% 5%)` -- a warm brown-black. But in Round 15, the gradient dawn base was changed to start at `hsl(220 15% 6%)` -- a cool blue-black. This creates a visible color mismatch at the very top of the section where the fade overlay sits on top of the gradient. The fade needs to match the gradient's starting color.

### Issue 2: The Intro Block Has Competing Opacity Transitions

The `.process-intro` container itself has `opacity: 0 -> 1` with `transform: translateY(24px) -> 0` on scroll reveal. But each child element *also* has its own `opacity: 0 -> 1` with `translateY` transitions. This means during reveal, the container fades in (making children partially visible immediately) while children have their own staggered fade-ins. The result: children appear at reduced opacity during the container's transition, then pop to full. The container-level transition should be removed -- let the children handle their own reveals independently.

### Issue 3: The Parallax Multiplier Is Too Subtle

The `--process-scroll-y` variable tracks `-rect.top` in pixels. With a multiplier of `0.05` for candlelight and `0.02` for paper, a 1000px scroll produces only 50px and 20px of movement respectively. Since the candlelight pools are 400x400px positioned at corners, 50px is barely perceptible. Increase to `0.08` and `0.04` for noticeable but still elegant depth.

### Issue 4: No Ambient Warmth Shift During Scroll

The background is static once rendered -- the warm tones don't evolve as the user scrolls deeper into the process. At Fantasy.co quality, the background should subtly warm as the user progresses (the "dawn" metaphor -- darkness at entry, warmth deepening as preparation unfolds). This can be achieved by using the existing `--process-scroll-y` variable to shift the gradient's opacity or warmth layer.

### Issue 5: The Golden Thread Tip Dot Lacks Glow Coherence

The thread's `::after` tip dot uses a simple `box-shadow` with `0 0 8px` spread. This is too small and dim compared to the flame-ignite anchor dot above. The tip should have a matching triple-layer glow that creates visual continuity -- the thread appears to "carry" the flame's light downward.

---

## 5-Step Refinement Plan

### Step 1: Fix Top Fade Color to Match Gradient Entry

**File:** `src/index.css` (lines 3867-3881)

Change the `.process-section__fade-top` gradient from `hsl(20 20% 5%)` to `hsl(220 15% 6%)` to match the gradient dawn base's starting color. This eliminates the warm/cool color seam at the section's top edge.

### Step 2: Remove Container-Level Opacity/Transform Transition

**File:** `src/index.css` (lines 1741-1760)

Remove the `opacity: 0`, `transform: translateY(24px)`, and the associated transition from `.process-intro`. Set it to `opacity: 1` and `transform: none` by default. The `.process-intro.is-visible` rule can be removed entirely. This lets the per-element stagger timings (anchor at T+200ms, label at T+400ms, etc.) work cleanly without a competing container-level fade.

The `is-visible` class is still needed for child selectors (`.process-intro.is-visible .process-intro__label`) -- only the container's own opacity/transform is removed.

### Step 3: Increase Parallax Multipliers

**File:** `src/index.css` (lines 3360, 3376)

- Change paper parallax from `0.02` to `0.04`
- Change candlelight parallax from `0.05` to `0.08`

This makes the depth effect clearly perceptible as a subtle layer separation without being distracting.

### Step 4: Add Scroll-Linked Warmth Layer

**File:** `src/components/process/GradientDawnBackground.tsx`

Add a new div `<div className="gradient-dawn__warmth" />` between the paper and candlelight layers. This is a full-section radial gradient in warm amber that starts at `opacity: 0` and increases to `opacity: 0.06` as `--process-scroll-y` increases.

**File:** `src/index.css`

Style `.gradient-dawn--journal .gradient-dawn__warmth`:
- `position: absolute; inset: 0`
- `background: radial-gradient(ellipse 60% 40% at 50% 50%, hsl(35 70% 50% / 0.12), transparent 70%)`
- `opacity: calc(clamp(0, var(--process-scroll-y, 0) / 3000, 0.08))`
- `pointer-events: none`

This creates a subtle warming effect as users scroll deeper into the Process section -- the "dawn" brightens.

### Step 5: Enhance Golden Thread Tip Glow

**File:** `src/index.css` (lines 1979-2003)

Upgrade the thread's `::after` tip dot:
- Increase size from 4px to 6px
- Add triple-layer `box-shadow` matching the anchor dot's glow signature: `0 0 6px hsl(var(--vow-yellow) / 0.5), 0 0 14px hsl(var(--vow-yellow) / 0.25), 0 0 24px hsl(var(--vow-yellow) / 0.1)`
- Add a subtle `exhale-pulse` animation (same 4.2s cycle as the anchor dot) so the tip breathes in sync, creating visual continuity -- the flame's light travels down the thread.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/index.css` | Fix fade-top color to `hsl(220 15% 6%)` |
| 2 | `src/index.css` | Remove container opacity/transform; keep `is-visible` for children |
| 3 | `src/index.css` | Increase parallax multipliers (0.04 paper, 0.08 candlelight) |
| 4 | `src/components/process/GradientDawnBackground.tsx` | Add warmth layer div |
| 4 | `src/index.css` | Style warmth layer with scroll-linked opacity |
| 5 | `src/index.css` | Enhance thread tip glow and add breathing animation |

No copy changes. No new dependencies. Pure visual polish to close the gap to Fantasy.co-level cinematic quality.

