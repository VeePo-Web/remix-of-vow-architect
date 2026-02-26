

# Round 23 — "Hear Me Play" Listening Room: Scroll-Linked Reveal Choreography + Spatial Refinement

## Critical Audit of Current State (Post-Round 22)

Rounds 20-22 built atmospheric depth (bokeh, cathedral, dust motes), card identity (Repertoire header with golden lid seal), idle breathing glow, category emotional context, graceful "Coming Soon" degradation, refined typography, and blockquote attribution. The section now has material richness and compositional completeness. However, these gaps remain:

### Issue 1: The Entire Section Reveals as a Single Block

Every element — label, headline, subhead, golden thread, card, closing quote — uses `useScrollReveal({ threshold: 0.2 })` with the same `isVisible` boolean. They all appear simultaneously with only `transitionDelay` stagger (0ms, 150ms, 300ms, 380ms, 450ms, 700ms). At Fantasy.co quality, scroll-linked reveals would be individually observed: the heading cluster enters first as a unit, then the golden thread draws downward, then the card surfaces from below with a slight scale, then the closing caption fades in last. Currently, because everything shares one observer, a visitor scrolling slowly sees the entire composition pop in at once when 20% of the section crosses the viewport. The stagger delays help but are not enough — the card and closing quote are often already visible before the delays fire.

### Issue 2: The Card Has No Entry "Surface" Feeling

The card transitions from `opacity-0 translate-y-4` to visible. A 4px upward slide is nearly imperceptible. At Fantasy.co quality, the card would "surface" from the dark — emerging with a subtle scale (0.98 to 1.0) and a slightly larger Y translation (12-16px) to create the feeling of a physical instrument rising from the void. The breathing glow should also fade in after the card has surfaced, not simultaneously.

### Issue 3: Category Groups Lack Staggered Entry

All five category groups (Hymns, Worship, Pop, Classical, Film) appear instantly once the card is visible. At Fantasy.co quality, each category would stagger in with a subtle 80-100ms delay per group, creating a cascading "keys being laid out" effect. This is achievable with CSS `transitionDelay` on each category div.

### Issue 4: The NowPlayingBar Lacks Polish

The NowPlayingBar uses a basic CSS class toggle (`now-playing-bar--visible`) but the implementation in CSS may not exist or may be minimal. The bar should slide up from below the viewport with a 260ms ease-out transition, matching the brand's navigation timing standard. It also lacks a backdrop blur for depth separation.

### Issue 5: The Section Background Ken Burns Animation Has No Pause on Reduced Motion

The Ken Burns animation on the cathedral image checks `reducedMotion` state, but `reducedMotion` is set once on mount and never updated if the user toggles their system preference mid-session. This is a minor accessibility gap but worth addressing.

---

## 5-Step Implementation Plan

### Step 1: Split Scroll Reveal into Two Observation Zones

**File:** `src/components/TheSound.tsx`

Currently, a single `useScrollReveal({ threshold: 0.2 })` drives everything. Split into two separate reveal zones:

- **Zone A (heading cluster):** The existing `sectionRef` with `useScrollReveal({ threshold: 0.15 })` — triggers when just the top portion of the section enters view. This drives: label, headline, subhead, and golden thread.
- **Zone B (card + closing):** A new ref attached to the card container wrapper, using a second `useScrollReveal({ threshold: 0.3 })`. This triggers: the track card surfacing and the closing blockquote.

This means the heading cluster reveals first as the visitor scrolls, then the card reveals separately when the card itself is ~30% in view. The temporal separation creates a two-beat reveal rhythm — invitation first, then instrument.

Add a new ref:
```tsx
const { ref: cardRef, isVisible: cardVisible } = useScrollReveal({ threshold: 0.3 });
```

Attach `cardRef` to a wrapper `<div>` around the card + closing caption. Replace `isVisible` with `cardVisible` for the card container and closing blockquote elements.

### Step 2: Enhance Card Entry with Scale + Deeper Translation

**File:** `src/components/TheSound.tsx`

Change the card container's entry animation from `translate-y-4` (16px via Tailwind's scale) to a custom inline transition:

