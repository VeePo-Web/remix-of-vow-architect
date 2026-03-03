
# The Sacred Sound — Ultimate Bespoke Covenant Footer & Navigation Arrival System

*A frame-by-frame, millisecond-precise, brand-obsessive implementation directive for the ceremonial completion of Parker Gawryletz's website. This prompt contains every CSS value, every animation timing, every interaction behavior, and every emotional intention needed to build a footer that does not end a website — it completes a ceremony.*

---

## I. ROLE AND PERSONA

You are not a footer designer. You are a **Covenant Architect** — the same ceremony architect who built the vigil sequence, the CrossOver, and the breathing rhythm of this entire website. You carry 50+ years of accumulated design wisdom from Fantasy.co, Pentagram, Collins, B-Reel, MetaDesign, and Metalab. But here, you are doing something none of those studios have attempted: designing a footer that does not end a website — it **completes a ceremony**.

You specialize specifically in creating footers that:
- Feel custom-fit to the brand (not a generic template — this footer could not exist on any other website)
- Function as a unified system with the fixed navigation bar, creating an easter egg "arrival" moment when the visitor reaches the bottom
- Reinforce the sacred covenant of the brand ("'Til Death ; Unto Life")
- Carry the emotional weight of a ceremony's final moments — the recessional, the exhale, the first breath of married life
- Are piano-themed and wedding-themed in ways that feel organic, not forced — through rhythm, breathing, and metaphor, never through literal illustration
- Protect performance (no heavy embeds, no layout shift, no bloated DOM)
- Meet WCAG 2.1 AA accessibility standards as an act of reverence for every visitor

You combine five disciplines at once:
1. **Brand ceremony craft** — visual identity translated into a sacred "covenant close" moment
2. **UX psychology** — the footer as recessional: the visitor has walked the aisle, heard the vows, and now exits with the feeling still held
3. **Navigation architecture** — the header and footer become one page when the visitor reaches the bottom, a bespoke easter egg that rewards those who complete the journey
4. **Technical performance** — DOM restraint, CLS safety, GPU-composited animations, no bloat
5. **SEO architecture** — intentional internal linking, local SEO reinforcement for Calgary/Cochrane/Canmore/Okotoks, structured data readiness

---

## II. THE SINGULAR MISSION

The footer and the navigation bar must become **one unified composition** when the visitor scrolls to the bottom of any page. This is the **"Arrival"** — the moment the visitor has completed the ceremony of the page. The navigation dissolves its functional state and transforms into a ceremonial frame. The footer rises to meet it. Together, they create a single visual composition that says: *The ceremony is complete. The covenant is kept.*

This is not a clever UI trick. It is the architectural completion of the brand's emotional arc:
- **Vigil** (the hero, the held breath, the darkness)
- **Recognition** (the exhale, the first words)
- **Desire** (the three devotions, the vow moment)
- **Commitment** (the threshold, the crossing)
- **Arrival** (the recessional, the exhale, the covenant kept)

The footer IS the recessional. The last note of the ceremony. The sustained chord that does not resolve. The room exhaling.

---

## III. THE EXACT CURRENT STATE OF EACH COMPONENT

### A. MinimalHeader.tsx (219 lines) — The Fixed Header with Arrival Easter Egg

**Current arrival behavior (lines 42-52):**
```tsx
// Footer proximity detection via IntersectionObserver
useEffect(() => {
  const bookend = document.querySelector('[data-footer-bookend]');
  if (!bookend) return;
  const observer = new IntersectionObserver(
    ([entry]) => setIsAtFooter(entry.isIntersecting),
    { threshold: 0.5 }
  );
  observer.observe(bookend);
  return () => observer.disconnect();
}, []);

const isArrival = isAtFooter && isScrolled;
```

**What happens when `isArrival` is true:**
1. The header container adds `justify-center` (line 87) — the flexbox shifts from `justify-between` to `justify-center`
2. Nav links wrapper gets `opacity-0 w-0 overflow-hidden pointer-events-none` (lines 119-121) — staggered reverse animation (last link fades first, 80ms intervals)
3. Logo `NavLink` to "/" stays visible but now centers due to the flexbox change
4. A vow-yellow underline draws beneath the logo (lines 102-112): `scale-x-0` → `scale-x-100` at 450ms with sacred easing `cubic-bezier(0.22, 0.61, 0.36, 1)`
5. The golden gradient thread at header bottom increases opacity from 0.12 to 0.25 (line 77)
6. The Menu button repositions to `absolute right-[var(--hero-space-edge,24px)]` (line 199)
7. Header height remains 56px with `backdrop-blur-md` and `rgba(10,10,12,0.92)` background
8. The `footer-breathe` CSS class is added to the header's bottom golden thread during arrival (line 73)

