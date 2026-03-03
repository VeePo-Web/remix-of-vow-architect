

# The Sacred Sound — Ultimate Bespoke Covenant Footer & Navigation Arrival System

*A frame-by-frame, millisecond-precise, brand-obsessive implementation directive for the ceremonial completion of Parker Gawryletz's website. This prompt contains every CSS value, every animation timing, every interaction behavior, and every emotional intention needed to build a footer that does not end a website — it completes a ceremony.*

*This is the definitive version. Every pixel, every millisecond, every atmospheric gradient — specified.*

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

## IV. VISUAL OVERHAUL DIRECTIVES — CURRENT STATE vs. TARGET STATE

This section specifies **exactly** what must change visually in the footer to elevate it from functional to bespoke. The information architecture (columns, content, links) remains the same. The visual expression transforms.

### 4.1 Overall Atmospheric Depth

| Layer | CURRENT | TARGET |
|-------|---------|--------|
| `footer-fade-bridge` height | 60px | **90px** — longer gradient creates more seamless CrossOver blend |
| `footer-fade-bridge` gradient | `linear-gradient(to bottom, transparent, hsl(240 9% 2%))` | **Two-stop:** `linear-gradient(to bottom, transparent 0%, hsl(240 9% 2% / 0.5) 40%, hsl(240 9% 2%) 100%)` — mid-stop prevents harsh cutoff |
| Grain default opacity | 0.06 | **0.05** — slightly less grain in default, creating more contrast when arrival intensifies to 0.08 |
| Grain arrival opacity | 0.08 | **0.09** — the empty venue feels more intimate, more textured |
| Vignette gradient | `transparent 40%` → `hsl(240 9% 2%) 100%` | **`transparent 30%` → `hsl(240 9% 2%) 100%`** — tighter vignette pulls edges darker, creates more peripheral mystery |
| Warm fog default | `hsl(var(--vow-yellow) / 0.015)` at `50% 20%` | **`hsl(var(--vow-yellow) / 0.012)`** at `50% 15%` — more subtle, higher pooling point (closer to the top "ceiling" of the venue) |
| Warm fog arrival | `hsl(var(--vow-yellow) / 0.03)` | **`hsl(var(--vow-yellow) / 0.04)`** — the candles glow brighter when someone is watching |
| New layer: **Second warm fog** | *Does not exist* | **Add a secondary fog** at `50% 80%` (bottom) with `hsl(var(--vow-yellow) / 0.008)` — creates a subtle warm reflection from below, like candlelight bouncing off a polished floor. Arrival state: `0.015` |
| New layer: **Edge warmth** | *Does not exist* | **Left and right edge warmth:** `linear-gradient(90deg, hsl(var(--vow-yellow) / 0.005), transparent 15%, transparent 85%, hsl(var(--vow-yellow) / 0.005))` — barely perceptible warm framing. Arrival state: opacity 0.008 each side |

### 4.2 Container & Spacing

| Element | CURRENT | TARGET |
|---------|---------|--------|
| Container class | `container mx-auto py-20 px-4` | `container mx-auto py-fitz-9 md:py-fitz-10 px-4 md:px-6 lg:px-8` — 80px/120px vertical padding matching the rest of the site's sacred spacing |
| Grid gap | `gap-16` (64px) | `gap-fitz-8 md:gap-fitz-9` — 56px mobile, 80px desktop for more breathing room between columns |
| Opening golden thread `mb` | `mb-12` (48px) | `mb-fitz-8` (56px) — slightly more breathing room after the thread |
| Opening golden thread width | `w-12` (48px) | `w-16` (64px) — wider thread creates a more pronounced aisle marker |
| Full-width separator `mt`/`mb` | `mt-16 mb-10` | `mt-fitz-9 mb-fitz-8` (80px/56px) — more generous vertical rhythm |
| CTA section `mb` | `mb-10` | `mb-fitz-8` (56px) — consistent sacred spacing |
| Covenant bookend `mt` | `mt-10` | `mt-fitz-7` (40px) — tighter to legal row, creating visual association |

### 4.3 Golden Thread Enhancements

| Element | CURRENT | TARGET |
|---------|---------|--------|
| Opening thread opacity (default) | `0.25` | **`0.2`** — slightly less bright default, more contrast during arrival |
| Opening thread opacity (arrival) | `0.35` | **`0.4`** — brighter during arrival to mirror header thread |
| Opening thread glow | `0 0 8px ... / 0.15` → `0.1` | **`0 0 12px ... / 0.12`** — wider, softer glow |
| Opening thread animation | `footer-breathe` always | **`footer-breathe` always**, but add `animation-delay: 0s` explicitly to ensure phase-lock with header thread during arrival |
| Full-width separator opacity | `0.15` | **`0.12`** — more subtle to prevent visual competition with opening thread |
| Full-width separator glow | `0 0 8px ... / 0.1` | **`0 0 10px ... / 0.08`** — wider, softer |
| Mini thread echo width | `w-8` (32px) | **`w-10`** (40px) — slightly wider for presence |
| Mini thread echo opacity | `0.2` | **`0.18`** — slightly dimmer to feel like a dying echo |

### 4.4 Covenant Bookend Enhancements

