import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PianoPanel, { allTracks } from "./PianoPanel";

/* ─── Waveform bars for the pill ─── */
const barHeights = [10, 14, 12, 8];
const barOpacities = [0.7, 1, 0.85, 0.6];
const idleHeights = [5, 7, 6, 4];

function WaveformBars({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-[16px]" aria-hidden="true">
      {barHeights.map((_, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            height: active && !reduced ? undefined : `${idleHeights[i]}px`,
            background: active
              ? `hsl(var(--vow-yellow) / ${barOpacities[i]})`
              : "hsl(var(--foreground) / 0.15)",
            animation: active && !reduced
              ? `ambient-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function AmbientAudioPill() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);

  const displayedTitle = activeTrackIndex !== null
    ? allTracks[activeTrackIndex]?.title ?? ""
    : "";

  // Crossfade title on track change
  useEffect(() => {
    if (activeTrackIndex === null) return;
    setTitleVisible(false);
    const t = setTimeout(() => setTitleVisible(true), 120);
    return () => clearTimeout(t);
  }, [activeTrackIndex]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 2700);
    return () => clearTimeout(t);
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => {
      // Advance to next track
      if (activeTrackIndex !== null && activeTrackIndex < allTracks.length - 1) {
        handleSelectTrack(activeTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };
    const onErr = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onErr);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onErr);
    };
  }, [activeTrackIndex]);

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
      // Design-only: mark as active but no actual playback
      setIsPlaying(true);
    }
  }, []);

  const togglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else if (activeTrackIndex !== null) {
      const track = allTracks[activeTrackIndex];
      if (track?.src) {
        audio.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  }, [isPlaying, activeTrackIndex]);

  const handlePillClick = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  // Determine pill label
  const pillLabel = isPanelOpen
    ? "Listening Room"
    : activeTrackIndex !== null
    ? displayedTitle
    : "Hear me play";

  const showWaveform = isPlaying && !isPanelOpen;
  const showPauseButton = activeTrackIndex !== null && !isPanelOpen;

  return (
    <>
      <audio ref={audioRef} preload="none" />
      <style>{`
        @keyframes ambient-wave-0 { 0% { height: 3px; } 100% { height: 10px; } }
        @keyframes ambient-wave-1 { 0% { height: 4px; } 100% { height: 14px; } }
        @keyframes ambient-wave-2 { 0% { height: 3px; } 100% { height: 12px; } }
        @keyframes ambient-wave-3 { 0% { height: 2px; } 100% { height: 8px; } }
        @keyframes pill-surface {
          0% { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pill-breathe {
          0% { opacity: 0.82; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pill-surface {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes pill-breathe {
            0% { opacity: 1; }
            100% { opacity: 1; }
          }
        }
      `}</style>

      {/* Piano Panel */}
      <PianoPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        activeTrackIndex={activeTrackIndex}
        onSelectTrack={handleSelectTrack}
        reduced={reduced}
      />

      {/* Pill */}
      <button
        onClick={handlePillClick}
        aria-label={isPanelOpen ? "Close listening room" : "Open listening room"}
        className={cn(
          "fixed bottom-16 left-1/2 -translate-x-1/2 md:bottom-6 md:left-6 md:translate-x-0 z-30",
          "h-11 rounded-full px-5 flex items-center gap-2",
          "backdrop-blur-md select-none",
          entranceComplete ? "opacity-100" : "opacity-0",
          "transition-[background-color,border-color] duration-[180ms]",
          "border",
          isPanelOpen
            ? "bg-black/50"
            : isPlaying
            ? "bg-black/50"
            : "bg-black/40 hover:bg-black/45"
        )}
        style={{
          animation: !entranceComplete
            ? "pill-surface 600ms cubic-bezier(0.22,0.61,0.36,1) 2000ms forwards"
            : entranceComplete && !isPlaying && !isPanelOpen && !reduced
              ? "pill-breathe 4000ms ease-in-out infinite alternate"
              : "none",
          borderColor: isPanelOpen || isPlaying
            ? "hsl(var(--vow-yellow) / 0.20)"
            : "rgba(255,255,255,0.12)",
          boxShadow: isPanelOpen || isPlaying
            ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 20px rgba(255,224,138,0.06)"
            : "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Icon: X when panel open, Play/Pause otherwise */}
        <span className="relative w-[14px] h-[14px] flex-shrink-0">
          {/* X icon (panel open) */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-[180ms]",
              isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <X size={14} strokeWidth={2} className="text-foreground/70" />
          </span>
          {/* Play icon (idle) */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-[180ms]",
              !isPanelOpen && !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <Play size={14} strokeWidth={2} className="text-foreground/70 translate-x-[1px]" />
          </span>
          {/* Mini waveform icon (playing, panel closed) */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-[1.5px] transition-opacity duration-[180ms]",
              isPlaying && !isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            aria-hidden="true"
          >
            {[6, 10, 8, 5].map((h, i) => (
              <div
                key={i}
                className="w-[1.5px] rounded-full"
                style={{
                  background: `hsl(var(--vow-yellow) / ${[0.6, 0.9, 0.75, 0.5][i]})`,
                  animation: reduced
                    ? "none"
                    : `ambient-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`,
                  height: reduced ? `${h * 0.6}px` : undefined,
                }}
              />
            ))}
          </span>
        </span>

        {/* Label */}
        <span className="relative min-w-[140px] h-5 flex items-center">
          {/* "Hear me play" */}
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap font-sans text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-opacity duration-[120ms]",
              !isPanelOpen && activeTrackIndex === null ? "opacity-100" : "opacity-0"
            )}
          >
            Hear me play
          </span>
          {/* "Listening Room" */}
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap font-sans text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-opacity duration-[120ms]",
              isPanelOpen ? "opacity-100" : "opacity-0"
            )}
          >
            Listening Room
          </span>
          {/* Track title */}
          <span
            className={cn(
              "absolute inset-0 flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-sans text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-opacity duration-[120ms]",
              !isPanelOpen && activeTrackIndex !== null && titleVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {displayedTitle}
          </span>
        </span>

        {/* Waveform + pause button (when playing, panel closed) */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-[260ms] flex items-center",
            showPauseButton ? "opacity-100 max-w-[30px]" : "opacity-0 max-w-0"
          )}
        >
          {showPauseButton && (
            <span
              role="button"
              tabIndex={0}
              aria-label={isPlaying ? "Pause" : "Resume"}
              onClick={togglePause}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePause(e as any);
                }
              }}
              className="flex-shrink-0 cursor-pointer transition-opacity duration-[180ms] opacity-50 hover:opacity-80"
            >
              {isPlaying ? (
                <Pause size={10} className="text-muted-foreground" />
              ) : (
                <Play size={10} className="text-muted-foreground translate-x-[0.5px]" />
              )}
            </span>
          )}
        </div>

        {/* Progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-full overflow-hidden">
          <div
            className="h-full bg-[hsl(var(--vow-yellow)/0.4)]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </button>
    </>
  );
}
