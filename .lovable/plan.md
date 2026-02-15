

# World-Class Homepage Design Polish — Fix Layout Collapse and Elevate Design

## Critical Discovery: Sections Collapsing to Zero Height

The DOM extraction confirms all 13 homepage sections exist with content, but `document.documentElement.scrollHeight` is only **3078px** instead of the expected **~7500px**. Multiple sections are collapsing to zero visual height. The page jumps from Hero directly to CrossOver/Footer.

### Root Causes to Fix

**1. `contain: layout style` on `.process-section` (index.css line 3233)**
The CSS `contain: layout` tells the browser the element's size is independent of its children AND its parent. In a flex column layout, this can cause the element to collapse to zero height even with `min-height: 180vh` set, because the containment prevents the flex parent from reading its intrinsic size. This must be removed.

**2. VowMoment `<section>` wrapping issue**
The VowMoment section was edited to add `section--dark` class. The DOM extraction shows its content as a "BLOCKQUOTE" direct child — suggesting the `<section>` wrapper may have been corrupted or is collapsing due to the `section--dark` class interaction with `min-h-screen flex`. Need to verify and fix.

**3. `section--surface` sections may lack explicit height**
TheWitness, TheWitnesses, and TheSacredGround use `section--surface section-padding-standard`. If their inner content collapses (e.g., due to opacity-0 initial state from IntersectionObserver reveals), the sections themselves may have no intrinsic height — just padding around invisible content.

**4. IntersectionObserver reveals starting at opacity-0 may contribute**
Several sections set all their children to `opacity-0 translate-y-4` initially and only reveal them when the IntersectionObserver fires. If the observer never fires (because the section has zero height and never enters the viewport), the content stays invisible in a catch-22 loop.

---

## Implementation Plan

### Step 1: Remove `contain: layout style` from ProcessSection (index.css)

Remove lines 3233-3235:
```css
.process-section {
  contain: layout style;
}
```

This CSS containment optimization breaks flex layout participation. The `min-height: 180vh` on the process section should then take effect properly. The other containment rules (`contain: layout paint` on `.gradient-dawn`, `contain: strict` on `.weaving-thread`) are fine since those are absolutely positioned inner elements.

### Step 2: Remove `contain: layout paint` from `.gradient-dawn` if it affects parent sizing (index.css)

Check line ~2926-2929. The `.gradient-dawn` element is `position: absolute; inset: 0` so containment shouldn't affect parent sizing, but verify.

### Step 3: Ensure VowMoment section renders correctly

Read the current VowMoment.tsx to verify the `<section>` wrapper is intact and properly structured. If needed, add explicit `min-h-[100vh]` as a Tailwind class alongside the `section--dark` class to ensure minimum height.

### Step 4: Add `min-height` safety nets to all sections

For every section that uses IntersectionObserver-based content reveals (opacity-0 initial), ensure the wrapping element has an explicit minimum height so the section occupies space even before content becomes visible:

- TheExhale: Already has `min-h-[70vh]` -- good
- ProcessSection: Has `min-height: 180vh` in CSS -- good (once containment is removed)
- VowMoment: Has `min-h-screen` -- verify it takes effect
- TheInvitation: Add `min-h-[400px]` or explicit `py-24 md:py-32` (already has padding)
- TheSound: Add `min-h-[400px]`
- TheTransformation: Has `min-h-[600px]` on inner grid -- verify section wrapping
- TheWitness: Has `section-padding-standard` (py-20) -- should be enough
- ThreePaths: Has `py-24` -- should be enough
- TheSacredGround: Has `section-padding-standard` -- should be enough
- TheRecord: Has `py-24` -- should be enough
- TheWitnesses: Has `section-padding-standard` -- should be enough
- CrossOver: Has `py-24` -- already working

### Step 5: Test scroll through entire page

After fixes, verify all 13 sections render with proper height and the breathing rhythm (dark/light alternation) is visible.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/index.css` (lines 3233-3235) | Remove `contain: layout style` from `.process-section` |
| `src/components/VowMoment.tsx` | Verify section wrapper; add explicit height if needed |
| `src/components/TheSound.tsx` | Add `min-h-[400px]` safety net |
| `src/components/TheTransformation.tsx` | Verify section wrapper has proper min-height |

## Expected Result

After removing the CSS containment and adding height safety nets:
- Total page scrollHeight increases from ~3078px to ~7500px
- All 13 sections render at proper heights
- The breathing rhythm (dark/light alternation) becomes visible
- IntersectionObserver reveals trigger correctly as user scrolls
- The page scrolls through the full emotional journey: Awe, Recognition, Understanding, Sacred Pause, Trust, Proof, Relief, Clarity, Choice, Confidence, Commitment

## After Layout Fix: Design Polish Phase

Once sections are visible, the following design refinements will be applied (no text changes):
- Consistent scroll-triggered staggered reveals across all sections
- Sacred timing curves (cubic-bezier(0.22, 0.61, 0.36, 1)) on all transitions
- Golden thread section dividers between same-temperature sections
- Scroll cue fade-out after hero
- Header nav staggered reveal on scroll
- Typography orphan prevention on all headings

