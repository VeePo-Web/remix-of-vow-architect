

# VeePo Footer Attribution — Bold Brand Presence Upgrade

## Current Problem
The micro-billboard is too small and too subtle. At `text-[11px]` and `text-[13px]` with 50% and 30% opacity, it barely registers. The user explicitly says "it needs to pop and show boldness." This is an advertisement for your company — it should command attention while maintaining design integrity.

## VeePo Brand Identity (from site audit)
- **Aesthetic:** Pure black, bold white sans-serif type, minimal — confident and modern
- **Brand colors:** Orange (`hsl(28, 87%, 58%)`) and Teal (`hsl(166, 72%, 47%)`) as accents
- **Tagline:** "Where Vision Meets Precision"
- **Motto:** "Let VeePo Power Your Vision"
- **Typography:** Large, stacked sans-serif — not serif. VeePo uses a geometric/grotesk feel, not Cormorant

## The Upgrade — Bolder, Larger, Brand-Authentic

Scale up the card significantly. Switch from Cormorant (this site's font) to sans-serif (VeePo's font) for the wordmark to create visual distinction — making it clear this is a different brand's presence.

### Specifications

**Container:**
- `max-w-md` (up from `max-w-sm`) — wider presence
- `border border-white/[0.08]` → hover `border-white/[0.18]`
- `bg-white/[0.03]` → hover `bg-white/[0.06]` — more glass presence
- `px-8 py-5` — more generous padding
- Same piano-key lift on hover

**Layout — Two rows, left-aligned content with right arrow:**

```text
┌──────────────────────────────────────────────────────────┐
│                                                            │
│   Locally powered by                                       │
│   VEEPO                                            →       │
│   Where vision meets precision                             │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

**Typography changes:**
- "Locally powered by": `text-[11px]` → `text-[12px]`, opacity from 50% → 60%
- "VEEPO": `text-[13px]` → `text-[22px] font-sans font-semibold tracking-[0.25em] uppercase` — THIS is the big change. Large, bold, sans-serif wordmark that pops. Uses Inter (VeePo's aesthetic) not Cormorant
- On hover: "VEEPO" shifts to a teal color (`hsl(166, 72%, 47%)`) — VeePo's brand teal, NOT this site's vow-yellow. This is VeePo's moment, not the pianist's
- "Where vision meets precision": `text-[10px]` → `text-[11px]`, opacity from 30% → 45%
- Arrow: larger, `text-lg`

**No logo image** — the logos from the VeePo project are 500KB-1.4MB, far too heavy for a footer badge. The typographic wordmark "VEEPO" at 22px bold tracking is the logo treatment. This matches how VeePo presents on their own site (bold text, no logo mark in hero).

## Implementation — 1 File

### `src/components/Footer.tsx` (lines 329-360)
Replace the current micro-banner `<a>` tag content with the scaled-up version. Key changes:
- Container: `max-w-sm` → `max-w-md`, `px-6 py-4` → `px-8 py-5`
- "VEEPO" wordmark: `font-display text-[13px]` → `font-sans text-[22px] font-semibold tracking-[0.25em] block mt-1`
- Hover color: `group-hover/veepo:text-primary` → inline style targeting `hsl(166, 72%, 47%)` (VeePo teal)
- Tagline: slightly larger and brighter
- Arrow: `text-lg`

