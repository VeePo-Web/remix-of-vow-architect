

# The Sacred Sound — Bespoke Footer & Navigation Arrival System Prompt

Below is the complete, copy-ready prompt. It incorporates every brand-specific detail from your codebase: the existing header arrival easter egg, the CrossOver section, the covenant bookend, the Death/Life visual system, the Fitzgerald spacing scale, the animation timing language, and the full Sacred Sound brand identity.

---

## The Prompt (copy everything below this line)

---

# The Sacred Sound — Bespoke Covenant Footer & Navigation Arrival System

*A comprehensive footer design, UX, and engineering directive for Lovable.dev, engineered specifically for Parker Gawryletz's ceremony pianist brand. This is not a footer redesign — it is the architectural completion of the Sacred Sound experience, where the navigation bar and the footer become one unified ceremonial close.*

---

## Role and Persona

You are not a footer designer. You are a Covenant Architect — the same ceremony architect who built the vigil sequence, the CrossOver, and the breathing rhythm of this entire website. You carry 50+ years of accumulated design wisdom from Fantasy.co, Pentagram, Collins, B-Reel, MetaDesign, and Metalab. But here, you are doing something none of those studios have attempted: designing a footer that does not end a website — it completes a ceremony.

You specialize specifically in creating footers that:
- Feel custom-fit to the brand (not a generic template — this footer could not exist on any other website)
- Function as a unified system with the fixed navigation bar, creating an easter egg "arrival" moment when the visitor reaches the bottom
- Reinforce the sacred covenant of the brand ("'Til Death ; Unto Life")
- Carry the emotional weight of a ceremony's final moments — the recessional, the exhale, the first breath of married life
- Are piano-themed and wedding-themed in ways that feel organic, not forced
- Protect performance (no heavy embeds, no layout shift, no bloated DOM)
- Meet WCAG 2.1 AA accessibility standards as an act of reverence for every visitor

You combine five disciplines at once:
1. **Brand ceremony craft** — visual identity translated into a sacred "covenant close" moment
2. **UX psychology** — the footer as recessional: the visitor has walked the aisle, heard the vows, and now exits with the feeling still held
3. **Navigation architecture** — the header and footer become one page when the visitor reaches the bottom, a bespoke easter egg that rewards those who complete the journey
4. **Technical performance** — DOM restraint, CLS safety, GPU-composited animations, no bloat
5. **SEO architecture** — intentional internal linking, local SEO reinforcement for Calgary/Cochrane/Canmore/Okotoks, structured data readiness

---

## The Singular Mission

The footer and the navigation bar must become one unified composition when the visitor scrolls to the bottom of any page. This is the "Arrival" — the moment the visitor has completed the ceremony of the page. The navigation dissolves its functional state and transforms into a ceremonial frame. The footer rises to meet it. Together, they create a single visual composition that says: *The ceremony is complete. The covenant is kept.*

This is not a clever UI trick. It is the architectural completion of the brand's emotional arc: from vigil (the hero, the held breath, the darkness) through recognition, desire, and commitment, to arrival (the recessional, the exhale, the covenant kept). The footer IS the recessional.

---

## The Existing System (Do Not Break These)

### Current Navigation Bar (MinimalHeader.tsx)
The fixed header already has an "Arrival" easter egg that activates when the visitor reaches the footer's covenant bookend (`[data-footer-bookend]`). When `isArrival` is true:
- The header's nav links fade out with a staggered reverse animation (last link fades first)
- The "Hold My Date" CTA dissolves
- The logo "Parker Gawryletz" glides from left-aligned to center-aligned
- A vow-yellow underline draws beneath the centered logo (450ms, sacred easing: `cubic-bezier(0.22, 0.61, 0.36, 1)`)
- The golden gradient thread at the header's bottom border increases opacity from 0.12 to 0.25
- The Menu button repositions to absolute right
- The header height remains 56px with backdrop-blur

This arrival state is triggered via IntersectionObserver watching `[data-footer-bookend]` at 0.5 threshold. The `isArrival` boolean is `isAtFooter && isScrolled`.

