# MOBILE & TABLET AWARD-STANDARD AUDIT + EXECUTION PROMPT
## Parker Gawryletz — Cinematic Scroll Site
### Scope: MOBILE (≤767px) and TABLET (768–1023px) ONLY. Desktop (≥1024px) is frozen.

> **How to use this document:** This is the operating prompt for a page-by-page, section-by-section
> upgrade of the phone and tablet experience to the standard of Fantasy.co / igloo.inc / Apple —
> without altering desktop in any way. Work top-to-bottom. Treat **every cinematic ACT as a section**.
> Do not batch-rewrite. Audit → plan → gate the fix → verify desktop is untouched → measure → advance.

---

## 0. THE MISSION & THE IRON LAW

**Mission:** Make each element, each 3D scrubbed-video scene, and all UX / NAV / UI on **mobile and tablet**
feel inevitable and award-grade — re-choreographed for the thumb, portrait viewports, intermittent data,
and constrained video-decode budgets — while never dropping a frame of the story and never slowing the site.

**THE IRON LAW — DESKTOP IS FROZEN.**
Desktop (≥1024px) must render byte-for-byte, pixel-for-pixel, millisecond-for-millisecond identical before
and after this work. Every change you make MUST be expressed behind one of these gates:

- `@media (max-width: 767px)` — phone
- `@media (min-width: 768px) and (max-width: 1023px)` — tablet
- `@media (max-width: 1023px)` — phone + tablet
- `useIsMobile()` (the repo hook, breakpoint 768) or `window.matchMedia('(max-width: 1023px)')`
- a capability check: `(pointer: coarse)`, `prefers-reduced-motion`, `navigator.connection.saveData`, `effectiveType`

**Rules of engagement:**
1. Never edit a base/shared CSS rule or a shared inline `style={{}}` that desktop also reads. To beat a desktop
   inline style on mobile, add a gated class with `!important` **inside** a `≤1023px` media query
   (the repo already does this — see `.mobile-stack`, `.pricing-trust-grid` in `src/index.css`).
2. Never fork desktop JSX output. Branch only the mobile-specific values/props behind `useIsMobile()`.
3. Before claiming any section done, prove desktop is untouched: screenshot/diff at **1280, 1440, 1920**.
4. Stay on the existing stack: Vite + React 18 + Tailwind. No new dependencies without justifying the need
   and naming 2 alternatives first. No framework migration.
5. Conventional commits: `fix(mobile):`, `feat(mobile):`, `perf(mobile):`. One section per commit where possible.

**The one-line gate test for every change:** *"Could this alter anything at 1440px?"*
If you cannot prove "no," the change is wrong — re-express it behind a gate.

---

## 1. THE PERFORMANCE GATE (never compromise speed)

Every change is measured on throttled mobile (Slow 4G, 4× CPU). No change ships that regresses these:

| Metric | Budget |
|---|---|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| FCP | < 1.8s |
| TTFB | < 800ms |
| Lighthouse mobile — Performance | ≥ 90 |
| Lighthouse mobile — Accessibility | ≥ 95 |

**Non-negotiables baked into every fix:**
- The cinematic **poster image (WebP/AVIF) is the mobile LCP element — never the video.** Preload it
  `fetchpriority="high"`; the video stays `preload="none"` until its IntersectionObserver arms it.
- Animate only `transform` and `opacity`. Drop `will-change` when an element is not actively animating.
- Every `<img>`: explicit `width`/`height`, `srcset`/`sizes` so a phone never downloads a desktop-sized image,
  AVIF/WebP, `loading="lazy"` below the fold.
- Measure before and after. Never claim a gain without a fresh number. Never optimize blind.

---

## 2. REFERENCE SITES — 3D / SCROLL MOTION THAT MEETS THE BAR

Study these **on a real phone**, not just desktop. The transferable lesson is the same across all of them:
*the mobile build is a separate, deliberate engineering effort with its own asset pipeline — never the
desktop experience scaled down.*

- **Apple — AirPods Pro / AirPods Max / Mac Pro product pages** — THE reference for scroll-scrubbed
  cinematic motion on mobile. Apple scrubs a **canvas image sequence** with per-device resolution tiers,
  never a heavy `<video>`. This is the exact pattern these cinematic pages should aspire to on mobile.
- **igloo.inc** — Awwwards SOTY; heavy 3D that degrades gracefully to touch.
- **Active Theory** (activetheory.net) — WebGL narrative with disciplined mobile fallbacks.
- **Lusion** (lusion.co) — high-end 3D/WebGL with explicit mobile performance tiers.
- **Locomotive** (locomotive.ca) — typographic scroll choreography; exemplary portrait re-pacing.
- **Phantom** (phantom.land) & **Resn** (resn.co.nz) — motion-as-identity, touch-considered.
- **Unseen Studio**, **Garden Eight**, **Robin Noguier**, **Aristide Benoist** — editorial scroll reveals
  that re-time cleanly for portrait.

