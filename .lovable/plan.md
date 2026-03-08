

# Footer — Add "Powered by VeePo" Attribution + Nav Menu Verification

## What We Are Doing

Adding a subtle "locally powered by veepo.ca" credit line to the footer, styled to match the sacred brand aesthetic (not the FlexServices style which uses colored hover states and a logo image). This will be text-only, typographic, and link directly to the veepo.ca case studies page.

## Implementation — 2 Files

### 1. `src/components/Footer.tsx`

Add a new line between the legal links row and the covenant bookend (after line ~327, before the bookend div).

The markup:
- A single `<a>` tag linking to `https://veepo.ca/case-studies` with `target="_blank" rel="noopener noreferrer"`
- Text: "This website locally powered by veepo.ca" — styled as `text-xs text-muted-foreground/40` (very subtle, not competing with the covenant bookend)
- On hover: text brightens to `text-muted-foreground/70` and "veepo.ca" portion shifts to `text-primary` (vow-yellow) with the standard 180ms transition
- Centered, with `mt-4` spacing
- No logo image, no scale effects — pure typographic, matching the editorial restraint of this brand

### 2. Copy the VeePo logo asset (optional — skip)

Per the brand's luxury editorial standard, we will NOT use a logo image. The text-only approach is more consistent with the sacred aesthetic. "veepo.ca" as highlighted text within the sentence is sufficient attribution.

## Visual Placement

```text
Privacy  |  Terms  |  Cookies  |  Accessibility

      This website locally powered by veepo.ca      ← new line

              ── golden thread ──
                    ● dot
           'Til Death ; Unto Life.
```

The attribution sits quietly between the legal links and the covenant bookend — visible but never competing with the sacred close.

