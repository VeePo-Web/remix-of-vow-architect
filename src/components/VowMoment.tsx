/**
 * VOW MOMENT — Full-Viewport Sacred Interstitial (INHALE — Dark)
 * 
 * The "altar moment" - emotional peak of the page.
 * Full viewport height with single quote in proclamation scale.
 * White text on rich black void with barely visible vow-yellow radial glow.
 * Staggered 3-line reveal with animated underline draw.
 */

import { cn } from "@/lib/utils";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import vowMomentAltar from "@/assets/vow-moment-altar.jpg";

export function VowMoment() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section 
      ref={sectionRef}
      className="section--dark section-grain relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, hsl(240 12% 5%) 0%, hsl(240 9% 2%) 100%)",
        minHeight: '100vh',
      }}
    >
      {/* Step 1: Cinematic Ceremony Backdrop at 8% opacity with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={vowMomentAltar}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
          style={{
            animation: 'vow-ken-burns 30s ease-in-out infinite alternate',
            filter: 'saturate(0.7) contrast(1.08)',
            willChange: 'transform',
          }}
          loading="lazy"
        />
      </div>

      {/* Step 2: Warm Fog Layer */}
      <div
        className="absolute inset-0 pointer-events-none will-change-[opacity]"
        style={{
          background: "radial-gradient(circle at 50% 40%, hsl(40 60% 50% / 0.025) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Step 5: Breathing Vow-Yellow Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none vow-glow-breathe will-change-[opacity]"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--vow-yellow) / 0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Step 6: Top fade from Process warm cream — color at top fading to transparent downward */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(180deg, hsl(40 25% 90%) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Step 3 & 4: Staggered Sacred Quote with Animated Underline */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <blockquote className="text-[clamp(48px,6vw,72px)] font-display font-light italic leading-[1.2] text-white">
          {/* Line 1: 0ms delay */}
          <span
            className={cn(
              "block transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "0ms" : "0ms" }}
          >
            Every vow spoken
          </span>

          {/* Line 2: 400ms delay + underline draw */}
          <span
            className={cn(
              "relative inline-block transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            <span className="relative z-10">becomes sacred</span>
            <span 
              className={cn(
                "absolute -bottom-2 left-0 right-0 h-[2px] rounded-full origin-center transition-transform",
                isVisible ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)",
                boxShadow: "0 0 12px hsl(var(--vow-yellow) / 0.3)",
                transitionDuration: "450ms",
                transitionDelay: isVisible ? "800ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
              aria-hidden="true"
            />
          </span>

          {/* Line 3: 800ms delay */}
          <span
            className={cn(
              "block transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
          >
            the moment it's heard.
          </span>
        </blockquote>
      </div>

      {/* Step 6: Bottom fade into TheInvitation */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(45 25% 96%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
