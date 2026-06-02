import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import PianoPanel, { allTracks } from "./PianoPanel";

export default function AmbientAudioPill() {
  const audioRef            = useRef<HTMLAudioElement>(null);
  const [isPlaying,         setIsPlaying        ] = useState(false);
  const [isPanelOpen,       setIsPanelOpen      ] = useState(false);
  const [activeTrackIndex,  setActiveTrackIndex ] = useState<number | null>(null);
  const [progress,          setProgress         ] = useState(0);
  const [duration,          setDuration         ] = useState(0);
  const [reduced,           setReduced          ] = useState(false);
  const [entranceComplete,  setEntranceComplete ] = useState(false);
  const [titleVisible,      setTitleVisible     ] = useState(true);
  const [stickyVisible,     setStickyVisible    ] = useState(false);
  const [isScrolling,       setIsScrolling      ] = useState(false);
  const [isMobile,          setIsMobile         ] = useState(false);
  const location = useLocation();
  const isContact = location.pathname.includes('/contact');
  const isHero3D = location.pathname === '/' || location.pathname === '/teaching' || location.pathname === '/events';

  // Track viewport (mobile breakpoint mirrors Tailwind md)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Observe body[data-sticky-visible] flag broadcast by MobileStickyBar
  useEffect(() => {
    const read = () => setStickyVisible(document.body.dataset.stickyVisible === '1');
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.body, { attributes: true, attributeFilter: ['data-sticky-visible'] });
    return () => obs.disconnect();
  }, []);

  // Detect active scrolling (mobile only) to gently dim during cinematic scroll
  useEffect(() => {
    if (!isMobile || !isHero3D) return;
    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      setIsScrolling(true);
      if (t) clearTimeout(t);
      t = setTimeout(() => setIsScrolling(false), 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (t) clearTimeout(t);
    };
  }, [isMobile, isHero3D]);

  const displayedTitle = activeTrackIndex !== null
    ? allTracks[activeTrackIndex]?.title ?? ""
    : "";

  // Detect reduced motion once on mount
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pill entrance delay — longer on 3D hero routes so PreScrollIntro lands first
  useEffect(() => {
    const delay = isHero3D ? 3600 : 2000;
    const t = setTimeout(() => setEntranceComplete(true), delay + 700);
    return () => clearTimeout(t);
  }, [isHero3D]);

  // Crossfade title when track changes
  useEffect(() => {
    if (activeTrackIndex === null) return;
    setTitleVisible(false);
    const t = setTimeout(() => setTitleVisible(true), 120);
    return () => clearTimeout(t);
  }, [activeTrackIndex]);

  /* ── Track selection ── */
  const handleSelectTrack = useCallback((globalIndex: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = allTracks[globalIndex];
    if (!track) return;

    setActiveTrackIndex(globalIndex);
    setProgress(0);
    setDuration(0);

    if (track.src) {
      audio.src = track.src;
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      // Design-only (no src yet): mark active, show as playing
      setIsPlaying(true);
    }
  }, []);   // stable — no deps needed, reads only from args + ref

  /* ── Audio events ──
     handleSelectTrack is in the dep array so auto-advance always
     calls the current version (fixes stale-closure bug).            */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onDur  = () => setDuration(audio.duration);
    const onEnd  = () => {
      if (activeTrackIndex !== null && activeTrackIndex < allTracks.length - 1) {
        handleSelectTrack(activeTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };
    const onErr  = () => setIsPlaying(false);

    audio.addEventListener("timeupdate",     onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended",          onEnd);
    audio.addEventListener("error",          onErr);
    return () => {
      audio.removeEventListener("timeupdate",     onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended",          onEnd);
      audio.removeEventListener("error",          onErr);
    };
  }, [activeTrackIndex, handleSelectTrack]);

  /* ── Play / Pause toggle ── */
  const togglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else if (activeTrackIndex !== null) {
      if (allTracks[activeTrackIndex]?.src) {
        audio.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  }, [isPlaying, activeTrackIndex]);

  /* ── Panel transport controls ── */
  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else if (activeTrackIndex !== null) {
      if (allTracks[activeTrackIndex]?.src) {
        audio.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  }, [isPlaying, activeTrackIndex]);

  const handlePrev = useCallback(() => {
    if (activeTrackIndex !== null && activeTrackIndex > 0) {
      handleSelectTrack(activeTrackIndex - 1);
    }
  }, [activeTrackIndex, handleSelectTrack]);

  const handleNext = useCallback(() => {
    if (activeTrackIndex !== null && activeTrackIndex < allTracks.length - 1) {
      handleSelectTrack(activeTrackIndex + 1);
    }
  }, [activeTrackIndex, handleSelectTrack]);

  const handlePillClick = useCallback(() => {
    setIsPanelOpen((p) => !p);
  }, []);

  const handleSeek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = ratio * audio.duration;
  }, []);

  const pct            = duration > 0 ? (progress / duration) * 100 : 0;
  const showPauseBtn   = activeTrackIndex !== null && !isPanelOpen;

  // Compact mode: mobile + (sticky bar showing OR playing track) and panel closed.
  // Keeps the pill out of the way of the bottom CTA while staying tappable.
  const compact = isMobile && !isPanelOpen && (stickyVisible || (isPlaying && activeTrackIndex !== null));
  const dim = isMobile && isHero3D && isScrolling && !isPanelOpen && !reduced;

  // Hide entirely on contact routes (mirror MobileStickyBar)
  if (isContact && isMobile) {
    return <audio ref={audioRef} preload="none" />;
  }

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <style>{`
        @keyframes ambient-wave-0 { 0% { height: 3px; } 100% { height: 10px; } }
        @keyframes ambient-wave-1 { 0% { height: 4px; } 100% { height: 14px; } }
        @keyframes ambient-wave-2 { 0% { height: 3px; } 100% { height: 12px; } }
        @keyframes ambient-wave-3 { 0% { height: 2px; } 100% { height:  8px; } }
        @keyframes pill-surface {
          0%   { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes pill-breathe {
          0%   { opacity: 0.84; }
          100% { opacity: 1;    }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pill-surface  { 0% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes pill-breathe  { 0% { opacity: 1; } 100% { opacity: 1; } }
        }
      `}</style>

      {/* Listening Room panel */}
      <PianoPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        activeTrackIndex={activeTrackIndex}
        onSelectTrack={handleSelectTrack}
        reduced={reduced}
        progress={progress}
        duration={duration}
        isPlaying={isPlaying}
        onSeek={handleSeek}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* ════════════════════════════════════════
          PILL
          ════════════════════════════════════════ */}
      <button
        onClick={handlePillClick}
        aria-label={isPanelOpen ? "Close listening room" : "Open listening room"}
        className={cn(
          "ambient-pill",
          /* Position — mobile: bottom-right, safe-area aware, lifts above sticky CTA bar */
          "fixed z-30",
          "right-4 md:right-auto md:left-6",
          /* Shape */
          "flex items-center gap-3 rounded-full",
          compact ? "h-10 w-10 px-0 justify-center gap-0" : "h-12 px-5",
          "backdrop-blur-md select-none",
          /* Entrance opacity gate */
          entranceComplete ? "opacity-100" : "opacity-0",
          "transition-[background-color,border-color,box-shadow,height,width,padding,opacity,bottom] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        )}
        style={{
          bottom: isMobile
            ? (stickyVisible
                ? "calc(env(safe-area-inset-bottom, 0px) + 72px)"
                : "calc(env(safe-area-inset-bottom, 0px) + 16px)")
            : "1.5rem",
          opacity: !entranceComplete ? 0 : (dim ? 0.45 : 1),
          animation: !entranceComplete
            ? `pill-surface 600ms cubic-bezier(0.22,0.61,0.36,1) ${isHero3D ? 3600 : 2000}ms forwards`
            : entranceComplete && !isPlaying && !isPanelOpen && !reduced
              ? "pill-breathe 7000ms ease-in-out infinite alternate"
              : "none",
          background: isPanelOpen || isPlaying
            ? "hsl(var(--rich-black) / 0.90)"
            : "hsl(var(--rich-black) / 0.74)",
          border: "1px solid",
          borderColor: isPanelOpen || isPlaying
            ? "hsl(0 0% 100% / 0.22)"
            : "hsl(0 0% 100% / 0.10)",
          boxShadow: isPanelOpen || isPlaying
            ? "inset 0 1px 0 hsl(0 0% 100% / 0.08), 0 4px 20px hsl(0 0% 0% / 0.35)"
            : "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 4px 16px hsl(0 0% 0% / 0.22)",
        }}
      >
        {/* ── Left icon slot: X / Play / Waveform ── */}
        <span className="relative w-4 h-4 flex-shrink-0" aria-hidden="true">

          {/* X — panel open */}
          <span className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-[160ms]",
            isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}>
            <X size={14} strokeWidth={2} style={{ color: "hsl(0 0% 100% / 0.55)" }} />
          </span>

          {/* Play triangle — idle */}
          <span className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-[160ms]",
            !isPanelOpen && !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none",
          )}>
            <Play size={14} strokeWidth={1.8} className="translate-x-[1px]" style={{ color: "hsl(0 0% 100% / 0.6)" }} />
          </span>

          {/* Animated waveform — playing + panel closed */}
          <span className={cn(
            "absolute inset-0 flex items-center justify-center gap-[2px] transition-opacity duration-[160ms]",
            isPlaying && !isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}>
            {[6, 10, 8, 5].map((h, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width:      i % 2 === 0 ? "1.5px" : "2px",
                  background: `hsl(0 0% 100% / ${[0.55, 0.9, 0.7, 0.45][i]})`,
                  animation:  reduced
                    ? "none"
                    : `ambient-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`,
                  height: reduced ? `${h * 0.6}px` : undefined,
                }}
              />
            ))}
          </span>
        </span>

        {/* ── Label slot: "Hear me play" / "Listening Room" / track title ── */}
        <span
          className={cn(
            "relative h-5 flex items-center flex-shrink-0 overflow-hidden transition-all duration-[220ms]",
            compact ? "w-0 opacity-0" : "w-[148px] opacity-100",
          )}
        >
          {/* Idle CTA */}
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap",
              "text-[14px] tracking-[0.01em]",
              "transition-opacity duration-[120ms]",
              !isPanelOpen && activeTrackIndex === null ? "opacity-100" : "opacity-0",
            )}
            style={{ color: "hsl(0 0% 100% / 0.74)", fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 500 }}
          >
            Hear me play
          </span>

          {/* Panel-open label */}
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap",
              "font-sans text-[11px] font-medium uppercase tracking-[0.18em]",
              "transition-opacity duration-[120ms]",
              isPanelOpen ? "opacity-100" : "opacity-0",
            )}
            style={{ color: "hsl(0 0% 100% / 0.48)" }}
          >
            Listening Room
          </span>

          {/* Playing — track title */}
          <span
            className={cn(
              "absolute inset-0 flex items-center overflow-hidden",
              "text-[13px] tracking-[0.01em]",
              "transition-opacity duration-[120ms]",
              !isPanelOpen && activeTrackIndex !== null && titleVisible ? "opacity-100" : "opacity-0",
            )}
            style={{ color: "hsl(0 0% 100% / 0.82)", fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 500 }}
          >
            <span className="truncate">{displayedTitle}</span>
          </span>
        </span>

        {/* ── Pause / Resume button ──
            Outer div slides in/out via max-width animation.
            Button uses absolute -inset-2 for 44px touch target
            without affecting pill layout.                     */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-[180ms] flex items-center justify-center",
            showPauseBtn && !compact ? "opacity-100 w-7" : "opacity-0 w-0",
          )}
        >
          {showPauseBtn && !compact && (
            <button
              aria-label={isPlaying ? "Pause" : "Resume"}
              onClick={togglePause}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePause(e as unknown as React.MouseEvent);
                }
              }}
              className={cn(
                "relative flex-shrink-0 w-7 h-7 rounded-full",
                "flex items-center justify-center",
                "transition-all duration-[140ms]",
                "focus-visible:outline-none focus-visible:ring-1",
                "focus-visible:ring-[hsl(0_0%_100%/0.5)]",
              )}
              style={{
                background: "hsl(0 0% 100% / 0.06)",
                border:     "1px solid hsl(0 0% 100% / 0.14)",
                color:      "hsl(0 0% 100% / 0.85)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background   = "hsl(0 0% 100% / 0.16)";
                el.style.borderColor  = "hsl(0 0% 100% / 0.32)";
                el.style.color        = "hsl(0 0% 100% / 1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background   = "hsl(0 0% 100% / 0.06)";
                el.style.borderColor  = "hsl(0 0% 100% / 0.14)";
                el.style.color        = "hsl(0 0% 100% / 0.85)";
              }}
            >
              {/* Expanded 44×44 touch target — invisible, covers button */}
              <span className="absolute -inset-[8px] rounded-full" aria-hidden="true" />
              {isPlaying
                ? <Pause size={10} strokeWidth={2.5} />
                : <Play  size={10} strokeWidth={2.5} className="translate-x-[0.5px]" />
              }
            </button>
          )}
        </div>

        {/* ── Progress bar — bottom edge of pill ── */}
        <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width:      `${pct}%`,
              background: "hsl(0 0% 100% / 0.85)",
              boxShadow:  pct > 0 ? "0 0 6px hsl(0 0% 100% / 0.25)" : "none",
              transition: "width 250ms linear, box-shadow 300ms ease-out",
            }}
          />
        </div>
      </button>
    </>
  );
}
