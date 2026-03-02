

# Round 58 — "The Invitation": Final Polish and Semantic Completeness

## Current State

Rounds 53-57 have built a comprehensive, accessible, performant section with atmospheric depth layers, cinematic double-frame with hover glow, fluid typography, consistent contrast tiers, touch-friendly CTA, reduced-motion fallbacks, ARIA semantics, focus states, and `will-change` optimizations. The section is near-complete.

## Critique: Remaining Items Below Fantasy.co Standard

### 1. Section Lacks `role="region"` and `aria-labelledby`
The `<section>` has an `id` but no ARIA landmark label. Screen readers announce it as a generic section. Adding `aria-labelledby` pointing to the headline gives assistive technology users meaningful context when navigating by landmarks.

### 2. Ken Burns Animation `will-change` Is Persistent
The `.invitation-ken-burns` class has `will-change-transform` applied permanently via Tailwind on the `<img>`. For a 25s infinite animation this is acceptable, but the class is on the element alongside other layout classes. Moving `will-change: transform` into the CSS animation rule itself (`.invitation-ken-burns`) keeps concern separation clean and avoids the Tailwind utility being redundant.

### 3. Credential Values Lack Tabindex for Keyboard Discovery
The credential stats (500+, SOCAN, $4M) are purely visual `<div>`s with no interactive affordance. While they don't need to be focusable buttons, adding `tabindex="0"` to each credential cell would allow keyboard users to discover them --- especially since the plaque already has `focus-within` styling from Round 57.

### 4. Bottom Fade Color Mismatch Risk
The bottom fade uses `hsl(220 15% 6%)` which has a blue hue, while the section background uses `hsl(25 6% 10%)` which is warm. If the next section's background shifts, this creates a visible seam. The bottom fade should match the next section's actual background for seamless stitching.

### 5. Outline Frame `outlineOffset` Should Respect Reduced Motion
The outer outline frame (`outlineOffset: '6px'`) on the portrait is always visible. This is fine, but the hover glow transition on `.invitation-portrait-frame:hover` should be suppressed under `prefers-reduced-motion` to avoid drawing attention through motion for sensitive users.

---

## 5-Step Implementation Plan

### Step 1: Add Semantic Landmark to Section

Add an `id` to the `<h2>` headline (e.g., `id="invitation-heading"`) and add `aria-labelledby="invitation-heading"` to the `<section>`. This gives screen readers a meaningful label when users navigate by landmarks, transforming "region" into "region: I have played at over 500 events..."

**File**: `TheInvitation.tsx` --- add `id` to `<h2>` and `aria-labelledby` to `<section>`.

### Step 2: Move `will-change` from Tailwind to CSS Rule

Remove `will-change-transform` from the `<img>` className in the component, and add `will-change: transform` to the `.invitation-ken-burns` CSS rule. This keeps the performance hint co-located with the animation it serves.

**File**: `TheInvitation.tsx` --- remove `will-change-transform` from img className.
**File**: `index.css` --- add `will-change: transform` to `.invitation-ken-burns`.

### Step 3: Make Credential Cells Keyboard-Discoverable

Add `tabindex="0"` to each credential `<div>` so keyboard users can tab into individual stats. This activates the `focus-within` glow added in Round 57 and gives keyboard users parity with mouse users who can hover.

**File**: `TheInvitation.tsx` --- add `tabindex={0}` to each credential cell div.

### Step 4: Harmonize Bottom Fade with Next Section

Review the next section's background color (The Sound section) and update the bottom fade gradient to match it precisely. If the next section uses a different hue, the fade target color must be updated to prevent a visible seam.

**File**: `TheInvitation.tsx` --- update the bottom fade `hsl()` value if needed.

### Step 5: Suppress Frame Hover Under Reduced Motion

Add `.invitation-portrait-frame` to the existing `prefers-reduced-motion` media query block, disabling the hover transition so the frame remains static for motion-sensitive users.

**File**: `index.css` --- add rule inside the existing `@media (prefers-reduced-motion: reduce)` block.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `TheInvitation.tsx` | ARIA landmark labeling |
| 2 | `TheInvitation.tsx`, `index.css` | Move `will-change` to CSS |
| 3 | `TheInvitation.tsx` | Keyboard-discoverable credentials |
| 4 | `TheInvitation.tsx` | Bottom fade color harmonization |
| 5 | `index.css` | Reduced-motion for frame hover |

## What This Achieves

- Screen reader users get meaningful landmark navigation through the section
- Performance hints are co-located with the animations they serve (clean separation of concerns)
- Keyboard users can discover and focus individual credential stats
- Section transitions are seamless with no visible color seams
- Motion-sensitive users see no hover transitions on the image frame

