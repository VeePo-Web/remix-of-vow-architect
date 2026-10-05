# Rebrand public name to "Gawryletz Music Services"

Replace "Parker Gawryletz" with "Gawryletz Music Services" everywhere the name appears on the public site, in metadata/search listings, and in email templates.

## Changes

### Visible page text
- `src/components/public/PublicHeader.tsx` — header wordmark and its aria-label become "Gawryletz Music Services".
- `src/pages/PublicLanding.tsx` — footer name, hero image alt text, and the runtime-set tab title/description.
- `src/pages/PublicGallery.tsx` — tab title, meta description, and gallery aria-label.

### Metadata & SEO (`index.html`)
- `<title>`, meta description, og:title, og:site_name, twitter:title → "Gawryletz Music Services | Pianist in Cochrane & Calgary" (etc.).
- JSON-LD schema: business `name` and WebSite `name` become "Gawryletz Music Services"; keep `alternateName: "Gawryletz Music"` so Parker's personal name still matches searches; update the ContactPage name.
- Sentence-level copy adjusted so it reads naturally, e.g. "Start a conversation with Gawryletz Music Services."

### Email templates (`supabase/functions/`)
- `_shared/email-template.ts`: `BRAND.name` → "Gawryletz Music Services"; signature line updated.
- `send-contact-email/index.ts`: the "From" display name becomes "Gawryletz Music Services" (address stays noreply@gawryletzmusic.com). Redeploy the edge function.

### Supporting text
- `public/llms.txt` — heading and business references updated.

## Not changing
- The email address parker@veepo.ca, phone, domain, URLs, sitemap structure, or any layout/design.
- Personal-name phrasing where it refers to Parker as a person (e.g. "Parker reads and responds to every message personally") stays, since that is about him, not the brand name.

## Verification
- Run existing tests (`bun test`), typecheck, and build.
- Browser-check the header, footer, and tab title at desktop and mobile widths.
