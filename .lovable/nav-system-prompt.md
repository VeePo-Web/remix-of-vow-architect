# THE CEREMONY ARCH — Bespoke Navigation System Architecture

## A North Star Document for Parker Gawryletz's Navigation Experience
### Version 2.0 — Exhaustive Specification

---

## PREAMBLE: WHY THIS DOCUMENT EXISTS

This is not a navigation specification. It is a **covenant** — a binding agreement between the brand's soul and every pixel, every millisecond, every interaction state that a visitor will ever encounter. The navigation system for parkergawryletz.com is not a menu. It is the **architectural frame of a ceremony venue**, rendered in code.

Every decision documented here flows from a single truth: **the browser viewport is a chapel.** The header is the arch above the altar. The footer is the threshold stone beneath. Between them, the brand story unfolds like a wedding ceremony — from the held breath of the vigil, through the processional walk, to the covenant sealed at the close.

When the visitor scrolls to the bottom of any page, the header and footer **synchronize into a single breathing entity** — an easter egg that rewards completion, mirrors the wedding journey from processional to recessional, and transforms the browser window itself into a ceremony venue. This is not decoration. This is the physical manifestation of the brand promise: *'Til Death ; Unto Life.*

---

## I. THE SINGULAR TRUTH OF NAVIGATION

Navigation on this site is a **threshold**. Like the arch at the front of a ceremony venue, the header exists to orient, to shelter, and to sanctify what lies beneath it.

The navigation system and footer together form a **unified ceremonial frame** — a living bookend that opens the page journey (the arch) and closes it (the covenant). The frame breathes. The frame responds. The frame remembers.

**The Core Metaphor:** The browser viewport is a chapel. The header is the arch above the altar. The footer is the threshold stone beneath. Between them, the brand story unfolds like a ceremony.

**The Core Interaction Model:** Every interactive element follows **piano-key physics** — the weight, mechanism, and resonance of a real instrument. Nothing clicks. Everything *plays*.

**The Core Emotional Arc:** Vigil (anticipation) → Processional (direction) → Ceremony (content) → Covenant (commitment) → Arrival (sacred stillness).

---

## II. THE MULTI-VERTICAL ARCHITECTURE

The site serves three distinct verticals, each accessed via the Gateway page:

### The Gateway — The Narthex
The Gateway is the **narthex** — the entry hall of the chapel. Three doors lead to three distinct experiences:

1. **Weddings** (`/weddings`) — The primary vertical. The full 7-page navigation structure.
2. **Teaching** (`/teaching`) — Piano mentorship. Its own emotional architecture.
3. **Events** (`/events`) — Corporate and private events. Its own tone.

### Vertical-Specific Navigation Behavior:

#### Weddings Vertical:
- **Header nav links:** Pricing, About, Proof (+ "Hold My Date" CTA)
- **Full-screen menu:** 8 items (Home, Events, Pricing, About, Proof, FAQ, Listen, Contact)
- **Emotional temperature:** Sacred, reverent, ceremonial. The vigil space.
- **CTA language:** "Hold my date" — a vow, not a booking
- **Footer tagline:** "'Til Death ; Unto Life." — the full covenant
- **Piano Key Nav (sidebar):** Section-specific, appears after hero

#### Teaching Vertical:
- **Header nav links:** Same global structure, but CTA adapts: "Begin the conversation"
- **Emotional temperature:** Patient, warm, inviting. The practice room.
- **CTA language:** "Begin the conversation" — reflecting the "First Conversation" methodology
- **Footer adapts:** Same structure, but subtitle shifts to context-aware text
- **Piano Key Nav:** Not present (teaching pages use simpler section flow)

#### Events Vertical:
- **Header nav links:** Same global structure, CTA adapts: "Discuss your event"
- **Emotional temperature:** Confident, professional, warm. The concert hall.
- **CTA language:** "Discuss your event" — direct, professional
- **Piano Key Nav:** Not present

### Cross-Vertical Navigation:
- The full-screen menu always shows all verticals — the visitor can move between worlds
- The Gateway is accessible from any vertical via the logo (which always links to `/`)
- Breadcrumbs are not used — the site is shallow enough that orientation is maintained by the header state alone

---

## III. THE THREE STATES — A WEDDING IN MINIATURE

The header transitions through three emotional states that mirror the wedding journey. Each state has been engineered to the millisecond.

### State 1: THE VIGIL (Top of Page — scrollY < 1vh)
**Emotional Temperature:** Held breath. Sacred anticipation. The moment before the doors open.

**Visual Specification:**
- Background: `transparent` — no material presence whatsoever
- Logo: `font-display text-base tracking-wide text-foreground`
- Logo animation: `opacity: 0 → 1` via `animate-fade-in`
  - First visit: `animationDelay: 6200ms` (waits for Vigil Sequence to complete)
  - Return visit: `animationDelay: 0ms` (sessionStorage flag `vigil-complete`)
- Menu button: Same animation timing as logo
- No nav links visible
- No scroll progress thread
- No vine thread
- No atmospheric layers

**Behavioral Specification:**
- The header is `position: fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: 50`
- Height: `auto` (content-driven, approximately 72px with padding)
- The page content shows through — the header is a ghost, a whisper
- Padding: `px-[var(--hero-space-edge, 24px)] md:px-[var(--hero-space-edge, 48px)] py-6`

**Why This Matters:**
The visitor has just arrived. They are in the vestibule. The ceremony has not yet begun. Navigation should not compete with the hero's emotional opening. The Vigil Sequence on the homepage is an 8-second orchestrated reveal — the header must not upstage it. It must *wait*. It must honor the vigil.