---

## 3. THE SCROLL-SCRUB MOBILE SURVIVAL PROTOCOL (applies to /weddings, /events, /teaching)

These three pages drive one continuous video via `video.currentTime` on Lenis scroll across a **2800vh**
zone with timed text overlays (`useVideoScrub.ts`, `VideoAct.tsx` + the per-vertical `CinematicScroll`
components and `*VideoActsConfig.ts`). This is the highest-risk pattern on mobile. Harden it **before**
the per-act passes, all gated, desktop untouched:

1. **Coalesce seeks per frame.** On mobile, ensure at most one `currentTime` write per `requestAnimationFrame`,
   not one per scroll event. Loosen the skip threshold on mobile to `~0.05` (desktop keeps `0.01`) to stop
   seek-spam that iOS Safari throttles into stutter/blank frames.
2. **Serve a lighter mobile encode.** Ship a separate, smaller portrait/square master
   (lower resolution + bitrate, still **all I-frames** for seekability) via `useIsMobile()` source swap or
   `<source media="(max-width: 1023px)">`. **Never ship the desktop master to a phone.**
3. **Decode-readiness gate.** Hold the poster until `readyState >= 2` on mobile (not `>= 1`) so the first
   scrubbed frame is real, not black. Ensure the per-act poster ladder covers the full scroll on the no-video path.
4. **Escape hatches.** If `prefers-reduced-motion`, `saveData`, or `effectiveType` is `2g/3g`: present the
   act posters as a clean stacked story AND **collapse the 2800vh zone** (see §3.6) so these users never
   drag through near-empty void.
5. **Release the decoder.** On IntersectionObserver exit, pause and release the video so a full-screen decode
   isn't held behind other pages on a memory-constrained device.
6. **Remap scroll length for the thumb.** Gate `SCROLL_HEIGHT` shorter on mobile (e.g. a reduced multiple of
   `vh`) and re-derive each act's `enterAt`/`exitAt` **proportionally from the same act boundaries** — never a
   parallel set of magic numbers. Add a persistent thin progress rail / act dots so the story always has a
   visible shape and length.
7. **Viewport stability.** Replace `100vh` on the sticky stage (`.video-act__sticky`) with `100dvh`
   (fallback `vh` first). Confirm the iOS URL-bar collapse causes **no** CLS / no "jump" of the pinned video.
8. **Touch cost.** Gate `PetalCursorTrail` and any magnetic/custom-cursor effect OFF on `(pointer: coarse)`.
   Confirm the `inset:-4%; width/height:108%; will-change:transform` full-screen video composites cleanly on
   a mid-range phone; drop `will-change` when not scrubbing.

**If the budget still can't be met on a real mid-range device:** propose the **canvas image-sequence**
mobile path (the Apple pattern) for desktop-frozen sign-off.

---

## 4. PAGE-BY-PAGE, SECTION-BY-SECTION

For **each** section/act below run the loop in §5. The cinematic pages list every act with its scene intent
(from `3D-VIDEO-CREATIVE-BRIEF.md`) so you tune the *mobile crop, timing, type, and interaction* of that exact scene.

### 4.1 — `/weddings` (CinematicScroll · 8 acts · `videoActsConfig.ts` · `weddings-full.mp4`)

Sacred, ceremonial voice. The viewer IS the bride walking the aisle; the video is a single forward drift from
black void → veil/silhouette in white-gold light.

| Act | Section | Scene (mobile crop to verify) | Mobile/Tablet directives |
|---|---|---|---|
| I | Home / The Hook | Black void → single candle flame | Name "PARKER GAWRYLETZ" must not crowd the notch; scroll cue legible over near-black; flame visible in portrait crop |
| II | My Process | Candlelight, dust motes, charcoal | Re-time the multi-line copy so each beat reads before the next; ≤3 lines/overlay portrait |
| III | Your Music | Dawn through sheer fabric; first veil | "Every vow… becomes sacred" climax must land centered, legible over rising-bright crop — boost scrim if needed |
| IV | About | Threshold to outdoors; trust badges; first CTA | Trust line `500+ · SOCAN · $4M` must wrap cleanly (not 1 cramped line); CTA in thumb zone |
| V | The Promise | Shadow passes → light returns (fear kill) | Verify the brightness dip doesn't wash out the quoted-fear text on a bright phone screen |
| VI | Services / Pricing | Full outdoor ceremony light | 3 tiers must stack single-column; "Most Chosen" pill visible; inclusions list scannable; single primary CTA |
| VII | Testimonials | Peak brightness + petals | Two quotes must not overlap; attribution legible over brightest crop |
| VIII | Contact / "I Do." | Veil + silhouette + transcendence | Final CTA + "Response within 24 hours" pinned to bottom safe-area; petals gated off touch |

