

# Piano Keys — Shadow & Press-Down Polish

## Current State

The Three Keys section already has the piano key layout with white and black keys, ivory gradients, content anchored to the bottom, and a press-down mechanic. However, the current shadow behavior when pressing keys is insufficient — the shadow collapses too aggressively on `:active`, making the press feel flat rather than satisfyingly tactile. The user wants a visible, rewarding shadow when the button is pressed down.

## What Needs to Change

### 1. Enhanced Press-Down Shadow (CSS)

The current `:active` state collapses the shadow from `0 8px 32px` to `0 2px 8px` — this is too aggressive. A real piano key being pressed down should retain a soft contact shadow that spreads slightly outward at the base, like the key is compressing against the keybed. The shadow should get warmer (vow-yellow tint) on press to reward the interaction.

**Changes to `.piano-white-key:active` in `src/index.css`:**
- Replace the current shadow collapse with a warmer, wider contact shadow: `0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(255,224,138,0.1)` — the key "lands" on a warm surface
- Keep `translateY(3px)` and `60ms` duration

**Changes to `.piano-white-key--chosen:active` (desktop media query):**
- Current: `0 1px 4px rgba(255,224,138,0.1)` — too faint
- New: `0 1px 3px rgba(0,0,0,0.25), 0 6px 16px rgba(255,224,138,0.15), inset 0 2px 4px rgba(0,0,0,0.06)` — the chosen key presses into a golden pool with a subtle inset shadow showing compression

### 2. Hover Underglow Enhancement (CSS)

The current hover adds `0 4px 20px rgba(255,224,138,0.08)` — barely visible. Increase to `0 6px 24px rgba(255,224,138,0.12)` so the visitor sees a warm candlelight glow approach the key before pressing.

### 3. CTA Button Press Shadow (CSS)

The "Hold my date" button inside the key currently has no dedicated press state. Add `:active` styling to both CTA variants so pressing the actual button also feels tactile:
- `.piano-key__cta--chosen:active`: scale(0.98), shadow reduces to `0 2px 8px rgba(0,0,0,0.15)`
- `.piano-key__cta--flanking:active`: scale(0.98), border darkens slightly

### 4. Mobile Press Enhancement (CSS)

The current mobile `:active` uses `translateY(2px)` with a basic shadow collapse. Enhance to match the desktop warmth — add the golden contact shadow on press so mobile users get the same rewarding feedback.

## Files Modified

### `src/index.css`
- Lines ~4842-4850: Update `.piano-white-key:hover` shadow — increase underglow opacity from 0.08 to 0.12
- Lines ~4853-4860: Update `.piano-white-key:active` shadow — add warm contact shadow and subtle inset
- Lines ~4886-4893: Update `.piano-white-key--chosen:active` — warmer golden pool shadow with inset
- Lines ~4904-4910: Update `.piano-white-key--mobile:active` — add warm contact shadow
- Lines ~4986-4999: Add `:active` states for both CTA button variants

### `src/components/ThreePaths.tsx`
No changes needed — the component already has the correct structure. All improvements are CSS-only.

