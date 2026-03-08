import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface Track {
  title: string;
  context: string;
  src: string;
}

export interface AudioPlayerProps {
  tracks: Track[];
  onPlayStateChange?: (playing: boolean, trackIndex: number | null, progress: number, duration: number) => void;
}

const WAVEFORM_BARS = 14;

function WaveformBars({ isPlaying, reducedMotion }: { isPlaying: boolean; reducedMotion: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-6" aria-hidden="true">
      {Array.from({ length: WAVEFORM_BARS }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-[3px] rounded-full transition-all",
            isPlaying
              ? "bg-[hsl(var(--vow-yellow))]"
              : "bg-muted-foreground/30"
          )}
          style={{
            height: isPlaying && !reducedMotion
              ? undefined
              : `${4 + Math.sin(i * 0.9) * 3}px`,
            animation: isPlaying && !reducedMotion
              ? `waveform-bar 800ms ease-in-out ${i * 50}ms infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

function VinylDisc({ isPlaying, reducedMotion }: { isPlaying: boolean; reducedMotion: boolean }) {
  return (
    <div
      className="vinyl-disc"
      style={{
        animationPlayState: isPlaying && !reducedMotion ? "running" : "paused",
      }}
      aria-hidden="true"
    >
      <div className="vinyl-groove vinyl-groove-1" />
      <div className="vinyl-groove vinyl-groove-2" />
      <div className="vinyl-groove vinyl-groove-3" />
      <div className="vinyl-center" />
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ tracks, onPlayStateChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState<Set<number>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Notify parent of play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying, activeIndex, progress, duration);
  }, [isPlaying, activeIndex, progress, duration, onPlayStateChange]);

  // Time update loop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      if (activeIndex !== null) {
        setLoadError((prev) => new Set(prev).add(activeIndex));
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [activeIndex]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || activeIndex === null) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeIndex, isPlaying]);

  const handleTrackClick = useCallback(
    (index: number) => {
      if (loadError.has(index)) return;
      const audio = audioRef.current;
      if (!audio) return;

      if (activeIndex === index) {
        togglePlayPause();
      } else {
        audio.pause();
        audio.src = tracks[index].src;
        audio.load();
        setActiveIndex(index);
        setProgress(0);
        setDuration(0);
        audio.play().catch(() => {});
        setIsPlaying(true);
      }
    },
    [activeIndex, tracks, loadError, togglePlayPause]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTrackClick(index);
      }
    },
    [handleTrackClick]
  );

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  // Expose togglePlayPause for external mini-bar
  useEffect(() => {
    (window as any).__sacredSoundToggle = togglePlayPause;
    return () => { delete (window as any).__sacredSoundToggle; };
  }, [togglePlayPause]);

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
        role="list"
        aria-label="Ceremony tracks"
      >
        {tracks.map((track, index) => {
          const isActive = activeIndex === index;
          const isTrackPlaying = isActive && isPlaying;
          const hasError = loadError.has(index);

          return (
            <div
              key={track.title}
              role="button"
              tabIndex={0}
              aria-label={
                hasError
                  ? `${track.title} — coming soon`
                  : isTrackPlaying
                  ? `Pause ${track.title}`
                  : `Play ${track.title}`
              }
              onClick={() => handleTrackClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "group relative rounded-lg p-5 text-left cursor-pointer transition-all select-none",
                "border backdrop-blur-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--vow-yellow)/0.6)]",
                isActive
                  ? "bg-card/30 border-[hsl(var(--vow-yellow)/0.3)]"
                  : "bg-card/10 border-border/20 hover:bg-card/20",
                hasError && "opacity-50 cursor-default"
              )}
              style={{
                transition: "all 160ms cubic-bezier(.22,.61,.36,1)",
              }}
              onMouseEnter={(e) => {
                if (!hasError) (e.currentTarget.style.transform = "translateY(-2px)");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top row: context label + play/pause */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-[hsl(var(--vow-yellow)/0.8)]">
                  {track.context}
                </span>

                {hasError ? (
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">
                    Coming soon
                  </span>
                ) : (
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                      isTrackPlaying
                        ? "bg-[hsl(var(--vow-yellow))] text-background"
                        : "bg-foreground/10 text-foreground/70 group-hover:bg-foreground/15"
                    )}
                    style={{ transition: "all 180ms cubic-bezier(.22,.61,.36,1)" }}
                  >
                    {isTrackPlaying ? (
                      <Pause size={14} strokeWidth={2} />
                    ) : (
                      <Play size={14} strokeWidth={2} className="ml-0.5" />
                    )}
                  </div>
                )}
              </div>

              {/* Track title */}
              <p className="font-display text-base md:text-lg text-foreground mb-3">
                {track.title}
              </p>

              {/* Waveform or Vinyl + time */}
              <div className="flex items-end justify-between gap-3">
                {isActive && isTrackPlaying ? (
                  <VinylDisc isPlaying={isTrackPlaying} reducedMotion={reducedMotion} />
                ) : (
                  <WaveformBars isPlaying={isTrackPlaying} reducedMotion={reducedMotion} />
                )}
                {isActive && !hasError && (
                  <span className="text-[11px] tabular-nums text-muted-foreground opacity-60 whitespace-nowrap">
                    {formatTime(progress)} / {formatTime(duration)}
                  </span>
                )}
              </div>

              {/* Progress bar at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-lg overflow-hidden"
                role={isActive ? "progressbar" : undefined}
                aria-valuenow={isActive ? Math.round(progressPercent) : undefined}
                aria-valuemin={isActive ? 0 : undefined}
                aria-valuemax={isActive ? 100 : undefined}
              >
                <div
                  className="h-full bg-[hsl(var(--vow-yellow))] transition-none"
                  style={{ width: isActive ? `${progressPercent}%` : "0%" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Waveform bar keyframes injected once */}
      <style>{`
        @keyframes waveform-bar {
          0% { height: 4px; }
          100% { height: 22px; }
        }
      `}</style>
    </>
  );
}
