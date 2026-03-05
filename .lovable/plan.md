

# Plan: Build the Events Page — 8-Section Professional Architecture

## Context

Events covers romantic background piano for private dinners, church services, in-home catered gatherings, and intimate formal occasions. The tone is **professional and polished** — confident, clean, and elegant without the sacred/vigil weight of weddings or the warmth of teaching.

## Architecture

### Route & Gateway

- **`src/App.tsx`:** Add `/events` route pointing to new `Events.tsx` page. Add to `usePageTheme` death-theme list.
- **`src/pages/Gateway.tsx`:** Set Events card `available: true`.

### Page: `src/pages/Events.tsx`

Minimal shell matching Teaching pattern — imports 8 sections, `MinimalHeader`, `Footer`, `usePageTheme`.

### The 8 Sections

**Section 1: `EventsHero.tsx` — The Room Before the Music**
- Full-viewport hero. Rich black background. Atmospheric image (candlelit dining/piano setting) at 12-15% opacity.
- Tagline: "Every room has a sound it's waiting for."
- Role label: "Private Event Pianist" (uppercase, tracking-wide)
- Breathing scroll cue. Ken Burns drift. Grain + vignette overlays.
- Professional, confident — no vigil/sacred framing.

**Section 2: `EventsExhale.tsx` — The Recognition**
- Text-only. Dark background. Max-width 680px centered.
- Copy: "You are planning something that matters. A dinner where conversation deepens. A gathering where presence is felt. A moment that asks for more than a playlist. I understand what live music does to a room."
- Cormorant Garamond. Line-by-line stagger reveal.

**Section 3: `EventsOccasions.tsx` — The Occasions (What I Play For)**
- 4 occasion cards: Private Dinners, Church Services, Cocktail Receptions, Intimate Celebrations
- Each card: icon/image, title, 1-2 sentence description
- Grid layout (2x2 on desktop). Scroll-triggered stagger.
- Professional categorization — helps visitors self-identify their event type.

**Section 4: `EventsApproach.tsx` — The Approach (How I Work)**
- Shift to slightly warmer charcoal. Display question: "What should the room feel like?"
- 3-step process: Conversation → Curation → Delivery
- Clean, confident presentation — no sacred metaphors, just professional methodology.
- Brief description of how repertoire is tailored per event.

**Section 5: `EventsThreshold.tsx` — The Assurance (Mind-Reading)**
- 4 concern/resolution pairs relevant to event clients:
  - "Will it be too loud / too quiet?" → SPL-calibrated to your room
  - "Can you play [specific genre]?" → 500+ event repertoire across classical, pop, film, hymns
  - "What if the space is unusual?" → I've played living rooms, churches, rooftops, gardens
  - "Is this within our budget?" → Transparent pricing, no hidden fees
- Professional tone, not fear-based. More FAQ-style assurance.

**Section 6: `EventsExperience.tsx` — Past Events (Social Proof)**
- 2-3 event vignettes (placeholder content initially)
- Each: event type, brief narrative, pull quote from host
- Clean card layout. Warm neutral background.

**Section 7: `EventsOffering.tsx` — The Offering (Packages)**
- Framing: "How long do you need me there?"
- Three tiers: The Moment (1 hour), The Evening (2-3 hours), The Full Occasion (4+ hours)
- Middle tier marked "Most Selected." Cards with vow-yellow accents.
- CTAs link to `/contact`.

**Section 8: `EventsCrossing.tsx` — The Crossing (CTA)**
- Tagline bookend: "Every room has a sound it's waiting for."
- CTA: "Tell me about your event." (vow-yellow button)
- Anti-anxiety: "Response within 24 hours. Always." and "No obligation — just a conversation."

## Visual Standards

- **Palette:** Rich black dominant (hero/early sections), transitioning to warm charcoal then cream. Vow-yellow ≤6% for CTAs and accents.
- **Typography:** Cormorant Garamond for display, Inter for body. Same scale as other pages.
- **Tone difference from other pages:** No "sacred," "vigil," "covenant" language. Use "elegant," "intentional," "presence," "atmosphere."
- **Motion:** Same timing system (180ms hovers, 900ms reveals, reduced-motion fallbacks).

## Files to Create/Modify

**Create:**
- `src/pages/Events.tsx`
- `src/components/events/EventsHero.tsx`
- `src/components/events/EventsExhale.tsx`
- `src/components/events/EventsOccasions.tsx`
- `src/components/events/EventsApproach.tsx`
- `src/components/events/EventsThreshold.tsx`
- `src/components/events/EventsExperience.tsx`
- `src/components/events/EventsOffering.tsx`
- `src/components/events/EventsCrossing.tsx`
- `src/components/events/index.ts` (barrel export)

**Modify:**
- `src/App.tsx` — add `/events` route
- `src/pages/Gateway.tsx` — set Events `available: true`
- `src/hooks/usePageTheme.ts` — add `/events` to death-theme routes

**Generate (AI image):**
- `src/assets/events-hero.jpg` — candlelit piano/dining atmosphere image

