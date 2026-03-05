

# Plan: Add Events Link to Site-Wide Navigation

## Changes

### 1. Full-Screen Menu (`src/components/FullScreenMenu.tsx`)

Insert Events entry into the `menuItems` array between Home and Pricing. Renumber all items:

```
01  Home        /weddings
02  Events      /events       ← NEW
03  Pricing     /services
04  About       /about
05  Proof       /gallery
06  FAQ         /faq
07  Listen      /listen
08  Contact     /contact
```

### 2. Footer Navigation (`src/components/Footer.tsx`)

Add `{ to: "/events", label: "Events" }` to the footer nav list (line 178-184), positioned first — before Pricing — to match the menu order.

### 3. Header Nav Links (`src/components/MinimalHeader.tsx`)

The scrolled header currently shows 3 links: Pricing, About, Proof. No change needed here — the header keeps its minimal 3-link approach and Events is accessible via the full-screen menu. (Unless you want it added to the header bar too.)

## Files Modified

- `src/components/FullScreenMenu.tsx` — add Events entry, renumber
- `src/components/Footer.tsx` — add Events to nav list

