import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from "@/components/NavLink";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import veepoLogo from "@/assets/veepo-logo.png";

function getFooterConfig(pathname: string) {
  const isEvents = pathname.startsWith('/events');
  const isTeaching = pathname.startsWith('/teaching');

  const contactHref = isEvents ? '/events/contact'
    : isTeaching ? '/teaching/contact'
    : '/contact';

  const pricingHref = isEvents ? '/events/pricing'
    : isTeaching ? '/teaching/pricing'
    : '/pricing';

  const aboutHref = isEvents ? '/events/about'
    : isTeaching ? '/teaching/about'
    : '/about';

  const ctaText = isEvents ? 'Discuss Your Event'
    : isTeaching ? 'Begin the Conversation'
    : 'Reserve My Date!';

  const tagline = isEvents ? 'Event pianist for moments that demand presence.'
    : isTeaching ? 'Piano mentorship for every stage of the journey.'
    : 'I carry your vows so they can carry your guests.';

  const faqHref = isEvents ? '/events/faq'
    : isTeaching ? '/teaching/faq'
    : '/faq';

  // Build nav links — vertical-aware
  const navLinks = [
    { to: "/weddings", label: "Weddings" },
    { to: "/teaching", label: "Teaching" },
    { to: "/events", label: "Events" },
    { to: pricingHref, label: "Services" },
    { to: aboutHref, label: "About" },
  ];

  // Proof is weddings-exclusive
  if (!isEvents && !isTeaching) {
    navLinks.push({ to: "/proof", label: "Proof" });
  }

  // FAQ and Listen are available on all verticals
  navLinks.push(
    { to: faqHref, label: "FAQ" },
    { to: "/listen", label: "Listen" },
  );

  navLinks.push({ to: contactHref, label: "Contact" });

  return { contactHref, ctaText, tagline, navLinks };
}

// ══════════════════════════════════════════════
// INTERACTIVE PIANO KEYBOARD — The Easter Egg
// A visual 2-octave keyboard that responds to
// hover/touch with golden light and note names.
// ══════════════════════════════════════════════
const NOTES = [
  { note: 'C',  isBlack: false },
  { note: 'C♯', isBlack: true },
  { note: 'D',  isBlack: false },
  { note: 'D♯', isBlack: true },
  { note: 'E',  isBlack: false },
  { note: 'F',  isBlack: false },
  { note: 'F♯', isBlack: true },
  { note: 'G',  isBlack: false },
  { note: 'G♯', isBlack: true },
  { note: 'A',  isBlack: false },
  { note: 'A♯', isBlack: true },
  { note: 'B',  isBlack: false },
];

// Two octaves of notes
const KEYBOARD_NOTES = [...NOTES, ...NOTES];

// ══════════════════════════════════════════════
// PIANO AUDIO ENGINE — Web Audio API Synthesis
// Creates piano-like tones using layered oscillators
// with harmonic overtones and ADSR envelope shaping.
// No audio files — pure synthesis, instant response.
// ══════════════════════════════════════════════

// Note frequencies for 2 octaves (C4–B5)
const NOTE_FREQUENCIES: Record<string, number[]> = {
  'C':  [261.63, 523.25],
  'C♯': [277.18, 554.37],
  'D':  [293.66, 587.33],
  'D♯': [311.13, 622.25],
  'E':  [329.63, 659.26],
  'F':  [349.23, 698.46],
  'F♯': [369.99, 739.99],
  'G':  [392.00, 783.99],
  'G♯': [415.30, 830.61],
  'A':  [440.00, 880.00],
  'A♯': [466.16, 932.33],
  'B':  [493.88, 987.77],
};

function usePianoAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      // Master gain — keep overall volume gentle
      masterGainRef.current = ctxRef.current.createGain();
      masterGainRef.current.gain.value = 0.3;
      masterGainRef.current.connect(ctxRef.current.destination);
    }
    // Resume if suspended (browsers require user gesture)
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return { ctx: ctxRef.current, master: masterGainRef.current! };
  }, []);

  const playNote = useCallback((noteName: string, octaveIndex: number) => {
    const { ctx, master } = getContext();
    const freqs = NOTE_FREQUENCIES[noteName];
    if (!freqs) return;
    const baseFreq = freqs[octaveIndex] || freqs[0];
    const now = ctx.currentTime;

    // === Envelope: piano-like ADSR ===
    // Fast attack, moderate decay into a low sustain, then release
    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.8, now + 0.008);   // Attack: 8ms
    envelope.gain.exponentialRampToValueAtTime(0.35, now + 0.12); // Decay to sustain
    envelope.gain.exponentialRampToValueAtTime(0.08, now + 0.8);  // Sustain decay
    envelope.gain.exponentialRampToValueAtTime(0.001, now + 2.0); // Release
    envelope.connect(master);

    // === Layer 1: Fundamental (triangle — warm, mellow) ===
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(baseFreq, now);
    const g1 = ctx.createGain();
    g1.gain.value = 1.0;
    osc1.connect(g1).connect(envelope);
    osc1.start(now);
    osc1.stop(now + 2.2);

    // === Layer 2: Soft sine at fundamental (body) ===
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq, now);
    const g2 = ctx.createGain();
    g2.gain.value = 0.6;
    osc2.connect(g2).connect(envelope);
    osc2.start(now);
    osc2.stop(now + 2.2);

    // === Layer 3: 2nd harmonic (octave above, quiet — adds brightness) ===
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(baseFreq * 2, now);
    const g3 = ctx.createGain();
    g3.gain.value = 0.15;
    osc3.connect(g3).connect(envelope);
    osc3.start(now);
    osc3.stop(now + 1.5);

    // === Layer 4: 3rd harmonic (very quiet — adds character) ===
    const osc4 = ctx.createOscillator();
    osc4.type = 'sine';
    osc4.frequency.setValueAtTime(baseFreq * 3, now);
    const g4 = ctx.createGain();
    g4.gain.value = 0.05;
    // Quick decay on upper harmonics — like a real piano
    g4.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc4.connect(g4).connect(envelope);
    osc4.start(now);
    osc4.stop(now + 0.8);

    // === Attack transient — tiny noise burst for "hammer" feel ===
    const bufferSize = ctx.sampleRate * 0.03; // 30ms
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    // Bandpass filter to make transient tonal
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = baseFreq * 4;
    filter.Q.value = 2;
    noise.connect(filter).connect(noiseGain).connect(master);
    noise.start(now);
    noise.stop(now + 0.05);

    // Cleanup
    const cleanup = () => {
      try { osc1.disconnect(); } catch {}
      try { osc2.disconnect(); } catch {}
      try { osc3.disconnect(); } catch {}
      try { osc4.disconnect(); } catch {}
      try { envelope.disconnect(); } catch {}
    };
    setTimeout(cleanup, 2500);
  }, [getContext]);

  return playNote;
}

