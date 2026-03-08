

# Full-Screen Menu — Vertical-Aware Navigation Upgrade

## Problem

The `FullScreenMenu` hardcodes all 9 menu items to weddings-default routes. When a user is on `/events/pricing` and opens the hamburger menu, "Services" links to `/pricing` (weddings) and "About" links to `/about` (weddings) instead of `/events/pricing` and `/events/about`. The `MinimalHeader` already solved this with `getNavLinks(pathname)`, but the menu was never updated.

## Fix

Make the `menuItems` array dynamic based on `location.pathname`, mirroring the same vertical-detection logic already in `MinimalHeader`.

### Changes to `src/components/FullScreenMenu.tsx`

1. Convert `menuItems` from a static `const` to a function `getMenuItems(pathname: string)` that returns the array with vertical-aware `href` values for Services and About:

```text
function getMenuItems(pathname: string) {
  const isEvents = pathname.startsWith('/events');
  const isTeaching = pathname.startsWith('/teaching');
  
  const servicesHref = isEvents ? '/events/pricing'
    : isTeaching ? '/teaching/pricing'
    : '/pricing';
  
  const aboutHref = isEvents ? '/events/about'
    : isTeaching ? '/teaching/about'
    : '/about';

  return [
    { number: "01", label: "Weddings", href: "/weddings" },
    { number: "02", label: "Teaching", href: "/teaching" },
    { number: "03", label: "Events", href: "/events" },
    { number: "04", label: "Services", href: servicesHref },
    { number: "05", label: "About", href: aboutHref },
    { number: "06", label: "Proof", href: "/proof" },
    { number: "07", label: "FAQ", href: "/faq" },
    { number: "08", label: "Listen", href: "/listen" },
    { number: "09", label: "Contact", href: "/contact" },
  ];
}
```

2. Inside the component, call `const menuItems = getMenuItems(location.pathname)` and pass it to `handleItemClick` (which already references `menuItems[index].href`).

Single file, ~15 lines changed. No new dependencies.

