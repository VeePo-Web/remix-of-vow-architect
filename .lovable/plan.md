
# The Sacred Sound — Ultimate Bespoke Covenant Footer & Navigation Arrival System

*A frame-by-frame, millisecond-precise, brand-obsessive implementation directive for the ceremonial completion of Parker Gawryletz's website. This prompt contains every CSS value, every animation timing, every interaction behavior, and every emotional intention needed to build a footer that does not end a website — it completes a ceremony.*

---

## I. ROLE & OPERATIONAL MANDATE

You are a Covenant Architect — the same architect who built the vigil sequence, the CrossOver, and the breathing rhythm of this entire website. You carry 50+ years of accumulated design wisdom from Fantasy.co, Pentagram, Collins, B-Reel, MetaDesign, and Metalab. But here, you are doing something none of those studios have attempted: designing a footer-and-navigation system where the two components recognize each other at the bottom of every page and merge into a single ceremonial frame — an easter egg that rewards the visitor who completes the journey.

### Your Five Disciplines
1. **Brand ceremony craft** — visual identity translated into a sacred "covenant close"
2. **UX psychology** — the footer as recessional: the visitor walks back down the aisle
3. **Navigation architecture** — header + footer become one page at the bottom
4. **Technical performance** — DOM restraint, CLS safety, GPU-composited animations
5. **SEO architecture** — intentional internal linking, local SEO for Calgary/Cochrane/Canmore/Okotoks

### The Non-Negotiable Constraint
**DO NOT CHANGE ANYTHING ELSE ON THE WEBSITE.** Only these files are in scope:
- `src/components/Footer.tsx` — The footer component
- `src/components/MinimalHeader.tsx` — The fixed header with arrival easter egg
- `src/components/MobileStickyBar.tsx` — Mobile sticky CTA bar (minor integration only)
- `src/index.css` — Only footer/arrival-related keyframes and classes

Everything else — page layout, section order, typography system, spacing scale, colors, imagery, copy outside the footer, components, animations — remains untouched.

---

## II. THE EXACT CURRENT CODE STATE

### Footer.tsx — What Exists Now (314 lines)
The footer currently implements:

**State Management:**
- `useScrollReveal({ threshold: 0.15 })` → `footerRef` + `isVisible` for staggered content reveals
- `isArrival` boolean driven by IntersectionObserver on `[data-footer-bookend]` at 0.5 threshold
- The `isArrival` state controls atmospheric warmth shifts (grain 0.06→0.08, yellow fog 1.5%→3%, golden thread opacity 0.25→0.35)

**Structure (top to bottom):**
1. `footer-fade-bridge` div — 60px absolute bridge blending from CrossOver
2. Three atmospheric layers: grain (6-8%), vignette, warm yellow fog (1.5-3%)
3. Top golden thread — 48px, `footer-breathe` class, brightens during arrival
4. 4-column grid (`grid-cols-1 md:grid-cols-4 gap-16`):
   - Col A (span-2): "Parker Gawryletz" + "Wedding Pianist" + mission line + social icons with spotlight hover + diamond separators
   - Col B: "Navigate" label + 6 links (Pricing, About, Proof, FAQ, Listen, Contact)
   - Col C: "Reach Me" label + location + email + phone
5. Full-width golden thread separator
6. CTA row: "Ready to begin?" + ghost "Hold my date" button + radial glow pool
7. Legal row: © + Privacy/Terms/Cookies/Accessibility
8. Mini golden thread echo (32px, `footer-breathe`)
9. Covenant Bookend (`data-footer-bookend`): triple-glow dot + "'Til Death ; Unto Life." with semicolon heartbeat
10. Mobile sticky bar spacer: `h-16 md:h-0`

**Stagger Timing (existing — PRESERVE EXACTLY):**
- The Pianist column: delay 0ms
- Navigate column: delay 150ms
- Reach Me column: delay 300ms
- CTA row: delay 400ms
- Legal row: delay 500ms
- Covenant Bookend: delay 650ms
- All use `duration-700` with `translate-y-4` → `translate-y-0`

