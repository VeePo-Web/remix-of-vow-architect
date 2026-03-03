

# Plan: Bespoke Navigation Bar — The Sacred Sound

## What This Is

A comprehensive implementation plan for a world-class, bespoke navigation bar that feels like a wedding ceremony arch — dark, warm, organic, and unmistakably tied to the brand. The nav bar already has strong bones (arrival easter egg, vow-yellow underlines, staggered reveals). This plan elevates the visual design to feel like a sacred, decorated threshold — evoking the twisted wood arches, candlelit aisles, and intimate ceremony venues that define Parker's world — while preserving every existing behavior.

---

## Current State (What Exists)

**MinimalHeader.tsx** — A fixed header with:
- Logo "Parker Gawryletz" (left) + "Menu" button (right) on initial load
- After scrolling past 1vh: nav links appear (Pricing, About, Proof, Hold My Date) with 80ms staggered fade-ins
- 56px height with `backdrop-blur-md` and `rgba(10,10,12,0.92)` background
- 1px golden gradient thread at bottom border
- **Arrival state**: when footer bookend enters viewport, nav links dissolve, logo centers, vow-yellow underline draws, golden thread brightens

**FullScreenMenu.tsx** — A full-screen overlay (7 numbered items, atmospheric layers, spotlight hover dimming)

**Footer.tsx** — Covenant bookend with `[data-footer-bookend]` trigger, breathing golden threads, semicolon heartbeat

---

## The Vision: "The Arch"

The nav bar becomes a **ceremony arch** — not through literal wood illustrations, but through:

1. **Organic edge treatments** — Instead of a flat rectangle, the scrolled header gets subtle organic edges: a very gentle curved bottom border (SVG clip-path or border-radius) that evokes the top of a wedding arch. Think: a 2-4px curve, not a cartoon arch.

2. **Twisted vine thread** — The golden thread at the bottom transforms from a straight line into a subtly undulating SVG path that suggests twisted vine/wood grain. Still 1px, still gold gradient, but with organic micro-curves.

3. **Warm atmospheric depth** — The header background shifts from flat `rgba(10,10,12,0.92)` to a layered composition: base dark + subtle warm radial gradient from center (like candlelight hitting a wooden arch from below) + film grain at 3-4% opacity.

4. **Candle-warmth glow** — A very subtle warm pool of light behind the logo text, like a candle burning at the altar. Radial gradient, `hsl(var(--vow-yellow) / 0.03)`, 120px radius, centered on the logo.

5. **Key depression hover** — Nav links get a 1px `translateY` on hover (like pressing a piano key), with the vow-yellow underline drawing beneath simultaneously.

---

## Implementation Plan

### Phase 1: Header Atmospheric Depth (Footer.tsx untouched)

**File: `MinimalHeader.tsx`**

Changes when `isScrolled` is true:
- Replace flat `rgba(10,10,12,0.92)` background with layered composition:
  - Base: `rgba(10,10,12,0.94)` 
  - Add a `::before` atmospheric layer (via a child div): radial gradient from center bottom (`hsl(var(--vow-yellow) / 0.025)` → transparent at 60%), creating warm candlelight glow
  - Add grain overlay div at 3% opacity (reusing existing `.grain` class)
