## Goal

Make the mobile “Hear me play” CTA feel premium, quiet, and collision-proof across the three service experiences:

- Weddings: `/` and related wedding pages
- Teaching: `/teaching*`
- Events: `/events*`

No desktop changes. No 3D/canvas/video scrub changes. No changes to audio playback logic or the listening room panel unless required for safe mobile behavior.

## UX Principle

The CTA should behave like a respectful persistent affordance, not a floating promo badge.

It should be:

- Always reachable
- Never blocking text, hero CTAs, sticky bars, nav, forms, or final-scene CTAs
- Visually quiet during cinematic scroll
- More visible only when the user is idle or intentionally engaging with music
- Consistent across Weddings, Teaching, and Events

## Current problem to solve

The audio CTA can compete with the mobile cinematic experience because it is persistent, visually noticeable, and positioned near other high-value mobile elements. On pages with 3D, scroll-scrubbed story copy, sticky CTAs, and final scene actions, the pill needs stronger behavioral rules.

## Strategy

### 1. Convert the CTA into a mobile state machine

The pill should have clear mobile states instead of one static layout:

```text
INTRO DELAY
  hidden while the first cinematic moment lands

IDLE
  small readable pill, bottom-right, label visible

SCROLLING
  dimmed / visually quieter, no hover-like lift

STICKY CTA VISIBLE
  compact 40x40 icon-only disc, lifted above sticky bar

PLAYING
  compact waveform disc, because the music state is already active

PANEL OPEN
  keeps existing listening-room behavior, but respects safe mobile placement

CONTACT / FORM-FOCUSED ROUTES
  hidden where it would interfere with conversion or form completion
```

### 2. Keep it bottom-right on mobile

Use bottom-right placement instead of bottom-center so it does not compete with the main page CTA hierarchy.

Rules:

- Default mobile: bottom-right, just above the safe area
- When sticky CTA bar is visible: lift above the sticky bar
- Never rely only on z-index; physically move it out of the sticky bar’s geometry
- Keep sticky CTA visually dominant when both are present

### 3. Collapse when another CTA becomes primary

When the mobile sticky bar is active, the audio CTA should become a compact icon-only disc.

This keeps the music CTA available without making it feel equal to the booking CTA.

Behavior:

- Full pill only when the page is calm and there is enough room
- Icon-only disc when sticky CTA appears
- Icon-only disc while music is playing
- Label and pause control hidden in compact state
- Tap target remains comfortable and reliable

### 4. Dim during active cinematic scrolling

On the 3D service pages, the user’s main action is scrolling through the story. The CTA should recede during that motion.

Behavior:

- While scrolling: fade down to a quiet opacity
- After scroll idle: return to normal
- Respect reduced-motion preferences
- Avoid bounce, wobble, or attention-grabbing animation during scroll

### 5. Delay entrance on 3D service roots

The pill should not appear before the pre-scroll intro and opening cinematic composition have landed.

Rules:

- `/`, `/teaching`, `/events`: longer entrance delay
- Non-3D support pages: shorter normal delay
- Entrance should feel like a soft surface appearing, not a popup

### 6. Hide where it hurts conversion

The audio CTA should be absent from mobile contact/form moments where it risks stealing focus.

Rules:

- Hide on `/contact*`
- Hide or keep compact on service-specific contact routes if those exist
- Do not cover form fields, submit buttons, success states, or keyboard-safe areas

### 7. Preserve the listening room

The listening room itself should remain unchanged unless testing shows a mobile collision.

Keep:

- Existing tracks
- Existing play/pause/select behavior
- Existing panel content
- Existing desktop position and behavior

Only adjust the launcher’s mobile placement and visibility behavior.

## Route coverage

Check the behavior on these mobile routes:

- `/`
- `/teaching`
- `/events`
- `/pricing` or wedding pricing route if present
- `/teaching/about`
- `/teaching/pricing`
- `/events/about`
- `/events/pricing`
- `/contact`
- service-specific contact pages, if present

## Acceptance checklist

At 390px mobile width:

1. Top of each 3D service page: CTA does not interrupt the intro.
2. During scroll: CTA fades quieter and never blocks story text.
3. Sticky bar visible: CTA becomes a 40x40 icon-only disc above the bar.
4. Final scene: CTA does not compete with the final booking CTA.
5. Playing music: compact waveform state stays reachable but discreet.
6. Panel open: existing listening room still works.
7. Contact/form pages: CTA does not appear where it could distract from submitting.
8. Desktop remains unchanged.

## Files expected to touch

Primary:

- `src/components/AmbientAudioPill.tsx`

Possible only if needed:

- `src/index.css` for tiny mobile-only animation/helper styles

Do not touch:

- 3D/video/canvas code
- `useVideoScrub`
- service cinematic scene logic
- desktop styles
- audio track data unless unrelated issues appear
- booking CTA copy or destination

## Implementation approach

1. Add mobile-only route and viewport awareness to the pill.
2. Observe the mobile sticky bar visibility flag already broadcast on `body`.
3. Derive a single `compact` state from sticky visibility, playback state, and panel state.
4. Update mobile positioning with safe-area-aware bottom offsets.
5. Add scroll-idle detection for temporary dimming.
6. Add route-based hiding for contact/form contexts.
7. Verify across the three service experiences at the current mobile viewport.