**Social Icons (existing — PRESERVE EXACTLY):**
- `group/icons` wrapper for spotlight hover pattern
- Each icon: `text-foreground/50 hover:text-vow-yellow hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)]`
- Non-hovered icons dim: `group-hover/icons:[&:not(:hover)]:opacity-40`
- Diamond separators: `w-1 h-1 rotate-45` with vow-yellow/30 fill and 4px glow
- Touch targets: `p-3.5 -m-3.5` (44px effective)
- Icons: Mail (18px), Phone (18px), Instagram (18px), Youtube (18px)

### MinimalHeader.tsx — What Exists Now (219 lines)
The header currently implements:

**State Management:**
- `hasPlayed` from `sessionStorage('vigil-complete')` → controls initial animation delays
- `isScrolled` — true when `window.scrollY > window.innerHeight`
- `isAtFooter` — IntersectionObserver on `[data-footer-bookend]` at 0.5 threshold
- `isArrival = isAtFooter && isScrolled` — the unified arrival boolean
- `wasScrolled` — tracks if user has scrolled before (for reverse stagger)

**Arrival Behavior (existing — PRESERVE AND ENHANCE):**
When `isArrival` is true:
1. Container switches from `justify-between` to `justify-center`
2. Nav links get `opacity-0 w-0 overflow-hidden pointer-events-none` (260ms transition)
3. Logo centers naturally via the justify-center
4. Logo gets a vow-yellow underline: `scale-x-0` → `scale-x-100`, duration 450ms, easing `cubic-bezier(0.22, 0.61, 0.36, 1)`, background `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)`
5. Menu button repositions: `absolute right-[var(--hero-space-edge)] top-1/2 -translate-y-1/2`
6. Golden thread at header bottom: opacity increases from 0.12 to 0.25, gains `footer-breathe` class for synchronized breathing

**Nav Links (3 items):**
- Pricing → /services
- About → /about
- Proof → /gallery
- Plus "Hold My Date" CTA link → /contact (with glow pool)
- Each has vow-yellow active underline (same draw animation as arrival underline)

### MobileStickyBar.tsx — What Exists Now (99 lines)
- Fixed bottom bar, `md:hidden`, with golden scroll progress thread
- Hides on `/contact` page
- `isFooterCtaVisible` state via IntersectionObserver on `[data-footer-bookend]` at 0.3 threshold
- When footer bookend visible: `translate-y-full opacity-0` (260ms, sacred easing)
- "Hold my date" button with `cta-breathe-glow` class
- Page-specific left text via `pageConfig` record

### CSS Keyframes (existing — reference these exactly)

```css
/* Semicolon Heartbeat — 2s cycle */
@keyframes semicolon-heartbeat {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.08); }
}

/* Footer Breathing Separator — 8s cycle */
@keyframes footer-breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.footer-breathe { animation: footer-breathe 8s ease-in-out infinite; }

/* Footer Color Bridge */
.footer-fade-bridge {
  position: absolute; top: -60px; left: 0; right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, hsl(240 9% 2%));
  pointer-events: none; z-index: 0;
}

/* CTA Breathe Glow — 4s cycle */
.cta-breathe-glow { animation: cta-breathe 4s ease-in-out infinite; }

/* Reduced motion fallbacks */
@media (prefers-reduced-motion: reduce) {
  .footer-breathe { animation: none; }
  .cta-breathe-glow { animation: none; box-shadow: 0 0 30px rgba(255, 224, 138, 0.2); }
  [style*="semicolon-heartbeat"] { animation: none !important; }
}
```

### CrossOver.tsx — The Section Immediately Before Footer (440 lines)
- Sacred quote: "Let your ceremony sound like what your hearts feel like."
- Scroll-linked `--crossing-warmth` CSS variable (0.02 → 0.06)
- Ken Burns background image (crossover-dance-ai.jpg)
- Extended bottom fade (120px) that bridges into footer via `footer-fade-bridge`
- Bottom golden thread at `bottom: 120px` with `crossover-threshold-breathe` animation
- Closing golden dot (4px, triple-glow)
- **DO NOT MODIFY THIS FILE**

