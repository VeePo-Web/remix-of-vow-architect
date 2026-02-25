
# Audit: Category Headers Need Bolder Typographic Presence

## Finding

The category labels ("Hymns," "Worship," "Pop," "Classical," "Film") are currently rendered at `10px` uppercase with `0.24em` letter-spacing at `50% muted-foreground` opacity. The divider beneath each is `0.5px` at `6%` vow-yellow. These are so quiet they barely register as section dividers -- they read as metadata rather than structural landmarks within the panel.

In a real grand piano, the string sections (bass, tenor, treble) are visually distinct zones separated by physical bridges -- prominent wooden bars that cross the soundboard. The category headers should evoke that same sense of clear, confident zoning. World-class audio interfaces (Apple Music's library sections, Spotify's genre headers) give section labels enough weight to serve as navigation anchors without competing with the track titles.

The current treatment is "whispering in a void." The refinement makes it "a quiet statement with presence" -- still restrained, but unmistakably there.

## The Refinement

Two changes to the category header block (lines 345-362):

### 1. Category label typography -- increase presence

- Font size: `10px` to `11px` -- one step up, still clearly subordinate to track titles (15px)
- Opacity: `text-muted-foreground/50` to `text-muted-foreground/60` -- 20% relative increase in visibility
- Letter-spacing: `0.24em` to `0.2em` -- slightly tighter for a more refined, less "screaming" uppercase feel
- Add `font-medium` (weight 500) -- gives the letterforms enough stroke width to read confidently at small sizes on both retina and non-retina displays

### 2. Category divider line -- from invisible to structural

- Height: `0.5px` to `1px` -- sub-pixel values render inconsistently across displays; 1px is the minimum reliable thickness
- Opacity: `hsl(var(--vow-yellow) / 0.06)` to `hsl(var(--vow-yellow) / 0.12)` -- doubled, matching the string opacity established in the previous refinement for visual cohesion (the dividers read as "bridges" between string groups)

## Technical Changes

### File: `src/components/PianoPanel.tsx`

**Category label (line 352):**
Change class from:
`font-sans text-[10px] uppercase tracking-[0.24em] text-muted-foreground/50`
to:
`font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60`

**Category divider (line 358):**
Change style from:
`height: "0.5px"` and `background: "hsl(var(--vow-yellow) / 0.06)"`
to:
`height: "1px"` and `background: "hsl(var(--vow-yellow) / 0.12)"`

## What Stays Unchanged

All track row styling, piano strings, fade masks, scroll logic, caret, pill behavior, audio logic, panel dimensions, animation timing.