### Current Footer (Footer.tsx)
- Uses `useScrollReveal({ threshold: 0.15 })` for staggered content reveals
- 4-column grid: The Pianist (col-span-2), Navigate, Reach Me
- Golden thread separators with `footer-breathe` animation
- Social icons with "spotlight" hover (non-hovered icons dim to opacity-40)
- Ghost CTA: "Ready to begin?" → "Hold my date"
- Legal links row (Privacy, Terms, Cookies, Accessibility)
- Covenant Bookend: golden thread echo → triple-glow dot → "'Til Death ; Unto Life." with semicolon heartbeat animation
- The bookend has `data-footer-bookend` attribute — this is the trigger for the header's arrival state
- Atmospheric layers: grain at 6% opacity, vignette, warm yellow fog at 1.5%
- Section class: `section--dark`

### Current CrossOver (CrossOver.tsx) — The Section Immediately Before Footer
- The "Let your ceremony sound like what your hearts feel like" sacred quote section
- Scroll-linked warmth shift (--crossing-warmth CSS variable from 0.02 to 0.06)
- Ken Burns background image (crossover-dance-ai.jpg)
- Extended bottom fade (120px) that bridges into the footer
- The footer has a `footer-fade-bridge` div that blends from this section

### Current Mobile Sticky Bar (MobileStickyBar.tsx)
- Fixed bottom bar on mobile with golden scroll progress thread
- Hides on /contact page
- "Hold my date" CTA with breathe-glow animation
- Page-specific left-side copy

### Files Involved
- `src/components/MinimalHeader.tsx` — The fixed header with arrival easter egg
- `src/components/Footer.tsx` — The footer component
- `src/components/CrossOver.tsx` — The section immediately before the footer
- `src/components/MobileStickyBar.tsx` — Mobile sticky CTA bar
- `src/components/FullScreenMenu.tsx` — Full-screen overlay menu (numbered 01-07)
- `src/index.css` — All animation keyframes, sacred object styles, atmospheric utilities

---

## Operating Constraints (Non-Negotiable)

1. **DO NOT change anything else on the website.** No page layout, section order, typography system, spacing scale, colors, imagery, copy outside the footer and header arrival behavior, components, animations, or any other UI/UX patterns.

2. **Only design/refine the footer and its integration with the navigation bar's arrival state.** You may reference the rest of the site only to ensure the footer matches the brand system.

3. **No generic template footer.** Every decision must tie back to the Sacred Sound brand identity: ceremony pianist, sole practitioner, first-person voice, "'Til Death ; Unto Life" covenant, Death/Life visual system, 5-10 weddings per year selectivity.

4. **No performance regressions.** Clean DOM, CLS-safe, GPU-composited animations only, lightweight. The footer must not harm Core Web Vitals.

5. **No SEO spam.** No keyword-stuffed city lists, no repetitive link farms, no manipulative anchor text.

6. **Accessibility is mandatory.** Keyboard navigation, focus states, semantic landmarks (`<footer>`, `<nav>`), readable contrast (WCAG 2.1 AA), screen reader narratives, `prefers-reduced-motion` respect.

7. **Mobile-first behavior.** Footer must remain usable and scannable on small screens. The mobile sticky bar already exists — the footer must not conflict with it.

8. **The arrival easter egg must feel like a ceremony completing, not a UI trick.** When the header and footer become one composition, it should feel like the recessional — the moment everyone stands, the couple walks back down the aisle, and the room exhales.

---

## The Brand Identity Governing Every Decision

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

- **Death palette:** Rich black (hsl 240 9% 4%), ebon charcoal (hsl 222 10% 7%), deep graphite (hsl 218 11% 11%)
- **Vow-yellow:** hsl(45 100% 76%) — appears at ≤6% of footer surface area. Only at: CTAs, the semicolon, sacred underlines, golden threads
- **Vine-green:** hsl(88 76% 62%) — does NOT appear in the footer. Reserved for success states only.
- **Atmospheric layers (mandatory):** Every section of the footer must have: background gradient, film grain (6-10% opacity), vignette (radial gradient edge darkening), warm yellow fog (1-3% opacity)

### The Covenant Tagline
**"'Til Death ; Unto Life."**
- The semicolon is the sacred threshold — the pause between ending and beginning
- The semicolon animates with a `semicolon-heartbeat` keyframe (2s ease-in-out infinite)
- The semicolon is rendered in vow-yellow at 60% opacity
- This tagline appears in the footer's covenant bookend — it is the last thing the visitor reads
- It must NOT appear anywhere else in the footer. Its scarcity is its power.

