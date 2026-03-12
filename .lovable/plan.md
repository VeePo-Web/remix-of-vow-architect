

# Phase 18: Micro-Detail Polish — Sub-12px Text, Crushed Opacities, and Remaining Cheap Chrome

## Findings

After Phases 12-17 stripped the major offenders, a targeted codebase search reveals three remaining categories of issues:

### A. Sub-12px Text (text-[9px], text-[10px]) — 9 files, ~15 instances

These violate the 12px floor. Most are in dark-themed UI (TheSound, GenreTrackPanel, AudioPlayer) or hover-only decorative elements.

| File | Line | Current | Context | Fix |
|------|------|---------|---------|-----|
| `TheSound.tsx` | 140 | `text-[10px]` | Category label in audio player | `text-xs` |
| `TheSound.tsx` | 146 | `text-[9px]` | Time display | `text-xs` |
| `GenreTrackPanel.tsx` | 160 | `text-[10px]` | Track numbers | `text-xs` |
| `AudioPlayer.tsx` | 220 | `text-[10px]` | "Coming soon" label | `text-xs` |
| `Footer.tsx` | 379 | `text-[10px]` | "Crafted by" micro-label | `text-xs` |
| `TeachingHero.tsx` | 374 | `text-[10px]` | Scroll cue label | `text-xs` |
| `ThreePaths.tsx` | 171, 264 | `text-[10px]` | "MOST CHOSEN" pill | `text-xs` |
| `EventsAboutPresence.tsx` | 78 | `text-[10px]` | Hover-only frame index (aria-hidden) | `text-xs` |
| `TeachingAboutPresence.tsx` | 69 | `text-[10px]` | Hover-only frame index (aria-hidden) | `text-xs` |
| `WitnessPresence.tsx` | 142 | `text-[10px]` | Hover-only frame index (aria-hidden) | `text-xs` |

### B. Crushed Opacities Below 0.60 Floor — 5 files, ~8 instances

| File | Line | Current | Fix |
|------|------|---------|-----|
| `GenreTrackPanel.tsx` | 160 | `opacity-20` (track numbers) | `opacity-60` |
| `GenreTrackPanel.tsx` | 183 | `opacity-35` (footer text) | `opacity-60` |
| `TheSound.tsx` | 146 | `opacity-30` (time display) | `opacity-60` |
| `TeachingHero.tsx` | 384 | `opacity-25` (scroll chevron) | `opacity-60` |
| `ContactSLATimeline.tsx` | 29 | breathing animation oscillating 0.15–0.35 | Remove animation, set static `opacity-60` |

### C. ContactSLATimeline Golden Thread Breathing Animation

The `golden-thread-breathe` animation on the SLA timeline oscillates between `opacity: 0.15` and `opacity: 0.35` — both below the 0.60 floor. The thread itself is fine as a static design element. Fix: remove the breathing animation, set a static `bg-primary/30` line, and remove the inline `@keyframes` block.

---

## Implementation Summary

| File | Changes |
|------|---------|
| `TheSound.tsx` | 2x text size to `text-xs`, 1x opacity boost |
| `GenreTrackPanel.tsx` | 1x text size, 2x opacity boost |
| `AudioPlayer.tsx` | 1x text size |
| `Footer.tsx` | 1x text size |
| `TeachingHero.tsx` | 1x text size, 1x opacity boost |
| `ThreePaths.tsx` | 2x text size |
| `EventsAboutPresence.tsx` | 1x text size |
| `TeachingAboutPresence.tsx` | 1x text size |
| `WitnessPresence.tsx` | 1x text size |
| `ContactSLATimeline.tsx` | Remove breathing animation, set static opacity |

Total: 10 files, ~18 targeted fixes. No layout or content changes. All within locked wedding components are dark-themed UI elements where the fix is purely size/opacity — no animation or layout changes.

