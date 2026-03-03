

# Step 5: Pixel-Perfect Foreground and Background Depth

This step refines the atmospheric layer stack and foreground element rendering to achieve true cinematic depth — where every layer sits at a precise z-position and the content floats above the noise floor with material authority.

---

## 5a. Background Image Filter — Cinematic Grade

**Current:** `filter: 'saturate(0.5) contrast(1.1)'` on the Ken Burns background image at `opacity-[0.12]`.

**Issue:** The brand standard for background images calls for `brightness(0.75) contrast(1.08) saturate(0.9)`. The current filter desaturates too aggressively (0.5 vs 0.9) and uses slightly higher contrast (1.1 vs 1.08). At 12% opacity the difference is subtle, but the over-desaturation strips warmth from the dance image, making the section feel colder than intended. The crossing should feel like the final warm moment before the footer void.

**Fix:** Change filter to `brightness(0.75) contrast(1.08) saturate(0.9)` — matching the brand standard. This restores trace warmth to the background without competing with content.

---

## 5b. Background Image Opacity — Brand Standard Range

**Current:** `opacity-[0.12]` (12%).

**Issue:** The brand standard permits 6-15% for background images. 12% is within range, but for this section — which is the emotional crescendo with a prominent CTA — the background should recede slightly more to maximize content dominance. Reduce to `opacity-[0.10]` (10%). This keeps atmospheric presence while ensuring the headline and CTA float more clearly above the noise.

**Fix:** Change `opacity-[0.12]` to `opacity-[0.10]`.

---

## 5c. Vignette Intensity — Tighten Edge Darkening

**Current:** `radial-gradient(ellipse at center, transparent 0%, hsl(240 9% 2% / 0.6) 100%)`.

**Issue:** The vignette at 0.6 opacity is moderate. For a section where the content is centered in a narrow `max-w-3xl` column, the vignette should be stronger to create a natural spotlight effect — darkening the periphery and drawing the eye inward toward the CTA. Increase to 0.75 opacity and tighten the transparent zone from 0% to start fading earlier.

**Fix:** Change to `radial-gradient(ellipse at center, transparent 30%, hsl(240 9% 2% / 0.75) 100%)`. The transparent zone now extends to 30% (keeping the center bright) before fading aggressively to near-black at the edges.

---

## 5d. Warm Fog Layer — Elevate Glow Pool

**Current:** `radial-gradient(ellipse at 50% 40%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 50%)`.

**Issue:** The warm fog sits at 50% 40% — slightly above center. For a section where the CTA button is the focal point (approximately at vertical center), the fog should center on the CTA position. Also, 0.02 opacity is barely perceptible. Increase to 0.03 to create a more visible warm halo behind the button area, reinforcing the "candlelight in a dark room" atmosphere.

**Fix:** Change to `radial-gradient(ellipse at 50% 50%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 50%)`. Centered vertically, slightly stronger warmth.

---

## 5e. Film Grain Opacity — Reduce for Content Clarity

**Current:** `opacity-[0.08]` (8%) on the grain overlay.

**Issue:** The brand standard calls for grain at 10-15% in Death-space sections. However, at 8% the grain is already at the lower end. For a section with small trust-anchor text at 14px and `/50` opacity, any additional grain noise competes with legibility. Keep 8% — this is correct for a content-heavy CTA section. No change needed.

**Fix:** No change.

---

## 5f. Floating Dust Position — Asymmetric Atmosphere

**Current:** `radial-gradient(circle 300px at 30% 40%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 100%)`.

**Issue:** The dust particle is positioned at 30% 40% — upper-left quadrant. This creates subtle asymmetry which is good — it prevents the section from feeling artificially centered. However, the 300px radius is small relative to the section width. Expand to 400px for a more diffuse atmospheric presence, and shift slightly right to 35% 35% to avoid overlapping with the top fade.

**Fix:** Change to `radial-gradient(circle 400px at 35% 35%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 100%)`.

---

## 5g. Content Z-Index Stack — Ensure Proper Layering

**Current:** Content container has `relative z-10`. Atmospheric layers have no explicit z-index (defaulting to stacking order). Fades use `section-fade-top` / `section-fade-bottom` CSS classes.

**Issue:** The z-index stack should be explicit to prevent any atmospheric layer from rendering above content. Currently the layers rely on DOM order, which is correct but fragile. Adding `z-[1]` to all atmospheric overlays ensures they never compete with `z-10` content, even if DOM order changes in future edits.

**Fix:** Add `z-[1]` to the vignette, warm fog, and film grain overlay divs. The background image container stays at default (z-0). The dust particle stays at default. Content remains at `z-10`.

---

## Summary

| # | Element | Change | Rationale |
|---|---------|--------|-----------|
| 5a | Background image filter | `saturate(0.5)` to `saturate(0.9)`, add `brightness(0.75)` | Brand standard compliance, restore warmth |
| 5b | Background image opacity | `0.12` to `0.10` | Increase content dominance |
| 5c | Vignette gradient | Tighten to `transparent 30%`, increase to `0.75` | Spotlight effect on centered content |
| 5d | Warm fog | Center to `50% 50%`, increase to `0.03` | Align glow with CTA position |
| 5e | Film grain | Confirmed `0.08` correct | No change |
| 5f | Dust particle | Expand radius to 400px, shift to `35% 35%` | More diffuse, avoid top-fade overlap |
| 5g | Z-index stack | Add `z-[1]` to vignette, fog, grain | Explicit layering for content safety |

**One file modified** (`CrossOver.tsx`). Five atmospheric refinements, one z-index hardening, one confirmation. Zero new dependencies. Pure depth calibration.