- Add subtle vignette: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)` overlay

**File: `src/index.css`**

Add new keyframe and class:
```css
@keyframes header-candle-pulse {
  0%, 100% { opacity: 0.025; }
  50% { opacity: 0.04; }
}
.header-candle {
  animation: header-candle-pulse 4s ease-in-out infinite;
}
```

### Phase 2: Organic Edge — The Arch Silhouette

**File: `MinimalHeader.tsx`**

Replace the flat 1px golden thread bottom border with an SVG-based organic curve:
- A `<svg>` element positioned at the bottom of the header, `width="100%" height="6"`
- Path: a very gentle sine-wave curve (2-3px amplitude) filled with the golden gradient
- This creates the impression of a natural, hand-carved arch edge — organic, not geometric
- The SVG uses `preserveAspectRatio="none"` to stretch across viewport widths
- During arrival, the curve's stroke opacity increases from 0.12 to 0.25 (matching current behavior)

### Phase 3: Twisted Vine Thread Enhancement

**File: `MinimalHeader.tsx`**

The golden thread SVG path gets micro-undulations suggesting twisted vine/wood:
- Path defined as a gentle wavelet: `M0,3 Q25,1 50,3 T100,3` scaled across width
- Stroke: `linear-gradient` via SVG `<linearGradient>` (transparent → vow-yellow/0.15 → transparent)
- `stroke-width: 1`, no fill
- During `footer-breathe` animation, the opacity pulses on the same 8s cycle as the footer's golden thread

### Phase 4: Nav Link "Key Depression" Hover

**File: `MinimalHeader.tsx`**

Each nav link gets enhanced hover behavior:
- On hover: `translateY(1px)` + vow-yellow underline draws from center (450ms, sacred easing)
- On press/active: `translateY(2px)` (like a piano key fully depressed)
- Non-hovered links in the row dim to 60% opacity (spotlight pattern, matching footer social icons)
- Duration: 180ms, standard easing

### Phase 5: Logo Candle Warmth

**File: `MinimalHeader.tsx`**

Behind the "Parker Gawryletz" logo text:
- A decorative div with `radial-gradient(circle, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)`, width 120px, centered behind logo
- During arrival: glow intensifies to `0.05` with the `header-candle-pulse` animation
- `pointer-events-none`, `aria-hidden="true"`

### Phase 6: Arrival Enhancement — The Arch Completes

When `isArrival` triggers:
- The organic curve SVG brightens (opacity 0.25)
- The candlelight glow behind the logo intensifies
- The curve and the footer's top golden thread breathe on the same 8s `footer-breathe` cycle
- The header feels like it "settles" — like the top of an arch finding its keystone in the footer below

### Phase 7: Full-Screen Menu Atmospheric Enhancement

**File: `FullScreenMenu.tsx`**

Subtle enhancements to match the arch theme:
- Add a warm candlelight gradient pooling from the left side (where the menu items are) — `hsl(var(--vow-yellow) / 0.015)` at 30% x-position
- The close button area gets the same subtle grain and vignette as the header
- The golden thread separator after the menu items gets the same organic micro-curve as the header's bottom edge

### Phase 8: Mobile Considerations

- On mobile (< 768px), the organic curve simplifies to a straight line with rounded ends (performance)
- The candlelight glow scales down proportionally
- Key depression hover does not apply (touch device)
- The arch aesthetic comes through primarily via the warm atmospheric layers and grain

---

## Files Modified

1. `src/components/MinimalHeader.tsx` — atmospheric layers, organic SVG edge, key depression hover, logo warmth, arrival enhancements
2. `src/components/FullScreenMenu.tsx` — atmospheric warmth alignment, organic thread
3. `src/index.css` — `header-candle-pulse` keyframe, organic-edge utility classes, key-depression hover utilities

---

## What We Do NOT Change

- Footer (already has its own plan in `.lovable/plan.md`)
- CrossOver, MobileStickyBar (beyond mobile arrival coordination already specified)
- Page layouts, section order, typography system, spacing scale, colors, imagery
- The arrival easter egg logic (IntersectionObserver, isArrival boolean) — only its visual expression is enhanced
- Any other component on the site

---

## Anti-Patterns

- No literal wood textures, images, or illustrations in the header
- No rounded corners larger than the organic SVG curve (2-4px amplitude)
- No heavy SVG filters or blur effects (performance)
- No additional HTTP requests (all CSS/inline SVG)
- No animation on `width`, `height`, `top`, `left` — only `opacity` and `transform`
- The arch feeling comes from atmosphere and organic edges, never from decoration