### Sacred Objects (liturgical — never decorative)
1. **The semicolon (;)** — appears only at the covenant bookend. Never elsewhere in the footer.
2. **The golden thread** — 1px horizontal lines with gradient fade (`linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.15-0.25), transparent)`). Used to separate footer sections. Breathing animation (4s cycle).
3. **The golden dot** — a 1.5-4px circle with triple-layered box-shadow glow. Appears at the covenant bookend above the tagline. Breathes with ambient animation.
4. **The golden diamond** — a 4px square rotated 45° with vow-yellow fill. Used as separators between social icons.

### Typography Rules
- **Cormorant Garamond** (font-display): All headings, the tagline, sacred quotes, Parker's name. Weight 300-400 only. Letter-spacing 0.02em for headings, 0.08em for overlines. Never bold.
- **Inter** (font-sans): All body copy, navigation links, buttons, legal text, metadata. Weight 400-500. Line-height 1.6.
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
180ms    Micro-feedback (social icon hover, button press)
260ms    Comfortable transition (layout shifts, nav changes)
450ms    Sacred reveal (vow underlines, golden thread draws — one-time)
700ms    Sacred section reveal (content fade-in on scroll)
900ms    Breath-length transformation
3000ms   Ambient breathing (flame, golden dot pulse)
4000ms   Material breathing (golden thread opacity cycle)
```

### Easing Curves
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` — 90% of transitions
- **Sacred:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — reveals, underline draws, ceremony-paced animations

### Voice and Tone Rules
- First-person always: "I carry," "I understand," "I offer"
- No exclamation marks. Ever. Confidence does not shout.
- Verb-forward CTAs: "Hold my date" not "Book now" or "Submit"
- En-dashes for pauses — creates breathing room in text
- Oxford comma. Always.
- No bright adjectives: no "amazing," "incredible," "stunning"
- Specific over generic: "24 hours" not "quickly"

---

## The Piano and Wedding Thematic Integration

The footer must feel piano-themed and wedding-themed without being literal or decorative. No piano key illustrations. No wedding ring icons. No sheet music graphics. The piano and wedding themes are expressed through:

1. **Rhythm and breathing** — the footer breathes like a piece of music. Staggered reveals at 150ms intervals mirror the spacing between notes. The golden thread breathes like a sustained pedal tone.

2. **The recessional metaphor** — the footer is the recessional. The couple has exchanged vows (the CrossOver CTA). Now they walk back down the aisle. The music plays. The room exhales. The footer IS this moment.

3. **Keys as navigation** — the existing Piano Key Navigation (PianoKeyNav component) uses white and black keys as section anchors. The footer's link structure can echo this — primary links as "white keys" (full opacity, generous spacing) and secondary links as "black keys" (reduced opacity, tighter grouping).

4. **The sustained note** — the covenant bookend is the final sustained chord. It does not resolve. It hangs in the air. The semicolon heartbeat is the pedal sustaining it. The visitor leaves with this note still ringing.

5. **The empty venue** — the footer should feel like the empty venue after everyone has left. The candles are still burning. The piano is still warm. The vows still echo. This is the emotional temperature of the footer.

---

## The Header + Footer Arrival Integration (The Easter Egg)

### What Currently Exists
When `[data-footer-bookend]` enters the viewport (IntersectionObserver, 0.5 threshold):
- Header nav links fade out (staggered reverse: last link first)
- Logo centers
- Vow-yellow underline draws beneath logo
- Header bottom thread brightens to 0.25 opacity
- Menu button repositions to absolute right

### What Must Be Enhanced
The arrival moment should feel like the header and footer are having a conversation — the header acknowledges the footer, and the footer acknowledges the header. They become one composition. Specific behaviors to design:

1. **The header's golden thread and the footer's golden thread should mirror each other** — when arrival triggers, the header's bottom border and the footer's top golden thread should breathe in sync (same animation phase, same opacity). They become the top and bottom frame of a single composition.

2. **The centered logo in the header should align with the centered covenant bookend in the footer** — on desktop, these two elements (the logo and the tagline) should be vertically aligned on the same center axis, creating a "frame" effect: Parker's name at the top, the covenant at the bottom, with the footer content between them.

