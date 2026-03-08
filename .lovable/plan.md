

# Page Transition Refinement — "The Threshold Crossing" v2

## Current State

The system is built and functional: two-phase exit/enter with a golden threshold line, route-specific timing, reduced-motion support, and FullScreenMenu integration. The foundation is solid.

## What Needs Refinement

After reviewing the live site and code, there are five specific areas that will elevate this from "good transition" to "Fantasy.co-grade cinematic threshold":

---

### 1. Content Uses `children` Directly — Should Use `displayLocation`

**Problem**: `PageTransition.tsx` renders `{children}` directly but tracks a `displayLocation` state that never gets used to control what renders. This means the old page content swaps immediately on `navigate()` instead of holding the exiting page visible until the exit animation completes.

**Fix**: Use `displayLocation` with a keyed wrapper or pass it down so Routes renders based on `displayLocation` instead of `location`. This requires restructuring — the `<Routes>` need to use `displayLocation` via a location prop: `<Routes location={displayLocation}>`. We will expose `displayLocation` from the context and have App.tsx pass it to Routes.

---

### 2. Add a Subtle Vignette Darkening During Transition

**Problem**: The golden line alone is visually thin. The page just fades — no atmospheric shift.

**Fix**: Add a very subtle radial vignette (edges darken to ~8% opacity black) that breathes in during exit and out during enter. This creates a "room dimming" effect — like the lights lowering between ceremony moments. Pure CSS, no extra elements needed — just a `box-shadow: inset` on the content wrapper.

---

### 3. Threshold Line Needs a Semicolon at Center

**Problem**: The golden line is just a line. It should reference the brand's sacred object.

**Fix**: Add a tiny semicolon glyph (`;`) at the exact center of the threshold line, rendered in Cormorant at ~14px, vow-yellow, that fades in at 60% of the expand animation and fades out at 40% of the contract. This turns a generic line into a brand-specific sacred moment.

---

### 4. Exit Content Should Blur Slightly, Not Just Fade

**Problem**: The exit is opacity + translateY(-8px). This feels like a standard fade. Luxury transitions use a whisper of blur.

**Fix**: Add `filter: blur(2px)` to the exit keyframe's 100% state. The blur creates a "memory dissolving" effect — the page you're leaving becomes soft, like a photograph losing focus. Enter animation starts at `blur(1px)` and resolves to `blur(0)`.

---

### 5. Scroll Position Reset Timing

**Problem**: `SmoothScrollProvider` resets scroll on pathname change with a 50ms delay, but this doesn't coordinate precisely with the exit/enter phase boundary.

**Fix**: Listen to the `phase` from `usePageTransition()` context. Reset scroll when phase transitions from `exiting` to `entering` (the exact moment the new content appears). This eliminates the possibility of seeing the old scroll position flash.

---

## Files to Modify

| File | Change |
|---|---|
| `src/hooks/usePageTransition.ts` | Export `displayLocation` from context |
| `src/components/PageTransition.tsx` | Expose `displayLocation` in context, add semicolon glyph to threshold line, add vignette class |
| `src/App.tsx` | Pass `displayLocation` as `location` prop to `<Routes>` |
| `src/index.css` | Add blur to exit/enter keyframes, add vignette animation, add semicolon fade keyframes |
| `src/components/SmoothScrollProvider.tsx` | Use `usePageTransition().phase` to time scroll reset precisely |

---

## Technical Details

### Semicolon glyph markup (inside the veil div):
```
<span className="threshold-semicolon" /> → ";"
```
Absolutely positioned at center of the line, `font-family: var(--font-display)`, 14px, vow-yellow, with its own fade keyframe synced to the line expand/contract.

### Vignette CSS:
```css
.page-transition-content--exit {
  animation: page-exit ... forwards;
}
@keyframes page-exit {
  0%   { opacity: 1; transform: translateY(0); filter: blur(0); box-shadow: inset 0 0 0 0 rgba(0,0,0,0); }
  100% { opacity: 0; transform: translateY(-8px); filter: blur(2px); box-shadow: inset 0 0 120px 40px rgba(0,0,0,0.08); }
}
```

### displayLocation routing:
```tsx
// In PageTransition context, expose displayLocation
// In App.tsx:
<Routes location={displayLocation}>
```

This ensures the old page stays visible (and animates out) until the exit completes, then the new page renders and animates in.

