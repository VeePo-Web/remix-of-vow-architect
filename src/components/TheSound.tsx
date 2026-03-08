import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import soundKeys from "@/assets/sound-cathedral-ai.jpg";
import soundBokeh from "@/assets/sound-bokeh-ai.jpg";
import genreHymns from "@/assets/genre-hymns.jpg";
import genreWorship from "@/assets/genre-worship.jpg";
import genrePop from "@/assets/genre-pop.jpg";
import genreClassical from "@/assets/genre-classical.jpg";
import genreFilm from "@/assets/genre-film.jpg";
import { categories, allTracks } from "./PianoPanel";
import { GenreCard } from "./GenreCard";
import { GenreTrackPanel } from "./GenreTrackPanel";

/* ─── Genre images map ─── */
const genreImages: Record<string, string> = {
  hymns: genreHymns,
  worship: genreWorship,
  pop: genrePop,
  classical: genreClassical,
  film: genreFilm,
};

/* ─── Category emotional context ─── */
const categoryContext: Record<string, string> = {
  hymns: "For the weight of what is sacred",
  worship: "For the praise that carries you",
  pop: "For the love song that is yours",
  classical: "For the timeless and the elegant",
  film: "For the story you are writing",
};

/* ─── Format time helper ─── */
const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

/* ─── Now Playing Bar ─── */
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
      className={cn("now-playing-bar", visible ? "now-playing-bar--visible" : "")}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "hsl(var(--rich-black) / 0.92)",
        borderTop: "1px solid hsl(var(--vow-yellow) / 0.1)",
        boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 0 20px hsl(var(--vow-yellow) / 0.03)",
      }}
      aria-label="Now playing"
      role="region"
    >
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
          if (e.key === "ArrowRight") { e.preventDefault(); (window as any).__sacredSoundSeek?.(Math.min(1, percent / 100 + step)); }
          else if (e.key === "ArrowLeft") { e.preventDefault(); (window as any).__sacredSoundSeek?.(Math.max(0, percent / 100 - step)); }
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/5 group-hover/seek:h-[4px] transition-all duration-150 relative">
          <div className="h-full bg-[hsl(var(--vow-yellow))] transition-none" style={{ width: `${percent}%` }} />
          <div
            className={cn(
              "absolute top-1/2 w-[6px] h-[6px] rounded-full bg-[hsl(var(--vow-yellow))] transition-opacity duration-150",
              isPlaying ? "opacity-0 group-hover/seek:opacity-100" : "opacity-80"
            )}
            style={{
              left: `${percent}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 4px hsl(var(--vow-yellow) / 0.4)",
              animation: !isPlaying ? "golden-dot-idle 6s cubic-bezier(0.4,0,0.6,1) infinite" : undefined,
            }}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleToggle}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.4)]",
              isPlaying ? "bg-[hsl(var(--vow-yellow))] text-background" : "text-foreground/70"
            )}
            style={{ transition: "all 180ms cubic-bezier(.22,.61,.36,1)", background: isPlaying ? undefined : "linear-gradient(135deg, hsl(0 0% 100% / 0.06), hsl(var(--vow-yellow) / 0.04))" }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={12} strokeWidth={2} /> : <Play size={12} strokeWidth={2} className="ml-0.5" />}
          </button>
          <div className="min-w-0" style={{ opacity: titleFade ? 1 : 0, transition: "opacity 120ms ease" }}>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--vow-yellow)/0.7)] block leading-none mb-0.5">
              {displayCategory}
            </span>
            <span className="text-xs text-foreground/80 font-display truncate block">{displayTitle}</span>
          </div>
        </div>
        <span className="text-[9px] text-foreground/30 font-mono tabular-nums shrink-0 ml-1">
          {formatTime(progress)}/{formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main Section — The Sound (Genre Card Grid)
   ═══════════════════════════════════════════════ */
export function TheSound() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.3 });
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollReveal({ threshold: 0.5 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sectionInView, setSectionInView] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const parallaxLeakRef = useRef<HTMLDivElement>(null);

  // Reduced motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Scroll parallax — direct DOM mutation, zero re-renders
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = Math.max(-40, Math.min(40, -rect.top * 0.05));
        if (parallaxBgRef.current) parallaxBgRef.current.style.transform = `translateY(${offset}px)`;
        if (parallaxLeakRef.current) parallaxLeakRef.current.style.transform = `translateY(${offset * 0.6}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion, sectionRef]);

  // Section in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setSectionInView(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionRef]);

  // Audio events
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

  // Escape to stop
  useEffect(() => {
    if (!isPlaying) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") { audioRef.current?.pause(); setIsPlaying(false); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isPlaying]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || activeTrackIndex === null) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().catch(() => {}); setIsPlaying(true); }
  }, [activeTrackIndex, isPlaying]);

  // Expose for mini bar
  useEffect(() => {
    (window as any).__sacredSoundToggle = togglePlayPause;
    return () => { delete (window as any).__sacredSoundToggle; };
  }, [togglePlayPause]);

  useEffect(() => {
    (window as any).__sacredSoundSeek = (pct: number) => {
      const audio = audioRef.current;
      if (audio && duration > 0) { audio.currentTime = pct * duration; setProgress(pct * duration); }
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

  const handleGenreClick = useCallback((categoryId: string) => {
    setActiveCategory(prev => prev === categoryId ? null : categoryId);
  }, []);

  // Find active category info
  const getActiveCategoryLabel = () => {
    if (activeTrackIndex === null) return "";
    let idx = 0;
    for (const cat of categories) {
      if (activeTrackIndex >= idx && activeTrackIndex < idx + cat.tracks.length) return cat.label;
      idx += cat.tracks.length;
    }
    return "";
  };

  // Get global start index for a category
  const getGlobalStartIndex = (categoryId: string) => {
    let idx = 0;
    for (const cat of categories) {
      if (cat.id === categoryId) return idx;
      idx += cat.tracks.length;
    }
    return 0;
  };

  // Check if any track in a category is playing
  const isCategoryPlaying = (categoryId: string) => {
    if (activeTrackIndex === null || !isPlaying) return false;
    const start = getGlobalStartIndex(categoryId);
    const cat = categories.find(c => c.id === categoryId);
    if (!cat) return false;
    return activeTrackIndex >= start && activeTrackIndex < start + cat.tracks.length;
  };

  const showMiniBar = isPlaying && !sectionInView && activeTrackIndex !== null;
  const activeTrack = activeTrackIndex !== null ? allTracks[activeTrackIndex] : null;
  const activeCat = activeCategory ? categories.find(c => c.id === activeCategory) : null;

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <section
        id="the-sound"
        ref={sectionRef}
        className="section--dark section-grain piano-section-target relative py-24 md:py-32 overflow-hidden"
        aria-labelledby="sound-heading"
      >
        {/* Top fade */}
        <div className="section-fade-top" style={{ background: "linear-gradient(to top, transparent, hsl(var(--rich-black)))" }} aria-hidden="true" />

        {/* Background image */}
        <div ref={parallaxBgRef} className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ willChange: "transform" }}>
          <img
            src={soundKeys}
            alt=""
            className="w-full h-full object-cover opacity-[0.12] pointer-events-none"
            loading="lazy"
            decoding="async"
            style={{ filter: "saturate(0.5) contrast(1.1)" }}
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 25%, hsl(var(--transform-dark)) 100%)" }} aria-hidden="true" />

        {/* Warm floor */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, hsl(var(--events-dark) / 0.15) 0%, transparent 70%)" }} aria-hidden="true" />

        {/* Bokeh overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img src={soundBokeh} alt="" className="w-full h-full object-cover opacity-[0.05] pointer-events-none" loading="lazy" decoding="async" style={{ mixBlendMode: "screen" }} />
        </div>

        {/* Film grain overlay */}
        <div className="grain absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true" />

        {/* Breathing warm glow — 4s cycle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--vow-yellow) / 0.04) 0%, transparent 70%)",
            animation: reducedMotion ? "none" : "exhale-pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
          aria-hidden="true"
        />

        {/* Warm light leak layer — secondary parallax */}
        <div
          ref={parallaxLeakRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 40% 30%, hsl(35 50% 50% / 0.03) 0%, transparent 70%)",
            willChange: "transform",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Screen reader narrative */}
          <span className="sr-only">
            Listen to sample recordings across five genres — hymns, worship, pop, classical, and film score — each arranged specifically for wedding ceremonies. Select a genre to explore tracks.
          </span>
          <div className="max-w-5xl mx-auto text-center">
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
                "text-[clamp(28px,4vw,40px)] font-display font-light leading-tight text-foreground mb-5 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              Hear me play.
            </h2>
            <div
              className={cn(
                "mx-auto mb-8 transition-all duration-[450ms]",
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
              style={{ width: "64px", height: "1px", transitionDelay: isVisible ? "350ms" : "0ms" }}
              aria-hidden="true"
            >
              <div className="w-full h-full" style={{ background: "linear-gradient(to right, transparent, hsl(var(--vow-yellow) / 0.4), transparent)" }} />
            </div>

            {/* Subhead */}
            <p
              className={cn(
                "max-w-md mx-auto text-lg font-sans text-muted-foreground mb-20 text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              Five rooms. One instrument. Your ceremony.
            </p>

            {/* ── Genre Card Grid ── */}
            <div ref={gridRef as React.RefObject<HTMLDivElement>}>
              <div
                className={cn(
                  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto transition-all duration-700",
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: gridVisible ? "200ms" : "0ms" }}
                role="group"
                aria-label="Genre selection"
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const buttons = Array.from(
                    e.currentTarget.querySelectorAll<HTMLButtonElement>("button.genre-card")
                  );
                  const currentIdx = buttons.indexOf(document.activeElement as HTMLButtonElement);
                  if (currentIdx === -1) return;
                  const nextIdx = e.key === "ArrowRight"
                    ? (currentIdx + 1) % buttons.length
                    : (currentIdx - 1 + buttons.length) % buttons.length;
                  buttons[nextIdx]?.focus();
                }}
              >
                {categories.map((cat, i) => (
                  <div
                    key={cat.id}
                    className={cn(
                      "transition-all duration-500",
                      gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                      i === 4 && "col-span-2 md:col-span-1 justify-self-center max-w-[calc(50%-0.375rem)] md:max-w-none"
                    )}
                    style={{
                      transitionDelay: gridVisible ? `${300 + i * 80}ms` : "0ms",
                    }}
                  >
                    <GenreCard
                      id={cat.id}
                      label={cat.label}
                      context={categoryContext[cat.id] || ""}
                      image={genreImages[cat.id] || ""}
                      isActive={activeCategory === cat.id}
                      isPlaying={isCategoryPlaying(cat.id)}
                      trackCount={cat.tracks.length}
                      reducedMotion={reducedMotion}
                      onClick={() => handleGenreClick(cat.id)}
                    />
                  </div>
                ))}
              </div>

              {/* ── Breathing Golden Thread Connector ── */}
              {activeCat && (
                <div
                  className="mx-auto"
                  style={{
                    width: "1px",
                    height: "24px",
                    background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.2), transparent)",
                    animation: reducedMotion ? "none" : "golden-thread-breathe 4s cubic-bezier(0.4,0,0.6,1) infinite",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* ── Expandable Track Panel ── */}
              {activeCat && (
                <GenreTrackPanel
                  category={activeCat}
                  globalStartIndex={getGlobalStartIndex(activeCat.id)}
                  activeTrackIndex={activeTrackIndex}
                  isPlaying={isPlaying}
                  progress={progress}
                  duration={duration}
                  onTrackClick={handleTrackClick}
                  reducedMotion={reducedMotion}
                />
              )}
            </div>

            {/* ── Closing Quote — 900ms breath-length reveal ── */}
            <div
              ref={quoteRef as React.RefObject<HTMLDivElement>}
              className="max-w-lg mx-auto text-center mt-28 md:mt-40 relative"
              style={{
                opacity: quoteVisible ? 1 : 0,
                transform: quoteVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 900ms ease, transform 900ms cubic-bezier(0.22,0.61,0.36,1)",
                transitionDelay: quoteVisible ? "300ms" : "0ms",
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--vow-yellow) / 0.05) 0%, transparent 70%)" }} aria-hidden="true" />
              <div className="relative mx-auto mb-6" style={{ width: "64px", height: "1px" }} aria-hidden="true">
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, hsl(var(--vow-yellow) / 0.5), transparent)" }} />
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
              <blockquote className="relative z-10" cite="Parker Gawryletz">
                <p className="text-lg font-display font-light italic text-foreground/80 blockquote-warm">
                  Every piece I play begins the same way — with someone in mind.
                </p>
                <footer className="mt-3">
                  <cite className="text-[11px] uppercase tracking-[0.22em] text-foreground/25 not-italic font-display">
                    — Parker Gawryletz
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="section-fade-bottom" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--rich-black)))" }} aria-hidden="true" />
      </section>

      {/* Now Playing Mini-Bar */}
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
