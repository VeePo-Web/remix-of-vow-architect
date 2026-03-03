

# Fix: Genre Track Panel — Increase Brightness for Readability

## The Problem

The track panel background is `hsl(var(--rich-black) / 0.85)` — nearly opaque black. Combined with track text at `text-foreground/70` (70% opacity) for inactive tracks and `text-foreground/35` for unavailable tracks, the panel is too dark to comfortably scan the song list.

## The Fix

Increase panel surface brightness and text contrast while staying within the Death-space palette:

### File: `src/components/GenreTrackPanel.tsx`

1. **Panel background** (line 66): Change from `hsl(var(--rich-black) / 0.85)` to `hsl(var(--ebon-charcoal) / 0.92)` — shifts from pure black to the lighter charcoal tone, creating a noticeably brighter surface that still reads as dark/reverent.

2. **Border** (line 69): Increase from `hsl(var(--vow-yellow) / 0.12)` to `hsl(var(--vow-yellow) / 0.18)` — slightly more visible edge definition helps the panel feel like a distinct surface.

3. **Inner top highlight** (line 70): Change `rgba(255,255,255,0.06)` to `rgba(255,255,255,0.10)` — subtle but adds perceived luminosity at the top edge.

4. **Inactive track text** (line 133): Change `text-foreground/70` to `text-foreground/80` — improves readability.

5. **Hover background** (line 133): Change `hsl(var(--vow-yellow)/0.03)` to `hsl(var(--vow-yellow)/0.06)` — hover rows become more visible.

6. **Unavailable track text** (line 134): Change `text-foreground/35` to `text-foreground/45` — still clearly dimmed but no longer invisible.

7. **Category label** (line 90 area): Change `text-foreground/50` to `text-foreground/60`.

8. **Track count** (line 96 area): Change `text-foreground/20` to `text-foreground/30`.

9. **Footer text** (line 182 area): Change `text-foreground/25` to `text-foreground/35`.

All changes stay within the charcoal palette — no new colors introduced. The panel will feel like a brighter room, not a different room.

