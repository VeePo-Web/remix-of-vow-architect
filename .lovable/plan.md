

# Vertical-Specific Contact Pages — Bespoke, Frictionless, Conversion-Optimized

## Current State

- `/contact` exists as a weddings-only contact page with a long traditional form (9 fields + file upload + radio group)
- No `/events/contact` or `/teaching/contact` routes exist
- The full-screen menu hardcodes Contact to `/contact` for all verticals
- Current weddings form is functional but dense — not "bento" or tap-friendly

## Architecture

```text
/contact              → Weddings (existing — redesign in place)
/events/contact       → Events Contact (new)
/teaching/contact     → Teaching Contact (new)
```

---

## Design Philosophy: Bento Contact

Every contact page across all three verticals will use a **bento card interaction model** — large, tappable cards that progressively collect information in a conversational flow rather than a monolithic form wall. This reduces perceived friction, increases mobile usability, and makes the inquiry feel like a dialogue rather than a form submission.

### Shared UX Patterns

- **Progressive disclosure**: Step 1 (essentials) → Step 2 (details) → Step 3 (optional extras) — each step is a visual "card" that animates in
- **Bento tap-to-select**: Where appropriate, replace dropdowns and radio buttons with large tappable cards (e.g., occasion type, vibe selection, experience level)
- **Micro-reassurance**: Each step shows a small trust signal ("No obligation", "Two minutes", "Response within 24 hours")
- **Smart defaults**: Pre-fill where possible, mark truly optional fields clearly
- **Single-column on mobile**: No side-by-side fields on small screens
- **Sticky CTA**: The submit button remains visible as user scrolls through form steps
- **Success state**: Animated confirmation with clear next-steps and calendar add

---

## Page 1: `/contact` — Weddings (Redesign)

### Emotional Frame
"Every arrangement begins with a conversation." The weddings contact page is the altar of the website — the moment of commitment.

### Bento Form Structure (3 steps)

**Step 1 — "Tell me about your day"** (required essentials)
- Name (single field)
- Email
- Event date (date picker)
- Venue name

**Step 2 — "Shape the sound"** (bento tap cards)
- Ceremony vibe: 4 large tappable bento cards (Elegant Classical / Modern Love Songs / Indie Minimal / I Trust Your Ear) — each card has an icon, title, and one-line description. Selected state: golden border glow + subtle scale
- Guest count: 3 tappable range cards (Under 50 / 50–150 / 150+)

**Step 3 — "Anything else"** (optional, collapsible)
- Ceremony time
- Phone
- Planner email
- Song requests / notes (textarea)
- File upload (simplified drag zone)

### Sidebar (desktop only)
- 3 reassurance cards (redesigned as minimal icon + single line)
- SLA timeline (3-step micro version)
- 1 micro-testimonial

### CTA: "Hold my date"

---

## Page 2: `/events/contact` — Events

### Emotional Frame
"Every event begins with a conversation." Professional, warm, immediate.

### Bento Form Structure (2 steps — leaner than weddings)

**Step 1 — "Tell me about your gathering"**
- Name
- Email
- Event date
- Venue or location

**Step 2 — "The occasion"** (bento tap cards)
- Occasion type: 4 large tappable cards:
  - Private Dinner — "Intimate table, curated atmosphere"
  - Church Service — "Hymns, worship, and reverent piano"
  - Cocktail Reception — "Conversation-friendly, elegant"
  - Something Else — "Tell me about it"
- Duration: 3 cards (1 hour / 2–3 hours / 4+ hours)
- Optional notes textarea (collapsed by default, expandable)

### Sidebar
- 3 reassurance items: "No obligation", "Response within 24 hours", "Insured and self-sufficient"
- 1 events-specific micro-testimonial

### CTA: "Discuss your event"

---

## Page 3: `/teaching/contact` — Teaching

### Emotional Frame
"The first question I ask is never about music." Simple, low-stakes, hopeful. Per the questionnaire: "Simple and direct. Low stakes."

### Bento Form Structure (1 step — deliberately minimal)

**Single step — "Begin the conversation"**
- Name
- Email
- One open question: "What brought you to the piano?" (textarea, 3 rows)
  - Helper text: "A memory, a person, a song, a feeling — there is no wrong answer."

That is the entire form. Three fields. The simplicity IS the brand signal — mirroring the $60/hr flat rate philosophy. No occasion type, no duration, no file upload. Just a name, an email, and a reason.

### Below the form
- 3 small reassurance notes (not cards — just text with subtle icons):
  - "This is a conversation, not a commitment."
  - "Response within 24 hours."
  - "Currently accepting new students." (capacity signal, understated)

### CTA: "Begin the conversation"

---

## Technical Implementation

### New Files
- `src/pages/EventsContact.tsx` — single-file page with inline bento sections
- `src/pages/TeachingContact.tsx` — single-file page, deliberately minimal

### Weddings Contact Redesign
- Refactor `src/pages/Contact.tsx` to use a stepped bento layout with `useState` for step tracking
- Replace RadioGroup vibe selector with tappable bento cards
- Add guest count bento cards
- Collapse optional fields into expandable Step 3

### Shared Components
- Create `src/components/BentoSelector.tsx` — reusable tappable card grid component
  - Props: `items: { id, label, description, icon? }[]`, `value`, `onChange`, `columns?: 2 | 3 | 4`
  - Selected state: `border-primary/60 shadow-[0_0_12px_hsl(var(--vow-yellow)/0.15)]` + `scale-[1.02]`
  - Hover: `-translate-y-px` piano-key micro-lift
  - 180ms transition timing per brand standards

### Routing (`App.tsx`)
```
<Route path="/events/contact" element={<EventsContact />} />
<Route path="/teaching/contact" element={<TeachingContact />} />
```

### Navigation (`FullScreenMenu.tsx` + `MinimalHeader.tsx`)
Make Contact link vertical-aware:
```
const contactHref = isEvents ? '/events/contact'
  : isTeaching ? '/teaching/contact'
  : '/contact';
```

### Validation
- Weddings: Zod schema with friendly error messages (existing pattern)
- Events: Zod schema — name, email, date, venue required; occasion type required
- Teaching: Zod schema — name, email required; "what brought you" optional but encouraged

### Atmospheric Layering
All three pages share: hero background image at 10-15% opacity, Ken Burns, grain at 6%, breathing vignette, warm fog radial gradient. Each uses its vertical-appropriate hero image.

---

## Implementation Order

1. Create `BentoSelector` shared component
2. Create `/teaching/contact` page (simplest — 3 fields)
3. Create `/events/contact` page (2-step bento)
4. Redesign `/contact` (weddings) with 3-step bento layout
5. Add routes to `App.tsx`
6. Update `FullScreenMenu.tsx` and `MinimalHeader.tsx` for vertical-aware Contact links

