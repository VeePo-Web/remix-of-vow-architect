

# Round 25 — "Hear Me Play" Listening Room: Hover Choreography, Scroll-Linked Thread Glow, and Spatial Audio Cues

## Critical Audit of Current State (Post-Round 24)

Rounds 20-24 delivered: atmospheric depth (bokeh, cathedral, dust motes), card identity (Repertoire header with golden lid seal), idle breathing glow, category emotional context, graceful "Coming Soon" degradation, refined typography, blockquote attribution, two-zone scroll reveal, card surfacing with scale, category stagger cascade, live reduced-motion listener, golden thread playback response (height/glow/pulse), in-card track progress underline, active border warmth, category divider stagger participation, and diamond micro-rotation.

The section has reached substantial depth. However, five gaps remain before it meets Fantasy.co's standard of "every interaction feels considered":

### Issue 1: Track Hover Has No Accent Bar Preview

The accent bar (`track-bar`) uses `scaleY(0)` when inactive, making it completely invisible until a track is clicked. On hover over a playable track, the bar should "hint" at `scaleY(0.5)` with reduced opacity -- giving the visitor a preview of the interaction before committing. Currently the hover state only changes text color and adds a faint background gradient. The accent bar remains invisible, breaking the principle that every interactive element should telegraph its affordance on hover.

### Issue 2: The "Coming Soon" Tracks Have No Hover Differentiation

Tracks without audio (`!hasSrc`) have `cursor-default` but no visual signal on hover that explicitly says "not yet available." At Fantasy.co quality, hovering over a Coming Soon track would subtly desaturate the text further and perhaps show a very faint strikethrough effect -- communicating unavailability through visual language, not just the small label.

### Issue 3: The NowPlayingBar Lacks Backdrop Blur in its Styles

The plan for Round 23/24 mentioned adding `backdropFilter: "blur(12px)"` to the NowPlayingBar, but the current inline implementation in the component does not include it. The bar renders with a class-based approach (`now-playing-bar`) whose CSS may or may not include the blur. The component itself should enforce the glass material standard from the brand's design system.

### Issue 4: The Section Has No "Scroll Depth" Atmospheric Response

The atmospheric layers (bokeh, vignette, warm floor) are completely static. At Fantasy.co quality, the vignette would subtly tighten as the user scrolls deeper into the section and the warm floor glow would shift slightly downward -- creating a parallax-like depth response without any JavaScript scroll listeners (achievable via a single CSS `background-attachment: fixed` on the warm floor layer).

### Issue 5: The Closing Blockquote Has No Hover State on the Quote Itself

The blockquote is entirely static. At Fantasy.co quality, hovering over the quote would create an extremely subtle text-shadow warmth (0 0 20px at 3% opacity) -- suggesting that the words themselves carry warmth. This is a micro-detail that separates good from exceptional.

---

## 5-Step Implementation Plan

### Step 1: Track Hover Accent Bar Preview

**File:** `src/components/TheSound.tsx`

On the accent bar (`track-bar` span, lines 531-541), change the inactive `transform` from `scaleY(0)` to a hover-aware state:

- Default inactive: `transform: scaleY(0)` (hidden)
- Hover on playable track (via parent `group`): `group-hover:scaleY(0.5)` with `opacity: 0.4`
- Active: `scaleY(1)` with full opacity (unchanged)

Since the bar uses inline styles, convert the transform to use a CSS approach: add a Tailwind class `group-hover:scale-y-50 group-hover:opacity-40` and keep the active override via inline style. Alternatively, use CSS custom properties on the button's hover state.

The simplest approach: change the inactive bar's `transform` to conditionally check via the button's group hover. Since we're using inline styles, add a CSS rule in `index.css`:

```css
.track-button:hover .track-bar {
  transform: scaleY(0.5) !important;
  opacity: 0.5;
}
.track-button--active .track-bar {
  transform: scaleY(1) !important;
  opacity: 1;
}
```

This uses CSS specificity to create the hover preview without changing React logic.

### Step 2: Coming Soon Track Hover Feedback

**File:** `src/components/TheSound.tsx`

For tracks without audio, add a hover state that reduces opacity further and adds a subtle visual cue:

