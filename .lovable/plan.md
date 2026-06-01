## Goal

Mobile-only refinement of the floating "Hear me play" pill (`AmbientAudioPill`) so it behaves like a Fly4Me-quality persistent affordance: always reachable, never in the way. Applies on all three verticals (Weddings `/`, Teaching `/teaching*`, Events `/events*`). Desktop, 3D, audio logic, and the panel itself are untouched.

## Problems today

1. Pill is **bottom-center** on mobile (`left-1/2 -translate-x-1/2`, ~64px above safe-area) — sits directly on top of the `MobileStickyBar` CTA once scroll > 220px.
2. Pill is always full-width ("Hear me play" label, pause button, progress bar) — competes with hero copy on the 3D pages.
3. No reaction to `body[data-sticky-visible="1"]` flag the sticky bar already broadcasts.
4. Pill stays visible on `/contact*` even though the sticky bar hides there (asymmetry).
5. Entrance fires at 2.7s — collides with hero pre-scroll intro on the 3D verticals.

## Strategy (mobile ≤ md only)

Three states, one shape:

```
IDLE (top of page)         →  Full pill, bottom-right, label "Hear me play"
COMPACT (sticky bar up)    →  40×40 icon-only disc, bottom-right, tucked above sticky bar
PLAYING                    →  Compact disc with waveform; tap to open panel
```

Desktop keeps current `md:bottom-6 md:left-6` placement — no change.

### 1. Reposition: bottom-right, never center

- Replace mobile placement with:
  - `right-4` (instead of `left-1/2 -translate-x-1/2`)
  - `bottom` = `calc(env(safe-area-inset-bottom) + 16px)` when sticky bar hidden
  - `bottom` = `calc(env(safe-area-inset-bottom) + 72px)` when `body[data-sticky-visible="1"]` (sits 8px above the 64px bar)
- Animate `bottom` and `transform` with 260ms cubic-bezier matching the sticky bar.

### 2. Collapse to icon when sticky bar is visible

- Read `body[data-sticky-visible]` via a small `useSyncExternalStore` or MutationObserver hook.
- When `'1'`: collapse label slot (`w-[148px] → w-0`, opacity 0), hide pause button, shrink pill to a 40×40 circle (`h-12 rounded-full px-5` → `h-10 w-10 rounded-full p-0`).
- Tap still opens the panel; panel itself stays full functionality.
- When `'0'`: re-expand on idle (after 600ms no scroll) back to full pill with "Hear me play".

### 3. Auto-hide during active scroll

- Watch `scroll` events; while user is actively scrolling, fade pill to `opacity: 0.4` and disable hover lift. 400ms after scroll stops, fade back to 1. Skip when `prefers-reduced-motion`.
- This keeps the pill from drawing eyes during the cinematic 3D scrub on Home / Teaching / Events.

### 4. Hide on contact pages

- Mirror `MobileStickyBar`: if `pathname.includes('/contact')`, return `null` on mobile. Desktop unaffected.

### 5. Defer entrance on 3D hero pages

- On `/`, `/teaching`, `/events` (exact roots), bump entrance delay from 2000ms → 3600ms so the pre-scroll intro animation lands first. Other pages keep 2000ms.

### 6. Panel-open behavior unchanged

- When `isPanelOpen`, pill already morphs to "Listening Room / X". No layout change needed — just ensure the corner anchor still applies.

### 7. Z-index & layering

- Pill stays `z-30`, sticky bar `z-40`. Confirm pill never overlaps the sticky bar geometrically because of the new `bottom` offset (not just z-stack).

## Files to touch

- `src/components/AmbientAudioPill.tsx` — positioning, compact-mode state, sticky-bar observer, contact-route gate, delayed entrance.
- `src/index.css` — small helper if needed for the compact-pill keyframe (otherwise inline).

Explicitly NOT touching: `PianoPanel`, `MobileStickyBar`, `useVideoScrub`, any 3D / canvas / video scrub code, any desktop styles, audio playback logic, `PreScrollIntro`, cinematic nav components.

## Acceptance check

On mobile (390×844), for each of `/`, `/teaching`, `/events`, `/weddings`, `/events/pricing`, `/teaching/about`, `/contact`:

1. Scroll to top → pill is bottom-right, label visible, doesn't overlap hero CTA.
2. Scroll past 220px → sticky bar slides up, pill simultaneously collapses to 40×40 icon and lifts 8px above the bar.
3. During active scroll → pill drops to 40% opacity, returns on idle.
4. `/contact` → no pill, no sticky bar.
5. Tap pill → panel opens; pill morphs to X label as before.
6. Play a track → compact disc shows animated waveform.