**Sound Metaphor:** A single sustained note — pure, unadorned, waiting. The damper pedal held.

---

### State 2: THE PROCESSIONAL (scrollY > 1vh, footer not visible)
**Emotional Temperature:** Forward motion. The walk down the aisle. Purpose and direction.

**Visual Specification — Glass-Morphic Bar:**
- Height: `56px` (locked, never changes during this state)
- Background: `rgba(10, 10, 12, 0.94)` — near-black with 6% transparency for material depth
- Backdrop filter: `blur(12px)` — premium glass frosting
- Transition into this state: `260ms cubic-bezier(0.22, 0.61, 0.36, 1)` — the brand's signature easing

**Atmospheric Layers (4 total, stacked with `pointer-events: none`):**

1. **Candlelight Warmth (Layer 1):**
   - `radial-gradient(ellipse 80% 120% at 50% 100%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 60%)`
   - Purpose: A single candle burns beneath the navigation bar. Warmth rises from below.
   - Arrival intensification: opacity increases to `0.04`

2. **Secondary Warmth Pool (Layer 2):**
   - `radial-gradient(ellipse 60% 100% at 50% 50%, hsl(var(--vow-yellow) / 0.008) 0%, transparent 50%)`
   - Purpose: Centered ambient warmth. Barely perceptible.
   - Arrival behavior: Begins `header-warmth-bloom` animation (6s ease-in-out infinite, opacity oscillates 0.6 → 1)
   - Arrival intensification: base opacity increases to `0.018`

3. **Edge Vignette (Layer 3):**
   - `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.18) 100%)`
   - Purpose: Creates depth. The bar feels recessed, not flat. The edges darken as if light falls off.
   - Static — does not change with arrival

4. **Film Grain (Layer 4):**
   - CSS class: `.grain` (defined globally in index.css)
   - Normal opacity: `0.03` — barely visible, but adds materiality
   - Arrival opacity: `0.05` — intensifies, as if the grain of aged wood becomes more visible in warm light
   - Transition: `opacity 700ms ease`
   - `will-change: opacity` for GPU compositing

**Scroll Progress Thread (Top Edge):**
- Position: `absolute top-0 left-0`
- Height: `1px` — razor-thin golden line
- Width: Dynamically bound to scroll progress (`scrollY / (docHeight - viewportHeight) * 100%`)
- Color: `linear-gradient(90deg, hsl(var(--vow-yellow) / 0.3), hsl(var(--vow-yellow) / 0.45))`
- Glow: `box-shadow: 0 0 4px hsl(var(--vow-yellow) / 0.08)`
- Update mechanism: `requestAnimationFrame`-throttled (no raw scroll listeners)
- Arrival intensification: glow expands to `8px`, opacity increases to `0.5 / 0.7`
- Metaphor: The golden thread is the timeline of the ceremony — processional to recessional. At 100%, the ceremony is complete.

**Organic Vine Thread (Bottom Edge):**
- SVG element: `viewBox="0 0 1200 6"`, `preserveAspectRatio="none"`
- Path: `M0,3 Q50,1.5 100,3 T200,3 Q250,4.5 300,3 T400,3 Q450,1.5 500,3 T600,3 Q650,4.5 700,3 T800,3 Q850,1.5 900,3 T1000,3 Q1050,4.5 1100,3 T1200,3`
- This path creates a gentle undulating wave — not a straight line, but an organic vine thread that feels hand-drawn, alive
- Stroke: Linear gradient from transparent edges to `hsl(45 100% 76% / 0.12-0.15)` center
- Drop-shadow: `0 0 4px hsl(45 100% 76% / 0.04)`
- Entrance: `animate-fade-in` at `450ms`
- Arrival intensification: gradient stops increase to `0.3 / 0.35` opacity; drop-shadow to `6px` at `0.1` opacity
- Arrival behavior: CSS class `header-vine-breathe` applied — synchronized 4s breathing cycle with footer

**Navigation Links — Piano Key Depression + Spotlight:**

Three primary links (Pricing, About, Proof) plus "Hold My Date" CTA:

- **Entrance:** Staggered `animate-fade-in` at 80ms intervals per link. CTA appears last.
- **Exit (scroll back up):** Reverse-staggered fade-out — last link exits first, creating a "recessional" feel
- **Container:** `display: flex`, `align-items: center`, `gap: 32px` (8 * 4px = 2rem)
- **Link styling:** CSS class `.nav-link` — `text-xs font-sans uppercase tracking-[0.22em]`

**Individual Link Interaction States:**

| State | Transform | Opacity | Text Color | Text Shadow | Duration | Easing |
|-------|-----------|---------|------------|-------------|----------|--------|
| Rest | `translateY(0)` | 1.0 | `--muted-foreground` | none | — | — |
| Hover | `translateY(1px)` | 1.0 | `--primary` | none | 180ms | brand |
| Press | `translateY(2px)` | 1.0 | `--primary` | none | 60ms | ease-out |
| Release | `translateY(1px)` → `translateY(0)` | 1.0 | transitions back | none | 180ms | brand |
| Active (current page) | `translateY(0)` | 1.0 | `--foreground` | none | — | — |
| Dimmed (spotlight) | `translateY(0)` | 0.35 | unchanged | none | 180ms | brand |

