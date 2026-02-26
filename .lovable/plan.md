

# Round 27 — "Hear Me Play" Listening Room: Mobile Touch Refinement, Track Typography Hierarchy, and Scroll-to-Active Intelligence

## Critical Audit of Current State (Post-Round 26)

Rounds 20-26 delivered: atmospheric depth, card identity, two-zone scroll reveal, card surfacing, category stagger, golden thread playback response, in-card progress underline, active border warmth, divider stagger, diamond micro-rotation, track hover accent bar preview, Coming Soon dimming, NowPlayingBar glass material, warm floor parallax, blockquote hover warmth, golden focus rings, aria-current, heading semantics, NowPlayingBar tooltip, and Escape-to-stop.

The section is now deeply considered visually and semantically. Five gaps remain in the mobile experience, typographic hierarchy, and intelligent scroll behavior layers:

### Issue 1: Track Touch Targets Are Below 44px on Mobile

The track buttons use `h-11` (44px) which technically meets the minimum, but the actual tappable area is compressed by the `px-4` padding on small screens. The accent bar, waveform, and "Coming Soon" label consume horizontal space, leaving the text truncated on narrow viewports. At Fantasy.co quality, mobile tracks would have slightly taller touch targets (`h-12`, 48px) and the "Coming Soon" label would collapse to a single icon or be hidden entirely on screens below 360px.

### Issue 2: No Visual Distinction Between Category Groups on Mobile

On desktop, the emotional context phrases ("sacred tradition," "contemporary devotion," etc.) provide visual separation between categories. On mobile, these are hidden (`hidden sm:block`), leaving only the thin golden divider and the small uppercase category label. The categories blend together visually. At Fantasy.co quality, mobile would show a subtle background tint shift per category group or a slightly stronger divider treatment.

### Issue 3: The Section Has No "Scroll to Active" Behavior

When a track is playing and the user scrolls through the category list, the active track can scroll out of view within the card. There is no auto-scroll behavior to bring the playing track back into view. At Fantasy.co quality, when the active track index changes (via the NowPlayingBar or by clicking a track in a different category), the card's scroll container would smoothly scroll to reveal the active track.

### Issue 4: The Card Has No Maximum Height Constraint

On very long screens or when many categories are displayed, the card grows unbounded. At Fantasy.co quality, the card would have a `max-h-[60vh]` with a subtle `overflow-y: auto` and custom scrollbar styling (thin, golden-tinted thumb) to maintain the premium aesthetic even when scrolling within the card.

### Issue 5: The NowPlayingBar Progress Bar Has No Time Display

The NowPlayingBar shows a progress bar but no elapsed/remaining time. While minimalism is the goal, a single `elapsed / total` time display in the same `text-[9px]` size would add utility without breaking the aesthetic. At Fantasy.co quality, even the most minimal media players show time.

---

## 5-Step Implementation Plan

### Step 1: Mobile Touch Target Enhancement

**File:** `src/components/TheSound.tsx`

Change track button height from `h-11` to `h-11 sm:h-11 min-h-[48px]` to ensure 48px minimum on all devices. On screens below `sm`, hide the "Coming Soon" text entirely and replace with a subtle opacity reduction only (the `track-button--coming-soon` class already handles this). This recovers horizontal space for track titles.

```tsx
className={cn(
  "track-button group w-full flex items-center gap-3 min-h-[48px] sm:h-11 px-4 sm:px-5 relative",
  // ... rest unchanged
)}
```

For the "Coming Soon" label, wrap it with `hidden sm:inline`:
```tsx
{!hasSrc && !isActive && (
  <span className="hidden sm:inline text-[9px] uppercase tracking-[0.2em] text-foreground/20 shrink-0">
    Coming Soon
  </span>
)}
```

### Step 2: Mobile Category Visual Separation

**File:** `src/components/TheSound.tsx`

Strengthen the mobile category divider by adding a subtle background tint to the category header row on mobile. Currently the category header `div` has no background. Add a very faint background:

