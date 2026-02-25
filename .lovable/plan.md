

# Homepage Typography, Spacing, and Visual Hierarchy Audit

## Findings

After reviewing every homepage section both in code and in the browser, the site already has strong bones: the vigil sequence is cinematic, the inhale/exhale rhythm works, the Fitzgerald typography system is well-defined, and the narrative arc flows logically. However, several inconsistencies prevent it from reaching Fantasy.co-level polish.

## Issues Identified

### 1. Inconsistent heading/subhead alignment across sections

Several sections have their label and headline left-aligned while their content is centered (or vice versa). Specifically:

- **TheInvitation**: Label "THE INVITATION" is left-aligned (`text-center` only on the label `p` element, but it's inside a left-aligned grid column context). The label ends up left-floating above the 2-column grid.
- **ThreePaths**: Header block has `text-center` on the wrapper but `mb-16` then the headline and subtext are left-aligned due to missing `text-center` on `h2`/`p` elements themselves. Actually looking closer, `h2` does not have `text-center` applied, but the parent `div` does. The headline text wraps at "me there?" -- this is fine but could benefit from `text-wrap: balance`.
- **TheRecord**: Same pattern -- header `div` has `text-center` but heading lacks `text-wrap: balance`.

### 2. Section label inconsistency

Labels across sections use slightly different spacing/margins:
- TheExhale: No explicit label (uses golden dot anchor instead)
- TheSound: `mb-6`
- TheWitness: `mb-4`  
- ThreePaths: `mb-4`
- TheRecord: `mb-4`
- TheWitnesses: `mb-4` (plus golden rule separator adding `mb-6`)
- CrossOver: `mb-16` (much larger)

The brand's spacing system calls for consistent `mb-4` (16px) between label and heading per the typography memory. Most sections follow this, but TheSound uses `mb-6` and CrossOver uses `mb-16`.

### 3. Heading font-weight inconsistency

Some headings use `font-[300]` (explicit) while others use `font-light` (Tailwind class for 300). These are equivalent, but the code is inconsistent. More importantly:
- TheWitness, ThreePaths, TheRecord, TheWitnesses: `font-[300]`
- TheSound, TheInvitation: `font-light`
- CrossOver: `font-[300]`

All should use the same class for maintainability.

### 4. Heading size inconsistency

- TheSound: `clamp(28px,4vw,42px)` -- max 42px
- TheWitness, ThreePaths, TheRecord, TheWitnesses: `clamp(28px,4vw,48px)` -- max 48px  
- CrossOver: `clamp(32px,5vw,56px)` -- max 56px
- VowMoment: `clamp(48px,6vw,72px)` -- intentionally larger (altar)
- TheInvitation: `clamp(28px,4vw,42px)` -- max 42px

Standard section headings should use a consistent max. The typography system defines H2 as 40px. Recommend standardizing non-altar headings to `clamp(28px,4vw,40px)` to match the Fitzgerald scale.

### 5. TheWitness and TheWitnesses content not centered on page

Both "exhale" sections have content shifted left. TheWitness has `max-w-2xl mx-auto text-center` inside `max-w-4xl mx-auto` -- the double nesting is fine but the "What I bring" pills wrap to a second row with "24h plan" orphaned alone. This looks unbalanced.

### 6. Pricing cards (ThreePaths) text alignment

The heading "How deeply do you want me there?" and subtitle "Three ways I can be present on your day." are not centered -- they lack explicit centering. Actually, looking again, the parent div has `text-center` which should cascade. The issue is the text wraps at an odd point on the heading because it lacks `text-wrap: balance`.

### 7. VowMoment has no scroll-triggered reveal

Every other section uses `useScrollReveal` for entrance animation. VowMoment is purely static with no entrance animation. While the brand doc says "No animation - demands static attention," this creates a jarring contrast when scrolling -- the section snaps in without any transition. A subtle opacity fade (no translate) would maintain the "static attention" feel while smoothing the scroll experience.

### 8. Footer spacing refinement

The footer is well-structured but has some spacing inconsistencies relative to the design system. The `py-20` (80px) is good for hero-level spacing but feels slightly generous for a footer. The golden thread `mb-16` above content is also generous.

## Plan

### Change 1: Standardize section heading sizes to Fitzgerald H2 (40px)

**Files**: `TheSound.tsx`, `TheWitness.tsx`, `ThreePaths.tsx`, `TheRecord.tsx`, `TheWitnesses.tsx`, `TheInvitation.tsx`

Replace all section `h2` font-size clamps with the Fitzgerald-standard `clamp(28px,4vw,40px)` except:
- VowMoment (keeps `clamp(48px,6vw,72px)` -- intentionally proclamation scale)
- CrossOver (keeps `clamp(32px,5vw,56px)` -- final CTA deserves elevated scale)

Also standardize `font-[300]` to `font-light` for consistency across all h2 elements.

### Change 2: Standardize label-to-heading spacing

**Files**: `TheSound.tsx`

Change `mb-6` to `mb-4` on the section label to match other sections.

### Change 3: Add `text-wrap: balance` to all section headings

**Files**: `TheSound.tsx`, `TheWitness.tsx`, `ThreePaths.tsx`, `TheRecord.tsx`, `TheWitnesses.tsx`, `CrossOver.tsx`

Add `style={{ textWrap: 'balance' }}` (or add to existing style objects) to prevent awkward line breaks on section headings.

### Change 4: Add subtle fade-in to VowMoment

**File**: `VowMoment.tsx`

Add `useScrollReveal` with a simple opacity transition (no translate) on the blockquote. This preserves the "static attention" principle while smoothing scroll entry.

### Change 5: Fix TheWitness kit pill orphan

**File**: `TheWitness.tsx`

Change the "What I bring" pills layout from `flex flex-wrap gap-3` to a 3-column grid on desktop (`grid grid-cols-3 sm:grid-cols-6 gap-3`) to prevent orphaned single pills on the second row.

### Change 6: CrossOver label spacing

**File**: `CrossOver.tsx`

Reduce `mb-16` on the tagline container to `mb-10` -- 16 is too much vertical gap between the returning tagline and the sacred quote below it.

## What Stays Unchanged

- All copy, content, pricing, and brand messaging
- All section ordering and narrative arc
- Hero vigil sequence and session-aware skip
- Inhale/exhale background rhythm
- ProcessSection design and animations
- All navigation and routing
- Footer content and structure
- All images and assets

## Expected Impact

- Consistent H2 sizing creates unified visual rhythm as users scroll
- Balanced text wrapping eliminates orphaned words and awkward breaks
- VowMoment fade-in smooths the scroll experience at the emotional peak
- Standardized label spacing creates metronomic consistency
- Kit pills display cleanly without orphans
- The page reads as one cohesive, meticulously crafted experience

