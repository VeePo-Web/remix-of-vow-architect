

# The Invitation — Million-Dollar Elevation

## Vision

The current section is polished and correct. But "correct" is not "transcendent." A million-dollar section does not just display content with nice transitions — it makes the visitor feel like they are standing in a candlelit room, watching warm light shift across piano lacquer, breathing the same air as someone who is about to change their life. Every layer must be alive. Every element must respond.

## What Separates This from World-Class

### 1. The portrait is static between scroll events
The image drifts via Ken Burns, but the two columns have no scroll-linked relationship. At Fantasy, the image column would move at a slightly different rate than the text column — a subtle parallax that creates spatial depth, as if the portrait sits behind glass at a different focal plane.

### 2. The warm light bleed behind the portrait is frozen
The radial glow behind the portrait (line 90-96) is a static gradient. In a real candlelit space, light pools breathe — they expand and contract with the flame. This layer needs a slow 4s breathing animation.

### 3. No candlelight shimmer inside the portrait
The portrait has a static vignette overlay. A million-dollar detail: a very slow-moving warm radial gradient inside the portrait that drifts position over 8s, simulating reflected candlelight on piano lacquer. Barely visible (3-4% opacity) but alive.

### 4. The epigraph reveal is ordinary
It fades in and slides up — the same reveal as every other element. The epigraph is the section's opening line, the whispered quote that sets the emotional register. It deserves a blur-to-sharp reveal (4px blur dissolving to 0) to feel like a thought materializing from memory.

### 5. The "Yours" underline lacks a trailing glow
The underline draws left-to-right, but it draws dry — no warmth follows the stroke. Adding a trailing glow (box-shadow that intensifies as scaleX reaches 1) would make it feel like a pen leaving warm ink.

### 6. The CTA has no breathing glow
The brand system specifies that CTAs breathe with a slow glow cycle (3-4s). The invitation CTA pill is static — it only responds on hover. It should have a subtle border/shadow pulse at rest, signaling it is alive and waiting.

### 7. No scroll-triggered warmth intensification
As the visitor scrolls deeper into the section, nothing changes. At Fantasy, the ambient warmth would subtly intensify — the vow-yellow glow pools would increase by 2-3% opacity as the user reaches the CTA, creating an unconscious pull toward the threshold.

## Technical Changes

### File: `src/components/TheInvitation.tsx`

1. **Add scroll-linked parallax** — Use a simple scroll listener (or CSS `transform: translateY(calc(...))`) to offset the image column at 0.92x scroll rate relative to the text column. This creates a subtle depth separation without adding a heavy parallax library. Implement via a `useEffect` with `requestAnimationFrame` throttling on scroll, applying a CSS variable `--parallax-offset` to the image column.

2. **Animate the warm light bleed** — Add a class `invitation-light-bleed` to the radial glow div behind the portrait. Define a 6s keyframe that cycles the gradient's opacity from 0.04 to 0.08 and scales it from 1 to 1.05, simulating a breathing candle glow.

3. **Add candlelight shimmer overlay inside portrait** — Add a new `div` inside the portrait frame (after the vignette), with class `invitation-candlelight-shimmer`. This is an absolutely positioned layer with a small warm radial gradient (hsla 40, 60%, 55% at 4% opacity) that drifts position via an 8s keyframe animation (top-left to center-right and back). It creates the illusion of reflected firelight on piano lacquer.

4. **Enhance epigraph reveal** — Add a blur component to the epigraph's hidden state: when `!isVisible`, apply `blur(4px)` via inline style alongside the existing `opacity-0 translate-y-4`. When visible, `blur(0)`. This makes the quote materialize from fog rather than simply appearing.

5. **Enhance "Yours" underline glow** — The underline already has a conditional `boxShadow`. Intensify it: when fully drawn (isVisible), the shadow should pulse once via a keyframe (`invitation-yours-glow`) that flares to `0 0 16px hsl(45 90% 65% / 0.5)` then settles to `0 0 8px hsl(45 90% 65% / 0.3)`. Apply this animation with a 1000ms delay matching the underline draw timing.

6. **Add CTA breathing glow** — Add a class `invitation-cta-breathe` to the CTA link when `isVisible`. Define a 4s keyframe that pulses the border-color and box-shadow between resting state and a subtle vow-yellow glow (matching the brand's CTA breathe-glow spec).

7. **Scroll-linked warmth variable** — In the scroll listener (same one as parallax), calculate a `--warmth` CSS variable (0 to 1) based on how deep the user is in the section. Apply this to the candlelight glow layers via `opacity: calc(0.10 + var(--warmth) * 0.04)` — the warm glow pools intensify by ~4% as the user reaches the CTA.

### File: `src/index.css`

8. **Add `@keyframes invitation-light-breathe`** — 6s cycle: scale 1 to 1.05, opacity 0.04 to 0.08.

9. **Add `@keyframes invitation-candlelight-drift`** — 8s cycle: radial gradient shifts from `30% 30%` to `60% 50%` and back, with opacity 0.03 to 0.05.

10. **Add `@keyframes invitation-yours-glow`** — Single-fire: `0%` box-shadow 0, `40%` box-shadow flare to 16px spread, `100%` settle to 8px.

11. **Add `@keyframes invitation-cta-breathe`** — 4s cycle: border-color and box-shadow pulse between resting and `hsl(var(--vow-yellow) / 0.15)` glow.

12. **Add `.invitation-candlelight-shimmer` styles** — Positioned absolute, inset 0, pointer-events none, with the drift animation.

13. **Add `.invitation-light-bleed` styles** — The breathing animation class.

14. **Add reduced-motion fallbacks** — Disable all new animations under `prefers-reduced-motion: reduce`. The light bleed, candlelight shimmer, CTA breathe, and Yours glow all fall back to their static default states.

## What This Achieves

The section transforms from a polished static layout into a living, breathing space:

- **Parallax depth**: The portrait exists at a different focal plane than the text, creating physical space
- **Breathing light**: The warm glow behind the portrait expands and contracts like a candle flame
- **Candlelight shimmer**: Reflected light drifts across the portrait surface, making it feel like real lacquer
- **Materialized epigraph**: The opening quote dissolves from fog, not from a CSS slide
- **Warm ink underline**: The "Yours" underline glows as it draws, like warm calligraphy
- **Living CTA**: The button breathes at rest, signaling it is alive and waiting
- **Scroll warmth**: The deeper the visitor goes, the warmer the section becomes — an unconscious pull toward commitment

Every one of these details is invisible individually. Together, they create the sensation of being held in a warm, candlelit room — which is exactly what the visitor should feel when Parker says "Yours could be one of them."

