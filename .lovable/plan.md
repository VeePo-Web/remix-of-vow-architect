## Goal

The "Hear me play" pill must never visually touch or overlap any sticky bottom UI on mobile — on any route, in any scroll state. Today it only lifts above `MobileStickyBar` via a single CSS var. Other bottom elements (footer reveal toggle on `/teaching` and `/events`, future bottom CTAs) and transient states (sticky bar sliding in/out, bar hidden on contact routes, dynamic bar height) can still cause near-misses.

## Strategy

Move from "one component publishes its height" to a **shared mobile bottom-obstacle registry** that the pill subscribes to. Any sticky bottom element registers itself; the pill always lifts above the tallest currently-visible obstacle, plus a breathing gap and the iOS safe-area inset.

### 1. Bottom obstacle registry

New tiny module `src/lib/mobileBottomObstacles.ts`:

```text
- register(id, getRect)   → returns unregister fn
- subscribe(cb)           → fires whenever obstacles change
- getReservedBottom()     → returns max(visible obstacle height intersecting viewport bottom)
```

Implementation detail: writes the computed reserved height to `document.body.style.setProperty('--mobile-bottom-reserved', '${h}px')` on every change (rAF-throttled), and also keeps an in-memory cache for React subscribers.

### 2. Register every sticky bottom element

- `MobileStickyBar` registers its `<nav>` ref; reports `0` when hidden (translated off-screen, footer CTA visible, contact route).
- `Teaching` and `Events` footer reveal buttons (`.cinema-footer-toggle`) register their refs; report `0` when `opacity` is 0 / `pointerEvents: none`.
- Any future sticky bottom UI uses the same hook (`useBottomObstacle(ref, isVisible)`).

This replaces the current single `--mobile-sticky-h` var with the more general `--mobile-bottom-reserved`.

### 3. Pill consumes the registry

In `AmbientAudioPill`:

```text
bottom = calc(env(safe-area-inset-bottom, 0px)
            + var(--mobile-bottom-reserved, 0px)
            + 16px)
```

Plus a React subscription so the pill can recompute `compact` mode and `hardHide` whenever reserved height jumps (e.g. sticky bar appears mid-scroll, footer toggle fades in at 95%).

### 4. Scroll-state coverage

- Recompute on `scroll`, `resize`, `visualViewport` resize, and registry change.
- During fast scrolling, keep the last known reserved height (no flicker); resync on scroll idle.
- When sticky bar is mid-transition (translateY animating), use its *target* height (already correct because we measure `offsetHeight`, not `getBoundingClientRect().top`).

### 5. Route coverage matrix

```text
/                       gateway        — no sticky bar → reserved = 0
/weddings               cinematic      — sticky bar appears at scrollY>220
/teaching, /events      cinematic      — sticky bar + footer reveal toggle
/pricing, /about, /faq, /proof, /listen           — sticky bar only
/events/*, /teaching/* sub-pages       — sticky bar only
/contact, /teaching/contact, /events/contact      — pill hard-hidden
```

Every row resolves through the same registry — no per-route conditionals in the pill.

### 6. Acceptance checks (mobile 390px)

- Scroll each route slowly: pill bottom edge never crosses the top edge of the sticky bar or footer toggle.
- Sticky bar appearing/disappearing animates the pill upward/downward smoothly (uses existing 260ms transition on `bottom`).
- On `/teaching` and `/events` near end-of-scroll, when both sticky bar and footer toggle are visible, pill sits above the taller of the two.
- Rotate device / open keyboard / open Listening Room panel: no overlap, no jump.
- Desktop unchanged.

## Technical implementation

### Files

New:
- `src/lib/mobileBottomObstacles.ts` — registry + CSS var writer
- `src/hooks/useBottomObstacle.ts` — `(ref, isVisible) => void`

Edit:
- `src/components/MobileStickyBar.tsx` — replace direct `--mobile-sticky-h` writes with `useBottomObstacle(barRef, isVisible && !isFooterCtaVisible && !isContact)`
- `src/components/AmbientAudioPill.tsx` — swap `--mobile-sticky-h` for `--mobile-bottom-reserved`; subscribe to registry for `compact` decisions
- `src/pages/Teaching.tsx`, `src/pages/Events.tsx` — register `toggleRef` with visibility derived from current opacity/pointerEvents state (lift state into a `footerToggleVisible` boolean already implied by current code)

### Backward compatibility

Keep `--mobile-sticky-h` writing for one release as an alias, so any other consumer (if added later) doesn't break.

### Out of scope

- Visual redesign of the pill or sticky bar
- Desktop behavior
- Any business-logic / routing changes
