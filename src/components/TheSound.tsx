import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import soundKeys from "@/assets/sound-cathedral-ai.jpg";
import soundBokeh from "@/assets/sound-bokeh-ai.jpg";
import soundKeysIntimate from "@/assets/sound-keys-intimate-ai.jpg";
import { categories, allTracks } from "./PianoPanel";
import { Link } from "react-router-dom";

/* ─── Category emotional context phrases ─── */
const categoryContext: Record<string, string> = {
  hymns: "For the weight of what is sacred",
  worship: "For the praise that carries you",
  pop: "For the love song that is yours",
  classical: "For the timeless and the elegant",
  film: "For the story you are writing",
};

/* ─── Mini waveform for active track ─── */
const miniBarHeights = [6, 10, 8, 5];
const miniBarOpacities = [0.6, 1, 0.8, 0.5];

function MiniWaveform({ active, reducedMotion = false }: { active: boolean; reducedMotion?: boolean }) {
  return (
    <div className="flex items-center gap-[1.5px] h-[12px]" aria-hidden="true">
      {miniBarHeights.map((maxH, i) => (
        <div
          key={i}
          className="w-[1.5px] rounded-full"
          style={{
            height: active && !reducedMotion ? undefined : "3px",
            background: `hsl(var(--vow-yellow) / ${miniBarOpacities[i]})`,
            animation: active && !reducedMotion
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

  // Step 5: Title crossfade
  const [displayTitle, setDisplayTitle] = useState(trackTitle);
  const [displayCategory, setDisplayCategory] = useState(categoryLabel);
  const [titleFade, setTitleFade] = useState(true);

  useEffect(() => {
    if (trackTitle === displayTitle && categoryLabel === displayCategory) return;
    setTitleFade(false);
    const timer = setTimeout(() => {
      setDisplayTitle(trackTitle);
      setDisplayCategory(categoryLabel);
      setTitleFade(true);
    }, 120);
    return () => clearTimeout(timer);
  }, [trackTitle, categoryLabel, displayTitle, displayCategory]);

  const handleToggle = () => {
    (window as any).__sacredSoundToggle?.();
  };

  return (
    <div
      className={cn(
        "now-playing-bar",
        visible ? "now-playing-bar--visible" : ""
      )}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "hsl(var(--rich-black) / 0.92)",
        borderTop: "1px solid hsl(var(--vow-yellow) / 0.1)",
      }}
      aria-label="Now playing"
      role="region"
    >
      {/* Step 1: Seekable progress bar */}
      <div
        className="absolute top-0 left-0 right-0 h-3 cursor-pointer group/seek -translate-y-1"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          (window as any).__sacredSoundSeek?.(pct);
        }}
        role="slider"
        aria-label="Seek"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          const step = 0.05;
          if (e.key === "ArrowRight") {
            e.preventDefault();
            (window as any).__sacredSoundSeek?.(Math.min(1, percent / 100 + step));
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            (window as any).__sacredSoundSeek?.(Math.max(0, percent / 100 - step));
          } else if (e.key === "Home") {
            e.preventDefault();
            (window as any).__sacredSoundSeek?.(0);
          } else if (e.key === "End") {
            e.preventDefault();
            (window as any).__sacredSoundSeek?.(1);
          }
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/5 group-hover/seek:h-[4px] transition-all duration-150 relative">
          <div
            className="h-full bg-[hsl(var(--vow-yellow))] transition-none"
            style={{ width: `${percent}%` }}
          />
          {/* Seek head dot */}
          <div
            className="absolute top-1/2 w-[6px] h-[6px] rounded-full bg-[hsl(var(--vow-yellow))] opacity-0 group-hover/seek:opacity-100 transition-opacity duration-150"
            style={{ left: `${percent}%`, transform: 'translate(-50%, -50%)', boxShadow: '0 0 4px hsl(var(--vow-yellow) / 0.4)' }}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleToggle}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.4)]",
              isPlaying
                ? "bg-[hsl(var(--vow-yellow))] text-black"
                : "bg-foreground/10 text-foreground/70"
            )}
            style={{ transition: "all 180ms cubic-bezier(.22,.61,.36,1)" }}
            aria-label={isPlaying ? "Pause" : "Play"}
            title={isPlaying ? "Pause playback" : "Resume playback"}
          >
            {isPlaying ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} className="ml-0.5" />}
          </button>
          {/* Step 5: Crossfade text */}
          <div className="min-w-0" style={{ opacity: titleFade ? 1 : 0, transition: "opacity 120ms ease" }}>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--vow-yellow)/0.7)] block leading-none mb-0.5">
              {displayCategory}
            </span>
            <span className="text-xs text-foreground/80 font-display truncate block">
              {displayTitle}
            </span>
          </div>
        </div>
        <span className="text-[9px] text-foreground/30 font-mono tabular-nums shrink-0 ml-1">
          {formatTime(progress)}/{formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
/* ─── Format time helper ─── */
const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export function TheSound() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const { ref: cardZoneRef, isVisible: cardVisible } = useScrollReveal({ threshold: 0.3 });
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollReveal({ threshold: 0.5 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  const [sectionInView, setSectionInView] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Escape key to stop playback
  useEffect(() => {
    if (!isPlaying) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isPlaying]);

  // Scroll-to-active track
  useEffect(() => {
    if (activeTrackIndex === null || !trackListRef.current) return;
    const activeButton = trackListRef.current.querySelector('[aria-current="true"]');
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeTrackIndex]);

  // Reduced motion — live listener
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Scroll-linked parallax on background image
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const raw = -rect.top * 0.05;
      setScrollOffset(Math.max(-40, Math.min(40, raw)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion, sectionRef]);


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

  // Step 1: Expose seek function for NowPlayingBar
  useEffect(() => {
    (window as any).__sacredSoundSeek = (pct: number) => {
      const audio = audioRef.current;
      if (audio && duration > 0) {
        audio.currentTime = pct * duration;
        setProgress(pct * duration);
      }
    };
    return () => { delete (window as any).__sacredSoundSeek; };
  }, [duration]);

  const handleTrackClick = useCallback((globalIndex: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = allTracks[globalIndex];
    if (!track?.src) return;

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
        id="the-sound"
        ref={sectionRef}
        className="section--dark section-grain piano-section-target relative min-h-[400px] py-24 md:py-32 overflow-hidden"
        aria-labelledby="sound-heading"
      >
        {/* Top fade */}
        <div
          className="section-fade-top"
          style={{ background: 'linear-gradient(to top, transparent, hsl(220 15% 8%))' }}
          aria-hidden="true"
        />

        {/* ── Step 1: Enhanced atmospheric layers ── */}

        {/* Background image — increased opacity */}
        <div
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
          style={{
            transform: reducedMotion ? "none" : `translateY(${scrollOffset}px)`,
            willChange: reducedMotion ? "auto" : "transform",
          }}
        >
          <img
            src={soundKeys}
            alt=""
            className="w-full h-full object-cover opacity-[0.18] pointer-events-none"
            loading="lazy"
            style={{
              filter: "saturate(0.6) contrast(1.1)",
              animation: reducedMotion || !sectionInView ? "none" : "sound-ken-burns 30s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
        </div>

        {/* Cinematic vignette — tighter center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 25%, hsl(220 15% 4%) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Warm floor — candlelight pooling */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 60%, hsl(30 40% 12% / 0.15) 0%, transparent 70%)",
            backgroundAttachment: "fixed",
          }}
          aria-hidden="true"
        />

        {/* Top light leak */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.03) 0%, transparent 20%)",
          }}
          aria-hidden="true"
        />

        {/* Golden bokeh overlay — screen blend for warmth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img
            src={soundBokeh}
            alt=""
            className="w-full h-full object-cover opacity-[0.06] pointer-events-none"
            loading="lazy"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

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

        {/* Dust mote layer */}
        <div
          className="absolute inset-0 pointer-events-none sound-dust"
          style={{
            background: "radial-gradient(ellipse 40% 30% at 35% 40%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)",
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
              {/* Step 3: Note bloom */}
              <span
                className="inline-block ml-2 align-middle"
                style={{
                  opacity: isVisible ? 0.4 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.5)",
                  transition: "opacity 900ms ease 600ms, transform 900ms ease 600ms",
                  filter: isVisible ? "drop-shadow(0 0 6px hsl(var(--vow-yellow) / 0.3))" : "none",
                }}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[hsl(var(--vow-yellow))]">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </span>
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

            {/* ── Golden thread — responds to playback state ── */}
            <div
              className={cn(
                "mx-auto mb-8 relative transition-all duration-700",
                isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              )}
              style={{
                width: "1px",
                height: isPlaying ? "56px" : "48px",
                transformOrigin: "top",
                transitionDelay: isVisible ? "380ms" : "0ms",
                transition: "opacity 700ms ease, transform 700ms ease, height 400ms ease",
              }}
              aria-hidden="true"
            >
              {/* Top anchor dot */}
              <div
                className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full"
                style={{
                  background: `hsl(var(--vow-yellow) / ${isPlaying ? 1 : 0.7})`,
                  animation: reducedMotion ? "none" : `exhale-pulse ${isPlaying ? "2.8s" : "4.2s"} cubic-bezier(0.4,0,0.6,1) infinite`,
                  transition: "background 700ms ease",
                }}
              />
              {/* Thread line */}
              <div
                className="absolute inset-0 sound-thread"
                style={{
                  background: isPlaying
                    ? "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.7), hsl(var(--vow-yellow) / 0.2))"
                    : "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.4), hsl(var(--vow-yellow) / 0.08))",
                  filter: isPlaying ? "drop-shadow(0 0 3px hsl(var(--vow-yellow) / 0.15))" : "none",
                  transition: "background 700ms ease, filter 700ms ease",
                }}
              />
              {/* Bottom anchor dot */}
              <div
                className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full"
                style={{
                  background: `hsl(var(--vow-yellow) / ${isPlaying ? 0.7 : 0.4})`,
                  animation: reducedMotion ? "none" : `exhale-pulse ${isPlaying ? "2.8s" : "4.2s"} cubic-bezier(0.4,0,0.6,1) infinite 2.1s`,
                  transition: "background 700ms ease",
                }}
              />
            </div>

            {/* ── Zone B: Card + Closing (independent scroll reveal) ── */}
            <div ref={cardZoneRef as React.RefObject<HTMLDivElement>}>

            {/* ── Step 2: Wider card with category context ── */}
            <div
              role="group"
              aria-label="Repertoire — browse and play tracks"
              className="max-w-lg mx-4 sm:mx-auto rounded-[16px] relative overflow-hidden"
              style={{
                opacity: cardVisible ? 1 : 0,
                transform: cardVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
                transition: "opacity 800ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 800ms cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), border-color 700ms ease",
                background: "hsl(var(--rich-black))",
                borderTop: `1px solid hsl(var(--vow-yellow) / ${isPlaying ? 0.28 : 0.18})`,
                borderLeft: `1px solid hsl(var(--vow-yellow) / ${isPlaying ? 0.16 : 0.10})`,
                borderRight: `1px solid hsl(var(--vow-yellow) / ${isPlaying ? 0.16 : 0.10})`,
                borderBottom: `1px solid hsl(var(--vow-yellow) / ${isPlaying ? 0.10 : 0.06})`,
                boxShadow: isPlaying
                  ? "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3), 0 24px 80px rgba(0,0,0,0.5), 0 0 40px hsl(var(--vow-yellow) / 0.08)"
                  : "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3), 0 24px 80px rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                animation: !isPlaying && !reducedMotion && sectionInView ? "sound-card-breathe 6s cubic-bezier(0.4,0,0.6,1) infinite" : "none",
                animationDelay: cardVisible ? "900ms" : "0ms",
              }}
            >
              {/* Card header — "Repertoire" label with piano keys strip */}
              <div className="relative h-12 overflow-hidden">
                <img src={soundKeysIntimate} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08]" loading="lazy" aria-hidden="true" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--rich-black)) 100%)" }} aria-hidden="true" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/35 font-sans">
                    Repertoire
                  </span>
                </div>
                {/* Golden rule "lid seal" */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px"
                  style={{ background: "linear-gradient(to right, transparent, hsl(var(--vow-yellow) / 0.2), transparent)" }}
                  aria-hidden="true"
                />
              </div>

              <PianoStrings visible={cardVisible} />
              {/* Inner depth shadow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[16px] z-[1]"
                style={{
                  boxShadow: "inset 0 8px 20px rgba(0,0,0,0.12), inset 0 -4px 12px rgba(0,0,0,0.06)",
                }}
                aria-hidden="true"
              />

              <div ref={trackListRef} className="relative z-10 py-2 max-h-[55vh] overflow-y-auto sound-card-scroll">
                {categories.map((category, catIdx) => {
                  const startIndex = globalOffset;
                  const contextPhrase = categoryContext[category.id] || "";
                  const trackElements = category.tracks.map((track, tIdx) => {
                    const thisGlobalIndex = startIndex + tIdx;
                    const isActive = activeTrackIndex === thisGlobalIndex;
                    const isTrackPlaying = isActive && isPlaying;
                    const hasSrc = !!track.src;

                    const pct = isActive && duration > 0 ? (progress / duration) * 100 : 0;

                    return (
                      <button
                        key={track.title}
                        onClick={() => hasSrc ? handleTrackClick(thisGlobalIndex) : undefined}
                        className={cn(
                          "track-button group w-full flex items-center gap-3 min-h-[48px] sm:h-11 px-4 sm:px-5 relative",
                          "font-display text-[15px] font-light tracking-normal",
                          "transition-all duration-[180ms]",
                          isActive
                            ? "text-[hsl(var(--vow-yellow))] track-button--active"
                            : hasSrc
                            ? "text-foreground/70 hover:text-foreground hover:bg-[hsl(var(--vow-yellow)/0.03)] hover:shadow-[inset_2px_0_8px_hsl(var(--vow-yellow)/0.04)]"
                            : "text-foreground/35 cursor-default track-button--coming-soon"
                        )}
                        style={{
                          background: isActive
                            ? "radial-gradient(ellipse at 20% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)"
                            : undefined,
                        }}
                        aria-label={isTrackPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {/* Accent bar */}
                        <span
                          className="track-bar flex-shrink-0"
                          style={{
                            width: "2px",
                            height: isActive ? "16px" : "8px",
                            borderRadius: "1px",
                            background: isActive ? "hsl(var(--vow-yellow))" : "hsl(var(--vow-yellow) / 0.3)",
                            transform: isActive ? "scaleY(1)" : "scaleY(0)",
                            transition: "transform 180ms cubic-bezier(0.22,0.61,0.36,1), height 180ms cubic-bezier(0.22,0.61,0.36,1), background 120ms",
                          }}
                        />
                        {/* Step 2: Track number for inactive tracks */}
                        {!isActive && (
                          <span className="text-[10px] font-mono text-foreground/20 tabular-nums w-5 shrink-0 text-right">
                            {String(tIdx + 1).padStart(2, "0")}
                          </span>
                        )}
                        <span className="flex-1 text-left truncate">
                          {track.title}
                        </span>
                        {/* Step 4: Graceful empty state */}
                        {isActive && hasSrc && <MiniWaveform active={isTrackPlaying} reducedMotion={reducedMotion} />}
                        {!hasSrc && !isActive && (
                          <span className="hidden sm:inline text-[9px] uppercase tracking-[0.2em] text-foreground/20 shrink-0">
                            Coming Soon
                          </span>
                        )}
                        {/* Progress underline */}
                        {isActive && hasSrc && (
                          <div
                            className="absolute bottom-0 left-0 right-0 h-[1px]"
                            style={{
                              background: `linear-gradient(to right, hsl(var(--vow-yellow) / 0.4) ${pct}%, transparent ${pct}%)`,
                            }}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  });
                  globalOffset = startIndex + category.tracks.length;

                  return (
                    <div key={category.id}>
                      {/* Category divider between groups */}
                      {catIdx > 0 && (
                        <div
                          className="flex justify-center py-2"
                          style={{
                            opacity: cardVisible ? 1 : 0,
                            transition: "opacity 400ms ease",
                            transitionDelay: cardVisible ? `${100 + (catIdx - 0.5) * 80}ms` : "0ms",
                          }}
                          aria-hidden="true"
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "1px",
                              background: "linear-gradient(to right, transparent, hsl(var(--vow-yellow) / 0.2), transparent)",
                            }}
                          />
                        </div>
                      )}
                      <div
                        className="px-4 sm:px-5 pt-4 sm:pt-5 pb-1"
                        style={{
                          opacity: cardVisible ? 1 : 0,
                          transform: cardVisible ? "translateY(0)" : "translateY(6px)",
                          transition: "opacity 500ms ease, transform 500ms ease",
                          transitionDelay: cardVisible ? `${100 + catIdx * 80}ms` : "0ms",
                          background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.02), transparent)",
                        }}
                      >
                        <span
                          role="heading"
                          aria-level={3}
                          className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60"
                        >
                          {category.label}
                        </span>
                        {/* Emotional context phrase — hidden on mobile */}
                        {contextPhrase && (
                          <span className="hidden sm:block font-display text-xs italic text-foreground/30 mt-0.5">
                            {contextPhrase}
                          </span>
                        )}
                        <div
                          className="mt-2"
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

                {/* Step 4: Footer conversion note */}
                <div className="px-5 pt-4 pb-5 text-center">
                  <p className="text-[11px] text-foreground/25 italic font-display">
                    Recordings arriving soon.{" "}
                     <Link
                      to="/contact"
                      className="underline decoration-foreground/10 hover:decoration-[hsl(var(--vow-yellow)/0.3)] hover:text-[hsl(var(--vow-yellow)/0.6)] transition-all duration-[260ms]"
                    >
                      Request a live preview at your consultation.
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* ── Step 5: Closing Caption with glow + bookend diamond ── */}
            <div
              ref={quoteRef as React.RefObject<HTMLDivElement>}
              className="max-w-lg mx-auto text-center mt-16 md:mt-20 relative"
              style={{
                opacity: quoteVisible ? 1 : 0,
                transform: quoteVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 1000ms ease, transform 1000ms ease",
                transitionDelay: quoteVisible ? "200ms" : "0ms",
              }}
            >
              {/* Warm glow behind text */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--vow-yellow) / 0.03) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              {/* Wider golden thread separator */}
              <div className="relative mx-auto mb-6" style={{ width: "64px", height: "1px" }} aria-hidden="true">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, transparent, hsl(var(--vow-yellow) / 0.5), transparent)",
                  }}
                />
                {/* Breathing diamond */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: "3px",
                    height: "3px",
                    background: "hsl(var(--vow-yellow) / 0.6)",
                    animation: reducedMotion ? "none" : "divider-diamond-breathe 4.2s cubic-bezier(0.4,0,0.6,1) infinite, diamond-turn 4.2s ease-in-out infinite",
                  }}
                />
              </div>
              <blockquote className="relative z-10" cite="Parker Allard">
                <p className="text-lg font-display font-light italic text-foreground/80 transition-all duration-300 blockquote-warm">
                  Every piece I play begins the same way — with someone in mind.
                </p>
                <footer className="mt-3">
                  <cite className="text-[11px] uppercase tracking-[0.2em] text-foreground/25 not-italic font-sans">
                    — Parker Allard
                  </cite>
                </footer>
              </blockquote>
            </div>

            </div>{/* End Zone B */}
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
