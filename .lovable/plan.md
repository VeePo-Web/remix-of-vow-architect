

# Hero Subtitle Change — Remove Repetition

The line "I let my music sound like what your hearts feel like" appears in both the hero subtitle (`HeroTagline.tsx` line 96) and the Exhale section's screen-reader text (`TheExhale.tsx` line 242). The hero repeats the mission statement before the visitor even reaches the Exhale, diluting its impact.

## The Change

Replace the hero subtitle with a line that sets the emotional stage without revealing the mission statement. The hero should whisper context — who Parker is and the weight of what he does — not deliver the thesis. The thesis belongs to the Exhale.

**Current (line 96):**
> I let my music sound like what your hearts feel like.

**Replacement:**
> I carry the weight of your ceremony — so every word spoken lands where it belongs.

This line:
- First-person voice ("I carry")
- Verb-forward, composed tone
- Frames Parker as witness/guardian, not performer
- Addresses the visitor's core anxiety (will my vows be heard?)
- Does not repeat any line used elsewhere on the page
- Maintains the same character length (~75 chars) for layout stability

## File Modified

`src/components/HeroTagline.tsx` — line 96 only. One line. No structural changes.

