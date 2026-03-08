# THE CEREMONY ARCH — Bespoke Navigation Architecture
## A Sacred Navigation System for Parker Allard, Wedding Pianist
### Version 3.0 — The Definitive Specification

---

## PREAMBLE: WHY THIS DOCUMENT EXISTS

This is not a navigation specification. This is the architectural blueprint for the most emotionally resonant navigation system ever built for a solo artist's website. Every pixel, every millisecond, every hover state, every transition serves one purpose: to make the visitor feel the weight and wonder of marriage before they ever read a word.

The navigation is not a menu. It is a ceremony arch — the structure through which every guest passes on their way to witness a sacred moment. The header is the arch's crown. The footer is its foundation. Together, they frame every page like a wedding venue frames every vow.

When the visitor scrolls to the bottom of any page, the header and footer will reunite — like two hands clasping at the end of an aisle — creating a single, unified ceremonial frame. This is the Arrival. This is the easter egg. This is the moment the architecture reveals itself as a love letter to the craft of marriage.

---

## I. THE PHILOSOPHICAL FOUNDATION

### 1.1 Navigation as Sacred Architecture

In a cathedral, the nave guides the eye upward. In a concert hall, the proscenium arch frames the performer. In a wedding venue, the arch frames the couple. This navigation system is all three.

The header is the lintel — the horizontal beam that spans the threshold. It carries the weight of identity (the wordmark), orientation (the nav links), and invitation (the CTA). It is the first thing seen and the last thing remembered.

The footer is the foundation stone — the base upon which the entire ceremony rests. It carries the weight of trust (credentials, contact), continuity (site map), and covenant (the tagline bookend).

Between them, the page content is the aisle — the sacred space where the story unfolds.

### 1.2 The Three Emotional States of Navigation

Every navigation element exists in one of three emotional temperatures, corresponding to the brand's Death/Life dichotomy:

**STATE 1: THE VIGIL (Default/Idle)**
- The visitor has just arrived. The navigation is quiet, composed, waiting.
- Color temperature: Cool. Charcoal dominance. Minimal accent.
- Animation energy: Low. Breathing rhythms. Candle-flame flickers.
- Emotional tone: Reverence. Anticipation. Held breath.
- The header is nearly invisible — a whisper of structure against the void.
- Typography: Light weight. Maximum letter-spacing. Ethereal.

**STATE 2: THE PROCESSIONAL (Active/Scrolling)**
- The visitor is moving through the page. The navigation adapts, reveals, guides.
- Color temperature: Warming. Vow-yellow begins to appear in active states.
- Animation energy: Medium. Purposeful transitions. Directional momentum.
- Emotional tone: Confidence. Guidance. Gentle authority.
- The header crystallizes — nav links appear, the CTA solidifies.
- Typography: Medium weight. Tighter spacing. Grounded.

**STATE 3: THE ARRIVAL (Footer Intersection)**
- The visitor has reached the end. Header and footer synchronize.
- Color temperature: Warm. Golden glow. Vine-green whispers.
- Animation energy: Elevated but controlled. Synchronized breathing.
- Emotional tone: Fulfillment. Unity. The exhale after the vow.
- The header transforms — links dissolve, logo centers, vine threads connect to footer.
- Typography: Display weight. Ceremonial. The wordmark becomes an altar piece.

### 1.3 The Piano-Key Interaction Philosophy

Every interactive element in this navigation system behaves like a piano key. Not metaphorically — mechanically. The physics are real:

**Key Depression Model:**
- Hover: 1px translateY downward (the finger resting on the key)
- Press/Active: 2px translateY downward (the key being struck)
- Release: Spring-return with cubic-bezier(0.22, 0.61, 0.36, 1) — the key returning to rest
- The "sound" of each press is visual: a vow-yellow underline that draws beneath the text like a note resonating

**Key Weighting:**
- Primary nav links: Weighted keys — slower, deeper depression, longer resonance (450ms underline draw)
- Secondary links: Lighter keys — quicker response, shorter resonance (260ms)
- Utility links: Muted keys — minimal depression, opacity change only (180ms)
- CTA button: The sustain pedal — press creates a golden aura that holds and breathes

**Spotlight Damper System:**
When one key is pressed (hovered), all other keys are dampened:
- Non-hovered nav items drop to 40% opacity
- The transition uses 180ms with the sacred easing curve
- This mimics how a pianist's sustain pedal lifts all dampers, but our "inverse damper" isolates the active note
- On the full-screen menu, this effect is dramatic: the hovered item at 100% opacity, all others at 30%

