# THE CEREMONY ARCH — Bespoke Navigation Architecture
## A Sacred Navigation System for Parker Gawryletz, Wedding Pianist
### Version 4.0 — The Definitive Specification

---

## PREAMBLE: WHY THIS DOCUMENT EXISTS

This is not a navigation specification. This is the architectural blueprint for the most emotionally resonant navigation system ever built for a solo artist's website. Every pixel, every millisecond, every hover state, every transition serves one purpose: to make the visitor feel the weight and wonder of marriage before they ever read a word.

The navigation is not a menu. It is a ceremony arch — the structure through which every guest passes on their way to witness a sacred moment. The header is the arch's crown. The footer is its foundation. Together, they frame every page like a wedding venue frames every vow.

When the visitor scrolls to the bottom of any page, the header and footer will reunite — like two hands clasping at the end of an aisle — creating a single, unified ceremonial frame. This is the Arrival. This is the easter egg. This is the moment the architecture reveals itself as a love letter to the craft of marriage.

This document is approximately thirty pages of specification. Every section is implementation-ready. Nothing is conceptual. Every timing value, every color, every easing curve, every pixel measurement is final. The system described here is one-of-a-kind — it does not exist anywhere else on the internet. It is as bespoke as a custom wedding gown, as precise as a Steinway action mechanism, and as emotionally resonant as the moment silence breaks into the first note of "Canon in D."

---

## I. THE PHILOSOPHICAL FOUNDATION

### 1.1 Navigation as Sacred Architecture

In a cathedral, the nave guides the eye upward. In a concert hall, the proscenium arch frames the performer. In a wedding venue, the arch frames the couple. This navigation system is all three.

The header is the lintel — the horizontal beam that spans the threshold. It carries the weight of identity (the wordmark), orientation (the nav links), and invitation (the CTA). It is the first thing seen and the last thing remembered.

The footer is the foundation stone — the base upon which the entire ceremony rests. It carries the weight of trust (credentials, contact), continuity (site map), and covenant (the tagline bookend).

Between them, the page content is the aisle — the sacred space where the story unfolds.

**The Arch Metaphor in Practice:**
- The header's vine thread (bottom edge) is the left arm of the arch reaching downward
- The footer's vine thread (top edge) is the right arm reaching upward
- When the visitor reaches the bottom, these arms clasp — the arch is complete
- The golden thread on the right viewport edge (Piano Key navigator) is the arch's spine — the invisible structural support that holds the ceremony together
- The atmospheric layers (fog, candlelight, grain) are the floral arrangements draped over the arch — beautiful, organic, never perfectly symmetrical

**Why This Matters for UX:**
Traditional navigation treats header and footer as independent components. This system treats them as two halves of a single architectural element that the visitor discovers progressively. The discovery moment (the Arrival) is the emotional payoff for scrolling the entire page. It rewards engagement. It transforms a utilitarian action (reaching the bottom of a page) into an aesthetic revelation. This is the wedding-themed easter egg: the navigation itself is a ceremony, and the visitor is both guest and participant.

### 1.2 The Three Emotional States of Navigation

Every navigation element exists in one of three emotional temperatures, corresponding to the brand's Death/Life dichotomy:

**STATE 1: THE VIGIL (Default/Idle)**
- The visitor has just arrived. The navigation is quiet, composed, waiting.
- Color temperature: Cool. Charcoal dominance. Minimal accent.
- Animation energy: Low. Breathing rhythms. Candle-flame flickers.
- Emotional tone: Reverence. Anticipation. Held breath.
- The header is nearly invisible — a whisper of structure against the void.
- Typography: Light weight (300). Maximum letter-spacing (0.08em). Ethereal.
- Piano parallel: The moment before the pianist's hands touch the keys. The room is still. The air is thick with anticipation. The instrument waits.
- Wedding parallel: The bride is in the back room. The groom stands at the altar. The guests are seated. The ceremony has not begun. Everyone is holding their breath.

**STATE 2: THE PROCESSIONAL (Active/Scrolling)**
- The visitor is moving through the page. The navigation adapts, reveals, guides.
- Color temperature: Warming. Vow-yellow begins to appear in active states.
- Animation energy: Medium. Purposeful transitions. Directional momentum.
- Emotional tone: Confidence. Guidance. Gentle authority.
- The header crystallizes — nav links appear, the CTA solidifies.
- Typography: Medium weight (300→400 on active). Tighter spacing. Grounded.
- Piano parallel: The pianist is playing. The melody moves forward. Each phrase builds on the last. The sustain pedal catches harmonics.
- Wedding parallel: The processional has begun. The flower girl walks. The bridesmaids walk. Each step builds anticipation. The guests turn in their seats.

