

# The Invitation — Technical Bugs + Final Polish

## Discovery

After a thorough code and visual audit of all 4 previous passes, the section's structure and design intent are excellent. However, **five technical bugs** prevent the intended effects from actually working as designed. These are not aesthetic nitpicks — they are broken implementations that make the "million-dollar" atmospheric effects silently fail.

## Bugs Found

### Bug 1: Warmth intensification does nothing
Lines 104 and 114 use `opacity: 'calc(1 + var(--warmth) * 0.4)'`. When `--warmth` goes from 0 to 1, opacity goes from 1.0 to 1.4. But CSS clamps opacity at 1.0 — so **the warmth scroll effect has zero visible impact**. The glow layers sit at `opacity: 1` regardless of scroll position.

**Fix:** The parent divs should have a base opacity below 1 and the warmth calc should modulate within a visible range. Change to `opacity: calc(0.85 + var(--warmth) * 0.15)` so they go from 85% to 100% opacity as the user scrolls deeper, creating the subtle warmth intensification that was intended.

### Bug 2: Candlelight drift animates entire gradient (forces repaint every frame)
Lines 1609-1611 swap the *entire* `background` shorthand each keyframe (from `radial-gradient(... at 30% 30% ...)` to `radial-gradient(... at 60% 50% ...)`). CSS cannot interpolate between two different gradient definitions — the browser must recalculate the gradient every frame. The `will-change: background-position` on line 1607 is misleading because the animation doesn't use `background-position` at all.

**Fix:** Use a pseudo-element approach. Set a fixed radial gradient on `.invitation-candlelight-shimmer::before` and animate its `transform: translate()` instead. Transform is GPU-composited and silky smooth. Alternatively, set the gradient once and animate `background-position` (which can interpolate).

### Bug 3: Light bleed breathing uses `opacity: 1.4` (clamped to 1.0)
Line 1600: the `invitation-light-breathe` keyframe goes from `opacity: 1` to `opacity: 1.4`. Since opacity is clamped at 1.0, the breathing effect only comes from the `scale(1) to scale(1.05)` transform — a nearly imperceptible 5% size change on a blurred glow that's already at 6% opacity. The breathing is essentially invisible.

**Fix:** Change the keyframe to animate opacity from `0.7` to `1.0` (a visible 30% brightness shift) while keeping the scale breathing. This makes the glow pool genuinely breathe.

### Bug 4: Parallax transform conflicts with Tailwind reveal class
The image column (line 133-139) has `isVisible ? 'translate-y-0' : 'translate-y-6'` applied via Tailwind, plus `transition-all duration-[900ms]`. The scroll listener (line 41) also sets `style.transform = translateY(${offset}px)`. These conflict: after the reveal transition, Tailwind's `translate-y-0` class generates a `transform: translateY(0)` that competes with the inline style. Because Tailwind utility classes use `--tw-translate-y` CSS variables, the inline `transform` override may work — but the `transition-all` means every scroll-frame parallax update triggers a 900ms transition animation, making the parallax feel sluggish instead of immediate.

**Fix:** After the reveal completes (after ~1200ms), remove the `transition-all` class from the image column so the parallax transform applies instantly. Use a `useEffect` with a timeout to switch from transition mode to parallax mode. Alternatively, apply the reveal via opacity only and handle the parallax transform entirely via the scroll listener from the start.

### Bug 5: Epigraph `transition-property` inline style is redundant
Line 209 sets `transitionProperty: 'opacity, transform, filter'` inline, but the element also has the Tailwind class `transition-all` which sets `transition-property: all`. The inline `transitionProperty` is overridden by the higher-specificity Tailwind utility. The blur transition works anyway because `transition-all` covers everything — but the explicit property list was meant to be precise.

**Fix:** Replace `transition-all` with a custom transition class or remove the inline `transitionProperty` since `transition-all` already handles it. Minor but reflects intentional craft.

## Additional Polish

### 6. Mobile: Label and epigraph pushed far above the fold
On mobile (390px), the image stacks above the text at `aspect-[3/2]`, taking significant vertical space. The label "THE INVITATION" and epigraph are rendered between the image and the heading. When scrolling to the section, the visitor lands mid-section and misses the epigraph entirely. The mobile reveal sequence should ensure the epigraph is visible.

**Fix:** On mobile, reduce the image aspect ratio slightly or ensure the scroll-reveal triggers when the text content (not the image top) enters the viewport.

## Technical Changes

### File: `src/components/TheInvitation.tsx`

1. **Fix warmth calc** — Change the two warmth-linked glow layers from `calc(1 + var(--warmth) * 0.4)` and `calc(1 + var(--warmth) * 0.5)` to `calc(0.85 + var(--warmth) * 0.15)` and `calc(0.8 + var(--warmth) * 0.2)` respectively.

2. **Fix parallax/transition conflict** — Remove `transition-all duration-[900ms]` from the image column after the reveal completes. Add a `revealDone` state that becomes true after 1500ms when `isVisible` first triggers. When `revealDone` is true, the column drops the `transition-all` class so the parallax applies immediately each frame.

3. **Clean up epigraph transition** — Remove the inline `transitionProperty` and replace `transition-all` with explicit `transition-[opacity,transform,filter]` in the Tailwind className.

### File: `src/index.css`

4. **Fix light bleed breathing keyframe** — Change `invitation-light-breathe` from `opacity: 1 / 1.4` to `opacity: 0.7 / 1.0`.

5. **Fix candlelight shimmer to use transform** — Refactor `.invitation-candlelight-shimmer` to use a `::before` pseudo-element with a fixed radial gradient, animated via `transform: translate()` (GPU-composited) instead of swapping the gradient definition each frame. Remove the misleading `will-change: background-position`.

6. **Add `.invitation-candlelight-shimmer` and `::before` reduced-motion fallback** — Ensure the pseudo-element animation is also disabled under `prefers-reduced-motion: reduce`.

## What This Achieves

Every atmospheric effect that was designed but silently broken now actually works:

- The ambient warmth genuinely intensifies as visitors scroll deeper (was clamped at 1.0)
- The portrait glow genuinely breathes between dim and bright (was stuck at opacity 1.0)
- The candlelight shimmer drifts smoothly at 60fps (was forcing full gradient recalculation each frame)
- The parallax responds instantly to scroll (was fighting a 900ms CSS transition)

These are the invisible bugs that separate "looks fine in a screenshot" from "feels alive when you scroll through it."