**Current header golden thread (lines 69-83):**
```tsx
{isScrolled && (
  <div
    className={cn(
      "absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none animate-fade-in",
      isArrival && "footer-breathe"
    )}
    style={{
      background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.25' : '0.12'}), transparent)`,
      animationDuration: '450ms',
      animationFillMode: 'forwards',
    }}
    aria-hidden="true"
  />
)}
```

**Logo underline draw (lines 102-112):**
```tsx
<span
  className={cn(
    "absolute -bottom-1 left-0 w-full h-[1px] origin-center transition-transform duration-[450ms]",
    isArrival ? "scale-x-100" : "scale-x-0"
  )}
  style={{
    background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)",
    transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  }}
  aria-hidden="true"
/>
```

### B. Footer.tsx (314 lines) — The Footer Component

**Current structure:**
- `section--dark` class on `<footer>` element with `aria-label="Site footer"`
- `footer-fade-bridge` div for CrossOver color blending
- Three atmospheric layers: grain (6% opacity), vignette (radial gradient), warm yellow fog (1.5% → 3% during arrival)
- `useScrollReveal({ threshold: 0.15 })` for staggered content reveals
- 4-column grid (`grid-cols-1 md:grid-cols-4 gap-16`)
- Own IntersectionObserver on `[data-footer-bookend]` for `isArrival` state (lines 14-27)
- Container: `container mx-auto py-20 px-4 relative z-[2]`

**Current atmospheric layers (lines 42-62):**
```tsx
{/* Grain */}
<div
  className="grain pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
  style={{ opacity: isArrival ? 0.08 : 0.06 }}
  aria-hidden="true"
/>
{/* Vignette */}
<div
  className="pointer-events-none absolute inset-0 z-[1]"
  style={{
    background: "radial-gradient(ellipse at center, transparent 40%, hsl(240 9% 2%) 100%)",
  }}
  aria-hidden="true"
/>
{/* Warm yellow fog */}
<div
  className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
  style={{
    background: `radial-gradient(ellipse at 50% 20%, hsl(var(--vow-yellow) / ${isArrival ? '0.03' : '0.015'}) 0%, transparent 50%)`,
  }}
  aria-hidden="true"
/>
```

**Current stagger timing:**
- The Pianist: delay 0ms
- Navigate: delay 150ms
- Reach Me: delay 300ms
- CTA row: delay 400ms
- Legal row: delay 500ms
- Covenant Bookend: delay 650ms

**Current covenant bookend (lines 268-307):**
```tsx
<div
  data-footer-bookend
  className={cn(
    "mt-10 flex flex-col items-center gap-3 transition-all duration-700",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  )}
  style={{ transitionDelay: isVisible ? "650ms" : "0ms" }}
>
  {/* Mini golden thread echo */}
  <div
    className="h-[1px] w-8 footer-breathe"
    style={{
      background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.2), transparent)",
    }}
    aria-hidden="true"
  />
  {/* Triple-glow dot */}
  <div
    className="w-1.5 h-1.5 rounded-full transition-all duration-700"
    style={{
      background: `hsl(var(--vow-yellow) / ${isArrival ? '0.7' : '0.5'})`,
      boxShadow: isArrival
        ? "0 0 8px hsl(var(--vow-yellow) / 0.6), 0 0 18px hsl(var(--vow-yellow) / 0.35), 0 0 32px hsl(var(--vow-yellow) / 0.15)"
        : "0 0 6px hsl(var(--vow-yellow) / 0.5), 0 0 14px hsl(var(--vow-yellow) / 0.25), 0 0 24px hsl(var(--vow-yellow) / 0.1)",
    }}
    aria-hidden="true"
  />
  {/* Covenant tagline */}
  <p className="font-display text-sm text-foreground/40 tracking-wide">
    'Til Death
    <span
      className="text-[hsl(var(--vow-yellow)/0.6)]"
      style={{ animation: "semicolon-heartbeat 2s ease-in-out infinite" }}
    >
      {" ; "}
    </span>
    Unto Life.
  </p>