**Vow-Yellow Underline (per link):**
- Position: `absolute -bottom-1 left-0 w-full`
- Height: `1px`
- Origin: `center` — draws outward from center
- Color: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)`
- Active page: `scale-x-100` with `box-shadow: 0 0 6px hsl(var(--vow-yellow) / 0.1)`
- Hover: `scale-x-100` (draws from center)
- Duration: `450ms` — the sacred reveal timing. Not fast. Not slow. The pace of a vow.

**Spotlight Dimming Logic:**
- `onMouseEnter` on nav container sets `hoveredNavIndex`
- `onMouseLeave` on nav container resets to `null`
- When `hoveredNavIndex !== null && hoveredNavIndex !== i`: link gets `opacity: 0.35`
- This creates a **piano spotlight** effect — like a stage light following the pianist's hands. Only the hovered note is illuminated.

**"Hold My Date" CTA:**
- Wrapped in a `<span>` with a radial gradient glow pool behind it:
  `radial-gradient(ellipse at center, hsl(45 100% 76% / 0.06) 0%, transparent 70%)`
- On contact page: text changes to "You're here" and glow disappears (the vow has been made)
- Participates in spotlight dimming like other nav links
- Has the same piano-key depression physics (1px hover, 2px press)
- CSS class: `.nav-link--cta` — golden hover drop-shadow: `0 0 6px hsl(var(--vow-yellow) / 0.3)`

**Logo Behavior During Processional:**
- Remains left-aligned
- Candle warmth pool behind logo: `radial-gradient(circle 60px at center, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)`
- Hover: text color shifts to `--primary` (Vow Yellow)
- Has `focus-visible` ring for keyboard navigation

---

### State 3: THE ARRIVAL (Footer Bookend Visible)
**Emotional Temperature:** The recessional. The moment after the vows. Completion and covenant.

This is the **easter egg** — the reward for scrolling to the end. The header and footer become one unified frame.

**Detection Mechanism:**
- IntersectionObserver watches `[data-footer-bookend]` element
- Threshold: `0.5` — triggers when half the bookend is visible
- Sets `isAtFooter` state, which combined with `isScrolled` creates `isArrival`

**Phase 1 — Dissolving:**
Duration: `navLinks.length × 80ms + 300ms` (total ≈ 540ms for 3 links)

The navigation links perform a **recessional dissolve** — fading out in reverse order. Just as a wedding party exits in reverse (last bridesmaid first, maid of honor last), the navigation links retreat:

- Each link: `opacity: 0`, `transform: translateY(-4px)`
- Stagger: 80ms intervals, **reverse order** (last link dissolves first)
- "Hold My Date" CTA dissolves first (delay 0ms) — it served its purpose. The vow has been offered.
- `transitionTimingFunction: cubic-bezier(0.22, 0.61, 0.36, 1)` — brand easing
- After all links dissolve: nav container collapses (`width: 0`, `overflow: hidden`, `pointer-events: none`)

**Phase 2 — Arrived:**
The ceremony frame closes. The officiant (logo) moves to center stage.

- **Logo Glide:** Transform-based centering:
  `transform: translateX(calc(50vw - 50% - var(--hero-space-edge, 48px)))`
  - Duration: `450ms`
  - Easing: `cubic-bezier(0.22, 0.61, 0.36, 1)`
  - The logo physically glides from left to center — this is the officiant stepping forward after the vows

- **Logo Ceremonial Glow:**
  - Text-shadow: `0 0 24px hsl(var(--vow-yellow) / 0.1), 0 0 60px hsl(var(--vow-yellow) / 0.04)`
  - Transition: `text-shadow 700ms ease`
  - Candle warmth pool behind logo intensifies: `0.03 → 0.08` opacity

- **Vow-Yellow Underline Under Logo:**
  - `scale-x-0 → scale-x-100` at `450ms`, delayed `200ms` after logo arrives
  - Color: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)`
  - Glow: `box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.12)`
  - Origin: `center` — draws outward from center, like a blessing spreading

- **Menu Button Softening:**
  - Opacity: `0.4` (still accessible but whispers)
  - Transition delay: `200ms`
  - The menu is still reachable — accessibility is never compromised — but it steps back

- **Arrival Tagline:**
  - "'Til Death ; Unto Life." appears below the header
  - Position: `absolute bottom-[8px] left-1/2 -translate-x-1/2`
  - Animation: `arrival-tagline-rise` — `opacity: 0, translateY(8px)` → `opacity: 1, translateY(0)` over `700ms`
  - Delay: `300ms` after arrival phase begins
  - Font: `font-display text-[10px] text-foreground/15 tracking-[0.18em]` — a ghost, barely visible
  - Semicolon: `text-primary/25` with `semicolon-heartbeat` animation (2s cycle, 1s delay)
  - This is not a CTA. It is a **covenant echo** — the same words that appear in the footer, now mirrored in the header. The frame is complete.

- **Vine Thread Synchronization:**
  - CSS class `header-vine-breathe` applied
  - The header's vine thread now breathes on a **shared 4s cycle** with the footer's vine thread
  - Both vines pulse between their base opacity and 1.5× base
  - The visual impression: a single golden thread runs from the top of the viewport to the bottom, pulsing with the rhythm of a heartbeat

**Atmospheric Intensification Summary:**

| Layer | Normal | Arrival | Transition |
|-------|--------|---------|------------|
| Candlelight warmth | 2.5% opacity | 4% opacity | 900ms |
| Secondary warmth | 0.8% opacity, static | 1.8% opacity, 6s breathe | 700ms |
| Film grain | 3% opacity | 5% opacity | 700ms |
| Scroll progress glow | 4px, 8% | 8px, 15% | 700ms |
| Vine thread gradient | 12-15% | 30-35% | 450ms |
| Logo candle pool | 3% | 8% | 900ms |

