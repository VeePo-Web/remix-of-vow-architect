

# Fix: "Begin the conversation" Button Hover Animation

## The Problem

The `.process-closing__cta` in `index.css` defines its transition as:
```
transition: 
  opacity 800ms,
  transform 800ms,    ← this governs BOTH entry reveal AND hover lift
  color 260ms,
  background 260ms,
  border-color 260ms,
  box-shadow 400ms;
```

When the button enters the viewport, `transform` correctly takes 800ms to rise from `translateY(16px)` to `translateY(0)`. But on hover, the same 800ms applies to the `-2px` lift — making it feel heavy and unresponsive. The brand timing standard is 180ms for hover feedback.

## The Fix

Split the hover transform into a separate mechanism so it doesn't conflict with the entry animation:

1. **Change the entry animation to use a CSS keyframe** instead of transition-based transform, so it only fires once and doesn't affect hover.
2. **Or simpler:** After the entry transition completes (~1500ms after visible), swap the transition timing for `transform` from 800ms to 180ms. This can be done by adding a class or by using a CSS-only approach with `transition` on the hover state itself.

**Cleanest approach:** Override the `transform` transition duration specifically on hover and active states to 180ms, and keep the 800ms only for the entry reveal. CSS specificity handles this naturally:

In `index.css`, add to the existing `.process-closing__cta:hover` rule:
```css
transition: 
  color 260ms var(--ease-sacred),
  background 260ms var(--ease-sacred),
  border-color 260ms var(--ease-sacred),
  box-shadow 400ms var(--ease-sacred),
  transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
```

And similarly on `:active`:
```css
transition: transform 80ms ease;
```

Also fix `border-radius: 100px` to `6px` per brand rules (under 8px maximum).

## File Changed

`src/index.css` — lines 2993-3001 (hover rule) and 2925-2952 (base rule border-radius). Two small edits in one file.

