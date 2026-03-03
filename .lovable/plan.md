

# Three Keys — Step 1: Structural Foundation and Material Truth

This is Step 1 of 2. Step 1 focuses on **structural corrections, material authenticity, and typographic foundation** — the bones of the piano. Step 2 will address atmospheric refinement, interaction polish, and animation choreography.

## Issues Identified (from live screenshot)

1. **"THREE KEYS" label is left-aligned** — despite `text-center` classes, the label renders flush-left. The container `div` has `text-center` but the `<p>` tag's own centering is being overridden by something in the cascade. The label needs `mx-auto` and `w-full` to guarantee center alignment.

2. **Ivory keys read as flat cards, not as 3D piano keys** — the multi-layer gradient creates subtle luminosity but the keys lack the critical vertical depth cue: a **top-face highlight strip** that simulates the rounded top edge of a real piano key catching overhead light. Real ivory keys have a distinct 2-3px bright line at the very top where the surface curves toward the player.

3. **The "chosen" key's press-down lacks visual gap** — when a real piano key is pressed, the gap between it and its neighbors widens at the top. Currently all three keys have the same top alignment. The chosen key drops 6px but there is no visual separation at the keybed level (top edge).

4. **Black key proportions are correct but the top face is missing** — real black keys have a flat playing surface at the top that is distinct from the front face. The current `::before` pseudo-element creates a subtle gloss but doesn't simulate the **top face plane** that catches light differently.

5. **Content alignment within keys is inconsistent** — the name, price, description, and sentence stack vertically but the vertical rhythm between them varies across keys because the description text wraps differently. All three keys need identical vertical spacing regardless of content length.

6. **The golden underline beneath tier names blends into the ivory** — at `2px` height and `0.5` opacity, it's barely distinguishable on the warm ivory background. It needs to be rendered as a distinct **engraved line** with a subtle shadow beneath it.

7. **CTA buttons lack the engraved-label feel** — they read as standard web buttons placed on the key surface. They need a subtle inset effect and tighter proportions to feel like a brass label plate embedded in the ivory.

8. **The reassurance text at bottom floats disconnected** — the golden diamond and text below the keys lack visual connection to the piano metaphor. They need to feel like an engraving on the keybed.

## Step 1 Fixes (14 changes across 2 files)

### File: `src/index.css`

**1. Add top-face highlight strip to white keys**
Add a `::after` pseudo-element to `.piano-white-key` that creates a 3px bright line at the very top — simulating the rounded edge of an ivory key catching overhead light:
```css
.piano-white-key::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    rgba(255,255,255,0.15),
    rgba(255,255,255,0.35) 50%,
    rgba(255,255,255,0.15)
  );
  border-radius: 4px 4px 0 0;
  pointer-events: none;
  z-index: 1;
}
```

**2. Create black key top-face plane**
Replace the current `::before` with a shorter (15%), brighter top face that simulates the flat playing surface:
```css
.piano-black-key::before {
  height: 15%;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.08) 0%,
    rgba(255,255,255,0.03) 60%,
    transparent 100%
  );
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
```

**3. Deepen the keybed gap for the chosen key**
Add a top shadow to the chosen key that simulates the widened gap at the keybed:
```css
.piano-white-key--chosen::before {
  content: '';
  position: absolute;
  top: -2px; left: 0; right: 0;
  height: 8px;
  background: linear-gradient(180deg,
    rgba(0,0,0,0.15) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
}
```

**4. Enhance the golden underline to feel engraved**
Change the golden underline from a flat color to a layered effect with a subtle shadow beneath:
```css
/* No CSS class needed — done inline in TSX */
```
In ThreePaths.tsx, the underline div gets: `box-shadow: 0 1px 0 rgba(0,0,0,0.04)` added as an inline style, plus increase height to `3px`.

**5. Refine CTA buttons with inset engraved feel**
Add inner shadow to both CTA variants:
- `.piano-key__cta--chosen`: add `box-shadow: inset 0 1px 2px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.2);`
- `.piano-key__cta--flanking`: add `box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);`

**6. Standardize content stack spacing**
Add fixed margins to ensure consistent vertical rhythm across all three keys regardless of text wrap:
- `.piano-key__description`: change `margin-bottom: 12px` to `margin-bottom: 16px; min-height: 2.8em;` (reserves ~2 lines of space)
- `.piano-key__sentence`: change `margin-bottom: 24px` to `margin-bottom: 20px; min-height: 3em;` (reserves ~2 lines)

**7. Add subtle ivory texture grain to white keys**
Add a micro noise texture to the ivory surface to break the digital flatness:
```css
.piano-white-key {
  /* Add to existing background stack: */
  background-image:
    /* existing layers... */
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E");
}
```
This will be simplified to just adding `background-blend-mode: normal;` and a very subtle repeating noise pattern overlay.

### File: `src/components/ThreePaths.tsx`

**8. Fix "THREE KEYS" label centering**
Change the label from:
```
<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 text-center ...">
```
to:
```
<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 w-full text-center block ...">
```
And verify the parent `<div className="text-center mb-16">` is not being overridden.

**9. Increase golden underline to 3px with engraved shadow**
Change `h-[2px]` to `h-[3px]` and add inline `boxShadow: '0 1px 0 rgba(0,0,0,0.04)'`.

**10. Add `min-height` to description and sentence for vertical alignment**
Add inline `style={{ minHeight: '2.8em' }}` to description `<p>` and `style={{ minHeight: '3em' }}` to sentence `<p>` so all three keys maintain identical content height regardless of text wrapping.

**11. Widen black key negative margins**
Increase from `-mx-4 lg:-mx-5` to `-mx-5 lg:-mx-6` so the black keys overlap more aggressively into the white keys — matching real piano proportions where black keys cover roughly 60% of the white key width at the rear.

**12. Strengthen the section heading typography**
Change the heading from `text-[clamp(28px,4vw,40px)]` to `text-[clamp(32px,4.5vw,44px)]` for slightly more commanding presence, and add `tracking-[0.01em]` for micro letter-spacing.

**13. Tighten the bottom reassurance cluster**
Change the reassurance text max-width from `max-w-2xl` to `max-w-lg` to create a tighter, more composed text block. Change `mt-16` to `mt-12` to bring it closer to the keys.

**14. Add `position: relative` to white key for pseudo-element support**
The `.piano-white-key` already has `position: relative` in CSS, so the `::after` pseudo-element (fix 1) and `::before` on chosen (fix 3) will work without TSX changes.

## Summary

Two files modified:
- `src/index.css` — 7 CSS changes (top-face highlight, black key plane, chosen key gap shadow, CTA inset shadows, content spacing standardization, ivory texture)
- `src/components/ThreePaths.tsx` — 7 TSX changes (label centering, underline height/shadow, content min-heights, black key margins, heading size, reassurance tightening)

Step 2 will address: atmospheric layer refinement (vignette tuning, spotlight repositioning), interaction choreography (hover state sequencing, press feedback timing), animation polish (stagger timing, reveal easing), and mobile-specific reimagination.