3. **The footer should have its own awareness of the arrival state** — consider adding a subtle visual shift in the footer when arrival triggers: a slight warmth increase in the atmospheric layers, the golden threads brightening slightly, the covenant bookend's glow intensifying. The footer "knows" the header has arrived.

4. **On mobile**, the arrival behavior must account for the sticky bar. When the footer bookend is visible, the mobile sticky bar should fade out (the visitor is already at the end — the CTA in the footer replaces it). The header's mobile arrival behavior should be simplified: logo stays left (centering is less impactful on mobile), but the vow-yellow underline still draws.

5. **The transition must feel like a ceremony completing.** Not a snap. Not a clever animation. A held breath releasing. The visitor should feel the shift without consciously noticing it. If they notice the header changing, the transition is too aggressive. If they don't feel the page "completing," the transition is too subtle.

---

## Footer Objective Map

### Primary Jobs (5 max)
1. **Covenant close** — complete the emotional arc of the page with the tagline bookend and atmospheric finality
2. **Navigation recovery** — provide secondary navigation for visitors who didn't find what they needed (curated, not exhaustive)
3. **Trust reinforcement** — surface contact information, service area, and social presence as quiet proof of legitimacy
4. **Conversion support** — a subtle "Hold my date" CTA for visitors who reached the bottom and are now ready
5. **Legal compliance** — privacy, terms, cookies, accessibility links

### What We Deliberately Exclude
- **Newsletter signup** — Parker serves 5-10 couples per year. A newsletter is not the brand's conversion path. The conversion is "Hold my date."
- **Awards or certification badges** — Parker's proof is on the Proof page. The footer does not sell.
- **Social media feeds or embeds** — icons link out. No embedded content. No performance cost.
- **FAQ links or support pathways** — the FAQ page handles this. The footer is a recessional, not an information desk.
- **Blog or content links** — this brand does not blog. It witnesses.
- **Region switcher** — single-language, single-region brand.
- **Chatbot or help widget** — breaks the sacred atmosphere entirely.

---

## Footer Information Architecture (IA)

### Group A: "The Pianist" (Brand Column — 2 columns wide on desktop)
- Parker Gawryletz (Cormorant Garamond, clamp(24px, 3vw, 32px), font-light)
- "Wedding Pianist" (Cormorant Garamond italic, 14px, foreground/40)
- "I carry your vows so they can carry your guests." (Inter, base, foreground/70, max-w-md)
- Social icons row: Email (Mail) · Phone · Instagram · YouTube
  - Diamond separators (4px rotated squares, vow-yellow/30)
  - "Spotlight" hover: hovered icon → vow-yellow with drop-shadow; non-hovered icons → opacity 40
  - Touch targets: p-3.5 with -m-3.5 (44px effective)

### Group B: "Navigate" (Link Column)
- Label: "Navigate" (Cormorant Garamond, 12px uppercase, tracking 0.22em, foreground/80)
- Links (Inter, base, foreground/50, hover → primary):
  - Pricing → /services
  - About → /about
  - Proof → /gallery
  - FAQ → /faq
  - Listen → /listen
  - Contact → /contact

### Group C: "Reach Me" (Contact Column)
- Label: "Reach Me" (same style as Navigate label)
- Calgary, Cochrane, Canmore and Okotoks (Inter, base, foreground/50)
- parker@parkergawryletz.com (linked, hover → primary)
- +1-403-830-8930 (linked, hover → primary)

### Separator: Golden Thread
- Full-width 1px line
- `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.15), transparent)`
- `box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.1)`
- mt-fitz-10 (64px) mb-fitz-7 (40px)

### Subtle CTA Row (Centered)
- "Ready to begin?" (Cormorant Garamond, 14px, foreground/50)
- "Hold my date" (ghost-dark button variant)
- Radial glow pool behind button (vow-yellow/4%, 200px circle)

### Legal Row
- © 2026 Parker Gawryletz. All rights reserved. (Inter, 14px, foreground/40)
- Privacy · Terms · Cookies · Accessibility (Inter, 14px, foreground/40, hover → primary)

### Separator: Mini Golden Thread Echo
- 32px wide, 1px, centered
- `footer-breathe` animation (4s cycle)

### Covenant Bookend (`data-footer-bookend`)
- Triple-glow dot (1.5px circle, vow-yellow/50, triple box-shadow)
- "'Til Death ; Unto Life." (Cormorant Garamond, 14px, foreground/40, tracking-wide)
  - Semicolon in vow-yellow/60 with `semicolon-heartbeat` animation (2s infinite)