**STATE 3: THE ARRIVAL (Footer Intersection)**
- The visitor has reached the end. Header and footer synchronize.
- Color temperature: Warm. Golden glow. Vine-green whispers.
- Animation energy: Elevated but controlled. Synchronized breathing.
- Emotional tone: Fulfillment. Unity. The exhale after the vow.
- The header transforms — links dissolve, logo centers, vine threads connect to footer.
- Typography: Display weight (400). Ceremonial. The wordmark becomes an altar piece.
- Piano parallel: The final chord. All notes resolve. The sustain pedal holds everything in suspension. The room vibrates with harmonic completeness. Then — slowly — the sound fades, and what remains is the memory of what was played.
- Wedding parallel: The officiant says, "You may kiss." The guests exhale. The couple turns to face the room. The arch frames them perfectly. Everything that was separate is now united.

### 1.3 The Piano-Key Interaction Philosophy

Every interactive element in this navigation system behaves like a piano key. Not metaphorically — mechanically. The physics are real:

**Key Depression Model:**
- Hover: 1px translateY downward (the finger resting on the key)
- Press/Active: 2px translateY downward (the key being struck)
- Release: Spring-return with cubic-bezier(0.22, 0.61, 0.36, 1) — the key returning to rest
- The "sound" of each press is visual: a vow-yellow underline that draws beneath the text like a note resonating

**Key Weighting — The Action Regulation:**
Just as a piano technician regulates the "action" (the mechanical response of each key), every interactive element in this navigation has a regulated weight that determines its response characteristics:

- Primary nav links: **Weighted keys** — slower, deeper depression, longer resonance (450ms underline draw). These are the bass notes. They carry the most harmonic content. They reverberate longest.
- Secondary links (footer, menu descriptions): **Lighter keys** — quicker response, shorter resonance (260ms). These are the middle register. Responsive, clear, efficient.
- Utility links (social icons, legal links): **Muted keys** — minimal depression, opacity change only (180ms). These are the upper octave. Bright, quick, delicate.
- CTA button: **The sustain pedal** — press creates a golden aura that holds and breathes. The sustain pedal doesn't play a note; it extends every note currently sounding. Similarly, the CTA doesn't navigate immediately — it holds attention, builds commitment, then releases the visitor into action.

**The ADSR Envelope — Visual Sound Shaping:**
Every interaction follows the ADSR (Attack-Decay-Sustain-Release) model from sound synthesis:
- **Attack** (0–60ms): The initial response. The element begins to depress. Opacity begins to shift. The vow-yellow begins to appear. This is the hammer striking the string.
- **Decay** (60–180ms): The initial intensity settles. The depression reaches its full depth. The color reaches its full saturation. This is the note's volume dropping from its peak to its sustained level.
- **Sustain** (180ms–hover end): The element holds its depressed state. The underline holds its drawn position. The spotlight damper holds all siblings at reduced opacity. This is the note ringing while the key is held down.
- **Release** (hover end → hover end + 260ms): The element returns to rest. The underline retracts or fades. Siblings return to full opacity. This is the damper falling back onto the string, stopping the vibration.

**Spotlight Damper System:**
When one key is pressed (hovered), all other keys are dampened:
- Non-hovered nav items drop to 40% opacity
- The transition uses 180ms with the sacred easing curve
- This mimics how a pianist's sustain pedal lifts all dampers, but our "inverse damper" isolates the active note
- On the full-screen menu, this effect is dramatic: the hovered item at 100% opacity, all others at 30%
- The mathematical relationship: dampened opacity = baseOpacity × 0.3 (menu) or × 0.4 (header)
- Restoration timing: 180ms stagger-restore from the previously hovered item outward, creating a "ripple" of opacity returning

