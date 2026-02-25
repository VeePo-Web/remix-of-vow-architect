

# Gateway Refinement -- Golden Thread Connector and Staggered Reveal Choreography

## Audit Finding

Two opportunities surfaced during this audit cycle:

### 1. Missing Visual Hierarchy Between Cards (The "Golden Thread")

The three cards currently float as isolated rectangles with no visual relationship to one another. World-class agency work (Fantasy, Pentagram) uses connective tissue -- subtle lines, shared geometry, or visual threads -- to signal that disparate elements belong to a unified system. The brand document explicitly calls for "golden threads connecting moments."

**The fix:** Add a thin horizontal golden line (1px, vow-yellow at 15% opacity) that runs behind the cards on desktop, vertically centered. On mobile, this becomes a vertical thread. This is purely decorative (`aria-hidden`), positioned absolutely behind the card container, and fades in with the last card's animation delay. It creates the subliminal impression that the three services are branches of a single trunk -- Parker's artistry.

### 2. Card Hover Lacks a Directional Arrow Affordance

The Weddings card says "Enter" but has no visual cue that it leads somewhere. The "Coming Soon" cards have no differentiation beyond dimmed text. A small directional arrow (a simple CSS-drawn chevron or Unicode arrow) that slides in on hover for the active card would provide:
- Clear affordance that this is a navigational element
- Motion choreography that feels intentional (180ms, matching brand timing)
- A detail that separates this from a static poster and makes it feel interactive

**The fix:** On hover of available cards, animate a small right-arrow (`\u2192`) sliding 8px from the left alongside the "Enter" text. Uses `translate-x` and `opacity` transition at 180ms. No arrow appears on unavailable cards.

---

## Specifications

### Golden Thread
- Element: `div` with `position: absolute`, 1px height (desktop) or 1px width (mobile)
- Color: `hsl(var(--vow-yellow) / 0.15)`
- Desktop: horizontal, vertically centered in the card container, full width minus 48px padding
- Mobile: vertical, horizontally centered, full height of card container
- Animation: fades in at 1400ms delay (same as footer), 600ms duration
- `aria-hidden="true"`, `pointer-events: none`

### Directional Arrow on Hover
- Character: `\u2192` (right arrow)
- Default state: `opacity-0 -translate-x-2`
- Hover state: `opacity-100 translate-x-0`
- Transition: 180ms ease-out (matches brand hover timing)
- Only rendered when `s.available === true`

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Add golden thread connector element behind cards; add arrow affordance to "Enter" label on available cards |

## What Stays Unchanged

All routing, mobile flex layout, parallax, semicolon breathing, animation timings, and desktop aspect ratios remain exactly as they are.

