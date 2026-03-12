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

const WAVEFORM_BARS = 20;

function WaveformBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2.5px] h-10" aria-hidden="true">
      {Array.from({ length: WAVEFORM_BARS }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-[3px] rounded-full transition-colors duration-300",
            isPlaying ? "bg-primary" : "bg-foreground/15"
          )}
          style={{
            height: isPlaying
              ? undefined
              : `${6 + Math.sin(i * 0.7) * 5}px`,
            animation: isPlaying
              ? `waveform-bar 700ms ease-in-out ${i * 40}ms infinite alternate`
              : "none",
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
      {/* Background numeral watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display text-[20vw] md:text-[16vw] leading-none text-foreground opacity-[0.03]"
          style={{ fontWeight: 300 }}
        >
          {numeral}
        </span>
      </div>

      {/* Radial golden glow */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-1000",
          isActive ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 50% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)",
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
        {/* Context label */}
        <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-primary opacity-70 mb-4">
          {context}
        </p>

        {/* Movement title */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
          {title}
        </h2>

        {/* Golden rule */}
        <div className="chapter-rule mx-auto mb-6" />

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          {description}
        </p>

        {/* Track card */}
        <div
          className={cn(
            "inline-flex flex-col items-center gap-5 rounded-lg p-6 md:p-8",
            "border backdrop-blur-[8px] transition-all duration-300",
            isActive
              ? "bg-card/20 border-primary/25"
              : "bg-card/8 border-border/15"
          )}
        >
          {/* Track title */}
          <p className="font-display text-lg md:text-xl text-foreground">
            {trackTitle}
          </p>

          {/* Waveform */}
          <WaveformBars isPlaying={isActive && isPlaying} />

          {/* Play button + time */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggle}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-[180ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                isActive && isPlaying
                  ? "bg-primary text-primary-foreground hover:scale-[1.06]"
                  : "bg-foreground opacity-10 text-foreground hover:opacity-20 hover:scale-[1.06]"
              )}
              aria-label={isActive && isPlaying ? `Pause ${trackTitle}` : `Play ${trackTitle}`}
            >
              {isActive && isPlaying ? (
                <Pause size={18} strokeWidth={2} />
              ) : (
                <Play size={18} strokeWidth={2} className="ml-0.5" />
              )}
            </button>

            {isActive && (
              <span className="text-xs tabular-nums text-muted-foreground opacity-60 font-sans">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
            )}
          </div>

          {/* Progress bar — golden gradient */}
          <div className="w-full h-[2px] bg-foreground/5 rounded-full overflow-hidden">
            <div
              className="h-full transition-none rounded-full"
              style={{
                width: `${isActive ? progressPercent : 0}%`,
                background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.5), hsl(var(--vow-yellow)))",
                boxShadow: isActive ? "0 0 6px hsl(var(--vow-yellow) / 0.3)" : "none",
              }}
            />
          </div>
        </div>
      </div>

    </section>
  );
}
