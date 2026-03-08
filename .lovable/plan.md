

# Page Transitions — "The Threshold Crossing"

## The Concept

Currently, route changes are instantaneous — a hard cut. For a brand built on the sacred pause between Death and Life, this is a missed opportunity. Every page change should feel like crossing a threshold: a brief, reverent inhale before the new space reveals itself.

The metaphor: a wedding venue door opening. The current room dims. A sliver of light. The new room emerges.

---

## Architecture

A single `PageTransition` wrapper component placed inside `SmoothScrollProvider` in `App.tsx`, wrapping the `Routes` block. It listens to `useLocation()` changes and orchestrates a two-phase transition:

```text
PHASE 1: EXIT (current page)         PHASE 2: ENTER (new page)
────────────────────────────────      ────────────────────────────────
T+0ms    Content fades to 0          T+0ms    New route renders (hidden)
         opacity 1 → 0, 400ms                Lenis scrolls to 0
         translateY(0) → -8px        T+50ms   Content fades in
T+400ms  Overlay veil rises                   opacity 0 → 1, 500ms
         (1px golden line expands              translateY(6px) → 0
          from center horizontally)  T+550ms  Overlay veil dissolves
T+500ms  Route swap happens                   Golden line contracts
                                     T+900ms  Transition complete
                                              User has full control
```

Total duration: ~900ms. Reduced motion: opacity-only crossfade at 300ms.

---

## Files to Create / Modify

### 1. New: `src/components/PageTransition.tsx`
- Wraps `children` (the Routes outlet)
- Uses `useLocation()` to detect route changes
- Manages transition state: `'idle' | 'exiting' | 'entering'`
- Renders a fixed overlay div (the "veil") with the golden line
- On route change: sets `exiting` → waits 450ms → swaps content → sets `entering` → waits 500ms → sets `idle`
- The golden line is a 1px `div` that scales horizontally from `scaleX(0)` to `scaleX(1)` during exit, then contracts during enter — the "threshold thread"
- Uses `requestAnimationFrame` for timing, not `setTimeout` chains
- Respects `prefers-reduced-motion`: skips transform animations, uses 200ms opacity crossfade only

### 2. New: `src/hooks/usePageTransition.ts`
- Exposes `navigateWithTransition(path: string)` function
- Wraps `react-router-dom`'s `useNavigate`
- Triggers the exit phase, waits for completion, then calls `navigate(path)`
- Context-provided so any component can trigger a graceful transition instead of a hard cut
- Falls back to instant navigation if transition is already in progress (prevents double-fire)

### 3. Modify: `src/App.tsx`
- Wrap `<Routes>` with `<PageTransition>` inside `SmoothScrollProvider`
- Wrap everything in a `PageTransitionProvider` context

### 4. Modify: `src/components/SmoothScrollProvider.tsx`
- On route change, coordinate with transition: delay `scrollTo(0)` until the exit phase completes (the current instant `scrollTo(0, { immediate: true })` fires too early)

### 5. New CSS in `src/index.css`
- `@keyframes threshold-line-expand` — scaleX(0) → scaleX(1), 350ms sacred easing
- `@keyframes threshold-line-contract` — scaleX(1) → scaleX(0), 300ms
- `@keyframes page-exit` — opacity + translateY, 400ms
- `@keyframes page-enter` — opacity + translateY, 500ms
- Reduced motion overrides for all four

---

## Visual Design of the Veil

The transition overlay (the "veil") is minimal:
- Fixed position, `z-50`, `pointer-events-none`
- Background: transparent (no full-screen blackout — too heavy)
- Center element: a single 1px-height golden line (`hsl(var(--vow-yellow))`) spanning the viewport width, positioned at vertical center
- The line expands from center outward during exit (the "threshold being drawn")
- The line contracts back to center during enter (the "threshold crossed")
- Subtle glow: `box-shadow: 0 0 12px hsl(var(--vow-yellow) / 0.15)` on the line

This is the semicolon made physical — the pause between pages. It references the brand tagline's semicolon as the threshold between Death and Life.

---

## Integration with Existing Navigation

Components that currently use `<Link to="...">` will continue working — the transition hooks into React Router's location change, not individual link clicks. However, for the smoothest experience:

- `FullScreenMenu` item clicks will call `navigateWithTransition` so the menu close animation and page exit overlap gracefully (menu fades out while page exits)
- `DirectionalLink` and CTA buttons can optionally use the hook for premium feel
- Gateway card clicks get the transition automatically since they use `<Link>`

---

## Emotional Temperature by Route

The transition adapts subtly based on destination:

| Destination | Line color | Exit speed | Enter speed |
|---|---|---|---|
| `/weddings` | vow-yellow | 400ms | 500ms (cathedral gravity) |
| `/events` | vow-yellow | 350ms | 450ms (warmer, lighter) |
| `/teaching` | vow-yellow | 350ms | 450ms |
| `/contact` | vow-yellow | 300ms | 400ms (utility, faster) |
| Legal pages | muted gold | 250ms | 300ms (respect user's time) |

---

## Performance Constraints

- No additional dependencies (no framer-motion, no GSAP)
- Pure CSS animations + React state management
- The overlay div is always mounted (hidden via opacity/visibility) to avoid layout recalculation
- `will-change: transform, opacity` on animated elements, removed after transition
- Total JS overhead: ~2KB unminified

---

## Summary of Deliverables

1. `PageTransition.tsx` — transition orchestrator with golden threshold line
2. `usePageTransition.ts` — hook for programmatic graceful navigation
3. CSS keyframes in `index.css` — four animations + reduced motion
4. `App.tsx` update — wrap Routes with transition provider
5. `SmoothScrollProvider.tsx` update — coordinate scroll reset with transition timing
6. `FullScreenMenu.tsx` update — use `navigateWithTransition` for menu item clicks

