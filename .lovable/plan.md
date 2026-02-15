
# Critical Fix: Homepage Sections Collapsed Again (0 Height)

## Problem

All homepage sections between the Hero and CrossOver/Footer have collapsed to 0 height. The page scrollHeight is approximately 2000px instead of 7500+. The hero renders correctly (absolute positioning + h-screen), but flow-layout sections like TheExhale (min-h-[70vh]), ProcessSection (min-height: 180vh), TheSound (min-h-[400px]), etc. all have offsetHeight: 0.

No console errors are present. No JavaScript crashes detected. The CSS file at src/index.css (5375 lines) has balanced braces at the top level.

## Root Cause

The previous fix deleted the duplicate `@layer components` block (original lines 5375-5877, ~500 lines) but this deletion may have caused one of:

1. A subtle CSS parse error somewhere in the remaining `@layer utilities` block (lines 544-5374) that the browser silently discards, invalidating all custom utility rules including section backgrounds, spacing, and layout helpers that downstream sections depend on.

2. The deletion removed CSS rules that were providing critical layout properties (min-height, display, padding) that the sections relied on -- even though they appeared to be "duplicates," they may have been the rules the browser was actually applying due to cascade order.

3. Missing keyframes (`cta-breathe`, `divider-breathe`) that were deleted along with the block are still referenced by components, potentially causing a CSS parse failure when the browser encounters an `animation` property referencing a nonexistent keyframe name within the layer.

## Fix Strategy

The safest approach is a two-part fix:

### Part 1: Re-add Missing Keyframes

Add the `cta-breathe` and `divider-breathe` keyframes back into the existing `@layer utilities` block (before the closing brace at line 5374). These are actively referenced by CrossOver.tsx (class `cta-breathe-glow`) and TheTransformation.tsx (inline style `animation: divider-breathe`).

Add at the end of the `@layer utilities` block (before line 5374):

```css
@keyframes cta-breathe {
  0%, 100% {
    box-shadow: 0 0 30px rgba(255, 224, 138, 0.15), 0 0 60px rgba(255, 224, 138, 0.08);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 224, 138, 0.25), 0 0 80px rgba(255, 224, 138, 0.12);
  }
}

@keyframes divider-breathe {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 40px 8px hsl(45 100% 76% / 0.2), 0 0 80px 16px hsl(45 100% 76% / 0.1);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 50px 12px hsl(45 100% 76% / 0.3), 0 0 100px 20px hsl(45 100% 76% / 0.15);
  }
}

.cta-breathe-glow {
  animation: cta-breathe 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cta-breathe-glow {
    animation: none;
    box-shadow: 0 0 30px rgba(255, 224, 138, 0.2);
  }
}
```

### Part 2: Add Defensive Min-Heights to Section Components

As a safety net against CSS cascade issues, add inline `style={{ minHeight: '...' }}` to each section component so they never collapse regardless of CSS state. This ensures the page layout is never broken even if CSS layers conflict.

Files to add inline minHeight:
- `src/components/TheExhale.tsx` -- add `style={{ minHeight: '70vh' }}` to the section element
- `src/components/TheSound.tsx` -- add `style={{ minHeight: '400px' }}` (already has className min-h but add inline as backup)
- `src/components/TheTransformation.tsx` -- add `style={{ minHeight: '500px' }}` 
- `src/components/TheInvitation.tsx` -- verify and add inline minHeight if needed
- `src/components/TheWitness.tsx` -- verify and add inline minHeight if needed
- `src/components/ThreePaths.tsx` -- verify and add inline minHeight if needed
- `src/components/TheSacredGround.tsx` -- verify and add inline minHeight if needed
- `src/components/TheRecord.tsx` -- verify and add inline minHeight if needed
- `src/components/TheWitnesses.tsx` -- verify and add inline minHeight if needed
- `src/components/VowMoment.tsx` -- already has `min-h-screen` class but add inline backup
- `src/components/CrossOver.tsx` -- verify and add inline minHeight if needed

### Part 3: Verify ProcessSection CSS

Confirm `.process-section` at line 1501 still has `min-height: 180vh` and that no rules in the utilities block are overriding it with `height: 0` or `display: none`.

## Files to Modify

| File | Change |
|------|--------|
| src/index.css | Add cta-breathe, divider-breathe keyframes and .cta-breathe-glow class before closing of @layer utilities |
| src/components/TheExhale.tsx | Add inline minHeight style as safety net |
| src/components/TheSound.tsx | Add inline minHeight style as safety net |
| src/components/TheTransformation.tsx | Add inline minHeight style as safety net |
| src/components/TheInvitation.tsx | Add inline minHeight style as safety net |
| src/components/TheWitness.tsx | Add inline minHeight style as safety net |
| src/components/ThreePaths.tsx | Add inline minHeight style as safety net |
| src/components/TheSacredGround.tsx | Add inline minHeight style as safety net |
| src/components/TheRecord.tsx | Add inline minHeight style as safety net |
| src/components/TheWitnesses.tsx | Add inline minHeight style as safety net |
| src/components/VowMoment.tsx | Add inline minHeight style as safety net |
| src/components/CrossOver.tsx | Add inline minHeight style as safety net |

## Expected Result

- All 13 sections render at proper heights with inline style safety nets
- Page scrollHeight returns to 7500px+
- CTA breathing glow animation works on CrossOver button
- Divider breathing animation works on TheTransformation center line
- Reduced motion fallbacks preserved
