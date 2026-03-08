

# About Page — Round 2: Contrast, Copy, and Transition Refinements

## Critical Issues Found in Visual Audit

### 1. Sustain Section Has Catastrophic Contrast Failure
The headline "Like a sustain pedal holds a note, I hold your ceremony" is nearly invisible — dark text on a light cream background renders at extremely low contrast. The SVG node visualization (golden dots connected by dashed line) is completely invisible against the light background. The three golden dots above "Words / Silence / Memory" are barely perceptible. This is the single worst visual issue on the page.

**Fix in `WitnessSustain.tsx`:**
- Change headline to use `text-foreground` with explicit dark color override or increase font-weight from `font-light` to `font-normal` for better contrast on light backgrounds
- Increase SVG node opacity values (currently 0.08/0.15/0.8 on a light bg — the outer rings are invisible)
- Increase the connecting dashed line opacity from 0.15 to 0.35
- Add `text-foreground` to the label with higher opacity (currently 0.60 which on light bg is too faint)

### 2. Section Labels Are Left-Aligned Instead of Centered
"THE PRESENCE" and "THE COVENANT" labels appear left-offset because they use `text-center` on the `p` tag but the parent container has left-biased max-width. Verify and fix centering.

**Fix in `WitnessPresence.tsx`:** Ensure label `p` element is within the centered container.

### 3. Covenant → Crossing Transition Has a Hard Line
At 75% scroll, there's a visible hard edge where the cream Covenant section meets the dark Crossing. The current `h-48` fade goes from `hsl(var(--surface-warm))` to `hsl(var(--rich-black))` but the Crossing section background starts at `hsl(var(--rich-black))` — need to verify the gradient endpoint matches.

**Fix in `WitnessCovenant.tsx`:** Ensure bottom fade target color matches the Crossing section's top color exactly.

### 4. Copy Refinements for Brand Voice
Several copy elements need upgrading per the brand identity:
- **Origin section**: "The DJ shrugged" — brand rules say never use "DJ." Change to "The sound technician shrugged" or "The musician shrugged"
- **Origin section**: "Ceremony-Audio Plan" feels like internal jargon — simplify to "a system to ensure every word would be heard"
- **Presence section**: "events performed" — brand positioning is "witness," not "performer." Change to "ceremonies witnessed" or "moments carried"
- **Crossing section**: "Ready to be witnessed?" — this is strong but could be warmer. Consider "Your ceremony deserves a witness."

### 5. Sustain Section Needs Dark Mode Awareness
The Sustain section uses `--surface` to `--surface-warm` gradient which in the dark theme is light cream. The text color variables resolve to light values on dark backgrounds but these are light backgrounds in a dark-themed page — creating the contrast inversion. The fix is to either:
- Make the section dark-on-dark (matching the page mood)
- Or explicitly set text colors for this light-background section

**Recommended approach:** Convert Sustain to dark background to match the page's vigil mood — it currently breaks the dark → light → dark → light rhythm too aggressively. Use `hsl(var(--background))` to `hsl(var(--surface))` instead.

### 6. Covenant Certificate Corner Ornaments Too Subtle
The 16px corner ornaments at `primary/30` are barely visible on the dark card. Increase to `primary/40` and add a faint golden glow shadow.

## Files to Modify

| File | Changes |
|------|---------|
| `WitnessSustain.tsx` | Dark background conversion, SVG opacity boost, headline contrast fix |
| `WitnessPresence.tsx` | Copy: "events performed" → "ceremonies witnessed", label centering |
| `WitnessOrigin.tsx` | Copy: remove "DJ", simplify "Ceremony-Audio Plan" |
| `WitnessCovenant.tsx` | Corner ornament opacity boost, transition color match, label "THE COVENANT" centering |
| `WitnessCrossing.tsx` | Copy refinement: headline warmth |

