

# Plan: Step 2 — Footer & Arrival Precision Pass

## Current State Assessment

After thorough audit of `Footer.tsx`, `MinimalHeader.tsx`, and `index.css`, the system is architecturally complete. All features specified in the directive are implemented:

- 5 atmospheric layers (grain, vignette, dual-origin fog, breathing vignette)
- Golden thread hierarchy (80px top, full-width separator, 32px mini echo)
- Three Tempos polyrhythm (2s semicolon, 3s golden dot, 8s footer-breathe)
- Key depression hover + spotlight dimming on nav links
- Arrival-aware state (fog intensification, thread brightening, dot glow escalation, CTA breathing)
- Staggered recessional reveal (0→150→300→400→500→650ms)
- All accessibility hardening (focus rings, aria-labels, sr-only narrative, semantic landmarks, external link attrs)
- Fitzgerald spacing throughout

**What remains are precision micro-refinements** — the gap between "implemented correctly" and "Fantasy.co ships this."

---

## Refinements to Implement

### 1. Footer: `footer-breathe` animation timing correction

The spec calls for a **4s** material breathing cycle on golden threads. Current CSS has `footer-breathe` at **8s**. The header's `header-candle-pulse` is at 4s. For synchronized breathing during arrival, the footer thread should match.

**File:** `src/index.css`
- Change `footer-breathe` from `8s` → `4s` so header vine thread and footer golden threads pulse in phase during arrival

### 2. Footer: Arrival-state thread opacity sync

The header vine thread during arrival uses opacity values `0.25/0.3/0.25`. The footer's top golden thread uses `0.4` during arrival — this is too bright relative to the header's thread. For the "breathing frame" effect, they should match.

**File:** `src/components/Footer.tsx`
- Top golden thread arrival opacity: `0.4` → `0.3` (matching header center stop)
- Top golden thread box-shadow arrival: `12px` → `8px` (matching header drop-shadow scale)

### 3. Footer: `footer-breathe` opacity range refinement

Current breathe range is `0.3 → 0.6` — too dramatic for a subtle atmospheric pulse. Should be tighter:

**File:** `src/index.css`
- `footer-breathe` keyframe: `0.3/0.6` → `0.6/0.85` (subtle pulse, not a flicker)

### 4. Footer: CTA arrival glow uses `transform: scale` — violating "opacity and transform only" but scale on a decorative div is acceptable. However the `footer-cta-arrival-glow` keyframe scales a 200px circle which can cause sub-pixel rendering artifacts. Fix:

**File:** `src/index.css`
- Remove `transform: scale(1.05)` from `footer-cta-arrival-glow` — use opacity-only: `0.04 → 0.09`

### 5. Header: Arrival vine thread should sync with `footer-breathe`

Currently the header vine SVG gets class `footer-breathe` during arrival — but `footer-breathe` animates `opacity` on a div, not on an SVG. SVG stroke opacity works differently. The SVG already transitions its gradient stops via inline style, so the `footer-breathe` class on the SVG may cause a competing opacity animation.

**File:** `src/components/MinimalHeader.tsx`
- Remove `footer-breathe` class from the vine SVG during arrival (the inline gradient stop values already handle the brightening)
- Instead, add a subtle `header-vine-breathe` animation that animates `filter: drop-shadow` intensity on a 4s cycle — synced with `header-candle-pulse`

**File:** `src/index.css`
- Add new keyframe:
```css
@keyframes header-vine-breathe {
  0%, 100% { filter: drop-shadow(0 0 4px hsl(45 100% 76% / 0.06)); }
  50% { filter: drop-shadow(0 0 6px hsl(45 100% 76% / 0.1)); }
}
.header-vine-breathe {
  animation: header-vine-breathe 4s ease-in-out infinite;
}
```

### 6. Footer: Navigation link focus-visible rings missing

The `NavLink` components in the Navigate column use the custom `NavLink` component but pass className directly. Need to verify focus rings are applied. Currently the className includes `story-link` but no explicit `focus-visible` ring.

**File:** `src/components/Footer.tsx`
- Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm` to the Navigate NavLink elements

### 7. Footer: Legal link focus-ring-offset color

Legal links have `focus-visible:ring-2 focus-visible:ring-primary/70` but are missing `focus-visible:ring-offset-2 focus-visible:ring-offset-background` for the offset shadow that provides visual clarity on dark backgrounds.

**File:** `src/components/Footer.tsx`
- Add `focus-visible:ring-offset-2 focus-visible:ring-offset-background` to all 4 legal NavLinks

### 8. Reduced motion fallback for `header-vine-breathe`

**File:** `src/index.css`
- Add to the existing `prefers-reduced-motion` block:
```css
.header-vine-breathe { animation: none; }
```

---

## Files Modified

1. **`src/components/Footer.tsx`** — thread opacity sync, nav link focus rings, legal link focus ring offsets
2. **`src/components/MinimalHeader.tsx`** — replace `footer-breathe` on vine SVG with `header-vine-breathe`
3. **`src/index.css`** — `footer-breathe` timing 8s→4s, opacity range 0.3/0.6→0.6/0.85, CTA glow scale removal, new `header-vine-breathe` keyframe, reduced motion fallback

## What Does NOT Change

- All other components, pages, copy, layout, imagery
- The arrival IntersectionObserver logic
- The staggered reveal timing
- The polyrhythm structure (2s/3s/4s)
- The atmospheric layer stack

