

# Phase 8: Visual UI/UX Upgrade + PianoKeyNav Consistency

This phase addresses three interconnected issues: (1) adding the PianoKeyNav to all content pages that currently lack it, (2) making the nav more visually clear with a persistent label, and (3) introducing Hickory & Rose-style editorial image bleeds into the Teaching page sections.

---

## Part A: PianoKeyNav on Missing Pages

**Pages currently WITH PianoKeyNav (12):** Index, Teaching, TeachingAbout, TeachingPricing, Events, EventsAbout, EventsPricing, Pricing, About, Proof, FAQ, Listen

**Pages currently WITHOUT PianoKeyNav (5 content pages):**
- `Contact.tsx` — has distinct sections (hero, form, trust stats)
- `TeachingContact.tsx` — has hero, form, trust stats
- `EventsContact.tsx` — has hero, form, trust stats
- `NotFound.tsx` — skip (single-section page)
- Policy pages (Privacy, Terms, Cookie, Accessibility, Legal) — skip (legal/text-heavy, nav would add noise)
- `Gateway.tsx` — skip (landing chooser, single viewport)

**Action:** Add PianoKeyNav to the 3 Contact pages with appropriate section IDs and labels. Each contact page has at minimum a hero, form area, and footer CTA.

### Contact.tsx sections:
```
{ id: "contact-hero", label: "Welcome", isBlackKey: false }
{ id: "contact-form", label: "Your Details", isBlackKey: true }
{ id: "contact-trust", label: "What to Expect", isBlackKey: false }
```

### TeachingContact.tsx sections:
```
{ id: "tc-hero", label: "Get in Touch", isBlackKey: false }
{ id: "tc-form", label: "Your Details", isBlackKey: true }
{ id: "tc-trust", label: "What to Expect", isBlackKey: false }
```

### EventsContact.tsx sections:
```
{ id: "ec-hero", label: "Get in Touch", isBlackKey: false }
{ id: "ec-form", label: "Event Details", isBlackKey: true }
{ id: "ec-trust", label: "What to Expect", isBlackKey: false }
```

Each page needs: (1) import PianoKeyNav, (2) define sections array, (3) add `<PianoKeyNav sections={sections} />`, (4) add matching `id` attributes to the relevant section wrapper `<div>` or `<section>` elements.

---

## Part B: Make PianoKeyNav Clearer

The current nav is abstract 3D piano keys on the right edge with tooltips only on hover. Users may not understand what the small shapes are. Two improvements:

### B1. Add a persistent "Sections" micro-label
- Add a small rotated label ("Sections" or "Navigate") below the key rail, visible when the nav is visible, using `writing-mode: vertical-rl` and the overline/meta typography style.
- Styled in `ink-soft` at ~10px, uppercase tracking-widest, positioned below the last key.

### B2. Show active section label persistently
- When a section is active (scrolled into view), show its tooltip label permanently (not just on hover) in a subtle `ink-soft` color. On hover of other keys, the hovered tooltip takes precedence.
- Modify `PianoKeyNav.tsx`: the tooltip for the active key gets class `piano-key-tooltip--active-persistent` that keeps it visible at reduced opacity (~0.6) even without hover.

### Files to modify:
- `src/components/PianoKeyNav.tsx` — add "Sections" label element + persistent active tooltip logic
- `src/index.css` — add `.piano-key-tooltip--active-persistent` styles and the rotated label styles

---

## Part C: Editorial Image Bleeds on Teaching Page

Hickory & Rose uses full-bleed editorial photography that breaks out of the content container — large images that span edge-to-edge or asymmetrically overflow. Currently the Teaching page is mostly text-heavy with minimal imagery.

### C1. TeachingExhale — Add a side-bleed image
- After the word-by-word reveal text, add a `GoldCornerImage` with the existing `teaching-bench.jpg` asset, positioned as a right-bleed element that extends past the content container on desktop (using negative margins or `calc(50% - 50vw)` pattern).
- On mobile, the image becomes full-width with a subtle Ken Burns animation.

### C2. TeachingPillars — Add an editorial image between pillars II and III
- Insert a full-bleed `teaching-keys.jpg` image that breaks the text rhythm, similar to H&R's "ceremony setup" interstitial. Uses the `GoldCornerImage` component with `aspectRatio: "16/9"` and full viewport width via `w-screen -mx-[calc(50vw-50%)]`.

### C3. TeachingStories — Add portrait images alongside student narratives
- Each story card gets a small editorial image (using existing assets or placeholder). The image sits asymmetrically — left-aligned for odd stories, right-aligned for even — creating an editorial magazine feel.

### C4. TeachingMethodology — Add a background texture image
- The dark "First Conversation" section gets a subtle background image (the bench or keys image at very low opacity ~0.08) to add depth without overwhelming the text.

### Files to modify:
- `src/components/teaching/TeachingExhale.tsx` — add image bleed after text
- `src/components/teaching/TeachingPillars.tsx` — add interstitial image
- `src/components/teaching/TeachingStories.tsx` — add editorial images
- `src/components/teaching/TeachingMethodology.tsx` — add background texture

### Image assets to use (already in project):
- `src/assets/teaching-bench.jpg`
- `src/assets/teaching-keys.jpg`
- `src/assets/sound-keys.jpg` (for stories)
- `src/assets/sound-keys-intimate-ai.jpg` (for methodology background)

---

## Summary of Files

| File | Changes |
|------|---------|
| `src/pages/Contact.tsx` | Add PianoKeyNav + section IDs |
| `src/pages/TeachingContact.tsx` | Add PianoKeyNav + section IDs |
| `src/pages/EventsContact.tsx` | Add PianoKeyNav + section IDs |
| `src/components/PianoKeyNav.tsx` | Persistent active label + "Sections" micro-label |
| `src/index.css` | New tooltip persistence styles |
| `src/components/teaching/TeachingExhale.tsx` | Side-bleed image |
| `src/components/teaching/TeachingPillars.tsx` | Interstitial full-bleed image |
| `src/components/teaching/TeachingStories.tsx` | Editorial side images |
| `src/components/teaching/TeachingMethodology.tsx` | Background texture image |

