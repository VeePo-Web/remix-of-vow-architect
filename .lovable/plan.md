

# Round 48 --- "Hear Me Play": Track Panel Elevation and Mobile Polish

## Current State

Rounds 45-47 have delivered: per-genre atmospheric gradients, Cormorant typography, 56px tactile play circles with accent gradients, `exhale-pulse` breathing animation (confirmed existing), hover border warmth, increased whitespace, and brand-voice copy. The genre cards now have meaningful visual differentiation and the section reads as premium.

Two areas remain below Fantasy.co caliber:

### 1. GenreTrackPanel Material Quality

The expandable track panel uses `hsl(var(--rich-black))` as a flat solid background with a single border. Compared to the genre cards (which have layered gradients, grain, and glass effects), the panel feels like a generic dropdown. It needs the same "Premium Glass" material treatment: backdrop blur, subtle inner glow, and a top-edge light catch to match the luxury glass standard established across the site.

### 2. Track Panel Header Typography

The category label in the panel header uses `font-sans` while the rest of the section uses `font-display` (Cormorant). This inconsistency breaks the typographic harmony. The header should use the brand serif.

### 3. Mobile Grid Layout (5th Card)

The 5th genre card ("Film") spans `col-span-2` on mobile (2-column grid), making it wider than the others. This breaks visual rhythm. On mobile, it should be centered at the same width as the other cards using `justify-self-center` or a max-width constraint.

### 4. Track Panel Accent Bar Visibility

The accent bar next to each track starts at `scaleY(0)` for inactive tracks, making it invisible. A subtle resting state (e.g., `scaleY(0.5)` at lower opacity) would create visual rhythm in the track list, similar to a music staff.

### 5. Closing Quote Glow Intensity

The radial glow behind the closing quote (`vow-yellow / 0.03`) is barely perceptible. Increasing to `0.05` would create a warmer halo around the quote without violating the 6% yellow rule.

---

## 5-Step Implementation Plan

### Step 1: Upgrade Track Panel to Premium Glass Material

Replace the flat `hsl(var(--rich-black))` background with the site's established glass material: `background: hsl(var(--rich-black) / 0.85)` with `backdropFilter: blur(16px)` and an updated box-shadow that includes a golden outer glow at 4% opacity.

**File**: `GenreTrackPanel.tsx` --- update the panel's style object.

### Step 2: Fix Track Panel Header Typography

Change the category label from `font-sans` to `font-display` to match the rest of the section's Cormorant serif usage.

**File**: `GenreTrackPanel.tsx` --- update className on header span.

### Step 3: Constrain 5th Card Width on Mobile

Add `max-w-[calc(50%-0.375rem)]` (matching the natural width of a single grid column) and `justify-self-center` to the 5th card's wrapper div when it has `col-span-2`, so it remains the same size as the others but centered.

**File**: `TheSound.tsx` --- update the 5th card wrapper classes.

### Step 4: Add Resting State to Track Accent Bars

Change inactive track accent bars from `scaleY(0)` to `scaleY(0.6)` with reduced opacity (`vow-yellow / 0.12`), creating a subtle visual rhythm in the track list. Active tracks remain at full `scaleY(1)` with full yellow.

**File**: `GenreTrackPanel.tsx` --- update accent bar default styles.

### Step 5: Increase Closing Quote Glow

Change the quote's background glow from `vow-yellow / 0.03` to `vow-yellow / 0.05` for a warmer, more perceptible halo.

**File**: `TheSound.tsx` --- update quote radial gradient opacity.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `GenreTrackPanel.tsx` | Premium glass material with backdrop blur |
| 2 | `GenreTrackPanel.tsx` | Header font-sans to font-display |
| 3 | `TheSound.tsx` | Constrain 5th card width on mobile |
| 4 | `GenreTrackPanel.tsx` | Resting accent bar visibility |
| 5 | `TheSound.tsx` | Warmer closing quote glow |

## What This Achieves

- Track panel matches the premium glass material standard used across all floating components
- Typographic consistency with Cormorant serif throughout the entire section
- Mobile grid maintains visual rhythm without an oversized 5th card
- Track list gains subtle visual structure through resting accent bars
- Closing quote earns the warm sacred halo it deserves