</div>
```

### C. MobileStickyBar.tsx (99 lines) — Mobile Sticky CTA Bar

**Current footer-aware behavior (lines 37-47):**
```tsx
// Fade out when footer CTA becomes visible — avoid duplicate CTAs
useEffect(() => {
  const bookend = document.querySelector('[data-footer-bookend]');
  if (!bookend) return;
  const observer = new IntersectionObserver(
    ([entry]) => setIsFooterCtaVisible(entry.isIntersecting),
    { threshold: 0.3 }
  );
  observer.observe(bookend);
  return () => observer.disconnect();
}, []);
```

The bar uses `translate-y-full opacity-0` when `isFooterCtaVisible` is true, creating a 260ms slide-down exit with sacred easing.

### D. CSS Keyframes (from index.css)

**`footer-breathe` (8s cycle):**
```css
@keyframes footer-breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite;
}
```

**`semicolon-heartbeat` (2s cycle):**
```css
@keyframes semicolon-heartbeat {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.08);
  }
}
```

**`footer-fade-bridge` (static):**
```css
.footer-fade-bridge {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, hsl(240 9% 2%));
  pointer-events: none;
  z-index: 0;
}
```

**Reduced motion fallbacks:**
```css
@media (prefers-reduced-motion: reduce) {
  .footer-breathe {
    animation: none;
  }
  [style*="semicolon-heartbeat"] {
    animation: none !important;
  }
}
```

---

## IV. OPERATING CONSTRAINTS (NON-NEGOTIABLE)

1. **DO NOT change anything else on the website.** No page layout, section order, typography system, spacing scale, colors, imagery, copy outside the footer and header arrival behavior, components, animations, or any other UI/UX patterns.
2. **Only design/refine the footer and its integration with the navigation bar's arrival state.** You may reference the rest of the site only to ensure the footer matches the brand system.
3. **No generic template footer.** Every decision must tie back to the Sacred Sound brand identity: ceremony pianist, sole practitioner, first-person voice, "'Til Death ; Unto Life" covenant, Death/Life visual system, 5-10 weddings per year selectivity.
4. **No performance regressions.** Clean DOM, CLS-safe, GPU-composited animations only, lightweight. The footer must not harm Core Web Vitals.
5. **No SEO spam.** No keyword-stuffed city lists, no repetitive link farms, no manipulative anchor text.
6. **Accessibility is mandatory.** Keyboard navigation, focus states, semantic landmarks (`<footer>`, `<nav>`), readable contrast (WCAG 2.1 AA), screen reader narratives, `prefers-reduced-motion` respect.
7. **Mobile-first behavior.** Footer must remain usable and scannable on small screens. The mobile sticky bar already exists — the footer must not conflict with it.
8. **The arrival easter egg must feel like a ceremony completing, not a UI trick.** When the header and footer become one composition, it should feel like the recessional — the moment everyone stands, the couple walks back down the aisle, and the room exhales.
9. **Preserve the existing stagger timing exactly.** The recessional rhythm (0ms → 150ms → 300ms → 400ms → 500ms → 650ms) is intentional. Changing it breaks the processional feeling.
10. **Preserve the `data-footer-bookend` attribute** on the covenant bookend div. Three components depend on it: MinimalHeader, Footer, and MobileStickyBar.

---

## V. THE BRAND IDENTITY GOVERNING EVERY DECISION

### Who Parker Gawryletz Is
- A ceremony pianist who plays only 5-10 weddings per year
- Each wedding receives months of devoted collaborative preparation
- Not a vendor, not a performer — a witness who translates what two hearts feel into what an entire room hears
- First-person voice always: "I will," "I understand," "I carry"
- Never "we," never third-person, never "Parker Gawryletz provides"
- 500+ events performed (the only allowed proof number — never "500+ weddings")
- Based in Calgary, serving Calgary, Cochrane, Canmore, and Okotoks
- Email: parker@parkergawryletz.com
- Phone: +1-403-830-8930

### The Death/Life Visual System
The footer exists in the **Death space** (the vigil) — rich black, charcoal, stillness. But it carries traces of the **Life space** (the covenant) through vow-yellow accents, warm fog, and the covenant tagline. The footer is the final held breath — the last inhale before the visitor either commits (contacts) or departs (closes the tab). Either way, the feeling lingers.

**Death palette:**
- Rich black: `hsl(240 9% 4%)` — `var(--rich-black)`
- Ebon charcoal: `hsl(222 10% 7%)` — `var(--ebon-charcoal)`
- Deep graphite: `hsl(218 11% 11%)` — `var(--deep-graphite)`

**Vow-yellow:** `hsl(45 100% 76%)` — `var(--vow-yellow)` — appears at ≤6% of footer surface area. Only at: CTAs, the semicolon, sacred underlines, golden threads.

**Vine-green:** `hsl(88 76% 62%)` — does NOT appear in the footer. Reserved for success states only.

**Atmospheric layers (mandatory for every dark section):**
- Background gradient (base dark color)
- Film grain (6-10% opacity)
- Vignette (radial gradient edge darkening)
- Warm yellow fog (1-3% opacity, pooling from top)

### The Covenant Tagline
**"'Til Death ; Unto Life."**
- The semicolon is the sacred threshold — the pause between ending and beginning
- The semicolon animates with `semicolon-heartbeat` keyframe (2s ease-in-out infinite)
- The semicolon is rendered in vow-yellow at 60% opacity
- This tagline appears in the footer's covenant bookend — it is the last thing the visitor reads
- It must NOT appear anywhere else in the footer. Its scarcity is its power.

### Sacred Objects (liturgical — never decorative)
1. **The semicolon (;)** — appears only at the covenant bookend. Never elsewhere in the footer.
2. **The golden thread** — 1px horizontal lines with gradient fade: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.15-0.25), transparent)`. Used to separate footer sections. Breathing animation (8s cycle via `footer-breathe`).
3. **The golden dot** — a 1.5px circle (w-1.5 h-1.5) with triple-layered box-shadow glow. Appears at the covenant bookend above the tagline. Intensifies during arrival.
4. **The golden diamond** — a 4px square (w-1 h-1) rotated 45° with `hsl(var(--vow-yellow) / 0.3)` fill and `0 0 4px hsl(var(--vow-yellow) / 0.15)` glow. Used as separators between social icons.

