

# Pricing Pages for All Three Verticals

## Current State

- `/pricing` exists as a comprehensive weddings pricing page (9 sections: hero, inclusions, 3 tier cards, add-ons, comparison, testimonials, FAQ, download, CTA)
- Events landing page has an `EventsOffering` component (3 tiers by duration, no dollar amounts)
- Teaching landing page has a `TeachingOffering` component ($60/hr flat rate with scroll-linked reveal)
- No dedicated `/events/pricing` or `/teaching/pricing` routes exist
- `MinimalHeader` nav hardcodes `{ to: "/pricing", label: "Services" }` for all verticals

## Architecture

```text
/pricing              → Weddings (existing, no changes)
/events/pricing       → Events Pricing (new)
/teaching/pricing     → Teaching Pricing (new)
```

---

## New Page: `/events/pricing`

### Pricing Model (from brand docs)
Three presences — not packages. No specific dollar amounts in brand docs; pricing philosophy is "transparent, quote after conversation." Display duration-based tiers with "Request a proposal" CTA rather than fixed prices.

### Section Structure (6 sections, leaner than weddings)

1. **Hero** — "How long do you need me there?" Background: events-hero image, same atmospheric layering. Overline: "The Offering." Subtitle: "Three presences — not packages. The question is not what you get, but how long you need me there."

2. **What Every Presence Includes** — Reusable inclusion block adapted for events: pre-event consultation, repertoire curation, early arrival and self-sufficient setup, real-time room-reading and adaptation, insured and professional presence, zero-footprint teardown.

3. **Three Presences** — Cards without dollar amounts, framed by duration:
   - **The Moment** (1 hour) — "Focused, intentional piano for the part of your event that matters most."
   - **The Evening** (2-3 hours, Most Selected) — "Full coverage from arrival through dinner. Repertoire shifts with the energy of the room."
   - **The Full Occasion** (4+ hours) — "Complete musical direction for extended events."
   - Each card: CTA "Request a proposal" → `/contact`
   - Below cards: "After our conversation, I provide a clear quote reflecting duration, occasion, and any specific requirements. No surprises."

4. **What Sets Live Piano Apart** — Comparison table: Me vs Playlist vs DJ vs Band (from brand identity differentiator table). Columns: Room-reading, Volume control, Setup footprint, Conversation-friendly, Repertoire, Presence.

5. **Questions** — Events-specific FAQ: "Do you bring your own piano?", "Can you learn a specific song?", "What if the event runs longer?", "Do you take breaks?", "Are you insured?"

6. **Crossing CTA** — "Every event begins with a conversation." CTA: "Discuss your event" → `/contact`. "Response within 24 hours. Always."

### Component Structure
- `src/pages/EventsPricing.tsx` — page shell with PianoKeyNav
- Reuses existing components where possible (`MostSelectedPill`, `Card`, `RevealOnScroll`, `StaggerChildren`, `PricingFAQ` pattern)
- Events-specific FAQ data inline (no reuse of wedding FAQ)

---

## New Page: `/teaching/pricing`

### Pricing Model (from brand docs)
Flat rate: $60 per hour. No tiers. No packages. No upselling. "One rate. One hour. One bench." The simplicity IS the signal.

### Section Structure (5 sections — deliberately minimal)

1. **Hero** — "One rate. One hour. One bench." Background: teaching-bench image. Overline: "The Offering." The simplicity of the pricing is the hero statement itself.

2. **The Price** — Single centered statement. "$60 per hour" in large display type (Cormorant Garamond). Below: "No packages. No commitments. One conversation at a time." Anti-anxiety microcopy: "The first session begins with a question, not a scale."

3. **What Every Hour Includes** — Clean list (not cards): One-to-one mentorship (never group), Expression-focused methodology, Repertoire chosen together, In-person (Calgary) or virtual, Response within 24 hours.

4. **The Mind-Reading Section** — 3-4 fear/resolution pairs adapted for pricing context:
   - "Is this worth the investment?" → resolution from brand doc
   - "What if I start and quit again?" → resolution
   - "What if I'm too old to start?" → resolution
   This addresses the conversion barrier directly on the pricing page.

5. **Crossing CTA** — "The first question I ask is never about music." CTA: "Begin the conversation" → `/contact`. Below: "This is a conversation, not a commitment."

### Component Structure
- `src/pages/TeachingPricing.tsx` — page shell with PianoKeyNav
- Deliberately sparse — the absence of tiers IS the brand signal
- Reuses `useScrollReveal`, `RevealOnScroll`, atmospheric layering patterns

---

## Routing Changes (`App.tsx`)

Add two new routes:
```
<Route path="/events/pricing" element={<EventsPricing />} />
<Route path="/teaching/pricing" element={<TeachingPricing />} />
```

## Navigation Changes (`MinimalHeader.tsx`)

Make the "Services" nav link vertical-aware (same pattern as About):
```
const pricingTo = pathname.startsWith('/events') ? '/events/pricing'
  : pathname.startsWith('/teaching') ? '/teaching/pricing'
  : '/pricing';
```

## Implementation Order

1. Create Events Pricing page (single file, inline sections — no separate component files needed for a leaner page)
2. Create Teaching Pricing page (single file, deliberately minimal)
3. Add routes to `App.tsx`
4. Update `MinimalHeader.tsx` nav link to be vertical-aware for pricing

