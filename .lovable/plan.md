

# Round 43 — The Invitation: Fantasy.co-Grade Polish

## Current State (from live screenshots)

The Round 42 vertical restructure is live and working. The section now flows: label, epigraph, golden rule, 16:9 portrait, caption, golden rule, headline, body, assurance, CTA, golden rule, credentials. This architecture is correct. However, several details prevent it from reaching Fantasy.co caliber:

### Issues Identified

1. **Caption is left-aligned on desktop** — "A moment with me --- before the moment with you." sits flush-left beneath the portrait despite the section being `text-center`. The Round 41 change to `md:text-left` was carried into the Round 42 rewrite but is now wrong since everything is centered. It needs to be centered.

2. **The portrait image is vertically-composed** (a person at a piano shot in portrait orientation) but is being force-cropped into a 16:9 landscape frame. This causes awkward cropping where the subject is cut off. The aspect ratio should be adjusted to something more forgiving — `aspect-[2.2/1]` (approximately 2.2:1) gives cinematic letterbox without destroying a vertical source image, or better yet, `aspect-[3/2]` which is a classic photographic crop that works with both portrait and landscape sources.

3. **Body text uses `font-display` (Cormorant serif) at 18px** — this creates a dense serif paragraph that reads heavy for what should feel like a whispered observation. It should use the sans-serif body font (Inter) at the same size, or remain Cormorant but at a lighter weight with more generous line-height.

4. **The golden rules are too subtle** — at `w-16 h-px` and `w-10 h-px` they barely register. Fantasy.co uses decorative separators that are visible enough to create rhythm. Standardize at `w-12 h-px` with slightly higher opacity (`0.25` instead of `0.2`).

5. **Credential chips have inline styles for background/border/backdrop-filter** — these should use Tailwind classes for consistency. More importantly, the credential values (`500+`, `SOCAN`, `$4M`) need more visual weight — they're currently `text-xl text-white/75` which doesn't stand out enough against the dark background.

6. **The CTA "Meet the witness"** uses a custom CSS class `invitation-cta` with an extending en-dash rule. The hover state works but the resting state is too dim (`color: hsl(0 0% 100% / 0.6)`). Increase to `0.7` and add a subtle vow-yellow underline that's always visible (not just on `.is-visible`).

7. **Section padding is `py-28 md:py-40`** — this is fine but the `min-h-[400px]` constraint is unnecessary and should be removed since the content naturally exceeds that height.

8. **The top gradient fade** transitions from the section background into `hsl(240 9% 4%)` — this should match whatever section comes before it (VowMoment). The bottom gradient transitions into `hsl(220 15% 8%)` — this needs to match TheSound's background. These color values should be verified against the actual adjacent sections.

## Implementation Plan

### Step 1: Fix caption alignment

In `TheInvitation.tsx`, the caption `<p>` (line 138-146) currently has no explicit alignment override. The parent `flex flex-col items-center text-center` should center it, but if a previous round added `md:text-left`, remove that. Ensure the caption is simply `text-center`.

### Step 2: Adjust portrait aspect ratio

Change `aspect-[16/9]` to `aspect-[3/2]` on the portrait frame (line 114). This is a classic photographic crop that better accommodates the vertically-shot source image while still feeling cinematic and wide.

### Step 3: Refine body text typography

Change the body paragraph (line 191-199) from `font-display` to `font-sans` (Inter). Keep `text-lg` (18px) but increase line-height from `leading-[1.85]` to `leading-[1.9]` and reduce opacity from `text-white/50` to `text-white/45` for a softer, more whispered feel.

### Step 4: Standardize golden rules

Standardize all three golden rules to `w-12 h-px` with `hsl(var(--vow-yellow) / 0.25)`. This creates a consistent visual rhythm at a size that registers without being heavy.

### Step 5: Elevate credential typography

Change credential values from `text-xl text-white/75` to `text-2xl text-white/80` and the labels from `text-[10px]` to `text-[11px]` with `text-white/40` (up from `/35`). This gives the trust strip more authority as the architectural base of the section.

### Step 6: Brighten CTA resting state

In `src/index.css`, change `.invitation-cta` color from `hsl(0 0% 100% / 0.6)` to `hsl(0 0% 100% / 0.7)`. This subtle increase makes the CTA visible enough to function as a clear call to action rather than a whispered aside.

### Step 7: Remove unnecessary min-height

Remove `min-h-[400px]` from the section's className (line 21). The content naturally exceeds this minimum.

---

## Files Modified

| Step | File | Change |
|------|------|--------|
| 1 | `TheInvitation.tsx` | Ensure caption is `text-center` only |
| 2 | `TheInvitation.tsx` | Portrait: `aspect-[16/9]` to `aspect-[3/2]` |
| 3 | `TheInvitation.tsx` | Body: `font-display` to `font-sans`, adjust line-height/opacity |
| 4 | `TheInvitation.tsx` | Golden rules: standardize to `w-12 h-px`, opacity `0.25` |
| 5 | `TheInvitation.tsx` | Credentials: larger type, brighter values |
| 6 | `index.css` | CTA resting color: `/0.6` to `/0.7` |
| 7 | `TheInvitation.tsx` | Remove `min-h-[400px]` |

## What This Achieves

- Caption properly centers beneath the portrait in the vertical flow
- Portrait crop works with the actual source image instead of fighting it
- Body text feels lighter and more editorial (sans-serif whisper vs. heavy serif)
- Golden rules create consistent visual rhythm at a perceptible size
- Credential strip has enough authority to serve as the section's architectural foundation
- CTA is visible enough to convert without losing its understated elegance

