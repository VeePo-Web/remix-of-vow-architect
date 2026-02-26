

# Round 28 — "Hear Me Play" Listening Room: Playback Seek, Track Number Hierarchy, and Ambient Sound Signature

## Critical Audit of Current State (Post-Round 27)

Rounds 20-27 delivered: atmospheric depth, card identity, two-zone scroll reveal, card surfacing, category stagger, golden thread playback response, in-card progress underline, active border warmth, divider stagger, diamond micro-rotation, track hover accent bar preview, Coming Soon dimming, NowPlayingBar glass material, warm floor parallax, blockquote hover warmth, golden focus rings, aria-current, heading semantics, NowPlayingBar tooltip, Escape-to-stop, mobile touch targets (48px), hidden Coming Soon on small screens, category header warm tint, bounded card with golden scrollbar, scroll-to-active, and NowPlayingBar time display.

Five gaps remain in the interaction depth, visual hierarchy, and ambient atmosphere layers:

### Issue 1: Progress Bar Is Not Seekable

Both the in-card progress underline and the NowPlayingBar progress bar are display-only. Users cannot click or drag to seek within a track. At Fantasy.co quality, the NowPlayingBar progress bar would respond to click-to-seek -- allowing users to jump to any point in the track. The in-card underline remains display-only (too small for reliable interaction), but the NowPlayingBar's 2px bar should expand to 4px on hover and accept click input.

### Issue 2: Tracks Have No Numeric Index

The track list renders titles only, with no visual indicator of position within the category. At Fantasy.co quality, each track would show a subtle track number (01, 02, 03...) in muted monospace before the title -- creating a typographic hierarchy that communicates order and structure. When a track is active, the number transforms into the play/pause icon state (already handled by the accent bar), so the number only shows for inactive tracks.

### Issue 3: The Section Has No Ambient Audio Signature

The section is titled "Hear me play" but produces no sound until a track is clicked. At Fantasy.co quality, there would be an extremely subtle ambient hover sound effect -- but since that risks annoyance, a more appropriate approach is a brief "piano note bloom" CSS animation on the section heading when it first scrolls into view. A single golden note icon that fades in and out beside "Hear me play." would signal audio presence without actual sound.

### Issue 4: The Card Footer Link Has No Warmth Transition

The "Request a live preview" link at the card footer uses a generic underline hover. At Fantasy.co quality, this CTA would transition from muted to warm -- the text color shifting subtly toward vow-yellow on hover, and the underline becoming golden. This is the section's secondary conversion path and deserves considered hover treatment.

### Issue 5: The NowPlayingBar Has No Track-Change Crossfade

When switching tracks, the NowPlayingBar title updates instantly with no transition. At Fantasy.co quality, the title and category label would crossfade (opacity out 120ms, update, opacity in 180ms) -- preventing the jarring text swap and creating a sense of continuity between tracks.

---

## 5-Step Implementation Plan

### Step 1: Seekable NowPlayingBar Progress Bar

**File:** `src/components/TheSound.tsx`

Replace the static progress bar in `NowPlayingBar` with a clickable one. Wrap the 2px bar in a taller (12px) transparent hit area. On click, calculate the seek position from the click's X offset relative to the bar width, then set `audioRef.current.currentTime`.

Since `NowPlayingBar` does not have direct access to `audioRef`, expose a seek function via `window.__sacredSoundSeek` (same pattern as `__sacredSoundToggle`).

In the main `TheSound` component:
```tsx
useEffect(() => {
  (window as any).__sacredSoundSeek = (pct: number) => {
    const audio = audioRef.current;
    if (audio && duration > 0) {
      audio.currentTime = pct * duration;
      setProgress(pct * duration);
    }
  };
  return () => { delete (window as any).__sacredSoundSeek; };
}, [duration]);
```

In `NowPlayingBar`, the progress bar container becomes:
```tsx
<div
  className="absolute top-0 left-0 right-0 h-3 cursor-pointer group/seek -translate-y-1"
  onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    (window as any).__sacredSoundSeek?.(pct);
  }}
  role="slider"
  aria-label="Seek"
  aria-valuenow={Math.round(percent)}
  aria-valuemin={0}
  aria-valuemax={100}
>
  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/5 group-hover/seek:h-[4px] transition-all duration-150">
    <div
      className="h-full bg-[hsl(var(--vow-yellow))] transition-none"
      style={{ width: `${percent}%` }}
    />
  </div>
</div>
```

The bar expands from 2px to 4px on hover, signaling interactivity.