### 4.2 — `/events` (EventsCinematicScroll · 8 acts · `eventsVideoActsConfig.ts` · `events-full.mp4`)

Warm, adaptable, inviting. Low-stakes CTA ("Message Me" — like texting a friend).

| Act | Section | Mobile/Tablet directives |
|---|---|---|
| I | Welcome (Hook) | "You are not looking for a musician. You are looking for a feeling." — center, ≤3 lines portrait |
| II | The Room (Atmosphere) | Verify ambiance copy reads over the (differently-cropped) mobile video |
| III | I Play For (Occasions) | Occasion list must stack/scroll cleanly; no horizontal overflow at 320px |
| IV | How It Works (Process) | Numbered steps single-column; each step's beat re-timed for thumb travel |
| V | Your Questions (Threshold/Fear) | Objection copy legible; one idea at a time |
| VI | What Happens (Proof) | Proof/testimonial overlays sequential; attribution clear |
| VII | Your Event (Offer) | Offer + CTA in thumb zone; single primary action |
| VIII | Message Me (Close) | Low-stakes CTA pinned to safe-area bottom |

### 4.3 — `/teaching` (TeachingCinematicScroll · 8 acts · `teachingVideoActsConfig.ts` · `teaching-full.mp4`)

Dissolves the shame of starting late. Warm mentor voice.

| Act | Section | Mobile/Tablet directives |
|---|---|---|
| I | Welcome (Hook) | "I have always wanted to play" beat — center, legible over warm-light-from-void crop |
| II | Your Story (Origin) | Personal narrative copy re-timed; ≤3 lines/overlay |
| III | How I Teach (Pillars) | Pillars must stack single-column; verify no 3-col grid survives at ≤767 |
| IV | The Process (Method) | Step sequence single-column, sequential reveal |
| V | The Truth (Fear Kill) | Shame-dissolving copy legible; one beat at a time |
| VI | Proof (Stories) | Student stories sequential; attribution legible |
| VII | Your Investment (Offer) | Pricing/offer stacks; single primary CTA in thumb zone |
| VIII | Begin (Close) | CTA pinned to safe-area bottom |

### 4.4 — `/` Gateway (`Gateway.tsx` — single-screen, no scroll)

3-card bento (Weddings / Teaching / Events), `MusicNoteAmbient`, mouse-parallax on card images, breathing
semicolon footer. **Mobile/tablet directives:**
- The page is `h-screen overflow-hidden` → use `100dvh` so the cards + wordmark + footer never clip behind the
  iOS URL bar at 320–414px. Verify the 3 stacked cards + header + footer all fit without scroll on the smallest phone.
- The card image `onMouseMove` parallax is desktop-only by nature — confirm it's inert on touch and costs nothing
  (no phantom events). Replace the hover-reveal arrow affordance with an always-visible "Step Inside →" on touch.
- `MusicNoteAmbient` cursor-reactivity must be gated off `(pointer: coarse)`; keep only the ambient fall if it's cheap.
- Cards: 48px+ tap targets, clear press state (`:active` scale), full-width stack with adequate gap; tablet portrait
  may run 1-col generous or a 2+1; tablet landscape can approach the desktop row.

### 4.5 — `/pricing` (`Pricing.tsx` — 8 sections via the `sections` array)

`The Offering → What You Get → Choose Your Path → Enhancements → Why Piano → Kind Words → Questions → Reserve My Date`.
Uses `PianoKeyNav` (side-dot nav), `MobileStickyBar`, `RevealOnScroll`, `Footer`. **Directives:**
- Side-dot `PianoKeyNav` is hidden on mobile (top bar + sticky CTA carry nav) — verify, and ensure the tablet
  treatment is deliberate (not a cramped desktop dot rail).
- 3 pricing tiers → single-column stack at ≤767; "Most Chosen" tier visually distinguished; CTA per tier in reach.
- Inclusion grid + trust-stat grids collapse to 1-col / 2×N (repo has `.pricing-trust-grid` override — verify it holds).
- `MobileStickyBar` "Reserve" CTA sits in the thumb zone, respects `env(safe-area-inset-bottom)`, and never overlaps
  the Footer or the audio pill.
