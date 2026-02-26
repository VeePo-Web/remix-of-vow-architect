

# Homepage Round 12 — Cinematic Continuity and Material Perfection

After 11 rounds, each section individually achieves high quality. This final round addresses cross-section continuity, remaining interaction gaps, and the handful of material inconsistencies that prevent the experience from feeling like one unbroken cinematic sequence.

---

## Audit Findings

### TheInvitation
- The section label "The Invitation" has no `transitionDelay`, appearing before the portrait and content columns. At Fantasy-level choreography, the label should appear first (0ms) but the current lack of explicit delay is correct by accident — no fix needed.
- The "Read my story" DirectionalLink at `600ms` appears before the credentials at `750ms` — correct narrative ordering. Solid.
- **Issue**: The section lacks a bottom fade into TheSound's dark environment. Currently TheSound has a top fade FROM TheInvitation's warm, but TheInvitation itself has no `section-fade-bottom` — creating a hard color cut on the Invitation side.

### TheSound
- The closing quote at line 487 uses `text-foreground/70` — this was elevated from `text-muted-foreground` in Round 9, but on the dark background it could still benefit from `text-foreground/80` for the quote text itself (the attribution can stay dimmer).
- **Issue**: The NowPlayingBar component (sticky mini-bar when scrolling away) has no reduced-motion consideration — its progress bar animates continuously. Should respect `prefers-reduced-motion`.
- The `sound-wave` keyframe animations for the mini waveform bars use inline animation names (`sound-wave-0`, `sound-wave-1`, etc.) that need to be verified in CSS.

### TheTransformation
- The opacity gradient implementation (0.70 tapering to 0.55 for fears, 0.80 tapering to 0.65 for resolutions) works but the `hover:opacity-100` class competes with the inline `opacity` style. Inline styles always win over classes, so the hover state will not actually reach full opacity. This is a **functional bug**.
- The left panel heading uses `duration-[900ms]` (fixed in Round 10) — confirmed correct.

### TheWitness
- The closing thought "Now — choose how deeply you want me there" is a strong narrative bridge to ThreePaths. However, it lacks the em-dash typographic treatment used elsewhere (currently a plain hyphen surrounded by spaces). Should use `\u2014` for consistency.
- **Issue**: The testimonial cards in the section below (TheWitnesses) have `relative` positioning for the absolute quotation marks, but the card container does not — meaning the quotes position relative to the nearest positioned ancestor, which may not be the card itself on all layouts.

### ThreePaths
- Film grain overlay added in Round 11 is inside the card but uses `rounded-lg` — if the card has `overflow-hidden` the grain will clip correctly, but if not, grain may bleed outside rounded corners. Need to verify.
- The card `transition` property is set via the class `three-paths-card` in CSS but the inline `transitionDelay` may conflict. Need to verify no double-transition.

### TheWitnesses
- The absolute-positioned quotation marks (`-top-6`) work when the card has `relative` positioning. The card has class `witnesses-testimonial-card relative` — confirmed correct.
- The closing golden thread at `1200ms` delay is very late — if the section trigger fires at 20% viewport intersection, the thread may not animate until the user has already scrolled past. Consider reducing to `900ms`.

### CrossOver
- The film grain overlay was inserted between the CTA stack and the trust text (line 132-133), which places it inside the `container` div rather than as a section-level overlay. This means it only covers the content area, not the full section. It should be moved to be a direct child of the `section` element.
- The "24 hours" text uses `text-xl` which creates a slight vertical alignment jump within the italic sentence. Using `text-lg` with `font-semibold` instead would maintain emphasis without the size discontinuity.

---

## The 7-Step Plan

### Step 1: TheInvitation — Add Bottom Fade
Add a `section-fade-bottom` div at the end of TheInvitation, matching TheSound's color (`hsl(220 15% 8%)`), creating a seamless warm-to-dark gradient transition.

**File:** `src/components/TheInvitation.tsx`

### Step 2: TheTransformation — Fix Hover Opacity Bug
The inline `opacity` style overrides the `hover:opacity-100` Tailwind class. Fix by removing the inline opacity and instead using a CSS custom property with a hover override, or by applying the base opacity as a Tailwind arbitrary value that can be overridden by the hover state. The cleanest approach: wrap each item's opacity in a `style` that sets `opacity` only when not hovered, using `group-hover` on a parent.

**File:** `src/components/TheTransformation.tsx`

### Step 3: TheSound — Closing Quote Typography
Increase the closing blockquote text from `text-foreground/70` to `text-foreground/80` for better readability on the dark background. The attribution line remains at the current dimmer level.

**File:** `src/components/TheSound.tsx`

### Step 4: TheWitness — Em-dash Typography Fix
Replace the plain dash in "Now — choose how deeply you want me there" with a proper em-dash character (`\u2014`) for typographic consistency with the rest of the site.

**File:** `src/components/TheWitness.tsx`

### Step 5: TheWitnesses — Reduce Closing Thread Delay
Reduce the closing golden thread `transitionDelay` from `1200ms` to `900ms` so it animates while still in view for most scroll speeds.

**File:** `src/components/TheWitnesses.tsx`

### Step 6: CrossOver — Relocate Film Grain Overlay
Move the film grain overlay from inside the container div (line 132-133) to be a direct child of the `section` element, ensuring full-bleed coverage matching every other dark section's grain placement.

**File:** `src/components/CrossOver.tsx`

### Step 7: CrossOver — Normalize "24 hours" Emphasis
Change `text-xl` to `text-lg font-semibold` on the "24 hours" span to maintain emphasis without creating a vertical size jump within the italic sentence.

**File:** `src/components/CrossOver.tsx`

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `TheInvitation.tsx` | Add bottom fade gradient |
| 2 | `TheTransformation.tsx` | Fix hover opacity override bug |
| 3 | `TheSound.tsx` | Closing quote text visibility |
| 4 | `TheWitness.tsx` | Em-dash typography fix |
| 5 | `TheWitnesses.tsx` | Reduce closing thread delay |
| 6 | `CrossOver.tsx` | Relocate film grain to section level |
| 7 | `CrossOver.tsx` | Normalize "24 hours" text size |

No copy changes. No pricing changes. No new dependencies. Bug fix (Step 2) plus continuity and material refinements.

