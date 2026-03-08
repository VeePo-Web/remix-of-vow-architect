

# Piano Key Nav: Rename Labels & Visual Upgrade

## Part 1: Rename All Section Labels to Intuitive, Glanceable Names

Current labels use poetic internal names ("The Exhale," "The Threshold," "The Crossing") that are meaningless to first-time visitors. Each tooltip should instantly communicate what the section contains.

### Homepage (`src/pages/Index.tsx` — `pianoSections`)
| Current | New |
|---|---|
| The Exhale | Introduction |
| Our Process | How I Prepare |
| The Vow | My Promise |
| The Invitation | Meet Me |
| Hear Me Play | Listen |
| The Transformation | Before & After |
| The Witness | About Me |
| Three Paths | Pricing |
| Testimonials | Kind Words |
| The Crossing | Get in Touch |

### Events (`src/pages/Events.tsx` — `eventsSections`)
| Current | New |
|---|---|
| The Opening | Welcome |
| The Exhale | Why Live Piano |
| Occasions | Event Types |
| The Approach | How I Work |
| The Threshold | Your Questions |
| The Experience | Past Events |
| The Offering | Packages |
| The Crossing | Get in Touch |

### Teaching (`src/pages/Teaching.tsx` — `teachingSections`)
| Current | New |
|---|---|
| The Opening | Welcome |
| The Exhale | My Philosophy |
| The Pillars | Core Values |
| The Method | How I Teach |
| The Threshold | Your Questions |
| The Stories | Student Stories |
| The Offering | Lesson Options |
| The Crossing | Get in Touch |

### About (`src/pages/About.tsx` — `aboutSections`)
| Current | New |
|---|---|
| The Resonance | Welcome |
| The Origin | My Story |
| The Sustain | What I Believe |
| The Presence | Experience |
| The Covenant | My Promise |
| The Crossing | Get in Touch |

### FAQ (`src/pages/FAQ.tsx` — `faqSections`)
| Current | New |
|---|---|
| The Threshold | Overview |
| Quick Answers | Quick Answers *(keep)* |
| Common Fears | Common Concerns |
| Policies | Policies *(keep)* |
| Trust | Credentials |
| The Crossing | Get in Touch |

### Listen (`src/pages/Listen.tsx` — `listenSections`)
| Current | New |
|---|---|
| The Room | Welcome |
| The Movements | Tracks |
| The Crossing | Get in Touch |

### Pricing (`src/pages/Pricing.tsx` — `pricingSections`)
Already clear. Minor refinements:
| Current | New |
|---|---|
| Overview | Overview *(keep)* |
| Inclusions | What is Included |
| Packages | Packages *(keep)* |
| Add-ons | Enhancements |
| Compare | Comparison |
| Testimonials | Kind Words |
| FAQ | Questions |
| Download | Download *(keep)* |
| Begin | Get in Touch |

### Proof (`src/pages/Proof.tsx` — `proofSections`)
| Current | New |
|---|---|
| Overview | Overview *(keep)* |
| Documentation | Sound Levels |
| Setup Gallery | Setup Photos |
| Insurance | Insurance *(keep)* |
| Redundancy | Backup Systems |
| Downloads | Downloads *(keep)* |
| Begin | Get in Touch |

---

## Part 2: Upgrade PianoKeyNav Visual Quality

### 2A. Active Key — Breathing Glow
Add a subtle pulsing `box-shadow` animation on the active key to draw the eye without being distracting. A 3s infinite cycle using `vow-yellow` glow at low opacity (0.08 to 0.15).

**CSS addition** in `src/index.css`:
```css
.piano-key--active {
  animation: piano-active-breathe 3s ease-in-out infinite;
}
@keyframes piano-active-breathe {
  0%, 100% { box-shadow: -4px 0 12px hsl(var(--vow-yellow) / 0.08); }
  50% { box-shadow: -6px 0 18px hsl(var(--vow-yellow) / 0.18); }
}
```

### 2B. Tooltip — Refined Typography & Micro-Interaction
- Add a thin `1px` left border in `vow-yellow / 0.3` to the tooltip for a gilded accent.
- Increase font-size from `10px` to `11px` for readability.
- Add a subtle warm background tint shift.

### 2C. Golden Thread — Dot at Progress Terminus
Add a small 4px breathing dot at the bottom of the golden thread fill, creating a visual "cursor" showing current position. This mirrors the golden dot pattern used throughout the brand (exhale pulse, section dividers).

**CSS addition:**
```css
.piano-key-thread-fill::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: hsl(var(--vow-yellow) / 0.6);
  box-shadow: 0 0 6px hsl(var(--vow-yellow) / 0.3);
  animation: piano-thread-dot 3s ease-in-out infinite;
}
@keyframes piano-thread-dot {
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.4); }
}
```

### 2D. White Key — Top-Edge Highlight
Add a subtle 1px ivory highlight on the top edge of white keys to reinforce the 3D piano aesthetic:
```css
.piano-key:not(.piano-key--black) {
  border-top: 1px solid hsl(var(--foreground) / 0.12);
}
```

### 2E. Reduced Motion Compliance
All new animations (`piano-active-breathe`, `piano-thread-dot`) get `animation: none !important` inside the existing `@media (prefers-reduced-motion: reduce)` block.

---

## Files Modified
1. `src/pages/Index.tsx` — label renames
2. `src/pages/Events.tsx` — label renames
3. `src/pages/Teaching.tsx` — label renames
4. `src/pages/About.tsx` — label renames
5. `src/pages/FAQ.tsx` — label renames
6. `src/pages/Listen.tsx` — label renames
7. `src/pages/Pricing.tsx` — label renames
8. `src/pages/Proof.tsx` — label renames
9. `src/index.css` — active breathing glow, thread dot, tooltip refinement, white key highlight, reduced motion
10. `src/components/PianoKeyNav.tsx` — add `relative` to thread-fill for dot positioning

