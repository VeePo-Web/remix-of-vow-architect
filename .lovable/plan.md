

# About Pages for All Three Verticals — Round 8

## Current State

- `/about` exists and renders the "Witness" page (6 sections, weddings-focused)
- `/events` and `/teaching` have full landing pages but **no dedicated About pages**
- The nav header hardcodes `{ to: "/about", label: "About" }` for all verticals
- Brand identity docs exist for all three verticals with distinct positioning, voice, and messaging

## Architecture

Create two new About pages (`/events/about` and `/teaching/about`) that follow the same 6-act structure as the existing Witness page but with vertical-specific content, copy, and emotional tone. The existing `/about` remains the weddings About page.

```text
/about              → Weddings (existing Witness page, no changes)
/events/about       → Events About page (new)
/teaching/about     → Teaching About page (new)
```

## New Page: `/events/about` — "The Presence"

Emotional arc: Professional confidence, atmospheric mastery, room-reading intuition.

### Section Structure (6 acts, mirroring Witness page)

1. **Hero — "The Atmosphere"**: Headline: "I don't play at events. I listen to them." Background: events-hero or atmospheric venue image at 15% opacity, vibrating golden string, same cinematic layering.

2. **Origin — "The Room"**: Asymmetric two-column. Story: "I played a corporate dinner where the playlist was so loud no one could hear themselves think. That night I understood — live music should listen to the room, not fill it." Golden thread separator + italic quote.

3. **Sustain — "Three Principles"**: Three editorial nodes — Atmosphere ("I shape the feeling of being together"), Adaptability ("Your event, your sound"), Presence ("Present without performing"). Same SVG node visualization.

4. **Presence — "500+ Events"**: Same big number treatment with "500+" and "events performed." Witnessed moments adapted: "The CEO who teared up during the holiday dinner", "The church congregation that sang along without being asked", "The cocktail hour where strangers became friends over shared silence", "The private dinner where the host said 'the piano made the room'", "The reception where I played four hours and no one noticed the music — only the feeling", "The farewell gathering where one song said what words could not."

5. **Covenant — "My Promise to You"**: Certificate with events-specific promises: "I will arrive before your first guest.", "I will read the room before I play a note.", "I will adapt to the energy, not impose my own.", "I will be present without performing.", "I will leave no trace but the memory of how the room felt."

6. **Crossing — CTA**: "Your event deserves presence." Subtext: "Tell me about your gathering — the venue, the guests, the feeling you want in the room. I will show you how live piano transforms it." CTA: "Discuss your event" → `/contact`.

### Component Structure
- Create `src/components/events-about/` directory with: `EventsAboutHero.tsx`, `EventsAboutOrigin.tsx`, `EventsAboutSustain.tsx`, `EventsAboutPresence.tsx`, `EventsAboutCovenant.tsx`, `EventsAboutCrossing.tsx`, `index.ts`
- Create `src/pages/EventsAbout.tsx`

---

## New Page: `/teaching/about` — "The Bench"

Emotional arc: Patience, presence, the quiet courage of sitting beside someone as they discover their voice.

### Section Structure (6 acts)

1. **Hero — "The Bench"**: Headline: "I don't teach piano. I sit beside you until it sounds like you." Background: teaching-bench image at 15% opacity. Warm tone, golden string visualization.

2. **Origin — "The First Note"**: Story: "I watched a student play their first chord after six months of patience — not because they couldn't learn faster, but because they needed to hear it when they were ready. That silence before the sound taught me more about teaching than any method book ever could."

3. **Sustain — "Three Beliefs"**: Three nodes — Patience ("The most active form of attention"), Conversation ("The first question I ask is never about music"), Expression ("The instrument is not something to conquer — it is something to converse with").

4. **Presence — "17 Years"**: Big number: "17" with "years at the keys." Witnessed moments: "The adult who was told it was 'too late' — and played at their own wedding", "The child who hated practice until they chose their own song", "The intermediate player who could read notes but couldn't yet speak through them", "The student who played for their dying grandmother — the only goodbye that mattered", "The couple who learned a duet for their anniversary", "The teenager who found in the piano what words could not express."

5. **Covenant — "My Promise to You"**: "I will never rush your pace.", "I will ask before I assume.", "I will sit beside you as long as it takes.", "I will not pretend it sounds right before it does.", "I will remember why you started when you forget."

6. **Crossing — CTA**: "The first question I ask is never about music." Subtext: "Tell me what brought you to the piano — a memory, a person, a feeling you want to find again. We begin with a conversation." CTA: "Begin the conversation" → `/contact`.

### Component Structure
- Create `src/components/teaching-about/` directory with: `TeachingAboutHero.tsx`, `TeachingAboutOrigin.tsx`, `TeachingAboutSustain.tsx`, `TeachingAboutPresence.tsx`, `TeachingAboutCovenant.tsx`, `TeachingAboutCrossing.tsx`, `index.ts`
- Create `src/pages/TeachingAbout.tsx`

---

## Routing Changes (`App.tsx`)

Add two new routes:
```
<Route path="/events/about" element={<EventsAbout />} />
<Route path="/teaching/about" element={<TeachingAbout />} />
```

## Navigation Changes (`MinimalHeader.tsx`)

Make the "About" nav link vertical-aware:
- On `/events` or `/events/*` routes → link to `/events/about`
- On `/teaching` or `/teaching/*` routes → link to `/teaching/about`
- All other routes → link to `/about` (weddings default)

## Technical Approach

Each new About component reuses the same atmospheric layering patterns (grain, vignette, Ken Burns, breathing glow, golden threads) and animation system (`useScrollReveal`, `cn()` reveal classes, `transition-all duration-700`). The Covenant certificate, SVG visualization, and big number treatment are structurally identical — only copy, imagery, and color temperature differ. This ensures brand cohesion while respecting each vertical's distinct identity.

All accessibility patterns carry forward: `aria-label` on sections, `motion-reduce:animate-none`, lazy-loaded images, semantic heading hierarchy.

## Implementation Order

1. Create Events About components + page (6 components + page + index)
2. Create Teaching About components + page (6 components + page + index)
3. Add routes to `App.tsx`
4. Update `MinimalHeader.tsx` nav link to be vertical-aware