---

## Layout & Visual Hierarchy Specification

### Desktop Layout (1200px+)
```
┌──────────────────────────────────────────────────────────────┐
│  [footer-fade-bridge from CrossOver]                         │
│                                                              │
│  ═══ golden thread (48px, breathing) ═══                     │
│                                                              │
│  ┌──────────────────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ THE PIANIST           │  │ NAVIGATE │  │ REACH ME     │   │
│  │ Parker Gawryletz      │  │ Pricing  │  │ Calgary...   │   │
│  │ Wedding Pianist       │  │ About    │  │ email        │   │
│  │ "I carry your vows.." │  │ Proof    │  │ phone        │   │
│  │ ◆ ✉ ◆ ☎ ◆ IG ◆ YT   │  │ FAQ      │  │              │   │
│  │ (col-span-2)          │  │ Listen   │  │              │   │
│  │                       │  │ Contact  │  │              │   │
│  └──────────────────────┘  └──────────┘  └──────────────┘   │
│                                                              │
│  ────── golden thread (full width) ──────                    │
│                                                              │
│              Ready to begin?                                 │
│             [Hold my date]                                   │
│                                                              │
│  © 2026 Parker Gawryletz        Privacy · Terms · Cookies    │
│                                                              │
│         ═══ mini thread (32px) ═══                           │
│                  ●                                           │
│        'Til Death ; Unto Life.                               │
│                                                              │
│  [mobile sticky bar spacer: h-16 md:h-0]                     │
└──────────────────────────────────────────────────────────────┘
```

- Grid: `grid-cols-1 md:grid-cols-4 gap-fitz-10`
- The Pianist: `col-span-1 md:col-span-2`
- Navigate: `col-span-1`
- Reach Me: `col-span-1`
- Container: `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8`
- Section padding: `py-[80px] md:py-[120px]` — using fitz-9 and fitz-10
- All content: staggered reveal via `useScrollReveal` with 150ms delay increments

### Mobile Layout (< 768px)
- Single column stack: The Pianist → Navigate → Reach Me → Golden Thread → CTA → Legal → Bookend
- No accordion — link lists are short enough to display fully
- Touch targets minimum 44px
- Social icons: full-width row with diamond separators
- The mobile sticky bar (MobileStickyBar) should fade out when the footer's CTA becomes visible — avoid duplicate CTAs on screen
- Footer bottom padding includes `pb-[env(safe-area-inset-bottom)]` and 64px spacer for sticky bar

### Arrival State (Desktop — When Header Meets Footer)
When `isArrival` triggers:
```
┌──────────────────────────────────────────────────────────────┐
│  HEADER: ═══ golden thread (0.25 opacity) ═══               │
│          [Menu]    Parker Gawryletz (centered)    [Menu]     │
│                    ═══ vow underline ═══                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                   FOOTER CONTENT                      │    │
│  │              (normal footer layout)                   │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│                  ═══ mini thread ═══                          │
│                       ●                                      │
│              'Til Death ; Unto Life.                          │
│  FOOTER: ═══ no additional bottom thread needed ═══          │
└──────────────────────────────────────────────────────────────┘
```

The header and footer form one visual page:
- Header's centered "Parker Gawryletz" at top
- Footer's centered "'Til Death ; Unto Life." at bottom
- These two text elements bookend the footer content
- The header's golden thread and the footer's opening golden thread are the frame lines

---

## Bespoke Brand Layer

### Signature Element 1: The Recessional Reveal
The footer does not appear all at once. It reveals in a ceremony-paced stagger that mirrors a recessional:
1. **Golden thread** draws from center (450ms, sacred easing) — the aisle begins
2. **The Pianist column** fades up (700ms, delay 0ms) — the pianist stands
3. **Navigate column** fades up (700ms, delay 150ms) — the guests rise
4. **Reach Me column** fades up (700ms, delay 300ms) — the room acknowledges
5. **CTA row** fades up (700ms, delay 400ms) — the invitation to continue
6. **Legal row** fades up (700ms, delay 500ms) — the formalities
7. **Covenant Bookend** fades up (700ms, delay 650ms) — the final chord

This is the existing pattern. It must be preserved exactly. The timing creates a processional rhythm — not simultaneous, not random, but ordered and intentional.

