import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { Category } from "./PianoPanel";

/* ─── Mini waveform for active track ─── */
const miniBarOpacities = [0.6, 1, 0.8, 0.5];

function MiniWaveform({ active, reducedMotion = false }: { active: boolean; reducedMotion?: boolean }) {
  return (
    <div className="flex items-center gap-[1.5px] h-[12px]" aria-hidden="true">
      {[6, 10, 8, 5].map((_, i) => (
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

interface GenreTrackPanelProps {
  category: Category;
  globalStartIndex: number;
  activeTrackIndex: number | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onTrackClick: (globalIndex: number) => void;
  reducedMotion: boolean;
}

export function GenreTrackPanel({
  category,
  globalStartIndex,
  activeTrackIndex,
  isPlaying,
  progress,
  duration,
  onTrackClick,
  reducedMotion,
}: GenreTrackPanelProps) {
  return (
    <div
      className="w-full max-w-2xl mx-auto mt-6 rounded-xl overflow-hidden"
      style={{
        background: "hsl(var(--rich-black))",
        border: "1px solid hsl(var(--vow-yellow) / 0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 60px rgba(0,0,0,0.4)",
        animation: reducedMotion ? "none" : "fade-in 260ms ease-out",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-sans font-medium">
          {category.label}
        </span>
        <span className="text-[10px] text-foreground/20 font-mono">
          {category.tracks.length} tracks
        </span>
      </div>
      <div
        className="mx-5 mb-2"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, hsl(var(--vow-yellow) / 0.14), transparent)",
        }}
      />

      {/* Tracks */}
      {category.tracks.map((track, tIdx) => {
        const globalIdx = globalStartIndex + tIdx;
        const isActive = activeTrackIndex === globalIdx;
        const isTrackPlaying = isActive && isPlaying;
        const hasSrc = !!track.src;
        const pct = isActive && duration > 0 ? (progress / duration) * 100 : 0;

        return (
          <button
            key={track.title}
            onClick={() => hasSrc ? onTrackClick(globalIdx) : undefined}
            className={cn(
              "w-full flex items-center gap-3 min-h-[48px] px-5 relative",
              "font-display text-[15px] font-light tracking-normal",
              "transition-all duration-[180ms]",
              isActive
                ? "text-[hsl(var(--vow-yellow))]"
                : hasSrc
                ? "text-foreground/70 hover:text-foreground hover:bg-[hsl(var(--vow-yellow)/0.03)]"
                : "text-foreground/35 cursor-default"
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
              className="flex-shrink-0"
              style={{
                width: "2px",
                height: isActive ? "16px" : "8px",
                borderRadius: "1px",
                background: isActive ? "hsl(var(--vow-yellow))" : "hsl(var(--vow-yellow) / 0.3)",
                transform: isActive ? "scaleY(1)" : "scaleY(0)",
                transition: "transform 180ms cubic-bezier(0.22,0.61,0.36,1), height 180ms, background 120ms",
              }}
            />
            {/* Track number */}
            {!isActive && (
              <span className="text-[10px] font-mono text-foreground/20 tabular-nums w-5 shrink-0 text-right">
                {String(tIdx + 1).padStart(2, "0")}
              </span>
            )}
            <span className="flex-1 text-left truncate">{track.title}</span>
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
      })}

      {/* Footer */}
      <div className="px-5 pt-3 pb-4 text-center">
        <p className="text-[11px] text-foreground/25 italic font-display">
          Recordings arriving soon.{" "}
          <Link
            to="/contact"
            className="underline decoration-foreground/10 hover:decoration-[hsl(var(--vow-yellow)/0.3)] hover:text-[hsl(var(--vow-yellow)/0.6)] transition-all duration-[260ms]"
          >
            Request a live preview.
          </Link>
        </p>
      </div>
    </div>
  );
}
