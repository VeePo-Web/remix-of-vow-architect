

# Design Polish Pass 3 — Final World-Class Refinements

## Current State Assessment

After thorough visual audit (13 screenshots, every section), the homepage is in strong shape:
- Process section cards: Fixed and rendering beautifully (no mirrored text, proper layout)
- Section transitions: Gradient fades working between all dark/light boundaries
- Film grain: Applied to all dark sections
- Pricing cards: Glassmorphism active with MOST SELECTED glow
- SPL cards: Proclamation-scale readings with vow-yellow accent lines
- CTA breathing glow: CrossOver button has ambient glow wrapper
- Zero console errors

## Remaining Issues to Reach Fantasy.co Standard

### Issue 1: TheTransformation Center Divider — Not Rendering (Priority: High)

The divider code exists at line 89-97 of TheTransformation.tsx with `position: absolute`, but it is placed as a sibling inside the `grid` container. Since the grid parent is `relative: false` (no explicit positioning), the `absolute` positioning references the outer `<section>` which has `position: relative`. The divider IS technically rendering but may be behind the grid panels because the panels have higher visual stacking. The grid itself does not have `position: relative`, so the divider is positioned relative to the section — which is correct.

However, looking at the screenshot of TheTransformation, the center line is NOT visible. The divider's `left-1/2` should place it at the center of the section. The issue is likely that the two grid panels each have solid `background` styles with no transparency, completely covering the divider underneath.

**Fix:** Move the center divider OUTSIDE the grid (after the closing `</div>` of the grid, but still inside the section). Since the section is `position: relative`, the divider with `absolute left-1/2 top-0 bottom-0` will overlay on top of the grid panels, appearing as a glowing threshold line. The `z-20` class should place it above the grid content.

Wait — re-reading the code, the divider IS already a child of the `<section>` but it is placed INSIDE the `<div className="grid md:grid-cols-2">` wrapper, between the left and right panels. That grid wrapper does NOT have `position: relative`, so the `absolute` positioning on the divider should reference the parent `<section>` which does have `relative`. So the divider should be visible. 

The actual problem: the divider div is INSIDE the grid, which means CSS grid is treating it as a third grid item. Even though it has `absolute` positioning (which removes it from flow), the grid may still be allocating space or it is rendering behind the panels due to stacking context. The simplest fix is to move the divider outside the grid container entirely.

**File:** `src/components/TheTransformation.tsx` — Move divider div after the grid closing tag

### Issue 2: TheTransformation — Section Label Text Needs Better Visibility (Priority: Medium)

The "THE TRANSFORMATION" label is in a gradient overlay at the top, but its position over the dark left panel makes it blend in. The gradient goes from `hsl(220 15% 8%)` to transparent, which matches the left panel but looks odd over the right panel's warm cream.

**Fix:** Ensure the label gradient covers the full width consistently. Change the gradient to be more subtle — just a top-edge fade to give the label breathing room without the harsh background color bleed.

**File:** `src/components/TheTransformation.tsx`

### Issue 3: TheSound Heading Alignment (Priority: Low)

The heading "Music that holds the room still." and subtitle text are left-aligned within a `text-center` container due to the `max-w-4xl` constraining the text block. On desktop this appears slightly off — the heading wraps to two lines with "the room still." on the second line. This is fine but could benefit from `text-wrap: balance` being verified.

Already has `textWrap: "balance"` — confirmed working. No change needed.

### Issue 4: Process Section Closing CTA Card (Priority: Medium)

The process section ends with a ceremony photo and "Begin the conversation" CTA. The image is beautiful but the CTA button styling could be more prominent — currently it appears as a simple text link with a subtle outline. For the emotional climax of the process section ("Because there's one chance to get this right. And it will be right."), the CTA should have more visual weight.

**File:** `src/components/TheFourMovements.tsx` — The `preparation-cta` class needs a slightly more prominent styling. However, this component may not be the one rendering — let me check which component renders the process closing.

Actually, looking at Index.tsx, the process section uses `<ProcessSection />` from `src/components/process/index.ts`. The closing CTA is likely inside ProcessSection. The TheFourMovements is a separate component. No change needed here unless the process closing CTA is inside ProcessSection's own code.

### Issue 5: Section Label Consistency — Left vs Center Alignment (Priority: Medium)

Most section labels are centered (TheSound, ThreePaths, TheRecord, TheWitnesses), but TheWitness and TheSacredGround have their labels left-aligned within a left-aligned `max-w-2xl` container. This creates a subtle inconsistency in the visual rhythm.

**Fix:** For TheWitness and TheSacredGround, the labels are actually centered within their max-width containers which are themselves centered with `mx-auto text-center`. So they ARE centered. Verified — no change needed.

### Issue 6: CTA Button "Hold my date" Breathing Glow (Priority: Medium)

The CTA has `cta-breathe-glow` class which triggers `cta-breathe` keyframe animation on a 4s cycle. The animation applies box-shadows with vow-yellow color. Looking at the screenshot, the button has a very subtle golden glow that's barely visible against the dark background. The ambient radial glow wrapper is also very subtle at 6% opacity.

**Fix:** The glow is intentionally subtle per the luxury design philosophy ("whisper, never shout"). However, it could be slightly more visible. Increase the ambient wrapper from 6% to 10% opacity and extend its spread. Also verify the button has a border that catches light.

**File:** `src/components/CrossOver.tsx`

### Issue 7: TheInvitation — Video Placeholder Polish (Priority: Low)

The "Play my sample reel" placeholder is just a dark rectangle with a play button icon. While functional, it could have a more cinematic feel — perhaps a subtle vignette or a hint of the hero image as a video poster.

**File:** `src/components/TheInvitation.tsx` — Add a subtle radial gradient or vignette to the video placeholder area

## Final Implementation Plan

Only 3 files need changes:

| File | Change |
|------|--------|
| `src/components/TheTransformation.tsx` | Move center divider outside grid container; refine label gradient |
| `src/components/CrossOver.tsx` | Increase ambient CTA glow intensity slightly |
| `src/components/TheInvitation.tsx` | Add subtle vignette/gradient to video placeholder |

### 1. TheTransformation — Fix Center Divider Positioning

Move the divider `<div>` from inside the grid to after the grid's closing `</div>`, still inside the `<section>`. This ensures it overlays on top of both grid panels rather than being treated as a grid item hidden behind solid backgrounds. The divider already has `z-20`, `absolute`, and `hidden md:block` — it just needs to be outside the grid flow.

Also simplify the label gradient to a lighter, less opaque overlay that doesn't clash with the right panel's warm tone.

### 2. CrossOver — Enhance CTA Ambient Glow

Increase the ambient radial gradient wrapper from `0.06` to `0.10` opacity, and widen the spread from `-inset-x-8 -inset-y-4` to `-inset-x-12 -inset-y-6`. This makes the golden breathing glow more perceptible without being garish.

### 3. TheInvitation — Video Placeholder Polish

Add a subtle inner glow/vignette to the video placeholder rectangle. A radial gradient from `hsl(var(--vow-yellow) / 0.03)` at center to transparent at edges gives a hint of warmth. Add a very faint border shimmer on hover.

## What Will NOT Change

- No text content modifications
- No structural changes to section order
- No new sections or removed sections
- No font changes
- No color palette changes (88/6/4 ratio maintained)
- Process section cards remain as-is (fully fixed)
- All existing section transition fades remain
- Film grain overlays remain on all dark sections