---

## III. THE BRAND IDENTITY GOVERNING EVERY DECISION

### Who Parker Gawryletz Is
- Ceremony pianist, 5-10 weddings per year, months of devoted preparation each
- Not a vendor — a witness. First-person voice always: "I carry," "I understand"
- Never "we," never third-person, never "Parker Gawryletz provides"
- 500+ events performed (never "500+ weddings")
- Calgary, Cochrane, Canmore, and Okotoks
- parker@parkergawryletz.com | +1-403-830-8930

### The Death/Life Visual System
The footer lives in the **Death space** — rich black, charcoal, stillness — with traces of **Life** through vow-yellow accents and the covenant tagline.

| Token | HSL Value | Footer Usage |
|-------|-----------|-------------|
| `--rich-black` | `240 9% 4%` | Primary background |
| `--ebon` | `222 10% 7%` | Card/section backgrounds |
| `--graphite` | `218 11% 11%` | Borders, subtle separators |
| `--vow-yellow` | `45 100% 76%` | ≤6% surface area: CTAs, semicolon, threads, underlines |
| `--vine-green` | `88 76% 62%` | **NEVER in footer** — reserved for success states |

### Sacred Objects (liturgical hierarchy — never decorative)
1. **The semicolon (;)** — ONLY at covenant bookend. Heartbeat animation. Never elsewhere.
2. **The golden thread** — 1px horizontal, gradient fade, breathing animation. Section separators.
3. **The golden dot** — 1.5-6px circle, triple box-shadow glow. Bookend marker.
4. **The golden diamond** — 4px square rotated 45°. Social icon separators only.

### Typography (locked — no exceptions)
- **Cormorant Garamond** (`font-display`): Parker's name, tagline, column labels, sacred quotes. Weight 300-400. Never bold.
- **Inter** (`font-sans`): Body copy, nav links, buttons, legal text. Weight 400-500. Line-height 1.6.
- **Nine locked sizes:** 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px

### Fitzgerald Spacing Scale (locked — no arbitrary values)
```
fitz-1: 4px   fitz-2: 8px   fitz-3: 12px  fitz-4: 16px
fitz-5: 24px  fitz-6: 32px  fitz-7: 40px  fitz-8: 56px
fitz-9: 80px  fitz-10: 120px
```

### Animation Timing Language (locked)
| Duration | Purpose | Examples |
|----------|---------|---------|
| 150ms | Quick acknowledgment | Focus rings |
| 180ms | Micro-feedback | Icon hover, button press, link color change |
| 260ms | Comfortable transition | Nav layout shifts, header state changes |
| 450ms | Sacred reveal (one-time) | Vow underline draw, golden thread draw |
| 700ms | Sacred section reveal | Footer content stagger fade-in |
| 900ms | Breath-length transformation | Major state changes |
| 2000ms | Heartbeat cycle | Semicolon heartbeat (infinite) |
| 3000ms | Ambient breathing | Golden dot pulse (infinite) |
| 4000ms | CTA breathing | `cta-breathe-glow` (infinite) |
| 8000ms | Material breathing | `footer-breathe` golden threads (infinite) |

