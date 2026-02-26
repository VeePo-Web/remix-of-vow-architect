

# The Invitation Section — Copy Refinement

## Current Issues
- Claims "200 ceremonies" but the actual number is 500+ events (not all weddings)
- Copy is wedding-specific when it should be broader — this section is a teaser to the About page
- The video caption "60 seconds on what I do — and why" references a video that doesn't exist yet (it's a portrait image)
- Trust badge still says "200+ Ceremonies"

## Copy Changes (No Design Changes)

### File: `src/components/TheInvitation.tsx`

**Trust badge** (line 8):
- Current: `'200+ Ceremonies'`
- Proposed: `'500+ Events'`

**Headline** (lines 96-112):
- Current: "I have been at 200 ceremonies. / I know what can go wrong."
- Proposed: "I have played at over 500 events. / I know what can go wrong."

**Body paragraphs** (lines 125-131):
- Current: "The wind that carries vows away. The generator that hums through the 'I do.' The back row that strains and gives up." / "I designed every part of my process so that never happens to you."
- Proposed: "The wind that steals a vow mid-sentence. The hum that bleeds through silence. The back row that leans in — and still cannot hear." / "Every part of my process exists so that never happens to you."

Rationale: Tighter, more visceral. "Steals a vow mid-sentence" is more cinematic than "carries vows away." "Bleeds through silence" is more evocative than "hums through the 'I do.'" The second paragraph becomes leaner — "exists so that" is more confident than "I designed every part... so that."

**Image caption** (line 78-80):
- Current: "60 seconds on what I do — and why."
- Proposed: "A moment with me — before the moment with you."

Rationale: The current caption implies a video. The new caption works for both a portrait image and a future video embed. It also echoes the vigil/anticipation theme.

**DirectionalLink text** (line 145):
- Current: "Read my full story"
- Proposed: "Read my story" (simpler, more intimate)

## What Stays Unchanged
- All design: layout, grid, animations, colors, spacing, transitions
- Section label "The Invitation"
- Trust badges for SOCAN and $4M Insured
- DirectionalLink destination (`/about`)
- Gold underline animation on "wrong"

