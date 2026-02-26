import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import soundKeys from "@/assets/sound-cathedral-ai.jpg";
import { categories, allTracks } from "./PianoPanel";

/* ─── Mini waveform for active track ─── */
const miniBarHeights = [6, 10, 8, 5];
const miniBarOpacities = [0.6, 1, 0.8, 0.5];

function MiniWaveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[1.5px] h-[12px]" aria-hidden="true">
      {miniBarHeights.map((maxH, i) => (
        <div
          key={i}
          className="w-[1.5px] rounded-full"
          style={{
            height: active ? undefined : "3px",
            background: `hsl(var(--vow-yellow) / ${miniBarOpacities[i]})`,
            animation: active
              ? `sound-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Piano Strings (decorative) ─── */
const stringPositions = [
  8, 11, 14,
  28, 31, 34,
  50, 53, 56,
  72, 75, 78,
  92, 95,
];

function PianoStrings({ visible }: { visible: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[16px]" aria-hidden="true">
      {stringPositions.map((pct, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${pct}%`,
            width: "1px",
            background: `linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.18), hsl(var(--vow-yellow) / 0.06))`,
            opacity: visible ? 1 : 0,
            transition: "opacity 180ms ease-out",
            transitionDelay: visible ? `${100 + i * 12}ms` : "0ms",
          }}
        />
      ))}
      {/* Hammer rail */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "8px",
          height: "1px",
          background: `hsl(var(--vow-yellow) / 0.22)`,
          opacity: visible ? 1 : 0,
          transition: "opacity 180ms ease-out 120ms",
        }}
      />
      {/* Felt damper strip */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "20px",
          height: "2px",
          background: "hsl(var(--vow-yellow) / 0.10)",
          opacity: visible ? 1 : 0,
          transition: "opacity 180ms ease-out 160ms",
        }}
      />
      {/* Interior light gradient */}
      <div
        className="absolute inset-0 rounded-[16px]"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 60%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 260ms ease-out 80ms",
        }}
      />
    </div>
  );
}

