

# Fix: Section Fade Gradient Mismatches Between Adjacent Sections

## Problem

The homepage sections use `section-fade-top` and `section-fade-bottom` gradient overlays to create seamless visual transitions between adjacent sections. Several of these gradients reference colors from sections that no longer exist in the current section order, or are missing entirely between certain transitions. This creates visible color banding artifacts -- light gradients appearing between two dark sections, or hard cuts between warm and dark sections.

### Section Order (from Index.tsx)

```text
1. Hero (dark void)
2. TheExhale (dark)
3. ProcessSection (warm)
4. VowMoment (dark)
5. TheInvitation (warm, hsl(45 25% 96%) -> hsl(45 20% 93%))
6. TheSound (dark)
7. TheTransformation (dark)
8. TheWitness (warm, hsl(45 25% 96%))
9. ThreePaths (dark)
10. TheRecord (dark)       <-- TWO DARK IN A ROW
11. TheWitnesses (warm)
12. CrossOver (dark)
```

### Issues Found

1. **TheRecord top fade references a deleted section**: Comment says "from TheSacredGround warm" with `hsl(45 20% 93%)`, but TheSacredGround no longer exists. TheRecord follows ThreePaths (dark). A warm gradient bleeds into a dark-to-dark transition.

2. **ThreePaths has no bottom fade**: No transition gradient into TheRecord. Combined with issue 1, the ThreePaths-to-TheRecord boundary has a visible warm band that should not exist.

3. **TheWitnesses has no bottom fade**: No gradient transition into CrossOver (dark). This creates a hard cut from warm cream to deep black.

4. **CrossOver has no top fade**: No gradient pulling from TheWitnesses warm. Another contributor to the hard cut.

## The Refinement

### File: `src/components/TheRecord.tsx`

**Change 1**: Replace the warm top fade with a dark-to-dark fade (or remove it entirely since both sections are dark).

- Remove the `section-fade-top` div (lines 21-26), since ThreePaths and TheRecord share the same dark palette. A fade between two identical dark backgrounds is unnecessary and the warm color actively harms the transition.

### File: `src/components/ThreePaths.tsx`

**Change 2**: No bottom fade needed -- both ThreePaths and TheRecord are dark with similar backgrounds. No change required here.

### File: `src/components/TheWitnesses.tsx`

**Change 3**: Add a `section-fade-bottom` div before the closing `</section>` tag (after line 144) to transition into CrossOver's dark background.

```jsx
<div
  className="section-fade-bottom"
  style={{ background: 'linear-gradient(to bottom, transparent, hsl(240 9% 2%))' }}
  aria-hidden="true"
/>
```

The color `hsl(240 9% 2%)` matches CrossOver's radial gradient endpoint.

### File: `src/components/CrossOver.tsx`

**Change 4**: Add a `section-fade-top` div after the existing background layers (after line 43) to pull from TheWitnesses warm background.

```jsx
<div
  className="section-fade-top"
  style={{ background: 'linear-gradient(to top, transparent, hsl(45 20% 93%))' }}
  aria-hidden="true"
/>
```

The color `hsl(45 20% 93%)` matches TheWitnesses' gradient endpoint.

## What Stays Unchanged

All section content, copy, imagery, animation timing, layout, typography, reveal logic, and section ordering. This is purely a gradient color correction on transition overlays.

## Expected Impact

- Eliminates the visible warm band between ThreePaths and TheRecord (two dark sections)
- Creates a smooth warm-to-dark transition between TheWitnesses and CrossOver
- All section boundaries now have correct, matching gradient colors

