

# Process Section Copy Refinement — Clearer, Simpler, Sharper

## Philosophy

The current copy is strong but slightly overwrought in places. The "details" lines try to do too much — mixing poetic questions with explanations. The "assumption" lines repeat a grammatical pattern ("I don't assume... I [verb]") that becomes predictable by the fourth card. The goal: preserve the intimate first-person voice and the four-movement structure while making each card land faster and hit harder.

**No design changes.** Only the `movements` array data and the intro/closing text in `ProcessSection.tsx`.

## Changes

### File: `src/components/process/ProcessSection.tsx`

**Intro block** — tighten the bridge line and statement:

| Element | Current | Proposed |
|---------|---------|----------|
| Label | "The Process" | "The Process" (unchanged) |
| Headline | "Excellence on the big day doesn't happen on the big day." | "Excellence on the big day doesn't happen on the big day." (unchanged — it's perfect) |
| Highlight | "It happens now." | "It happens now." (unchanged) |
| Bridge | "This is how I prepare for the moment that matters most." | "This is how I prepare — so the moment you've imagined is the moment you live." |
| Statement | "Because there are no second chances for First Moments" | "Because there are no second takes on a First Moment" |

**Closing block** — unchanged. "Because there's one chance to get this right. And it will be right." is already excellent.

### Movement I — THE LISTENING

| Field | Current | Proposed |
|-------|---------|----------|
| action | "I ask" | "I ask" (unchanged) |
| quote | "Before I play a single note, I learn your story." | "Before I touch a single key, I learn your story." |
| details | "What song was playing when you knew? What does your heart sound like when you think about walking toward them?" | "What song was playing when you knew? What do you want to feel the moment you begin your walk?" |
| assumption | "I don't assume I know. I ask." | "I never assume. I listen first." |
| outcome | "It begins with a conversation." | "It starts with a conversation — not a playlist." |
| annotation | "your story begins here" | "it starts here" |

**Rationale**: "touch a single key" is more pianistic and specific. "What does your heart sound like" is abstract — replacing with "What do you want to feel" is direct and emotionally clear. The outcome now differentiates from competitors (playlist providers) in one line.

### Movement II — THE CRAFTING

| Field | Current | Proposed |
|-------|---------|----------|
| action | "I create" | "I compose" |
| quote | "Then I disappear into your vision." | "Then I disappear into the music." |
| details | "Note by note. Measure by measure. Your walk-down song—not selected from a list, but composed from our conversation." | "Your walk-down song — composed from our conversation, not selected from a catalogue." |
| assumption | "I don't assume a cover will capture it. I create." | "A cover cannot hold what is yours alone. So I write it." |
| outcome | "Your love story, translated into sound." | "Your story, made audible." |
| annotation | "note by note" | "note by note" (unchanged) |

**Rationale**: "I compose" is more precise than "I create." "Disappear into the music" is clearer than "into your vision." The details are streamlined — one clean sentence instead of three fragments followed by a clause. The assumption line becomes a poetic statement rather than another "I don't assume" repetition.

### Movement III — THE REFINING

| Field | Current | Proposed |
|-------|---------|----------|
| action | "I refine" | "I refine" (unchanged) |
| quote | "I send you a first draft—raw, unpolished, honest." | "I send a first draft — unpolished, honest, yours to shape." |
| details | "Not to impress you. To ask: 'Does this sound like you?' If something feels off, we course-correct. Your feedback is not inconvenient—it is essential." | "Not to impress you — to ask: does this sound like us? Your feedback is not inconvenient. It is the whole point." |
| assumption | "I don't assume I got it right. I check." | "I would rather revise ten times than settle once." |
| outcome | "We iterate until it sounds exactly like you imagined." | "We refine until it sounds exactly as you imagined." |
| annotation | "until it feels right" | "until it's right" |

**Rationale**: "yours to shape" gives the couple agency. Changing "like you" to "like us" reinforces partnership. "It is the whole point" is stronger and more direct than "it is essential." The assumption line replaces the repetitive pattern with a commitment statement that communicates the same idea with more conviction.

### Movement IV — THE COMPLETING

| Field | Current | Proposed |
|-------|---------|----------|
| action | "We complete" | "We complete" (unchanged) |
| quote | "Now we fill the rest of the air together." | "Now we shape the rest of the day — together." |
| details | "Prelude. Procession. Cocktails. Dinner. You brainstorm, or I suggest—either way, we decide together. Communication all the way through. No one left wondering. No silence where there should be sound." | "Prelude. Procession. Cocktails. Dinner. You suggest, or I guide — either way, every decision is shared. No one left wondering. No silence where there should be sound." |
| assumption | "I don't assume you know what you need. I guide, and I ask." | "You lead. I follow. And when you need direction, I offer it." |
| outcome | "Every note intentional. Every decision yours." | "Every note chosen. Every moment accounted for." |
| annotation | "together" | "together" (unchanged) |

**Rationale**: "fill the rest of the air" is vague — "shape the rest of the day" is concrete. The details trim redundant phrasing ("Communication all the way through" is implied by "every decision is shared"). The assumption line becomes a clear power-dynamic statement: the couple leads, I support. "Every moment accounted for" adds the reassurance of thoroughness.

## Summary of Emotional Arc

The refined copy follows this progression across the four movements:

1. **Listening** — "I hear you before I play for you."
2. **Crafting** — "I build something that belongs only to you."
3. **Refining** — "I trust your ear more than mine."
4. **Completing** — "We finish this together — nothing left to chance."

Each card now lands in fewer words, avoids the repetitive "I don't assume" pattern, and reinforces the partnership narrative that differentiates this service from every other wedding musician.

## Files Modified

- `src/components/process/ProcessSection.tsx` — movements array data + bridge/statement text (copy only, no structural changes)

