
# Play Room — Full Redesign

A near-fullscreen "concert hall" listening room rendered on warm paper, with ink-black ink, oversized editorial typography, and a single dramatic artwork as the stage. The Hear me play pill stays as the entry point but is re-tuned to match.

## Direction (locked from your picks)

- **Palette — Paper & Ink** (light room, dark ink — deliberate inversion of the current black panel)
  - Stage: `#f5f3ee` (warm paper)
  - Recessed surface: `#e8e4dd`
  - Ink: `#2d2d2d`
  - Deep ink (titles, accents): `#0d0d0d`
  - Single accent for "now playing" + progress: deep ink at full strength; no gold, no color.
- **Type — Space Grotesk (display) + DM Sans (body)**
  - Track title: Space Grotesk, 56–96px clamp, tight tracking
  - Setlist row: DM Sans 15px
  - Eyebrow / metadata: DM Sans 11–12px, uppercase, 0.18em tracking
  - Time code: DM Sans tabular-nums 13px
- **Posture — Concert Hall**
  - 96vw × 94vh sheet, centered, 24px outer margin, no shadow — only a 1px hairline border (`hsl(0 0% 0% / 0.08)`) defining the sheet.
  - Centered square artwork as the visual stage. Ambient blurred halo behind it.
  - Setlist as a bottom drawer (always visible on desktop as a horizontal rail; pull-up sheet on mobile).

## Layout — desktop (≥1024px)

```text
┌────────────────────────────────────────────────────────────────┐
│  LISTENING ROOM · 12 PIECES                            ╳ Close │  ← eyebrow + close (12px DM Sans)
│                                                                │
│                                                                │
│                    ┌──────────────────┐                        │
│                    │                  │                        │
│                    │     ARTWORK      │     ← 420×420, soft    │
│                    │   (vinyl/photo)  │       ambient halo     │
│                    │                  │                        │
│                    └──────────────────┘                        │
│                                                                │
│              ── piece 03 of 12 ──                              │  ← eyebrow
│                                                                │
│           Clair de Lune                                        │  ← Space Grotesk 80px
│           Debussy · Recital, 2024                              │  ← DM Sans 16px, 0.6 opacity
│                                                                │
│           ◁◁    ▶ / ❚❚    ▷▷         1:24 ─────────── 4:12     │  ← transport + scrubber
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  01 Prelude       02 Nocturne     ● 03 Clair de Lune   04 …    │  ← horizontal setlist rail
└────────────────────────────────────────────────────────────────┘
```

- Hairline rule above the setlist rail (1px, `#0d0d0d / 0.10`).
- Active setlist item: ink dot + bold weight; others: 0.55 opacity, hover → 1.0.
- Scrubber: 2px track, ink fill, draggable thumb appears on hover/focus only.
- Transport buttons: 44×44 hit target, 20px icons, ink stroke 1.6, no fills.

## Layout — mobile (<768px)

```text
┌──────────────────────────────┐
│ LISTENING ROOM        ╳      │
│                              │
│      ┌────────────┐          │
│      │  ARTWORK   │          │   ← 78vw square
│      └────────────┘          │
│                              │
│   ── 03 of 12 ──             │
│   Clair de Lune              │   ← clamp 36–44px
│   Debussy · 2024             │
│                              │
│   1:24 ─────────── 4:12      │
│   ◁◁     ▶ / ❚❚     ▷▷       │
│                              │
│  ─────── Setlist ▲ ───────   │   ← pull-up handle
└──────────────────────────────┘
```

- Sheet fills 100vw × 96vh, 12px top inset.
- Setlist becomes a vertical drawer that slides up from the bottom edge (36×4 handle).
- No hover states; tap targets ≥44px.

## Motion

- **Open**: 360ms cubic-bezier(.22,.61,.36,1). Backdrop fade 200ms; sheet scales 0.98 → 1 and fades.
- **Close**: 220ms ease-out.
- **Track switch**: artwork cross-fades 320ms; title slides 12px up + fades 280ms.
- **Playing state**: artwork breathes (scale 1.00 → 1.012, 3.2s ease-in-out alternate).
- **Reduced motion**: all motion → opacity only, ≤160ms.

## Accessibility

- `role="dialog"`, `aria-modal`, `aria-labelledby` on track title.
- Focus trap inside sheet; restore focus to pill on close.
- Keyboard: `Esc` close, `Space` play/pause, `←/→` seek ±5s, `J/K` prev/next track.
- Scrubber: `role="slider"` with `aria-valuenow/min/max/text` (mm:ss).
- Focus-visible ring: 2px ink, 2px offset, on every interactive element.

## Hear me play pill — re-tuned (entry point)

Stays in place (bottom-left desktop, bottom-center mobile) but re-skinned to match Paper & Ink so it doesn't read as a separate visual system:

- Background: `#0d0d0d` (kept dark as a small "stage door" on the page) with 1px hairline `hsl(0 0% 100% / 0.10)`.
- Label switches to Space Grotesk 14px (not italic serif).
- Progress underline on pill uses ink-white at 0.85 instead of gold.
- Pause-button accent becomes ink-white outline, not yellow.

This keeps the pill recognizable while the room itself becomes the bright editorial moment.

## Files touched

- `src/components/PianoPanel.tsx` — full rewrite of the panel shell, layout, transport, setlist, motion, a11y.
- `src/components/AmbientAudioPill.tsx` — re-skin only (Space Grotesk label, ink progress, neutral pause button); no logic changes.
- `src/index.css` — add Play Room CSS vars (`--pr-paper`, `--pr-paper-2`, `--pr-ink`, `--pr-ink-deep`) and `@keyframes pr-breathe`, `pr-open`, `pr-close`.
- `tailwind.config.ts` — register `space-grotesk` and `dm-sans` font families scoped via a `font-pr-display` / `font-pr-body` utility (so the rest of the site keeps Cormorant + Inter — memory rule respected).
- `index.html` — add Google Fonts `<link>` for Space Grotesk (500/600/700) and DM Sans (400/500).

## Out of scope (not changing)

- Audio engine, track list, file sources, autoplay/advance logic.
- Site-wide fonts or theme. Space Grotesk / DM Sans are scoped to the Play Room only.
- The Hear me play CTA copy and trigger behavior.
- Any other page or component.

## Memory note

The site's core rule is "Dark theme ONLY for Hero, audio, and specific CTAs." You explicitly asked for a light Paper & Ink Play Room, so this redesign intentionally overrides that rule for this surface. If you'd rather keep the room dark, say the word and I'll re-cast Paper & Ink into a dark equivalent before building.
