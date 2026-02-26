

# Persistent UI — Header, Full-Screen Menu, Mobile Sticky Bar: 7-Step Elevation to Fantasy.co Quality

## Current State Critique

The MinimalHeader, FullScreenMenu, and MobileStickyBar are the persistent frame surrounding every section. They are the first and last interactive elements visitors touch. While functional, they lack the atmospheric and typographic refinement now standard across all homepage sections.

### MinimalHeader
1. **No atmospheric treatment when scrolled** -- The scrolled state uses `bg-[rgba(10,10,12,0.92)] backdrop-blur-md` which is functional but lacks the grain texture and warm glow present in dark sections. It feels like a utility bar floating above a cinematic experience.
2. **Logo hover uses `text-accent`** -- This is vine-green, which is reserved for success/availability states per the brand covenant. Logo hover should use `text-primary` (vow-yellow) for warmth.
3. **"Hold My Date" CTA in nav lacks golden glow** -- The `nav-link--cta` class is used but the button lacks the luminous box-shadow treatment applied to CTAs elsewhere (CrossOver, ThreePaths).
4. **Border on scroll is `border-border/20`** -- A hard line. Should be a subtle golden gradient thread matching the footer and section separators.
5. **Transition timing is `duration-500`** -- Brand standard for navigation transitions is `260ms`. This feels sluggish.

### FullScreenMenu
6. **No atmospheric layers** -- Pure flat `vigil-void` background with no grain, no vignette, no warm fog. Every dark surface on the homepage now breathes with these layers. The menu feels like stepping out of the cinematic experience into a blank void.
7. **No golden thread or brand accent** -- The menu items are plain text with no sacred visual anchors. No golden thread separator, no glowing semicolon, no brand covenant whisper.
8. **Menu item hover uses `text-accent`** -- Same vine-green issue. Should be `text-primary` (vow-yellow).
9. **Close button position is `top-8 right-8`** -- Does not match the header's button position (`px-[var(--hero-space-edge)]`). When menu opens, the close button should align exactly where the menu button was — a seamless swap.
10. **No closing covenant** -- The menu has contact info at the bottom but no brand bookend. The footer now has "'Til Death ; Unto Life" — the menu should echo this.

### MobileStickyBar
11. **CTA text "Check Availability" is vendor language** -- Brand voice uses "Hold my date" per the copywriting rules. This is inconsistent with the header CTA.
12. **Microcopy "Dates fill quickly—check yours" uses urgency** -- This borders on pressure tactics. Brand voice is composed and reverent, never urgent. Should reframe.
13. **No grain or atmospheric treatment** -- Just a flat `rich-black/0.95` background. Feels utilitarian.

---

## The 7-Step Transformation

### Step 1: Header Atmospheric Refinement

Update the scrolled header state with a subtle grain overlay, replace the hard border with a golden gradient thread, and correct the transition timing to 260ms.

**Technical changes in `MinimalHeader.tsx`:**
- Change `duration-500` to `duration-[260ms]` on the header transition
- Replace `border-b border-border/20` with a pseudo-element or child div: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.12), transparent)` at 1px height, positioned at bottom
- Change logo `hover:text-accent` to `hover:text-primary`
- Change menu button `group-hover:text-accent` to `group-hover:text-primary` (both label and icon)

### Step 2: Header CTA Golden Glow

Add the luminous golden glow treatment to the "Hold My Date" CTA in the scrolled navigation, matching the CrossOver and ThreePaths CTA styling.

**Technical changes in `MinimalHeader.tsx`:**
- Add inline style to the CTA link: subtle golden text-shadow on hover
- Or wrap in a styled span with `hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)]`
- Ensure transition timing is `duration-[180ms]` matching brand hover standards

### Step 3: FullScreenMenu Atmospheric Layers

Add film grain, cinematic vignette, and warm fog to the full-screen menu overlay — matching the atmospheric treatment of every dark section on the homepage.

**Technical changes in `FullScreenMenu.tsx`:**
- Add `grain` div at `opacity-[0.06]`
- Add vignette: `radial-gradient(ellipse at center, transparent 30%, hsl(240 9% 2%) 100%)`
- Add warm fog: `radial-gradient(ellipse at 30% 40%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 50%)`
- All layers `pointer-events-none` and `aria-hidden="true"`

### Step 4: FullScreenMenu Typography and Hover Polish

Fix the hover color from vine-green to vow-yellow. Add a golden thread separator between the navigation items and the contact info. Add a subtle numeral glow treatment.

**Technical changes in `FullScreenMenu.tsx`:**
- Change `group-hover:text-accent` to `group-hover:text-primary` on menu item labels
- Change contact links `hover:text-accent` to `hover:text-primary`
- Add golden thread div between nav and contact: `h-[1px] w-12` with vow-yellow gradient
- Add subtle `text-primary/30` color to the menu numerals on hover for golden warmth
- Align close button position with header menu button: use `px-[var(--hero-space-edge,24px)] md:px-[var(--hero-space-edge,48px)]` and `py-6` matching the header

### Step 5: FullScreenMenu Brand Covenant

Add the closing covenant whisper at the bottom of the menu, matching the footer's bookend treatment. This creates brand consistency across all terminal UI states.

**Technical changes in `FullScreenMenu.tsx`:**
- Add covenant text after contact info: `'Til Death ; Unto Life.` in `font-display text-sm text-foreground/20`
- Semicolon in `text-primary/40` for golden accent
- Small golden dot above it matching footer treatment

### Step 6: MobileStickyBar Voice and Atmosphere

Fix the CTA copy to match brand voice ("Hold my date" not "Check Availability"). Reframe the microcopy from urgency to reverence. Add subtle grain texture for atmospheric consistency.

**Technical changes in `MobileStickyBar.tsx`:**
- Change button text from "Check Availability" to "Hold my date"
- Change microcopy from "Dates fill quickly—check yours" to "I would be honored to be there"
- Add `grain` overlay at `opacity-[0.04]` inside the bar
- Change `animate-fade-in` timing to ensure it respects brand motion standards

### Step 7: Performance and Accessibility Audit

Verify all hover transitions use `duration-[180ms]`, all focus-visible states work across header/menu/sticky bar, and the grain layers use `will-change: opacity` for GPU compositing.

**Technical changes across all three files:**
- Verify `focus-visible:ring-2 focus-visible:ring-primary/70` on all interactive elements
- Add `will-change: opacity` to grain layers
- Ensure FullScreenMenu traps focus when open (tab cycling stays within menu)
- Verify MobileStickyBar doesn't obscure footer content (already handled with `pb-16` in Footer)
- Ensure `prefers-reduced-motion` disables all entrance animations

---

## Summary of Files Modified

| Step | File(s) | Change |
|------|---------|--------|
| 1 | `MinimalHeader.tsx` | Transition timing + golden thread border + hover color fix |
| 2 | `MinimalHeader.tsx` | CTA golden glow treatment |
| 3 | `FullScreenMenu.tsx` | Grain + vignette + warm fog layers |
| 4 | `FullScreenMenu.tsx` | Hover colors + golden thread + close button alignment |
| 5 | `FullScreenMenu.tsx` | Closing covenant bookend |
| 6 | `MobileStickyBar.tsx` | Brand voice copy + grain texture |
| 7 | All three files | Performance + accessibility audit |

All changes are atmospheric, typographic, and voice refinements. No new components or dependencies.

