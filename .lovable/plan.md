

# World-Class Homepage Design Overhaul

## Current State Assessment

After thorough audit of every section, screenshot, and CSS file, here are the findings:

### What works well
- Hero vigil sequence (flame, Ken Burns, staggered UI reveal)
- TheExhale section (clean emotional text, golden thread SVG)
- VowMoment (full-viewport sacred interstitial)
- TheInvitation (portrait + copy, trust badges)
- TheTransformation (split panels with background images)
- TheWitness, ThreePaths, TheRecord, TheWitnesses, CrossOver (all rendering)
- All 7 AI background images are integrated and loading

### Critical issues found

**1. Process Section Card Layout is Broken (CSS Class Mismatch)**
The `ProcessMovement` component renders elements with class `.process-card`, but the journal layout CSS (lines 4042-4063) targets `.letterpress-card` for grid ordering and positioning. Since no component actually outputs `.letterpress-card`, the journal grid layout rules (alternating image/card positioning, margin auto, order swaps) are never applied. This causes cards to stack incorrectly instead of displaying in the intended image-left/card-right alternating journal layout.

**2. Duplicate CSS Systems (~1500 lines of dead code)**
The CSS contains two complete systems for process cards:
- Original system (lines 2127-2731): `.process-movement`, `.process-movement__header`, etc. targeting a simpler card layout
- Journal system (lines 4016-4200): `.process-movement--journal`, targeting `.letterpress-card` for grid layout
- Card system (lines 5423-5527): `.process-card` styles for cream-colored cards

The `ProcessMovement` component uses journal class names but references `.process-card` instead of `.letterpress-card`, creating a conflict.

**3. Held Breath Line System CSS (~500 lines) with No Component**
Lines 1871-2126 define an elaborate "Held Breath" transforming line SVG system (`.held-breath`, `.held-breath-path`, `.card-connector`) that has no corresponding component in any TSX file. This is entirely dead CSS.

**4. Minor design gaps**
- Process section background is very dark, nearly indistinguishable from other dark sections
- TheSound "Music coming soon" placeholder feels unfinished
- Section transitions between dark-to-light sections could be smoother

## Implementation Plan

### Phase 1: Fix Process Card CSS Class Mismatch

Replace all `.letterpress-card` references in CSS with `.process-card` to match the actual component output.

| Location | Change |
|----------|--------|
| `src/index.css` lines 4042-4063 | Change `.letterpress-card` to `.process-card` (6 instances) |
| `src/index.css` lines 4150-4158 | Change `.letterpress-card` to `.process-card` in responsive rules |
| `src/index.css` lines 4164-4166 | Change `.letterpress-card__numeral` to `.process-card__numeral` |
| `src/index.css` lines 4179-4185 | Change `.letterpress-card` references in mobile rules |

### Phase 2: Remove Dead "Held Breath" Line System CSS

Remove the unused line/connector system (lines 1871-2126) that has no corresponding component. This removes ~255 lines of dead CSS including:
- `.held-breath`, `.held-breath__ambient`, `.held-breath__line-container`
- `.held-breath-path`, all state variants (silent, pulse, wave, refined, keys)
- `.card-connector` system
- Associated keyframes (`held-breath-ambient-pulse`, `held-breath-shimmer`, `connector-anchor-pulse`)

### Phase 3: Remove Dead Letterpress Material CSS

Search for and remove any remaining `.letterpress-card__numeral` rules that referenced the old component system. The process-card system at lines 5423-5527 already handles numeral positioning correctly.

### Phase 4: Process Section Visual Polish

Refine the process section to feel more distinct and premium:
- The warm dawn gradient background is good but needs stronger warmth to differentiate from surrounding dark sections
- Increase the process-card cream background contrast slightly for better readability
- Ensure the ceremony closing image renders at appropriate brightness

### Phase 5: Verify All Section Transitions

After the CSS fixes, verify:
- TheExhale fade-bottom gradient transitions smoothly into ProcessSection
- ProcessSection closing ceremony image transitions into VowMoment
- VowMoment transitions into TheInvitation warm section
- All section-fade-top and section-fade-bottom elements create seamless flow

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Fix `.letterpress-card` to `.process-card` (Phase 1); remove held-breath/connector CSS (Phase 2); remove dead letterpress numeral rules (Phase 3); polish process section warmth (Phase 4) |

## What Stays Unchanged

- All text content across every component
- All TSX component logic and structure
- All 7 AI-generated background images
- Hero vigil sequence and all animation timing
- Every section outside the Process section
- Color palette and typography system
- Footer, navigation, and routing

## Estimated Impact

- Process section cards will display correctly in alternating journal layout for the first time
- ~750+ lines of dead CSS removed (held-breath system + letterpress references)
- Faster CSS parse time and reduced bundle size
- Zero visual regressions outside the process section (which currently renders incorrectly anyway)