### 1.4 The Vine Thread — Organic Connection System

Traditional navigation uses borders, lines, and dividers. This navigation uses vines.

The vine thread is a hand-drawn SVG path that replaces every straight-line border in the navigation system. It undulates gently — like ivy climbing a trellis, like a wedding vine wrapping an arch. The path uses a custom cubic bezier that creates organic, asymmetric curves.

**Vine Thread Specifications:**
- Stroke width: 0.5px (barely visible — felt more than seen)
- Stroke color: hsl(var(--vow-yellow) / 0.15) in Vigil state → hsl(var(--vow-yellow) / 0.40) in Arrival state
- Path variation: Each instance uses a slightly different seed for the undulation, so no two vine threads are identical
- Animation: The vine "grows" — stroke-dashoffset animation from full to zero over 1200ms on first appearance
- Breathing: In idle state, the vine pulses opacity between 0.12 and 0.20 on a 4000ms cycle
- Material: The vine has a barely perceptible glow — a 1px gaussian blur at 8% opacity that simulates bioluminescence

**Vine Thread Placement:**
- Header bottom edge: Replaces the traditional bottom border
- Footer top edge: Replaces the traditional top border
- Full-screen menu item separators: Between each numbered item
- Piano Key navigator connector: The vertical "golden thread" behind the keys
- Mobile sticky bar top edge: A 2px growing vine that tracks scroll progress

**The Arrival Synchronization:**
When the footer enters the viewport, the header's bottom vine and the footer's top vine begin to pulse in perfect synchronization — their breathing cycles align to the same 4000ms rhythm, creating the visual impression of a single organic thread connecting crown to foundation. This is the "two hands clasping" moment. The vine threads become a single, continuous botanical frame around the page content.

---

## II. THE HEADER — CROWN OF THE CEREMONY ARCH

### 2.1 Structural Anatomy

The header is a fixed-position element that spans the full viewport width. It contains exactly four zones, arranged left-to-right on desktop:

```
[WORDMARK] ———————————— [NAV LINKS] ———— [CTA] ———— [MENU TRIGGER]
```

**Zone 1: The Wordmark (Left)**
- Text: "Parker Gawryletz" in Cormorant Garamond
- Size: 18px, letter-spacing: 0.08em, font-weight: 300
- The wordmark is not a logo — it is a signature. It should feel handwritten, personal, intimate.
- Hover state: Letter-spacing expands to 0.12em over 260ms — the name "breathes" open
- Click: Returns to home (/) with a 260ms page transition
- Arrival state: The wordmark glides to center-alignment over 260ms, weight increases to 400, and a vow-yellow underline draws beneath it (450ms, sacred easing)

**Zone 2: The Navigation Links (Center-Right)**
- Items: Up to 4 visible links on desktop (determined by current page context)
- Typography: 11px uppercase, letter-spacing: 0.14em, font-weight: 300
- These links appear only after the visitor scrolls past the first viewport (100vh)
- Entrance: Stagger-fade from left to right, 80ms intervals, 260ms duration each
- Active state: Vow-yellow underline draws from center outward (450ms)
- Hover state: 1px key depression + spotlight damper on siblings
- Exit (on scroll-up past 100vh): Reverse stagger-fade, right to left, 80ms intervals

**Zone 3: The CTA (Right of Nav Links)**
- A single, context-aware button that changes label based on the current page:
  - Wedding pages: "Hold My Date"
  - Teaching pages: "Begin the Conversation"
  - Events pages: "Discuss Your Event"
  - Contact page: "You're Here" (disabled state — the visitor has arrived)
- Variant: `accent` — Vow-yellow background, charcoal text
- Hover: Golden aura pulse (box-shadow breathing) + 1px key depression
- The CTA is the sustain pedal of the header — it holds attention with warmth

**Zone 4: The Menu Trigger (Far Right)**
- A bespoke hamburger icon built from three horizontal lines
- The lines are not equal — they are "piano strings":
  - Top line: 24px width (treble string — thin, bright)
  - Middle line: 20px width (middle string)
  - Bottom line: 16px width (bass string — short, grounded)
- Hover: Lines expand to equal 24px width over 180ms (the strings tune to unison)
- Active/Open: Lines transform into an X with rotation animation (260ms)
- The transition from hamburger to X uses the sacred easing curve
- Each line is 1px height with 6px vertical spacing

### 2.2 Atmospheric Layers

The header is not a flat bar. It is a layered atmospheric composition:

**Layer 0: The Void (Base)**
- background: transparent (in Vigil state, the header is invisible against dark heroes)

**Layer 1: The Fog (Scroll-Activated)**
- After scrolling 50px: A gradient fog rises from below
- background: linear-gradient(to bottom, hsl(var(--background) / 0.92), hsl(var(--background) / 0.0))
- backdrop-filter: blur(12px) saturate(1.1)
- Transition: 260ms ease-out
- This creates the effect of the header materializing from mist — like a venue appearing through morning fog

**Layer 2: The Candlelight (Ambient)**
- A radial gradient positioned at the center of the header
- background: radial-gradient(ellipse 60% 100% at 50% 0%, hsl(var(--vow-yellow) / 0.03), transparent)
- This creates the faintest warm glow at the top of every page — candlelight from above
- In Arrival state: Intensity increases to 0.08 opacity — the candles brighten as the ceremony concludes

**Layer 3: The Film Grain (Texture)**
- A CSS-generated noise texture at 3% opacity
- This prevents the header from feeling "digital" — adds the organic imperfection of a film photograph
- Implementation: Pseudo-element with repeating SVG noise pattern
- In Arrival state: Grain intensity increases to 6% — the atmosphere thickens

**Layer 4: The Vine Thread (Bottom Edge)**
- The organic SVG border described in Section 1.4
- Replaces any straight-line bottom border
- Grows from center outward on first scroll (1200ms)
- Breathes at 4000ms cycle in idle state
- Synchronizes with footer vine in Arrival state

### 2.3 The Height Covenant

The header height is sacred — it must never compete with content:

- Desktop: 72px (sufficient for wordmark + nav + breathing room)
- Tablet: 64px
- Mobile: 56px
- These values are fixed. The header never grows, never shrinks, never shifts. It is the constant — the architectural beam that does not move while the ceremony unfolds below.

### 2.4 Scroll Behavior — The Processional Choreography

The header responds to scroll with a precise choreography:

**Phase 1: The Vigil (0–50px scroll)**
- Header is fully transparent
- Only wordmark and menu trigger are visible
- No atmospheric layers active
- The visitor is in the "held breath" moment — the header waits

**Phase 2: The Materialization (50–200px scroll)**
- Fog layer fades in (260ms)
- Candlelight layer activates
- Film grain appears
- The header "condenses" from atmosphere — like breath becoming visible in cold air

**Phase 3: The Processional (200px–100vh scroll)**
- Header is fully materialized
- Nav links begin their stagger-entrance
- CTA button fades in
- Vine thread grows along bottom edge
- The visitor is now "walking the aisle" — the header guides them

**Phase 4: The Steady State (100vh+ scroll)**
- All elements are visible and interactive
- Header hides on downward scroll (240ms translateY to -100%)
- Header reveals on upward scroll (240ms translateY to 0)
- This "peek-a-boo" behavior respects content space while maintaining orientation

**Phase 5: The Arrival (Footer visible)**
- Nav links dissolve in reverse stagger (80ms intervals, right to left)
- CTA fades out (180ms)
- Wordmark glides to center (260ms)
- Vow-yellow underline draws beneath centered wordmark (450ms)
- Vine thread intensifies and synchronizes with footer
- Candlelight layer brightens
- Film grain thickens
- The header has become the crown of the ceremony arch — no longer a navigation tool, but a ceremonial frame

### 2.5 Hide/Reveal Intelligence

The header's hide/reveal behavior on scroll is not a simple "hide on down, show on up." It uses intelligent thresholds:

- **Scroll Down Threshold:** Header hides after 80px of continuous downward scroll (prevents hiding on micro-scrolls or bounce)
- **Scroll Up Threshold:** Header reveals after 30px of upward scroll (faster reveal — the visitor is seeking orientation)
- **Velocity Dampening:** If the visitor is scrolling very fast (>2000px/s), the header stays hidden — they are scanning, not seeking navigation
- **Anchor Exception:** If the visitor clicks a same-page anchor link, the header reveals and stays visible for 2000ms before resuming auto-hide behavior
- **Form Exception:** If a form field is focused, the header hides and stays hidden to maximize input space (mobile)

---

## III. THE FULL-SCREEN MENU — THE NAVE

### 3.1 The Concept

When the menu trigger is activated, the full-screen menu is not a overlay — it is a space. The visitor steps from the aisle into the nave of a cathedral. The ceiling is high. The walls are dark. The light comes from within.

### 3.2 Entrance Choreography — The Doors Opening

The menu opens like cathedral doors:

**Beat 1 (0ms):** A charcoal veil begins to descend from the top of the viewport
- background: hsl(var(--background))
- Transition: 400ms with sacred easing
- The veil covers content progressively — this is not a snap, it is a curtain

**Beat 2 (200ms):** The menu items begin their entrance
- Items are numbered 01 through 08
- Each item enters from below with a 12px translateY and opacity 0→1
- Stagger: 60ms between each item
- Duration: 300ms per item with sacred easing
- Total entrance time: 200ms + (8 × 60ms) + 300ms = ~980ms

**Beat 3 (600ms):** The atmospheric layers activate
- Film grain fades in at 5% opacity
- A very subtle radial warmth appears at the center (candlelight, 4% opacity)
- The vine thread separators between items grow from center outward

**Beat 4 (900ms):** The footer information appears at the bottom
- Contact details, social links fade in
- The tagline "'Til Death ; Unto Life" appears with the semicolon glowing

### 3.3 Menu Item Design

Each menu item is a full-width row containing:

```
[NUMBER]  [LABEL]                                              [DESCRIPTION]
```

**Number:** 
- Font: Cormorant Garamond, 14px, weight 300
- Color: hsl(var(--vow-yellow) / 0.40)
- Format: "01" through "08" (always two digits — precision, ceremony)

**Label:**
- Font: Cormorant Garamond, 48px (desktop) / 32px (mobile), weight 300
- Color: hsl(var(--foreground))
- Letter-spacing: 0.04em
- Text-transform: none (sentence case — intimate, not corporate)

**Description:**
- Font: System sans-serif, 12px, weight 300
- Color: hsl(var(--foreground) / 0.50)
- A single phrase describing the page's emotional purpose
- Desktop only — hidden on mobile for simplicity

**Menu Items and Their Descriptions:**
1. 01 — Home — "Where the story begins"
2. 02 — Events — "Beyond the ceremony"
3. 03 — Teaching — "The conversation before music"
4. 04 — Pricing — "The offering"
5. 05 — About — "The witness behind the keys"
6. 06 — Proof — "Covenants kept"
7. 07 — Listen — "Hear what your hearts feel like"
8. 08 — Contact — "Begin the conversation"

### 3.4 Menu Item Interactions

**Hover — The Spotlight:**
- Hovered item: opacity remains 1.0, text color shifts to hsl(var(--vow-yellow)), number glows
- All other items: opacity drops to 0.30 over 180ms
- A horizontal vine thread grows beneath the hovered item (450ms, center outward)
- The item shifts 1px downward (key depression)
- A barely perceptible golden glow appears behind the number (box-shadow, 6% opacity)

**Active/Press:**
- Item shifts 2px downward
- Background flash: hsl(var(--vow-yellow) / 0.04) for 120ms, then fades
- This is the "note struck" — the visual confirmation of intent

**Current Page Indicator:**
- The active page's number is solid vow-yellow (not transparent)
- A small golden dash (12px × 1px) appears to the left of the number
- The label weight increases to 400 (slightly bolder — this is where you are)

### 3.5 Exit Choreography — The Doors Closing

The menu closes in reverse:

**Beat 1 (0ms):** Footer information fades out (120ms)
**Beat 2 (100ms):** Menu items exit upward in reverse stagger (last item first, 60ms intervals)
**Beat 3 (400ms):** Atmospheric layers dissolve
**Beat 4 (500ms):** Charcoal veil rises upward (400ms)
**Total exit time:** ~900ms

The exit is slightly faster than the entrance — the visitor has made a decision and the navigation should honor their intent without delay.

### 3.6 Keyboard Navigation

- Tab cycles through menu items top to bottom
- Shift+Tab cycles bottom to top
- Enter/Space activates the focused item
- Escape closes the menu (triggers exit choreography)
- Arrow Up/Down moves focus between items
- Home/End jumps to first/last item
- Focus ring: 2px solid hsl(var(--vow-yellow) / 0.60), offset 4px, border-radius 2px

---

## IV. THE FOOTER — FOUNDATION OF THE CEREMONY ARCH

### 4.1 The Concept — The Covenant Close

The footer is not a dumping ground for legal links. It is the foundation stone of the ceremony arch — the place where the brand makes its final promise. If the header says "Welcome to the ceremony," the footer says "The covenant is kept."

### 4.2 Structural Anatomy

The footer is a three-column layout on desktop, single-column stacked on mobile:

**Column 1: The Pianist (Brand)**
- Wordmark: "Parker Gawryletz" in Cormorant Garamond, 16px, weight 300
- Beneath: A single sentence — "Wedding pianist. Sound director. Witness."
- Social icons row with "spotlight" dimming behavior (non-hovered icons at 40% opacity)

**Column 2: Navigate (Site Map)**
- Seven page links in a vertical list
- Typography: 12px, uppercase, letter-spacing 0.12em
- Active page highlighted with vow-yellow color
- Each link has 1px key depression on hover

**Column 3: Reach Me (Contact)**
- Email: parker@parkergawryletz.com
- Location: "Calgary, Cochrane, Canmore, and Banff"
- A ghost-dark "Hold My Date" CTA button

### 4.3 The Covenant Bookend

At the very bottom of the footer, centered, is the tagline bookend:

```
                    · 'Til Death ; Unto Life ·
```

**The Dot:** A 6px circle with triple-layer golden glow:
- Inner: solid hsl(var(--vow-yellow))
- Middle: 4px blur at 30% opacity
- Outer: 8px blur at 15% opacity
- Breathing animation: Scale between 1.0 and 1.15 on a 4000ms cycle

**The Semicolon:** The sacred threshold character
- Color: hsl(var(--vow-yellow))
- It pulses faintly — opacity between 0.70 and 1.0 on a 3000ms cycle (offset from the dot's cycle by 500ms, creating a "heartbeat" counterpoint)

**The Text:** 
- "'Til Death" — weight 300, normal case
- "Unto Life" — weight 300, normal case
- The entire line: 11px, letter-spacing 0.16em, Cormorant Garamond

### 4.4 The Atmospheric Bridge

The footer does not begin abruptly. A 60px "atmospheric bridge" blends the last content section into the footer:

- Gradient: From transparent to hsl(var(--background)) over 60px
- This prevents a hard visual break — the content "exhales" into the footer
- A horizontal vine thread marks the true beginning of the footer territory

### 4.5 The Empty Venue Atmosphere

The footer simulates the "empty venue" emotional temperature — the feeling of standing in a ceremony space after all guests have left. The chairs are empty. The candles are low. The flowers are still. But the room remembers what happened here.

- Film grain: 8% opacity (thicker than header — more cinematic)
- Warm yellow fog: A radial gradient at center-bottom, hsl(var(--vow-yellow) / 0.03)
- Vine-green whisper: A barely perceptible green gradient at the very bottom edge, hsl(var(--vine-green) / 0.02)

---

## V. THE ARRIVAL — THE EASTER EGG

### 5.1 The Concept

When the visitor scrolls to the footer, the header and footer recognize each other. They synchronize. They become one frame. This is the Arrival — the moment the ceremony arch completes itself.

The visitor has walked the entire aisle. They have read the story. They have felt the weight. Now the architecture reveals its secret: the header and footer were always one piece. They were always connected. The page was always a ceremony.

### 5.2 Trigger Conditions

The Arrival activates when:
- The footer's covenant bookend (`[data-footer-bookend]`) enters the viewport
- The scroll velocity is below 800px/s (the visitor is reading, not skimming)
- The page has been scrolled at least 60% (prevents triggering on short pages)

### 5.3 The Arrival Score — Animation Choreography

This is a musical score. Every animation is timed to the millisecond.

**Measure 1 (0ms–260ms): The Dissolution**
- Header nav links fade out in reverse stagger (rightmost first, 60ms intervals)
- Header CTA fades out (180ms)
- Mobile sticky bar translates down and fades (260ms)

**Measure 2 (260ms–520ms): The Centering**
- Wordmark glides from left-aligned to center-aligned (260ms, sacred easing)
- Wordmark weight transitions from 300 to 400
- Letter-spacing tightens from 0.08em to 0.06em (the name "settles")

**Measure 3 (520ms–970ms): The Coronation**
- A vow-yellow underline draws beneath the centered wordmark (450ms, sacred easing)
- The underline uses stroke-dashoffset animation — it "writes" itself from center outward
- Simultaneously, the header's candlelight layer intensifies (0.03 → 0.08 opacity)
- Film grain thickens (3% → 6%)

**Measure 4 (970ms–1470ms): The Synchronization**
- Header's bottom vine thread and footer's top vine thread begin pulsing in unison
- Both threads brighten to 0.40 opacity
- Both breathe on the same 4000ms cycle, phase-locked
- A barely perceptible golden line connects them along the right viewport edge (the "spine" of the arch)

**Measure 5 (1470ms+): The Steady State**
- All animations settle into their breathing rhythms
- The page is now "framed" — header crown above, footer foundation below
- The visitor sees the complete ceremony arch for the first time
- Scroll up will reverse the Arrival in reverse order

### 5.4 The Reversal

If the visitor scrolls up (footer bookend exits viewport):

**Reverse Measure 1 (0ms):** Vine threads desynchronize, return to independent breathing
**Reverse Measure 2 (100ms):** Underline retracts (reverse stroke-dashoffset, 300ms)
**Reverse Measure 3 (300ms):** Wordmark glides back to left alignment (260ms)
**Reverse Measure 4 (400ms):** Nav links and CTA re-enter with forward stagger (60ms intervals)
**Reverse Measure 5 (600ms):** Atmospheric layers return to Processional intensity

The reversal is faster than the Arrival — the visitor is re-entering the ceremony, not leaving it.

### 5.5 The Piano Connection

The Arrival easter egg has a piano-specific layer:

- When the vine threads synchronize, the header's menu trigger icon transforms subtly:
  - The three horizontal lines (piano strings) begin to pulse at different frequencies
  - Top line: 3000ms breathing cycle
  - Middle line: 4000ms breathing cycle  
  - Bottom line: 5000ms breathing cycle
  - This creates a polyrhythmic visual that mimics the harmonic overtones of a sustained piano chord
  - The effect is extremely subtle — most visitors will feel it rather than see it

- The footer's social icons, if visible, settle into a "keyboard" arrangement:
  - Equal spacing mimicking the interval between piano keys
  - Hover reveals a tiny vow-yellow glow beneath each icon, like a key being illuminated from within

---

## VI. MOBILE NAVIGATION — THE INTIMATE CEREMONY

### 6.1 Philosophy

Mobile navigation is the intimate ceremony — the elopement. Fewer guests, but no less sacred. Every element must be larger, more reachable, more forgiving. The thumb is the visitor's hand reaching for the keys.

### 6.2 The Mobile Header

- Height: 56px
- Contents: Wordmark (left) + Menu Trigger (right)
- No visible nav links — they live in the full-screen menu
- The CTA moves to the Mobile Sticky Bar (below)
- Atmospheric layers are simplified: fog + grain only (no candlelight — performance)

### 6.3 The Mobile Sticky Bar

A bottom-fixed bar that appears after 100vh scroll:

- Height: 56px + safe area inset
- Background: Premium glass material (bg-black/40, backdrop-blur-12, 1px border)
- Contents: Context-aware CTA label (left) + Scroll progress indicator (right)
- The scroll progress indicator is a vine thread that grows from left to right along the bar's top edge
- Entrance: Slide up from below viewport (260ms, sacred easing)
- Exit: Slide down when footer bookend enters viewport (Arrival coordination)

### 6.4 The Mobile Menu

Same as desktop full-screen menu with these adaptations:
- Item labels: 32px (reduced from 48px)
- No description text (clean, focused)
- Numbers: 12px
- Touch targets: 56px minimum height per item
- Vine thread separators remain
- Spotlight hover effect replaced with tap-highlight:
  - On tap: Background flash of hsl(var(--vow-yellow) / 0.06) for 200ms
  - Tapped item scales to 1.02 briefly (the "haptic" visual)

### 6.5 Mobile Section Dots

A vertical dot navigator on the right edge of the viewport:
- 6px dots, one per major section
- Active section dot: vow-yellow, scale 1.4
- Inactive dots: hsl(var(--foreground) / 0.20)
- Tap on any dot: Smooth scroll to that section
- Tap feedback: Scale pulse to 1.6 then back to 1.4 (120ms)

---

## VII. THE PIANO KEY SECTION NAVIGATOR — THE OCTAVE RAIL

### 7.1 Desktop Only

A vertical rail fixed to the right viewport edge, visible on pages with 4+ sections.

### 7.2 Key Design

The rail alternates white and black keys, mimicking a piano keyboard rotated 90°:

**White Keys:**
- Width: 32px, Height: 40px
- Background: linear-gradient(to right, hsl(0 0% 95%), hsl(0 0% 88%))
- Border-radius: 0 0 3px 3px
- Box-shadow: inset 0 -2px 3px hsl(0 0% 70%)

**Black Keys:**
- Width: 22px, Height: 28px
- Background: linear-gradient(to bottom, hsl(0 0% 20%), hsl(0 0% 10%))
- Offset: Overlaps adjacent white keys by 8px (negative margin)
- Box-shadow: 0 2px 4px hsl(0 0% 0% / 0.30)

### 7.3 Key Interactions

- Hover: Key depresses 2px (translateY), tooltip appears with section name
- Click: Key depresses 3px, golden flash, smooth scroll to section
- Active section: Key has vow-yellow inner glow (box-shadow inset)
- The "golden thread" — a vertical line behind the keys — fills downward based on scroll progress

### 7.4 Entrance

- Keys stagger-enter from top to bottom on page load (80ms intervals)
- The golden thread grows downward simultaneously
- Total entrance: ~800ms
- This happens once per page visit (not on every scroll)

---

## VIII. ACCESSIBILITY — THE UNIVERSAL WELCOME

### 8.1 Core Requirements

Every navigation element must be:
- Keyboard navigable (Tab, Arrow Keys, Enter, Space, Escape)
- Screen reader compatible (ARIA roles, labels, live regions)
- Sufficient contrast (4.5:1 minimum for all text, 3:1 for decorative elements)
- Operable at 200% zoom without horizontal scroll
- Functional with animations disabled (prefers-reduced-motion)

### 8.2 Reduced Motion Fallbacks

When `prefers-reduced-motion: reduce` is active:
- All translateY key depressions → opacity changes only
- Vine thread growth → instant appearance at 50% opacity
- Stagger entrances → simultaneous fade-in at 200ms
- The Arrival synchronization → vine threads simply brighten without breathing
- Film grain → disabled entirely
- Candlelight gradients → remain (they are static, not animated)

### 8.3 ARIA Specification

```
<header role="banner" aria-label="Site navigation">
  <nav aria-label="Primary navigation">
    <!-- Nav links with aria-current="page" for active -->
  </nav>
  <button aria-label="Open menu" aria-expanded="false" aria-controls="full-screen-menu">
    <!-- Hamburger icon -->
  </button>
</header>

<div id="full-screen-menu" role="dialog" aria-label="Site menu" aria-modal="true">
  <nav aria-label="Full site navigation">
    <ul role="menu">
      <li role="menuitem"><a href="/">Home</a></li>
      <!-- ... -->
    </ul>
  </nav>
</div>

<footer role="contentinfo" aria-label="Site footer">
  <nav aria-label="Footer navigation">
    <!-- Footer links -->
  </nav>
</footer>
```

### 8.4 Focus Management

- When full-screen menu opens: Focus moves to the first menu item
- When menu closes: Focus returns to the menu trigger button
- Tab trap: Focus cycles within the menu while it is open
- Skip link: "Skip to content" link appears on Tab from the header, positioned absolutely, visible only on focus

---

## IX. PERFORMANCE — THE INVISIBLE DISCIPLINE

### 9.1 Targets

- Header LCP contribution: <50ms
- Menu open time (first paint): <100ms
- Total navigation JS bundle: <15KB gzipped
- No layout shift from header materialization (CLS = 0)

### 9.2 Optimization Strategies

- Vine thread SVGs: Inline, not fetched — <500 bytes each
- Film grain: CSS-generated, no image assets
- Atmospheric gradients: GPU-composited (transform, opacity only)
- Full-screen menu: Lazy-mounted on first trigger, then cached
- Scroll handlers: RequestAnimationFrame throttled, passive listeners
- Intersection Observer for Arrival detection (no scroll position polling)

### 9.3 Animation Performance

- All animations use transform and opacity only (compositor-thread)
- No width/height/margin/padding animations (avoid layout thrashing)
- will-change applied sparingly and removed after animation completes
- Breathing cycles use CSS @keyframes, not JS timers

---

## X. THE WEDDING × PIANO FUSION — DESIGN DETAILS

### 10.1 Typographic Choices

The navigation typography is the "voice" of the piano:

- **Cormorant Garamond** for all navigation labels — this serif has the elegance of a grand piano's curves, the delicacy of a bride's handwriting, and the authority of a cathedral inscription
- **System sans-serif** (or the body font) for descriptions and utility text — this is the "program notes" at a concert, the "order of service" at a wedding
- No bold weights above 400 anywhere in navigation — the piano whispers, it does not shout
- Letter-spacing is generous everywhere — notes need space between them to resonate

### 10.2 Color Discipline

The navigation follows the Color Covenant strictly:

- 92% of navigation pixels: Charcoal/black/background tones
- 6% maximum: Vow-yellow (CTAs, active states, the semicolon, vine threads at peak intensity)
- 2% maximum: Vine-green (success confirmations, availability indicators)
- Yellow appears only at "threshold moments" — the instant before a decision (hover, active)
- Green appears only at "confirmation moments" — after a decision (navigation complete, page loaded)

### 10.3 The Sound of Interaction

Though the site has no audio in navigation, every interaction should feel like it has a sound:

- Hover on nav link = the soft "thud" of a finger resting on a key (1px depression)
- Click on nav link = the "strike" of the key (2px depression + golden flash)
- Menu opening = a chord being sustained (the slow curtain, the gradual reveal)
- Menu closing = the damper falling (faster, more decisive)
- Arrival synchronization = a final chord resolving (the vines breathing together)

### 10.4 The Wedding Program Metaphor

The full-screen menu is structured like a wedding program:

- Numbered items (01–08) = the "Order of Ceremony"
- The vine thread separators = the decorative dividers on a printed program
- The footer information within the menu = the "reception details" at the bottom of the program
- The tagline bookend = the "officiant's blessing" that closes the program

This is not accidental. This is the navigation telling the visitor: "You are not browsing a website. You are holding a ceremony program. Every page is a movement in the ceremony. Every click is a step down the aisle."

---

## XI. RESPONSIVE BREAKPOINTS

### 11.1 Desktop (1280px+)
- Full header with all four zones
- Piano Key navigator visible
- Full-screen menu with descriptions
- Footer in three columns

### 11.2 Tablet (768px–1279px)
- Header: Wordmark + CTA + Menu Trigger (nav links hidden)
- Piano Key navigator visible (narrower keys)
- Full-screen menu without descriptions
- Footer in two columns

### 11.3 Mobile (< 768px)
- Header: Wordmark + Menu Trigger only
- Mobile Sticky Bar replaces header CTA
- Section dots replace Piano Key navigator
- Full-screen menu: Large touch targets, no descriptions
- Footer: Single column, stacked

---

## XII. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation
- [ ] Header structure with four zones
- [ ] Atmospheric layers (fog, candlelight, grain, vine)
- [ ] Scroll-aware state machine (Vigil → Processional → Arrival)
- [ ] Piano-key depression physics on all interactive elements

### Phase 2: Full-Screen Menu
- [ ] Cathedral door entrance/exit choreography
- [ ] Numbered items with spotlight damper
- [ ] Vine thread separators
- [ ] Keyboard accessibility and focus management

### Phase 3: The Arrival Easter Egg
- [ ] Footer intersection detection (IntersectionObserver)
- [ ] Header dissolution choreography (5-measure score)
- [ ] Vine thread synchronization
- [ ] Reversal choreography
- [ ] Mobile sticky bar coordination

### Phase 4: Piano Key Navigator
- [ ] Alternating white/black key design
- [ ] Key depression interactions
- [ ] Golden thread scroll progress
- [ ] Staggered entrance animation
- [ ] Section ID targeting

### Phase 5: Mobile Adaptations
- [ ] Mobile header simplification
- [ ] Mobile sticky bar with progress vine
- [ ] Mobile menu touch optimizations
- [ ] Section dot navigator
- [ ] Safe area handling

### Phase 6: Polish
- [ ] Reduced motion fallbacks for all animations
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Touch device testing (iOS Safari, Android Chrome)

---

## XIII. THE NORTH STAR QUESTIONS FOR NAVIGATION

Before implementing any navigation element, ask:

1. **Does this feel like a ceremony arch?** Does it frame the content with the reverence of a wedding venue?
2. **Does this feel like a piano?** Does the interaction have the mechanical weight and resonance of a key being struck?
3. **Does this honor the vigil?** Does the default state respect the quiet anticipation before the visitor acts?
4. **Does this celebrate the arrival?** Does the footer state create a sense of completion and unity?
5. **Would I notice this at a wedding?** Navigation should be like a good wedding coordinator — invisible when everything is going right, immediately present when needed.
6. **Does this reduce anxiety?** The visitor should always know where they are, where they can go, and how to get back.
7. **Does this breathe?** Every element should have a rhythm — not frantic, not static, but alive.
8. **Would Fantasy.co approve?** Is every millisecond intentional? Is it reduced to essence? Does it create emotional gravity?

---

## XIV. THE COVENANT

This navigation system covenants to:

- Frame every page like a ceremony arch frames every vow
- Guide every visitor like a processional guides every guest
- Reveal its secret (the Arrival) only to those who walk the entire aisle
- Behave like a piano — mechanical, weighted, resonant, alive
- Honor the vigil before selling the celebration
- Breathe, always breathe — because the held breath before "I do" is the most sacred sound of all

'Til Death ; Unto Life.
