

# About Page — Round 3: Polish, Copy Elevation, and Micro-Detail Refinements

## Issues Identified

### 1. Covenant Section Background Contrast Problem
The Covenant section uses `--surface` to `--surface-warm` gradient — these are light-mode-style variables that create a cream/warm section within an otherwise dark page. The certificate card uses `bg-card` which may also resolve to a light tone. On the dark theme, the text inside the certificate (`text-foreground`) may render as light-on-light if the card background is light. This needs explicit dark card styling or the section should stay dark with a subtle warm tint instead of flipping to cream.

### 2. Copy Needs Final Brand Voice Polish
Several lines still feel generic rather than sacred/reverent:
- **Hero subtitle** "I witness them." — strong, keep.
- **Origin**: "I sat in the second row" is good narrative but "started building a system" feels technical. Reframe: "I made a promise: no couple would ever lose their words to the wind."
- **Presence witnessed moments**: Some feel lighthearted/comedic ("ring bearer dropped rings—twice", "officiant lost their place and laughed"). These undermine the reverent tone. Replace with moments that evoke awe, not amusement.
- **Covenant promises**: "test every microphone" is too technical for this sacred certificate context. Reframe around emotional duties.

### 3. Sustain Section SVG Visualization Needs Warmth
The three-dot SVG connected by dashed lines is abstract but feels cold and clinical — like a tech diagram. The dots need larger ambient halos and the connecting line should feel more like a golden thread than a dashed technical line.

### 4. Origin Section — Quote Attribution Missing
The closing quote "No couple should ever wonder if their guests heard their vows." has no attribution. Add "— Parker" or style it as a personal vow rather than a generic quote.

### 5. Crossing Section — Redundant Tagline
Both Covenant and Crossing end with "'Til Death; Unto Life." — the repetition within two adjacent sections dilutes the sacred weight. Remove from Covenant (it lives more powerfully as the page's final word in Crossing).

### 6. Section Label Hierarchy — All Identical
Every section uses the exact same `text-xs uppercase tracking-[0.3em] opacity-60` for labels. The hierarchy should differentiate: Hero label slightly larger or different treatment, Crossing label warmer.

---

## Implementation Plan

### File 1: `WitnessOrigin.tsx`
- Rewrite the third paragraph: "I left the reception that night and started building a system to ensure every word would be heard" → "I left the reception that night with a single promise: no couple would ever lose their words to the wind."
- Add "— Parker" attribution below the closing quote in a smaller, muted style.

### File 2: `WitnessPresence.tsx`
- Replace comedic witnessed moments with reverent ones:
  - "The ring bearer who dropped the rings—twice" → "The father who couldn't finish his toast"
  - "The officiant who lost their place and laughed" → "The grandmother who heard every word from the last row"
  - "The sunset that made everyone cry" → "The silence after the first kiss that no one wanted to break"

### File 3: `WitnessCovenant.tsx`
- Replace "I will test every microphone before your guests arrive." → "I will prepare as though your ceremony were my own."
- Remove the "'Til Death; Unto Life." tagline block at the bottom (lines 166-181) — let this live only in Crossing.
- Fix the section background: change from `--surface/--surface-warm` to a dark warm gradient: `hsl(var(--background))` to `hsl(var(--deep-graphite))` with a subtle warm tint via an overlay, so the certificate card actually pops as a lighter element against dark.

### File 4: `WitnessSustain.tsx`
- Change the SVG connecting line from dashed (`strokeDasharray="4 8"`) to solid at lower opacity (`0.20`, no dash) — removes clinical feel.
- Increase outer ring radius from `r="14"` to `r="18"` for more visible ambient halos.

### File 5: `WitnessCrossing.tsx`
- No copy changes needed — "Your ceremony deserves a witness." is strong.
- Add a slightly warmer label treatment: increase opacity from 0.60 to 0.50 and add vow-yellow tint to the label color.

---

## Summary

| File | Change | Purpose |
|------|--------|---------|
| WitnessOrigin | Copy refinement, quote attribution | Brand voice elevation |
| WitnessPresence | Replace 3 comedic moments with reverent ones | Tonal consistency |
| WitnessCovenant | Copy fix, remove duplicate tagline, dark background | Warmth + hierarchy |
| WitnessSustain | Solid golden thread, larger halos | Remove clinical feel |
| WitnessCrossing | Warmer label treatment | Final section distinction |

5 files, no new dependencies, no structural changes.

