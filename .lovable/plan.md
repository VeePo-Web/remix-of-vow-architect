

# Plan: Final Focus Ring Consistency Pass

The footer already has Fitzgerald spacing (fitz-9, fitz-10, fitz-7) and `target="_blank" rel="noopener noreferrer"` on external social links. The only remaining gap is **focus-visible ring-offset** on two groups of interactive elements.

## What's Already Done
- Fitzgerald spacing: `py-fitz-9 md:py-fitz-10`, `gap-fitz-9`, `mt-fitz-10 mb-fitz-7`, `mt-fitz-7` — all correct
- External links: Instagram and YouTube already have `target="_blank" rel="noopener noreferrer"`
- Navigate NavLinks and Legal NavLinks: already have full focus ring with offset
- Social icons: have `focus-visible:ring-2 focus-visible:ring-primary/70` but **missing** `ring-offset-2 ring-offset-background`

## What Needs Fixing

### `src/components/Footer.tsx`

1. **Reach Me contact links** (lines 213, 218): Add `focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm` (currently have `rounded` but missing offset)

2. **Social icon links** (lines 129, 137, 145, 155): Add `focus-visible:ring-offset-2 focus-visible:ring-offset-background` to all 4 social icons for consistency with the Legal/Navigate links

This ensures every interactive element in the footer uses the identical focus ring pattern: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm`.

## No Other Files Changed

