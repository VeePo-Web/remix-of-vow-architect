

# About Page — Round 4: Transition Seams and Alignment Fixes

## Issues Found in Visual Audit

### 1. Sustain Section Fades to Light Gray — Breaks Dark Page Rhythm
The Sustain section background gradient goes from `hsl(var(--background))` (dark) to `hsl(var(--surface))` (light cream/gray). On dark theme, `--surface` resolves to a light value, creating a washed-out gray lower half clearly visible in the screenshot. This breaks the dark vigil mood and creates hard seams on both sides (Origin→Sustain and Sustain→Presence).

**Fix in `WitnessSustain.tsx` line 35:** Change gradient endpoint from `--surface` to `hsl(var(--deep-graphite))` to stay within the dark palette.

### 2. Presence → Covenant Transition Has Visible Cream Band
The Presence section bottom fade (line 171) targets `hsl(var(--surface))` — a light color. The Covenant section starts with `hsl(var(--background))` (dark). This mismatch creates a visible cream/light horizontal stripe between the two sections.

**Fix in `WitnessPresence.tsx` line 171:** Change from `hsl(var(--surface))` to `hsl(var(--background))` to match the Covenant section's starting color.

### 3. "ceremonies witnessed" and Closing Statement Appear Left-Offset
The text "ceremonies witnessed" and "Every one of them heard clearly." visually render left of center despite having `text-center` class. This is because the parent `div` wrapper for the closing statement has no `text-center` on it — the italic serif font combined with the `max-w-6xl` wide container creates a visual asymmetry.

**Fix in `WitnessPresence.tsx`:** Add `text-center` to the closing statement wrapper div (line 151) to ensure inheritance is explicit.

### 4. Section Labels Appear Left-Aligned
"THE SUSTAIN", "THE PRESENCE", and "THE COVENANT" labels all render visually left of center. They have `text-center` on the `p` tag, which should work, but the visual impression is that they sit left. This is likely because the labels are very short text inside very wide containers. No structural code fix needed — this is actually centered but appears off due to the tiny text and wide container. However, to be safe, will verify all labels have `text-center` properly applied.

---

## Files to Modify

| File | Change |
|------|--------|
| `WitnessSustain.tsx` | Change section gradient from `--surface` to `--deep-graphite` |
| `WitnessPresence.tsx` | Change bottom fade from `--surface` to `--background`; add `text-center` to closing wrapper |

2 files, minimal changes, focused on fixing the two visible transition seams and alignment.