### Typography Rules
- **Cormorant Garamond** (`font-display`): All headings, the tagline, sacred quotes, Parker's name. Weight 300-400 only. Letter-spacing 0.04em for headings, 0.22em for overlines. Never bold.
- **Inter** (`font-sans`): All body copy, navigation links, buttons, legal text, metadata. Weight 400-500. Line-height 1.6.
- **Nine locked sizes only:** 12px (xs), 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl), 30px (3xl), 36px (4xl), 48px (5xl)

### Fitzgerald Spacing Scale (locked — no arbitrary values)
```
fitz-1:   4px    fitz-2:   8px    fitz-3:  12px    fitz-4:  16px
fitz-5:  24px    fitz-6:  32px    fitz-7:  40px    fitz-8:  56px
fitz-9:  80px    fitz-10: 120px
```

### Animation Timing Language
```
150ms    Quick acknowledgment (hover states, focus rings)
180ms    Micro-feedback (social icon hover, button press, "key depression")
260ms    Comfortable transition (layout shifts, nav changes, arrival state changes)
450ms    Sacred reveal (vow underlines, golden thread draws — one-time, sacred easing)
700ms    Sacred section reveal (content fade-in on scroll, stagger base duration)
900ms    Breath-length transformation (major state changes)
2000ms   Semicolon heartbeat cycle (liturgical pulse)
3000ms   Golden dot ambient breathing cycle
8000ms   Golden thread frame breathing cycle (footer-breathe)
```

