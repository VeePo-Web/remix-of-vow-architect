

# Next Round: Remaining Luxury Polish

The previous implementation completed the 7 priority items (routing, Proof numerals, Sustain differentiation, Presence metrics). This round addresses the remaining craft issues found during audit.

---

## 1. TeachingAboutHero — Upgrade to 4-Phase Reveal

`TeachingAboutHero.tsx` still uses a single `isVisible` boolean (line 6-11), making its entrance feel flat compared to the Events hero which has `revealPhase` 0-4 orchestration. Upgrade to match.

**File:** `src/components/teaching-about/TeachingAboutHero.tsx`
- Replace `useState(false)` / single timeout with `useState(0)` / 4-phase setTimeout chain (200/500/900/1300ms)
- Replace all `isVisible` checks with `revealPhase >= N` pattern
- Increase `min-h-[85vh]` to `min-h-[90vh]`

## 2. EventsAboutHero — Increase Height

**File:** `src/components/events-about/EventsAboutHero.tsx` line 22
- Change `min-h-[85vh]` → `min-h-[90vh]`

## 3. Origin Layout Flip — Events Image Left, Text Right

Both Origins use identical text-left/image-right 40/60 grid. Flip Events to break the pattern.

**File:** `src/components/events-about/EventsAboutOrigin.tsx`
- Reorder grid children: image column first (`order-1 md:order-1`), text column second (`order-2 md:order-2`)
- This creates visual variety when a visitor sees multiple verticals

## 4. Covenant Signature Paths — Make Unique Per Vertical

Both Events and Teaching use the exact same SVG path `d="M10,35 Q30,10 50,30 T90,25..."`. Give each a distinct organic signature.

**Files:**
- `EventsAboutCovenant.tsx` line 112 — new path with different curves
- `TeachingAboutCovenant.tsx` line 109 — another distinct path
- Reduce corner ornaments from `w-16 h-16` to `w-12 h-12` in both files (lines 68-71)

## 5. Events Presence — Remove Quotation Marks from Cards

`EventsAboutPresence.tsx` line 99 wraps moments in `"{moment}"` — adds visual noise per brand rules.

**File:** `src/components/events-about/EventsAboutPresence.tsx` line 99
- Change `"{moment}"` → `{moment}`

## 6. Teaching Presence — Fix Orphan Card in 2-Col Grid

3 items in a `md:grid-cols-2` grid leaves one card alone. Switch to single-column or 3-col.

**File:** `src/components/teaching-about/TeachingAboutPresence.tsx` line 71
- Change `grid md:grid-cols-2` → `flex flex-col` with `max-w-2xl mx-auto` for a meditative single-column stack matching Teaching's vertical rhythm

---

## Summary

- 6 files modified
- No new dependencies
- Focused on eliminating remaining template repetition and craft inconsistencies

