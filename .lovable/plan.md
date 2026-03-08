

# Piano Key Nav — Final Polish Pass

All label renames and core visual upgrades are confirmed complete. This pass addresses three remaining craft-level details to reach true Fantasy.co quality.

## 1. Spotlight Damper on Hover

When hovering any key, all *other* keys should dim to 40% opacity — the "spotlight" pattern used in the full-screen menu. Currently all keys remain at full opacity during hover, which lacks the focused intentionality of the brand's interaction model.

**File:** `src/components/PianoKeyNav.tsx`
- When `hoveredIndex !== null`, apply `opacity: 0.4` to all non-hovered, non-active keys via inline style
- Active key stays at full opacity regardless
- Transition: 180ms ease

## 2. Pressed Key — Golden Flash

The pressed state currently uses a flat `vow-yellow / 0.2` background. Add a brief radial glow that fades — a "golden flash" matching the Three Keys piano aesthetic. This is a CSS-only change.

**File:** `src/index.css`
- Add `@keyframes piano-key-flash` (100ms scale from 1 to 1.02 with box-shadow burst, then back)
- Apply to `.piano-key--pressed` as a one-shot animation

## 3. Thread Easing Refinement

The golden thread `height` transition uses `450ms cubic-bezier(0.22, 0.61, 0.36, 1)`. This is good but the thread should also fade its opacity slightly at the leading edge. Add a subtle gradient mask so the fill doesn't have a hard bottom edge.

**File:** `src/index.css`
- Add `mask-image: linear-gradient(to bottom, black 85%, transparent 100%)` to `.piano-key-thread-fill`
- Add `-webkit-mask-image` for Safari

---

## Files Modified
1. `src/components/PianoKeyNav.tsx` — spotlight damper opacity logic
2. `src/index.css` — golden flash keyframe, thread gradient mask