### Step 2: Track Number Typography

**File:** `src/components/TheSound.tsx`

Before the track title `<span>`, add a track number for inactive tracks:

```tsx
{!isActive && (
  <span className="text-[10px] font-mono text-foreground/20 tabular-nums w-5 shrink-0 text-right">
    {String(tIdx + 1).padStart(2, "0")}
  </span>
)}
```

This renders "01", "02", etc. in a muted monospace font. When a track is active, the accent bar replaces the number visually (the number hides). The `w-5` ensures consistent alignment.

### Step 3: Note Bloom on Section Heading

**File:** `src/components/TheSound.tsx`

After the "Hear me play." heading text, add a small decorative music note icon that fades in with a bloom effect when the section first becomes visible:

```tsx
<span
  className="inline-block ml-2 align-middle"
  style={{
    opacity: isVisible ? 0.4 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.5)",
    transition: "opacity 900ms ease 600ms, transform 900ms ease 600ms",
    filter: isVisible ? "drop-shadow(0 0 6px hsl(var(--vow-yellow) / 0.3))" : "none",
  }}
  aria-hidden="true"
>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[hsl(var(--vow-yellow))]">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
</span>
```

This is a single music note SVG at 40% opacity with a golden drop-shadow bloom. It appears once on scroll reveal and remains static -- no looping animation.

### Step 4: Card Footer Link Warmth

**File:** `src/components/TheSound.tsx`

Update the footer link's className to include a warm hover transition:

```tsx
<Link
  to="/contact"
  className="underline decoration-foreground/10 hover:decoration-[hsl(var(--vow-yellow)/0.3)] hover:text-[hsl(var(--vow-yellow)/0.6)] transition-all duration-[260ms]"
>
```

This shifts the underline from neutral to golden and the text from muted to warm on hover -- matching the brand's vow-yellow accent language.

### Step 5: NowPlayingBar Title Crossfade

**File:** `src/components/TheSound.tsx`

Add a `titleKey` state to `NowPlayingBar` that triggers a CSS crossfade when the track title changes. Use a `useEffect` that watches `trackTitle`:

```tsx
const [displayTitle, setDisplayTitle] = useState(trackTitle);
const [displayCategory, setDisplayCategory] = useState(categoryLabel);
const [titleFade, setTitleFade] = useState(true);

useEffect(() => {
  if (trackTitle === displayTitle) return;
  setTitleFade(false); // fade out
  const timer = setTimeout(() => {
    setDisplayTitle(trackTitle);
    setDisplayCategory(categoryLabel);
    setTitleFade(true); // fade in
  }, 120);
  return () => clearTimeout(timer);
}, [trackTitle, categoryLabel]);
```

Apply `opacity` and `transition` to the text container:
```tsx
<div className="min-w-0" style={{
  opacity: titleFade ? 1 : 0,
  transition: "opacity 120ms ease",
}}>
```

This creates a 120ms fade-out, text swap, then 120ms fade-in -- preventing jarring title changes.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/components/TheSound.tsx` | Seekable progress bar in NowPlayingBar + seek function exposure |
| 2 | `src/components/TheSound.tsx` | Track number typography (01, 02...) for inactive tracks |
| 3 | `src/components/TheSound.tsx` | Music note bloom SVG on section heading |
| 4 | `src/components/TheSound.tsx` | Footer link golden hover warmth |
| 5 | `src/components/TheSound.tsx` | NowPlayingBar title crossfade on track change |

---

## What This Achieves

- **Seek interaction:** Users can click anywhere on the NowPlayingBar progress bar to jump within a track -- the bar expands on hover to signal affordance
- **Typographic hierarchy:** Track numbers create visual order and structure, disappearing when active to let the accent bar and waveform lead
- **Audio presence:** The note bloom on the heading signals "this section is about sound" without any actual audio playing -- a visual promise
- **Conversion warmth:** The footer CTA gains brand-consistent golden hover treatment, elevating a secondary conversion path
- **Continuity:** Title crossfade prevents jarring text swaps when switching tracks, maintaining the sense of a continuous listening experience

## Technical Notes

- Seek uses the same `window.__sacredSoundSeek` pattern as toggle -- zero prop drilling
- Track numbers use `tabular-nums` for stable column alignment
- Note SVG is inline (no additional asset load) at 14x14px
- Crossfade uses a single 120ms timeout -- no animation libraries
- Progress bar hit area is 12px tall but visually 2px (expanding to 4px on hover) -- Fitts's Law compliant
- No new dependencies, no layout shifts, no performance impact

