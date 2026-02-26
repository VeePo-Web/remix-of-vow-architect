
# Hero Section Transformation — 7-Step Plan to World-Class Quality

## Current State Critique

The hero section has strong bones — the Vigil Sequence concept (void to flame to reveal) is narratively powerful and aligns with the brand's Death-to-Life arc. However, several elements fall short of Fantasy.co quality:

1. **The hero image is a generic piano close-up** — it says "music" but not "wedding" or "sacred moment." A bride preparing, hands being held, or a ceremony in golden light would immediately connect with couples planning their wedding.
2. **The tagline sits alone without context** — "'Til Death; Unto Life." is powerful but couples landing here don't yet know what Parker does. There's no subtitle, no positioning line, no whisper of "wedding pianist."
3. **The header shows "SOUND DIRECTOR"** on the Gateway but the weddings hero has zero role identification — visitors who skip the Gateway arrive with no context.
4. **The scroll cue appears at 9 seconds** — far too late. Most visitors will have bounced or scrolled already. The delay should be reduced for return visits.
5. **The hero image is heavily darkened** (brightness 0.65, overlay 65-85% opacity) — so much that it reads as nearly black. The emotional impact of the image is lost.
6. **No subtle positioning text** — no "Wedding Pianist" label, no sub-line like "I let my music sound like what your hearts feel like."
7. **Mobile: tagline is cramped** against the bottom edge with minimal breathing room.

---

## The 7-Step Transformation

### Step 1: Generate a Cinematic Wedding Hero Image

**What:** Replace the generic piano close-up (`hero-piano.jpg`) with an AI-generated cinematic image that captures the sacred threshold moment — a couple's hands touching at a ceremony, bathed in warm golden light, with a piano subtly visible in the background. Shallow depth of field, film-grain aesthetic, warm tones.

**Why:** The hero image is the emotional first impression. A piano-only image says "instrument." A wedding-moment image says "I understand your day." Fantasy.co would never use a subject-less close-up as a hero — they use images that tell a story in a single frame.

**Technical:**
- Generate image via AI image generation (Nano banana pro for higher quality)
- Save to `src/assets/hero-wedding.jpg`
- Update `heroImage` import in `Index.tsx`

---

### Step 2: Refine Image Overlay and Atmosphere Layers

**What:** Reduce the heavy darkening so the image actually breathes. Adjust the gradient overlay from 65/85% opacity to 45/70%, raise brightness filter from 0.65 to 0.75, and add a bottom-weighted gradient that protects text readability while letting the top half of the image show more detail.

**Why:** Currently the hero reads as "dark rectangle with faint shapes." The image needs to be visible enough to create emotional context. Fantasy.co heroes let imagery speak — the overlay is there to ensure text contrast, not to hide the photo.

**Technical changes in `Index.tsx` hero section:**
- Layer 2 gradient: change to `linear-gradient(rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.75) 100%)`
- Filter: change to `brightness(0.75) contrast(1.08) saturate(0.9)`
- Layer 3 vignette: reduce from 0.6 to 0.45 opacity

---

### Step 3: Add Positioning Subtitle and Role Label

**What:** Add a whispered role label ("Wedding Pianist") above the tagline and a positioning sub-line below it: "I let my music sound like what your hearts feel like." Both fade in as part of the existing stagger sequence.

**Why:** The tagline is poetic but ambiguous. Couples need to know within 2 seconds: (1) this is a wedding pianist, (2) this person understands the emotional weight of their day. Fantasy.co always pairs poetic headlines with grounding context.

**Technical changes in `HeroTagline.tsx`:**
- Add a role label `<p>` with `text-xs uppercase tracking-[0.22em]` styled as "Wedding Pianist" above the h1, with stagger delay matching vigil sequence
- Add a positioning line below the h1 in `font-sans text-[clamp(14px,2vw,16px)]` with `text-muted-foreground`
- Both elements use the same `opacity-0 animate-fade-in` pattern with appropriate delays

---

### Step 4: Refine Tagline Typography and Spacing

**What:** Increase the tagline's bottom padding from 48px to 64px on desktop, adjust mobile to 32px. Add a subtle golden thread (1px horizontal line) between the tagline and subtitle that draws from left, connecting to the brand's golden thread motif. Fine-tune the semicolon and period glow to be slightly more pronounced.