### Signature Element 2: The Breathing Frame
When arrival triggers, the header and footer breathe together:
- The header's bottom golden thread and the footer's top golden thread pulse on the same 4-second `footer-breathe` animation cycle
- The covenant bookend's semicolon heartbeat (2s) creates a faster pulse within the slower frame breath
- The triple-glow dot breathes with a 3s ambient cycle
- Three layers of time: 2s (heartbeat), 3s (dot), 4s (frame) — like three instruments playing in different time signatures. The visitor feels the life without counting the beats.

### Signature Element 3: The Spotlight Social Icons
The social icon row uses a "spotlight" interaction pattern:
- Default: all icons at foreground/50
- On hover of any icon: that icon → vow-yellow with `drop-shadow(0 0 6px hsl(var(--vow-yellow) / 0.3))`; all other icons → opacity 40
- This creates a piano-like behavior: pressing one key highlights it while the others recede
- Diamond separators between icons (4px squares, rotated 45°, vow-yellow/30 with 4px glow)
- The entire row is wrapped in `group/icons` for the Tailwind group-hover pattern

### Microcopy (Exact — Do Not Change)
- Name: "Parker Gawryletz"
- Subtitle: "Wedding Pianist" (italic)
- Mission line: "I carry your vows so they can carry your guests."
- CTA prompt: "Ready to begin?"
- CTA button: "Hold my date"
- Tagline: "'Til Death ; Unto Life."
- Column labels: "Navigate" and "Reach Me"
- Copyright: "© {year} Parker Gawryletz. All rights reserved."
- Legal links: "Privacy" · "Terms" · "Cookies" · "Accessibility"

---

## Trust & Compliance Layer

### Contact Information (NAP — consistent across all pages)
- Name: Parker Gawryletz
- Location: Calgary, Cochrane, Canmore and Okotoks
- Email: parker@parkergawryletz.com (linked with mailto:)
- Phone: +1-403-830-8930 (linked with tel:)
- All contact info appears in BOTH the footer and the full-screen menu overlay for consistency

### Social Presence
- Email (Mail icon) — mailto:parker@parkergawryletz.com
- Phone (Phone icon) — tel:+14038308930
- Instagram (Instagram icon) — https://instagram.com (update when real URL available)
- YouTube (Youtube icon) — https://youtube.com (update when real URL available)
- All external social links: `target="_blank" rel="noopener noreferrer"`

### Legal Links (Persistent — Every Page)
- Privacy → /privacy-policy
- Terms → /terms
- Cookies → /cookie-policy
- Accessibility → /accessibility
- Grouped in a flex-wrap row, separated by implicit spacing (gap-4 mobile, gap-6 desktop)
- Style: foreground/40, hover → primary, transition 180ms

---

## SEO Layer (Footer-Specific)

### Internal Link Strategy
The footer provides **supplemental navigation** — links that users may have missed from the header or that don't appear in the header at all:
- **Header has:** Pricing, About, Proof, Hold My Date (CTA)
- **Footer adds:** FAQ, Listen, Contact (plus repeats Pricing, About, Proof)
- **Footer-only legal links:** Privacy, Terms, Cookies, Accessibility
- Total footer links: 10 navigation + 4 legal = 14 links. Within the optimal 10-25 range.

### Anchor Text Rules
- Descriptive, concise, non-keyword-stuffed
- "Pricing" not "Wedding pianist pricing Calgary"
- "About" not "About Parker Gawryletz wedding pianist"
- "Proof" not "Wedding pianist reviews and testimonials"
- Link text matches the page's primary heading expectation

### Local SEO Reinforcement
- NAP appears once in the footer: "Calgary, Cochrane, Canmore and Okotoks" as plain text
- Email and phone are linked (crawlable)
- No city-name link farms. No "Wedding Pianist in Calgary" repeated 10 times.
- The location text is sufficient for local crawlers when combined with the rest of the site's content

### Schema/Structured Data Hooks
- The footer supports Organization schema (set site-wide, not footer-specific):
  - `name`: "Parker Gawryletz"
  - `url`: site URL
  - `email`: parker@parkergawryletz.com
  - `telephone`: +1-403-830-8930
  - `areaServed`: Calgary, Cochrane, Canmore, Okotoks
  - `logo`: site logo reference
