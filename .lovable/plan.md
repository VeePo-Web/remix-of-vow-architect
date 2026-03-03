

# Step 14: Bottom Transition — The Crossing into the Covenant Close

This step creates a cinematic exit transition from The Crossing into the Footer, completing the section's atmospheric containment. The top entry (Step 13) was a 240px descent into darkness. The bottom exit must feel like the final exhale — the moment after the commitment is made, settling into quiet permanence.

---

## The Vision

The current bottom fade is a simple 80px two-stop gradient (`transparent → hsl(240 9% 2%)`). The Footer already has a `footer-fade-bridge` element at its top. The transition between these two sections should feel seamless — as if the visitor is sinking deeper into the same dark room, not crossing a boundary between two components.

---

## 14a. Extended Bottom Fade — 120px, 4-Stop Gradient

**Current:** 80px, simple two-stop gradient.

**Fix:** Extend to 120px with a 4-stop gradient that moves through intermediate dark tones, creating a slower dissolution:

```css
background: linear-gradient(to bottom,
  transparent 0%,
  hsl(240 9% 3% / 0.4) 30%,
  hsl(240 9% 2% / 0.8) 65%,
  hsl(240 9% 2%) 100%
);
height: 120px;
```

This creates a longer tail that dissolves the section's atmospheric layers (grain, glow, motes) more gradually.

---

## 14b. Bottom Golden Thread — Mirroring the Threshold

A second horizontal golden thread at the bottom of the section, mirroring the top threshold (13c). This creates a visual "bookend" — the section is framed between two golden threads, like the margins of an invitation.

**Technique:** Absolutely positioned `div` at the bottom of the content area (above the bottom fade), `width: 60px` (slightly narrower than the top's 80px — the section contracts as it closes), `height: 1px`, centered. Same golden gradient and glow as the top thread, but with a slower breathing animation (6s instead of 4s) — the closing thread breathes more slowly, like a settling heartbeat.

Scale reveal triggered by `isVisible`, matching the top thread's sacred easing.

---

## 14c. Residual Warmth Bleed — Bottom Edge

A subtle radial glow at the bottom edge that "bleeds" downward, creating the illusion that the CTA button's warmth is seeping into the Footer space below.

**Technique:** A radial gradient at `50% 100%` (bottom-center) using `hsl(var(--vow-yellow) / 0.015)` — even more subtle than the top's warm-to-cold layer. This bridges the visual temperature between sections.

---

## 14d. Bottom Vignette Intensification

Darken the bottom 15% of the section more aggressively to create a "floor" effect — the section feels like it has depth, not just a flat gradient edge.

**Technique:** A linear gradient overlay from `transparent` at 85% to `hsl(240 9% 2% / 0.3)` at 100%. This layers beneath the bottom fade to create extra density at the exit point.

---

## Summary

| # | Enhancement | Technique | Impact |
|---|------------|-----------|--------|
| 14a | Extended bottom fade | 120px, 4-stop gradient | Slower, more gradual exit |
| 14b | Bottom golden thread | 60px, mirrored bookend | Section framing, visual closure |
| 14c | Residual warmth bleed | Radial glow at bottom edge | Temperature bridge to Footer |
| 14d | Bottom vignette floor | Linear gradient darkening | Depth at exit point |

**One file modified:** `CrossOver.tsx`. Four refinements. The section is now fully contained — entered through a 240px descent, exited through a 120px dissolution, framed between two breathing golden threads. A sacred room with a ceiling and a floor.

