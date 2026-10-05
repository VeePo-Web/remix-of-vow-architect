# Five-second homepage hero gallery plan

## Goal
Turn the homepage’s single background photograph into a polished full-screen photo sequence that changes every five seconds, while preserving the existing headline, navigation, contact flow, gallery page, and two-page public structure.

## Visual experience
- Keep the current hero dimensions and all foreground content in place; only the photographic background becomes a slideshow.
- Start every visit with the childhood piano photograph so the origin story remains the first impression.
- Continue through a deliberately curated subset of the existing real-photo gallery, balancing weddings, events, teaching, portraits, and performance scenes rather than blindly using file order.
- Transition with a restrained editorial crossfade so there is never a blank frame, flash, or layout shift.
- Maintain the dark readability veil above every photograph, ensuring the wordmark, headline, links, and captions remain legible as image brightness changes.
- Update the small lower caption for each photograph using its existing factual alternative text/category data; retain the special “Parker, age five — where it all began.” wording for the first image.
- Add a quiet visual position indicator that shows the current image and total without competing with the headline. No card styling or decorative controls.

## Timing and behavior
- Advance to the next photograph exactly every 5,000 milliseconds and loop continuously.
- Use a two-layer image arrangement so the incoming image can load before becoming visible and the outgoing image remains in place during the fade.
- Preload the next image in sequence to reduce visible loading on slower connections; keep the first childhood image immediately available as the priority image.
- Pause automatic advancement while the browser tab is hidden, then resume cleanly when it becomes visible so the sequence does not jump through missed slides.
- When reduced-motion is requested, keep the first childhood image static and disable automatic transitions rather than forcing movement.
- Treat the changing background as one meaningful hero image for assistive technology, avoiding repeated announcements every five seconds.

## Data and structure
- Keep `src/data/publicGallery.ts` as the single source of truth for public photography.
- Export a typed hero sequence derived from that manifest, with the childhood image explicitly first and optional hero-specific framing/caption details where needed.
- Add a focused hero-gallery component or hook so slideshow timing and image-layer behavior do not clutter the contact form page.
- Preserve every existing gallery image, its gallery ordering, and all archived pages; this change will not add or remove public routes.
- Record the reusable architecture rule that the homepage slideshow must source its images from the typed public photography manifest.

## Responsive treatment
- Tune `object-position` per selected photograph where necessary so faces, hands, piano, and venue details remain visible.
- Keep the current desktop composition and ensure the lower caption, gallery link, headline, and image indicator do not overlap.
- On phones, retain a stable viewport-height hero, protect the navigation and primary action, and use mobile-specific framing for portrait photographs where a single crop cannot serve both layouts.
- Keep the following contact section visible immediately after the hero and avoid any horizontal overflow.

## Accessibility and resilience
- Preserve sufficient contrast across the brightest and darkest photographs.
- Respect `prefers-reduced-motion` in both JavaScript behavior and CSS transitions.
- Keep decorative transition layers out of the keyboard order and prevent live-region announcements during automatic changes.
- If a later image fails to load, retain the current image and continue safely rather than revealing the page background.

## Verification
- Add a small behavior test for the explicit five-second interval and the rule that the childhood photograph is first.
- Run the relevant project tests and confirm the preview reports a clean build.
- Verify in a browser at desktop and mobile widths that:
  - the childhood image appears first;
  - the background changes after five seconds and loops;
  - crossfades have no white flash or layout shift;
  - captions and the position indicator update correctly;
  - foreground text stays readable;
  - controls and captions never overlap;
  - reduced-motion leaves the first image static;
  - the contact form and `/gallery` remain unchanged and usable.

## Scope boundary
This changes only the homepage hero background presentation. It does not alter the contact-email behavior, gallery page layout, public routing, metadata, or archived multi-page experience.
