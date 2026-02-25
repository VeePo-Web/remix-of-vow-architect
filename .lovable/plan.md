

# Audit: Track Rows Lack Hover Feedback on the Leading Edge

## Finding

The active track row now has a confident 2px vertical gold accent bar on its leading edge -- a clear "you are here" marker. But when hovering over inactive tracks, only the text color shifts and a faint 3% yellow background appears (line 327). There is no movement or visual change on the leading edge position where the accent bar will eventually appear.

In premium interfaces (Linear, Stripe Dashboard, Apple Music), the hover state previews the selected state at reduced intensity. The user's eye learns the pattern: "that edge lights up when I interact." This creates a predictive visual language -- the hover previews the commitment, reducing cognitive load on click.

Currently, the 2px accent bar goes from fully invisible (transparent + scaleY(0)) to fully visible (gold + scaleY(1)) only on selection. There is no intermediate hover state. Adding a subtle hover preview -- a 50% height bar at reduced opacity -- creates a three-state progression: invisible (default) -> hint (hover) -> full (active). This mirrors the brand's Death->Threshold->Life progression.

## The Refinement

Add hover-responsive styles to the accent bar span so it shows a partial preview on parent hover. Since the accent bar uses inline styles, the cleanest approach is to track hover state per row and conditionally adjust the bar's properties.

However, to avoid adding useState per row (15 state variables), a simpler CSS-only approach works: wrap the accent bar's transition values so the parent's hover state (already defined via Tailwind on the button) can influence the child via CSS. But inline styles cannot respond to parent hover.

The most efficient solution: add a single CSS rule in the existing `<style>` block that targets the accent bar on button hover.

### Technical Changes

**File: `src/components/PianoPanel.tsx`**

**1. Add a className to the accent bar span (line 339):**

Current:
```jsx
className="flex-shrink-0"
```

New:
```jsx
className="flex-shrink-0 panel-accent-bar"
```

**2. Add hover rule to the existing `<style>` block (after line 239):**

Add inside the style tag:
```css
button:hover .panel-accent-bar {
  transform: scaleY(1) !important;
  height: 8px !important;
  background: hsl(var(--vow-yellow) / 0.35) !important;
}
button:hover .panel-accent-bar[data-active="true"] {
  height: 16px !important;
  background: hsl(var(--vow-yellow)) !important;
}
```

**3. Add data-active attribute to the accent bar (line 338):**

Add `data-active={isActive ? "true" : "false"}` to the span so the CSS can differentiate active from inactive hover states.

### Key Details

- Inactive hover: bar appears at 8px height (half of active's 16px), 35% opacity gold -- a whisper, not a shout
- Active hover: no change (already at full state, CSS rule preserves it)
- The `!important` overrides are necessary because inline styles have higher specificity than class-based rules; this is the standard pattern for CSS-overriding inline styles
- No JavaScript state changes, no re-renders on hover -- pure CSS, zero performance cost
- Transition timing already set on the span (180ms cubic-bezier) carries over to hover transitions automatically

## What Stays Unchanged

All track row layout, text styling, radial gradient background, waveform, category headers, strings, interior glow, border, fade masks, scroll logic, caret, panel dimensions, animation keyframes.