---

## IV. THE FULL-SCREEN MENU — "THE SCORE"

Opening the menu is like opening a musical score. The world falls away. The lights dim. You are alone with the music — alone with the navigation, in the deepest, most sacred space of the brand.

### The Inhale/Exhale Model:
- **Opening the menu** is an **inhale** — the world contracts, darkens, focuses
- **Closing the menu** is an **exhale** — the world expands, lightens, releases
- The menu transition itself is `opacity 260ms` — quick enough to feel responsive, slow enough to feel intentional

### Atmospheric Layers (5 total):

1. **Film Grain (Layer 1):**
   - CSS class: `.grain`
   - Opacity: `0.06` — heavier than the header (6% vs 3%) because this is the vigil space
   - `will-change: opacity` for GPU compositing
   - Purpose: Sacred texture. The grain of aged parchment, of ceremony programs, of piano wood.

2. **Edge Vignette (Layer 2):**
   - `radial-gradient(ellipse at center, transparent 25%, hsl(240 9% 2% / 0.6) 70%, hsl(240 9% 1%) 100%)`
   - Purpose: Concentrates focus inward. The edges of the viewport darken, creating a tunnel of attention toward the menu items. Like looking down the nave of a dark cathedral.

3. **Primary Candlelight (Layer 3):**
   - `radial-gradient(ellipse 50% 70% at 25% 45%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 50%)`
   - Position: Left of center, where the menu items sit
   - Purpose: A single candle illuminates the score. The light falls on the music, not the walls.

4. **Secondary Candle Warmth (Layer 4):**
   - `radial-gradient(ellipse at 50% 55%, hsl(var(--vow-yellow) / 0.015) 0%, transparent 35%)`
   - Animation: `menu-candle-breathe` — 6s ease-in-out infinite, opacity oscillates 0.7 → 1
   - Purpose: The candle breathes. The light is alive. This is not a screen; this is a vigil.

5. **Deep Charcoal Fog (Layer 5):**
   - `radial-gradient(ellipse at 70% 80%, hsl(222 10% 7% / 0.4) 0%, transparent 45%)`
   - Animation: `menu-fog-drift` — 18s ease-in-out infinite alternate
   - Transform: `translate(0, 0) scale(1)` → `translate(-1.5%, 0.8%) scale(1.03)`
   - Purpose: Atmospheric depth. The fog drifts slowly, as if smoke from extinguished candles moves through a darkened venue. Barely perceptible, but subconsciously felt.

### Menu Items as Piano Keys:

8 items, numbered 01–08, arranged vertically:

| # | Label | Key Type | Indent | Purpose |
|---|-------|----------|--------|---------|
| 01 | Home | White | 0 | Return to the beginning |
| 02 | Events | Black | 12-16px | Explore the other verticals |
| 03 | Pricing | White | 0 | Understand the offering |
| 04 | About | Black | 12-16px | Meet the witness |
| 05 | Proof | White | 0 | See the covenant kept |
| 06 | FAQ | Black | 12-16px | Address the fears |
| 07 | Listen | White | 0 | Hear the sound |
| 08 | Contact | Black | 12-16px | Cross the threshold |

**The White/Black Key Pattern:**
- Even-indexed items (0, 2, 4, 6) = **White keys** — flush left, larger presence
- Odd-indexed items (1, 3, 5, 7) = **Black keys** — indented with `md:pl-3 lg:pl-4`
- Black keys have a subtle vertical shadow bar at their left edge:
  `linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.03), transparent)`
  This shadow intensifies to `0.08` on hover — the physical depth of a black key

**Typography Hierarchy:**
- Font: `font-display` (Cormorant Garamond)
- Size: `text-3xl md:text-4xl lg:text-5xl` — large, commanding, readable
- Numbers: `text-xs font-sans min-w-[2.5ch] tabular-nums` — small, precise, muted
- Gap between number and label: `gap-4 md:gap-6`
- Active page number: `text-primary/50` (golden tint)
- Inactive number: `text-muted-foreground/40`, hover: `text-primary/25`

**Piano Key Depression Physics:**

| State | Transform | Duration | Easing | Visual Effect |
|-------|-----------|----------|--------|---------------|
| Rest | `translateY(0)` | — | — | Neutral position |
| Hover | `translateY(1px)` | 180ms | `cubic-bezier(0.22,0.61,0.36,1)` | Key lifts from anticipation |
| Press | `translateY(2px)` | 60ms | `cubic-bezier(0.4, 0, 1, 1)` | Key snaps down — hammer strikes string |
| Release | Back to hover → rest | 180ms | brand easing | Key returns with resonance |

**Text Shadow on Hover:**
- `0 0 30px hsl(var(--vow-yellow) / 0.08)` — golden warmth, as if the key glows when touched
- Active page: `0 0 20px hsl(var(--vow-yellow) / 0.05)` — persistent but quieter

**Spotlight Dimming:**
- `hoveredIndex !== null && hoveredIndex !== index`: opacity `0.2`
- Deeper dimming than header (0.2 vs 0.35) because the vigil space demands more focus
- Only the hovered key is fully illuminated — like a single key lit on a dark stage

**Golden Thread Connections:**
- Between each item: a 1px vertical golden line, 10px tall
- Normal opacity: `hsl(var(--vow-yellow) / 0.06)` — barely visible
- When either adjacent item is hovered: opacity increases to `0.25`
- These threads are the **bar lines** of the musical score — structural divisions that connect the measures