### Easing Curves
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` — 90% of transitions
- **Sacred:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — reveals, underline draws, ceremony-paced animations, arrival state transitions

### Voice and Tone Rules
- First-person always: "I carry," "I understand," "I offer"
- No exclamation marks. Ever. Confidence does not shout.
- Verb-forward CTAs: "Hold my date" not "Book now" or "Submit"
- En-dashes for pauses — creates breathing room in text
- Oxford comma. Always.
- No bright adjectives: no "amazing," "incredible," "stunning"
- Specific over generic: "24 hours" not "quickly"

---

## VI. THE PIANO AND WEDDING THEMATIC INTEGRATION

The footer must feel piano-themed and wedding-themed **without being literal or decorative**. No piano key illustrations. No wedding ring icons. No sheet music graphics. No musical note symbols. The piano and wedding themes are expressed through:

### 1. Rhythm and Breathing
The footer breathes like a piece of music. Staggered reveals at 150ms intervals mirror the spacing between notes in a processional hymn. The golden thread breathes like a sustained pedal tone (8s cycle). The semicolon pulses like a heartbeat (2s cycle). Three tempos running simultaneously — the polyrhythm of life.

### 2. The Recessional Metaphor
The footer is the recessional. The couple has exchanged vows (the CrossOver CTA — "Let your ceremony sound like what your hearts feel like"). Now they walk back down the aisle. The music plays. The room exhales. The footer IS this moment. Each column revealing in sequence mirrors the processional order: the pianist stands first (0ms), then the guests rise (150ms), then the room acknowledges (300ms).

### 3. Key Depression Hover
Navigation links in the footer should have a subtle **"key depression"** hover micro-interaction: on hover, the link text shifts down by `translateY(1px)` and the opacity increases from 50% to primary color — like pressing a piano key. Duration: 180ms. Easing: standard. This is not a bounce. It is a precise, weighted depression — the same feeling as pressing a real piano key that has resistance, weight, and purpose.

```css
.footer-nav-link {
  transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-nav-link:hover {
  transform: translateY(1px);
  color: hsl(var(--primary));
}
```

### 4. The Sustained Note
The covenant bookend is the final sustained chord. It does not resolve. It hangs in the air. The semicolon heartbeat is the pedal sustaining it. The triple-glow dot is the resonance still vibrating in the strings. The golden thread mini-echo is the last fading overtone. The visitor leaves with this note still ringing in their mind.

### 5. The Empty Venue
The footer should feel like the empty venue after everyone has left. The candles are still burning (the golden dot glows). The piano is still warm (the warm yellow fog pools at the top). The vows still echo (the tagline hangs in the space). This is the emotional temperature of the footer — not cold, not celebratory, but **warm stillness**. The specific CSS values that create this feeling:
- Grain at 6% (rising to 8% during arrival — like the texture of the room becoming more intimate)
- Warm yellow fog pooling from 20% vertical position (not centered, not bottom — top-biased, like candlelight from above)
- Vignette pulling edges to near-black (the periphery of the empty room disappearing into darkness)
- The overall temperature: warm-leaning charcoal, not cold blue-black

### 6. The Spotlight Social Icons (Piano Key Behavior)
The social icon row uses a **"spotlight" interaction pattern** that mirrors piano key behavior:
- **Default state:** All icons at `foreground/50`
- **On hover of any icon:** That icon → `text-vow-yellow` with `drop-shadow(0 0 6px hsl(var(--vow-yellow) / 0.3))`; all other icons → `opacity-40`
- This creates a piano-like behavior: pressing one key highlights it while the others recede. One note rings out above the rest.
- **Diamond separators** between icons: 4px squares (w-1 h-1), rotated 45° (`rotate-45`), `hsl(var(--vow-yellow) / 0.3)` fill with `0 0 4px hsl(var(--vow-yellow) / 0.15)` glow
- The entire row is wrapped in `group/icons` for the Tailwind `group-hover` pattern
- Touch targets: `p-3.5` with `-m-3.5` (44px effective tap area)

---

## VII. THE HEADER + FOOTER ARRIVAL INTEGRATION (THE EASTER EGG)

This is the **heart** of the bespoke design. When the visitor reaches the bottom of any page, the header and footer **recognize each other** and become one unified composition — a ceremonial frame around the footer content. This is the moment no other website has.

### What Currently Exists (Preserve These Behaviors)
When `[data-footer-bookend]` enters the viewport (IntersectionObserver, 0.5 threshold):
1. Header nav links fade out (staggered reverse: last link first, 80ms intervals)
2. "Hold My Date" CTA dissolves
3. Logo "Parker Gawryletz" glides from left-aligned to center-aligned (via flexbox `justify-center`)
4. Vow-yellow underline draws beneath centered logo (450ms, sacred easing)
5. Header bottom golden thread brightens from 0.12 to 0.25 opacity
6. Header bottom golden thread gains `footer-breathe` class (8s breathing cycle)
7. Menu button repositions to absolute right
8. Header height remains 56px with `backdrop-blur-md`

### What Must Be Enhanced — The "Ceremony Completion" Arrival Score

Think of this as a musical score with precise measures. Each measure is a timed event in the arrival choreography:

**Measure 1 (0ms — The Awareness):**
- The `isArrival` boolean becomes `true` in both MinimalHeader and Footer
- Both components are now aware of each other
- No visible change yet — this is the held breath before the exhale

**Measure 2 (0-260ms — The Dissolution):**
- Header nav links begin staggered fade-out:
  - Last link ("Hold My Date" CTA wrapper): opacity 1 → 0, delay 0ms, duration 260ms
  - Third link ("Proof"): opacity 1 → 0, delay 80ms, duration 260ms
  - Second link ("About"): opacity 1 → 0, delay 160ms, duration 260ms
  - First link ("Pricing"): opacity 1 → 0, delay 240ms, duration 260ms
- After all links are invisible, the nav wrapper collapses: `w-0 overflow-hidden`
- Total dissolution time: ~500ms from first fade to complete collapse

**Measure 3 (260ms — The Centering):**
- Logo "Parker Gawryletz" begins gliding from left to center
- This is achieved by the flexbox container shifting from `justify-between` to `justify-center`
- Duration: 260ms, standard easing
- The Menu button simultaneously repositions to absolute right with the same 260ms duration
- The logo should feel like it's finding its place — not snapping, not sliding, but settling

**Measure 4 (450ms — The Underline Draw):**
- The vow-yellow underline beneath the centered logo draws from center outward
- `scale-x-0` → `scale-x-100`, `origin-center`
- Duration: 450ms, sacred easing `cubic-bezier(0.22, 0.61, 0.36, 1)`
- This is a one-time reveal — it draws once and holds

**Measure 5 (450ms — The Thread Synchronization):**
- The header's bottom golden thread transitions:
  - Opacity: 0.12 → 0.25 (over 450ms, sacred easing)
  - Gains `footer-breathe` class — begins 8s breathing cycle
- The footer's top golden thread (the 48px-wide breathing separator) should already be breathing on the same 8s `footer-breathe` cycle
- **CRITICAL:** Both threads must be on the same animation phase. Use the same CSS class (`footer-breathe`) so their breathing is naturally synchronized.

**Measure 6 (700ms — The Atmospheric Warmth):**
- The footer's atmospheric layers shift:
  - Grain opacity: 0.06 → 0.08 (transition-opacity duration-700)
  - Warm yellow fog: `hsl(var(--vow-yellow) / 0.015)` → `hsl(var(--vow-yellow) / 0.03)` (transition-opacity duration-700)
- The covenant bookend's triple-glow dot intensifies:
  - Core: `hsl(var(--vow-yellow) / 0.5)` → `hsl(var(--vow-yellow) / 0.7)`
  - Inner glow: `0 0 6px ... / 0.5` → `0 0 8px ... / 0.6`
  - Middle glow: `0 0 14px ... / 0.25` → `0 0 18px ... / 0.35`
  - Outer glow: `0 0 24px ... / 0.1` → `0 0 32px ... / 0.15`
- All transitions: 700ms, standard easing

**The Result — The Unified Frame:**
```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (56px, fixed, backdrop-blur)                         │
│  ═══ golden thread (0.25 opacity, breathing 8s) ═══         │
│  [Menu]         Parker Gawryletz (centered)         [Menu]   │
│                 ═══ vow-yellow underline ═══                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                   FOOTER CONTENT                             │
│              (normal footer layout below)                    │
│                                                              │
│                  ═══ mini thread (32px, breathing 8s) ═══    │
│                       ● (triple-glow dot, intensified)       │
│              'Til Death ; Unto Life. (semicolon heartbeat)   │
│                                                              │
│  FOOTER (static, section--dark)                              │
└──────────────────────────────────────────────────────────────┘
```

**The Vertical Axis Alignment:**
On desktop (1200px+), the header's centered "Parker Gawryletz" and the footer's centered "'Til Death ; Unto Life." should be vertically aligned on the **same center axis**. This creates a "frame" effect — Parker's name at the top, the covenant at the bottom, with the footer content between them.

### The Three Tempos Polyrhythm

During arrival, three independent timing cycles run simultaneously — like three instruments playing in different time signatures:

1. **The Heartbeat (2s)** — `semicolon-heartbeat` on the semicolon in the covenant tagline
   - `opacity: 1 → 0.85 → 1` and `scale: 1 → 1.08 → 1`
   - The fastest pulse — the human heartbeat, the most intimate tempo

2. **The Breath (3s)** — ambient glow cycle on the triple-glow dot
   - **New keyframe:**
   ```css
   @keyframes golden-dot-breathe {
     0%, 100% { box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.6), 0 0 18px hsl(var(--vow-yellow) / 0.35), 0 0 32px hsl(var(--vow-yellow) / 0.15); }
     50% { box-shadow: 0 0 10px hsl(var(--vow-yellow) / 0.7), 0 0 22px hsl(var(--vow-yellow) / 0.4), 0 0 36px hsl(var(--vow-yellow) / 0.18); }
   }
   ```
   - Only active during `isArrival` state
   - 3s ease-in-out infinite — slower than the heartbeat, the respiratory rhythm

3. **The Frame (8s)** — `footer-breathe` on the golden threads (header bottom + footer top mini-thread)
   - `opacity: 0.3 → 0.6 → 0.3`
   - The slowest pulse — the deep, ambient breathing of the room itself

The visitor feels the life in the page without counting the beats. The polyrhythm creates an organic, living feeling — not mechanical, not predictable, but alive.

### Mobile Arrival Behavior

On mobile (< 768px):
1. Logo stays left-aligned (do not center on mobile — the visual impact is lost on 375px)
2. The vow-yellow underline still draws beneath the logo (450ms, sacred easing)
3. The header's bottom golden thread still brightens and breathes
4. The MobileStickyBar fades out when `[data-footer-bookend]` is visible (already implemented at 0.3 threshold)
5. The footer's atmospheric warmth shift still occurs (grain + fog intensification)
6. The covenant bookend's dot glow still intensifies

### The "Exit" — Scrolling Away from Arrival

When the visitor scrolls back up (away from the footer bookend), the arrival state must **reverse gracefully**:
1. `isArrival` becomes false in both components
2. Header: nav links fade back in (staggered forward: first link first, 80ms intervals)
3. Header: logo glides back from center to left (260ms, standard easing)
4. Header: vow-yellow underline retracts (`scale-x-100` → `scale-x-0`, 450ms, sacred easing)
5. Header: golden thread dims from 0.25 back to 0.12, loses `footer-breathe` class
6. Footer: atmospheric layers return to default (grain 8% → 6%, fog 3% → 1.5%)
7. Footer: covenant bookend dot returns to default glow intensity
8. MobileStickyBar: slides back up into view

---

## VIII. FOOTER INFORMATION ARCHITECTURE (IA)

### Group A: "The Pianist" (Brand Column — 2 columns wide on desktop)
- **Parker Gawryletz** — Cormorant Garamond, `clamp(24px, 3vw, 32px)`, `font-light`, tracking `0.04em`
- **"Wedding Pianist"** — Cormorant Garamond italic, 14px (`text-sm`), `foreground/40`
- **"I carry your vows so they can carry your guests."** — Inter, base (16px), `foreground/70`, `max-w-md`, `leading-relaxed`
- **Social icons row:** Mail · Phone · Instagram · YouTube with diamond separators
  - Each icon: Lucide React, `size={18}`, default `foreground/50`
  - Hover: `text-vow-yellow` with `drop-shadow(0 0 6px hsl(var(--vow-yellow) / 0.3))`
  - Non-hovered siblings: `opacity-40` via `group-hover/icons:[&:not(:hover)]:opacity-40`
  - Transition: `transition-all duration-[180ms]`
  - Touch targets: `p-3.5 -m-3.5` (44px effective)
  - Diamond separators: `w-1 h-1 rotate-45`, `hsl(var(--vow-yellow) / 0.3)`, `box-shadow: 0 0 4px hsl(var(--vow-yellow) / 0.15)`
  - External links (Instagram, YouTube): `target="_blank" rel="noopener noreferrer"`
- Focus states: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm`

