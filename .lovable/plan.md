## Goal

Port the Fly4Me-tier mobile conversation flow (already shipped on `/contact`) to **`/teaching/contact`** and **`/events/contact`**. Each gets its own copy, hero strip image, and CTA wording — desktop stays byte-identical on both.

## Approach

Parametrize the existing `ContactConversation` component once, then mount it inside the mobile branch of each page. No new patterns invented — just configuration + vertical-specific copy.

### 1. Generalize `ContactConversation.tsx`

Add a typed `vertical` config prop so the component is reusable:

```ts
type Vertical = "weddings" | "events" | "teaching";

interface ContactConversationProps {
  vertical: Vertical;
  onSubmitted: () => void;
}

interface VerticalCopy {
  strapEyebrow: string;     // "Wedding Piano" | "Events Piano" | "Piano Mentorship"
  strapMeta: string;        // "Canmore · Alberta" (shared) — keep as default
  heroImg: string;          // imported asset per vertical
  headline: string;         // mobile h1
  subhead: string;          // "Tell me one thing at a time." (shared default)
  steps: StepKey[];         // field order
  labels: Record<StepKey,string>;
  placeholders: Record<StepKey,string>;
  hints: Partial<Record<StepKey,string>>;
  ctaLabel: string;         // "Reserve my date" | "Begin the conversation" | "Start the conversation"
  reassurance: string;      // "I respond within 24 hours."
}
```

Build a `VERTICALS: Record<Vertical, VerticalCopy>` map and select inside the component. Existing weddings copy moves into that map — behavior unchanged.

### 2. Per-vertical copy

**Weddings** (no change, already shipped):
- Hero: `contact-hero.jpg`
- H1: "What deserves the song?"
- Steps: name → email → ceremony → date → venue
- CTA: "Reserve my date"

**Events:**
- Hero: `events-performer-bw.png`
- Eyebrow: "Events Piano"
- H1: "What's the occasion?"
- Steps: name → email → occasion (textarea) → date → venue (or guest count)
- Labels: `occasion: "The gathering"`, `date: "Date"`, `venue: "Venue / room"`
- Placeholders: `occasion: "Corporate evening, gala, private party — and the energy you want."`
- CTA: "Begin the conversation"
- Submit payload: `vertical: "events"`, message = `occasion + date + venue` concatenated

**Teaching:**
- Hero: `events-stage-warmlight.png`
- Eyebrow: "Piano Mentorship"
- H1: "What pulled you to the piano?"
- Steps: name → email → context (textarea) → level → goal
  - `context`: "A song you love, a goal you have, or just curiosity."
  - `level`: "New, returning, or somewhere between" (optional)
  - `goal`: "What you want to be playing in a year" (optional)
- CTA: "Begin the conversation"
- Submit payload: `vertical: "teaching"`, message = `context + level + goal`

Voice rule from project memory: teaching copy stays grounded and concrete — no mystical/abstract prose.

### 3. Wire into pages

In both `src/pages/EventsContact.tsx` and `src/pages/TeachingContact.tsx`, mirror the pattern from `Contact.tsx`:

- Wrap `<PricingNav />` in `hidden md:block`.
- Add `<div className="md:hidden"><ContactConversation vertical="events|teaching" onSubmitted={…} /></div>` before the existing `<main>`.
- Wrap existing `<main>`, `<Footer />`, `<MobileStickyBar />` in `hidden md:block`.

No edits to `<main>` body — desktop remains pixel-identical.

### 4. CSS

Zero new CSS — the entire `.cv-*` block already exists and is vertical-agnostic. The hero image is passed as a prop; the rest is tokenized off `--pricing-surface` / `--rich-black` which all three pages share.

### 5. Tiny refactor of the existing weddings call site

`<ContactConversation onSubmitted={…} />` becomes `<ContactConversation vertical="weddings" onSubmitted={…} />`. Behavior unchanged.

## Files

- **Edit:** `src/components/contact/ContactConversation.tsx` — add `vertical` prop + `VERTICALS` config map, replace inlined copy/hero with `cfg.*` lookups, route message-assembly per vertical.
- **Edit:** `src/pages/Contact.tsx` — pass `vertical="weddings"`.
- **Edit:** `src/pages/EventsContact.tsx` — mobile/desktop branch.
- **Edit:** `src/pages/TeachingContact.tsx` — mobile/desktop branch.

## Out of scope

- Desktop layouts on all three pages.
- New copy beyond what's listed above; we lift placeholders straight from each current page where they exist.
- `send-contact-email` edge function (unchanged contract: `{ name, email, message, vertical }`).
- Success state (`ContactCelebration` already handles all three verticals).

## Acceptance

1. `/teaching/contact` on iPhone 12 (390×844) shows the warm-light hero strip, "Piano Mentorship" eyebrow, "What pulled you to the piano?" headline, and the conversation flow with teaching-specific steps. CTA reads "Begin the conversation".
2. `/events/contact` shows the B&W performer strip, "Events Piano" eyebrow, "What's the occasion?" headline, and events-specific steps. CTA reads "Begin the conversation".
3. Submitting on each page calls `send-contact-email` with the correct `vertical` and a message containing the textarea + optional steps concatenated.
4. Desktop (≥768px) on both pages is unchanged.
5. Draft persistence keys are scoped per vertical (`vow:contact:draft:teaching`, etc.) so switching pages doesn't bleed answers across.

Confirm and I'll build it.
