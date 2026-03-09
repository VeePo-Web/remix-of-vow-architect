

# About Pages Phase 2 — Atmospheric Perfection & Scroll Choreography

## Current State Analysis

**What's been completed:**
- ✅ Navigation: Centered menu, scroll-hide, shimmer brand mark
- ✅ Foundation components: EditorialPrinciple, ShimmerButton, LetterPressQuote, AtmosphericSection
- ✅ Icon removal: Generic Lucide icons replaced with golden dots
- ✅ Enhanced visuals: 3-layer SVG depth in Sustain, ink-bloom signature in Covenant

**What's still cheap/missing igloo.inc quality:**

1. **No scroll-linked parallax** — Background images are static, lacking depth
2. **Weak section transitions** — Hard cuts between sections, no atmospheric fade-ins
3. **Missing micro-physics** — Hover states lack spring damping, tilt effects
4. **Flat presence numbers** — "500+" needs multi-layer text depth like hickoryandrose
5. **Generic witness moments grid** — Needs atmospheric cards with breathing borders
6. **No scroll progress indicator** — Missing golden thread that grows with scroll
7. **Weak hero reveal** — Simple fade-in, needs orchestrated multi-beat entrance
8. **Missing ambient sound cues** — No piano note triggers on key interactions
9. **Static atmospheric layers** — Fog/grain don't respond to scroll position
10. **No vertical rhythm indicator** — Missing visual metronome for section pacing

## Phase 2 Enhancements

### 1. Scroll-Linked Parallax System

**Apply to all Origin/Presence background images:**
```tsx
useEffect(() => {
  if (!ref.current || prefersReducedMotion) return;
  
  const handleScroll = () => {
    const rect = ref.current!.getBoundingClientRect();
    const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
    
    // Parallax background image
    ref.current!.style.setProperty('--parallax-y', `${scrollProgress * 60}px`);
    
    // Fade atmospheric fog based on scroll
    ref.current!.style.setProperty('--fog-opacity', `${0.4 * (1 - scrollProgress)}`);
  };
  
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
  });
  
  observer.observe(ref.current);
  return () => observer.disconnect();
}, [prefersReducedMotion]);
```

**Files to update:**
- `WitnessOrigin.tsx` — Add parallax to aboutOriginImg
- `WitnessPresence.tsx` — Add parallax + fog fade to background
- Clone to Events/Teaching variants

### 2. Enhanced Presence Number Treatment

**Current:** Basic `text-[120px]` with single text-shadow
**Target:** Multi-layer depth with atmospheric glow (hickoryandrose quality)

```tsx
<div className="relative">
  {/* Far glow — breathing */}
  <div 
    className="absolute inset-0 flex items-center justify-center"
    style={{
      textShadow: '0 0 80px hsl(var(--vow-yellow) / 0.15)',
      animation: 'witness-vignette-breathe 6s ease-in-out infinite'
    }}
  >
    <span className="font-display text-[120px] font-light text-vow-yellow/10">
      500+
    </span>
  </div>
  
  {/* Mid glow — static */}
  <div className="absolute inset-0 flex items-center justify-center">
    <span 
      className="font-display text-[120px] font-light text-foreground"
      style={{
        textShadow: '0 0 40px hsl(var(--vow-yellow) / 0.25), 0 2px 4px hsl(var(--rich-black) / 0.5)'
      }}
    >
      500+
    </span>
  </div>
  
  {/* Foreground — sharp */}
  <span className="relative font-display text-[120px] font-light text-foreground">
    500+
  </span>
</div>
```

### 3. Witness Moments — Atmospheric Cards

**Current:** Basic grid with hover background change
**Target:** Breathing border cards with golden glow on hover

```tsx
{witnessesMoments.map((moment, index) => (
  <div
    key={index}
    className="group relative p-6 border border-primary/10 hover:border-primary/30 transition-all duration-[400ms]"
    style={{
      background: hoveredIndex === index 
        ? 'linear-gradient(135deg, hsl(var(--rich-black)) 0%, hsl(var(--ebon-charcoal) / 0.4) 100%)'
        : 'transparent',
      boxShadow: hoveredIndex === index
        ? '0 0 24px hsl(var(--vow-yellow) / 0.08), inset 0 1px 0 hsl(var(--vow-yellow) / 0.05)'
        : 'none'
    }}
  >
    {/* Golden dot with breathing glow */}
    <div 
      className="w-1.5 h-1.5 rounded-full mb-3"
      style={{
        background: 'hsl(var(--vow-yellow))',
        boxShadow: '0 0 12px hsl(var(--vow-yellow) / 0.4)',
        animation: 'vigil-pulse 4s ease-in-out infinite',
        animationDelay: `${index * 0.3}s`
      }}
    />
    
    <p className="text-sm text-muted-foreground leading-relaxed">
      {moment}
    </p>
  </div>
))}
```

### 4. Golden Thread Scroll Progress

**New component:** `AboutScrollProgress.tsx`

Vertical golden thread on left edge that grows as user scrolls through About sections.

