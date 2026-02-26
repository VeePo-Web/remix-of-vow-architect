

# Homepage Round 13 — Final Audit and Edge-Case Hardening

After 12 rounds, the seven final sections achieve cinematic quality. This round addresses the remaining edge cases, a missed implementation from Round 12, and two subtle interaction issues that would be caught in a Fantasy.co QA pass.

---

## Audit Findings

### NowPlayingBar — Missing Reduced-Motion on Progress Bar (Missed in R12)
The Round 12 plan noted that the NowPlayingBar progress bar animates continuously without respecting `prefers-reduced-motion`, but no fix was implemented. The progress bar at line 126 uses `transition-none` — this is correct (it tracks audio position, not decorative motion). However, the sound-wave animations in MiniWaveform ARE decorative and while the CSS selector `[style*="sound-wave"]` at line 4236 targets them, it relies on attribute matching which may not work reliably across browsers since the animation name is set via inline `animation` style property, not a `style` attribute containing that string literally. A more robust approach: check `reducedMotion` state in the component itself.

### TheTransformation — Hover Opacity Fix Incomplete
The Round 12 fix used `onMouseEnter`/`onMouseLeave` event handlers to toggle opacity. This works but creates a problem: on touch devices, `mouseEnter` fires but `mouseLeave` may not fire reliably, leaving items stuck at full opacity. Need to add `onTouchEnd` handler or use CSS-only approach via `@media (hover: hover)`.

### TheSound — NowPlayingBar Slide Transition
The NowPlayingBar uses `transform: translateY(100%)` to hide and `translateY(0)` to show (in CSS). The transition timing is not explicitly set in the CSS — it inherits from whatever the browser default is. Should have explicit `transition` property matching the site's 260ms navigation timing standard.

### CrossOver — Trust Anchor Spacing
After relocating the film grain in Round 12, the trust anchor text (`mb-12`) creates a large gap before the golden thread below it. The visual rhythm feels disconnected. The `mb-4` on the CTA stack was also changed, creating a tight CTA-to-trust gap. The spacing sequence should be: CTA -> 16px -> trust text -> 32px -> golden thread -> 32px -> commitment.

### ProcessSection — Closing CTA Button Variant
The closing CTA in ProcessSection uses class `cta-breathe-glow` on a `<Link>` element (line 128). This should match CrossOver's `cta-commitment cta-breathe-glow` pattern for visual consistency across the two primary CTAs on the page.

### VowMoment — Missing Film Grain Layer
VowMoment uses `section-grain` class on the section element but does NOT have an explicit grain div overlay like every other dark section. If `section-grain` applies grain via CSS pseudo-element, this is fine. But other sections all use explicit `<div className="grain opacity-[0.08]">`. Need to verify consistency.

### Global — Section Fade Height Consistency
Some section fades use the default `section-fade-top` / `section-fade-bottom` CSS class height, while some set inline backgrounds. The height of these fade overlays should be verified as consistent (typically 120-160px) so transitions feel uniform.

---

## The 7-Step Plan

### Step 1: TheSound — Robust Reduced-Motion for MiniWaveform
Pass the `reducedMotion` state from TheSound down to MiniWaveform as a prop. When true, disable the sound-wave animations directly in the component rather than relying on CSS attribute selectors.

**File:** `src/components/TheSound.tsx`

### Step 2: TheTransformation — Touch-Safe Hover Opacity
Wrap the `onMouseEnter`/`onMouseLeave` handlers in a `@media (hover: hover)` check. Use a ref or state to detect if the device supports hover. On non-hover devices, items remain at their base opacity without the hover interaction. This prevents touch-device sticking.

**File:** `src/components/TheTransformation.tsx`

### Step 3: NowPlayingBar — Explicit Transition Timing
Add explicit `transition: transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 260ms ease` to the `.now-playing-bar` CSS class to match the site's navigation timing standard.

**File:** `src/index.css`

### Step 4: CrossOver — Normalize Spacing Rhythm
Adjust the spacing between CTA stack, trust text, golden thread, and commitment statement to create an even visual cadence: CTA (`mb-6`) -> trust text (`mb-10`) -> golden thread (`mb-8`) -> commitment.

**File:** `src/components/CrossOver.tsx`

### Step 5: ProcessSection — Match CTA Class Pattern
Add `cta-commitment` class to the ProcessSection closing CTA to match CrossOver's dual-class pattern, ensuring visual consistency between the two primary page CTAs.

**File:** `src/components/process/ProcessSection.tsx`

### Step 6: VowMoment — Verify/Add Explicit Grain Overlay
Check if `section-grain` class applies grain via pseudo-element. If not, add an explicit grain div matching other dark sections' pattern.

**File:** `src/components/VowMoment.tsx` (if needed)

### Step 7: CSS — Verify Section Fade Heights
Audit the `section-fade-top` and `section-fade-bottom` class heights in CSS. Ensure they provide 120-160px of gradient space for all section transitions.

**File:** `src/index.css` (verification, fix if needed)

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `TheSound.tsx` | Pass reducedMotion prop to MiniWaveform |
| 2 | `TheTransformation.tsx` | Touch-safe hover with media query check |
| 3 | `src/index.css` | NowPlayingBar transition timing |
| 4 | `CrossOver.tsx` | Normalize spacing rhythm |
| 5 | `ProcessSection.tsx` | Add cta-commitment class |
| 6 | `VowMoment.tsx` | Verify/add grain overlay |
| 7 | `src/index.css` | Verify section fade heights |

No copy changes. No pricing changes. No new dependencies. Edge-case hardening and interaction reliability.