**The Hammer Velocity Model — Interaction Intensity:**
Piano keys respond differently based on how hard they are struck (velocity). This navigation mirrors that:
- **Slow hover** (cursor moving slowly over an element): Full ADSR envelope plays out. The underline draws slowly (450ms). The depression is gradual. The visitor is "reading" — savoring the interaction.
- **Fast hover** (cursor passing quickly): Abbreviated envelope. Underline draws at 260ms. Depression is immediate. The visitor is "scanning" — the navigation respects their urgency.
- **Implementation:** Track cursor velocity via mousemove events. If velocity > 400px/s, use the fast envelope. If velocity ≤ 400px/s, use the slow envelope. This is invisible to the visitor but creates a subconscious sense of responsiveness.

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
- Path formula: `M 0,0 C ${w*0.15},${h*0.6} ${w*0.35},${h*-0.4} ${w*0.5},${h*0.1} S ${w*0.85},${h*0.5} ${w},0`

**Vine Thread Placement:**
- Header bottom edge: Replaces the traditional bottom border
- Footer top edge: Replaces the traditional top border
- Full-screen menu item separators: Between each numbered item
- Piano Key navigator connector: The vertical "golden thread" behind the keys
- Mobile sticky bar top edge: A 2px growing vine that tracks scroll progress

**The Arrival Synchronization:**
When the footer enters the viewport, the header's bottom vine and the footer's top vine begin to pulse in perfect synchronization — their breathing cycles align to the same 4000ms rhythm, creating the visual impression of a single organic thread connecting crown to foundation. This is the "two hands clasping" moment. The vine threads become a single, continuous botanical frame around the page content.

**The Botanical Authenticity:**
The vine thread is not decorative. It is structural. In a real wedding arch, the vine is what holds the flowers. It is the scaffold. Without it, the arch is just bare wood. Similarly, the vine thread is what connects the header to the footer — it is the visual evidence of their relationship. Without it, they are just two separate components. With it, they are architecture.

### 1.5 The Sacred Easing Curve

Every animation in this system uses one of three easing curves. No other curves are permitted.

**The Sacred Curve (Primary):** `cubic-bezier(0.22, 0.61, 0.36, 1)`
- Used for: All reverent transitions — menu entrances, Arrival choreography, vine growth, underline draws
- Character: Slow start, confident middle, gentle landing. Like a processional walk — unhurried, dignified, arriving exactly when expected.
- Named "sacred" because it mirrors the tempo of a wedding march: deliberate at the beginning, flowing in the middle, settling at the destination.