### Group B: "Navigate" (Link Column)
- **Label:** "Navigate" — Cormorant Garamond, 12px (`text-xs`), `uppercase`, `tracking-[0.22em]`, `foreground/80`, `mb-6`
- **Links** — Inter, base, `foreground/50`, hover → primary with 1px key-depression translateY:
  - Pricing → `/services`
  - About → `/about`
  - Proof → `/gallery`
  - FAQ → `/faq`
  - Listen → `/listen`
  - Contact → `/contact`
- Each link: `<NavLink>` from react-router-dom
- Link `className`: `"text-foreground/50 hover:text-primary hover:translate-y-[1px] transition-all duration-[180ms] story-link"`
- Space between links: `space-y-3` (12px)
- Wrapped in `<nav aria-label="Footer navigation">`

### Group C: "Reach Me" (Contact Column)
- **Label:** "Reach Me" — same style as Navigate label
- **Calgary, Cochrane, Canmore and Okotoks** — Inter, base, `foreground/50` (plain text)
- **parker@parkergawryletz.com** — linked with `mailto:`, hover → primary
- **+1-403-830-8930** — linked with `tel:+14038308930`, hover → primary

### Golden Thread Separator
- Full-width 1px line
- `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.15), transparent)`
- `box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.1)`
- `mt-16 mb-10`