- FAQ accordion: 48px touch rows, clear expand/collapse state, no layout shift on open.

### 4.6 — Remaining standard pages

For each, **read the `sections` array at the top of the page file** (same pattern as Pricing) — that array is the
canonical section map to walk. Apply the same per-section loop.

- `/proof` — gallery/testimonials. Verify image `srcset` (no desktop-sized images to phones), lazy-load, grid → 1-col,
  any lightbox is swipeable + has a 48px close target in reach.
- `/about` — narrative + scroll reveals. Re-pace reveals for portrait; `AboutScrollProgress` legible on mobile.
- `/faq` — accordion + `FAQChips`. Touch rows 48px, chips wrap (no overflow), schema intact.
- `/contact`, `/events/contact`, `/teaching/contact` — **forms:** correct `inputmode`/`type` (numeric keypad for phone,
  email keyboard for email), 16px+ field font (prevent iOS zoom-on-focus), full-width fields, visible 5-state inputs,
  submit/success states designed. CTA + SLA timeline reachable.
- Vertical sub-pages `/events/about`, `/events/pricing`, `/events/faq`, `/teaching/about`, `/teaching/pricing`,
  `/teaching/faq` — walk their `sections` arrays; same rules as their primary-vertical equivalents.
- Legal (`/privacy-policy`, `/terms`, `/cookie-policy`, `/accessibility`, `/legal`) and `/listen` — long-form
  readability: line length, type scale, tap targets on the `PolicyLayout`/jump-nav; `/listen` audio controls 48px,
  no hover-only transport.

---

## 5. THE PER-SECTION LOOP (run for every section/act above)

**STEP 1 — READ.** Open the component + its config + its CSS. State the section's job (HERO / PROOF / OFFER / CLOSE…)
and its desktop intent (the reference you must preserve).

**STEP 2 — AUDIT.** Score 1–10 on each axis; list defects with `file:line`:
- Desktop-freeze safety (is every fix gateable? if not, redesign it)
- Crop & legibility over the *mobile* video/image crop (scrim strong enough?)
- Beat timing (cinematic): re-timed to the remapped mobile scroll? sequential, full read?
- Layout & rhythm: single-column where needed; padding −40–60%; **no horizontal scroll at 320px**
- Viewport stability: `100dvh`/`svh`, `env(safe-area-inset-*)`, no URL-bar CLS
- Touch: 5 states (default/press/active/focus-visible/disabled), 48px targets, no hover-only affordance,
  cursor/trail off on coarse
- Tablet (768–1023): its OWN medium — not phone-stretched, not desktop-shrunk
- Performance: poster is LCP not video; lazy/`srcset` imgs; transform/opacity only; decoder released off-screen

Any axis < 7 must be fixed before advancing.

**STEP 3 — PLAN (present, then proceed):**
```
SECTION/ACT: [name] — PAGE: [route]
DEFECTS: [ranked, file:line]
FIX (mobile/tablet ONLY): [change → gated by ≤767 | 768–1023 | useIsMobile | pointer:coarse]
DESKTOP-FREEZE PROOF: [why ≥1024px is untouched]
PERF IMPACT: [expected LCP/INP/CLS effect — must be ≤ baseline]
FILES: [exact paths]
```

**STEP 4 — EXECUTE.** CSS into the correct gated `@media` block. JSX behind `useIsMobile()`/capability check.
Cinematic acts re-timed via existing config boundaries. Components < 250 lines. Conventional commit.

**STEP 5 — VERIFY & ADVANCE.**
- Render-check at **320 / 375 / 390 / 414 / 768 portrait / 1024 landscape**: no h-scroll, no overlap, no clipped safe area.
- **Desktop-freeze check:** confirm **1280 / 1440 / 1920** unchanged (diff/screenshot).
- Re-run throttled mobile Lighthouse if asset/motion changed; confirm CWV within budget.
- Report evidence, then advance.

---

## 6. GLOBAL NAV / CHROME PASS (after per-section work)

- One thumb-zone primary CTA per page; mobile menu open/close ≥60fps; safe-area on all edge-anchored UI.
- `AmbientAudioPill` never collides with the sticky CTA or scroll cue (repo already tucks it bottom-right at ≤640 —
  verify across all pages and tablet).
- `CinematicNav` / `MobileStickyBar` / `MobileTrustBar` / `PianoKeyNav`: confirm exactly one nav system is active per
  breakpoint, with a clear back/exit path out of each cinematic page.
- Tablet sweep: walk every page at 768–1023 portrait AND landscape; fix the band explicitly.
- Reduced-motion / data-saver: a coherent, complete fallback story site-wide (no half-disabled states, no empty scroll).

---