/* ─── Now Playing Bar (sticky when scrolled away) ─── */
function NowPlayingBar({
  visible,
  trackTitle,
  categoryLabel,
  isPlaying,
  progress,
  duration,
}: {
  visible: boolean;
  trackTitle: string;
  categoryLabel: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
}) {
  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  const handleToggle = () => {
    (window as any).__sacredSoundToggle?.();
  };

  return (
    <div
      className={cn(
        "now-playing-bar",
        visible ? "now-playing-bar--visible" : ""
      )}
      aria-label="Now playing"
      role="region"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/5">
        <div
          className="h-full bg-[hsl(var(--vow-yellow))] transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleToggle}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all",
              isPlaying
                ? "bg-[hsl(var(--vow-yellow))] text-black"
                : "bg-foreground/10 text-foreground/70"
            )}
            style={{ transition: "all 180ms cubic-bezier(.22,.61,.36,1)" }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} className="ml-0.5" />}
          </button>
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--vow-yellow)/0.7)] block leading-none mb-0.5">
              {categoryLabel}
            </span>
            <span className="text-xs text-foreground/80 font-display truncate block">
              {trackTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function TheSound() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sectionInView, setSectionInView] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reduced motion
  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Track section visibility for mini-bar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || activeTrackIndex === null) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeTrackIndex, isPlaying]);

  // Expose for mini-bar
  useEffect(() => {
    (window as any).__sacredSoundToggle = togglePlayPause;
    return () => { delete (window as any).__sacredSoundToggle; };
  }, [togglePlayPause]);

  const handleTrackClick = useCallback((globalIndex: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = allTracks[globalIndex];
    if (!track?.src) return; // no audio file yet

    if (activeTrackIndex === globalIndex) {
      togglePlayPause();
    } else {
      audio.pause();
      audio.src = track.src;
      audio.load();
      setActiveTrackIndex(globalIndex);
      setProgress(0);
      setDuration(0);
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeTrackIndex, togglePlayPause]);

  // Find category label for active track
  const getActiveCategoryLabel = () => {
    if (activeTrackIndex === null) return "";
    let idx = 0;
    for (const cat of categories) {
      if (activeTrackIndex >= idx && activeTrackIndex < idx + cat.tracks.length) {
        return cat.label;
      }
      idx += cat.tracks.length;
    }
    return "";
  };

  const showMiniBar = isPlaying && !sectionInView && activeTrackIndex !== null;
  const activeTrack = activeTrackIndex !== null ? allTracks[activeTrackIndex] : null;

  // Build global index offset per category
  let globalOffset = 0;

  return (
    <>

      <audio ref={audioRef} preload="none" />

      <section
        ref={sectionRef}
        className="section--dark section-grain relative min-h-[400px] py-24 md:py-32 overflow-hidden"
        aria-labelledby="sound-heading"
      >
        {/* Top fade */}
        <div
          className="section-fade-top"
          style={{ background: 'linear-gradient(to top, transparent, hsl(45 25% 96%))' }}
          aria-hidden="true"
        />

        {/* Background image with Ken Burns */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            src={soundKeys}
            alt=""
            className="w-full h-full object-cover opacity-[0.12] pointer-events-none"
            loading="lazy"
            style={{
              filter: "saturate(0.6) contrast(1.1)",
              animation: reducedMotion ? "none" : "sound-ken-burns 30s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
        </div>

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(220 15% 4%) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Warm atmospheric fog */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, hsl(var(--vow-yellow) / 0.025) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Label */}
            <span
              className={cn(
                "inline-block text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              The Sound
            </span>

            {/* Headline */}
            <h2
              id="sound-heading"
              className={cn(
                "text-[clamp(28px,4vw,40px)] font-display font-light leading-tight text-foreground mb-4 text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms", textWrap: "balance" as any }}
            >
              Hear me play.
            </h2>

            {/* Subhead */}
            <p
              className={cn(
                "text-lg font-display font-light italic text-muted-foreground mb-12 text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              Browse. Listen. Imagine it at yours.
            </p>

            {/* Inline Listening Room */}
            <div
              className={cn(
                "max-w-md mx-auto rounded-[16px] relative overflow-hidden transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isVisible ? "450ms" : "0ms",
                background: "hsl(var(--rich-black))",
                borderTop: "1px solid hsl(var(--vow-yellow) / 0.18)",
                borderLeft: "1px solid hsl(var(--vow-yellow) / 0.10)",
                borderRight: "1px solid hsl(var(--vow-yellow) / 0.10)",
                borderBottom: "1px solid hsl(var(--vow-yellow) / 0.06)",
                boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3), 0 24px 80px rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
              }}
            >
              <PianoStrings visible={isVisible} />

              <div className="relative z-10 py-2">
                {categories.map((category, catIdx) => {
                  const startIndex = globalOffset;
                  const trackElements = category.tracks.map((track, tIdx) => {
                    const thisGlobalIndex = startIndex + tIdx;
                    const isActive = activeTrackIndex === thisGlobalIndex;
                    const isTrackPlaying = isActive && isPlaying;
                    const hasSrc = !!track.src;

                    return (
                      <button
                        key={track.title}
                        onClick={() => hasSrc ? handleTrackClick(thisGlobalIndex) : undefined}
                        className={cn(
                          "w-full flex items-center gap-3 h-10 px-5",
                          "font-display text-[15px] font-light tracking-tight",
                          "transition-colors duration-[180ms]",
                          isActive
                            ? "text-[hsl(var(--vow-yellow))]"
                            : hasSrc
                            ? "text-foreground/70 hover:text-foreground hover:bg-[hsl(var(--vow-yellow)/0.03)]"
                            : "text-foreground/30 cursor-default"
                        )}
                        style={{
                          background: isActive
                            ? "radial-gradient(ellipse at 20% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)"
                            : undefined,
                        }}
                        aria-label={isTrackPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                      >
                        {/* Accent bar */}
                        <span
                          className="flex-shrink-0"
                          style={{
                            width: "2px",
                            height: isActive ? "16px" : "3px",
                            borderRadius: "1px",
                            background: isActive ? "hsl(var(--vow-yellow))" : "transparent",
                            transform: isActive ? "scaleY(1)" : "scaleY(0)",
                            transition: "transform 180ms cubic-bezier(0.22,0.61,0.36,1), height 180ms cubic-bezier(0.22,0.61,0.36,1), background 120ms",
                          }}
                        />
                        <span className="flex-1 text-left truncate">
                          {track.title}
                        </span>
                        {isActive && <MiniWaveform active={isTrackPlaying} />}
                      </button>
                    );
                  });
                  globalOffset = startIndex + category.tracks.length;

                  return (
                    <div key={category.id}>
                      <div className="px-5 pt-5 pb-2">
                        <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                          {category.label}
                        </span>
                        <div
                          className="mt-1.5"
                          style={{
                            height: "1px",
                            background: "linear-gradient(to right, transparent 0%, hsl(var(--vow-yellow) / 0.14) 40%, hsl(var(--vow-yellow) / 0.14) 60%, transparent 100%)",
                          }}
                        />
                      </div>
                      {trackElements}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Closing Caption */}
            <div
              className={cn(
                "max-w-lg mx-auto text-center mt-16 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            >
              {/* Golden thread */}
              <div
                className="mx-auto mb-6"
                style={{
                  width: "48px",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, hsl(var(--vow-yellow) / 0.5), transparent)",
                }}
                aria-hidden="true"
              />
              <p className="text-base font-display font-light italic text-muted-foreground">
                Every piece I play begins the same way — with someone in mind.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="section-fade-bottom"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(220 15% 8%))' }}
          aria-hidden="true"
        />
      </section>

      {/* Floating Now Playing Mini-Bar */}
      <NowPlayingBar
        visible={showMiniBar}
        trackTitle={activeTrack?.title ?? ""}
        categoryLabel={getActiveCategoryLabel()}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
      />
    </>
  );
}
