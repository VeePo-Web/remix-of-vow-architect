# THE CEREMONY ARCH — Bespoke Navigation System Prompt

## A North Star Architecture Document for Parker Gawryletz's Navigation Experience

---

## I. THE SINGULAR TRUTH OF NAVIGATION

Navigation on this site is not a menu. It is a **threshold** — the architectural frame through which every visitor crosses from the ordinary world into the sacred space of the brand. Like the arch at the front of a ceremony venue, the header exists to orient, to shelter, and to sanctify what lies beneath it.

The navigation system and footer together form a **unified ceremonial frame** — a living bookend that opens the page journey (the arch) and closes it (the covenant). When a visitor scrolls to the bottom, the header and footer **synchronize** into a single, breathing entity — an easter egg that rewards completion, mirrors the wedding journey from processional to recessional, and transforms the browser window itself into a ceremony venue.

**The Core Metaphor:** The browser viewport is a chapel. The header is the arch above the altar. The footer is the threshold stone beneath. Between them, the brand story unfolds like a ceremony.

---

## II. THE THREE STATES — A WEDDING IN MINIATURE

The header transitions through three emotional states that mirror the wedding journey:

### State 1: THE VIGIL (Top of Page)
**Emotional Temperature:** Held breath. Sacred anticipation. The moment before the doors open.

- **Visual:** Transparent. Only the wordmark and menu icon float in the void.
- **Behavior:** No background. No glass. No borders. The page content shows through.
- **Animation:** Logo and menu icon fade in after the Vigil Sequence (6.2s on first visit, instant on return).
- **Sound Metaphor:** A single sustained note — pure, unadorned, waiting.
- **Why:** The visitor has just arrived. They are in the vestibule. The ceremony has not yet begun. Navigation should not compete with the hero's emotional opening.

### State 2: THE PROCESSIONAL (Scrolled Past 1vh)
**Emotional Temperature:** Forward motion. The walk down the aisle. Purpose and direction.

- **Visual:** Glass-morphic bar materializes with atmospheric layers:
  - Layer 1: Candlelight warmth — radial gradient from center-bottom, `hsl(var(--vow-yellow) / 0.025)`, as if a single candle burns beneath the navigation bar.
  - Layer 2: Secondary warmth pool — centered, barely visible at 0.008 opacity. During arrival, this begins a 6s breathing cycle.
  - Layer 3: Vignette — darkened edges at `rgba(0,0,0,0.18)` to create depth, as if the bar is recessed into the page.
  - Layer 4: Film grain — sacred texture at 3% opacity. The brand's signature materiality.
- **Elements that appear:**
  - Navigation links (Pricing, About, Proof) with staggered fade-in at 80ms intervals
  - "Hold My Date" CTA with warm golden glow pool behind it
  - Golden scroll-progress thread along the top edge (1px, fills left-to-right)
  - Organic vine SVG thread along the bottom edge (undulating wave, `hsl(45 100% 76%` at 12-15% opacity)
- **Interaction Model:** Piano Key Depression + Spotlight Dimming
  - Hovering any nav link: 1px translateY depression, golden text-shadow appears
  - Pressing any nav link: 2px translateY depression (60ms snap-down, 180ms ease-up)
  - Spotlight: Non-hovered links dim to 35% opacity, focusing attention
  - Active page: Vow-yellow underline persists, drawn from center
- **Sound Metaphor:** A chord progression — movement, harmony, direction.

### State 3: THE ARRIVAL (Footer Bookend Visible)
**Emotional Temperature:** The recessional. The moment after the vows. Completion and covenant.

This is the **easter egg** — the reward for scrolling to the end. The header and footer become one unified frame.

- **Phase 1 — Dissolving (navLinks.length × 80ms + 300ms):**
  - Navigation links perform a "recessional dissolve" — fading out in reverse order (last link first, like wedding party exiting in reverse). Each link: opacity → 0, translateY → -4px, at 80ms stagger intervals.
  - "Hold My Date" CTA dissolves first (delay 0ms) — it served its purpose.
  
