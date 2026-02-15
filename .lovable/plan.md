

# Critical Fix: Homepage Sections Invisible Due to Color Variable Mismatch

## The Problem

The homepage sections between the Hero and Footer are **rendering but invisible** due to text color conflicts introduced in the last batch of edits. The page appears to jump from Hero directly to the CrossOver/Footer.

### Root Cause

In the death theme (default), the CSS variables resolve as:
- `--ink-inverse: var(--rich-black)` = nearly black (240 9% 4%)
- `--foreground: var(--absolute-white)` = white

The rewritten components use `text-ink-inverse` in dark sections (CrossOver, TheRecord, ThreePaths) -- this renders **black text on black backgrounds**. Meanwhile, light-surface sections (TheWitness, TheWitnesses, TheSacredGround) use `text-foreground` and `text-muted-foreground` which resolve to **white/grey text on cream backgrounds** because they lack `data-theme="life"`.

## The Fix (Two-Part)

### Part 1: Dark Sections -- Replace `text-ink-inverse` with `text-foreground`

In the death theme, `text-foreground` = white, which is correct for dark backgrounds. The following files need `text-ink-inverse` replaced with `text-foreground`:

**CrossOver.tsx:**
- `text-ink-inverse/80` -> `text-foreground/80` (tagline)
- `text-ink-inverse` -> `text-foreground` (quote heading)
- `text-ink-inverse/50` -> `text-foreground/50` (trust anchor)
- `text-ink-inverse/90` -> `text-foreground/90` (commitment statement)

**TheRecord.tsx:**
- `text-ink-inverse` -> `text-foreground` (heading)
- `text-ink-inverse/90` -> `text-foreground/90` (guarantee quotes)

**ThreePaths.tsx:**
- `text-ink-inverse` -> `text-foreground` (heading)

**Footer.tsx:**
- All `text-ink-inverse` references -> `text-foreground`
- All `text-ink-inverse/70` -> `text-foreground/70`

### Part 2: Light-Surface Sections -- Add `data-theme="life"`

These sections have cream/warm backgrounds but inherit the death theme's white text. They need `data-theme="life"` on their root `<section>` element so that `--foreground` resolves to dark text:

**TheWitness.tsx:** Add `data-theme="life"` to the section element (line 33)

**TheWitnesses.tsx:** Add `data-theme="life"` to the section element (line 38)

**TheSacredGround.tsx:** Add `data-theme="life"` to the section element (line 25)

### Part 3: TheTransformation Right Panel Text Fix

The right panel uses `text-rich-black` which should work (it's defined in tailwind config). The left panel uses `text-foreground/80` which is white -- correct for its dark background. No changes needed here.

## Files Modified (7 total)

1. `src/components/CrossOver.tsx` -- Replace `text-ink-inverse` with `text-foreground`
2. `src/components/TheRecord.tsx` -- Replace `text-ink-inverse` with `text-foreground`
3. `src/components/ThreePaths.tsx` -- Replace `text-ink-inverse` with `text-foreground`
4. `src/components/Footer.tsx` -- Replace `text-ink-inverse` with `text-foreground`
5. `src/components/TheWitness.tsx` -- Add `data-theme="life"`
6. `src/components/TheWitnesses.tsx` -- Add `data-theme="life"`
7. `src/components/TheSacredGround.tsx` -- Add `data-theme="life"`

## Why This Happened

The previous implementation used `text-ink-inverse` assuming it meant "text for inverse (dark) surfaces." In reality, `--ink-inverse` is defined as the **inverse of the theme's primary ink** -- in the death theme, primary ink is white, so inverse is black. This is the wrong token for white-text-on-dark-background scenarios.

## After This Fix

Once text is visible, we can proceed with the full world-class design polish pass (animation consistency, typography refinement, micro-interactions, section transition dividers, etc.) as outlined in the original critique. But fixing visibility is the prerequisite -- no design improvements matter if the content cannot be seen.