```tsx
style={{
  opacity: cardVisible ? 1 : 0,
  transition: "opacity 500ms ease, transform 500ms ease",
  transitionDelay: cardVisible ? `${100 + catIdx * 80}ms` : "0ms",
  background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.02), transparent)",
}}
```

This creates a barely perceptible warm wash at each category header, providing visual rhythm on mobile where the context phrases are hidden.

### Step 3: Card Max-Height with Custom Scrollbar

**File:** `src/components/TheSound.tsx`

On the track list container (`div` with `className="relative z-10 py-2"`), add a max-height and overflow:

```tsx
className="relative z-10 py-2 max-h-[55vh] overflow-y-auto sound-card-scroll"
```

**File:** `src/index.css`

Add custom scrollbar styling:

```css
/* Custom scrollbar for sound card track list */
.sound-card-scroll::-webkit-scrollbar {
  width: 3px;
}
.sound-card-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.sound-card-scroll::-webkit-scrollbar-thumb {
  background: hsl(var(--vow-yellow) / 0.15);
  border-radius: 2px;
}
.sound-card-scroll::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--vow-yellow) / 0.3);
}
/* Firefox */
.sound-card-scroll {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--vow-yellow) / 0.15) transparent;
}
```

### Step 4: Scroll-to-Active Track Behavior

**File:** `src/components/TheSound.tsx`

Add a `useEffect` that scrolls the active track into view when `activeTrackIndex` changes:

```tsx
const trackListRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (activeTrackIndex === null || !trackListRef.current) return;
  const activeButton = trackListRef.current.querySelector('[aria-current="true"]');
  if (activeButton) {
    activeButton.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}, [activeTrackIndex]);
```

Attach `trackListRef` to the scrollable track list container from Step 3. The `block: "nearest"` ensures it only scrolls if the element is out of view, preventing jarring jumps.

### Step 5: NowPlayingBar Time Display

**File:** `src/components/TheSound.tsx`

In the `NowPlayingBar` component, add a formatted time display after the progress bar. Use a simple `formatTime` helper:

```tsx
const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};
```

Add after the progress bar div:

```tsx
<span className="text-[9px] text-foreground/30 font-mono tabular-nums shrink-0 ml-1">
  {formatTime(progress)}/{formatTime(duration)}
</span>
```

This sits at the right edge of the bar, using monospace for stable width as numbers change, and at 30% opacity to remain subordinate to the track title.

---

## Files Modified Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/components/TheSound.tsx` | Mobile touch targets 48px, hide "Coming Soon" on small screens |
| 2 | `src/components/TheSound.tsx` | Category header warm background tint for mobile rhythm |
| 3 | `src/components/TheSound.tsx` | Track list max-height with overflow scroll |
| 3 | `src/index.css` | Custom golden scrollbar styling |
| 4 | `src/components/TheSound.tsx` | Scroll-to-active track on index change |
| 5 | `src/components/TheSound.tsx` | Time display in NowPlayingBar |

---

## What This Achieves

- **Mobile parity:** 48px touch targets and hidden "Coming Soon" labels give mobile users a comfortable, uncluttered tap experience
- **Visual rhythm:** The subtle category header tint provides mobile users the same sense of group separation that desktop users get from the context phrases
- **Bounded card:** The max-height constraint with a custom golden scrollbar prevents the card from dominating the viewport while maintaining the premium aesthetic
- **Intelligent scroll:** Active tracks are always visible within the card, eliminating the frustration of losing the playing track in a long list
- **Time feedback:** The NowPlayingBar gains a minimal time display that respects the brand's restrained aesthetic while providing essential playback context

## Technical Notes

- `scrollIntoView({ block: "nearest" })` only scrolls when needed -- no unnecessary motion
- Custom scrollbar uses CSS-only approach (webkit + Firefox) -- no JavaScript
- `min-h-[48px]` ensures WCAG 2.5.8 target size compliance on all devices
- `formatTime` is a pure function with zero overhead
- Time display uses `tabular-nums` to prevent layout shifts as digits change
- No new dependencies, no performance impact

