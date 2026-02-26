
# Homepage Final Craft Pass — Performance, Usability, and Visual Cohesion

## Critical Issue Discovered

**The non-chosen ThreePaths card buttons are invisible.** The `ghost-dark` variant uses `text-ink-inverse border border-ink-inverse`, which in the default dark theme resolves to `--rich-black` (dark text on dark background). This is a usability-breaking bug — visitors cannot see two of three pricing CTAs.

## Additional Issues

1. **Performance: 3.3 seconds of style recalculation** across 3,147 recalcs. FCP is 4.1s. The proliferation of `will-change` properties across dozens of elements forces the browser to create GPU layers unnecessarily, consuming memory and triggering excessive composite operations. Many `will-change` declarations are on elements that only animate once (scroll-reveals).

2. **`will-change` overuse** — Elements with scroll-triggered `transition-all` that fire once should not have persistent `will-change`. Only continuously animated elements (breathing, Ken Burns, pulses) should retain it.

3. **TheWitnesses section heading is left-aligned** but the section label and golden rule are centered — a typography alignment inconsistency. The header block has `text-center` on the container but the testimonial `blockquote` uses left alignment via the card's `pl-8`. This creates a jarring center-to-left shift.

4. **Footer social icon separators are plain text dots** (`·`) while the rest of the site now uses breathing golden diamonds. Inconsistent separator vocabulary.

5. **TheTransformation section lacks `loading="lazy"` with proper `fetchpriority`** — The two background images load eagerly, competing with above-fold resources.

6. **Vow Moment backdrop image is NOT lazy-loaded** — It uses a bare `<img>` with `loading="lazy"` but sits directly in the DOM as a full-screen element. Should be wrapped in an overflow-hidden container for Ken Burns future-proofing and have consistent treatment with other sections.

7. **Reassurance text in ThreePaths is left-aligned** (`text-left` implied) but should be centered to match the section's centered layout.

---

## The 7-Step Transformation

### Step 1: Fix Invisible ThreePaths Buttons (Critical)

The non-chosen card buttons use `variant="ghost-dark"` which resolves to invisible dark-on-dark colors. Fix by using `variant="outline"` with explicit styling overrides for the dark card context.

**Changes in `ThreePaths.tsx`:**
- Change non-chosen button from `variant="ghost-dark"` to `variant="outline"` with an explicit className override: `text-foreground/80 border-foreground/20 hover:bg-foreground/10 hover:text-foreground hover:border-foreground/30`
- This ensures visible white text and white border on the dark card background, with proper hover states

### Step 2: Performance — Remove Unnecessary `will-change`

The 3.3s style recalculation is caused by excessive GPU layer promotion. Remove `will-change` from elements that animate only once (scroll-reveals) and keep it only on continuously animated elements.

**Changes in `src/index.css`:**
- Remove `will-change: transform` from `.three-paths-card` (only transforms once on scroll)
- Remove `will-change: opacity` from scroll-reveal divs in TheExhale, TheWitnesses
- Keep `will-change: transform` only on Ken Burns images, breathing animations, and the CTA glow pulse
- Add `contain: layout style` to section containers to reduce style recalculation scope

**Changes in component files (TheExhale.tsx, TheWitnesses.tsx, Footer.tsx):**
- Remove inline `will-change` styles from one-time transition elements
- Keep `will-change` only on elements with `animation:` (continuous)

### Step 3: TheWitnesses Typography Alignment Fix

Fix the jarring center-to-left alignment shift between the section header and testimonial content.

**Changes in `TheWitnesses.tsx`:**
- Center-align the testimonials by removing `pl-8` from testimonial cards and setting `text-center` on the blockquote
- Move the attribution text to center alignment
- Change the `border-left` frosted glass treatment to a `border-top` or remove it entirely (the frosted glass background, inset shadow, and hover glow are sufficient visual differentiation)
- Update `witnesses-testimonial-card` in `src/index.css` to use `border-left: none` and add a subtle `border-top: 1px solid hsl(var(--vow-yellow) / 0.15)` instead

### Step 4: Footer Social Icon Diamond Separators

Replace plain text dot separators between social icons with the standardized breathing golden diamonds.

**Changes in `Footer.tsx`:**
- Replace `<span className="text-foreground/20 text-xs select-none" aria-hidden="true">·</span>` with `<span className="witness-kit-diamond inline-block w-[3px] h-[3px] rotate-45" style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }} aria-hidden="true" />`
- Slightly smaller (3px) than the credential diamonds (4px) to maintain hierarchical proportion

### Step 5: VowMoment Image Containment

Wrap the VowMoment backdrop image in an overflow-hidden container for Ken Burns future-proofing and visual consistency with other sections.

**Changes in `VowMoment.tsx`:**
- Wrap the `<img>` in a `<div className="absolute inset-0 overflow-hidden">` container
- Add Ken Burns animation to the image: `animation: 'vow-ken-burns 30s ease-in-out infinite alternate'`
- Add `filter: 'saturate(0.7) contrast(1.08)'` for cinematic consistency with other sections

**Changes in `src/index.css`:**
- Add `@keyframes vow-ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.03); } }`
- Add to `prefers-reduced-motion` query

### Step 6: ThreePaths Reassurance Text Centering

Fix the left-aligned reassurance text to match the section's centered layout.

**Changes in `ThreePaths.tsx`:**
- The reassurance paragraph already has `text-center` class, but verify it renders centered
- Add `max-w-2xl mx-auto` to constrain width for better readability on wide screens

### Step 7: CSS Containment and Final Audit

Add CSS containment to reduce style recalculation scope, and perform final consistency audit.

**Changes in `src/index.css`:**
- Add `contain: layout style paint` to major section selectors (`.section--dark`, `.section--surface`, `.exhale-section`) to limit recalculation scope
- Remove any duplicate `transition-all` declarations that may be overridden by more specific transitions
- Verify all continuous animations have `will-change` and all one-shot transitions do not
- Verify `prefers-reduced-motion` covers all remaining keyframe animations

---

## Summary of Files Modified

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `ThreePaths.tsx` | Fix invisible non-chosen CTA buttons |
| 2 | `src/index.css`, multiple `.tsx` | Remove unnecessary `will-change` |
| 3 | `TheWitnesses.tsx`, `src/index.css` | Center-align testimonials, fix border direction |
| 4 | `Footer.tsx` | Diamond separators for social icons |
| 5 | `VowMoment.tsx`, `src/index.css` | Image containment + Ken Burns |
| 6 | `ThreePaths.tsx` | Reassurance text centering |
| 7 | `src/index.css` | CSS containment + performance audit |

No content changes. No new dependencies. Copy remains identical. Focus on usability fix, performance optimization, and visual consistency.
