import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Track Data ─── */
export interface Track {
  title: string;
  src: string;
}

export interface Category {
  id: string;
  label: string;
  tracks: Track[];
}

export const categories: Category[] = [
  {
    id: "hymns",
    label: "Hymns",
    tracks: [
      { title: "Amazing Grace", src: "" },
      { title: "Be Thou My Vision", src: "" },
      { title: "Great Is Thy Faithfulness", src: "" },
    ],
  },
  {
    id: "worship",
    label: "Worship",
    tracks: [
      { title: "10,000 Reasons", src: "" },
      { title: "How Great Thou Art", src: "" },
      { title: "What a Beautiful Name", src: "" },
    ],
  },
  {
    id: "pop",
    label: "Pop",
    tracks: [
      { title: "A Thousand Years", src: "" },
      { title: "All of Me", src: "" },
      { title: "Turning Page", src: "" },
    ],
  },
  {
    id: "classical",
    label: "Classical",
    tracks: [
      { title: "Clair de Lune", src: "" },
      { title: "Canon in D", src: "" },
      { title: "Nocturne Op. 9 No. 2", src: "" },
    ],
  },
  {
    id: "film",
    label: "Film",
    tracks: [
      { title: "River Flows in You", src: "" },
      { title: "Comptine d'un autre été", src: "" },
      { title: "Moon River", src: "" },
    ],
  },
];

// Flatten for index-based lookup
export const allTracks: Track[] = categories.flatMap((c) => c.tracks);

/* ─── Piano Strings (decorative) ─── */
// Grouped in threes like real piano string sets — uneven spacing
const stringPositions = [
  8, 11, 14, // group 1
  28, 31, 34, // group 2
  50, 53, 56, // group 3
  72, 75, 78, // group 4
  92, 95,     // group 5 (partial)
];

function PianoStrings({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[16px]"
      aria-hidden="true"
    >
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
      {/* Hammer ticks at string intersections */}
      {stringPositions.map((pct, i) => (
        <div
          key={`tick-${i}`}
          className="absolute"
          style={{
            left: `${pct}%`,
            top: "8px",
            width: "1.5px",
            height: "5px",
            background: `hsl(var(--vow-yellow) / 0.25)`,
            opacity: visible ? 1 : 0,
            transition: "opacity 180ms ease-out 140ms",
          }}
        />
      ))}

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
    </div>
  );
}

/* ─── Waveform bars for active track ─── */
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
              ? `ambient-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Panel ─── */
interface PianoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrackIndex: number | null;
  onSelectTrack: (globalIndex: number) => void;
  reduced: boolean;
}

export default function PianoPanel({
  isOpen,
  onClose,
  activeTrackIndex,
  onSelectTrack,
  reduced,
}: PianoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Click outside
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Build global index mapping
  let globalIndex = 0;

  return (
    <>
      {/* Overlay for click-outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-29"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      <div
        ref={panelRef}
        role="dialog"
        aria-label="Listening Room"
        className={cn(
          "fixed z-30",
          // Desktop: above pill, left-aligned; Mobile: centered above pill
          "bottom-[calc(4.5rem)] left-1/2 -translate-x-1/2 md:bottom-[calc(3.5rem)] md:left-6 md:translate-x-0",
          "w-[calc(100vw-24px)] md:w-[320px]",
          "rounded-[16px]",
          "pointer-events-auto"
        )}
        style={{
          maxHeight: "420px",
          background: "hsl(var(--rich-black))",
          border: "1px solid hsl(var(--vow-yellow) / 0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.5)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          // Animation
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "scale(1) translateY(0)"
            : reduced
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(8px)",
          transition: isOpen
            ? "opacity 260ms cubic-bezier(0.22,0.61,0.36,1), transform 260ms cubic-bezier(0.22,0.61,0.36,1)"
            : "opacity 200ms ease-out, transform 200ms ease-out",
          pointerEvents: isOpen ? "auto" : "none",
          transformOrigin: "bottom center",
        }}
      >
        {/* Piano interior decoration */}
        <PianoStrings visible={isOpen} />

        {/* Scroll container */}
        <div
          className="relative z-10 overflow-y-auto"
          style={{
            maxHeight: "420px",
            scrollbarWidth: "thin",
            scrollbarColor: "hsl(var(--vow-yellow) / 0.15) transparent",
          }}
        >
          {/* Top fade mask */}
          <div
            className="sticky top-0 left-0 right-0 h-6 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--rich-black)), transparent)",
            }}
          />

          {categories.map((category, catIdx) => {
            const startIndex = globalIndex;
            const trackElements = category.tracks.map((track, tIdx) => {
              const thisGlobalIndex = startIndex + tIdx;
              const isActive = activeTrackIndex === thisGlobalIndex;
              return (
                <button
                  key={track.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTrack(thisGlobalIndex);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 h-9 px-5",
                    "font-display text-[15px] font-light tracking-tight",
                    "transition-colors duration-[180ms]",
                    isActive
                      ? "text-[hsl(var(--vow-yellow))]"
                      : "text-foreground/70 hover:text-foreground hover:bg-[hsl(var(--vow-yellow)/0.03)]"
                  )}
                  style={{
                    opacity: isOpen ? 1 : 0,
                    background: isActive
                      ? "radial-gradient(ellipse at 20% 50%, hsl(var(--vow-yellow) / 0.06) 0%, transparent 70%)"
                      : undefined,
                    transition: `opacity 120ms ease-out ${150 + catIdx * 30 + tIdx * 20}ms, color 180ms, background 180ms`,
                  }}
                >
                  {/* Active dot */}
                  <span
                    className="flex-shrink-0 rounded-full"
                    style={{
                      width: "3px",
                      height: "3px",
                      background: isActive
                        ? "hsl(var(--vow-yellow))"
                        : "transparent",
                      transform: isActive ? "scale(1)" : "scale(0)",
                      transition: "transform 120ms ease-out, background 120ms",
                    }}
                  />
                  <span className="flex-1 text-left truncate">
                    {track.title}
                  </span>
                  {isActive && <MiniWaveform active />}
                </button>
              );
            });
            globalIndex = startIndex + category.tracks.length;

            return (
              <div key={category.id}>
                <div
                  className="px-5 pt-4 pb-1.5"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transition: `opacity 120ms ease-out ${150 + catIdx * 30}ms`,
                  }}
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted-foreground/50">
                    {category.label}
                  </span>
                  <div
                    className="mt-1.5"
                    style={{
                      height: "0.5px",
                      background: "hsl(var(--vow-yellow) / 0.06)",
                    }}
                  />
                </div>
                {trackElements}
              </div>
            );
          })}

          {/* Bottom fade mask */}
          <div
            className="sticky bottom-0 left-0 right-0 h-6 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to top, hsl(var(--rich-black)), transparent)",
            }}
          />
        </div>
        {/* Caret / notch anchoring panel to pill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0"
          style={{
            bottom: "-8px",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid hsl(var(--rich-black))",
            filter: "drop-shadow(0 1px 0 hsl(var(--vow-yellow) / 0.08))",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </div>
    </>
  );
}