- **Phase 2 — Arrived:**
  - Logo glides from left-aligned to center using transform-based animation (450ms, brand easing). This is the officiant moving to center stage.
  - Vow-yellow underline draws beneath the centered logo (450ms, 200ms delay).
  - Logo gains ceremonial text-shadow: `0 0 24px hsl(var(--vow-yellow) / 0.1), 0 0 60px hsl(var(--vow-yellow) / 0.04)`.
  - Menu button softens to 40% opacity — still accessible but whispers.
  - The tagline "'Til Death ; Unto Life." rises from below the header (8px translateY, 700ms), rendered at 10px, 15% opacity — a ghost, a memory, a covenant echo.
  - The vine thread along the header's bottom edge **synchronizes its breathing** with the footer's vine thread on a shared 4s cycle. This creates the visual impression of a single golden thread connecting the top and bottom of the viewport — the **unified ceremonial frame**.

- **Atmospheric Intensification During Arrival:**
  - Candlelight warmth increases from 2.5% to 4% opacity
  - Secondary warmth begins its 6s breathing cycle
  - Film grain increases from 3% to 5%
  - Scroll progress thread glow intensifies (4px → 8px box-shadow)
  - Vine thread glow intensifies (12% → 30% opacity in gradient stops)

- **Sound Metaphor:** The final chord — sustained, warm, resonant, fading into reverent silence.

---

## III. THE FULL-SCREEN MENU — "THE SCORE"

Opening the menu is like opening a musical score. It is the vigil space — dark, sacred, reverent — the Death side of the brand dichotomy. Opening it is an inhale; closing it is an exhale.

### Atmospheric Layers (5 total):
1. **Film Grain** — 6% opacity. Sacred texture.
2. **Edge Vignette** — Concentrates focus inward, from transparent center to near-black edges.
3. **Primary Candlelight** — Warm pool from left (where menu items sit), `hsl(var(--vow-yellow) / 0.025)`.
4. **Secondary Candle Warmth** — Center glow, 6s breathing cycle when open.
5. **Deep Charcoal Fog** — Drifts slowly at 18s cycle, creating subtle atmospheric movement.

### Menu Items as Piano Keys:
- 8 items numbered 01–08: Home, Events, Pricing, About, Proof, FAQ, Listen, Contact
- Even-indexed items = white keys (flush left)
- Odd-indexed items = black keys (indented 12-16px, with subtle vertical shadow bar at left edge)
- **Piano Key Depression:** 1px translateY on hover (180ms), 2px on press (60ms snap-down)
- **Spotlight Dimming:** Non-hovered items dim to 20% opacity (not 35% — deeper in the vigil space)
- **Golden Thread Connections:** 1px vertical golden lines (10px tall) connect items, intensifying when adjacent items are hovered
- **Text Shadow:** Golden warmth on hover: `0 0 30px hsl(var(--vow-yellow) / 0.08)`
- **Underline Draw:** Vow-yellow underline draws from left on hover (450ms), persists on active page
- **Musical Staff Lines:** 5 faint horizontal rules behind the menu, at 2.5-4% foreground opacity, creating the impression of sheet music

### Stagger Choreography:
- Items enter at 60ms intervals, starting at 300ms after open
- Vine thread appears at 700ms
- Contact info at 750ms
- Covenant bookend at 850ms

### Close Interaction:
- "Close" text + X icon, X rotates 90° on hover
- Escape key closes
- Focus trap cycles through all interactive elements

### Covenant Bookend (Coda):
- Breathing golden dot (4s cycle)
- "'Til Death ; Unto Life." with semicolon heartbeat (2s cycle)
- This bookend is the "coda" — the final notation that signals the piece is complete

---

## IV. THE UNIFIED CEREMONIAL FRAME — THE EASTER EGG

When a visitor reaches the bottom of any page, the header and footer become one.

### How It Works:
1. The footer's `[data-footer-bookend]` element triggers an IntersectionObserver (threshold 0.5).
2. Both header and footer detect this "arrival" state independently.
3. In the header: nav dissolves → logo centers → tagline rises → vine breathes.
4. In the footer: grain intensifies (6% → 8%) → warm fog deepens → CTA glow pulses → vine thread synchronizes.
5. The result: The viewport becomes a ceremonial frame. The header arch and footer threshold breathe together. The golden threads pulse in unison. The tagline appears in both (header: ghost echo; footer: covenant statement).

### Visual Symmetry:
- **Header vine:** Undulates downward (Q peaks pointing down toward content)
- **Footer vine:** Undulates upward (Q peaks pointing up toward content, mirror of header)
- **Both vines:** During arrival, synchronized to a shared 4s breathing cycle with opacity pulsing between base and 1.5× base
- **Golden threads:** The scroll progress thread at the header top and the golden separator in the footer echo each other

