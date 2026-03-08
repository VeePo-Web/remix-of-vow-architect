

# Plan: Add Luxurious Weighted Scroll — Fantasy.co / Igloo.inc Feel

## The Intent

The scroll should feel like walking down a wedding aisle — weighted, deliberate, reverent. Every pixel of movement should carry gravity. This is achieved through **Lenis smooth scroll** with a heavy lerp value, creating the "molasses-elegant" inertia that Fantasy.co and Igloo.inc are known for.

## What Changes

### 1. Install Lenis
Add `lenis` package (lightweight, ~5KB gzipped).

### 2. Create `SmoothScrollProvider` component
A React context provider that initializes Lenis globally with sacred-weight settings:

- **`lerp: 0.06`** — Very low interpolation for heavy, luxurious momentum (Fantasy.co uses ~0.05–0.08)
- **`smoothWheel: true`** — Normalize wheel input across devices
- **`wheelMultiplier: 0.8`** — Slightly dampen wheel speed for added weight
- **`touchMultiplier: 1.0`** — Keep touch natural
- **`autoRaf: true`** — Automatic frame loop
- **Reduced motion fallback** — If `prefers-reduced-motion` is enabled, Lenis is not initialized; native scroll is used instead

The provider will:
- Create/destroy Lenis on mount/unmount
- Pause Lenis when the document is hidden (visibility API)
- Expose the Lenis instance via React context for programmatic `scrollTo` if needed
- Respect `data-lenis-prevent` on elements like modals and the full-screen menu

### 3. Wrap the app in `SmoothScrollProvider`
In `App.tsx`, wrap the `<BrowserRouter>` inside `<SmoothScrollProvider>`.

### 4. CSS adjustments in `index.css`
- **Remove `scroll-behavior: smooth`** from `html` — Lenis handles this; the CSS property conflicts with Lenis's interpolation
- **Add `html.lenis, html.lenis body { height: auto; scroll-behavior: auto; }`** — Required Lenis CSS for proper scroll container behavior
- **Add `.lenis.lenis-smooth { scroll-behavior: auto; }`** — Prevents CSS smooth-scroll from fighting Lenis

### 5. Prevent conflicts with existing scroll listeners
The site already uses `window.addEventListener('scroll', ...)` in many components (PianoKeyNav, MinimalHeader, TheTransformation, etc.). These will continue to work because Lenis fires native scroll events — it just smooths the interpolation. No changes needed to existing scroll listeners.

### 6. Handle route changes
Add a `useEffect` that calls `lenis.scrollTo(0, { immediate: true })` on route change so page transitions start at the top without the weighted scroll animation.

### 7. Handle FullScreenMenu
Add `data-lenis-prevent` to the full-screen menu overlay to prevent scroll-through while the menu is open. Alternatively, call `lenis.stop()` on menu open and `lenis.start()` on close.

## Files Touched

| File | Action |
|---|---|
| `package.json` | Add `lenis` dependency |
| `src/components/SmoothScrollProvider.tsx` | **Create** — Lenis provider with sacred-weight config |
| `src/App.tsx` | Wrap app in `<SmoothScrollProvider>` |
| `src/index.css` | Remove `scroll-behavior: smooth`, add Lenis CSS rules |
| `src/components/FullScreenMenu.tsx` | Add `data-lenis-prevent` or stop/start Lenis on open/close |

## Technical Details

### Lenis Configuration
```text
lerp:             0.06    (heavy, reverent momentum)
smoothWheel:      true    (normalize wheel across devices)
wheelMultiplier:  0.8     (slightly dampen for weight)
touchMultiplier:  1.0     (natural touch feel)
autoRaf:          true    (automatic rAF loop)
```

### Why These Values
- `lerp: 0.06` produces ~250–300ms of trailing momentum — the scroll "breathes" after the user stops input, like a piano sustain pedal releasing slowly
- `wheelMultiplier: 0.8` ensures each scroll tick moves less distance, making the user feel the weight of each section
- Combined, this creates the "walking down the aisle" cadence — deliberate, unhurried, sacred

### Reduced Motion
When `prefers-reduced-motion: reduce` is active, Lenis is not instantiated. The site falls back to native scroll with `scroll-behavior: auto`. All existing reduced-motion fallbacks in components remain untouched.

### No Impact on Existing Animations
Lenis does not change how `IntersectionObserver`, `requestAnimationFrame` scroll handlers, or CSS animations work. It only smooths the scroll position interpolation. All existing parallax, reveal, and vigil animations will continue to function — they will simply feel more fluid because scroll position updates are interpolated rather than jerky.

