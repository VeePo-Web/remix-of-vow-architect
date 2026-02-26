

# TheSound Section — Redesign as "Hear Me Play" Browsing Experience

## Vision

Transform TheSound from a ceremony-specific audio player into a relaxed, inviting listening environment that mirrors the Gateway page's Listening Room (PianoPanel) — but expanded into a full homepage section rather than a floating overlay. The tone shifts from "ceremony soundtrack preview" to "hear me play while you explore."

## Current Problems

1. **Copy is ceremony-locked**: "The prelude. The procession. The vows. The walk into forever." — too narrow for a browsing invitation
2. **Only 4 tracks, all ceremony-labeled**: "Processional," "Bride's Entrance," "Signing," "Recession" — limits the experience
3. **Disconnected from the Listening Room**: The Gateway page has a rich PianoPanel with 15 tracks across 5 genres (Hymns, Worship, Pop, Classical, Film) — but TheSound section uses a completely separate, smaller player
4. **The closing caption oversells**: "Every arrangement begins with a conversation" belongs in the Process section, not here

## Proposed Changes

### Copy (in `TheSound.tsx`)

| Element | Current | Proposed |
|---------|---------|----------|
| Label | "The Sound" | "The Sound" (unchanged) |
| Headline | "Music that holds the room still." | "Hear me play." |
| Subhead | "The prelude. The procession. The vows. The walk into forever." | "Browse. Listen. Imagine it at yours." |
| Closing caption | "Every arrangement begins with a conversation — and ends with a sound that belongs only to you." | "Every piece I play begins the same way — with someone in mind." |

### Design — Embed the PianoPanel Track List Inline

Replace the current 4-card `AudioPlayer` grid with the existing `PianoPanel` track list (5 categories, 15 tracks), but rendered inline within the section rather than as a floating overlay. This reuses the existing component data and interaction patterns.

**Specifically:**

1. Import `categories` and `allTracks` from `PianoPanel.tsx` (already exported)
2. Build an inline track list that mirrors PianoPanel's layout: category headers with golden divider lines, track rows with the accent bar and mini waveform — but rendered directly in the section container instead of a fixed-position dialog
3. Keep the same `<audio>` element and play/pause logic from the current `AudioPlayer`
4. Retain the decorative PianoStrings overlay (golden vertical lines, hammer rail, damper strip) to give the section the same "grand piano interior" aesthetic as the Gateway panel
5. Keep the NowPlayingBar mini-bar for when users scroll away while music plays
6. Remove the separate `AudioPlayer` component import — the inline list replaces it
7. Add genre filter chips at the top (Hymns, Worship, Pop, Classical, Film) so users can browse by category, with an "All" default

**Layout:**
- Max width constrained to `max-w-md` centered, matching the intimate scale of the PianoPanel
- Rounded container with the same `hsl(var(--rich-black))` background and `vow-yellow/0.12` border
- PianoStrings decoration layered behind
- Category sections stack vertically with the same golden divider separating each

### What Stays Unchanged

- Section dark theme (`section--dark section-grain`)
- Background image layer (sound-cathedral-ai.jpg at 15% opacity)
- Radial glow behind content
- Top/bottom gradient fades
- Scroll reveal animations
- NowPlayingBar floating mini-bar behavior
- All animation timings and easing curves

## Files Modified

- `src/components/TheSound.tsx` — replace copy + swap AudioPlayer grid for inline PianoPanel-style track list using imported `categories`/`allTracks` data

## Emotional Arc

The section's role in the page journey shifts from "preview my ceremony music" to a breathing room — a quiet invitation to sit, listen, and let the music build trust. It becomes the sonic equivalent of The Invitation's portrait: "Here I am. Listen." The copy reduction from 3 lines to 1 ("Hear me play.") honors the Swedish principle of lagom — just the right amount. The music speaks for itself.

