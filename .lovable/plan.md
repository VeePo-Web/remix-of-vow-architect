

# Piano Key Nav — Atmospheric Depth Pass

The structural, label, interaction, and motion work is complete. This pass addresses **atmospheric texture** — the subtle material qualities that separate a functional component from one that feels like a physical object in the ceremony space.

## Refinements

### 1. White Key Ivory Texture
Currently white keys use a flat `hsl(var(--foreground) / 0.06)` — a single transparent layer. Real ivory piano keys have a subtle vertical grain. Add a barely-visible linear gradient noise pattern using a CSS repeating-linear-gradient to simulate this, at 2% opacity. This gives the keys a tactile "material" quality without any image assets.

**File:** `src/index.css` — `.piano-key` base rule
- Add `background-image: repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(var(--foreground) / 0.015) 2px, hsl(var(--foreground) / 0.015) 3px)` layered behind the base background

### 2. Black Key Glossy Highlight Stripe
Real ebony keys have a thin reflective strip along the top. Add a `::before` pseudo-element to `.piano-key--black` — a 1px tall, 60% width, centered bar at 6% foreground opacity. This is purely atmospheric and adds dimensionality.

**File:** `src/index.css` — new `.piano-key--black::before` rule

### 3. Active Key Inner Glow
The active state currently has an external box-shadow and border-left. Add an `inset` box-shadow component — `inset 0 0 8px hsl(var(--vow-yellow) / 0.06)` — so the key appears to glow from within, not just be illuminated from outside. This matches the "candle within" metaphor.

**File:** `src/index.css` — `.piano-key--active` rule, add inset shadow to existing box-shadow

### 4. Tablet Key Proportion Fix
The tablet breakpoint (768-1279px) reduces keys to 36x32 and 24x22. The thread position (`right: 24px`) doesn't adjust, so it misaligns on tablets. Fix to `right: 18px` at this breakpoint.

**File:** `src/index.css` — add `.piano-key-thread` override inside the existing tablet media query

### 5. Tooltip Active State Differentiation
When hovering the currently active key, the tooltip should show with a vow-yellow left border and slightly brighter text — distinguishing "you are here" from "go here." Currently active and inactive tooltips look identical.

**File:** `src/index.css` — add `.piano-key--active + .piano-key-tooltip` or handle via a new class in `PianoKeyNav.tsx`
**File:** `src/components/PianoKeyNav.tsx` — add `piano-key-tooltip--active` class when `isActive`

---

## Files Modified
1. `src/index.css` — ivory texture, black key highlight stripe, active inner glow, tablet thread fix, active tooltip style
2. `src/components/PianoKeyNav.tsx` — active tooltip class

