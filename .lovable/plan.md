

# Navigation Menu — Luxury Clarity Audit & Restructure

## Core Problem

The full-screen menu is **confusing** because it presents 9 items in a flat list mixing three different concerns:
- **Verticals** (Weddings, Teaching, Events) — these are different businesses
- **Vertical-specific pages** (Services, About, Contact) — these change per vertical
- **Shared utility pages** (Proof, FAQ, Listen) — these are cross-vertical

A visitor on `/teaching` sees "Weddings" and "Events" at the same level as "FAQ" and "Listen." There is no visual hierarchy distinguishing "choose a service" from "navigate within your current service." The numbered 01–09 pattern reinforces flatness — every item appears equal.

## What Feels Cheap

1. **Numbered items (01–09)** — portfolio-site cliche. No luxury brand numbers their nav items. Remove entirely.
2. **Flat 9-item list with no grouping** — overwhelming. A user looking for pricing has to scan past "Weddings, Teaching, Events" to find "Services" at position 04. Cognitive load is high.
3. **"Services" label** — generic. On a wedding site this should say "Offerings" or "Pricing." On teaching, "Lessons." The label doesn't adapt to vertical context.
4. **MobileStickyBar CTA always links to `/contact`** — should route to vertical-specific contact page (`/events/contact`, `/teaching/contact`).
5. **No visual separation between vertical navigation and page navigation** — everything blends together.

## Restructured Menu Architecture

Split the menu into two clear zones:

**Zone 1: "The Three Paths" — Vertical Selection (top)**
Three items displayed as a horizontal or stacked triptych:
- Weddings
- Private Events  
- Piano Mentorship

The current vertical is indicated with the golden underline. The other two are dimmed. This establishes "where am I" immediately.

**Zone 2: "Within This Path" — Page Navigation (below, separated by golden thread)**
Contextual links for the current vertical:
- Offerings *(vertical-specific pricing)*
- About
- Proof
- FAQ
- Listen
- Contact

These 6 items are the pages within whichever vertical is active. No numbers. Clean labels.

## Implementation — 2 Files

### `src/components/FullScreenMenu.tsx`
- Remove `number` property from menu items
- Split `getMenuItems` into two groups: `verticals` (3 paths) and `pages` (6 contextual links with vertical-aware hrefs)
- Render verticals as a compact horizontal group at top with `text-lg` — the active one has golden underline, others at 40% opacity
- Render a 1px golden thread separator
- Render page links below as the main nav items (keep piano-key interaction, remove numbers)
- Reduce from 9 large items to 6 — less overwhelming, clearer purpose

### `src/components/MobileStickyBar.tsx`
- Fix CTA `Link to` to use vertical-aware contact path: `/events/contact` when on events, `/teaching/contact` when on teaching, `/contact` otherwise

## Detailed Menu Item Mapping

```text
ZONE 1 — The Three Paths (compact, horizontal)
┌─────────────┬──────────────┬─────────────────┐
│  Weddings   │   Events     │  Piano Lessons  │
│  (active)   │   dimmed     │     dimmed       │
└─────────────┴──────────────┴─────────────────┘
          ── golden thread ──

ZONE 2 — This Path (main nav, large type)
  Offerings          → /pricing | /events/pricing | /teaching/pricing
  About              → /about | /events/about | /teaching/about
  Proof              → /proof
  FAQ                → /faq
  Listen             → /listen
  Get in Touch       → /contact | /events/contact | /teaching/contact
```

## Copy Changes
- "Services" → "Offerings" (brand voice — sacred, not commercial)
- "Contact" → "Get in Touch" (warmer, first-person adjacent)
- "Teaching" → "Piano Lessons" in the vertical selector (clearer for visitors)

## What We Keep
- Piano-key depression physics (1px hover, 2px press)
- Golden underline draw on hover/active
- Spotlight dimming (hoveredIndex dims others to 20%)
- Staggered entrance timing (60ms per item)
- Atmospheric layers (grain, vignette, candlelight)
- Vine thread separator
- Contact info and covenant bookend at bottom
- Close button, escape key, focus trap