### Easing Curves (locked)
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` — 90% of transitions
- **Sacred:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — reveals, underlines, ceremony-paced

### Voice Rules
- First-person always. No exclamation marks. Ever.
- Verb-forward CTAs: "Hold my date" not "Book now"
- No bright adjectives: no "amazing," "incredible," "stunning"
- Specific over generic: "24 hours" not "quickly"

---

## IV. THE PIANO & WEDDING THEMATIC INTEGRATION

The footer must feel piano-themed and wedding-themed **without being literal or decorative.** No piano key illustrations. No wedding ring icons. No sheet music graphics. The themes are expressed through:

### 1. Rhythm as Recessional
The staggered reveal (0→150→300→400→500→650ms) mirrors the recessional — the ordered procession of the wedding party walking back down the aisle. Each column "stands" in sequence. The timing is not random — it is processional.

### 2. The Pedal Sustain
The `footer-breathe` animation (8s cycle) is the piano's sustain pedal — it holds the note after the key is released. The golden threads breathe because the music lingers. The visitor has stopped scrolling, but the footer still breathes.

### 3. Key Depression as Hover
Footer nav links should have a subtle **1px downward shift** on hover (`translateY(1px)`) — the weight of a piano key being pressed. Not a bounce. Not a scale. A single pixel of depression, then release. Combined with color shift to primary over 180ms.

### 4. The Spotlight as Piano Keys
The social icon spotlight hover pattern mirrors piano keys: when you press one key, it activates while the others remain silent (dim). The `group/icons` pattern creates this — hovered icon glows, non-hovered icons recede to opacity 40.

### 5. The Empty Venue
The footer's emotional temperature is the empty venue after the ceremony — candles still burning, piano still warm, vows still echoing. This is achieved through:
- Grain at 6-8% (invitation paper texture)
- Warm yellow fog at 1.5-3% (candlelight residue)
- Vignette darkening at edges (empty room depth)
- The breathing animations (the room is alive but quiet)

### 6. The Sustained Final Chord
The covenant bookend is the last chord — it does not resolve. The semicolon heartbeat is the pedal sustaining it. The golden dot breathes. The visitor leaves with this note still ringing.

---

## V. THE HEADER + FOOTER ARRIVAL SYSTEM (THE EASTER EGG)

This is the soul of the implementation. When the visitor scrolls to the bottom of any page, the fixed header and the footer become one unified composition — a ceremonial frame.

### The Trigger
- IntersectionObserver watches `[data-footer-bookend]` at 0.5 threshold
- When visible: `isAtFooter = true`
- Combined: `isArrival = isAtFooter && isScrolled`

### The Header's Arrival Choreography (Frame by Frame)

**T+0ms (trigger fires):**
- Header container transitions from `justify-between` to `justify-center` (260ms)
- Nav links begin fading: reverse stagger (last link first, 80ms intervals)

**T+80ms:**
- "Hold My Date" CTA begins fading (opacity 0, 260ms)
- Third nav link (Proof) fully transparent

**T+160ms:**
- Second nav link (About) fully transparent
- Golden thread at header bottom begins brightening (0.12 → 0.25 opacity, 260ms)

**T+240ms:**
- First nav link (Pricing) fully transparent
- Nav container collapses: `w-0 overflow-hidden pointer-events-none`
- Logo begins gliding to center (driven by `justify-center` on parent)

**T+260ms:**
- Header layout settled — logo centered
- Menu button repositioned to absolute right

**T+300ms:**
- Vow-yellow underline begins drawing beneath centered logo
- Duration: 450ms, easing: sacred `cubic-bezier(0.22, 0.61, 0.36, 1)`
- Background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)`
- Origin: center (draws outward from middle)

**T+450ms:**
- Golden thread gains `footer-breathe` class — begins breathing in sync with footer's top golden thread
- Both header thread and footer thread now on the same 8s animation cycle

**T+750ms:**
- Underline fully drawn. Arrival complete.
- Header is now a ceremonial frame: centered logo with vow underline, breathing golden thread border, Menu button at right

### The Footer's Arrival Awareness

When `isArrival` is true, the footer responds with subtle warmth shifts:

| Element | Default State | Arrival State | Transition |
|---------|--------------|---------------|-----------|
| Grain opacity | 0.06 | 0.08 | 700ms ease |
| Yellow fog opacity | 0.015 | 0.03 | 700ms ease |
| Top golden thread opacity | 0.25 | 0.35 | 700ms ease |
| Top golden thread glow | 8px at 0.1 | 12px at 0.15 | 700ms ease |
| Covenant dot glow | triple at 0.5 | triple at 0.7 | 700ms ease |
| Covenant dot outer glow | 24px at 0.1 | 32px at 0.15 | 700ms ease |

### The Unified Composition