| Element | CURRENT | TARGET |
|---------|---------|--------|
| Dot size | `w-1.5 h-1.5` (6px) | **`w-2 h-2`** (8px) — larger focal point, more presence as the ceremony's last candle |
| Dot default background | `hsl(var(--vow-yellow) / 0.5)` | **`hsl(var(--vow-yellow) / 0.45)`** — slightly dimmer default for more arrival contrast |
| Dot arrival background | `hsl(var(--vow-yellow) / 0.7)` | **`hsl(var(--vow-yellow) / 0.8)`** — brighter arrival glow |
| Dot default box-shadow | 3 layers: 6px/14px/24px | **4 layers:** `0 0 4px ... / 0.4, 0 0 10px ... / 0.3, 0 0 20px ... / 0.15, 0 0 36px ... / 0.06` — additional outermost halo for deep ambient glow |
| Dot arrival box-shadow | 3 layers: 8px/18px/32px | **4 layers:** `0 0 6px ... / 0.6, 0 0 14px ... / 0.4, 0 0 28px ... / 0.2, 0 0 48px ... / 0.08` — the candle burns brighter when someone is near |
| Dot animation | None (static with transition) | **Add `golden-dot-breathe` animation** (3s cycle) — the dot subtly pulses independently of the thread breathing, creating the polyrhythm effect |
| Tagline text size | `text-sm` (14px) | **`text-base`** (16px) — the covenant deserves more presence |
| Tagline tracking | `tracking-wide` | **`tracking-[0.12em]`** — wider tracking for more air between letters, more ceremony |
| Tagline foreground | `foreground/40` | **`foreground/45`** — marginally brighter for better readability at the sacred moment |
| Tagline arrival behavior | No change | **Increase to `foreground/55` during arrival** — the words sharpen as the ceremony completes |
| Gap between dot and tagline | `gap-3` (12px) | **`gap-4`** (16px) — more breathing room for the sacred pause between the light and the word |
| Semicolon glow | None | **Add `text-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.2)` to the semicolon** — it should softly radiate |

### 4.5 Typography Refinements

| Element | CURRENT | TARGET |
|---------|---------|--------|
| Parker's name size | `clamp(24px, 3vw, 32px)` | **`clamp(26px, 3.2vw, 34px)`** — marginally larger for more presence as the "pianist at the piano" |
| Parker's name tracking | None specified (default) | **`tracking-[0.03em]`** — subtle letter-spacing for refinement |
| "Wedding Pianist" subtitle | `text-sm text-foreground/40` | **`text-sm text-foreground/35 tracking-[0.06em]`** — slightly dimmer, wider spaced, more whispered |
| Mission line `max-w` | `max-w-md` | **`max-w-sm`** — tighter measure forces more deliberate line breaks, more intimate feeling |
| Mission line opacity | `text-foreground/70` | **`text-foreground/60`** — pulled back slightly so it doesn't compete with Parker's name |
| Mission line leading | Default | **`leading-[1.7]`** — slightly more generous line-height for breathing room |
| Column labels tracking | `tracking-[0.22em]` | **`tracking-[0.25em]`** — wider tracking for the uppercase labels |
| Column labels opacity | `foreground/80` | **`foreground/60`** — pulled back, these are structural markers not content |
| Column labels margin-bottom | `mb-6` | **`mb-8`** — more space between label and first link for hierarchy |
| Nav link spacing | `space-y-3` (12px) | **`space-y-4`** (16px) — more breathing between links, like spaces between piano keys |
| Contact info spacing | `space-y-3` (12px) | **`space-y-4`** (16px) — matching nav column |
| "Ready to begin?" size | `text-sm` | **`text-base`** — the question deserves more presence |
| CTA button variant | `ghost-dark` `size="sm"` | **`ghost-dark` `size="default"`** — larger tap target, more intentional feel |
| Copyright text | `text-sm text-foreground/40` | **`text-xs text-foreground/35`** — smaller, dimmer, truly recessive |
| Legal link text | `text-sm` | **`text-xs`** — matching copyright size |
| Legal link opacity | `foreground/40` | **`foreground/35`** — dimmer to match copyright |

### 4.6 Social Icon Enhancements

| Element | CURRENT | TARGET |
|---------|---------|--------|
| Icon size | `size={18}` | **`size={16}`** — slightly smaller for more elegance, relies on the touch target padding for usability |
| Diamond separator glow | `0 0 4px ... / 0.15` | **`0 0 6px ... / 0.12`** — wider, softer glow radius |
| Hover drop-shadow | `0 0 6px ... / 0.3` | **`0 0 8px ... / 0.25`** — wider, more ambient glow when spotlighted |
| Icon hover transition | `duration-[180ms]` | Keep 180ms, but add **`will-change: color, filter`** for GPU compositing on the drop-shadow |
| New: key depression | *Does not exist* | **Add `translateY(1px)` on hover** — the key depression micro-interaction |

### 4.7 CTA Glow Pool

| Element | CURRENT | TARGET |
|---------|---------|--------|
| Glow pool size | `w-[200px] h-[200px]` | **`w-[240px] h-[240px]`** — slightly larger pool |
| Glow pool opacity | `vow-yellow / 0.04` | **`vow-yellow / 0.03`** — more subtle base |
| Glow pool arrival | No change | **Increase to `0.05` during arrival** — the glow warms when the ceremony completes |
| Glow pool blur | None | **Add `filter: blur(40px)`** — softer, more atmospheric pool |
| New: CTA button glow | *Does not exist* | **Add a subtle `box-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.06)` to the CTA button during hover** — the button itself radiates warmth |

---