**Underline Draw:**
- `absolute -bottom-1 left-0 w-full h-[1px] origin-left`
- Active page: `scale-x-100`, gradient from golden to transparent, with `8px` glow
- Hover: `scale-x-100`, same gradient but weaker glow (`6px`)
- Duration: `450ms` — sacred reveal timing
- Origin: `left` (not center like header) — draws from the beginning, like reading music left to right

**Musical Staff Lines:**
- 5 faint horizontal rules positioned behind the menu items
- Created with div elements, each `w-full h-px`
- Opacity: `2.5-4%` foreground color (center line slightly stronger)
- Spacing: `48px` apart (one octave of visual space)
- Entrance: staggered at `600ms + line * 60ms` after menu opens
- These create the impression of sheet music — the five-line staff on which the navigation notes sit

### Stagger Choreography (The Orchestration):

| Element | Delay | Duration | Animation |
|---------|-------|----------|-----------|
| Overlay background | 0ms | 260ms | opacity 0 → 1 |
| Close button | 300ms | 260ms | opacity 0 → 1 |
| Menu item 01 | 300ms | 260ms | translateY(24px) → 0, opacity 0 → 1 |
| Menu item 02 | 360ms | 260ms | same |
| Menu item 03 | 420ms | 260ms | same |
| Menu item 04 | 480ms | 260ms | same |
| Menu item 05 | 540ms | 260ms | same |
| Menu item 06 | 600ms | 260ms | same |
| Menu item 07 | 660ms | 260ms | same |
| Menu item 08 | 720ms | 260ms | same |
| Staff lines | 600-900ms | 700ms | opacity 0 → 1 |
| Vine thread | 700ms | 400ms | opacity 0 → 1 |
| Contact info | 750ms | 300ms | translateY(16px) → 0, opacity 0 → 1 |
| Covenant bookend | 850ms | 400ms | opacity 0 → 1 |

Total orchestration time: ~1050ms from open. Every element has its entrance cue, like instruments entering a score.

### Link Click Behavior:
- `onClick`: preventDefault, set pressedIndex, tactile delay of `120ms`
- After delay: reset pressedIndex, close menu, navigate via `usePageTransition`
- The 120ms delay is **not** a performance issue — it is the **mechanical travel time** of a piano key. The user *feels* the press before the page changes.

### Close Interaction:
- "Close" label + X icon with `rotate-90` on hover
- Both elements: `text-muted-foreground`, hover: `text-primary`
- Escape key closes (event listener added on mount, removed on unmount)
- Focus trap: Tab cycles through all interactive elements, Shift+Tab reverses
- First focusable element receives focus on open

### Covenant Bookend (Coda):
- Breathing golden dot: `w-1.5 h-1.5 rounded-full`
  - Background: `hsl(var(--vow-yellow) / 0.35)`
  - Box-shadow: `0 0 6px hsl(var(--vow-yellow) / 0.1)`
  - Animation: `menu-dot-breathe` — 4s ease-in-out infinite
  - Opacity oscillates: `0.4 → 0.8`; shadow: `4px → 10px`
- Tagline: `font-display text-sm text-foreground/25 tracking-wide`
- Semicolon: `text-primary/40` with `semicolon-heartbeat` (2s infinite)
- This is the **coda** — the final notation that signals the piece is complete

---

## V. THE UNIFIED CEREMONIAL FRAME — THE EASTER EGG

When a visitor reaches the bottom of any page, the header and footer become one. This is the most important design detail on the entire site.

### The Concept:
Imagine a wedding venue. The arch at the front. The threshold at the back. During the ceremony, they are separate — distant. But at the moment the couple turns to face their guests as married, the arch and threshold become a single frame around them. The venue itself becomes the witness.

That is what happens here. The header arch and footer threshold **synchronize** — their golden threads breathe together, their atmospheric layers intensify in harmony, their taglines echo each other. The browser viewport becomes the venue.

### Technical Implementation:

**Shared Detection:**
Both `MinimalHeader` and `Footer` independently observe `[data-footer-bookend]` via IntersectionObserver (threshold 0.5). They do not communicate directly — they respond to the same signal, like two musicians watching the same conductor.

**Synchronized Breathing:**
- Header vine thread: CSS class `header-vine-breathe` (4s cycle)
- Footer vine thread: CSS class `footer-vine-breathe` (4s cycle)
- Both defined in index.css with identical timing: `4s ease-in-out infinite`
- The cycles start when arrival is detected — since both trigger from the same IntersectionObserver event, they naturally sync
- Visual effect: opacity pulses between base and 1.5× base, creating the impression of a single golden thread connecting top to bottom

**Mirror Symmetry:**
- Header vine path: Q peaks point **downward** (toward content)
- Footer vine path: Q peaks point **upward** (toward content, mirror of header)
- When both are visible during arrival, they create a visual **parenthesis** — `( content )` — framing the covenant

**Atmospheric Harmony:**
During arrival, both header and footer intensify their atmospheric layers:

| Property | Header (Normal → Arrival) | Footer (Normal → Arrival) |
|----------|--------------------------|--------------------------|
| Film grain | 3% → 5% | 6% → 8% |
| Warm fog | 0.8% → 1.8% | 1.5% → 3.5% |
| Candlelight | 2.5% → 4% | 1.5% → 3% |
| Vine thread | 12% → 30% | 10% → 30% |
| Vignette | Static | Breathes on arrival |