When arrival is active, the page reads as one framed composition:

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (fixed, 56px):                                       │
│  ═══ golden thread (0.25, breathing 8s) ═══                  │
│  [Menu]         Parker Gawryletz (centered)         [Menu]   │
│                 ═══ vow underline ═══                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FOOTER CONTENT (normal layout, staggered reveal)            │
│  The Pianist │ Navigate │ Reach Me                           │
│  ─── golden thread ───                                       │
│  Ready to begin? [Hold my date]                              │
│  © 2026 ... Privacy · Terms · Cookies · Accessibility        │
│                                                              │
│  ═══ mini thread (32px, breathing 8s) ═══                    │
│                      ●                                       │
│            'Til Death ; Unto Life.                            │
│                                                              │
│  BOOKEND (data-footer-bookend):                              │
│  Covenant tagline — the final chord                          │
└──────────────────────────────────────────────────────────────┘
```

**Vertical axis alignment (desktop):** The header's centered "Parker Gawryletz" and the footer's centered "'Til Death ; Unto Life." should share the same center axis — creating a frame where the pianist's name opens the composition and the covenant closes it.

### The Three Tempos (Polyrhythm)

During arrival, three animation cycles run simultaneously like instruments in different time signatures:

| Tempo | Element | Duration | Feeling |
|-------|---------|----------|---------|
| Heartbeat | Semicolon `; ` | 2s | The pulse of the covenant — fast, alive |
| Dot Breath | Golden dot glow | 3s | The candle flame — medium, warm |
| Frame Breath | Golden threads (header + footer) | 8s | The room breathing — slow, vast |

These three rhythms create a living composition. The visitor feels the aliveness without counting beats.

### Departure Choreography (Scrolling Away)

When the visitor scrolls away from the bottom (leaving the footer):

**T+0ms (bookend leaves viewport):**
- `isArrival` becomes false
- Footer atmospheric layers revert to default opacities (700ms transitions)

**T+0ms:**
- Header underline retracts: `scale-x-100` → `scale-x-0` (450ms, sacred easing, origin center)
- Header golden thread reverts to static opacity 0.12 (loses `footer-breathe` class)

**T+260ms:**
- Header container transitions back to `justify-between`
- Logo slides back to left-aligned position

**T+340ms:**
- Nav links begin re-appearing (forward stagger: first link first, 80ms intervals)
- Menu button returns to normal flow position

**T+600ms:**
- All nav links visible. Header fully restored to functional state.

### Mobile Arrival Behavior

On mobile (`md:hidden`):
- Logo stays left-aligned (centering is less impactful on small screens)
- Vow-yellow underline still draws beneath logo (450ms, sacred easing)
- No nav links to fade (they're already hidden on mobile)
- Menu button stays in normal position
- MobileStickyBar fades out when `[data-footer-bookend]` is visible (existing behavior via 0.3 threshold)
- The arrival is felt through the underline draw and the footer's atmospheric warmth shift

---

## VI. FOOTER INFORMATION ARCHITECTURE

### Group A: "The Pianist" (col-span-2 on desktop)

```
Parker Gawryletz          ← font-display, clamp(24px, 3vw, 32px), font-light, text-foreground
Wedding Pianist           ← font-display, italic, 14px, text-foreground/40
                          ← mt-1, mb-4
I carry your vows so      ← font-sans, base, text-foreground/70, max-w-md, leading-relaxed
they can carry your       ← mb-8
guests.
                          
◆ ✉ ◆ ☎ ◆ IG ◆ YT       ← group/icons flex, gap-4, spotlight hover
```

### Group B: "Navigate"

```
NAVIGATE                  ← font-display, 12px, uppercase, tracking-[0.22em], foreground/80, mb-6
                          
Pricing                   ← NavLink to="/services", story-link class
About                     ← NavLink to="/about"
Proof                     ← NavLink to="/gallery"
FAQ                       ← NavLink to="/faq"
Listen                    ← NavLink to="/listen"
Contact                   ← NavLink to="/contact"
                          ← space-y-3, foreground/50, hover:text-primary, duration-180ms
```

### Group C: "Reach Me"

```
REACH ME                  ← same style as Navigate label
                          
Calgary, Cochrane,        ← plain text, foreground/50
Canmore and Okotoks
parker@parkergawryletz    ← mailto: link, hover:text-primary
.com
+1-403-830-8930          ← tel: link, hover:text-primary
                          ← space-y-3
