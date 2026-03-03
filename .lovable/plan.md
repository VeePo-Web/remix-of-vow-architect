

# Split "The Preparation" into Two Distinct Sections

## The Problem

The current `TheWitness` component crams everything into a single two-column layout: the headline, intro paragraph, three declaration cards, the kit grid, and the closing CTA. On a cream background with low-contrast text, this creates a dense wall that is hard to scan. The user wants two clear sections that breathe.

## The Architecture

### Section A: "The Preparation" — Declaration Section (Life space, cream)
The emotional half. Contains:
- Left column: the existing cinematic image (`witness-setup-ai.jpg`)
- Right column: label, headline ("Not a performer — your ceremony pianist."), intro paragraph, three declaration cards with golden thread

This section ends with the declarations. No kit. No CTA. Just the promise of preparation.

### Section B: "The Kit" — Inventory Section (Life space, slightly warmer cream shift)
The practical half. Contains:
- Left column: text — "And this is what I carry with me." bridge, "Everything I bring." label, 3×2 kit grid, closing line ("Now — choose how long you want me there."), ghost CTA ("See my three paths")
- Right column: a new image (`witness-keys-ai.jpg`) — the piano keys image already in the project, used at full cinematic framing this time

This section flows directly into ThreePaths via the existing bottom fade.

### Visual Continuity
- Both sections share the same cream Life-space palette but Section B shifts slightly warmer (hsl 42 vs 40) to create a subtle temperature progression toward the dark ThreePaths below.
- A golden thread bridge (1px line) connects the two sections at the boundary — the sacred object marking a threshold within a threshold.
- Each section gets its own atmospheric layers (grain, vignette, fog, glow) per the section anatomy rules.
- Each section gets its own `useScrollReveal` trigger so reveals fire independently.

## Files Changed

### `src/components/TheWitness.tsx`
Major restructure — split into two `<section>` elements within the same component:

1. **Section A** (`#the-witness`): Lines 122-445 content, trimmed to end after declarations. Remove the kit grid, bridge text, closing quote, and CTA. Keep all atmospheric layers and parallax for this section.

2. **Section B** (`#the-witness-kit`): New section element with its own `useScrollReveal`. Contains the bridge text, kit grid, closing quote, and CTA. Adds a second image column (right side this time, using `witnessKeys` at full cinematic opacity ~0.28). Gets its own atmospheric layers (grain, vignette, warm fog). Uses a mirrored grid: `grid-cols-[3fr_2fr]` — text left, image right — creating visual variety from Section A's `[2fr_3fr]`.

3. Remove parallax complexity from both sections (the scroll-linked transforms add visual noise to an already dense layout). Keep the simple `useScrollReveal` fade-in reveals only. This simplification improves readability by removing competing motion.

### `src/index.css`
No new CSS needed — existing witness classes and atmospheric utilities cover both sections. The `.witness-kit-cell`, `.witness-declaration-card`, and `.witness-breathing-glow` classes are already defined and will work in either section.

## Key Design Decisions

- **No new images needed** — `witnessKeys` (already imported) gets promoted to a full cinematic frame in Section B instead of being a faint background texture.
- **Parallax removed** — the current 3-layer parallax system adds complexity without aiding readability. The two-section split provides enough visual interest through layout variation alone.
- **Section B piano-section-target** — only Section A keeps `piano-section-target` for PianoKeyNav since it is the anchor for "The Witness" nav item.
- **Responsive** — both sections stack to single column on mobile. Section B image appears below the kit grid on mobile (order reversal via `order-last`).