**Tagline Echo:**
- Header: `'Til Death ; Unto Life.` at `10px, 15% opacity` — a whisper, a ghost
- Footer: `'Til Death ; Unto Life.` at `sm, 40% opacity` — a statement, a covenant
- Both use the semicolon heartbeat animation (2s cycle)
- The repetition is intentional — it is the same covenant, spoken twice: once as a whisper of hope (header), once as a declaration of commitment (footer)

**Mobile Coordination:**
- The `MobileStickyBar` fades out (`opacity-0, translate-y-full`) when the footer bookend enters the viewport
- This prevents CTA duplication and allows the footer's own CTA to take primacy
- The mobile dot navigator also fades, giving the arrival state full visual authority

---

## VI. THE PIANO KEY SIDEBAR NAVIGATOR

A bespoke vertical section navigator fixed to the right viewport edge (desktop/tablet only, hidden on mobile).

### Visual Design:
- Fixed position: right edge of viewport, vertically centered
- Alternating white and black 3D keys using gradients and negative margins
- **White keys:** `w-7 h-[18px]`, background gradient from `hsl(0 0% 95%)` to `hsl(0 0% 85%)`, rounded-r corners
- **Black keys:** `w-5 h-[14px]`, background gradient from `hsl(222 10% 18%)` to `hsl(222 10% 12%)`, negative margin to overlap white keys, higher z-index
- Each key has a `1px` bottom border for depth separation
- **Golden thread progress line:** Behind the keys, a 1px vertical golden line fills downward based on scroll depth

### Interaction:
- Click: Smooth-scroll to section via `lenis.scrollTo(target, { offset, duration: 800 })`
- **Key depression:** `translateX(-3px)` on click (key presses inward toward content)
  - Duration: 60ms snap, 450ms release with overshoot
  - Overshoot: `cubic-bezier(0.22, 1.36, 0.36, 1)` — the key bounces slightly past rest on release
- **Active glow:** Active section key gets `box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.3)` and a warm golden hue
- **Tooltip:** Named section label appears on hover, offset from key

### Entrance Animation:
- One-time staggered entrance on first scroll past hero
- Each key: `translateX(20px) → translateX(0)` at `40ms` stagger intervals
- Total entrance: `sections.length * 40 + 260ms`
- `hasAnimated` flag prevents re-triggering

### Accessibility:
- `role="navigation"`, `aria-label="Page sections"`
- Each key: `role="button"`, `aria-label={section.label}`, `tabIndex={0}`
- Keyboard: Enter/Space activates scroll
- Tooltip uses `aria-hidden="true"` (the aria-label carries the information)

---

## VII. BUTTON PHILOSOPHY — THE PIANO KEY AS INTERFACE

Every button on this site is a piano key. Not literally — but in its physics, its feedback, and its emotional weight. The button component (`src/components/ui/button.tsx`) implements this through carefully layered CSS.

### The Physics Model:

**Rest → Hover → Press → Release** mimics the mechanical action of a piano key:

1. **Rest (translateY: 0, scale: 1):** The key sits at its natural position. Shadow at rest depth. Ready.
2. **Hover (translateY: -1px, scale: 1.02):** The key lifts — magnetic anticipation. Shadow deepens and extends beneath, creating the illusion of the key rising away from the surface. This is the moment your finger approaches the key.
3. **Press (translateY: 0, scale: 1):** The key depresses back to or past its rest position. Shadow compresses to minimum. This is the hammer striking the string. The duration is **instantaneous** — the active state must feel certain, committed.
4. **Release (back to rest over 250ms):** The key returns with the resonance of a struck note. The brand easing (`cubic-bezier(0.22, 0.61, 0.36, 1)`) provides a gentle deceleration — the key doesn't snap back; it *settles*.

### Shadow as Depth Indicator:

Each button variant uses three shadow states:
- **Rest shadow:** The button's natural elevation
- **Hover shadow:** Deeper, wider — the button has risen, its shadow stretches
- **Active shadow:** Compressed, tight — the button has pressed down, its shadow contracts

For the primary (Vow Yellow) button:
- Rest: `0 8px 24px rgba(255,224,138,0.18)` — warm candlelight beneath
- Hover: `0 12px 32px rgba(255,224,138,0.28), 0 0 16px rgba(255,224,138,0.08)` — glow intensifies, secondary aura appears
- Active: `0 4px 12px rgba(255,224,138,0.12)` — compressed, the key is down

### Brand Easing:
All button transitions use `cubic-bezier(0.22, 0.61, 0.36, 1)` — the site's signature easing curve. This curve has:
- A gentle start (0.22 — not aggressive)
- A strong middle (0.61 — purposeful)
- A soft landing (0.36, 1 — settles gracefully)

It feels like a piano key's return mechanism — controlled, weighted, musical.

### Variant Specifications:

*(See Section V of the previous version for full variant descriptions with brand narratives)*

### Universal Specifications:
- Shape: `rounded-full` — pill/capsule form. Organic, non-aggressive, inviting
- Font: `font-display` (Cormorant Garamond) at `15px` with `font-medium` weight
- The serif font carries gravitas that sans-serif cannot. Buttons on this site are not clickable rectangles — they are engraved invitations.
- Focus: `ring-[3px] ring-primary/70` — golden focus ring, visible and accessible
- Disabled: `opacity-50, pointer-events-none` — the piano lid is closed
- SVG icons: `pointer-events-none, size-4, shrink-0` — icons serve the label, never distract

---

## VIII. THE FOOTER — "THE COVENANT CLOSE"

The footer is not an afterthought. It is the **threshold stone** — the final step of the ceremony, where the couple crosses from the sacred space into their new life together.

### Architecture:
- 3-column grid on desktop: "Parker Gawryletz" (brand) | "Navigate" (7-page list) | "Reach Me" (contact)
- Mobile: single-column stack with same content order

