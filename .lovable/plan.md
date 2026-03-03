

# Fix: Center All Text in CrossOver Section Footer

## The Issue

The bottom portion of the CrossOver section — the trust anchor text ("Includes your bespoke ceremony arrangement...") and the commitment statement ("Response within 24 hours. Always.") — relies on inherited `text-center` from the parent container. On some viewports or when text wraps, these elements may not appear visually centered.

## The Fix

### File: `src/components/CrossOver.tsx`

1. **Line 328** — Add explicit `text-center` to the trust anchor paragraph class. Currently has `max-w-md mx-auto` but no explicit text alignment.

2. **Line 353** — Add explicit `text-center` to the commitment statement paragraph ("Response within 24 hours. Always."). Currently inherits centering but lacks the explicit class.

Both are single-class additions — no layout or structural changes. The parent `div` on line 209 already has `text-center`, so this is a reinforcement to ensure centering is never lost through CSS specificity or inheritance breaks.