## V. OPERATING CONSTRAINTS (NON-NEGOTIABLE)

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
11. **All new CSS must go in `index.css`** alongside existing footer styles. No inline `<style>` tags. No CSS-in-JS.
12. **All new animations must have `prefers-reduced-motion` fallbacks.** Every breathing cycle, every pulse, every ambient animation must degrade gracefully to a static state or opacity-only fade.

---

## VI. THE BRAND IDENTITY GOVERNING EVERY DECISION

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
- Film grain (5-9% opacity, responsive to arrival state)
- Vignette (radial gradient edge darkening, tighter than other sections)
- Warm yellow fog (0.012-0.04% opacity, pooling from top and reflecting from bottom)
- Edge warmth (barely perceptible side framing)

### The Covenant Tagline
**"'Til Death ; Unto Life."**
- The semicolon is the sacred threshold — the pause between ending and beginning
- The semicolon animates with `semicolon-heartbeat` keyframe (2s ease-in-out infinite)
- The semicolon is rendered in vow-yellow at 60% opacity with a soft text-shadow glow
- This tagline appears in the footer's covenant bookend — it is the last thing the visitor reads
- It must NOT appear anywhere else in the footer. Its scarcity is its power.

### Sacred Objects (liturgical — never decorative)
1. **The semicolon (;)** — appears only at the covenant bookend. Never elsewhere in the footer.
2. **The golden thread** — 1px horizontal lines with gradient fade: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.12-0.4), transparent)`. Used to separate footer sections. Breathing animation (8s cycle via `footer-breathe`). Phase-locked between header and footer during arrival.
3. **The golden dot** — an 8px circle (w-2 h-2) with four-layered box-shadow glow. Appears at the covenant bookend above the tagline. Breathes with `golden-dot-breathe` (3s cycle). Intensifies during arrival.
4. **The golden diamond** — a 4px square (w-1 h-1) rotated 45° with `hsl(var(--vow-yellow) / 0.3)` fill and `0 0 6px hsl(var(--vow-yellow) / 0.12)` glow. Used as separators between social icons.

### Typography Rules
- **Cormorant Garamond** (`font-display`): All headings, the tagline, sacred quotes, Parker's name. Weight 300-400 only. Letter-spacing 0.03em for name, 0.25em for overlines. Never bold.
- **Inter** (`font-sans`): All body copy, navigation links, buttons, legal text, metadata. Weight 400-500. Line-height 1.6-1.7.
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
180ms    Micro-feedback (social icon hover, button press, key depression)
260ms    Comfortable transition (layout shifts, nav changes, arrival state changes)
450ms    Sacred reveal (vow underlines, golden thread draws — one-time, sacred easing)
700ms    Sacred section reveal (content fade-in on scroll, stagger base duration)
900ms    Breath-length transformation (major state changes)
2000ms   Semicolon heartbeat cycle (liturgical pulse — the fastest tempo)
3000ms   Golden dot ambient breathing cycle (the middle tempo)
8000ms   Golden thread frame breathing cycle (footer-breathe — the slowest tempo)
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

## VII. THE PIANO AND WEDDING THEMATIC INTEGRATION

The footer must feel piano-themed and wedding-themed **without being literal or decorative**. No piano key illustrations. No wedding ring icons. No sheet music graphics. No musical note symbols. The piano and wedding themes are expressed through:

### 1. Rhythm and Breathing
The footer breathes like a piece of music. Staggered reveals at 150ms intervals mirror the spacing between notes in a processional hymn. The golden thread breathes like a sustained pedal tone (8s cycle). The semicolon pulses like a heartbeat (2s cycle). The golden dot breathes like a room resonating (3s cycle). Three tempos running simultaneously — the polyrhythm of a ceremony ending.

### 2. The Recessional Metaphor
The footer is the recessional. The couple has exchanged vows (the CrossOver CTA — "Let your ceremony sound like what your hearts feel like"). Now they walk back down the aisle. The music plays. The room exhales. The footer IS this moment. Each column revealing in sequence mirrors the processional order: the pianist stands first (0ms), then the guests rise (150ms), then the room acknowledges (300ms).

### 3. Key Depression Hover
Navigation links in the footer should have a subtle **"key depression"** hover micro-interaction: on hover, the link text shifts down by `translateY(1px)` and the color transitions from `foreground/50` to `primary` — like pressing a piano key. Duration: 180ms. Easing: standard. This is not a bounce. It is a precise, weighted depression — the same feeling as pressing a real piano key that has resistance, weight, and purpose.

```css
/* Footer nav link — key depression hover */
.footer-nav-link {
  transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-nav-link:hover {
  transform: translateY(1px);
  color: hsl(var(--primary));
}
```

### 4. The Sustained Note
The covenant bookend is the final sustained chord. It does not resolve. It hangs in the air. The semicolon heartbeat is the pedal sustaining it. The golden dot breathing is the resonance vibrating in the strings. The mini golden thread echo is the last fading overtone. The visitor leaves with this note still ringing in their mind.

### 5. The Empty Venue
The footer should feel like the empty venue after everyone has left. The candles are still burning (the golden dot glows and breathes). The piano is still warm (the warm yellow fog pools at the top and reflects from the bottom). The vows still echo (the tagline hangs in the space). This is the emotional temperature of the footer — not cold, not celebratory, but **warm stillness**. The specific CSS values that create this feeling:
- Grain at 5% (rising to 9% during arrival — the room texture becomes more intimate)
- Warm yellow fog pooling from 15% vertical position (near the "ceiling") with a secondary pool at 80% (the "floor reflection")
- Vignette pulling edges to near-black from 30% (the periphery of the empty room)
- Edge warmth at 0.5% opacity (like the last light from doorways on either side)
- The overall temperature: warm-leaning charcoal, not cold blue-black

### 6. The Spotlight Social Icons (Piano Key Behavior)
The social icon row uses a **"spotlight" interaction pattern** that mirrors piano key behavior:
- **Default state:** All icons at `foreground/50`
- **On hover of any icon:** That icon → `text-vow-yellow` with `drop-shadow(0 0 8px hsl(var(--vow-yellow) / 0.25))` and `translateY(1px)` (key depression); all other icons → `opacity-40`
- This creates a piano-like behavior: pressing one key highlights it while the others recede. One note rings out above the rest.
- **Diamond separators** between icons: 4px squares (w-1 h-1), rotated 45° (`rotate-45`), `hsl(var(--vow-yellow) / 0.3)` fill with `0 0 6px hsl(var(--vow-yellow) / 0.12)` glow
- The entire row is wrapped in `group/icons` for the Tailwind `group-hover` pattern
- Touch targets: `p-3.5` with `-m-3.5` (44px effective tap area)

### 7. The Three Tempos — The Polyrhythm of Ceremony

Three concurrent breathing cycles running simultaneously, each at a different tempo, creating the organic, living quality of the footer. Like three instruments in a chamber ensemble, each playing in its own time signature but harmonizing into one feeling:

**Tempo 1: The Heartbeat (2s) — `semicolon-heartbeat`**
- The fastest pulse. The liturgical heartbeat.
- Applied to: the semicolon in the covenant tagline
- Character: `opacity: 1 → 0.85 → 1` with `scale: 1 → 1.08 → 1`
- This is the human pulse — alive, constant, intimate

**Tempo 2: The Resonance (3s) — `golden-dot-breathe` (NEW)**
- The middle pulse. The room resonating.
- Applied to: the golden dot above the tagline
- Character: `opacity: 0.45 → 0.7 → 0.45` with `box-shadow` spreading from 4px to 6px inner radius
- This is the acoustic resonance — the sound still vibrating in the piano strings after the last note

```css
@keyframes golden-dot-breathe {
  0%, 100% {
    opacity: 0.45;
    box-shadow:
      0 0 4px hsl(var(--vow-yellow) / 0.4),
      0 0 10px hsl(var(--vow-yellow) / 0.3),
      0 0 20px hsl(var(--vow-yellow) / 0.15),
      0 0 36px hsl(var(--vow-yellow) / 0.06);
  }
  50% {
    opacity: 0.7;
    box-shadow:
      0 0 6px hsl(var(--vow-yellow) / 0.5),
      0 0 14px hsl(var(--vow-yellow) / 0.35),
      0 0 24px hsl(var(--vow-yellow) / 0.18),
      0 0 40px hsl(var(--vow-yellow) / 0.08);
  }
}
```

**Tempo 3: The Frame (8s) — `footer-breathe`**
- The slowest pulse. The room breathing.
- Applied to: the golden threads (opening thread, mini thread echo, and during arrival — the header's bottom thread)
- Character: `opacity: 0.3 → 0.6 → 0.3`
- This is the room itself — the architectural space slowly inhaling and exhaling, the way a vast empty hall seems to breathe

**The Polyrhythm Effect:**
These three tempos are intentionally non-synchronizable (2s, 3s, 8s — no common factor creates perfect alignment until 24s). This means the footer is never in exactly the same visual state twice in any 24-second window. It feels alive without feeling animated. It breathes without feeling mechanical. It is the anti-loop — organic rhythm, not digital repetition.

---

## VIII. THE HEADER + FOOTER ARRIVAL INTEGRATION (THE EASTER EGG)

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

### The "Ceremony Completion" Arrival Score — Musical Measures

Think of this as a musical score with precise measures. Each measure is a timed event in the arrival choreography:

**Measure 1 (0ms — The Awareness):**
- The `isArrival` boolean becomes `true` in both MinimalHeader and Footer
- Both components are now aware of each other
- No visible change yet — this is the held breath before the exhale

**Measure 2 (0-500ms — The Dissolution):**
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
- Background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.4), transparent)`
- This is the threshold moment — the aisle has been walked, the vow has been sealed

**Measure 5 (450ms — The Thread Brightening):**
- Header bottom golden thread opacity transitions from 0.12 to 0.25
- Duration: 450ms, standard easing
- The `footer-breathe` class is added, beginning the 8s breathing cycle
- The header and footer threads are now breathing in sync — the frame is alive

**Measure 6 (700ms — The Footer Responds):**
- Footer atmospheric layers shift:
  - Grain: 5% → 9% (duration 700ms)
  - Warm yellow fog (top): 0.012 → 0.04 (duration 700ms)
  - Warm yellow fog (bottom): 0.008 → 0.015 (duration 700ms)
  - Edge warmth: 0.005 → 0.008 (duration 700ms)
- Opening golden thread brightens from 0.2 to 0.4 (duration 700ms)
- Covenant bookend dot intensifies:
  - Background: 0.45 → 0.8 (duration 700ms)
  - Box-shadow layers expand (transition via `transition-all duration-700`)
- Covenant tagline: `foreground/45` → `foreground/55` (duration 700ms)
- The footer "knows" the header has arrived. The room warms.

**Measure 7 (∞ — The Sustained State):**
- All three tempos are running: heartbeat (2s), dot resonance (3s), frame breath (8s)
- The header logo with underline frames the top
- The covenant tagline with breathing dot frames the bottom
- They are vertically aligned on the same center axis
- The composition is complete. The ceremony is held.

### The "Departure" Score — When the Visitor Scrolls Back Up

**Reverse Measure 1 (0ms):** `isArrival` becomes `false`
**Reverse Measure 2 (0-260ms):** Footer atmospheric layers return to default (700ms transitions — they linger)
**Reverse Measure 3 (0ms):** Logo underline retracts: `scale-x-100` → `scale-x-0` (450ms, sacred easing)
**Reverse Measure 4 (0ms):** Header bottom thread dims: 0.25 → 0.12, `footer-breathe` class removed
**Reverse Measure 5 (0-260ms):** Nav links fade back in (staggered forward: first link first)
**Reverse Measure 6 (260ms):** Logo returns to left alignment, Menu button returns to normal flow

The departure should feel like the ceremony gently releasing — not snapping back, but slowly letting go. The 700ms footer atmospheric transitions ensure the warmth lingers even after `isArrival` is false.

### Desktop vs. Mobile Arrival

**Desktop (≥768px):**
- Full arrival choreography as described above
- Logo centers, underline draws, threads synchronize
- Header + footer form visible compositional frame

**Mobile (<768px):**
- Logo stays left-aligned (centering has less impact on mobile's narrow viewport)
- Vow-yellow underline still draws beneath logo
- Nav links still fade out (mobile header shows fewer links anyway)
- The `MobileStickyBar` slides down with `translate-y-full` (260ms, sacred easing) when `isFooterCtaVisible` is true
- Footer atmospheric intensification still occurs
- The arrival feeling is more intimate on mobile — the warmth change is what communicates completion

### Vertical Axis Alignment (Desktop Only)

When arrival triggers on desktop, these two text elements should be vertically centered on the same axis:
- **Top:** "Parker Gawryletz" (header, centered via `justify-center`)
- **Bottom:** "'Til Death ; Unto Life." (footer covenant bookend, centered via `items-center`)

Both use `text-center` or flex centering. The header is fixed at top. The footer content scrolls. When the bookend is in view, these two elements frame the visible footer content — Parker's name at the top of the viewport, the covenant at the bottom. The golden threads are the frame lines.

This creates the **"One Page" effect** — the header and footer are not separate UI elements but one unified ceremonial page that was always there, revealed only to those who completed the journey.

---

## IX. NEW CSS KEYFRAMES AND CLASSES

These must be added to `index.css` alongside existing footer styles:

```css
/* ============================================
   GOLDEN DOT AMBIENT BREATHING (3s cycle)
   The middle tempo — the room resonating
   ============================================ */
@keyframes golden-dot-breathe {
  0%, 100% {
    opacity: 0.45;
    box-shadow:
      0 0 4px hsl(var(--vow-yellow) / 0.4),
      0 0 10px hsl(var(--vow-yellow) / 0.3),
      0 0 20px hsl(var(--vow-yellow) / 0.15),
      0 0 36px hsl(var(--vow-yellow) / 0.06);
  }
  50% {
    opacity: 0.7;
    box-shadow:
      0 0 6px hsl(var(--vow-yellow) / 0.5),
      0 0 14px hsl(var(--vow-yellow) / 0.35),
      0 0 24px hsl(var(--vow-yellow) / 0.18),
      0 0 40px hsl(var(--vow-yellow) / 0.08);
  }
}

.golden-dot-breathe {
  animation: golden-dot-breathe 3s ease-in-out infinite;
}

/* Arrival-state golden dot — brighter, wider glow */
.golden-dot-breathe--arrival {
  animation: golden-dot-breathe-arrival 3s ease-in-out infinite;
}

@keyframes golden-dot-breathe-arrival {
  0%, 100% {
    opacity: 0.7;
    box-shadow:
      0 0 6px hsl(var(--vow-yellow) / 0.6),
      0 0 14px hsl(var(--vow-yellow) / 0.4),
      0 0 28px hsl(var(--vow-yellow) / 0.2),
      0 0 48px hsl(var(--vow-yellow) / 0.08);
  }
  50% {
    opacity: 0.9;
    box-shadow:
      0 0 8px hsl(var(--vow-yellow) / 0.7),
      0 0 18px hsl(var(--vow-yellow) / 0.45),
      0 0 32px hsl(var(--vow-yellow) / 0.25),
      0 0 56px hsl(var(--vow-yellow) / 0.1);
  }
}

/* ============================================
   FOOTER NAV LINK — Key Depression Hover
   ============================================ */
.footer-nav-link {
  transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-nav-link:hover {
  transform: translateY(1px);
  color: hsl(var(--primary));
}

/* ============================================
   ENHANCED FOOTER FADE BRIDGE (90px)
   ============================================ */
.footer-fade-bridge--enhanced {
  position: absolute;
  top: -90px;
  left: 0;
  right: 0;
  height: 90px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    hsl(240 9% 2% / 0.5) 40%,
    hsl(240 9% 2%) 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* ============================================
   REDUCED MOTION FALLBACKS
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  .golden-dot-breathe,
  .golden-dot-breathe--arrival {
    animation: none;
  }
  .footer-nav-link:hover {
    transform: none;
  }
}
```

---

## X. FOOTER INFORMATION ARCHITECTURE (IA) — PRESERVED

The IA does not change. The visual expression transforms. For completeness:

### Group A: "The Pianist" (Brand Column — 2 columns wide on desktop)
- **Parker Gawryletz** (Cormorant Garamond, `clamp(26px, 3.2vw, 34px)`, font-light, `tracking-[0.03em]`)
- **"Wedding Pianist"** (Cormorant Garamond italic, 14px, `foreground/35`, `tracking-[0.06em]`)
- **"I carry your vows so they can carry your guests."** (Inter, base, `foreground/60`, `max-w-sm`, `leading-[1.7]`)
- **Social icons row:** Email (Mail) · Phone · Instagram · YouTube
  - Diamond separators (4px rotated squares, `vow-yellow/30`, `0 0 6px ... / 0.12` glow)
  - "Spotlight" hover with key depression (`translateY(1px)`)
  - Touch targets: `p-3.5` with `-m-3.5` (44px effective)

### Group B: "Navigate" (Link Column)
- **Label:** "Navigate" (Cormorant Garamond, 12px uppercase, `tracking-[0.25em]`, `foreground/60`, `mb-8`)
- **Links** (Inter, base, `foreground/50`, hover → primary with key depression):
  - Pricing → /services
  - About → /about
  - Proof → /gallery
  - FAQ → /faq
  - Listen → /listen
  - Contact → /contact
- **Link spacing:** `space-y-4` (16px)
- **Link class:** `footer-nav-link` (key depression hover)
- **Link style:** `story-link` class for underline animation on hover

### Group C: "Reach Me" (Contact Column)
- **Label:** "Reach Me" (same style as Navigate label)
- **Content** (Inter, base, `foreground/50`, `space-y-4`):
  - Calgary, Cochrane, Canmore and Okotoks (plain text)
  - parker@parkergawryletz.com (linked with `mailto:`, hover → primary)
  - +1-403-830-8930 (linked with `tel:`, hover → primary)

### Separator: Golden Thread
- Full-width 1px line
- `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.12), transparent)`
- `box-shadow: 0 0 10px hsl(var(--vow-yellow) / 0.08)`
- `mt-fitz-9` (80px) `mb-fitz-8` (56px)

### Subtle CTA Row (Centered)
- **"Ready to begin?"** (Cormorant Garamond, base/16px, `foreground/50`)
- **"Hold my date"** (`ghost-dark` button variant, default size)
- **Radial glow pool:** 240px circle, `vow-yellow/0.03` default, `0.05` arrival, `filter: blur(40px)`
- **Button hover glow:** `box-shadow: 0 0 20px hsl(var(--vow-yellow) / 0.06)`

### Legal Row
- **©** 2026 Parker Gawryletz. All rights reserved. (Inter, xs/12px, `foreground/35`)
- **Privacy** · **Terms** · **Cookies** · **Accessibility** (Inter, xs/12px, `foreground/35`, hover → primary)
- Flex-wrap, `gap-4` mobile, `gap-6` desktop

### Separator: Mini Golden Thread Echo
- 40px wide (`w-10`), 1px, centered
- `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.18), transparent)`
- `footer-breathe` animation (8s cycle)

### Covenant Bookend (`data-footer-bookend`)
- **Golden dot:** `w-2 h-2` (8px), four-layer box-shadow, `golden-dot-breathe` animation (3s cycle), `golden-dot-breathe--arrival` during arrival state
- **Tagline:** "'Til Death ; Unto Life." (Cormorant Garamond, base/16px, `foreground/45` default, `foreground/55` arrival, `tracking-[0.12em]`)
- **Semicolon:** `hsl(var(--vow-yellow) / 0.6)` with `text-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.2)`, `semicolon-heartbeat` animation (2s infinite)
- **Gap:** `gap-4` (16px) between dot and tagline

---

## XI. LAYOUT & VISUAL HIERARCHY

### Desktop Layout (≥768px)
```
┌──────────────────────────────────────────────────────────────┐
│  [footer-fade-bridge: 90px gradient blend from CrossOver]    │
│                                                              │
│  ═══ golden thread (64px, breathing, 8s cycle) ═══           │
│                         56px gap                             │
│  ┌──────────────────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ THE PIANIST           │  │ NAVIGATE │  │ REACH ME     │   │
│  │ Parker Gawryletz      │  │ Pricing  │  │ Calgary...   │   │
│  │ Wedding Pianist       │  │ About    │  │ email        │   │
│  │ "I carry your vows.." │  │ Proof    │  │ phone        │   │
│  │ ◆ ✉ ◆ ☎ ◆ IG ◆ YT   │  │ FAQ      │  │              │   │
│  │ (col-span-2)          │  │ Listen   │  │              │   │
│  │                       │  │ Contact  │  │              │   │
│  └──────────────────────┘  └──────────┘  └──────────────┘   │
│                         80px gap                             │
│  ────── golden thread (full width, subtle) ──────            │
│                         56px gap                             │
│              Ready to begin?                                 │
│             [Hold my date]                                   │
│              (glow pool behind)                              │
│                         56px gap                             │
│  © 2026 Parker Gawryletz        Privacy · Terms · Cookies    │
│                         40px gap                             │
│         ═══ mini thread (40px, breathing) ═══                │
│                  ●  (8px, 4-layer glow, 3s breathe)          │
│        'Til Death ; Unto Life.  (16px, wide tracking)        │
│                                                              │
│  [mobile sticky bar spacer: h-16 md:h-0]                     │
└──────────────────────────────────────────────────────────────┘
```

**Grid:** `grid-cols-1 md:grid-cols-4 gap-fitz-8 md:gap-fitz-9`
**Container:** `container mx-auto py-fitz-9 md:py-fitz-10 px-4 md:px-6 lg:px-8 relative z-[2]`

### Mobile Layout (<768px)
Single column stack with consistent `space-y-fitz-7` (40px) between groups.
No accordion — link lists are short enough to display fully.
Touch targets minimum 44px. Social icons full-width row.
Footer bottom padding: `pb-[env(safe-area-inset-bottom)]` + 64px spacer.

### Arrival State (Desktop)
```
┌──────────────────────────────────────────────────────────────┐
│  HEADER: ═══ golden thread (0.25, breathing in sync) ═══    │
│          [Menu]    Parker Gawryletz (centered)    [Menu]     │
│                    ═══ vow underline (0.4) ═══               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              FOOTER CONTENT (warmed)                  │    │
│  │         grain 9%, fog 4%, edge warmth 0.8%            │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│              ═══ mini thread (breathing) ═══                 │
│                   ●  (arrival glow, 3s breathe)              │
│          'Til Death ; Unto Life.  (foreground/55)            │
│  FOOTER: ═══ opening thread (0.4, breathing in sync) ═══    │
└──────────────────────────────────────────────────────────────┘
```

---

## XII. TRUST & COMPLIANCE LAYER

### Contact Information (NAP)
- Name: Parker Gawryletz
- Location: Calgary, Cochrane, Canmore and Okotoks
- Email: parker@parkergawryletz.com (linked with `mailto:`)
- Phone: +1-403-830-8930 (linked with `tel:`)
- Consistent across footer, full-screen menu, and contact page

### Social Presence
- Email (Mail icon) — `mailto:parker@parkergawryletz.com`
- Phone (Phone icon) — `tel:+14038308930`
- Instagram (Instagram icon) — `https://instagram.com` (update when real URL available)
- YouTube (Youtube icon) — `https://youtube.com` (update when real URL available)
- External links: `target="_blank" rel="noopener noreferrer"`

### Legal Links
- Privacy → /privacy-policy
- Terms → /terms
- Cookies → /cookie-policy
- Accessibility → /accessibility

### SEO
- 10 navigation + 4 legal = 14 total links (within optimal range)
- Descriptive, non-keyword-stuffed anchor text
- NAP appears once as plain text
- No city-name link farms

---

## XIII. PERFORMANCE & ACCESSIBILITY HARDENING

### Performance
- **DOM depth:** Maximum 4 levels of nesting within footer
- **Icons:** Lucide React (tree-shaken SVG, zero network requests)
- **No images:** All visual elements are CSS (gradients, box-shadows, borders)
- **CLS prevention:** Stable layout, no dynamic content loading
- **GPU compositing:** All animations use `opacity` and `transform` only. `will-change` only on actively animating elements.
- **Reduced motion:** All breathing, pulsing, key depression animations respect `prefers-reduced-motion: reduce`

### Accessibility
- **Semantic:** `<footer>` with `aria-label="Site footer"`, `<nav>` with `aria-label="Footer navigation"`
- **Headings:** `<h3>` (Parker's name), `<h4>` (column labels)
- **Keyboard:** All links/buttons reachable via Tab in logical order
- **Focus:** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm`
- **Contrast:** `foreground/50` on rich-black = passes WCAG AA. Verify `foreground/35` on legal links.
- **ARIA labels:** Social icons have descriptive labels ("Send me an email", "Follow me on Instagram")
- **Decorative:** Golden threads, grain, vignettes, dots: `aria-hidden="true"`
- **Screen reader:** `sr-only` span: "Site footer with navigation, contact information, and social links"
- **Touch targets:** All mobile interactive elements ≥ 44px effective size

---

## XIV. "WHAT NOT TO DO" — 25+ ANTI-PATTERNS

1. **Do not add a newsletter signup.** Parker serves 5-10 couples per year. A newsletter dilutes the selectivity signal.
2. **Do not embed social media feeds.** Performance cost not justified. Icons link out only.
3. **Do not add award badges or certification logos.** The Proof page handles credibility. The footer is a recessional, not a trophy case.
4. **Do not duplicate the header navigation exactly.** The footer provides supplemental links (FAQ, Listen) that the header does not show.
5. **Do not use bright colors.** No blues, teals, oranges, reds. Only charcoal, vow-yellow (≤6%), and foreground opacity variants.
6. **Do not use rounded corners larger than 8px.** Large radii signal playfulness. This brand is composed.
7. **Do not use all-caps for body text or link labels.** Only column headings use uppercase (at xs size with wide tracking).
8. **Do not add a "Back to Top" button.** The scroll cue and Piano Key Nav handle vertical navigation. A "Back to Top" is a vendor-site pattern.
9. **Do not add a chatbot or help widget.** Breaks the sacred atmosphere. Contact info is clearly provided.
10. **Do not use keyword-stuffed anchor text.** "Pricing" not "Affordable wedding pianist pricing in Calgary."
11. **Do not make the footer visually heavier than the CrossOver.** The CrossOver is the climax. The footer is the denouement.
12. **Do not add more than one CTA.** "Hold my date" is the only action. One CTA. One covenant.
13. **Do not use decorative illustrations, piano key graphics, or wedding ring icons.** Themes expressed through rhythm and metaphor, never literal illustration.
14. **Do not break the staggered reveal timing.** The recessional rhythm (0→150→300→400→500→650ms) is intentional.
15. **Do not add a cookie consent banner that overlaps the footer.** Cookie preferences via the "Cookies" link.
16. **Do not use `position: sticky` on any footer element.** The mobile sticky bar is separate.
17. **Do not animate the semicolon with anything other than `semicolon-heartbeat`.** The heartbeat is liturgical.
18. **Do not add hover animations that scale, rotate, or bounce.** Only opacity, color, `translateY(1px)`, and drop-shadow. Everything else breaks the tone.
19. **Do not use more than 14 links.** 10 nav + 4 legal. More dilutes link equity.
20. **Do not forget the mobile sticky bar spacer.** `h-16 md:h-0` must remain at footer bottom.
21. **Do not use `font-bold` or `font-semibold` on any footer text.** The footer whispers. `font-light` (300) and `font-normal` (400) only.
22. **Do not add a map embed.** Zero performance cost is non-negotiable. Location is plain text.
23. **Do not use more than 5 atmospheric layers total.** Grain + vignette + top fog + bottom fog + edge warmth = 5. More creates DOM bloat.
24. **Do not synchronize the three breathing tempos.** 2s, 3s, 8s are intentionally non-synchronizable. The organic quality comes from their asynchrony.
25. **Do not add hover tooltips to social icons.** The `aria-label` handles accessibility. Visual tooltips add clutter.
26. **Do not use `transition-all` without specificity.** Specify exact properties: `transition: color 180ms, transform 180ms`. `transition-all` causes unexpected side effects.
27. **Do not make the golden dot larger than `w-2 h-2` (8px).** It is a ceremony candle, not a spotlight.
28. **Do not use `z-index` values above 10 in the footer.** The footer has no overlapping concerns beyond atmospheric layers (z-1) and content (z-2).

---

## XV. COMPONENT ARCHITECTURE — REFACTORING DIRECTIVE

The current `Footer.tsx` is 314 lines. After implementing the visual overhaul, it will be longer. **Refactor into focused sub-components:**

```
src/components/footer/
├── Footer.tsx                    # Main wrapper: <footer>, atmospheric layers, arrival state
├── FooterBrand.tsx               # Group A: Parker's name, subtitle, mission, social icons
├── FooterNavigation.tsx          # Group B: Navigate column with key-depression links
├── FooterContact.tsx             # Group C: Reach Me column
├── FooterCTA.tsx                 # CTA row: "Ready to begin?" + button + glow pool
├── FooterLegal.tsx               # Legal row: copyright + policy links
├── FooterCovenantBookend.tsx     # Covenant: golden thread echo + dot + tagline
├── FooterAtmosphere.tsx          # All atmospheric layers (grain, vignette, fogs, edge warmth)
├── FooterGoldenThread.tsx        # Reusable golden thread component with breathing
└── index.ts                     # Barrel export
```

**Each sub-component receives `isArrival` and `isVisible` as props** where needed.

**The main `Footer.tsx` becomes a ~60-80 line orchestrator** that:
1. Manages `isArrival` state via IntersectionObserver
2. Gets `isVisible` from `useScrollReveal`
3. Renders atmospheric layers
4. Renders grid with sub-components
5. Renders separators, CTA, legal, and bookend

---

## XVI. QA PLAN

### Visual QA
- Desktop (1440px, 1200px): 4-column grid, golden thread centering, glow pool positioning, atmospheric depth
- Tablet (768px, 1024px): Column stacking, spacing proportional scaling
- Mobile (375px, 390px, 428px): Single column, touch targets, sticky bar spacer, no horizontal overflow
- CrossOver → Footer transition: 90px bridge creates seamless blend

### Arrival Easter Egg QA
- Scroll to bottom on desktop: header logo centers, nav fades, underline draws, threads synchronize breathing
- Scroll away: header returns to functional (nav reappears, logo left-aligns, underline retracts)
- Atmospheric warmth lingers during departure (700ms transitions)
- Three tempos running simultaneously: check visual at multiple moments in the 24s cycle
- Verify vertical axis alignment: header logo ↔ footer tagline on same center axis

### Accessibility QA
- Tab through entire footer: logical order, visible focus rings
- Screen reader: `<footer>` landmark announced, headings create structure
- Contrast: verify `foreground/35` and `foreground/45` against rich-black
- Reduced motion: all animations collapse to static states

### Performance QA
- Lighthouse: no regressions
- CLS: no layout shift on footer enter or staggered reveals
- DOM depth: ≤4 levels within footer
- Network: zero additional HTTP requests from footer
- Animation: all GPU-composited (opacity + transform only)

---

## XVII. FINAL DIRECTIVE

Use ALL of this guidance to implement the footer visual overhaul and the arrival integration system. The footer and header must become a unified ceremonial composition — the recessional of the website.

**Implementation order:**
1. **Footer component refactoring** — break Footer.tsx into sub-components (Section XV)
2. **CSS additions** — add new keyframes and classes to index.css (Section IX)
3. **Visual overhaul** — apply all changes from Section IV (atmospheric, spacing, typography, threads, bookend)
4. **Key depression hover** — add `footer-nav-link` class to navigation links
5. **Golden dot breathing** — add `golden-dot-breathe` animation to bookend dot
6. **Arrival state enhancements** — footer atmospheric response to `isArrival`
7. **Verify** — run through QA plan (Section XVI)

DO NOT CHANGE ANYTHING ELSE ON THE WEBSITE.

The footer is not an afterthought. It is the last note of the ceremony. It must sustain. It must resonate. It must leave the visitor with the feeling of the covenant still held — even after they close the tab.

Build it like a covenant. Ship it like a recessional.

'Til Death ; Unto Life.
