# Remove AI-generated images from the public gallery

## Goal
Strip every AI-generated image from the public gallery so only real photography remains. The fake ones are the cinematic golden `.jpg` renders (hands on keys, piano-only shots, staged venues, sheet-music close-ups). The real photos are the `.webp` / `.png` files from actual weddings, events, and teaching sessions.

## What changes

**`src/data/publicGallery.ts`** — remove 27 AI-generated entries and their imports:

- Hands / people-at-piano fakes: `hands-keys-closeup.jpg`, `invitation-portrait.jpg`, `about-hero.jpg`, `about-origin.jpg`, `process/ceremony.jpg`, `process/listening.jpg`, `process/crafting.jpg`, `process/refining.jpg`, `process/completing.jpg`
- Piano-only fakes: `hero-piano.jpg`, `piano-macro-hammers.jpg`, `paths-piano-candle.jpg`, `teaching-keys.jpg`, `listen-hero.jpg`, `faq-hero.jpg`, `teaching-bench.jpg`, `teaching-studio-warm.jpg`
- Staged venue fakes: `gallery-setup.jpg`, `gallery-hero.jpg`, `services-hero.jpg`, `contact-hero.jpg`, `events-hero.jpg`, `events-ballroom-grand.jpg`, `venue-empty-golden.jpg`, `vow-moment-altar.jpg`, `witness-ceremony.jpg`, `witnesses-venue.jpg`

**12 real photos stay** (all `.webp` / `.png`):
- Weddings: `wedding-brendan-ceremony.png`, `martin-anita-performance.webp`, `martin-anita-couple.webp`, `martin-anita-room.webp`, `martin-anita-group.webp`
- Events: `events-stage-warmlight.webp`, `events-nord-overhead.webp`, `events-performer-bw.webp`, `events-stage-motion.webp`, `events-stage-purple.webp`
- Teaching: `teaching-jerome-ensemble.png`

## Notes
- The "Details" category disappears (it was entirely AI images); gallery categories become Weddings / Events / Teaching.
- The landing page hero (`events-stage-warmlight.webp`) is a real photo — untouched.
- The AI image files themselves stay in `src/assets/` (archived pages still reference some); they're just no longer shown publicly.
- Gallery layout needs no changes — the masonry wall adapts to 12 items.

## Verification
- Run the test suite (gallery manifest uniqueness/dimensions tests).
- Browser check of `/gallery` at mobile and desktop widths to confirm only real photos render, no gaps.
