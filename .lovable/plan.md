

# Gateway Refinement -- Wordmark Entrance Choreography and Subtitle Letterspacing Precision

## Audit Finding

### 1. The Wordmark and Subtitle Share the Same Animation but Lack Choreographic Relationship

The header currently uses two independent `animate-fade-in` instances: the name at 400ms delay and "Sound Director" at 600ms delay. Both use the same `fade-in` keyframe (opacity 0→1, translateY 10px→0). This creates a simple stagger, but the two elements arrive with identical motion character — same distance, same duration, same easing. World-class entrance choreography (Fantasy hero sequences, Apple product reveals) differentiates parent and child elements: the parent arrives with more authority (slightly larger translate), the child arrives with more refinement (smaller translate, or no translate at all — just opacity). Currently both elements move 10px upward identically, making the stagger feel mechanical rather than composed.

**The fix:** The name (`h1`) keeps the standard `animate-fade-in` (10px translate). The subtitle ("Sound Director") switches to an opacity-only fade — no vertical movement. This creates a layered reveal: the name settles into place with physical weight, then the subtitle materializes beneath it like an inscription appearing on stone. The subtitle's delay increases from 600ms to 800ms to widen the breathing gap, reinforcing the vigil pacing. The subtitle also uses a longer fade duration (500ms vs the default 300ms) to feel more gradual and refined.

### 2. The Subtitle Tracking Is Slightly Too Tight for Its Size

"Sound Director" uses `tracking-[0.22em]` at `text-[11px]`. At this small size, 0.22em produces roughly 2.42px of letter-spacing. Premium luxury typography at micro sizes (Cartier, Hermès, Chanel digital) typically uses slightly wider tracking — around 0.28–0.32em — to ensure each letter breathes and the label reads as an engraving rather than compressed text. The current 0.22em is adequate but not distinctive. Widening to `tracking-[0.28em]` adds 0.66px per character, spreading the word by approximately 8px total. This subtle expansion transforms the subtitle from "small text" to "deliberately placed inscription."

---

## Specifications

### Subtitle Animation Refinement
- Remove `animate-fade-in` from the subtitle `<p>` tag
- Add a custom opacity-only animation via inline style or a new utility
- Duration: 500ms (slower than the 300ms default)
- Delay: 800ms (increased from 600ms)
- No translateY — pure opacity fade

### Subtitle Tracking
- Change `tracking-[0.22em]` to `tracking-[0.28em]`

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Gateway.tsx` | Update subtitle animation to opacity-only with longer duration/delay; widen letter-spacing |

## What Stays Unchanged

All card layout, typography hierarchy, gradient overlays, border luminance, golden thread, semicolon breathing, arrow affordance, hover states, ambient audio pill, mobile layout, and animation timings on cards/footer remain exactly as they are.