### Emotional Narrative:
- The visitor began in the vigil (hero section, held breath)
- They walked through the ceremony (scrolled through sections)
- They arrived at the covenant (footer, commitment)
- The venue frame closes around them — arch and threshold united
- This is the moment after the vows: everything breathes together in warm, golden, sacred stillness

---

## V. BUTTON PHILOSOPHY — THE PIANO KEY AS INTERFACE

Every button on this site is a piano key. Not literally — but in its physics, its feedback, and its emotional weight.

### The Piano Key Depression Model:
- **Rest State:** Button sits at translateY(0) — the key at rest, ready to be pressed.
- **Hover:** translateY(-1px) + scale(1.02) — the key lifts slightly, as if drawn upward by magnetic anticipation. Shadow deepens beneath.
- **Press/Active:** translateY(0) or translateY(1px) — the key depresses. Shadow compresses. There is weight. There is commitment. You feel the mechanism.
- **Release:** Springs back with brand easing `cubic-bezier(0.22, 0.61, 0.36, 1)` at 250ms — the key returns, but the note has been struck.

### Timing as Emotional Language:
- **60ms:** The snap-down on press. Instantaneous. Certain. Like a hammer striking a string.
- **180ms:** The hover lift. Quick enough to feel responsive, slow enough to feel intentional.
- **250ms:** The release return. The resonance of a struck key.
- **450ms:** The golden underline draw. A sacred reveal, unhurried.

### Button Variants — Brand-Aligned:

#### `default` (Primary CTA — Vow Yellow)
**Context:** The most important action. "Hold my date." "Begin the conversation."
- Background: `hsl(var(--primary))` — Vow Yellow
- Text: Rich black
- Shadow: `0 8px 24px rgba(255,224,138,0.18)` — warm golden glow beneath, as if the key is lit from within by candlelight
- Hover: Background lightens to 70% lightness. Scale 1.02. Shadow deepens to 0.24 opacity and extends to 32px. A golden aura pulses once.
- Active: Scale returns to 1. Shadow compresses. TranslateY(1px). The key is pressed; the note sounds.
- **The Why:** This button is a vow. It carries the weight of commitment. The golden glow says: "This is sacred. Press with intention."

#### `primary-dark` (White on Dark Sections)
**Context:** Main CTA on dark bands. "Explore the sound." "Hear the difference."
- Background: White/cream
- Border: 1px solid white
- Hover: Background goes transparent, text inverts to white. The button becomes a window — you see through to the vigil space beneath.
- **The Why:** On dark sections (the Death space), the button is a candle — white, bright, solitary. On hover, the candle extinguishes and you see the darkness. The courage to press into the void.

#### `ghost-dark` (Outline on Dark)
**Context:** Secondary actions on dark sections. "Learn more." "See all."
- Transparent with white border
- Hover: Fills with white, text inverts. The outline becomes substance.
- **The Why:** The ghost is potential energy. The outline says "I could be something." The hover fill says "Now I am."

#### `ghost-light` (Outline on Light)
**Context:** Secondary actions on light/cream sections.
- Transparent with border using `--lines` token
- Hover: Fills with `--card`, border strengthens. Subtle materialization.
- **The Why:** On light sections (the Life space), subtlety reigns. The button barely exists until you need it.

#### `accent` (Vine Green)
**Context:** Availability, success, growth. "Date available." "Confirmed."
- Background: Vine Green
- Hover: Lightens to 62% lightness. The green deepens — growth accelerating.
- **The Why:** Green appears only at confirmation moments. This button says: "Yes. It is possible. The door is open."

#### `outline` (Primary Border)
**Context:** Alternative prominence. "View details." "Compare."
- 1.5px border in Vow Yellow, text in Vow Yellow
- Hover: Fills with Vow Yellow, text inverts to rich black. The outline becomes the vow.
- **The Why:** The outline is a promise not yet made. The fill is the promise kept.

### Universal Button Physics:
- All variants: `rounded-full` (pill shape — organic, non-aggressive)
- Font: `font-display` (Cormorant Garamond) at 15px — the serif carries weight
- Transition: 250ms with brand easing
- Focus ring: 3px `hsl(var(--primary) / 0.7)` — visible, accessible, golden
- Disabled: 50% opacity, no pointer events — the key is locked, the piano lid is closed
- Touch target: Minimum 40px height (h-10), 44px on larger sizes

