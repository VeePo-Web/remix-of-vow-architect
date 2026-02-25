

# Audit: Pill Playing-State Icon Gap and Title Truncation

## What I Found

Two issues degrade the pill's luxury feel when a track is active and the panel is closed:

### 1. Dead Icon Slot (Left Side)

The pill's left icon area has three states defined:
- **Panel open**: Shows X icon -- works
- **Idle (no track)**: Shows Play icon -- works  
- **Playing, panel closed**: Shows **nothing** -- the slot is visually empty

When "Amazing Grace" is playing and the panel is closed, there is a 14x14px void on the left side of the pill where neither the X nor the Play icon renders. This creates a visual imbalance -- the pill reads as broken, like a missing tooth. Premium audio interfaces (Sonos, Apple Music mini-player) always show a contextual icon in every state.

**The fix**: Add a third icon state -- a small waveform/equalizer indicator that appears when `isPlaying && !isPanelOpen`. This gives the pill visual life and communicates "audio is active" at a glance. The waveform bars already exist on the right side, but the left icon slot needs its own indicator to avoid the dead zone.

### 2. Title Truncation at "AMAZING GRA..."

The `min-w-[100px]` text container clips "AMAZING GRACE" to "AMAZING GRA..." which looks incomplete and cheap. With `text-[12px]` and `tracking-[0.16em]`, "AMAZING GRACE" needs approximately 140px. Other titles like "RIVER FLOWS IN YOU" need even more.

**The fix**: Increase `min-w-[100px]` to `min-w-[140px]`. This accommodates most titles without truncation while keeping the pill compact. Truly long titles like "COMPTINE D'UN AUTRE ETE" will still truncate gracefully with ellipsis, which is acceptable.

## Technical Changes

### File: `src/components/AmbientAudioPill.tsx`

**Change 1 -- Add playing icon state (around line 225-235):**

After the Play icon span (idle state), add a third span for the playing-with-panel-closed state. This will show a tiny 4-bar waveform indicator (3 thin bars, vow-yellow, animated) that mirrors the right-side waveform but smaller -- 10px tall, using the same `ambient-wave` keyframes at reduced scale. It appears when `isPlaying && !isPanelOpen` and fades with the same `180ms` opacity transition as the other icons.

**Change 2 -- Widen text container (line 238):**

Change `min-w-[100px]` to `min-w-[140px]` on the label container span. This gives titles like "Amazing Grace" and "Canon in D" room to display fully.

## What Stays Unchanged

Panel component, track data, audio logic, entrance animation, progress bar, pause button, all panel interior styling.

