

# Round 26 — "Hear Me Play" Listening Room: Keyboard Accessibility, Focus Choreography, and Semantic Audio Feedback

## Critical Audit of Current State (Post-Round 25)

Rounds 20-25 delivered atmospheric depth, card identity, two-zone scroll reveal, card surfacing, category stagger cascade, golden thread playback response, in-card progress underline, active border warmth, divider stagger, diamond micro-rotation, track hover accent bar preview, Coming Soon dimming, NowPlayingBar glass material, warm floor parallax, and blockquote hover warmth.

The visual and interaction layer is now deeply considered. However, five gaps remain in the accessibility, keyboard, and semantic feedback layers — areas that Fantasy.co treats as non-negotiable craft:

### Issue 1: Track Buttons Have No Visible Focus Ring

Tab-navigating through tracks shows no visible focus indicator. The buttons rely on browser defaults which are invisible against the dark background. At Fantasy.co quality, focused track buttons would show a subtle golden outline matching the brand's accent color — ensuring keyboard users have the same considered experience as mouse users.

### Issue 2: The NowPlayingBar Toggle Has No Keyboard Shortcut Hint

The play/pause button in the NowPlayingBar has an `aria-label` but no tooltip or visual hint that spacebar or the button itself toggles playback. At Fantasy.co quality, a subtle `title` attribute and focus ring would reinforce discoverability.

### Issue 3: Active Track Has No `aria-current` Semantic

Screen readers cannot distinguish the currently playing track from others. The active track button uses visual styling (golden color, waveform) but has no `aria-current="true"` attribute. This is a WCAG gap that should be addressed.

### Issue 4: The Card Container Lacks a Descriptive `aria-label`

The repertoire card is a complex interactive region but has no `role="region"` or `aria-label`. Screen readers encounter it as an anonymous div. Adding `role="group"` with `aria-label="Repertoire — browse and play tracks"` would provide context.

### Issue 5: Category Headers Are Not Semantic

Category labels (Hymns, Worship, Pop, etc.) render as `<span>` elements rather than heading-level elements. While visually styled as section headers, they provide no navigational landmarks for screen readers. Using `role="heading" aria-level="3"` would add semantic structure without changing visual hierarchy.

---

## 5-Step Implementation Plan

### Step 1: Golden Focus Rings on Track Buttons

**File:** `src/index.css`

Add a focused state for track buttons that uses the brand's vow-yellow at low opacity:

```css
.track-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--vow-yellow) / 0.3), inset 0 0 0 1px hsl(var(--vow-yellow) / 0.15);
}
```

This replaces the browser default focus ring with a brand-consistent golden glow ring that is visible against the dark card background.

### Step 2: aria-current on Active Track + Card Region Semantics

**File:** `src/components/TheSound.tsx`

On the track `<button>` element (line 517), add `aria-current={isActive ? "true" : undefined}` to semantically identify the playing track.

On the card container div (line 466-467), add `role="group"` and `aria-label="Repertoire — browse and play tracks"` to create a named interactive region.

### Step 3: Category Heading Semantics

**File:** `src/components/TheSound.tsx`

Change the category label `<span>` (line 605) to include `role="heading"` and `aria-level={3}` so screen readers can navigate between categories:

```tsx
<span
  role="heading"
  aria-level={3}
  className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60"
>
  {category.label}
</span>
```

### Step 4: NowPlayingBar Focus and Tooltip Polish

**File:** `src/components/TheSound.tsx`

On the NowPlayingBar toggle button (line 147):
- Add `title={isPlaying ? "Pause playback" : "Resume playback"}` for tooltip hint
- Add focus-visible styling via className: `focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.4)] focus-visible:outline-none`

### Step 5: Keyboard Navigation Enhancement — Escape to Stop

**File:** `src/components/TheSound.tsx`

Add a `useEffect` that listens for the Escape key when a track is playing, pausing playback. This matches common media player conventions and provides keyboard users a quick way to stop audio:

```tsx
useEffect(() => {
  if (!isPlaying) return;
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };
  window.addEventListener("keydown", handleEscape);
  return () => window.removeEventListener("keydown", handleEscape);
}, [isPlaying]);
```

This is lightweight (only attached when playing) and uses no external dependencies.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/index.css` | Golden focus-visible ring for `.track-button` |
| 2 | `src/components/TheSound.tsx` | `aria-current` on active track, `role="group"` on card |
| 3 | `src/components/TheSound.tsx` | Category labels get `role="heading" aria-level={3}` |
| 4 | `src/components/TheSound.tsx` | NowPlayingBar button `title` + focus-visible ring |
| 5 | `src/components/TheSound.tsx` | Escape key listener to pause playback |

---

## What This Achieves

- **Keyboard parity:** Focus rings ensure keyboard users see the same golden accent language as mouse users — a non-negotiable at Fantasy.co quality
- **Semantic completeness:** `aria-current`, `role="group"`, and heading semantics give screen readers the same navigational structure that sighted users experience visually
- **Discoverability:** Tooltip on NowPlayingBar and Escape-to-stop provide power-user shortcuts without cluttering the interface
- **WCAG compliance:** These changes address 2.4.7 (Focus Visible), 1.3.1 (Info and Relationships), and 4.1.2 (Name, Role, Value)

## Technical Notes

- Focus-visible only activates on keyboard navigation, not mouse clicks (native browser behavior)
- `aria-current` is the semantic standard for identifying the current item in a set
- Escape listener is conditionally attached (only when playing) — zero cost when idle
- No visual changes for mouse/touch users — all enhancements are accessibility-layer only
- No new dependencies, no layout shifts, no performance impact