- Add to the `!hasSrc` className branch: `hover:text-foreground/20` (dims further on hover)
- The "Coming Soon" label should slightly increase opacity on hover: from `text-foreground/20` to `group-hover:text-foreground/30`

Add a CSS rule in `index.css`:

```css
.track-button:not(.track-button--active)[style*="cursor: default"]:hover {
  opacity: 0.7;
}
```

Or more cleanly, add a `track-button--disabled` class to Coming Soon tracks and style accordingly.

### Step 3: NowPlayingBar Glass Material Enforcement

**File:** `src/components/TheSound.tsx`

In the `NowPlayingBar` component (lines 124-165), add inline styles to the container div to enforce the luxury glass material standard:

```tsx
style={{
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  background: "hsl(var(--rich-black) / 0.92)",
  borderTop: "1px solid hsl(var(--vow-yellow) / 0.1)",
}}
```

This ensures the bar matches the brand's "Premium Glass" material specification regardless of what the CSS class provides.

### Step 4: Warm Floor Parallax Depth

**File:** `src/components/TheSound.tsx`

On the "warm floor" atmospheric div (lines 319-325), add `backgroundAttachment: "fixed"` to create a subtle parallax depth effect as the user scrolls. This is pure CSS -- no JavaScript, no scroll listeners, no performance cost.

```tsx
style={{
  background: "radial-gradient(ellipse 80% 50% at 50% 60%, hsl(30 40% 12% / 0.15) 0%, transparent 70%)",
  backgroundAttachment: "fixed",
}}
```

This makes the warm glow pool appear to stay fixed while the content scrolls over it, creating spatial depth.

### Step 5: Blockquote Hover Warmth + Final Track Bar CSS

**File:** `src/components/TheSound.tsx`

Add a hover state to the blockquote `<p>` element (line 673):

```tsx
className="text-lg font-display font-light italic text-foreground/80 transition-all duration-300 hover:text-shadow-warm"
```

**File:** `src/index.css`

Add the hover warmth utility, the track bar hover rule, and the Coming Soon hover rule:

```css
/* Track bar hover preview */
.track-button:hover .track-bar {
  transform: scaleY(0.5) !important;
  opacity: 0.5;
}
.track-button--active .track-bar {
  transform: scaleY(1) !important;
  opacity: 1;
}

/* Coming Soon track hover dimming */
.track-button--coming-soon:hover {
  opacity: 0.6;
}

/* Blockquote hover warmth */
.blockquote-warm:hover {
  text-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.03);
}

@media (prefers-reduced-motion: reduce) {
  .blockquote-warm:hover {
    text-shadow: none;
  }
}
```

In `TheSound.tsx`, add `track-button--coming-soon` class to the `!hasSrc` tracks and add `blockquote-warm` to the blockquote `<p>`.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/index.css` | Track bar hover preview CSS rule |
| 2 | `src/components/TheSound.tsx` | Add `track-button--coming-soon` class to disabled tracks |
| 2 | `src/index.css` | Coming Soon hover dimming rule |
| 3 | `src/components/TheSound.tsx` | NowPlayingBar inline glass material styles |
| 4 | `src/components/TheSound.tsx` | `backgroundAttachment: "fixed"` on warm floor layer |
| 5 | `src/components/TheSound.tsx` | `blockquote-warm` class on closing quote |
| 5 | `src/index.css` | Blockquote hover warmth + reduced-motion guard |

---

## What This Achieves

- **Hover telegraphing:** The accent bar previews on hover, teaching visitors "this element responds to clicks" before they commit -- the hallmark of considered interaction design
- **Disabled state clarity:** Coming Soon tracks communicate unavailability through dimming on hover, not just a tiny label
- **Glass material consistency:** The NowPlayingBar now matches the brand's Premium Glass specification across all browsers
- **Spatial depth:** The fixed warm floor creates parallax depth without any JavaScript cost
- **Quote warmth:** The closing words gain a barely perceptible golden warmth on hover, suggesting the words themselves carry meaning -- a micro-detail that separates world-class from merely good

## Technical Notes

- Track bar hover uses CSS specificity (`!important` on hover, overridden by active state) -- zero React re-renders
- `backgroundAttachment: fixed` is GPU-composited on all modern browsers
- `text-shadow` transition is compositable and costs near-zero
- All new interactions respect `prefers-reduced-motion`
- No new dependencies, no new images, no layout shifts