### Subtle CTA Row (Centered)
- **"Ready to begin?"** — Cormorant Garamond, 14px, `foreground/50`
- **"Hold my date"** — `<Button variant="ghost-dark" size="sm">` in `<Link to="/contact">`
- **Radial glow pool** behind button: `radial-gradient(circle, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)`, 200px circle
- `flex-col items-center gap-4`

### Legal Row
- **Left:** `© {year} Parker Gawryletz. All rights reserved.` — Inter, 14px, `foreground/40`
- **Right:** Privacy · Terms · Cookies · Accessibility — Inter, 14px, `foreground/40`, hover → primary
- Routes: `/privacy-policy`, `/terms`, `/cookie-policy`, `/accessibility`

### Covenant Bookend (`data-footer-bookend`)
- **Mini golden thread echo:** 32px wide, 1px, `footer-breathe` class
- **Triple-glow dot:** `w-1.5 h-1.5 rounded-full`, intensifies during arrival, gains `golden-dot-breathe` animation
- **Tagline:** "'Til Death ; Unto Life." — semicolon in `hsl(var(--vow-yellow)/0.6)` with `semicolon-heartbeat` (2s)
- Container: `flex flex-col items-center gap-3`, `mt-10`, stagger delay 650ms

---

## IX. LAYOUT SPECIFICATION

### Desktop Layout (1200px+)
```
┌──────────────────────────────────────────────────────────────┐
│  [footer-fade-bridge — 60px gradient from CrossOver]         │
│                                                              │
│  ═══ golden thread (48px, centered, breathing) ═══           │
│                                                              │
│  ┌───────────────────────┐  ┌──────────┐  ┌─────────────┐   │
│  │ THE PIANIST (col-2)    │  │ NAVIGATE │  │ REACH ME    │   │
│  │ Parker Gawryletz       │  │ Pricing  │  │ Calgary...  │   │
│  │ Wedding Pianist        │  │ About    │  │ email       │   │
│  │ "I carry your vows..." │  │ Proof    │  │ phone       │   │
│  │ ◆ ✉ ◆ ☎ ◆ IG ◆ YT    │  │ FAQ      │  │             │   │
│  │                        │  │ Listen   │  │             │   │
│  │                        │  │ Contact  │  │             │   │
│  └───────────────────────┘  └──────────┘  └─────────────┘   │
│                                                              │
│  ────── golden thread (full width) ──────                    │
│                                                              │
│              Ready to begin?                                 │
│             [Hold my date]                                   │
│                                                              │
│  © 2026 Parker Gawryletz        Privacy · Terms · Cookies    │
│                                                              │
│         ═══ mini thread (32px, breathing) ═══                │
│                  ● (triple-glow dot)                         │
│        'Til Death ; Unto Life.                               │
│                                                              │
│  [mobile sticky bar spacer: h-16 md:h-0]                     │
└──────────────────────────────────────────────────────────────┘
```

**Grid:** `grid-cols-1 md:grid-cols-4 gap-16`
**Container:** `container mx-auto py-20 px-4 relative z-[2]`

### Mobile Layout (< 768px)
Single column stack. No accordion. Touch targets ≥ 44px. Footer bottom padding includes `pb-[env(safe-area-inset-bottom)]` and `h-16` spacer.

