

# Round 47 — "Hear Me Play": Precision Polish Pass

## Current State (Live Audit)

The genre card grid is now live with atmospheric backgrounds, per-genre gradients, Cormorant labels, and 56px play circles. The section has achieved meaningful visual differentiation between genres. However, several issues remain:

### Issue 1: Subhead Still Left-Aligned

Despite `w-full text-center` being applied, "Browse. Listen. Imagine it at yours." renders left-aligned. The root cause: the parent `max-w-5xl mx-auto text-center` should center block children, but the `<p>` element inherits its text alignment from the parent only if the parent applies `text-center` AND the child doesn't override it. Since the stagger animation wrapper or some other parent element may be causing this, the fix is to ensure `text-align: center` is applied directly via inline style as a guaranteed override.

### Issue 2: Cards Lack Vertical Breathing Room

The grid sits too close to the subhead (only `mb-16`) and the closing quote (only `mt-24`). On a 1440px viewport, the cards feel compressed between content. Increasing the gap above and below the grid would create the "luxury whitespace" the brand demands.

### Issue 3: Play Circles Could Be More Refined

The current circles show Play/Pause icons but lack the subtle gradient background treatment specified in the plan. Adding a very subtle radial gradient using the genre's accent color at 3-6% opacity would give depth.

### Issue 4: The Context Phrases Are Too Dim

The hover-revealed context phrases ("For the weight of what is sacred") are at `text-foreground/30` which is nearly invisible on the dark cards. Increasing to `text-foreground/40` for better readability while maintaining subtlety.

### Issue 5: No `exhale-pulse` Keyframe Exists

The GenreCard references `exhale-pulse` animation for active+playing state, but this keyframe may not be defined in `index.css`. Need to verify and add if missing.

---

## 5-Step Implementation Plan

### Step 1: Force Subhead Center Alignment

Add `style={{ textAlign: 'center' }}` directly to the subhead `<p>` element in `TheSound.tsx` as a guaranteed override. This bypasses any CSS specificity issues.

**File**: `TheSound.tsx` -- add inline `textAlign: 'center'` to the subhead.

### Step 2: Increase Breathing Room Around Grid

Change the subhead `mb-16` to `mb-20` and the closing quote container `mt-24 md:mt-32` to `mt-28 md:mt-40`. This adds ~64px more vertical whitespace on desktop, creating the luxury breathing room the brand requires.

**File**: `TheSound.tsx` -- adjust spacing classes.

### Step 3: Add Accent Gradient to Play Circles

In `GenreCard.tsx`, update the circle's background to include the genre's accent color at very low opacity. Currently the non-active state uses `hsl(0 0% 100% / 0.04)`. Change to a gradient that uses the genre's accent: `linear-gradient(135deg, hsl(0 0% 100% / 0.04), ${accent} at 3% opacity)`.

**File**: `GenreCard.tsx` -- update circle background style.

### Step 4: Increase Context Phrase Visibility

Change context phrase text color from `text-foreground/30` to `text-foreground/40` for improved readability on dark card backgrounds.

**File**: `GenreCard.tsx` -- update context phrase className.

### Step 5: Add `exhale-pulse` Keyframe

Verify and add the `exhale-pulse` keyframe to `index.css` if it doesn't exist. This is a subtle scale/opacity breathing animation for the active play circle:

```css
@keyframes exhale-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 transparent; }
  50% { transform: scale(1.04); box-shadow: 0 0 12px hsl(var(--vow-yellow) / 0.1); }
}
```

**File**: `index.css` -- add keyframe if missing.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `TheSound.tsx` | Force subhead center via inline style |
| 2 | `TheSound.tsx` | Increase spacing above/below grid |
| 3 | `GenreCard.tsx` | Add accent gradient to play circles |
| 4 | `GenreCard.tsx` | Increase context phrase opacity |
| 5 | `index.css` | Add `exhale-pulse` keyframe |

## What This Achieves

- Subhead is definitively centered regardless of CSS cascade
- Luxury whitespace frames the genre grid properly
- Play circles gain subtle material depth through accent gradients
- Context phrases become readable while remaining understated
- Active play state breathing animation works correctly