### Golden Thread Underline on Text Buttons:
For `link` and `ghost` variants, hover draws a 1px golden underline from center outward:
- Duration: 450ms (sacred reveal timing)
- Color: `hsl(var(--vow-yellow) / 0.4)` with 6px glow
- This is the same underline used on nav links — creating visual consistency between navigation and action

---

## VI. THE MOBILE CEREMONY

### Mobile Sticky Bar:
- Fixed bottom bar with route-aware messaging
- 2px golden thread along top edge tracks scroll progress
- Fades out when footer bookend enters viewport (coordinated with arrival state)
- Primary CTA adapts label based on current page context

### Mobile Section Navigation:
- Compact vertical dot indicator on right edge
- "Haptic" scale pulse (1.4×) on tap for tactile feedback
- Active dot uses vow-yellow, inactive dots at 30% foreground opacity

### Touch Interactions:
- All buttons: 44px minimum touch target
- Piano key depression on press: 2px translateY (no hover state on touch)
- Touch feedback: 60ms snap-down, 250ms release
- No hover-dependent features — all interactions work on first tap

---

## VII. SCROLL PROGRESS THREAD

A 1px golden line at the absolute top of the header that fills left-to-right as the visitor scrolls:

- **Start:** 0% width, left-aligned
- **End:** 100% width when scrolled to bottom
- **Color:** Gradient from `hsl(var(--vow-yellow) / 0.3)` to `hsl(var(--vow-yellow) / 0.45)`
- **Glow:** 4px box-shadow, increasing to 8px during arrival
- **Update Rate:** requestAnimationFrame-throttled for 60fps smoothness
- **Metaphor:** The golden thread is the timeline of the ceremony — processional to recessional. At 100%, the ceremony is complete.

---

## VIII. ACCESSIBILITY COVENANT

Navigation accessibility is non-negotiable. It is a sacred duty:

### Keyboard Navigation:
- Tab traverses all interactive elements in logical order
- Focus ring: 2px solid `hsl(var(--ring))` at 70% opacity with 2px offset
- Escape closes overlays (full-screen menu, dropdowns)
- Arrow keys navigate within menu items
- Enter/Space activates links and buttons

### Screen Reader Support:
- `role="dialog"` and `aria-modal="true"` on full-screen menu
- `aria-label` on all navigation landmarks
- `sr-only` narrative text for complex visual states
- Decorative elements marked `aria-hidden="true"`
- All icons have descriptive labels

### Reduced Motion:
- All animations fallback to opacity-only 120ms fades
- Breathing cycles stop
- Piano key depression disabled
- Content remains fully accessible without motion

### Color Contrast:
- All text meets 4.5:1 contrast minimum
- Focus indicators meet 3:1 against adjacent colors
- Golden accents are decorative enhancement, never sole information carrier

---

## IX. PERFORMANCE STANDARDS

- Navigation renders within first 100ms of page load
- No layout shift from navigation state changes (CLS = 0)
- All animations use `transform` and `opacity` only (GPU-composited)
- `will-change` applied sparingly to actively animating elements
- IntersectionObserver for footer detection (no scroll event polling)
- requestAnimationFrame for scroll progress (no setTimeout)

---

## X. THE NORTH STAR QUESTIONS

Before any navigation decision, ask:

1. **Does this honor the ceremony?** Does it feel like part of a sacred space, or like a utility toolbar?
2. **Does this breathe?** Is there rhythm — inhale/exhale, dark/light, pause/release?
3. **Would you notice this at a wedding?** Navigation should be invisible during the ceremony and present only when you need orientation.
4. **Does it reward completion?** The arrival easter egg exists because finishing deserves recognition.
5. **Is every millisecond intentional?** No default values. No "about a second." Every timing is a musical decision.
6. **Does it feel like a piano key?** Every interactive element should have weight, mechanism, and resonance.
7. **Is it accessible?** Can someone navigate this with a screen reader, a keyboard, a switch device? If not, it is not finished.

---

*This is the Ceremony Arch. This is the navigation covenant. Every threshold crossed, every link pressed, every page arrived at — carries the weight of the brand's promise.*

*'Til Death ; Unto Life.*
