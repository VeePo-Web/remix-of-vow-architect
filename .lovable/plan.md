Now that `gawryletzmusic.com` is verified in Resend, I'll update the edge function to send from your own branded address instead of the shared `onboarding@resend.dev` sender.

## Change

In `supabase/functions/send-contact-email/index.ts`, update the `from` field:

- **Before:** `Parker Gawryletz Site <onboarding@resend.dev>`
- **After:** `Parker Gawryletz <noreply@gawryletzmusic.com>`

Everything else stays the same:
- Emails still go **to** `parker@veepo.ca`
- `reply_to` is still set to the visitor's email, so hitting "Reply" goes straight to them
- All three forms (Weddings, Events, Teaching) keep working — they all call this one function

## Why this matters

- Emails arrive from your real brand (`@gawryletzmusic.com`) — looks professional in the inbox
- Far better deliverability than the shared Resend test sender (less likely to land in spam)
- DMARC/SPF/DKIM all pass since the domain is verified

## Notes

- I'll use `noreply@gawryletzmusic.com` as the sender. If you'd rather it come from `parker@`, `hello@`, or `bookings@gawryletzmusic.com`, let me know before I implement and I'll use that instead.
- No DNS or Resend dashboard work needed on your end — the domain is already verified.
- The edge function will auto-redeploy after the change.