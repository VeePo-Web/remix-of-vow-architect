import { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListeningMovementProps {
  index: number;
  numeral: string;
  title: string;
  trackTitle: string;
  context: string;
  src: string;
  description: string;
  isActive: boolean;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlay: (index: number) => void;
  onPause: () => void;
  onInView: (index: number) => void;
}

/* ── Waveform — 30 bars with organic pseudo-random heights ── */
const WAVEFORM_BARS = 30;

// Seed-based heights that look like a real audio waveform preview
// Not uniform sine — varied peaks and valleys
const STATIC_HEIGHTS = Array.from({ length: WAVEFORM_BARS }, (_, i) => {
  // Create organic variation: center-weighted with irregular peaks
  const center = Math.abs(i - WAVEFORM_BARS / 2) / (WAVEFORM_BARS / 2);
  const base = 1 - center * 0.6; // Higher in center
  const noise = Math.sin(i * 2.1) * 0.3 + Math.cos(i * 3.7) * 0.2 + Math.sin(i * 0.8) * 0.15;
  return Math.max(4, Math.min(20, (base + noise) * 14));
});

// Animation target heights — varied, not all reaching 36px
const ANIM_HEIGHTS = Array.from({ length: WAVEFORM_BARS }, (_, i) => {
  const center = 1 - Math.abs(i - WAVEFORM_BARS / 2) / (WAVEFORM_BARS / 2);
  const noise = Math.sin(i * 1.4) * 0.2 + Math.cos(i * 2.9) * 0.15;
  return Math.max(8, Math.min(36, (center + noise + 0.4) * 28));
});

function WaveformBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-10" aria-hidden="true">
      {Array.from({ length: WAVEFORM_BARS }).map((_, i) => (
        <div
          key={i}
          className="w-[2.5px] rounded-full transition-colors duration-300"
          style={{
            background: isPlaying
              ? "hsl(var(--vow-yellow) / 0.65)"
              : "hsl(var(--foreground) / 0.1)",
            height: isPlaying
              ? undefined
              : `${STATIC_HEIGHTS[i]}px`,
            animation: isPlaying
              ? `waveform-bar 700ms ease-in-out ${i * 35}ms infinite alternate`
              : "none",
            // Custom max height per bar for organic animation
            ['--waveform-max' as string]: `${ANIM_HEIGHTS[i]}px`,
          }}
        />
      ))}
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ListeningMovement({
  index,
  numeral,
  title,
  trackTitle,
  context,
  description,
  isActive,
  isPlaying,
  progress,
  duration,
  onPlay,
  onPause,
  onInView,
}: ListeningMovementProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver for scroll-into-view detection
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            onInView(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onInView]);

  const handleToggle = useCallback(() => {
    if (isActive && isPlaying) {
      onPause();
    } else {
      onPlay(index);
    }
  }, [isActive, isPlaying, onPlay, onPause, index]);

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background numeral watermark — more visible */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display leading-none"
          style={{
            fontSize: "clamp(120px, 20vw, 260px)",
            fontWeight: 300,
            color: "hsl(var(--foreground) / 0.045)",
          }}
        >
          {numeral}
        </span>
      </div>

      {/* Radial golden glow — more visible when active */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-1000",
          isActive ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 50% 50%, hsl(var(--vow-yellow) / 0.09) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 max-w-xl mx-auto px-6 text-center transition-all duration-700",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        {/* Context label — tight coupling to headline */}
        <p
          className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] mb-3"
          style={{ color: "hsl(var(--vow-yellow) / 0.55)" }}
        >
          {context}
        </p>

        {/* Movement title */}
        <h2
          className="font-display font-semibold tracking-[-0.025em] leading-[1.1]"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "hsl(var(--foreground))" }}
        >
          {title}
        </h2>

        {/* Gold separator — balanced spacing */}
        <div
          className="mx-auto mt-7 mb-7"
          style={{
            width: "36px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, hsl(var(--vow-yellow) / 0.5), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Description */}
        <p
          className="font-display italic leading-[1.6] mb-14 max-w-[30ch] mx-auto"
          style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "hsl(var(--foreground) / 0.45)" }}
        >
          {description}
        </p>

        {/* ── Track Card — bespoke music player ── */}
        <div
          className={cn(
            "inline-flex flex-col items-center rounded-xl px-8 py-7 md:px-10 md:py-8",
            "backdrop-blur-[8px] transition-all duration-300"
          )}
          style={{
            background: isActive
              ? "hsl(var(--foreground) / 0.06)"
              : "hsl(var(--foreground) / 0.03)",
            border: isActive
              ? "1px solid hsl(var(--vow-yellow) / 0.15)"
              : "1px solid hsl(var(--foreground) / 0.06)",
          }}
        >
          {/* Track title — primary focal point */}
          <p
            className="font-display italic text-[17px] md:text-[19px] tracking-wide"
            style={{ color: "hsl(var(--foreground) / 0.85)" }}
          >
            {trackTitle}
          </p>

          {/* Attribution — bespoke arrangement credit */}
          <p
            className="font-sans text-[10px] uppercase tracking-[0.14em] mt-1.5 mb-6"
            style={{ color: "hsl(var(--foreground) / 0.2)" }}
          >
            Arranged by Parker Gawryletz
          </p>

          {/* Waveform — wider, organic */}
          <WaveformBars isPlaying={isActive && isPlaying} />

          {/* Play button + time — main interaction */}
          <div className="flex items-center gap-5 mt-6">
            <button
              onClick={handleToggle}
              className={cn(
                "listen-play-btn w-12 h-12 rounded-full flex items-center justify-center",
                "transition-all duration-[180ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)_/_0.4)]",
                isActive && isPlaying && "is-playing"
              )}
              style={{
                background: isActive && isPlaying
                  ? "hsl(var(--vow-yellow) / 0.9)"
                  : "hsl(var(--foreground) / 0.08)",
                color: isActive && isPlaying
                  ? "hsl(var(--vigil-void))"
                  : "hsl(var(--foreground) / 0.5)",
                boxShadow: isActive && isPlaying
                  ? "0 0 24px hsl(var(--vow-yellow) / 0.2)"
                  : "none",
              }}
              aria-label={isActive && isPlaying ? `Pause ${trackTitle}` : `Play ${trackTitle}`}
            >
              {isActive && isPlaying ? (
                <Pause size={18} strokeWidth={2} />
              ) : (
                <Play size={18} strokeWidth={2} className="ml-0.5" />
              )}
            </button>

            {isActive && (
              <span
                className="text-[12px] tabular-nums font-sans"
                style={{ color: "hsl(var(--foreground) / 0.35)" }}
              >
                {formatTime(progress)} &mdash; {formatTime(duration)}
              </span>
            )}
          </div>

          {/* Progress bar — golden gradient with glow head */}
          <div
            className="w-full mt-5 relative"
            style={{ minWidth: "200px" }}
          >
            <div
              className="w-full h-[2px] rounded-full overflow-hidden"
              style={{ background: "hsl(var(--foreground) / 0.05)" }}
            >
              <div
                className="h-full transition-none rounded-full"
                style={{
                  width: `${isActive ? progressPercent : 0}%`,
                  background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.4), hsl(var(--vow-yellow)))",
                }}
              />
            </div>
            {/* Glow head — the playhead indicator */}
            {isActive && progressPercent > 0 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-none"
                style={{
                  left: `${progressPercent}%`,
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "hsl(var(--vow-yellow))",
                  boxShadow: "0 0 8px hsl(var(--vow-yellow) / 0.5), 0 0 16px hsl(var(--vow-yellow) / 0.2)",
                  marginLeft: "-3px",
                }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
