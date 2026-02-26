

# Round 33 — Top Navigation Bar: Fantasy.co-Level Header Refinement

## Current State Assessment

The Piano Key section navigator is now polished (Rounds 30-32). The remaining navigation component that needs elevation is the **top header bar** (`MinimalHeader`) and the **full-screen menu overlay** (`FullScreenMenu`). These are functional but lack the bespoke, world-class micro-interactions and brand-integrated details that Fantasy.co exemplifies.

### Identified Gaps

1. **Header nav links are generic** — Plain `<Link>` elements with basic fade-in. No active page indicator, no hover underline draw, no brand-specific interaction.

2. **Full-screen menu lacks page indicators** — The menu shows 5 items but doesn't highlight which page you're currently on. No active state feedback.

3. **Full-screen menu is missing pages** — Only lists Home, Services, About, Case Studies, Contact. Missing Pricing, FAQ, Proof, Listen pages that exist in the router.

4. **No header active page indicator** — When on `/about`, the "About" nav link looks identical to all others. No visual cue for current page.

5. **Menu items lack hover micro-interaction** — Fantasy.co menus have a distinctive "push" effect where hovered items shift slightly while non-hovered items dim. Current menu has only color change.

6. **Mobile sticky bar has no page awareness** — The bottom bar is identical on every page with no contextual adaptation.

---

## Implementation Plan (5 Steps)

### Step 1: Add Active Page Indicator to Header Nav Links

**Files:** `src/components/MinimalHeader.tsx`

Replace plain `<Link>` elements with `react-router-dom`'s `NavLink` (the router one, not the custom wrapper). When on the current page, add:
- A vow-yellow underline that draws in from center (same draw animation used in hero tagline)
- Slightly brighter text color (`text-foreground` instead of `text-muted-foreground`)

For the "Hold My Date" CTA, when already on `/contact`, change text to "You're here" with reduced glow -- acknowledging the user's presence rather than pushing them to a page they're already on.

### Step 2: Complete the Full-Screen Menu Page List

**File:** `src/components/FullScreenMenu.tsx`

Update `menuItems` to include all navigable pages in brand-appropriate order:
```
01 — Home (/weddings)
02 — Pricing (/services)
03 — About (/about)
04 — Proof (/proof)
05 — FAQ (/faq)
06 — Listen (/listen)
07 — Contact (/contact)
```

This matches the site's complete page list. "Case Studies" and "Gallery" routes are consolidated. Each item gets the numbered treatment already in place.

### Step 3: Active Page State in Full-Screen Menu

**File:** `src/components/FullScreenMenu.tsx`

Use `useLocation()` from react-router-dom to detect current page. For the active menu item:
- Number color shifts to `vow-yellow` (from muted)
- A thin golden dash appears to the left of the number (4px wide, 1px tall, vow-yellow)
- Label text is slightly brighter
- Non-active items remain at current styling

This gives immediate orientation — "you are here" — before the user navigates elsewhere.

### Step 4: Fantasy.co-Style Menu Hover Dimming

**File:** `src/components/FullScreenMenu.tsx`

Implement a collective hover behavior: when ANY menu item is hovered, all OTHER items dim to 30% opacity. The hovered item stays at full opacity with the existing color shift. This creates the "spotlight" effect Fantasy.co uses — drawing focus to the hovered item while creating visual depth.

Add a `hoveredIndex` state. On hover of item `i`, set `hoveredIndex = i`. All items with `index !== hoveredIndex` get `opacity-[0.3]`. Transition: `180ms ease`. On mouse leave from the nav container, reset `hoveredIndex` to `null` (all items return to full opacity).

### Step 5: Header Scroll Transition Polish

**File:** `src/components/MinimalHeader.tsx`

Refine the header's scroll state transition to be more cinematic:
- Add a 1px golden thread at the header bottom that fades in over 450ms (currently abrupt)
- Nav links stagger-in should use the brand's timing: 80ms intervals instead of 60ms
- When scrolling back UP past the hero, nav links should fade out in reverse order (last to first) before the header expands -- creating a "closing" sequence that mirrors the opening

---

## Files Modified Summary

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `MinimalHeader.tsx` | Active page indicator via NavLink + underline draw |
| 2 | `FullScreenMenu.tsx` | Complete page list (7 items) |
| 3 | `FullScreenMenu.tsx` | Active page golden dash + brighter label via useLocation |
| 4 | `FullScreenMenu.tsx` | Collective hover dimming (spotlight effect) |
| 5 | `MinimalHeader.tsx` | Refined scroll transitions and timing |

## What This Achieves

- **Orientation:** Users always know which page they're on, whether viewing the header, the full-screen menu, or the mobile bar
- **Completeness:** All 7 navigable pages are accessible from the menu — no hidden pages
- **Fantasy.co polish:** The collective hover dimming and staggered transitions create the cinematic, intentional feel that distinguishes world-class navigation from functional navigation
- **Brand coherence:** Vow-yellow active indicators extend the golden thread motif from the piano key nav into the top navigation — unified visual language across both nav systems

