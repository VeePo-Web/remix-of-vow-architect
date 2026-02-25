

# Gateway Refinement -- Description Copy Refinement and CTA Micro-Interaction Polish

## Audit Finding

### 1. Card Description Copy Lacks Brand Voice Differentiation

All three card descriptions use a generic service-listing tone: "Sacred ceremony audio," "Private lessons & studio sessions," "Live music for your occasion." While functional, these read as category labels rather than brand-voice copy. The brand's first-person, composed, reverent voice ("I will carry every word") is absent from the Gateway -- the very first touchpoint a visitor encounters. World-class gateway pages (Pentagram partner pages, Fantasy project entries) use evocative micro-copy that hints at the experience within, not just categorizes it.

**The fix:** Shift each description to a first-person, emotionally resonant fragment that previews the world behind each card:

- Weddings: "Sacred ceremony audio" becomes "I carry every vow so it lands where it belongs"
- Teaching: "Private lessons & studio sessions" becomes "Learn the instrument that speaks when words fall short"
- Events: "Live music for your occasion" becomes "Live piano for moments that demand presence"

Each line is under 60 characters, maintains the brand's composed tone, and gives the visitor an emotional reason to enter rather than just a category description.

### 2. The "ENTER" CTA Label Lacks Contextual Warmth

"Enter" is functional but cold -- it reads like a software command, not an invitation. The brand philosophy frames every interaction as crossing a threshold ("The Crossing," the semicolon as threshold). The CTA should feel like an invitation to cross into that world, not a button click. Additionally, the arrow transition at 180ms is correct but could benefit from a slightly longer travel distance to feel more intentional.

**The fix:** Change "Enter" to "Step Inside" -- a phrase that carries the threshold metaphor, feels warm and invitational, and reads as first-person hospitality rather than UI instruction. Increase the arrow's initial offset from `-translate-x-2` (8px) to `-translate-x-3` (12px) to give the slide-in 50% more travel distance, making the motion more perceptible and satisfying without changing the 180ms duration.

---

## Specifications

### Description Copy
- Weddings: "I carry every vow so it lands where it belongs"
- Teaching: "Learn the instrument that speaks when words fall short"
- Events: "Live piano for moments that demand presence"

### CTA Label
- "Enter" changes to "Step Inside"

### Arrow Travel Distance
- Initial offset: `-translate-x-2` changes to `-translate-x-3`

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Update three description strings in services array; change "Enter" to "Step Inside" in render; change arrow `-translate-x-2` to `-translate-x-3` |

## What Stays Unchanged

All typography hierarchy, aspect ratios, animation stagger, routing, images, opacity layers, gradient overlays, border luminance, golden thread, semicolon breathing, hover scale/lift/glow, parallax, and mobile layout remain exactly as they are.
