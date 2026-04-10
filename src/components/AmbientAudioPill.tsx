import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, X } from "lucide-react";
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

  const displayedTitle = activeTrackIndex !== null
    ? allTracks[activeTrackIndex]?.title ?? ""
    : "";

  // Detect reduced motion once on mount
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pill entrance delay
  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 2700);
    return () => clearTimeout(t);
  }, []);

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

  const handlePillClick = useCallback(() => {
    setIsPanelOpen((p) => !p);
  }, []);

  const pct            = duration > 0 ? (progress / duration) * 100 : 0;
  const showPauseBtn   = activeTrackIndex !== null && !isPanelOpen;

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
      />

      {/* ════════════════════════════════════════
          PILL
          ════════════════════════════════════════ */}
      <button
        onClick={handlePillClick}
        aria-label={isPanelOpen ? "Close listening room" : "Open listening room"}
        className={cn(
          /* Position — safe-area-aware so pill stays above MobileStickyBar on iPhone */
          "fixed z-30",
          "bottom-[calc(4rem_+_env(safe-area-inset-bottom,_0px))]",
          "left-1/2 -translate-x-1/2",
          "md:bottom-6 md:left-6 md:translate-x-0",
          /* Shape */
          "h-12 rounded-full px-5 flex items-center gap-3",
          "backdrop-blur-md select-none",
          /* Entrance opacity gate */
          entranceComplete ? "opacity-100" : "opacity-0",
          "transition-[background-color,border-color,box-shadow] duration-[180ms]",
        )}
        style={{
          animation: !entranceComplete
            ? "pill-surface 600ms cubic-bezier(0.22,0.61,0.36,1) 2000ms forwards"
            : entranceComplete && !isPlaying && !isPanelOpen && !reduced
              ? "pill-breathe 7000ms ease-in-out infinite alternate"
              : "none",
          background: isPanelOpen || isPlaying
            ? "hsl(var(--rich-black) / 0.90)"
            : "hsl(var(--rich-black) / 0.74)",
          border: "1px solid",
          borderColor: isPanelOpen || isPlaying
            ? "hsl(var(--vow-yellow) / 0.22)"
            : "hsl(0 0% 100% / 0.10)",
          boxShadow: isPanelOpen || isPlaying
            ? "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 0 28px hsl(var(--vow-yellow) / 0.07), 0 4px 20px hsl(0 0% 0% / 0.35)"
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
                  background: `hsl(var(--vow-yellow) / ${[0.55, 0.9, 0.7, 0.45][i]})`,
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
        <span className="relative w-[148px] h-5 flex items-center flex-shrink-0">
          {/* Idle CTA */}
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap",
              "font-sans text-[11px] font-medium uppercase tracking-[0.18em]",
              "transition-opacity duration-[120ms]",
              !isPanelOpen && activeTrackIndex === null ? "opacity-100" : "opacity-0",
            )}
            style={{ color: "hsl(0 0% 100% / 0.62)" }}
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
              "font-display italic text-[13px] tracking-[0.01em]",
              "transition-opacity duration-[120ms]",
              !isPanelOpen && activeTrackIndex !== null && titleVisible ? "opacity-100" : "opacity-0",
            )}
            style={{ color: "hsl(0 0% 100% / 0.68)" }}
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
            showPauseBtn ? "opacity-100 w-7" : "opacity-0 w-0",
          )}
        >
          {showPauseBtn && (
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
                "focus-visible:ring-[hsl(var(--vow-yellow)/0.5)]",
              )}
              style={{
                background: "hsl(var(--vow-yellow) / 0.09)",
                border:     "1px solid hsl(0 0% 100% / 0.07)",
                color:      "hsl(0 0% 100% / 0.62)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background   = "hsl(var(--vow-yellow) / 0.18)";
                el.style.borderColor  = "hsl(var(--vow-yellow) / 0.25)";
                el.style.color        = "hsl(var(--vow-yellow))";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background   = "hsl(var(--vow-yellow) / 0.09)";
                el.style.borderColor  = "hsl(0 0% 100% / 0.07)";
                el.style.color        = "hsl(0 0% 100% / 0.62)";
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
              background: "linear-gradient(90deg, hsl(var(--vow-yellow) / 0.45), hsl(var(--vow-yellow) / 0.85))",
              boxShadow:  pct > 0 ? "0 0 6px hsl(var(--vow-yellow) / 0.2)" : "none",
              transition: "width 250ms linear, box-shadow 300ms ease-out",
            }}
          />
        </div>
      </button>
    </>
  );
}
