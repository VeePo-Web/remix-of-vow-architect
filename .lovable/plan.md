# Mobile Polish — Cinematic Hero Pages

Scope: `/`, `/teaching`, `/events`. Mobile only (≤640px). The scroll-scrubbed cinematic video ("3D") and its timing config are **not touched** — only the chrome around it: pre-scroll CTA, inline story CTAs, scroll-cue, overlay typography rhythm, and the persistent `MobileStickyBar`.

Reference feel (per your picks): **big confident type + generous whitespace**, **persistent action affordance**. Fly4Me-grade means: one obvious next step at any moment, type that breathes, motion that confirms touch.

---

## 1. Pre-scroll hero CTA (the first frame)

Currently: a single `Reserve My Date` glass pill floating mid-frame, with a tiny "Scroll" chevron at the bottom.

Mobile changes:
- **Eyebrow above the CTA** — one line, 11px, 0.32em tracking, 60% white: per-vertical context ("Southern Alberta · Weddings" / "Private Events" / "Piano Mentorship"). Gives the button somewhere to sit instead of floating.
- **Tagline under the eyebrow** — one short line, serif display, ~28px / 1.1, balanced wrap, no card background. Vertical-specific:
  - `/`        — "I carry your vows."
  - `/teaching`— "Begin where you are."
  - `/events`  — "Live piano, where you gather."
- **CTA pill** — full-width minus 32px gutters, 52px tall, 15px label, 0.10em tracking; press state scales to 0.97 with 120ms ease. Drops the floating glass look; uses a flat warm-white pill with a 1px gold hairline (matches editorial memory: no SaaS shadows).
- **Secondary text link** under the CTA — "Listen first ›" → `/listen` (weddings/events) or "See the path ›" → `/teaching/about`. 13px, 70% white, underline-on-press.
- **Scroll cue moves to the bottom safe-area** — "Scroll to begin" with chevron, opacity 0.5, breathes (existing animation kept). Adds 16px above `env(safe-area-inset-bottom)`.

Stack rhythm on mobile (top → bottom inside the safe frame): eyebrow → tagline → 32px gap → CTA → secondary link → flex spacer → scroll cue.

## 2. Inline story CTAs (`.cn-inline-cta`)

Three CTAs appear mid-story per vertical. Currently 14px Inter, 92% white pill with heavy drop shadow + faint gold rules.

Mobile changes (desktop unaffected via `@media (max-width: 640px)`):
- 48px height, 15px label, 0.08em tracking, 28px horizontal padding.
- Drop the double shadow and the gold rules — single 1px gold hairline ring (`0 0 0 1px hsl(36 60% 60% / 0.45)`), no blurred shadow. Reads as editorial, not as a chiclet.
- Press state: scale 0.97, ring brightens to 0.7 alpha. No hover lift on touch.
- `cn-inline-cta--large` (final anchor): full width minus 32px gutters, 56px tall, 16px label. Keeps the bottom gold aura on the **final** instance only.

## 3. Overlay typography rhythm

The cinematic text overlays (`.luxury-card`) currently render with the same desktop scale on mobile, which crowds the frame.

Mobile changes:
- Clamp display lines to `clamp(26px, 7.2vw, 38px)` with `line-height: 1.08`, `letter-spacing: -0.01em`.
- Body lines clamp to `clamp(14px, 3.6vw, 16px)`, `line-height: 1.5`, 80% white floor (respects memory's 60% min).
- `max-width: 90vw` stays, but add `padding-inline: 24px` so text never kisses the edge.
- Ornamental divider (`.luxury-divider`) — shrink rule width to 56px and diamond to 6px on mobile so it doesn't dominate.
- Position presets `left` / `right` collapse to `center` on mobile (the side-aligned variants look cramped at 375px). Existing `posClasses` overridden via a small `@media` block — no JSX changes.

## 4. Persistent action affordance (`MobileStickyBar`)

Currently: appears after 420px scroll, hides when footer bookend is in view, shows context text + 5★ + phone + CTA pill.

Mobile changes:
- **Two-tier layout** at ≤375px so the context line never truncates:
  - Top tier (when visible): `★ 5.0 · Cochrane / Calgary` (existing).
  - Bottom tier: phone (round) + CTA pill (flex-1). CTA pill becomes full-width minus the phone button.
- **Earlier reveal** — show at 220px scroll instead of 420px. The cinematic frame is the hero; once it's even partially behind, give the user an action.
- **Soften the chrome** — drop the boxed shadow + inset highlight to a single 1px top hairline. Keeps the blur. (Aligns with memory: no SaaS shadows.)
- **CTA pill** — match the new inline CTA scale: 40px tall, 13px label, 0.08em tracking, flat dark fill, single gold hairline ring on press.
- **Press feedback** — `active:scale-[0.97]` + `transition 120ms` on both the phone button and the CTA. The existing shimmer sweep stays.
- The golden scroll-progress thread on top stays — it's the strongest Fly4Me-grade detail already in the file.

## 5. Vertical-aware copy already wired

`getPageConfig` in `MobileStickyBar` already routes the right CTA + contact href per vertical. No changes needed there — the new pre-scroll eyebrow/tagline will be passed as props to a small `<PreScrollIntro vertical="..." />` so the three pages stay declarative.

---

## Technical details

Files touched:
- `src/components/VideoAct.tsx` — replace the pre-scroll overlay block with `<PreScrollIntro vertical="weddings" />`. No changes to `useVideoScrub`, `TEXT_OVERLAYS`, or refs.
- `src/components/TeachingCinematicScroll.tsx` — same swap, `vertical="teaching"`.
- `src/components/EventsCinematicScroll.tsx` — same swap, `vertical="events"`.
- `src/components/MobileStickyBar.tsx` — earlier reveal threshold, two-tier layout at ≤375px, simplified chrome, press states.
- `src/components/PreScrollIntro.tsx` *(new)* — eyebrow + tagline + CTA + secondary link + scroll cue. Mobile-first; desktop renders the existing single-pill layout via `hidden md:flex` for the old block kept as fallback.
- `src/index.css` — new `@media (max-width: 640px)` blocks for `.cn-inline-cta`, `.cn-inline-cta--large`, `.luxury-card`, `.luxury-divider`, `.luxury-card .block` line-height. No changes outside the mobile breakpoint.

Explicitly **not** touched: `useVideoScrub`, all `videoActsConfig*.ts` files, `posClasses` JSX, the canvas/3D layer, desktop styles, footer reveal toggle, page-level `usePageTheme`.

QA path: preview at 375×812 and 414×896, scroll through each of the three pages, confirm (a) pre-scroll frame reads as editorial, (b) inline CTAs land on top of the video without competing with the imagery, (c) sticky bar appears earlier and never truncates, (d) desktop is byte-identical.