### Atmospheric Layers (5 total, mirroring the header's atmospheric philosophy):

1. **Grain:** 6% normal, 8% arrival
2. **Edge Vignette:** Darkens edges with `hsl(240 9% 2%)`
3. **Top-Center Warm Fog:** `hsl(var(--vow-yellow) / 0.015)`, arrival: `0.035`
4. **Bottom-Center Warm Fog (Dual-Origin):** `hsl(var(--vow-yellow) / 0.012)`, arrival: `0.03`
5. **Breathing Vignette:** On arrival, CSS class `footer-vignette-breathe` — opacity pulses

### Organic Vine Thread (Top Edge — Mirror of Header):
- Same SVG construction as header, but path peaks point **upward** (mirror)
- `d="M0,3 Q50,4.5 100,3 T200,3 Q250,1.5 300,3 ..."`
- On arrival: `footer-vine-breathe` class — synchronized 4s cycle with header

### Navigation Links:
- 7 links in a `<ul>` with `group/nav` spotlight dimming
- Each link: `text-foreground/50`, hover: `text-primary`
- Piano key depression: `hover:translate-y-[1px]`, `active:translate-y-[2px]`
- Spotlight: `group-hover/nav:[&:not(:hover)]:opacity-40`
- Story link underline: `.story-link` class from global CSS

### Social Icons:
- 4 icons: Mail, Phone, Instagram, YouTube
- `group/icons` spotlight dimming: non-hovered icons dim to 40%
- Hover color: `text-vow-yellow` with `drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)]`
- Separated by golden diamond markers: `w-1 h-1 rotate-45` with vow-yellow at 30%
- Touch target: `p-3.5 -m-3.5` — 14px padding creates 46px touch target from 18px icon

### Subtle CTA:
- "Ready to begin?" prompt + "Hold my date" ghost-dark button
- Golden glow pool behind button: `radial-gradient(circle, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)`
- Arrival: glow intensifies via `footer-cta-arrival-glow` class

### Covenant Bookend (`[data-footer-bookend]`):
This is the element that triggers the arrival state site-wide.
- Mini golden thread echo: `h-[1px] w-8`, arrival: breathing
- Triple-glow golden dot: `w-2 h-2 rounded-full`, breathing on 4s cycle (normal) or intensified arrival cycle
- Tagline: `'Til Death ; Unto Life.` with semicolon heartbeat

### Staggered Entrance:
Columns fade in with `150ms` stagger delays when the footer enters the viewport (IntersectionObserver via `useScrollReveal`).

---

## IX. ACCESSIBILITY COVENANT

Navigation accessibility is non-negotiable. It is a sacred duty — the digital equivalent of ensuring every seat at the ceremony has a clear view of the altar.

### Keyboard Navigation:
- **Tab order:** Logo → Nav links (left to right) → CTA → Menu button
- **Focus ring:** `2px solid hsl(var(--ring))` at 70% opacity, `2px offset`, `rounded-sm`
- Ring color: Vow Yellow on dark backgrounds, charcoal on light — always visible
- **Escape:** Closes full-screen menu, any open overlays
- **Arrow keys:** Navigate between menu items in full-screen menu
- **Enter/Space:** Activate focused link or button

### Screen Reader Support:
- `<header>` has implicit `banner` role
- `<nav>` elements have `aria-label` descriptions
- Full-screen menu: `role="dialog"`, `aria-modal="true"`, `aria-label="Site navigation menu"`
- `<span class="sr-only">` provides narrative context for complex visual states
- All decorative layers: `aria-hidden="true"`
- All icons: either `aria-label` on parent or `sr-only` text

### Reduced Motion:
- Media query: `@media (prefers-reduced-motion: reduce)`
- All `animation-duration` values: `0.01ms !important` (effectively instant)
- All `transition-duration` values: `120ms !important` (minimum perceivable)
- Breathing cycles stop
- Piano key depression disabled
- Content and navigation remain fully functional
- The vigil sequence skips to reveal state

### Color Contrast:
- All navigation text: minimum 4.5:1 against background
- Focus indicators: minimum 3:1 against adjacent colors
- Golden accents (`--vow-yellow`): always paired with text labels — never sole information carrier
- Muted text (`foreground/40-50%`): still meets 4.5:1 on dark backgrounds

### Touch Targets:
- All interactive elements: minimum `44px × 44px` touch area
- Achieved via padding (`p-3.5`) on icons and adequate button heights (`h-9` to `h-11`)
- Spacing between targets: minimum `8px` to prevent mis-taps

---

## X. PERFORMANCE STANDARDS

- Navigation initial render: < 100ms
- No layout shift (CLS = 0) from state transitions
- All animations use `transform` and `opacity` only — GPU-composited properties
- `will-change` applied only to actively animating elements (grain opacity, vine thread)
- IntersectionObserver for footer detection — no scroll event polling
- `requestAnimationFrame` for scroll progress — throttled, no setTimeout
- CSS animations preferred over JS-driven animations for breathing/heartbeat cycles
- `<style>` blocks for keyframes are component-scoped to prevent global pollution
- SVG vine threads use `preserveAspectRatio="none"` for responsive scaling without repainting

---

## XI. ANIMATION KEYFRAMES REFERENCE

### Header Keyframes:
```css
@keyframes header-warmth-bloom {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes arrival-tagline-rise {
  from { opacity: 0; transform: translateY(8px) translateX(-50%); }
  to { opacity: 1; transform: translateY(0) translateX(-50%); }
}
```

