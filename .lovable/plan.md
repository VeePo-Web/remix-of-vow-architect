

# The Sound Section — Remaining Precision Refinements

## Current State

Three rounds of upgrades have brought the section to a strong place: rounded-lg everywhere, breathing golden dots, film grain, breathing glow layers, updated copy, breathing golden thread, 900ms quote reveal, sr-only narrative, and reduced-motion fallbacks.

However, a close audit reveals several remaining violations of the Sacred Sound design system that prevent this from reaching true Fantasy.co quality.

---

## Issues Found

### 1. GenreCard — Inline `window.matchMedia` Calls on Every Render

Lines 79 and 114 of GenreCard.tsx call `window.matchMedia("(prefers-reduced-motion: reduce)").matches` directly inline during render. This is a synchronous DOM query that fires on every React render cycle — a performance anti-pattern. TheSound.tsx already tracks `reducedMotion` in state via a `useEffect` listener, but never passes it down to GenreCard as a prop.

**Fix:** Add `reducedMotion` prop to GenreCard and use it instead of inline matchMedia calls.

### 2. GenreTrackPanel Header — `font-medium` Violates Weight Rule

Line 89 of GenreTrackPanel.tsx uses `font-medium` (500) on the category label heading. Per the design system, Cormorant display type must be weight 300-400 only. This was fixed on the genre card labels but missed on the panel header.

**Fix:** Change `font-medium` to `font-light` on the panel header label.

### 3. Subhead Uses Display Italic for a Full Sentence

Line 412 of TheSound.tsx uses `font-display font-light italic` on "Five rooms. One instrument. Your ceremony." — a full descriptive sentence. Per the typography rules, Cormorant italic is reserved for a single sacred word, not descriptive phrases. A full sentence in display italic reads as editorial decoration, not sacred emphasis.

**Fix:** Change to `font-sans text-muted-foreground` (Inter body) — this is a descriptive subhead, not a sacred utterance. The heading "Hear me play." already carries the display weight.

### 4. Missing Keyboard Focus Ring on Genre Cards When Active

The genre cards have `focus-visible:ring-2` but when a card is active (pressed), the visual state relies solely on border color and shadow. There is no distinct focus-visible state differentiation between "active" and "active + focused" — a WCAG keyboard navigation concern.

**Fix:** Ensure the focus ring remains visible and distinct even when the card is in its active state, using `ring-offset` to separate the focus indicator from the active border.

### 5. Closing Quote — `blockquote-warm` Class May Not Exist

Line 524 references a `blockquote-warm` class on the closing quote paragraph. If this class is not defined in CSS, it is a dead class that adds no styling but creates noise.

**Fix:** Verify the class exists; if not, remove it.

### 6. Now Playing Bar — Toggle Button Has Mixed Transition Patterns

Lines 129-133 of TheSound.tsx define the toggle button with both a `transition-all` className and an inline `style={{ transition: "all 180ms..." }}`. The className transition and inline style may conflict. The inline style should take precedence, but this is fragile.

**Fix:** Remove the `transition-all` from the className since the inline style already handles the timing precisely at 180ms with the sacred easing curve.

---

## Technical Changes

### File: `src/components/GenreCard.tsx`
- Add `reducedMotion?: boolean` prop to the interface
- Replace both inline `window.matchMedia(...)` calls with the prop value
- This eliminates two synchronous DOM queries per render per card (10 queries per render cycle across 5 cards)

### File: `src/components/GenreTrackPanel.tsx`
- Change `font-medium` to `font-light` on the category label (line 89)

### File: `src/components/TheSound.tsx`
- Pass `reducedMotion={reducedMotion}` prop to each GenreCard instance
- Change subhead from `font-display font-light italic` to `font-sans text-muted-foreground` (Inter body copy)
- Verify `blockquote-warm` class; remove if undefined
- Clean up now-playing toggle button transition conflict

---

## Summary

| Area | Current | After |
|------|---------|-------|
| GenreCard matchMedia | Inline DOM query per render | Prop from parent state |
| Panel header weight | font-medium (500) | font-light (300) |
| Subhead font | Cormorant italic (display) | Inter (body sans) |
| Focus ring on active cards | Indistinct from active border | ring-offset separation |
| blockquote-warm class | Possibly undefined | Verified or removed |
| Toggle button transitions | Conflicting className + inline | Single inline source of truth |

These are the final precision details — removing DOM query waste, enforcing the typography covenant, and eliminating code noise. Each serves either performance, accessibility, or brand discipline.