- **Before visible:** `opacity: 0, transform: translateY(16px) scale(0.98)`
- **After visible:** `opacity: 1, transform: translateY(0) scale(1)`
- **Duration:** 800ms (slower than other elements to create gravitas)
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` (the brand standard)

The breathing glow animation should only start after the card has fully surfaced. Add a 900ms delay before the `sound-card-breathe` animation begins (using `animationDelay`).

Replace the current Tailwind transition classes on the card with inline `style` properties for the entry transform, keeping the existing `boxShadow` and border styles.

### Step 3: Add Category Stagger Cascade

**File:** `src/components/TheSound.tsx`

Each category group gets an incremental `transitionDelay` based on its index when the card becomes visible:

- Category 0 (Hymns): 100ms after card visible
- Category 1 (Worship): 180ms
- Category 2 (Pop): 260ms
- Category 3 (Classical): 340ms
- Category 4 (Film): 420ms

Each category div transitions from `opacity: 0, translateY(6px)` to `opacity: 1, translateY(0)` with 400ms duration. This creates the "keys being laid out one by one" cascade.

Wrap each category's content in a `style` prop:
```tsx
style={{
  opacity: cardVisible ? 1 : 0,
  transform: cardVisible ? "translateY(0)" : "translateY(6px)",
  transition: "opacity 400ms ease, transform 400ms ease",
  transitionDelay: cardVisible ? `${100 + catIdx * 80}ms` : "0ms",
}}
```

### Step 4: Polish NowPlayingBar Transitions

**File:** `src/components/TheSound.tsx`

Refine the NowPlayingBar component:

- Add `backdropFilter: "blur(12px)"` for depth separation from content behind it
- Ensure the bar has a proper background: `background: hsl(var(--rich-black) / 0.92)` for near-opaque dark glass
- Add a subtle top border: `borderTop: 1px solid hsl(var(--vow-yellow) / 0.1)` for definition

**File:** `src/index.css`

Verify the `.now-playing-bar` and `.now-playing-bar--visible` styles exist. If not present, add:
```css
.now-playing-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 40;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 260ms ease;
  pointer-events: none;
}
.now-playing-bar--visible {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
```

### Step 5: Closing Blockquote Delayed Reveal + Reduced Motion Listener

**File:** `src/components/TheSound.tsx`

The closing blockquote should reveal 400ms after the card becomes visible — creating a three-beat sequence: heading cluster (beat 1) -> card surfaces (beat 2) -> closing words appear (beat 3).

Change the closing section's `transitionDelay` from the static `700ms` (relative to section entry) to `500ms` (relative to `cardVisible`). Since it now uses the `cardVisible` trigger, this creates proper temporal separation.

Additionally, upgrade the `reducedMotion` detection to use a `matchMedia` listener so it responds to mid-session preference changes:
```tsx
useEffect(() => {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  setReducedMotion(mql.matches);
  const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}, []);
```

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/components/TheSound.tsx` | Split into two scroll reveal zones (heading vs card) |
| 2 | `src/components/TheSound.tsx` | Card entry scale(0.98) + translateY(16px), delayed glow |
| 3 | `src/components/TheSound.tsx` | Category stagger cascade (80ms per group) |
| 4 | `src/components/TheSound.tsx` | NowPlayingBar backdrop blur + background + border |
| 4 | `src/index.css` | Verify/add `.now-playing-bar` transition styles |
| 5 | `src/components/TheSound.tsx` | Closing blockquote tied to cardVisible, reduced-motion listener |

---

## What This Achieves

- **Three-beat reveal rhythm:** Heading cluster -> Card surfaces -> Closing words. Each beat is independently scroll-triggered, creating the cinematic sequence Fantasy.co demands
- **Physical surfacing:** The card emerges from the dark with scale + translation, feeling like a real instrument being placed before you
- **Category cascade:** Track categories lay themselves out one by one, creating anticipation and visual rhythm
- **NowPlayingBar depth:** Backdrop blur and proper transitions match the brand's navigation polish
- **Accessibility:** Reduced-motion detection now responds to live system changes

## Technical Notes

- Second `useScrollReveal` adds one additional IntersectionObserver (negligible cost)
- All new transitions use compositable properties only (opacity, transform)
- Category stagger uses CSS `transitionDelay` — zero JS overhead
- NowPlayingBar `backdropFilter` is GPU-composited
- No new dependencies, no new images, no layout shifts

