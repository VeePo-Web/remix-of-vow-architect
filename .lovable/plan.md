

# VeePo Footer Attribution — Premium Brand Ad Upgrade

## Current State
A single line of `text-xs text-muted-foreground/40` text that whispers "This website locally powered by veepo.ca" — nearly invisible, no brand personality, no visual impact.

## VeePo Brand Identity (from site audit)
- **Palette:** Pure black background, white/silver type, minimal color
- **Tagline:** "Where Vision Meets Precision"
- **Motto:** "Let VeePo Power Your Vision"
- **Logo:** Available at `https://veepo.ca/assets/veepo-logo-main-BZkSzYtu.png` (white wordmark on dark)
- **Aesthetic:** Bold, confident, dark-mode-native — complements this site's charcoal foundation

## Design Direction (coloursandshapes.com inspiration)
Colours+shapes uses a distinct visual identity marker in their brand touchpoints — geometric primitives that feel ownable and memorable. For VeePo, the equivalent is the **bold wordmark** itself plus a clean, confident micro-banner that contrasts just enough to register as a distinct brand presence without breaking the sacred aesthetic.

## The Upgrade — A Micro-Billboard

Replace the plain text with a contained, hoverable micro-banner:

```text
┌─────────────────────────────────────────────────┐
│                                                   │
│    Locally powered by  VEEPO                     │
│    Where vision meets precision    →              │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Specifications

**Container:**
- `max-w-sm mx-auto` — compact, centered, doesn't stretch full-width
- `border border-white/[0.06]` — barely-there border that catches light
- `rounded-lg` (8px — matches the refined system)
- `bg-white/[0.02]` default → `bg-white/[0.04]` on hover — subtle glass lift
- `px-6 py-4` — generous internal padding
- `transition-all duration-[260ms]` with sacred easing
- On hover: `border-white/[0.12]` — the border brightens, the card "surfaces"

**Typography:**
- Line 1: `text-[11px] tracking-[0.22em] uppercase text-muted-foreground/50` — "Locally powered by"
- "VEEPO" on same line: `font-display font-medium text-[13px] tracking-[0.18em] text-foreground/90` — the wordmark pops in Cormorant, slightly larger, brighter
- Line 2: `text-[10px] tracking-[0.15em] text-muted-foreground/30 italic` — "Where vision meets precision" — the tagline whispers beneath
- Right side: A subtle `→` arrow that translates 4px right on hover (`transition-transform duration-180ms`)

**Hover State:**
- Container border brightens from 6% to 12% white
- Background lifts from 2% to 4% white
- "VEEPO" text shifts to `text-primary` (vow-yellow) — the VeePo brand moment
- Arrow slides 4px right
- Entire card lifts `-translate-y-px` (piano-key physics)

**No logo image** — the typographic wordmark is cleaner and avoids loading an external asset. "VEEPO" in Cormorant uppercase with generous tracking IS the logo treatment within this context.

## Implementation — 1 File

### `src/components/Footer.tsx` (lines 329-348)
Replace the current plain `<a>` with the micro-banner component described above. Same `href`, same `target="_blank"`, same `rel` attributes. The container is the `<a>` tag itself, styled as a block-level card.

