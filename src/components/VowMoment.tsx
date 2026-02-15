/**
 * VOW MOMENT — Full-Viewport Sacred Interstitial (INHALE — Dark)
 * 
 * The "altar moment" - emotional peak of the page.
 * Full viewport height with single quote in proclamation scale.
 * White text on rich black void with barely visible vow-yellow radial glow.
 * No animation - demands static attention.
 */

export function VowMoment() {
  return (
    <section 
      className="section--dark relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, hsl(240 12% 5%) 0%, hsl(240 9% 2%) 100%)",
        minHeight: '100vh',
      }}
    >
      {/* Barely Visible Vow-Yellow Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--vow-yellow) / 0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Top fade from ProcessSection warm */}
      <div
        className="section-fade-top"
        style={{ background: 'linear-gradient(to top, transparent, hsl(45 30% 92%))' }}
        aria-hidden="true"
      />

      {/* Sacred Quote */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <blockquote className="text-[clamp(48px,6vw,72px)] font-display font-light italic leading-[1.2] text-white">
          Every vow spoken
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">becomes sacred</span>
            <span 
              className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.6), transparent)",
                boxShadow: "0 0 12px hsl(var(--vow-yellow) / 0.3)"
              }}
              aria-hidden="true"
            />
          </span>
          <br />
          the moment it's heard.
        </blockquote>
      </div>

      {/* Bottom fade into TheInvitation */}
      <div
        className="section-fade-bottom"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(45 25% 96%))' }}
        aria-hidden="true"
      />
    </section>
  );
}