**The Spring Curve (Interactive):** `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Used for: Key depression release, scale returns, mobile haptic pulses
- Character: Overshoots slightly, then settles. Like a piano key bouncing back after being struck — it doesn't just return, it rebounds.
- Named "spring" because piano keys literally use a spring mechanism to return to rest position.

**The Breath Curve (Ambient):** `cubic-bezier(0.37, 0, 0.63, 1)` (ease-in-out equivalent)
- Used for: All breathing cycles — vine opacity, candlelight, grain, golden dot
- Character: Symmetrical acceleration and deceleration. Like breathing — in and out at the same pace.
- Named "breath" because the entire site breathes, and this curve is its respiratory rhythm.

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
- Hover state: Letter-spacing expands to 0.12em over 260ms (the sacred curve) — the name "breathes" open, like a pianist spreading their fingers across the keys before the first chord
- Click: Returns to home (/) with a 260ms page transition
- Arrival state: The wordmark glides to center-alignment over 260ms, weight increases to 400, and a vow-yellow underline draws beneath it (450ms, sacred easing)
- Focus state: 2px solid ring using hsl(var(--ring)) at 70% opacity, offset 4px

**Zone 2: The Navigation Links (Center-Right)**
- Items: Up to 4 visible links on desktop (determined by current page context)
- Typography: 11px uppercase, letter-spacing: 0.14em, font-weight: 300
- These links appear only after the visitor scrolls past the first viewport (100vh)
- Entrance: Stagger-fade from left to right, 80ms intervals, 260ms duration each
- Active state: Vow-yellow underline draws from center outward (450ms)
- Hover state: 1px key depression + spotlight damper on siblings + letter-spacing tightens from 0.14em to 0.12em (the key settling into its depression)
- Exit (on scroll-up past 100vh): Reverse stagger-fade, right to left, 80ms intervals
- The nav links are the "white keys" of the header — evenly spaced, each producing a distinct destination

**Zone 3: The CTA (Right of Nav Links)**
- A single, context-aware button that changes label based on the current page vertical:
  - Wedding pages: "Hold My Date"
  - Teaching pages: "Begin the Conversation"
  - Events pages: "Discuss Your Event"
  - Contact page: "You're Here" (disabled state — the visitor has arrived)
  - Gateway page: "Explore" (neutral invitation)
- See Section XIV for complete button design specification
- The CTA is the sustain pedal of the header — it holds attention with warmth

**Zone 4: The Menu Trigger (Far Right)**
- A bespoke hamburger icon built from three horizontal `<span>` elements
- The lines are not equal — they are "piano strings" of descending gauge:
  - Top line: 20px width, 1.5px height (treble string — thin, bright)
  - Middle line: 16px width, 1.5px height (middle string)
  - Bottom line: 12px width, 1.5px height (bass string — short, grounded)
- Alignment: All lines are right-aligned (anchored to the right edge of a 20px container)
- Vertical spacing: 5px between each line
- Hover: All lines expand to 20px width over 180ms (sacred curve) — "the strings tune to unison"
- Active/Open: Lines transform into an X with rotation animation (260ms, sacred curve)
  - Top line: rotate(45deg) + translateY to center
  - Bottom line: rotate(-45deg) + translateY to center
  - Middle line: opacity → 0, scaleX → 0 (the middle string vanishes)
- The transition from hamburger to X must be seamless — no flickering, no layout shift
- Touch target: 44×44px minimum (the visual element is smaller, but the hit area is generous)
- Focus state: 2px solid ring using hsl(var(--ring)), offset 4px

### 2.2 Atmospheric Layers

The header is not a flat bar. It is a layered atmospheric composition:

**Layer 0: The Void (Base)**
- background: transparent (in Vigil state, the header is invisible against dark heroes)

**Layer 1: The Fog (Scroll-Activated)**
- After scrolling 50px: A gradient fog rises from below
- background: linear-gradient(to bottom, hsl(var(--background) / 0.92), hsl(var(--background) / 0.0))
- backdrop-filter: blur(12px) saturate(1.1)
- Transition: 260ms ease-out
- This creates the effect of the header materializing from mist — like a venue appearing through morning fog on a September wedding day

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

**Layer 5: The Vignette (Edge Darkening)**
- A subtle radial gradient that darkens the far-left and far-right edges of the header
- background: radial-gradient(ellipse 120% 100% at 50% 50%, transparent 60%, hsl(0 0% 0% / 0.06) 100%)
- This creates an organic "tunnel vision" that draws the eye to the center of the header
- Combined with the candlelight, it simulates the effect of looking down a candlelit aisle

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

When the menu trigger is activated, the full-screen menu is not an overlay — it is a space. The visitor steps from the aisle into the nave of a cathedral. The ceiling is high. The walls are dark. The light comes from within.

The full-screen menu is the wedding program brought to life. Each numbered item is a movement in the ceremony. The vine thread separators are the decorative dividers on a printed program. The footer information within the menu is the "reception details" at the bottom of the program. The tagline bookend is the "officiant's blessing" that closes the program.

### 3.2 Entrance Choreography — The Doors Opening

The menu opens like cathedral doors — not swinging, but revealing. Two massive doors of charcoal darkness part to reveal the interior:

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
- Focus ring: 2px solid hsl(var(--ring) / 0.60), offset 4px, border-radius 2px

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

This is the one-of-a-kind bespoke element that makes this navigation system unlike anything else on the internet. No other website treats its header and footer as two halves of the same architectural element. No other website rewards scrolling to the bottom with a visual revelation. This is the wedding easter egg: the navigation IS the ceremony.

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

### 5.6 The One-Page Illusion

When the Arrival is fully active, the visitor should be able to perceive the header and footer as a single unified frame. This illusion is created by:

1. **Matching atmospheric density:** Both header and footer have identical film grain opacity (6–8%), identical candlelight warmth, identical vine thread brightness
2. **Synchronized breathing:** All animated elements pulse on the same 4000ms cycle
3. **Color temperature alignment:** Both use the same warm palette — no cool elements in either
4. **Typographic harmony:** The centered wordmark in the header and the tagline bookend in the footer use the same typeface, similar sizes, similar letter-spacing — they look like they belong on the same invitation card
5. **The invisible spine:** The golden thread on the right edge (from the Piano Key navigator) connects them visually, creating a continuous vertical line from header to footer

This is the ultimate expression of the "ceremony arch" metaphor: the header is the top of the arch, the footer is the base, and the golden thread is the structural support between them. The visitor is standing inside the arch, looking at the page content framed by sacred architecture.

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

## XII. CONTEXTUAL ADAPTATION BY VERTICAL

### 12.1 The Principle

The navigation system is sitewide — it appears on every page, in every vertical. But it is not static. Like a pianist who adjusts their touch based on the piece being played, the navigation subtly adapts its emotional temperature based on which vertical the visitor is in.

### 12.2 Wedding Vertical (/ and /weddings/*)

- **Emotional temperature:** Maximum reverence. The fullest expression of the ceremony arch.
- **CTA label:** "Hold My Date"
- **Vine thread intensity:** Full specification (0.15 → 0.40)
- **Candlelight:** Active at 0.03 opacity
- **Film grain:** 3% in Processional, 6% in Arrival
- **Menu description for context:** Descriptions emphasize sacred language ("Where the story begins," "Covenants kept")
- **Footer tagline emphasis:** Maximum — the semicolon pulse and golden dot are at their most visible
- **Overall character:** Cathedral. Grand piano. The ceremony at its most formal.

### 12.3 Teaching Vertical (/teaching/*)

- **Emotional temperature:** Warm intimacy. The nav feels like a conversation, not a ceremony.
- **CTA label:** "Begin the Conversation"
- **Vine thread intensity:** Slightly reduced (0.10 → 0.30) — less formal
- **Candlelight:** Active at 0.02 opacity — subtler warmth
- **Film grain:** 2% — cleaner, more approachable
- **Menu descriptions:** Shift toward mentorship language ("The conversation before music," "The first question is never about music")
- **Footer tagline emphasis:** Present but softer — the semicolon pulse is slower (4000ms vs 3000ms)
- **Overall character:** Practice room. Upright piano. The lesson after school.

### 12.4 Events Vertical (/events/*)

- **Emotional temperature:** Sophisticated energy. The nav feels polished and dynamic.
- **CTA label:** "Discuss Your Event"
- **Vine thread intensity:** Standard (0.15 → 0.35) — professional
- **Candlelight:** Active at 0.03 opacity
- **Film grain:** 3%
- **Menu descriptions:** Shift toward occasion language ("Beyond the ceremony," "The offering")
- **Footer tagline emphasis:** Standard
- **Overall character:** Event venue. Concert grand. The gala performance.

### 12.5 Gateway Page (/)

- **Emotional temperature:** Neutral invitation. The nav is at its most transparent.
- **CTA label:** "Explore"
- **Vine thread intensity:** Minimal (0.08 → 0.20) — the visitor hasn't committed yet
- **Candlelight:** Disabled — let the Gateway's own visual identity dominate
- **Film grain:** 1% — barely there
- **Menu descriptions:** Standard
- **Footer tagline emphasis:** Standard
- **Overall character:** Foyer. The piano is in the other room. You can hear it, but faintly.

---

## XIII. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation
- [ ] Header structure with four zones
- [ ] Atmospheric layers (fog, candlelight, grain, vine, vignette)
- [ ] Scroll-aware state machine (Vigil → Processional → Arrival)
- [ ] Piano-key depression physics on all interactive elements
- [ ] Sacred easing curve as default transition

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

### Phase 6: Button System (See Section XIV)
- [ ] All 7 button variants implemented
- [ ] Piano-key depression on all variants
- [ ] Context-aware variant selection per section background
- [ ] CTA golden aura breathing animation
- [ ] Focus ring accessibility on all variants

### Phase 7: Contextual Adaptation
- [ ] Per-vertical CTA label switching
- [ ] Per-vertical atmospheric intensity adjustment
- [ ] Per-vertical menu description adaptation
- [ ] Gateway page neutral mode

### Phase 8: Polish
- [ ] Reduced motion fallbacks for all animations
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Touch device testing (iOS Safari, Android Chrome)
- [ ] Hammer velocity model for hover duration awareness

---

## XIV. THE BUTTON SYSTEM — THE KEYS OF THE INSTRUMENT

### 14.1 Philosophy

Buttons are the keys of this instrument. Every button on the site — whether a CTA in the header, a form submit, or a ghost link in a content section — follows the same mechanical model: they are piano keys. They depress. They resonate. They return. The visitor should feel, subconsciously, that clicking a button on this site is fundamentally different from clicking a button anywhere else.

This is not decorative. This is brand identity expressed through interaction physics. A piano is defined by how its keys feel. This brand is defined by how its buttons feel.

### 14.2 The Seven Button Variants

Every button on the site belongs to one of seven variants. The variant is determined by the section background, never by designer preference. This ensures ≥7:1 contrast on all backgrounds and prevents "wrong button on wrong background" errors.

**Variant 1: Primary-Dark (Solid on Dark Sections)**
- Background: hsl(var(--foreground)) → white/cream solid
- Text: hsl(var(--background)) → charcoal/black
- Border: none
- Use: Main CTA on dark charcoal/black sections
- Example: "Hold My Date" on the hero or dark content bands
- Hover: See 14.3

**Variant 2: Primary-Light (Solid on Light Sections)**
- Background: hsl(var(--background)) → charcoal/black solid
- Text: hsl(var(--foreground)) → white/cream
- Border: none
- Use: Main CTA on light cream/white sections
- Example: "Hold My Date" on testimonial sections with light backgrounds
- Hover: See 14.3

**Variant 3: Ghost-Dark (Outline on Dark Sections)**
- Background: transparent
- Text: hsl(var(--foreground)) → white/cream
- Border: 1px solid hsl(var(--foreground) / 0.30)
- Use: Secondary CTA on dark sections
- Example: "View All Testimonials" beneath a dark proof section
- Hover: See 14.3

**Variant 4: Ghost-Light (Outline on Light Sections)**
- Background: transparent
- Text: hsl(var(--background)) → charcoal/black
- Border: 1px solid hsl(var(--background) / 0.30)
- Use: Secondary CTA on light sections
- Example: "Learn More" on a cream information section
- Hover: See 14.3

**Variant 5: Accent (Vow-Yellow — Threshold Moments)**
- Background: hsl(var(--vow-yellow))
- Text: hsl(0 0% 10%) → near-black
- Border: none
- Use: The most important CTA on the page. Only ONE accent button per viewport. This is the sustain pedal.
- Example: The header CTA, the final "Hold My Date" at the Crossing section
- Hover: See 14.3
- Rule: If more than one accent button is visible at once, the brand is shouting. Reduce.

**Variant 6: Text-Link (Inline Text CTA)**
- Background: none
- Text: hsl(var(--foreground))
- Border: none
- Underline: 1px solid hsl(var(--vow-yellow) / 0.40) — always visible (not hover-only)
- Use: Inline CTAs within body copy, "Read more" links, breadcrumb-style navigation
- Example: "View my process" within a paragraph
- Hover: Underline color intensifies to hsl(var(--vow-yellow) / 0.80), underline draws from center outward (260ms)

**Variant 7: Icon-Only (Utility Actions)**
- Background: transparent
- Icon: hsl(var(--foreground) / 0.60)
- Border: none
- Use: Social icons, close buttons, scroll indicators
- Example: Instagram icon in footer, X close button on menu
- Hover: Icon opacity → 1.0, 1px key depression, faint golden underglow

### 14.3 Universal Button Hover — The Key Strike

Every button, regardless of variant, follows the same hover choreography. This creates a sitewide consistency that the visitor feels subconsciously — "every button on this site responds the same way, like every key on a piano."

**The Hover Score (in order):**

**Beat 0 (0ms): Cursor enters hit area**
- Nothing visible yet. The button "senses" the finger approaching the key.

**Beat 1 (0–60ms): Attack**
- translateY: 0 → 1px (the key begins to depress)
- Easing: sacred curve
- For accent variant: A golden aura begins to appear (box-shadow: 0 0 0 0px hsl(var(--vow-yellow) / 0) → 0 0 12px 2px hsl(var(--vow-yellow) / 0.12))

**Beat 2 (60–180ms): Sustain Onset**
- translateY holds at 1px
- For solid variants (primary-dark, primary-light): Background lightens 5% (mix with white)
- For ghost variants: Border opacity increases from 0.30 → 0.60
- For accent variant: Golden aura reaches full intensity, begins breathing (see below)
- Letter-spacing tightens by 0.01em (the key settling into its depression — text "compresses" slightly)

**Beat 3 (180ms+): Sustain Hold**
- All values hold steady
- For accent variant only: The golden aura breathes — box-shadow pulses between 0.08 and 0.15 opacity on a 2000ms cycle. This is the "sustain pedal" — the button is alive while the cursor rests on it.

**The Release Score (cursor exits):**

**Beat R1 (0–180ms): Release**
- translateY: 1px → 0 (key returns to rest)
- Easing: spring curve (slight overshoot — the key bounces back)
- All color/opacity values return to default
- Golden aura fades (180ms)
- Letter-spacing returns to normal

**Beat R2 (180–260ms): Resonance Fade**
- A barely perceptible "echo" — the button's background flashes at 2% opacity of the hover color, then fades
- This is the "note dying away" — the visual memory of the interaction
- Duration: 80ms flash, then 120ms fade to fully transparent

### 14.4 Universal Button Active/Press — The Note Struck

**On mousedown / touchstart:**
- translateY: 1px → 2px (deeper depression)
- Duration: 60ms (immediate — the strike is instant)
- For all solid variants: Background darkens 8% (mix with black)
- For ghost variants: Border opacity → 1.0, background flashes at 4% of text color
- For accent variant: Golden aura intensifies to 0.25 opacity and expands to 16px radius
- A vow-yellow "resonance ring" expands outward from the click point:
  - Width: 0 → 40px radius
  - Opacity: 0.15 → 0
  - Duration: 400ms
  - This is the visual equivalent of a piano string vibrating — the energy radiates outward from the point of impact

**On mouseup / touchend:**
- translateY: 2px → 0 (full spring return)
- Duration: 260ms with spring curve
- All values return to default

### 14.5 Button Typography

All buttons use the same typographic specification:

- Font family: System sans-serif (the body font) — NOT Cormorant Garamond. Buttons are functional, not decorative. They are the "mechanics" of the instrument, not the "music."
- Font size: 13px
- Font weight: 500
- Letter-spacing: 0.06em (default), 0.05em (hover — the compression)
- Text-transform: none — sentence case, verb-forward
- No exclamation marks. Ever. Confidence does not shout.

**CTA Label Rules:**
- Always verb-forward: "Hold my date," "Begin the conversation," "Tell me your story"
- Never generic: No "Submit," "Book Now," "Get Started," "Sign Up"
- Always first-person possessive where applicable: "my date," "your story," "your event"
- Maximum 4 words. Fewer is better. The best CTAs are 2–3 words.

### 14.6 Button Sizing

- Height: 44px (matches minimum touch target — accessibility non-negotiable)
- Horizontal padding: 28px (generous — the key has room to breathe)
- Border-radius: 2px (barely rounded — this is not a playful brand. Buttons are precise, architectural.)
- Minimum width: 120px (prevents tiny buttons that feel like afterthoughts)
- Maximum width: 280px (prevents buttons that dominate — lagom, just the right amount)

### 14.7 Focus States

Every button must have a visible focus state for keyboard navigation:

- Focus ring: 2px solid hsl(var(--ring)) at 70% opacity
- Ring offset: 4px from button edge (the ring "breathes" around the button)
- Ring color: Vow-yellow on dark backgrounds, charcoal on light backgrounds
- Ring animation: None — the ring appears instantly. Focus is not theatrical. It is functional.
- The ring must be visible even when the button is in its hover or active state

### 14.8 Disabled States

When a button is disabled (e.g., "You're Here" on the Contact page):

- Opacity: 0.40
- Cursor: default (no pointer — the key cannot be pressed)
- No hover effects — the key is "locked"
- No depression — the mechanical action is disabled
- The text remains readable (contrast ratio still meets 3:1 minimum)
- A subtle text change: The label might become past-tense or affirmative ("You're Here" instead of "Contact")

### 14.9 Context-Aware Variant Selection

The correct button variant is NEVER a design decision. It is a background decision:

| Section Background | Primary CTA Variant | Secondary CTA Variant |
|---|---|---|
| Dark (charcoal/black) | primary-dark | ghost-dark |
| Light (cream/white) | primary-light | ghost-light |
| Accent section | primary-dark (contrast with yellow) | ghost-dark |
| Header (transparent → fog) | accent | — |
| Footer (dark) | ghost-dark | text-link |
| Full-screen menu | text-link (the items ARE the nav) | icon-only |

This table is the law. Deviating from it creates visual inconsistency that erodes the "every key on this piano responds the same way" brand promise.

---

## XV. THE HOVER ANIMATION COMPENDIUM — EVERY INTERACTIVE ELEMENT

### 15.1 The Principle

Every interactive element on the site has a hover animation. No element is "just a link." Every element is a key on the instrument. This section catalogs every hover animation to ensure sitewide consistency.

### 15.2 Navigation-Specific Hover Animations

| Element | Hover Effect | Timing | Easing |
|---|---|---|---|
| Wordmark ("Parker Gawryletz") | Letter-spacing 0.08em → 0.12em | 260ms | Sacred |
| Nav link (header) | 1px depression + vow-yellow underline draw (center out) + spotlight damper on siblings | 180ms depression, 450ms underline | Sacred |
| Menu trigger (hamburger) | Piano-string lines expand to equal 20px width | 180ms | Sacred |
| Full-screen menu item | 1px depression + text color → vow-yellow + spotlight damper (others → 30%) + vine underline grows | 180ms depression, 180ms color, 450ms vine | Sacred |
| Footer nav link | 1px depression + opacity 0.60 → 1.0 | 180ms | Sacred |
| Footer social icon | 1px depression + opacity → 1.0 + faint golden underglow + spotlight damper on sibling icons | 180ms | Sacred |
| Mobile sticky bar CTA | Scale 1.0 → 1.02 + golden aura | 180ms | Sacred |
| Piano Key (section nav) | 2px depression + tooltip appears + golden glow | 180ms depression, 200ms tooltip | Sacred |
| Breadcrumb link | Underline draw center-out + slight weight increase (300 → 400) | 260ms | Sacred |

### 15.3 Content-Area Hover Animations (For Consistency)

| Element | Hover Effect | Timing | Easing |
|---|---|---|---|
| Card component | translateY -2px (card lifts) + box-shadow deepens | 160ms | Sacred |
| Image frame | Inner border opacity 0.06 → 0.12 + subtle scale 1.0 → 1.01 | 260ms | Sacred |
| Testimonial quote | Left border color intensifies (vow-yellow 0.20 → 0.50) | 260ms | Sacred |
| Accordion trigger | 1px depression + chevron rotates 90° | 180ms depression, 260ms rotation | Sacred |
| Genre card | Image opacity increases 10% + gradient overlay lightens | 260ms | Sacred |
| Process card | Scroll-linked tilt deepens by 1° + embossed numeral catches more light | 260ms | Sacred |
| Pricing tier | Border opacity increases + subtle vow-yellow glow appears | 260ms | Sacred |
| Download link | Arrow icon translateX 4px (slides right) + underline draw | 260ms | Sacred |
| FAQ chip | Background opacity increases + 1px depression | 180ms | Sacred |

### 15.4 The "No Dead Pixels" Rule

There must be no interactive element on the site that does not respond to hover. If it can be clicked, it must respond to being hovered. If it responds to hover, it must follow the piano-key depression model (at minimum, 1px translateY). No exceptions.

This creates a sitewide tactile sensation — the visitor learns, within the first 3 seconds, that this site responds to their presence. Every surface is alive. Every element is a key waiting to be played.

---

## XVI. THE NORTH STAR QUESTIONS FOR NAVIGATION

Before implementing any navigation element, ask:

1. **Does this feel like a ceremony arch?** Does it frame the content with the reverence of a wedding venue?
2. **Does this feel like a piano?** Does the interaction have the mechanical weight and resonance of a key being struck?
3. **Does this honor the vigil?** Does the default state respect the quiet anticipation before the visitor acts?
4. **Does this celebrate the arrival?** Does the footer state create a sense of completion and unity?
5. **Would I notice this at a wedding?** Navigation should be like a good wedding coordinator — invisible when everything is going right, immediately present when needed.
6. **Does this reduce anxiety?** The visitor should always know where they are, where they can go, and how to get back.
7. **Is this lagom?** Is it just the right amount — not too much, not too little? Does every element earn its place?
8. **Does this tell a story?** Is the navigation itself part of the brand narrative, or is it just a utility bolted on top?
9. **Would Fantasy.co approve?** Is every millisecond intentional? Is every pixel precise? Is every interaction choreographed?
10. **Is there a sound?** Even though there is no audio, can you "hear" what this interaction sounds like on a piano? If not, it needs more mechanical weight.

---

## XVII. THE COVENANT

This navigation system is a covenant between the brand and the visitor:

- **I covenant** that the header will always guide you without demanding your attention.
- **I covenant** that the footer will always welcome you when you reach the end.
- **I covenant** that the Arrival will reward your journey with beauty you didn't expect.
- **I covenant** that every button will respond to your touch with the care of a finely regulated piano action.
- **I covenant** that this navigation will never confuse you, never trap you, never shout at you.
- **I covenant** that the vine threads will always connect the crown to the foundation, because every ceremony deserves an arch.

'Til Death ; Unto Life.

---

*Version 4.0 — Expanded with complete button architecture (Section XIV), hover animation compendium (Section XV), contextual vertical adaptation (Section XII), ADSR interaction envelope model, hammer velocity awareness, and deepened piano/wedding fusion metaphors throughout. This document is the definitive specification for the Ceremony Arch navigation system.*
