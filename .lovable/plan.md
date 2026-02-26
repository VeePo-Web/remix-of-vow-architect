

# Homepage Cross-Cutting Polish — The Final Craft Pass

## Assessment

All individual homepage sections have now been elevated through four prior transformation rounds. The hero has its Vigil Sequence, the Process section has frosted glass cards and breathing golden thread, the post-Process sections have CSS-only hovers, frosted testimonials, section fades, and corrected animations. What remains are the **cross-cutting quality gaps** — the connective tissue, micro-interaction consistency, and accessibility details that separate "very good" from "Fantasy.co world-class."

### Issues Identified

1. **MobileStickyBar is unstyled and jarring** -- Returns `null` when not visible (no exit animation), uses generic `Button` with no `primary-dark` variant or `cta-breathe-glow`, has no ambient glow behind CTA, and the `animate-fade-in` entrance is abrupt. The grain overlay div has no `absolute inset-0` positioning so it renders inline.

2. **Footer lacks scroll-reveal animations** -- Every other section on the homepage uses `useScrollReveal` with staggered reveals. The Footer renders all content instantly with no entrance animation, breaking the cinematic rhythm. The dual golden thread separators (one above footer, one inside) create redundancy.

3. **TheInvitation credential separators are plain text dots** -- Uses `<span className="text-vow-gold mx-3">·</span>` instead of the breathing golden diamond system now used in TheWitness kit list. Inconsistent separator treatment across the page.

4. **CrossOver CTA button uses generic `default` variant on non-chosen paths** -- ThreePaths non-chosen cards use `variant="outline"` which appears light on dark backgrounds. Should use `variant="ghost-dark"` or a dark-appropriate style for better contrast.

5. **Missing `prefers-reduced-motion` fallback on TheWitnesses Ken Burns** -- The image uses the generic `ken-burns` keyframe name but the reduced-motion media query only targets specific keyframe names via `[style*="..."]` selectors. This Ken Burns animation will still run for users who prefer reduced motion.

6. **TheExhale golden thread SVG has duplicate filter IDs** -- If two instances of this component ever render (unlikely but defensive), the `id="threadGradient"` and `id="threadGlow"` will conflict. More critically, the SVG path stroke-dasharray animation is not defined — the `exhale-thread-path` class likely has no corresponding CSS animation, meaning the thread appears instantly rather than drawing in.

7. **MinimalHeader nav CTA lacks the golden glow treatment** -- The "Hold My Date" link in the scrolled nav uses `nav-link--cta` class but has no ambient radial glow behind it like the CrossOver CTA does. The header is the persistent conversion touchpoint and deserves the same atmospheric treatment.

---

## The 7-Step Transformation

### Step 1: MobileStickyBar Elevation

Upgrade the mobile sticky bar from generic to atmospheric with proper entrance/exit animations.

**Changes in `MobileStickyBar.tsx`:**
- Replace conditional `return null` with CSS-driven visibility (`translate-y-full` when hidden, `translate-y-0` when visible) so the bar slides in/out smoothly instead of popping
- Add `absolute inset-0` to the grain overlay div so it actually covers the bar
- Change the Button to `variant="primary-dark"` with `cta-breathe-glow` class
- Add ambient radial glow div behind the CTA button matching CrossOver's pattern
- Add `pb-[env(safe-area-inset-bottom)]` padding for notched devices

### Step 2: Footer Scroll-Reveal Animations

Add staggered entrance animations to the Footer using `useScrollReveal`.

**Changes in `Footer.tsx`:**
- Import and use `useScrollReveal` with `threshold: 0.15`
- Add `transition-all duration-700` with conditional `opacity/translate-y` classes to each major block: name/tagline, nav column, contact column, bottom bar, covenant bookend
- Stagger delays: name (0ms), nav (150ms), contact (300ms), bottom bar (450ms), covenant (600ms)
- Remove the redundant first golden thread at the very top of the footer (keep only the one inside the container)
- Add `will-change: opacity` to the closing covenant dot animation

### Step 3: TheInvitation Credential Diamond Separators

Replace plain text dot separators with breathing golden diamonds matching TheWitness kit pattern.

**Changes in `TheInvitation.tsx`:**
- Replace `<span className="text-vow-gold mx-3">·</span>` with the same `witness-kit-diamond` styled `<span>` pattern: `w-[4px] h-[4px] rotate-45` with `background: hsl(var(--vow-yellow) / 0.5)` and `box-shadow: 0 0 6px hsl(var(--vow-yellow) / 0.2)`
- Add the `witness-kit-diamond` class for breathing animation consistency

### Step 4: ThreePaths Non-Chosen Button Variant Fix

Ensure non-chosen path card CTAs have proper dark-background contrast.

**Changes in `ThreePaths.tsx`:**
- Change non-chosen card Button from `variant="outline"` to `variant="ghost-dark"` for better visibility on the dark card background
- Add `cta-breathe-glow` class to the chosen card's CTA button only (the "Most Selected" one)

### Step 5: TheWitnesses Ken Burns Reduced-Motion Fix

Fix the generic `ken-burns` keyframe name so reduced-motion queries target it correctly.

**Changes in `TheWitnesses.tsx`:**
- Rename the animation from `ken-burns` to `witnesses-ken-burns` to match the section-specific naming convention

**Changes in `src/index.css`:**
- Add `@keyframes witnesses-ken-burns` with the standard `scale(1) -> scale(1.04)` pattern
- Add `witnesses-ken-burns` to the `prefers-reduced-motion` media query selector list

### Step 6: TheExhale Thread Draw Animation

Add the missing stroke-dasharray draw animation for the golden thread SVG.

**Changes in `src/index.css`:**
- Add `.exhale-thread-path` styles with `stroke-dasharray` and `stroke-dashoffset` properties
- Add `.exhale-thread-svg--visible .exhale-thread-path` transition that animates `stroke-dashoffset` from full length to 0 over 900ms with `var(--ease-covenant)` easing
- Add `prefers-reduced-motion` fallback that shows the thread at full opacity without draw animation

### Step 7: MinimalHeader CTA Glow and Performance Audit

Add subtle ambient glow to the scrolled-nav CTA and perform final consistency audit.

**Changes in `MinimalHeader.tsx`:**
- Wrap the "Hold My Date" link in a relative container with a subtle radial glow pseudo-element or sibling div (smaller than CrossOver's — just a hint of warmth)

**Performance audit across all files:**
- Verify every Ken Burns animation has a corresponding keyframe and reduced-motion fallback
- Verify all `will-change` properties are present on animated elements
- Verify all hover transitions use `180ms` brand standard duration
- Verify golden diamond separators use the `witness-kit-diamond` class consistently
- Verify no orphaned or duplicate CSS keyframe names

---

## Summary of Files Modified

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `MobileStickyBar.tsx` | Slide animation, CTA elevation, grain fix, safe-area |
| 2 | `Footer.tsx` | Scroll-reveal stagger, remove duplicate thread |
| 3 | `TheInvitation.tsx` | Diamond separators replacing text dots |
| 4 | `ThreePaths.tsx` | Button variant fix for dark background |
| 5 | `TheWitnesses.tsx`, `src/index.css` | Ken Burns rename + reduced-motion fix |
| 6 | `src/index.css` | Exhale thread draw animation |
| 7 | `MinimalHeader.tsx`, all files | CTA glow + final performance audit |

No content changes. No new dependencies. Copy remains identical. Pure micro-interaction, accessibility, and consistency refinement.