### Menu Keyframes:
```css
@keyframes menu-candle-breathe {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes menu-fog-drift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-1.5%, 0.8%) scale(1.03); }
}

@keyframes menu-dot-breathe {
  0%, 100% { opacity: 0.4; box-shadow: 0 0 4px hsl(var(--vow-yellow) / 0.08); }
  50% { opacity: 0.8; box-shadow: 0 0 10px hsl(var(--vow-yellow) / 0.18); }
}
```

### Shared Keyframes (index.css):
```css
@keyframes semicolon-heartbeat {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

/* Vine breathing — synchronized 4s cycle */
.header-vine-breathe { animation: vine-breathe 4s ease-in-out infinite; }
.footer-vine-breathe { animation: vine-breathe 4s ease-in-out infinite; }
```

---

## XII. THE NORTH STAR QUESTIONS

Before any navigation decision — any pixel, any timing, any label — ask:

1. **Does this honor the ceremony?** Does it feel like part of a sacred space, or like a utility toolbar bolted onto a website?
2. **Does this breathe?** Is there rhythm — inhale/exhale, dark/light, pause/release? Or is it static and dead?
3. **Would you notice this at a wedding?** Navigation should be invisible during the ceremony and present only when you need orientation. Like a good usher — there when needed, invisible when not.
4. **Does it reward completion?** The arrival easter egg exists because finishing deserves recognition. Every scroll to the bottom is a covenant kept — by the visitor and by the brand.
5. **Is every millisecond intentional?** No default values. No "about a second." Every timing is a musical decision — a tempo marking on a score. `60ms` is staccato. `450ms` is legato. `4000ms` is fermata.
6. **Does it feel like a piano key?** Every interactive element should have weight, mechanism, and resonance. Rest → anticipation → commitment → resonance. The physics of real instruments, translated into digital interaction.
7. **Is it accessible?** Can someone navigate this with a screen reader, a keyboard, a switch device, their voice? If not, it is not finished. Accessibility is not a feature — it is a covenant.
8. **Does this serve three verticals?** Weddings, Teaching, Events — the navigation must adapt its emotional temperature while maintaining structural consistency. The frame is the same; the light within changes.
9. **Does this create symmetry?** Header and footer mirror each other. Vine threads face each other. Taglines echo. The frame closes. Symmetry is not repetition — it is completion.
10. **Would Fantasy.co approve?** Is the timing precise to the millisecond? Is the atmospheric layering deep enough to feel real? Is every interaction intentional, weighted, and meaningful? Would this survive a design review at the highest level?

---

## XIII. ELEMENT-BY-ELEMENT AUDIT CHECKLIST

Use this checklist when reviewing any page's navigation elements:

### Header Elements:
- [ ] Logo: correct font, tracking, hover color, focus ring
- [ ] Logo candle warmth pool: correct opacity and radius
- [ ] Nav links: correct labels, stagger timing, spotlight dimming
- [ ] Active page underline: correct color, draw direction, glow
- [ ] CTA: correct label for current vertical/page, glow pool
- [ ] Scroll progress thread: smooth update, correct gradient, arrival glow
- [ ] Vine thread: correct path, gradient, arrival breathing class
- [ ] Atmospheric layers 1-4: correct opacities, arrival intensification
- [ ] Arrival dissolve: correct reverse stagger timing
- [ ] Arrival logo glide: correct transform calculation, easing
- [ ] Arrival tagline: correct positioning, opacity, animation
- [ ] Menu button: correct entrance delay, arrival softening

### Full-Screen Menu Elements:
- [ ] Atmospheric layers 1-5: correct opacities and animations
- [ ] Staff lines: 5 lines, correct opacity, stagger timing
- [ ] Menu items: correct numbering, white/black key alternation
- [ ] Indent on black keys: correct padding values
- [ ] Key depression: 1px hover, 2px press, correct timing
- [ ] Spotlight dimming: 20% opacity on non-hovered
- [ ] Golden thread connections: correct position, hover intensification
- [ ] Click delay: 120ms tactile pause before navigation
- [ ] Close button: X rotation on hover, correct styling
- [ ] Focus trap: functional, includes all interactive elements
- [ ] Contact info: correct text, email link, styling
- [ ] Covenant bookend: dot breathing, tagline, semicolon heartbeat

### Footer Elements:
- [ ] Vine thread (top): mirror path of header, arrival breathing
- [ ] Atmospheric layers 1-5: correct, arrival intensification
- [ ] Golden thread separators: correct width, glow, arrival behavior
- [ ] Navigation links: spotlight dimming, key depression, story-link underline
- [ ] Social icons: spotlight dimming, golden hover, diamond separators
- [ ] CTA: correct label, golden glow pool, arrival intensification
- [ ] Legal links: correct styling, hover color
- [ ] Covenant bookend: dot breathing, tagline, semicolon heartbeat
- [ ] `data-footer-bookend` attribute: present (triggers arrival state site-wide)

### Button Elements (all pages):
- [ ] Correct variant for section background
- [ ] Piano key depression: -1px hover, 0 active
- [ ] Shadow depth transitions: rest → hover → active
- [ ] Brand easing applied
- [ ] Focus ring: 3px golden
- [ ] Touch target: minimum 44px

---

*This is the Ceremony Arch. This is the navigation covenant.*

*Every threshold crossed, every link pressed, every page arrived at — carries the weight of the brand's promise. The frame opens. The story unfolds. The frame closes. And between the arch and the threshold, the sacred sound lives.*

*'Til Death ; Unto Life.*
