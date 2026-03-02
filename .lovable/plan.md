

# Step 10: The Final Audit — Fantasy.co Quality Certification

## Purpose

This is the capstone polish pass. Steps 4-9 built the individual elements to a high standard. Step 10 audits the entire section as a unified composition and fixes the remaining gaps between "very good" and "world-class."

After thorough review, five issues remain that prevent this section from meeting the Fantasy.co standard.

---

## Deficiency A: Border-Radius Violations

The declaration cards and kit cells use `rounded-md` (6px). The image frame uses `rounded-lg` (8px). The brand standard specifies 8px maximum, and consistency matters. All interactive cards should share the same radius. The kit cells — smaller, tighter elements — should use `rounded-sm` (4px) to signal their subordinate role in the hierarchy, while declaration cards stay at `rounded-md` (6px) and the image frame at `rounded-lg` (8px). This creates a radius hierarchy: frame > declarations > kit.

**Fix in TheWitness.tsx:** Change kit cell `rounded-md` to `rounded-sm`. Verify image frame is `rounded-lg` (already correct). Verify declaration cards are `rounded-md` (already correct).

---

## Deficiency B: Missing Atmospheric Grain Inside Kit Grid

The section has grain at the full-section level (`opacity-[0.06]`). The image frame has its own inner grain. But the kit grid area — which has a keys texture behind it — lacks its own grain layer. This makes the kit feel slightly flatter than the declarations and image frame. Every sub-region with its own background texture needs its own grain.

**Fix in TheWitness.tsx:** Add a grain overlay div inside the kit grid container (the `relative` wrapper around the kit), positioned `absolute inset-0 -m-4` matching the keys texture positioning, at `opacity-[0.04]` (lighter than section grain, just enough for tactile paper feel).

---

## Deficiency C: Closing Quote Lacks Atmospheric Backing

The closing quote ("Now — choose how long you want me there.") has a warm glow behind it, but it sits on the same surface as everything above. In the brand system, threshold moments — the moment before a CTA — deserve a subtle shift in surface temperature. The warm glow is there but the quote text itself has no material distinction from the declarations above.

**Fix in TheWitness.tsx:** Add a subtle horizontal golden rule (`w-10`, `h-[1px]`, vow-yellow gradient) above the closing quote, matching the thread separator above the kit but shorter and warmer. This creates a micro-threshold: the visitor crosses from inventory into invitation. Remove the duplicate golden thread rule that currently sits above the closing (the one at line 558-568), since the breathing diamond already serves as separator — having both a diamond AND a rule is redundant. Replace the rule with a tighter spacing adjustment (`mb-4` instead of `mb-6`) to bring the quote closer to the diamond, creating intimacy.

---

## Deficiency D: Mobile Spacing Needs Tightening

On mobile (< 768px), the section uses the same spacing as desktop. The `mb-12` on declarations, `mb-10` on separators, and `my-10` on the breathing diamond create excessive vertical distance on small screens. The Fitzgerald scale prescribes proportional reduction on mobile.

**Fix in TheWitness.tsx:** Add responsive spacing variants:
- Declarations container: `mb-8 md:mb-12`
- Thread separator after declarations: `mb-6 md:mb-10`
- Transitional sentence: `mb-4 md:mb-6`
- Breathing diamond: `my-6 md:my-10`
- Closing rule spacing: `mb-3 md:mb-4`
- CTA margin-top: `mt-4 md:mt-5`

---

## Deficiency E: Parallax Cleanup on Section Exit

When the section scrolls out of view, the parallax transforms remain applied to the image and text columns. If the visitor scrolls quickly, they may see the columns in a shifted state before the section is fully off-screen. The parallax calculation clamps progress between 0 and 1, but extreme values (near 0 or 1) create noticeable offset.

**Fix in TheWitness.tsx:** Add bounds clamping to the parallax offsets — if `progress < 0.1` or `progress > 0.9`, reduce the transform magnitude to 0 using a smooth ease-out curve. This ensures the section enters and exits the viewport in a neutral position, with parallax only active in the middle 80% of the scroll range.

---

## Technical Changes

### File: `src/components/TheWitness.tsx`

1. **Kit cell radius** — Change `rounded-md` to `rounded-sm` on kit cell divs (line 496 area).

2. **Kit grain overlay** — Add `<div className="absolute inset-0 -m-4 rounded-lg grain opacity-[0.04] pointer-events-none" aria-hidden="true" />` inside the kit container, after the keys texture div.

3. **Remove duplicate closing rule** — Remove the golden thread rule div at lines 558-568 (the one directly above the closing quote). The breathing diamond already serves this purpose. Tighten `mb-6` to `mb-4` on the closing quote wrapper.

4. **Mobile responsive spacing** — Update spacing classes throughout to use responsive `md:` variants for proper mobile proportions.

5. **Parallax edge damping** — In the scroll handler, multiply transform values by a damping factor: `const damp = progress < 0.15 ? progress / 0.15 : progress > 0.85 ? (1 - progress) / 0.15 : 1;` Apply `damp` as a multiplier to all translateY values.

### File: `src/index.css`

6. **No new CSS needed** — All fixes use existing utilities and inline adjustments. The CSS from Steps 4-9 is comprehensive and does not need additions for this audit pass.

---

## What This Achieves

- Border-radius hierarchy (8px > 6px > 4px) creates clear visual subordination from frame to declarations to kit
- Inner grain on the kit grid gives it the same tactile paper depth as the image frame and section background
- Removing the duplicate separator before the closing creates a cleaner threshold: diamond pause then intimate invitation
- Mobile spacing follows the Fitzgerald scale's proportional reduction, preventing the section from feeling stretched on small screens
- Parallax edge damping ensures the section enters and exits cleanly, with no jarring offset at the boundaries
- The section passes all nine North Star Questions: it honors the vigil, feels selective, tells Parker's story, reduces anxiety, breathes, starts with feeling, is provable, would satisfy Fantasy, and holds the visitor

