# Two-page public website plan

## Goal
Replace the current public experience with exactly two polished pages while preserving every existing page and asset in the project:

1. `/` — a high-end contact landing page
2. `/gallery` — a photography-led gallery

Every former public URL will redirect to `/`. Nothing will be deleted.

## Page 1 — Contact landing page
- Create a restrained, editorial first screen featuring Parker Gawryletz, a concise invitation, and two clear destinations: begin an inquiry or view the gallery.
- Make the first form decision a large three-way service choice: **Weddings**, **Events**, or **Teaching**.
- Reveal a short form tailored to that choice, while keeping one coherent page and one submission flow.
- Collect only useful information: name, email, selected service, and a contextual message; add date or venue only when it meaningfully supports the chosen service.
- Use plain reassurance around response time and where the message goes, with visible loading, validation, error, and success states.
- Preserve the existing branded email system and send every submission to `parker@veepo.ca`, including the selected service and all entered form content.
- Add unobtrusive spam protection and maintain keyboard, screen-reader, reduced-motion, and mobile keyboard usability.

## Page 2 — Gallery
- Build a photography-first wall inspired by Atom Media’s folio discipline and Studio North’s quiet architectural restraint.
- Include only real photography already in the project; exclude decorative, genre, transformation, soundscape, and AI-labelled imagery.
- Use native image proportions, narrow consistent gutters, deliberate sequencing, and responsive shortest-column packing on larger screens.
- On mobile, use a clean single-column editorial sequence with stable image dimensions and no layout shift.
- Add a minimal page index/header with **Contact** and **Gallery**, plus a restrained contact invitation near the end.
- Keep captions limited to useful context; avoid cards, decorative UI, and heavy effects.

## Public access and search visibility
- Expose only `/` and `/gallery` in the app router.
- Redirect every old service, pricing, reviews, listening, contact, city, and legal URL to `/` using replacement navigation.
- Keep all old page files, components, media, and logic untouched so they can be restored later.
- Reduce the sitemap and prerender output to the two public URLs.
- Update the homepage and gallery metadata, canonical URLs, social metadata, and structured data for the new experience.
- Remove navigation and global overlays that belong to the hidden multi-page experience from these two public pages.

## Visual direction
- Warm-white editorial canvas, deep ink typography, and restrained accent colour drawn from the current brand tokens.
- Large expressive serif headlines paired with a precise sans-serif interface font.
- Photography carries the atmosphere; animation is limited to purposeful reveals and service/form transitions.
- No SaaS-style cards, duplicate imagery, generic luxury effects, or changes to the archived pages.

## Technical approach
- Add focused landing and gallery page components rather than rewriting archived service pages.
- Create a curated typed image manifest so every real photograph has a unique source, alt text, dimensions/aspect, and category.
- Reuse the existing contact email function and shared email template; extend only the submitted fields needed by the unified form.
- Add small tests for the two-route public allowlist, old-route redirects, service selection values, and email payload destination/content.
- Verify desktop and mobile layouts, form submission behavior, redirects, image loading, accessibility basics, and the final production build.

## Reference note
`csp4.net` currently redirects to an unrelated tile-installation website, so its intended design could not be verified. The implementation will use the confirmed transferable qualities from Atom Media and Studio North rather than imitating an inaccessible reference.
