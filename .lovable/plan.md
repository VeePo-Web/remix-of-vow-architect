

# About Page — Round 6: Visual Centering Fix and Final Polish

## Root Cause Analysis

The "left-aligned" labels that have haunted every round share a single root cause: **CSS `letter-spacing` adds trailing space after the last character**, causing visually centered text to appear shifted left. With `tracking-[0.3em]` on 12px text, that is ~3.6px of invisible trailing space — enough to be perceptible on short text like "THE WITNESS" or "THE SUSTAIN".

This is a known typographic issue. The fix is to add `padding-left` equal to the letter-spacing value on each label, so the invisible trailing space is balanced by equal leading space.

The same optical illusion affects the italic closing line "Every one of them heard clearly." — serif italic text has natural leftward lean that shifts perceived center.

## Affected Elements (All 6 Sections)

| Section | Element | Current State | Fix |
|---------|---------|---------------|-----|
| WitnessHero | "THE WITNESS" label | Left-shifted | Add `pl-[0.3em]` |
| WitnessOrigin | "THE ORIGIN" label | Left-aligned (intentional for asymmetric layout) | No change needed |
| WitnessSustain | "THE SUSTAIN" label | Left-shifted | Add `pl-[0.3em]` |
| WitnessPresence | "THE PRESENCE" label | Left-shifted | Add `pl-[0.3em]` |
| WitnessPresence | "ceremonies witnessed" | Left-shifted | Already has `text-center`; no tracking issue — check parent |
| WitnessPresence | "Every one of them heard clearly." | Left-shifted | Already has `text-center`; remove redundant outer `text-center` div nesting that may cause specificity clash |
| WitnessCovenant | "THE COVENANT" label | Left-shifted | Add `pl-[0.3em]` |
| WitnessCrossing | "THE CROSSING" label | Appears OK (golden tint helps visibility) | Add `pl-[0.3em]` for consistency |

## Implementation

### File 1: `WitnessHero.tsx` (line 69)
Add `pl-[0.3em]` to the label's className to compensate for trailing letter-spacing.

### File 2: `WitnessSustain.tsx` (line 54)
Add `pl-[0.3em]` to "THE SUSTAIN" label.

### File 3: `WitnessPresence.tsx` (lines 60, 113-121, 164)
- Add `pl-[0.3em]` to "THE PRESENCE" label (line 60)
- The "ceremonies witnessed" `p` tag (line 115) has `text-center` — verify parent container isn't constraining it. The number "500" and "+" are in a `relative text-center` div, but the `p` is a sibling below, still inside the `relative` wrapper. This should work. The visual offset may be the italic `font-display` (Cormorant Garamond) creating a natural leftward lean. Fix: ensure this text is not italic (it isn't in code — so the issue is the serif font optical weight). No code fix needed — this is optically centered.
- The closing "Every one of them heard clearly." (line 164) — this IS italic serif, which creates a strong leftward lean. Fix: wrap in a `flex justify-center` to force optical centering, or accept the typographic character.

### File 4: `WitnessCovenant.tsx` (line 44)
Add `pl-[0.3em]` to "THE COVENANT" label.

### File 5: `WitnessCrossing.tsx` (line 73)
Add `pl-[0.3em]` to "THE CROSSING" label.

## Summary

| File | Change | Purpose |
|------|--------|---------|
| WitnessHero | `pl-[0.3em]` on label | Fix letter-spacing optical shift |
| WitnessSustain | `pl-[0.3em]` on label | Fix letter-spacing optical shift |
| WitnessPresence | `pl-[0.3em]` on label | Fix letter-spacing optical shift |
| WitnessCovenant | `pl-[0.3em]` on label | Fix letter-spacing optical shift |
| WitnessCrossing | `pl-[0.3em]` on label | Fix letter-spacing optical shift |

5 files, single class addition each, no structural changes.

