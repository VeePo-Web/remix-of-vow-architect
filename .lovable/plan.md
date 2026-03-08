

# VeePo Footer Attribution — Add Brand Colors (Orange + Teal)

## What Changed
The user wants the VeePo attribution to incorporate VeePo's actual brand colors: **Orange** (`hsl(28, 87%, 58%)`) and **Green/Teal** (`hsl(166, 72%, 47%)`), making it bolder and more visually distinct as an advertisement.

## Design

The current card hovers VEEPO to teal only. The upgrade adds both brand colors as visual accents:

```text
┌──────────────────────────────────────────────────────────┐
│                                                            │
│  ◼ Locally powered by                                      │
│  VEEPO                                              →      │
│  Where vision meets precision                              │
│                                                            │
└──────────────────────────────────────────────────────────┘
    ↑ orange/teal gradient bottom border on hover
```

### Specific Changes (1 file: `src/components/Footer.tsx`, lines 329-365)

1. **Bottom border accent**: Add a 2px bottom border that transitions from transparent to a `linear-gradient(to right, hsl(28,87%,58%), hsl(166,72%,47%))` on hover — the VeePo orange-to-teal signature. Use a pseudo-element via an inner `<div>` with `absolute bottom-0` since Tailwind can't do gradient borders natively.

2. **VEEPO wordmark hover**: Keep the teal hover on the text (`hsl(166,72%,47%)`), but add a subtle orange glow behind it via `text-shadow: 0 0 20px hsl(28,87%,58%,0.15)` on hover — creates a warm halo that references both brand colors.

3. **Small brand dot**: Before "Locally powered by", add a tiny 6px circle with a `background: linear-gradient(135deg, hsl(28,87%,58%), hsl(166,72%,47%))` — a permanent VeePo brand mark that's always visible, acting as a geometric identity marker (inspired by coloursandshapes.com's ownable primitives).

4. **Arrow**: On hover, shift arrow color to the orange (`hsl(28,87%,58%)`) instead of just brightening — ties the interaction to the brand.

5. **Container border hover**: Shift from `border-white/[0.18]` to a very subtle warm tint — `border-[hsl(28,87%,58%,0.15)]` — so the entire card gains a warm VeePo aura on hover.