## 7. DEFINITION OF DONE

- [ ] Every section/act of every route audited and brought to ≥7 on all axes
- [ ] All three cinematic scrubs hardened for mobile (lighter encode, rAF-coalesced seeks, decode gate,
      escape hatches, scroll remap, 100dvh, trails off touch)
- [ ] No horizontal scroll at 320px on any page; safe areas respected everywhere
- [ ] All five interaction states present, 48px targets, no hover-only affordances on touch
- [ ] Tablet (768–1023) treated as its own medium on every page
- [ ] Throttled mobile Lighthouse: Perf ≥90, A11y ≥95; LCP<2.5s, INP<200ms, CLS<0.1 — before/after table delivered
- [ ] **Desktop verified unchanged at 1280/1440/1920 — the Iron Law held**

---

## 8. CONFIRMED DEFECTS (worked audit — fix these first)

These are real, verified issues in the current codebase, ranked by severity, each with location, the
mobile-only fix, and the gate that keeps desktop frozen. Treat this as the pre-loaded backlog for §4–§5.

### CRITICAL — breaks the experience on real phones

**D1 — Scroll-scrub not frame-throttled → iOS stutter/blank frames.**
`useVideoScrub.ts:116–131` calls `tick()` on every Lenis/scroll event, and `tick()` writes
`video.currentTime` each time (`:84–88`). Mobile fires many events per frame; iOS Safari throttles rapid
seeks into stutter/black. **Fix (gate: `useIsMobile()`):** coalesce to one `currentTime` write per `rAF`;
loosen skip threshold `0.01 → ~0.05` on mobile. Shared by all 3 cinematic pages — one fix covers all.

**D2 — Desktop video master (~80MB) shipped to phones.**
`videoActsConfig.ts:35` (+ events/teaching configs) serve one `*-full.mp4` to every device. **Fix
(gate: source swap / `<source media="(max-width:1023px)">`):** lighter all-I-frame mobile encode; desktop
source untouched.

**D3 — Reduced-motion users get 2800vh of empty scroll.**
`useVideoScrub.ts:118` early-returns (no scrub) under `prefers-reduced-motion`, but the container keeps
`height: SCROLL_HEIGHT` (2800vh, `videoActsConfig.ts:37`). **Fix:** collapse the zone + stacked poster story
when reduced-motion / `saveData`.

**D4 — Double bottom-CTA conflict on all 3 cinematic pages.**
`Index.tsx:23+33`, `Events.tsx:71+106`, `Teaching.tsx:71+106` mount BOTH the cinematic nav (its own mobile
bottom CTA anchor `.cn-cta-anchor`) AND `MobileStickyBar` (a 2nd fixed bottom bar) → they collide mid-scroll.
**Fix (gate: route check):** suppress `MobileStickyBar` on cinematic routes; let the cinematic nav own bottom.

### HIGH — touch / perf standard misses

**D5 — Touch targets 40px (below 44 HIG / 48 award).**
`MobileStickyBar.tsx:186` (phone btn) and `:202` (CTA) hard-set 40px. **Fix:** ≥48px via padding (visual size
can stay). Mobile component — no desktop impact.

**D6 — `MobileStickyBar` re-renders React every scroll frame.**
`MobileStickyBar.tsx:82–93` calls `setScrollProgress`/`setIsVisible` per scroll event — the one violation of
the codebase's zero-re-render-on-scroll discipline. INP/jank risk. **Fix:** rAF-coalesce; drive the progress
thread by direct DOM style mutation (the `useVideoScrub`/`CinematicNav` pattern).

**D7 — `100vh` sticky stage → iOS URL-bar jump / CLS.**
`index.css:6613` `.video-act__sticky { height: 100vh }`. **Fix (gate ≤1023px):** `100dvh` (with `vh` fallback).

### MEDIUM

**D8 — Trust signal vanishes <400px.** `MobileStickyBar.tsx:165` (`hidden min-[400px]:flex`) drops
"★ 5.0 · Cochrane/Calgary" at 320–399px. Add a compact fallback.
**D9 — Pointer-only effects not gated off touch.** `PetalCursorTrail`, `MusicNoteAmbient` cursor-reactivity,
Gateway `onMouseMove` card parallax → gate behind `(pointer: coarse)`.
**D10 — No mobile scroll-length remap / progress wayfinding.** 2800vh reads as "infinite" on a thumb; gate a
shorter mobile zone + visible progress rail (see §3.6).

**Recommended execution order:** D1 → D2 → D3 → D4 (highest impact, lowest risk, on `/weddings` first),
then D5–D7, then D8–D10, then the per-section §4 passes for remaining pages.