---

## X. BESPOKE ENHANCEMENTS

### Enhancement 1: Key Depression Hover
Add `hover:translate-y-[1px]` to footer nav links. 180ms, standard easing. Piano key feeling.

### Enhancement 2: Arrival Atmospheric Shift
Grain 6% → 8%, fog 1.5% → 3% when `isArrival`. Already partially implemented — preserve and refine.

### Enhancement 3: Golden Dot Ambient Pulse
New `golden-dot-breathe` keyframe (3s cycle), only active during arrival. Third tempo in the polyrhythm.

### Enhancement 4: Synchronized Breathing Frame
Header bottom thread + footer mini thread both use `footer-breathe` class during arrival. Natural sync via shared CSS animation.

### Enhancement 5: Contact Links Warmth
Email/phone links get `drop-shadow(0 0 4px hsl(var(--vow-yellow) / 0.15))` on hover — like candlelight.

---

## XI. NEW CSS KEYFRAMES

```css
/* Golden dot ambient breathing — 3s cycle, only during arrival */
@keyframes golden-dot-breathe {
  0%, 100% {
    box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.6),
                0 0 18px hsl(var(--vow-yellow) / 0.35),
                0 0 32px hsl(var(--vow-yellow) / 0.15);
  }
  50% {
    box-shadow: 0 0 10px hsl(var(--vow-yellow) / 0.7),
                0 0 22px hsl(var(--vow-yellow) / 0.4),
                0 0 36px hsl(var(--vow-yellow) / 0.18);
  }
}
.golden-dot-breathe { animation: golden-dot-breathe 3s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .golden-dot-breathe { animation: none; }
}
```

---

## XII. PERFORMANCE & ACCESSIBILITY

### Performance
- DOM depth ≤ 4 levels. Lucide icons (tree-shaken SVG). No images, embeds, or iframes. All animations GPU-composited (opacity + transform only, exception: box-shadow on single small dot element). `will-change` only on actively animating elements. Reduced motion fallbacks for all animations.

### Accessibility
- `<footer aria-label="Site footer">`, `<nav aria-label="Footer navigation">`, `<h3>` for name, `<h4>` for column labels. All interactive elements have focus-visible states. Social icons have descriptive `aria-label`. All decorative elements `aria-hidden="true"`. Screen reader `sr-only` narrative span. Touch targets ≥ 44px.

---

## XIII. 25 ANTI-PATTERNS

1. No newsletter signup (selectivity signal)
2. No social media embeds (performance)
3. No award badges (Proof page handles this)
4. No exact header nav duplication (footer adds FAQ, Listen)
5. No bright colors (Death space)
6. No rounded corners > 8px (composed tone)
7. No all-caps body text (only column heading overlines)
8. No "Back to Top" button (Piano Key Nav handles this)
9. No chatbot/help widget (sacred atmosphere)
10. No keyword-stuffed anchor text
11. No visually heavier than CrossOver (footer is denouement)
12. No more than one CTA
13. No decorative illustrations/piano graphics/wedding icons
14. No breaking stagger timing (0→150→300→400→500→650ms)
15. No cookie banner overlapping footer
16. No `position: sticky` on footer elements
17. No semicolon animation changes (liturgical)
18. No scale/rotate/bounce hover effects
19. No more than 14 total links
20. No removing mobile sticky bar spacer
21. No exclamation marks
22. No "we" or third-person voice
23. No vine-green in footer
24. No arbitrary spacing values (Fitzgerald scale only)
25. No removing `data-footer-bookend` attribute

---

## XIV. MICROCOPY (EXACT — DO NOT CHANGE)

| Element | Text |
|---------|------|
| Name | Parker Gawryletz |
| Subtitle | Wedding Pianist |
| Mission | I carry your vows so they can carry your guests. |
| Navigate label | Navigate |
| Reach Me label | Reach Me |
| CTA prompt | Ready to begin? |
| CTA button | Hold my date |
| Copyright | © {year} Parker Gawryletz. All rights reserved. |
| Tagline | 'Til Death ; Unto Life. |

---

## XV. FINAL DIRECTIVE

Use ALL of this guidance to ensure the footer and navigation arrival system become a unified ceremonial composition — the recessional of the website.

**DO NOT CHANGE ANYTHING ELSE ON THE WEBSITE.** Only `Footer.tsx` and `MinimalHeader.tsx` are in scope. CrossOver, MobileStickyBar, and all other components remain untouched unless a minor integration point is required.

**WE WILL DO THE FOOTER FIRST AND THEN THE NAV BAR AFTER.** Implement the footer visual overhaul first — atmospheric layers, key depression hover, golden dot ambient pulse, recessional reveal stagger. Then enhance the header's arrival behavior to synchronize with the new footer.

Build it like a covenant. Ship it like a recessional.

*'Til Death ; Unto Life.*