function PianoKeyboard() {
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [pressedKey, setPressedKey] = useState<number | null>(null);
  const playNote = usePianoAudio();

  // Build the white keys and black keys separately for proper layering
  const whiteKeys: { note: string; globalIndex: number }[] = [];
  const blackKeys: { note: string; globalIndex: number; whiteKeyIndex: number }[] = [];

  let whiteIndex = 0;
  KEYBOARD_NOTES.forEach((n, i) => {
    if (!n.isBlack) {
      whiteKeys.push({ note: n.note, globalIndex: i });
      whiteIndex++;
    } else {
      blackKeys.push({ note: n.note, globalIndex: i, whiteKeyIndex: whiteIndex - 1 });
    }
  });

  const totalWhiteKeys = whiteKeys.length;

  return (
    <div className="relative select-none" style={{ height: '80px' }}>
      {/* White keys */}
      <div className="flex h-full relative">
        {whiteKeys.map((key, i) => {
          const isActive = activeKey === key.globalIndex;
          const isPressed = pressedKey === key.globalIndex;
          return (
            <div
              key={`w-${i}`}
              className="relative flex-1 cursor-pointer transition-all duration-[120ms]"
              style={{
                background: isPressed
                  ? 'linear-gradient(180deg, hsl(36 50% 88%) 0%, hsl(36 40% 82%) 100%)'
                  : isActive
                  ? 'linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(36 20% 93%) 100%)'
                  : 'linear-gradient(180deg, hsl(0 0% 97%) 0%, hsl(0 0% 92%) 100%)',
                borderRight: i < totalWhiteKeys - 1 ? '1px solid hsl(0 0% 80% / 0.5)' : undefined,
                borderBottom: '1px solid hsl(0 0% 75% / 0.4)',
                borderRadius: '0 0 3px 3px',
                boxShadow: isPressed
                  ? 'inset 0 2px 6px hsl(36 50% 50% / 0.15), 0 0 20px hsl(var(--vow-yellow) / 0.15)'
                  : isActive
                  ? '0 2px 8px hsl(0 0% 0% / 0.08), 0 0 12px hsl(var(--vow-yellow) / 0.08)'
                  : '0 2px 4px hsl(0 0% 0% / 0.05)',
                transform: isPressed ? 'translateY(1px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setActiveKey(key.globalIndex)}
              onMouseLeave={() => { setActiveKey(null); setPressedKey(null); }}
              onMouseDown={() => { setPressedKey(key.globalIndex); playNote(key.note, key.globalIndex < 12 ? 0 : 1); }}
              onMouseUp={() => setPressedKey(null)}
              onTouchStart={(e) => { e.preventDefault(); setPressedKey(key.globalIndex); setActiveKey(key.globalIndex); playNote(key.note, key.globalIndex < 12 ? 0 : 1); }}
              onTouchEnd={() => { setPressedKey(null); setActiveKey(null); }}
              aria-hidden="true"
            >
              {/* Golden glow on active */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] rounded-full"
                  style={{
                    background: 'hsl(var(--vow-yellow) / 0.5)',
                    boxShadow: '0 0 8px hsl(var(--vow-yellow) / 0.3), 0 0 20px hsl(var(--vow-yellow) / 0.1)',
                  }}
                />
              )}
              {/* Note label — appears on hover */}
              {isActive && (
                <span
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-sans font-medium"
                  style={{
                    color: 'hsl(var(--vow-yellow) / 0.7)',
                    textShadow: '0 0 6px hsl(var(--vow-yellow) / 0.2)',
                  }}
                >
                  {key.note}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Black keys — absolutely positioned over white keys */}
      {blackKeys.map((key, i) => {
        const isActive = activeKey === key.globalIndex;
        const isPressed = pressedKey === key.globalIndex;
        const leftPercent = ((key.whiteKeyIndex + 0.65) / totalWhiteKeys) * 100;

        return (
          <div
            key={`b-${i}`}
            className="absolute top-0 cursor-pointer transition-all duration-[120ms] z-[2]"
            style={{
              left: `${leftPercent}%`,
              width: `${(0.6 / totalWhiteKeys) * 100}%`,
              height: '55%',
              background: isPressed
                ? 'linear-gradient(180deg, hsl(240 6% 22%) 0%, hsl(240 6% 16%) 100%)'
                : isActive
                ? 'linear-gradient(180deg, hsl(240 6% 18%) 0%, hsl(240 6% 12%) 100%)'
                : 'linear-gradient(180deg, hsl(240 6% 15%) 0%, hsl(240 6% 8%) 100%)',
              borderRadius: '0 0 2px 2px',
              boxShadow: isPressed
                ? 'inset 0 -1px 2px hsl(var(--vow-yellow) / 0.15), 0 0 12px hsl(var(--vow-yellow) / 0.12)'
                : isActive
                ? '0 2px 6px hsl(0 0% 0% / 0.4), 0 0 8px hsl(var(--vow-yellow) / 0.06)'
                : '0 2px 6px hsl(0 0% 0% / 0.4)',
              transform: isPressed ? 'translateY(1px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setActiveKey(key.globalIndex)}
            onMouseLeave={() => { setActiveKey(null); setPressedKey(null); }}
            onMouseDown={() => { setPressedKey(key.globalIndex); playNote(key.note, key.globalIndex < 12 ? 0 : 1); }}
            onMouseUp={() => setPressedKey(null)}
            onTouchStart={(e) => { e.preventDefault(); setPressedKey(key.globalIndex); setActiveKey(key.globalIndex); playNote(key.note, key.globalIndex < 12 ? 0 : 1); }}
            onTouchEnd={() => { setPressedKey(null); setActiveKey(null); }}
            aria-hidden="true"
          >
            {isActive && (
              <span
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-sans font-medium whitespace-nowrap"
                style={{
                  color: 'hsl(var(--vow-yellow) / 0.8)',
                  textShadow: '0 0 6px hsl(var(--vow-yellow) / 0.3)',
                }}
              >
                {key.note}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════
// FLOATING GOLDEN PARTICLES — The Candlelight
// Gentle floating motes that drift upward,
// reminiscent of ceremony candle embers.
// ══════════════════════════════════════════════
function GoldenParticles({ count = 18 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 1.5 + Math.random() * 2.5,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.25,
      drift: -20 + Math.random() * 40,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: `-${p.size}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `hsl(var(--vow-yellow) / ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px hsl(var(--vow-yellow) / ${p.opacity * 0.6})`,
            animation: `footer-particle-rise ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--particle-drift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════
// FOOTER — "The Final Movement"
//
// A full-viewport easter egg that transforms
// the typical footer into an immersive
// piano-themed closing experience.
// ══════════════════════════════════════════════
export function Footer() {
  const { ref: footerRef, isVisible } = useScrollReveal({ threshold: 0.08 });
  const [isArrival, setIsArrival] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const location = useLocation();
  const config = getFooterConfig(location.pathname);

  // Detect arrival state — when the covenant bookend is visible
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      const bookend = document.querySelector('[data-footer-bookend]');
      if (!bookend) return;
      observer = new IntersectionObserver(
        ([entry]) => setIsArrival(entry.isIntersecting),
        { threshold: 0.5 }
      );
      observer.observe(bookend);
    }, 100);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  // Mouse parallax for candlelight effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = footerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, [footerRef]);

  return (
    <footer
      ref={footerRef as React.RefObject<HTMLElement>}
      className="section--dark relative overflow-hidden pb-[env(safe-area-inset-bottom)]"
      data-theme="death"
      aria-label="Site footer"
      onMouseMove={handleMouseMove}
      style={{ minHeight: '100vh' }}
    >
      {/* === Color bridge from CrossOver === */}
      <div className="footer-fade-bridge" aria-hidden="true" />

      {/* === Organic Vine Thread — Top Edge === */}
      <svg
        className={cn(
          "absolute top-0 left-0 w-full pointer-events-none z-[3]",
          isArrival && "footer-vine-breathe"
        )}
        style={{ height: "6px" }}
        viewBox="0 0 1200 6"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="footer-vine-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.3 : 0.1})`} />
            <stop offset="50%" stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.35 : 0.12})`} />
            <stop offset="80%" stopColor={`hsl(var(--vow-yellow) / ${isArrival ? 0.3 : 0.1})`} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M0,3 Q50,4.5 100,3 T200,3 Q250,1.5 300,3 T400,3 Q450,4.5 500,3 T600,3 Q650,1.5 700,3 T800,3 Q850,4.5 900,3 T1000,3 Q1050,1.5 1100,3 T1200,3"
          fill="none"
          stroke="url(#footer-vine-gradient)"
          strokeWidth="1"
          className="transition-all duration-[450ms]"
          style={{
            filter: `drop-shadow(0 0 ${isArrival ? 6 : 3}px hsl(var(--vow-yellow) / ${isArrival ? 0.1 : 0.03}))`,
          }}
        />
      </svg>

      <span className="sr-only">Site footer with navigation, contact information, and social links</span>

      {/* === ATMOSPHERIC LAYERS === */}

      {/* Layer 1: Film grain */}
      <div
        className="grain pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{ opacity: isArrival ? 0.08 : 0.06 }}
        aria-hidden="true"
      />

      {/* Layer 2: Edge vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--rich-black)) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Mouse-reactive candlelight — follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 40% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(var(--vow-yellow) / ${isArrival ? '0.04' : '0.02'}) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Top-center warm fog */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 15%, hsl(var(--vow-yellow) / ${isArrival ? '0.035' : '0.015'}) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Bottom warm fog (piano glow) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 95%, hsl(var(--vow-yellow) / ${isArrival ? '0.05' : '0.02'}) 0%, transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Layer 6: Breathing vignette */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1]",
          isArrival && "footer-vignette-breathe"
        )}
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--rich-black) / 0.7) 100%)",
          opacity: isArrival ? undefined : 0.7,
        }}
        aria-hidden="true"
      />

      {/* === FLOATING GOLDEN PARTICLES === */}
      <GoldenParticles count={20} />

      {/* === MAIN FOOTER CONTENT === */}
      <div className="container mx-auto relative z-[2] flex flex-col justify-between" style={{ minHeight: '100vh', paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>

        {/* ─── TOP: Brand + "The Final Movement" ─── */}
        <div className="px-fitz-4 md:px-fitz-5 lg:px-fitz-6">
          {/* Golden thread above content */}
          <div
            className={cn(
              "h-[1px] w-24 mx-auto mb-10 transition-opacity duration-700",
              isArrival ? "footer-breathe" : ""
            )}
            style={{
              background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.3' : '0.25'}), transparent)`,
              boxShadow: `0 0 ${isArrival ? '8px' : '8px'} hsl(var(--vow-yellow) / ${isArrival ? '0.15' : '0.1'})`,
            }}
            aria-hidden="true"
          />

          {/* Section label */}
          <div
            className={cn(
              "text-center mb-16 md:mb-20 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <p
              className="text-[11px] font-sans font-medium uppercase tracking-[0.35em] mb-5"
              style={{ color: "hsl(var(--vow-yellow) / 0.35)" }}
            >
              The Final Movement
            </p>
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-light tracking-[-0.015em]" style={{ color: "hsl(0 0% 100% / 0.85)", lineHeight: 1.1 }}>
              Where every note finds its rest.
            </h3>
            <p className="font-display text-[16px] italic mt-5 max-w-md mx-auto" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
              {config.tagline}
            </p>
          </div>
        </div>

        {/* ─── MIDDLE: Navigation + Contact Grid ─── */}
        <div className="px-fitz-4 md:px-fitz-5 lg:px-fitz-6 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-fitz-9 max-w-5xl mx-auto w-full">
            {/* Brand + Social — delay 0ms */}
            <div
              className={cn(
                "col-span-1 md:col-span-2 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <img src="/logos/footer-dark.png" alt="Parker Gawryletz" className="h-[32px] w-auto" />
              <p className="font-display italic text-sm mt-2 mb-6" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
                Ceremony Pianist
              </p>
              <p className="mb-10 max-w-md leading-relaxed text-sm" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
                Calgary, Cochrane, Canmore & Banff — wherever your moment needs a witness.
              </p>
              {/* Social icons with spotlight hover */}
              <div className="group/icons flex items-center gap-4">
                {[
                  { href: "mailto:parker@parkergawryletz.com", icon: Mail, label: "Send me an email" },
                  { href: "tel:+14038308930", icon: Phone, label: "Call me by phone" },
                  { href: "https://instagram.com", icon: Instagram, label: "Follow me on Instagram", external: true },
                  { href: "https://youtube.com", icon: Youtube, label: "Watch me on YouTube", external: true },
                ].map((social, i) => (
                  <span key={social.label} className="contents">
                    {i > 0 && (
                      <span
                        className="inline-block w-1 h-1 rotate-45"
                        style={{ background: 'hsl(var(--vow-yellow) / 0.3)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.15)' }}
                        aria-hidden="true"
                      />
                    )}
                    <a
                      href={social.href}
                      className="hover:drop-shadow-[0_0_6px_hsl(var(--vow-yellow)/0.3)] group-hover/icons:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] p-3.5 -m-3.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)]"
                      style={{ color: "hsl(0 0% 100% / 0.45)" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "hsl(var(--vow-yellow))"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "hsl(0 0% 100% / 0.45)"}
                      aria-label={social.label}
                      {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <social.icon size={18} />
                    </a>
                  </span>
                ))}
              </div>
            </div>

            {/* Navigate — delay 150ms */}
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              <nav aria-label="Footer navigation">
                <h4 className="font-display text-xs uppercase tracking-[0.22em] mb-6" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
                  Navigate
                </h4>
                <ul className="group/nav space-y-4">
                  {config.navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className="hover:translate-y-[1px] active:translate-y-[2px] group-hover/nav:[&:not(:hover)]:opacity-40 transition-all duration-[180ms] story-link inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)] rounded-sm"
                        style={{ color: "hsl(0 0% 100% / 0.45)" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "hsl(var(--vow-yellow))")}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "hsl(0 0% 100% / 0.45)")}
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Reach Me — delay 300ms */}
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              <h4 className="font-display text-xs uppercase tracking-[0.22em] mb-6" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
                Reach Me
              </h4>
              <ul className="space-y-4 text-sm" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
                <li>Calgary, Cochrane, Canmore & Banff</li>
                <li>
                  <a
                    href="mailto:parker@parkergawryletz.com"
                    className="transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)]"
                    style={{ color: "inherit" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "hsl(var(--vow-yellow))"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}
                    aria-label="Email me at parker@parkergawryletz.com"
                  >
                    parker@parkergawryletz.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+14038308930"
                    className="transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)]"
                    style={{ color: "inherit" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "hsl(var(--vow-yellow))"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}
                    aria-label="Call me at +1-403-830-8930"
                  >
                    +1-403-830-8930
                  </a>
                </li>
              </ul>

              {/* Response promise */}
              <div className="mt-8 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'hsl(var(--vow-yellow) / 0.6)',
                    boxShadow: '0 0 6px hsl(var(--vow-yellow) / 0.3)',
                    animation: 'footer-status-pulse 3s ease-in-out infinite',
                  }}
                  aria-hidden="true"
                />
                <span className="text-xs italic" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
                  Response within 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Golden thread separator */}
          <div
            className="h-[1px] w-full max-w-5xl mx-auto mt-fitz-10 mb-fitz-9 transition-all duration-700"
            style={{
              background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.22' : '0.15'}), transparent)`,
              boxShadow: `0 0 ${isArrival ? '12px' : '8px'} hsl(var(--vow-yellow) / ${isArrival ? '0.15' : '0.1'})`,
            }}
            aria-hidden="true"
          />

          {/* === CTA — delay 400ms === */}
          <div
            className={cn(
              "flex flex-col items-center gap-5 mb-16 transition-all duration-700 relative",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            <div
              className={cn(
                "pointer-events-none absolute w-[200px] h-[200px] rounded-full transition-opacity duration-700",
                isArrival && "footer-cta-arrival-glow"
              )}
              style={{
                background: `radial-gradient(circle, hsl(var(--vow-yellow) / ${isArrival ? '0.06' : '0.04'}) 0%, transparent 70%)`,
                opacity: isArrival ? undefined : 1,
              }}
              aria-hidden="true"
            />
            <p className="font-display text-[15px]" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
              Ready to begin?
            </p>
            <Link
              to={config.contactHref}
              className="footer-cta-pill inline-flex items-center justify-center font-sans text-[13px] font-medium uppercase tracking-[0.12em] rounded-full transition-all duration-[260ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)] relative overflow-hidden group/cta"
              style={{
                height: "44px",
                padding: "0 28px",
                border: "1px solid hsl(var(--vow-yellow) / 0.25)",
                background: "hsl(var(--vow-yellow) / 0.08)",
                color: "hsl(0 0% 100% / 0.85)",
                boxShadow: "0 0 32px hsl(var(--vow-yellow) / 0.06)",
              }}
            >
              {config.ctaText}
              <span
                className="absolute inset-0 pointer-events-none opacity-0 group-hover/cta:opacity-100 transition-opacity duration-[300ms]"
                style={{
                  background: 'linear-gradient(110deg, transparent 30%, hsl(var(--vow-yellow) / 0.15) 45%, hsl(var(--vow-yellow) / 0.25) 50%, hsl(var(--vow-yellow) / 0.15) 55%, transparent 70%)',
                  animation: 'shimmer-sweep 1.5s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ─── BOTTOM: Piano Keyboard + Legal + Covenant ─── */}
        <div className="px-fitz-4 md:px-fitz-5 lg:px-fitz-6">

          {/* === INTERACTIVE PIANO KEYBOARD — The Easter Egg === */}
          <div
            className={cn(
              "max-w-xl mx-auto mb-14 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
          >
            <p
              className="text-[9px] font-sans uppercase tracking-[0.25em] text-center mb-3"
              style={{ color: "hsl(0 0% 100% / 0.2)" }}
            >
              Play me
            </p>
            <PianoKeyboard />
          </div>

          {/* === VeePo Attribution === */}
          <div
            className={cn(
              "flex justify-center mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "550ms" : "0ms" }}
          >
            <a
              href="https://veepo.ca/case-studies"
              target="_blank"
              rel="noopener noreferrer"
              className="group/veepo max-w-lg md:max-w-xl w-full block relative overflow-hidden border border-white/[0.06] hover:border-[hsl(28,87%,58%,0.2)] rounded-lg px-10 py-8 md:px-16 md:py-10 transition-all duration-[260ms] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,140,42,0.04) 0%, transparent 70%), hsl(var(--rich-black) / 0.6)',
              }}
            >
              {/* Gradient top border accent */}
              <div
                className="absolute top-0 left-0 w-full h-[1px] opacity-30 group-hover/veepo:opacity-60 transition-opacity duration-[260ms]"
                style={{ background: 'linear-gradient(to right, transparent, hsl(166,72%,47%), hsl(28,87%,58%), transparent)' }}
                aria-hidden="true"
              />
              {/* Gradient bottom border accent — appears on hover */}
              <div
                className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover/veepo:opacity-100 transition-opacity duration-[260ms]"
                style={{ background: 'linear-gradient(to left, transparent, hsl(28,87%,58%), hsl(166,72%,47%), transparent)' }}
                aria-hidden="true"
              />
              {/* Shimmer sweep overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover/veepo:opacity-100 pointer-events-none"
                aria-hidden="true"
              >
                <div
                  className="absolute top-0 -left-full w-1/2 h-full skew-x-[-20deg] group-hover/veepo:animate-[shimmer-sweep_1.2s_ease-in-out_forwards]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
                />
              </div>
              {/* Hover outer glow */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover/veepo:opacity-100 transition-opacity duration-[400ms] pointer-events-none"
                style={{ boxShadow: '0 0 60px rgba(255,140,42,0.08), 0 0 120px rgba(46,175,75,0.04)' }}
                aria-hidden="true"
              />

              <div className="flex flex-col items-center text-center relative z-[1]">
                <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "hsl(0 0% 100% / 0.3)" }}>
                  This experience was crafted by
                </p>
                <div
                  className="w-8 h-[1px] mb-5"
                  style={{ background: 'linear-gradient(90deg, hsl(28,87%,58%), hsl(166,72%,47%))' }}
                  aria-hidden="true"
                />
                <img
                  src={veepoLogo}
                  alt="VeePo.ca"
                  className="h-12 md:h-16 w-auto mb-4 transition-all duration-[260ms] group-hover/veepo:drop-shadow-[0_0_20px_rgba(255,140,42,0.2)]"
                />
                <span className="text-[11px] tracking-[0.2em] uppercase group-hover/veepo:[color:hsl(166,72%,47%)] transition-colors duration-[180ms] mb-3" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
                  veepo.ca
                </span>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] tracking-[0.12em] italic" style={{ color: "hsl(0 0% 100% / 0.3)" }}>
                    Where vision meets precision
                  </p>
                  <span className="text-sm group-hover/veepo:[color:hsl(28,87%,58%)] transition-all duration-[180ms] group-hover/veepo:translate-x-1" style={{ color: "hsl(0 0% 100% / 0.25)" }} aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Legal links */}
          <div
            className={cn(
              "flex flex-col md:flex-row justify-between items-center gap-4 mb-10 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
          >
            <p className="text-[13px]" style={{ color: "hsl(0 0% 100% / 0.25)" }}>
              © {new Date().getFullYear()} Parker Gawryletz. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5 md:gap-7 text-[13px]">
              {[
                { to: "/privacy-policy", label: "Privacy" },
                { to: "/terms", label: "Terms" },
                { to: "/cookie-policy", label: "Cookies" },
                { to: "/accessibility", label: "Accessibility" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="transition-all duration-[180ms] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)]"
                  style={{ color: "hsl(0 0% 100% / 0.3)" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "hsl(var(--vow-yellow))")}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "hsl(0 0% 100% / 0.3)")}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* === Closing Covenant Bookend === */}
          <div
            data-footer-bookend
            className={cn(
              "flex flex-col items-center gap-5 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "650ms" : "0ms" }}
          >
            {/* Mini golden thread echo */}
            <div
              className={cn("h-[1px] w-8", isArrival ? "footer-breathe" : "")}
              style={{
                background: `linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / ${isArrival ? '0.3' : '0.2'}), transparent)`,
                boxShadow: isArrival ? '0 0 6px hsl(var(--vow-yellow) / 0.12)' : 'none',
              }}
              aria-hidden="true"
            />
            {/* Three Tempos golden dot */}
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-700",
                isArrival ? "golden-dot-breathe-arrival" : "golden-dot-breathe"
              )}
              style={{
                background: `hsl(var(--vow-yellow) / ${isArrival ? '0.75' : '0.5'})`,
              }}
              aria-hidden="true"
            />
            <p className="font-display text-base tracking-[0.04em]" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
              'Til Death
              <span
                style={{
                  color: "hsl(var(--vow-yellow) / 0.6)",
                  animation: "semicolon-heartbeat 2s ease-in-out infinite",
                }}
              >
                {" ; "}
              </span>
              Unto Life.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar spacer */}
      <div className="h-16 md:h-0" aria-hidden="true" />

      {/* === KEYFRAME ANIMATIONS === */}
      <style>{`
        @keyframes footer-particle-rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(var(--particle-drift, 0px));
            opacity: 0;
          }
        }
        @keyframes footer-status-pulse {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 4px hsl(var(--vow-yellow) / 0.2); }
          50% { opacity: 1; box-shadow: 0 0 8px hsl(var(--vow-yellow) / 0.4); }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(400%) skewX(-20deg); }
        }
      `}</style>
    </footer>
  );
}