```tsx
export function AboutScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / height) * 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed left-8 top-1/4 bottom-1/4 w-px bg-primary/10 z-50">
      <div 
        className="w-px bg-primary transition-all duration-150"
        style={{ 
          height: `${progress}%`,
          boxShadow: '0 0 8px hsl(var(--vow-yellow) / 0.3)'
        }}
      />
    </div>
  );
}
```

### 5. Hero Multi-Beat Entrance

**Current:** Simple 300ms fade-in
**Target:** Orchestrated reveal (label → vibration → headline → subtitle)

```tsx
// WitnessHero.tsx
const [revealPhase, setRevealPhase] = useState(0);

useEffect(() => {
  const timers = [
    setTimeout(() => setRevealPhase(1), 200),   // Label
    setTimeout(() => setRevealPhase(2), 500),   // Vibration
    setTimeout(() => setRevealPhase(3), 900),   // Headline
    setTimeout(() => setRevealPhase(4), 1300),  // Subtitle
  ];
  return () => timers.forEach(clearTimeout);
}, []);

// Apply conditional classes:
// opacity-0 translate-y-4 → opacity-100 translate-y-0
// with staggered transitionDelay values
```

### 6. Hover Micro-Physics — Spring Damping

**Apply to:**
- EditorialPrinciple items
- Witness moment cards
- Navigation links

**Pattern:**
```tsx
onMouseEnter={(e) => {
  e.currentTarget.style.transition = 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)'; // Spring overshoot
  e.currentTarget.style.transform = 'translateY(-2px)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transition = 'transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1)'; // Damped return
  e.currentTarget.style.transform = 'translateY(0)';
}}
```

### 7. Section Transition Orchestration

**Add to all major sections:**

```tsx
// Fade-in atmospheric layers as section enters viewport
const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

return (
  <section ref={ref as React.RefObject<HTMLElement>}>
    {/* Atmospheric layers with delayed fade-in */}
    <div 
      className="absolute inset-0 grain transition-opacity duration-1000"
      style={{ opacity: isVisible ? 0.06 : 0 }}
    />
    <div 
      className="absolute inset-0 transition-opacity duration-1200 delay-200"
      style={{ 
        background: 'radial-gradient(...)',
        opacity: isVisible ? 0.8 : 0
      }}
    />
    {/* Content fades in after atmosphere */}
    <div 
      className="relative z-10 transition-all duration-700 delay-400"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)'
      }}
    >
      {children}
    </div>
  </section>
);
```

### 8. Vertical Rhythm Indicator (Mobile)

**New component:** `VerticalRhythmDots.tsx`

Right-edge section dots (like PianoKeyNav but minimal circles).

```tsx
export function VerticalRhythmDots({ sections }: { sections: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const observers = sections.map((id, index) => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.5 }
      );
      
      observer.observe(el);
      return observer;
    });
    
    return () => observers.forEach(o => o?.disconnect());
  }, [sections]);
  
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 md:hidden">
      {sections.map((_, index) => (
        <button
          key={index}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: activeIndex === index 
              ? 'hsl(var(--vow-yellow))'
              : 'hsl(var(--primary) / 0.2)',
            boxShadow: activeIndex === index
              ? '0 0 12px hsl(var(--vow-yellow) / 0.4)'
              : 'none',
            transform: activeIndex === index ? 'scale(1.4)' : 'scale(1)'
          }}
          onClick={() => {
            document.getElementById(sections[index])?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        />
      ))}
    </div>
  );
}
```

## Files to Create/Modify

**New Components:**
1. `src/components/AboutScrollProgress.tsx` — Vertical golden thread
2. `src/components/VerticalRhythmDots.tsx` — Mobile section dots
3. `src/hooks/useScrollParallax.ts` — Reusable parallax hook

**Updated Components (All 3 Verticals):**
1. `WitnessHero.tsx` — Multi-beat entrance
2. `WitnessOrigin.tsx` — Parallax background
3. `WitnessPresence.tsx` — Enhanced number treatment, atmospheric cards
4. `WitnessSustain.tsx` — Section transition orchestration
5. `WitnessCovenant.tsx` — Hover micro-physics
6. Clone all to `events-about/` and `teaching-about/`

**Global Styles:**
- Add spring damping easing curves to `src/index.css`

## Success Metrics

**Before Phase 2:**
- Static backgrounds
- Hard section cuts
- Flat hover states
- Generic number treatment

**After Phase 2:**
- Scroll-linked parallax on all backgrounds
- Orchestrated atmospheric fade-ins
- Spring-damped hover physics
- Multi-layer number depth
- Golden thread progress indicator
- Multi-beat hero entrance
- Breathing witness moment cards

**Target Feel:**
- Every scroll feels like a slow camera dolly through a sacred space
- Interactions have weight and physics (spring overshoot → damped settle)
- Numbers glow like candlelight with layered depth
- Sections breathe in/out as they enter/exit viewport
- Golden thread provides constant orientation
- Mobile users get minimal rhythm dots, not cluttered nav