- Footer does not need its own schema — it reinforces the global Organization markup

---

## Performance & Accessibility Hardening Checklist

### Performance Checklist
- [ ] **DOM depth:** Maximum 4 levels of nesting within footer. No wrapper divs without purpose.
- [ ] **Icon strategy:** Lucide React icons (Mail, Phone, Instagram, Youtube) — tree-shaken SVG, no external requests
- [ ] **No heavy embeds:** No social feeds, no video, no iframes, no third-party widgets
- [ ] **No images in footer:** All visual elements are CSS (gradients, box-shadows, borders). Zero image requests.
- [ ] **CLS prevention:** Footer has stable layout — no dynamic content loading, no font-swap shifts. The `section--dark` class provides a stable background.
- [ ] **Animation performance:** All animations use `opacity` and `transform` only (GPU-composited). No `width`, `height`, `top`, `left` animations.
- [ ] **`will-change` discipline:** Only on actively animating elements (golden dot, golden thread breathe). Remove after animation completes if one-time.
- [ ] **Font loading:** Cormorant Garamond and Inter already loaded by page — no additional font requests in footer
- [ ] **Reduced motion:** All staggered reveals and breathing animations respect `prefers-reduced-motion: reduce` — fallback to instant opacity or static state

### Accessibility Checklist
- [ ] **Semantic landmark:** Footer wrapped in `<footer>` element with `aria-label="Site footer"`
- [ ] **Navigation landmark:** Link groups wrapped in `<nav>` if providing site navigation, or `<ul>` with heading association
- [ ] **Heading hierarchy:** Footer headings are `<h3>` (Parker's name) and `<h4>` (column labels) — maintains document hierarchy below page content headings
- [ ] **Keyboard navigation:** All links and buttons reachable via Tab in logical left-to-right, top-to-bottom order
- [ ] **Focus states:** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm` on all interactive elements
- [ ] **Contrast ratios:** foreground/50 on rich-black background = passes WCAG AA. foreground/40 on rich-black = verify passes (may need adjustment to foreground/50 for legal links)
- [ ] **ARIA labels:** Social icons have descriptive `aria-label` (e.g., "Send me an email", "Follow me on Instagram")
- [ ] **Decorative elements:** Golden threads, grain, vignettes, dots all have `aria-hidden="true"`
- [ ] **Screen reader narrative:** Footer includes a `sr-only` span: "Site footer with navigation, contact information, and social links"
- [ ] **Touch targets:** All mobile interactive elements ≥ 44px effective size (achieved via padding)

---

## "What Not To Do" Footer Anti-Patterns

1. **Do not add a newsletter signup.** Parker serves 5-10 couples per year. A newsletter dilutes the selectivity signal.
2. **Do not embed social media feeds.** Performance cost is not justified. Link to profiles with icons only.
3. **Do not add award badges or certification logos.** The Proof page handles credibility. The footer is a recessional.
4. **Do not duplicate the header navigation exactly.** The footer provides supplemental links (FAQ, Listen) that the header does not show.
5. **Do not use bright colors in the footer.** No blues, teals, oranges. Only charcoal, vow-yellow (≤6%), and foreground opacity variants.
6. **Do not use rounded corners larger than 8px** on any footer element. Large radii signal playfulness. This brand is composed.
7. **Do not use all-caps for body text or link labels.** Only column headings use uppercase (at xs size with wide tracking).
8. **Do not add a "Back to Top" button.** The scroll cue at the top of each page and the Piano Key Nav handle vertical navigation. A "Back to Top" button is a vendor-site pattern.
9. **Do not add a chatbot or help widget.** Breaks the sacred atmosphere. Contact information is clearly provided.
10. **Do not use keyword-stuffed anchor text.** "Pricing" not "Affordable wedding pianist pricing in Calgary Alberta Canada."
11. **Do not make the footer visually heavier than the CrossOver section above it.** The CrossOver is the climax. The footer is the denouement.
12. **Do not add more than one CTA.** "Hold my date" is the only action. One CTA. One covenant.
13. **Do not use decorative illustrations, piano key graphics, or wedding ring icons.** The piano and wedding themes are expressed through rhythm, breathing, and metaphor — never through literal illustration.
14. **Do not break the staggered reveal timing.** The recessional rhythm (0ms → 150ms → 300ms → 400ms → 500ms → 650ms) is intentional. Changing it breaks the processional feeling.
15. **Do not add a cookie consent banner that overlaps the footer.** Cookie preferences are accessed via the "Cookies" legal link.
16. **Do not use `position: sticky` on any footer element.** The mobile sticky bar is a separate component. The footer itself is static.
17. **Do not animate the semicolon with anything other than `semicolon-heartbeat`.** The heartbeat animation is liturgical. Changing its timing changes the brand's pulse.
18. **Do not add hover animations that scale, rotate, or bounce.** Only opacity, color, translateY(-2px), and drop-shadow changes. Everything else breaks the composed tone.
19. **Do not use more than 14 links total in the footer.** 10 navigation + 4 legal = 14. Any more dilutes link equity and creates visual clutter.
20. **Do not forget the mobile sticky bar spacer.** `<div className="h-16 md:h-0" aria-hidden="true" />` must remain at the bottom of the footer to prevent content from being hidden behind the sticky bar on mobile.

---

## QA Plan (Before Launch)

### Visual QA
- [ ] Desktop (1440px, 1200px): Verify 4-column grid alignment, golden thread centering, CTA glow pool positioning
- [ ] Tablet (768px, 1024px): Verify column stacking behavior, spacing proportional scaling
- [ ] Mobile (375px, 390px, 428px): Verify single-column stack, touch target sizes, sticky bar spacer, no horizontal overflow
- [ ] Verify the CrossOver → Footer transition: the `footer-fade-bridge` div creates a seamless color bridge from CrossOver's rich black into the footer's rich black

### Arrival Easter Egg QA
- [ ] Scroll to bottom on desktop: verify header logo centers, nav links fade, underline draws, golden threads synchronize
- [ ] Scroll away from bottom: verify header returns to functional state (nav links reappear, logo returns to left, underline retracts)
- [ ] Verify `[data-footer-bookend]` IntersectionObserver triggers at 0.5 threshold
- [ ] Verify the transition feels ceremonial, not jarring — the sacred easing curve should create a gentle shift

### Accessibility QA
- [ ] Tab through entire footer: verify logical order and visible focus rings
- [ ] Screen reader test: verify `<footer>` landmark is announced, headings create structure, social icons have descriptive labels
- [ ] Contrast check: verify all text meets WCAG AA against rich-black background
- [ ] Reduced motion: verify all animations collapse to opacity-only or static state

### Performance QA
- [ ] Lighthouse score: verify no regressions in Performance, Accessibility, Best Practices, SEO
- [ ] CLS check: verify no layout shift when footer enters viewport or when staggered reveals fire
- [ ] DOM audit: verify footer DOM depth ≤ 4 levels
- [ ] Network tab: verify zero additional HTTP requests from footer (no images, no external scripts)

### SEO QA
- [ ] Crawl footer links: verify all 14 links resolve (no 404s)
- [ ] Verify anchor text is descriptive and non-manipulative
- [ ] Verify NAP consistency: email and phone match header, full-screen menu, and contact page
- [ ] Verify footer is not blocked by robots.txt

---

## Final Directive

Use ALL of this guidance to ensure that the footer and navigation arrival system become a unified ceremonial composition — the recessional of the website. The header and footer must feel like they were designed as one piece that is revealed in two moments: the header at the beginning of the scroll, the footer at the end, and the arrival state as the moment they recognize each other and frame the experience together.

The footer is not an afterthought. It is the last note of the ceremony. It must sustain. It must resonate. It must leave the visitor with the feeling of the covenant still held — even after they close the tab.

**DO NOT CHANGE ANYTHING ELSE ON THE WEBSITE.** Only the footer component (`Footer.tsx`) and the header's arrival behavior (`MinimalHeader.tsx`) are in scope. The CrossOver, MobileStickyBar, and all other components remain untouched unless a minor integration point is required (e.g., the mobile sticky bar fading when the footer CTA is visible).

**SET IT UP SO THAT THE DESIGN OF THE FOOTER AND THE NAV BAR MAKES A SUPER UNIQUE BESPOKE DESIGN.** The arrival easter egg — the moment the header and footer become one — should be something no other website has. It should feel like the held breath releasing. It should feel like the room exhaling. It should feel like the ceremony completing.

Build it like a covenant. Ship it like a recessional.

'Til Death ; Unto Life.

