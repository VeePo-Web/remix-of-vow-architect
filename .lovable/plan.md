

# Design Polish Pass 2 — Elevation to Fantasy.co Standard

## Current State (Confirmed Working)

All 13 homepage sections render at full height with content. The previous polish pass successfully added:
- Section transition gradient fades between dark/light boundaries
- Film grain on dark (inhale) sections via `.section-grain`
- Glassmorphism pricing cards on ThreePaths
- Proclamation-scale SPL readings with vow-yellow top accents on TheRecord
- Pill-styled kit badges on TheWitness
- Letter-spacing on CrossOver commitment text
- CTA breathing glow restored on CrossOver

## Issues Identified in Visual Audit

### 1. TheTransformation — Missing Center Divider (Priority: High)

The split-screen works (fears left, resolutions right) but lacks the glowing center threshold line that represents the semicolon between death and life. The plan called for a 2px-wide breathing divider using `divider-breathe` animation, but it was not implemented.

**Fix:** Add a `<div>` absolutely positioned at the center of the grid that renders a 2px vertical line with the `divider-breathe` keyframe animation (already in CSS). Only visible on `md:` breakpoint and above. On mobile, the panels stack vertically so the divider would be horizontal or hidden.

**File:** `src/components/TheTransformation.tsx`

### 2. Section Label Alignment (Priority: Medium)

Several section labels ("THE TRANSFORMATION", "YOUR PRESENCE", "THE RECORD", etc.) are left-aligned within their container but visually appear off-center. On TheSound and TheWitnesses they are centered, but TheTransformation's label is inside the left panel. This inconsistency breaks the visual rhythm.

**Fix:** Audit all section labels across components. Ensure dark (inhale) sections center their labels above the content, and light (exhale) sections also center theirs. TheTransformation's label should move above the grid split, centered, rather than inside the left panel.

**Files:** `src/components/TheTransformation.tsx`, verify consistency across all section components

### 3. TheInvitation — Verify Layout and Polish (Priority: Medium)

This section was not closely inspected. Need to verify the "Play my sample reel" video area, the Meet the Owner content, and overall spacing follow the Fitzgerald typography system.

**File:** `src/components/TheInvitation.tsx`

### 4. CrossOver CTA Button — Breathing Glow Visibility (Priority: Medium)

The "Hold my date" button appears to have a subtle dark border/outline but the breathing glow animation (`cta-breathe-glow` class) is barely visible or not applying. The button has a dark rounded-pill style but needs the warm vow-yellow pulsing glow to draw the eye.

**Fix:** Verify the button element has the `cta-breathe-glow` class. Add a subtle radial vow-yellow glow behind the button container at 5% opacity for ambient warmth. Increase the glow intensity in the keyframe slightly.

**File:** `src/components/CrossOver.tsx`

### 5. TheSacredGround — Top Fade Already Added but Section Needs Audit (Priority: Low)

The Banff Mode card has the mountain watermark and protocols list. Verify the card styling matches the luxury treatment applied to ThreePaths cards.

**File:** `src/components/TheSacredGround.tsx` (likely no changes needed)

### 6. TheWitnesses — Testimonial Warmth (Priority: Medium)

The testimonials section has explicit inline background now, but the large decorative quotation marks should be verified at the larger size (text-7xl/8xl). The monospaced timestamp styling for the "68 dBA peak ceremony reading" metric should be confirmed.

**File:** `src/components/TheWitnesses.tsx`

### 7. Track Card Left Borders on TheSound (Priority: Low)

The left accent borders (2px vow-yellow at 25% opacity) were added to track cards but they need `position: relative` on the parent wrapper to position correctly. Need to verify the borders are actually visible.

**File:** `src/components/TheSound.tsx`

## Files to Modify

| File | Change |
|------|--------|
| `src/components/TheTransformation.tsx` | Add glowing center divider line with `divider-breathe` animation; move section label above grid |
| `src/components/CrossOver.tsx` | Verify and enhance CTA breathing glow visibility; add ambient radial glow behind button |
| `src/components/TheWitnesses.tsx` | Verify quotation mark sizing and monospaced metric styling |
| `src/components/TheSound.tsx` | Verify track card left border positioning |
| `src/components/TheInvitation.tsx` | Audit spacing and typography alignment with Fitzgerald system |

## What Will NOT Change

- No text content modifications
- No structural changes to section order
- No new sections added or removed
- No font family changes
- No color palette changes (88/6/4 ratio maintained)

