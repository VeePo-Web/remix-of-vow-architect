## Goal

Make the mobile “Hear me play” CTA feel premium, quiet, and impossible to collide with other important UI across:

- Weddings: `/weddings`
- Teaching: `/teaching`
- Events: `/events`

Desktop stays untouched.

## What I found

The current direction is close, but the overlap risk is real because the audio CTA is still using a mostly fixed bottom position.

Two key issues:

1. The mobile sticky CTA height is treated like a guess (`72px`) instead of a measured safe zone.
2. The “3D service route” logic currently includes `/`, but the actual wedding service page is `/weddings`, so the wedding page may not get the same careful behavior as Teaching and Events.

Fly4Me’s mobile quality comes from a stricter rule: bottom UI does not fight for the same physical lane. The sticky CTA owns the bottom. Any secondary affordance either moves, collapses, dims, or disappears.

## Strategy

### 1. Create a real mobile collision system

Instead of hardcoding the audio pill’s bottom offset, the sticky bar will expose its actual mobile height to the page.

The audio CTA will then calculate its position from the live safe zone:

```text
safe bottom = safe-area inset + active sticky bar height + breathing gap
```

This makes the pill adapt if the sticky bar changes height, if text wraps, or if iOS safe-area changes.

### 2. Fix service route coverage

The premium mobile behavior should apply to:

```text
/weddings
/teaching
/events
```

Not only `/`, `/teaching`, `/events`.

The gateway `/` should get its own lighter rule, because it is a service chooser and the current play icon visually competes with the bottom tagline.

### 3. Give the sticky CTA priority

When the bottom sticky CTA appears, the audio CTA becomes secondary:

```text
Sticky CTA visible:
  - audio becomes 40x40 icon-only
  - label disappears
  - pause mini-button disappears
  - audio lifts above measured sticky bar height
  - opacity becomes quieter unless actively playing
```

The booking/contact CTA remains the dominant action.

### 4. Hide or suppress audio in conversion-critical moments

The audio CTA should fully disappear on:

- `/contact`
- `/teaching/contact`
- `/events/contact`
- any focused form/keyboard moment on mobile

If a form opens or the mobile keyboard appears, the audio CTA should not try to “float above” it. It should leave.

### 5. Avoid the final-scene CTA and footer moments

On the cinematic service pages, when the final booking/bookend CTA or footer reveal controls enter the bottom of the viewport, the audio CTA should not compete.

Behavior:

```text
Final CTA / footer action visible:
  - audio pill fades out or becomes non-interactive
  - no overlap with final booking CTA
  - no overlap with footer reveal button
```

This directly fixes the “other button overlaps sticky bottom” problem.

### 6. Make scroll behavior feel Fly4Me-level

On mobile service pages:

- while scrolling down: audio CTA recedes/dims
- after idle: returns softly if safe
- when sticky bar is active: stays compact
- reduced-motion users get opacity changes only
- no bouncy or attention-grabbing motion

This makes it feel like a quiet utility, not an ad badge.

### 7. Refine the gateway `/` separately

On the service chooser screen, the bottom-right play disc currently sits near the closing tagline.

Mobile rule for `/`:

- either delay it longer and keep it icon-only
- or hide it until the user enters a service page

I would choose: compact icon-only on `/`, with a softer delayed entrance, so the gateway stays editorial and uncluttered.

## Technical implementation

### Files to touch

Primary:

- `src/components/AmbientAudioPill.tsx`
- `src/components/MobileStickyBar.tsx`

Possible small supporting CSS only if needed:

- `src/index.css`

### Implementation steps

1. Update `MobileStickyBar` to broadcast both visibility and measured height.
2. Update `AmbientAudioPill` to use the measured safe zone instead of hardcoded `72px`.
3. Correct service route detection to include `/weddings`.
4. Add mobile-only “collision states”:

```text
idle
scrolling
sticky-active
playing
final-cta-visible
form-or-keyboard-active
contact-route
panel-open
```

5. Add final CTA/footer detection so the pill can fade out before it overlaps end-of-story actions.
6. Keep desktop behavior unchanged.
7. Verify at 390px mobile width on `/weddings`, `/teaching`, `/events`, `/`, and all contact routes.

## Acceptance checklist

At mobile width:

- The audio CTA never overlaps the sticky bottom CTA.
- The audio CTA never covers final booking CTAs or footer reveal controls.
- The sticky CTA always feels more important than the audio CTA.
- The audio CTA is compact when another CTA is active.
- The audio CTA disappears on contact/form pages.
- `/weddings`, `/teaching`, and `/events` all behave consistently.
- Gateway `/` feels clean and editorial, not cluttered.
- Desktop is unchanged.