```

### CTA Row (centered, below golden thread separator)

```
Ready to begin?           ← font-display, 14px, foreground/50
[Hold my date]            ← Button ghost-dark, size sm, Link to="/contact"
                          ← radial glow pool: vow-yellow/4%, 200px circle, pointer-events-none
```

### Legal Row

```
© 2026 Parker Gawryletz. All rights reserved.    Privacy · Terms · Cookies · Accessibility
← flex-col md:flex-row justify-between, 14px, foreground/40
← legal links: hover:text-primary, duration-180ms
← gap-4 md:gap-6
```

### Covenant Bookend (`data-footer-bookend`)

```
═══ mini golden thread (32px, footer-breathe) ═══
                    ●                              ← 1.5px dot, triple glow, vow-yellow/50-70
          'Til Death ; Unto Life.                  ← font-display, 14px, foreground/40, tracking-wide
                                                   ← semicolon: vow-yellow/60, semicolon-heartbeat 2s
```

---

## VII. LAYOUT SPECIFICATIONS

### Desktop (≥768px)
- Container: `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8`
- Grid: `grid-cols-1 md:grid-cols-4 gap-16`
- The Pianist: `col-span-1 md:col-span-2`
- Section padding: `py-20` (80px)
- Footer element: `section--dark relative overflow-hidden pb-[env(safe-area-inset-bottom)]`

### Mobile (<768px)
- Single column stack, no accordion (link lists are short)
- Touch targets: minimum 44px effective (achieved via padding)
- Social icons: full-width row with diamond separators
- Spacer at bottom: `h-16 md:h-0` for mobile sticky bar clearance

---

## VIII. THE PIANO KEY DEPRESSION MICRO-INTERACTION

Footer navigation links should have a subtle "key depression" hover behavior that is unique to this footer:

```css
/* In the component — applied to each nav link in the Navigate column */
hover:translate-y-[1px]    /* The key presses down — 1 single pixel */
transition-all duration-[180ms]
```

This 1px shift is nearly imperceptible consciously but creates a tactile feeling — like pressing a piano key. Combined with the color shift from `foreground/50` to `primary`, it creates the sensation of playing a note.

**Important:** This is NOT a bounce animation. NOT a scale. NOT a 2px+ shift. It is exactly 1px downward on hover, released on mouse-leave. The easing is standard (`cubic-bezier(0.4, 0, 0.2, 1)`).

---

## IX. ATMOSPHERIC SPECIFICATIONS

### The "Empty Venue" Layers (bottom to top)

| Layer | z-index | CSS | Purpose |
|-------|---------|-----|---------|
| Background | 0 | `section--dark` class (rich-black) | The empty room |
| Bridge | 0 | `footer-fade-bridge` (60px gradient) | Seamless transition from CrossOver |
| Grain | 1 | `grain` class, opacity 6-8% | Invitation paper texture |
| Vignette | 1 | `radial-gradient(ellipse, transparent 40%, hsl(240 9% 2%) 100%)` | Room depth, walls receding |
| Yellow fog | 1 | `radial-gradient(ellipse at 50% 20%, hsl(var(--vow-yellow) / 0.015-0.03) 0%, transparent 50%)` | Candlelight residue |
| Content | 2 | All footer content | The remaining objects in the room |

### Arrival Warmth Shift
When `isArrival` triggers, the footer warms like candles being lit:
- Grain: 0.06 → 0.08 (more texture, like moving closer to the invitation)
- Yellow fog: 0.015 → 0.03 (the candles brighten, the room glows)
- Top golden thread: 0.25 → 0.35 opacity (the frame becomes visible)
- All transitions: 700ms ease (the warmth arrives slowly, like eyes adjusting)

---

## X. FOOTER OBJECTIVE MAP

### Primary Jobs (5)
1. **Covenant close** — complete the emotional arc with the tagline bookend
2. **Navigation recovery** — curated secondary navigation for visitors who didn't find what they needed
3. **Trust reinforcement** — contact info, service area, social presence
4. **Conversion support** — subtle "Hold my date" ghost CTA
5. **Legal compliance** — privacy, terms, cookies, accessibility

### Deliberately Excluded
- Newsletter signup (5-10 couples/year — newsletter dilutes selectivity)
- Award badges (Proof page handles credibility)
- Social media feeds/embeds (icons link out — no performance cost)
- Chatbot/help widget (breaks sacred atmosphere)
- Blog links (this brand witnesses, it does not blog)
- Region switcher (single-language, single-region)
- "Back to Top" button (PianoKeyNav handles vertical navigation)

---

## XI. SEO LAYER

### Internal Links (14 total — within optimal 10-25 range)
- 10 navigation: Pricing, About, Proof, FAQ, Listen, Contact + Email, Phone, Instagram, YouTube
- 4 legal: Privacy, Terms, Cookies, Accessibility

### Anchor Text Rules
- "Pricing" not "Wedding pianist pricing Calgary"
- "About" not "About Parker Gawryletz wedding pianist"
- Link text matches page heading expectation

### Local SEO
- NAP once: "Calgary, Cochrane, Canmore and Okotoks" as plain text
- Email and phone are crawlable linked elements
- No city-name link farms

### Schema Support
- Footer reinforces site-wide Organization schema (name, url, email, telephone, areaServed)
- No footer-specific schema needed

---

## XII. PERFORMANCE & ACCESSIBILITY HARDENING

### Performance Checklist
- [ ] DOM depth: ≤4 levels of nesting
- [ ] Icons: Lucide React (tree-shaken SVG) — zero external requests
- [ ] No images in footer — all visual effects are CSS
- [ ] No heavy embeds (social feeds, video, iframes)
- [ ] Animations use only `opacity` and `transform` (GPU-composited)
- [ ] `will-change` only on actively animating elements
- [ ] CLS-safe: no dynamic content loading, no font-swap shifts
- [ ] `prefers-reduced-motion`: all breathing/stagger animations → static or opacity-only

### Accessibility Checklist
- [ ] `<footer>` element with `aria-label="Site footer"`
- [ ] `<nav aria-label="Footer navigation">` wrapping Navigate links
- [ ] Headings: `<h3>` for Parker's name, `<h4>` for column labels
- [ ] All links reachable via Tab in logical order
- [ ] Focus states: `focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 rounded-sm`
- [ ] Social icons: descriptive `aria-label` ("Send me an email", "Follow me on Instagram")
- [ ] Decorative elements: `aria-hidden="true"` on all threads, grain, dots, vignettes
- [ ] `sr-only` span: "Site footer with navigation, contact information, and social links"
- [ ] Touch targets: ≥44px effective size on mobile
- [ ] Contrast: foreground/50 on rich-black passes WCAG AA (verify foreground/40 for legal links)
- [ ] External social links: `target="_blank" rel="noopener noreferrer"`

---

## XIII. WHAT NOT TO DO (25 Anti-Patterns)

1. **No newsletter signup.** 5-10 couples/year. Newsletters dilute selectivity.
2. **No social media embeds.** Link with icons only. Zero performance cost.
3. **No award/certification badges.** Proof page handles credibility.
4. **No header duplication.** Footer adds FAQ, Listen, Contact — supplemental, not identical.
5. **No bright colors.** No blues, teals, oranges. Only charcoal + vow-yellow ≤6%.
6. **No border-radius > 8px.** Large radii signal playfulness. This brand is composed.
7. **No all-caps body text.** Only column headings use uppercase at xs size.
8. **No "Back to Top" button.** PianoKeyNav handles vertical navigation.
9. **No chatbot/help widget.** Contact info is clearly provided.
10. **No keyword-stuffed anchors.** "Pricing" not "Affordable wedding pianist pricing Calgary."
11. **No visual weight heavier than CrossOver.** CrossOver is climax. Footer is denouement.
12. **No second CTA.** "Hold my date" is the only action. One CTA. One covenant.
13. **No decorative illustrations.** No piano keys, wedding rings, sheet music graphics.
14. **No stagger timing changes.** The recessional rhythm (0→150→300→400→500→650ms) is sacred.
15. **No cookie banner overlapping footer.** Cookie prefs via "Cookies" legal link.
16. **No `position: sticky` on footer elements.** MobileStickyBar is a separate component.
17. **No semicolon animation changes.** `semicolon-heartbeat` 2s is liturgical. Non-negotiable.
18. **No scale/rotate/bounce hover animations.** Only opacity, color, translateY(1px), drop-shadow.
19. **No more than 14 links.** 10 nav + 4 legal. More dilutes equity and creates clutter.
20. **No missing mobile spacer.** `h-16 md:h-0` prevents content hidden behind sticky bar.
21. **No vine-green in footer.** Reserved for success states only.
22. **No "we" or third-person voice.** First-person always: "I carry," not "We provide."
23. **No exclamation marks.** Confidence does not shout.
24. **No arbitrary spacing.** Fitzgerald scale only (4, 8, 12, 16, 24, 32, 40, 56, 80, 120px).
25. **No font sizes outside the nine locked sizes.** 12, 14, 16, 18, 20, 24, 30, 36, 48px only.

---

## XIV. QA PLAN

### Visual QA
- [ ] Desktop 1440px/1200px: 4-column grid, golden thread centering, CTA glow pool
- [ ] Tablet 768px/1024px: Column stacking, spacing
- [ ] Mobile 375px/390px/428px: Single column, touch targets, sticky bar spacer, no horizontal overflow
- [ ] CrossOver → Footer bridge: seamless color transition via `footer-fade-bridge`

### Arrival Easter Egg QA
- [ ] Scroll to bottom (desktop): header logo centers, nav fades, underline draws, threads sync
- [ ] Scroll away: header returns to functional state (nav reappears, logo left-aligns, underline retracts)
- [ ] `[data-footer-bookend]` triggers at 0.5 threshold
- [ ] Transition feels ceremonial — not jarring (sacred easing creates gentle shift)
- [ ] Footer atmospheric warmth increases during arrival
- [ ] Three tempos audible: heartbeat (2s), dot (3s), frame (8s) — simultaneous

### Mobile QA
- [ ] MobileStickyBar fades out when footer bookend visible (0.3 threshold)
- [ ] Logo underline still draws on mobile
- [ ] No duplicate CTAs visible at any scroll position

### Accessibility QA
- [ ] Tab through entire footer: logical order, visible focus rings
- [ ] Screen reader: `<footer>` landmark, headings, social icon labels
- [ ] Contrast: all text WCAG AA against rich-black
- [ ] Reduced motion: all animations → static or opacity-only

### Performance QA
- [ ] Lighthouse: no regressions in any category
- [ ] CLS: no layout shift when footer enters viewport
- [ ] DOM depth: ≤4 levels
- [ ] Network: zero additional HTTP requests from footer

---

## XV. IMPLEMENTATION ORDER

1. **Footer.tsx refactoring** — break the 314-line file into sub-components if needed, then implement all specifications from this prompt (atmospheric layers, arrival awareness, key depression hover, bookend enhancements)
2. **MinimalHeader.tsx arrival enhancements** — ensure synchronized breathing with footer, verify departure choreography
3. **MobileStickyBar.tsx integration** — verify fade-out coordination (this may already be working)
4. **index.css additions** — any new keyframes for the golden dot 3s breath cycle, verify reduced motion fallbacks
5. **QA** — run through the full checklist above

---

## XVI. FINAL DIRECTIVE

Build the footer and navigation arrival system as a unified ceremonial composition — the recessional of the website. The header and footer are one piece revealed in two moments: the header at the beginning of the scroll, the footer at the end, and the arrival state as the moment they recognize each other.

The footer is the last note of the ceremony. It must sustain. It must resonate. It must leave the visitor with the feeling of the covenant still held — even after they close the tab.

The arrival easter egg — the moment the header and footer become one — should be something no other website has. It should feel like the held breath releasing. It should feel like the room exhaling. It should feel like the ceremony completing.

Build it like a covenant. Ship it like a recessional.

'Til Death ; Unto Life.
