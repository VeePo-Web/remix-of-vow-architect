

# Three Keys — Edge Audit and Refinements

## Findings from Live Screenshot

After examining the rendered Three Keys section at 1920x1080, I identified 8 edge-level deficiencies that prevent the section from reaching true material fidelity.

---

## Issue 1: "THREE KEYS" Label Still Left-Aligned

Despite previous fixes adding `w-full block text-center`, the label renders flush-left. The parent `<div className="text-center mb-16">` should propagate centering, but something breaks it.

**Root cause:** The `<p>` element has `block` which is correct, and `w-full text-center` which should work. However, the section itself or the container may have a `text-left` override. Looking at the CSS, there is no such override — so this is likely a specificity issue with the `text-center` on `mb-16` wrapper not applying because the `p` tag's flex/block context overrides it.

**Fix:** Remove the reliance on inherited `text-center` and apply `mx-auto` directly. Change the `<p>` to also include `flex justify-center` or simply wrap the header content in a `<div className="flex flex-col items-center mb-16">` instead of `<div className="text-center mb-16">`.

**File:** `src/components/ThreePaths.tsx`, line 149 — change `text-center mb-16` to `flex flex-col items-center mb-16`.

---

## Issue 2: White Key Side-to-Side Gap Inconsistency

The gap between white keys is created by `margin-left: 2px` (CSS rule on line 4870). But the black keys with `-mx-5 lg:-mx-6` overlap into the white keys, creating a zone where the white key edge is hidden behind the black key. Outside the overlap zone, the 2px gap is visible — but it looks like two ivory borders touching rather than a clean dark gap.

**Fix:** Change the 2px gap color to appear as a dark void (the keybed showing through). Add a `border-right` override on the first key and `border-left` override on the last key that is darker — `hsl(240 9% 8%)` — to simulate the dark gap between keys on a real piano.

Actually, the simpler fix: change the `margin-left: 2px` to use a dark background. Since keys are flex children, the gap itself is transparent, showing the dark section background. This should already look dark. The issue is the white key's own `border-left`/`border-right` at `hsl(45 10% 78%/82%)` creates a visible ivory edge where the gap should be dark.

**Fix:** For the middle key (index 1), remove the left border. For the right key (index 2), remove the left border. This way the gap between keys shows only the dark background, not an ivory border line.

Alternatively, override the inner-facing borders: the right border of key 0 and the left border of key 2 should be darker (`hsl(45 10% 70%)`) to create a shadowed edge effect, while the outward-facing borders (left of key 0, right of key 2) stay at `78%/82%`.

**File:** `src/index.css` — add rules:
```css
.piano-white-key:not(:first-child) {
  border-left-color: hsl(45 10% 72%);
}
.piano-white-key:not(:last-child) {
  border-right-color: hsl(45 10% 72%);
}
```
This darkens the inner edges to create a visible "shadow in the gap" effect.

---

## Issue 3: Chosen Key Top Edge Conflict

The chosen key has both:
- `border-top: 2px solid hsl(var(--vow-yellow) / 0.35)` (golden breathing line)
- `::before` at `top: -2px` creating a shadow gradient
- `::after` creating the 3px ivory highlight strip

These three layers stack at the top edge. The `::before` shadow sits above the key (`top: -2px`), the `border-top` is the golden line, and the `::after` is the ivory highlight beneath the border. The visual result is muddied — the golden glow, the shadow, and the highlight compete.

**Fix:** On the chosen key, suppress the `::after` highlight strip since the golden `border-top` replaces it as the top-edge visual. Add:
```css
.piano-white-key--chosen::after {
  opacity: 0;
}
```

---

## Issue 4: Black Key Bottom Edge Too Abrupt

The black keys end with `border-radius: 0 0 4px 4px` and `border-bottom: 1px solid rgba(255,255,255,0.06)`. The bottom edge meets the white key surface but there is no shadow cast downward from the black key onto the white key surface. On a real piano, the black key casts a small shadow onto the white keys below it.

**Fix:** Add a `::after` pseudo-element to `.piano-black-key` that creates a downward shadow beneath the key:
```css
.piano-black-key::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 4px;
  right: 4px;
  height: 6px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
  border-radius: 0 0 4px 4px;
  pointer-events: none;
}
```

---

## Issue 5: White Key Bottom Corners Should Be Square

Currently `border-radius: 4px 4px 0 0` — the bottom is already square (`0 0`). This is correct. No change needed.

---

## Issue 6: Golden Underline Below Tier Names Is Barely Visible

At `3px` height with `0.5` opacity, the underline blends into the ivory surface. The `boxShadow: '0 1px 0 rgba(0,0,0,0.04)'` is too subtle to create the "engraved" effect.

**Fix:** Increase the shadow to `0 1px 1px rgba(0,0,0,0.08)` and increase the underline opacity to `0.65` for unchosen and `0.75` for chosen. This creates a more visible engraved groove.

**File:** `src/components/ThreePaths.tsx` — update the inline styles on the golden underline divs.

---

## Issue 7: CTA Buttons Lack Consistent Bottom Alignment

The description and sentence text wrap differently across the three keys. Despite `min-height` fixes, the CTA buttons may still misalign if the combined height of description + sentence exceeds the min-height on one key.

**Fix:** Wrap the description + sentence + CTA in a `mt-auto` container on each white key, ensuring the CTA is always bottom-anchored regardless of content above it. The current approach of `flex-grow` spacer pushes content down, but the CTA alignment depends on equal content heights. Adding `mt-auto` to the CTA `Button` itself would be simpler.

**File:** `src/components/ThreePaths.tsx` — add `mt-auto` class to each Button element.

---

## Issue 8: Outer Edges of First and Last Keys Need Distinct Treatment

The leftmost edge of key 1 and the rightmost edge of key 3 are the "frame" edges — they define where the piano ends and the dark void begins. These edges should be slightly more pronounced than the inner edges to create a clear boundary.

**Fix:** Add a subtle outer shadow to the first and last white keys:
```css
.piano-keys-container > .contents:first-child .piano-white-key {
  box-shadow: 
    inset 2px 0 4px rgba(0,0,0,0.07),
    inset -2px 0 4px rgba(0,0,0,0.07),
    -4px 0 12px rgba(0,0,0,0.15),
    0 8px 32px rgba(0,0,0,0.3),
    0 2px 0 rgba(0,0,0,0.08);
}
.piano-keys-container > .contents:last-child .piano-white-key {
  box-shadow:
    inset 2px 0 4px rgba(0,0,0,0.07),
    inset -2px 0 4px rgba(0,0,0,0.07),
    4px 0 12px rgba(0,0,0,0.15),
    0 8px 32px rgba(0,0,0,0.3),
    0 2px 0 rgba(0,0,0,0.08);
}
```

---

## Summary of Changes

### `src/components/ThreePaths.tsx`
- Fix 1: Change header wrapper from `text-center mb-16` to `flex flex-col items-center mb-16`
- Fix 6: Increase golden underline opacity to `0.65`/`0.75` and shadow to `rgba(0,0,0,0.08)`
- Fix 7: Add `mt-auto` to CTA buttons for guaranteed bottom alignment

### `src/index.css`
- Fix 2: Darken inner-facing key borders to `hsl(45 10% 72%)` for visible gap shadow
- Fix 3: Suppress `::after` highlight on chosen key (golden border-top replaces it)
- Fix 4: Add `::after` downward shadow to black keys (6px gradient beneath)
- Fix 8: Add outer edge shadows to first and last white keys

Two files modified. No new dependencies. 7 edge-level corrections targeting material fidelity and alignment precision.