**Why:** The tagline currently feels pinched against the viewport edge. Luxury brands use generous margins to let content breathe. The golden thread creates visual continuity with the rest of the site's design language.

**Technical changes:**
- Update CSS variable `--hero-space-bottom` from 48px to 64px (desktop), 32px (mobile)
- Add a 48px-wide golden thread `<div>` between tagline and subtitle with `animate-fade-in` and scale-x-0 to scale-x-100 transition
- Increase semicolon `textShadow` spread from 32px to 40px

---

### Step 5: Optimize Vigil Sequence Timing for Return Visits

**What:** The scroll cue currently waits 9 seconds. For return visitors (`sessionStorage vigil-complete`), reduce to 800ms. For first-time visitors, reduce from 9s to 7.5s. Also ensure the MinimalScrollCue uses the `hasPlayed` check.

**Why:** 9 seconds before any scroll affordance is too long — analytics would show high bounce rates. Fantasy.co respects user patience: the first visit earns a dramatic reveal, but subsequent visits get immediate access.

**Technical changes in `MinimalScrollCue.tsx`:**
- Check `sessionStorage.getItem('vigil-complete')` to determine delay
- First visit: reduce `showTimer` from 9000ms to 7500ms
- Return visit: reduce to 800ms
- This matches the pattern already used in `HeroTagline.tsx` and `MinimalHeader.tsx`

---

### Step 6: Mobile Responsiveness Polish

**What:** On mobile (< 768px), the tagline should be slightly smaller (clamp floor at 28px instead of 32px), the role label and subtitle should stack cleanly, and the bottom spacing should use the full safe area. The scroll cue chevron should be centered on mobile rather than bottom-right.

**Why:** Mobile is where most couples browse (often in bed, on the couch, showing their partner). The current mobile layout is functional but not refined — text is large for the viewport and the scroll cue is easy to miss in the corner.

**Technical changes:**
- `HeroTagline.tsx`: Adjust clamp to `clamp(28px, 4.5vw, 56px)` for slightly better mobile scaling
- Add `pb-safe` or equivalent safe-area-inset padding for notched devices
- `MinimalScrollCue.tsx`: On mobile, center the scroll cue horizontally instead of bottom-right (use `md:right-[...]` for desktop, `left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0` for mobile)

---

### Step 7: Performance Audit and Final Polish

**What:** Run a performance profile on the hero section to ensure all animations hit 60fps. Verify that the hero image is lazy-loaded correctly (it's above the fold so it should be eagerly loaded with `fetchpriority="high"`). Check that the film grain CSS animation doesn't cause unnecessary repaints. Ensure all layers use `will-change: transform` or `will-change: opacity` appropriately to promote to compositor layers.

**Why:** Fantasy.co sites feel like silk because they never drop frames. A janky hero animation undermines all the design work. Performance is a design decision.

**Technical changes:**
- Add `will-change: opacity` to vigil transition layers
- Ensure hero image uses `<img>` with `fetchpriority="high"` instead of CSS `background-image` for better LCP scores (or keep background-image but add a hidden `<link rel="preload">` for the image)
- Audit the `grain` CSS animation — ensure it uses `transform` and `opacity` only (no layout-triggering properties)
- Test on mobile viewport with performance profiler
- Verify reduced-motion fallbacks work correctly (all animations → opacity-only 120ms)

---

## Summary of Files Modified

| Step | File(s) | Type of Change |
|------|---------|---------------|
| 1 | `src/assets/hero-wedding.jpg`, `src/pages/Index.tsx` | New image asset, import update |
| 2 | `src/pages/Index.tsx` | Overlay opacity and filter values |
| 3 | `src/components/HeroTagline.tsx` | Add role label and subtitle elements |
| 4 | `src/components/HeroTagline.tsx`, `src/index.css` | Spacing, golden thread, glow refinement |
| 5 | `src/components/MinimalScrollCue.tsx` | Timing optimization for return visits |
| 6 | `src/components/HeroTagline.tsx`, `src/components/MinimalScrollCue.tsx` | Mobile layout refinements |
| 7 | `src/pages/Index.tsx`, `src/index.css` | Performance optimizations |

All 7 steps build upon each other sequentially. No design system changes, no layout restructuring — only elevation of what exists.
