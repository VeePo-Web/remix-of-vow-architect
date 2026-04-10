import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Track / Category Data ─────────────────────────────────────────────── */

export interface Track    { title: string; src: string; }
export interface Category { id: string; label: string; tracks: Track[]; }

export const categories: Category[] = [
  { id: "hymns",     label: "Hymns",     tracks: [
    { title: "Amazing Grace",             src: "" },
    { title: "Be Thou My Vision",         src: "" },
    { title: "Great Is Thy Faithfulness", src: "" },
  ]},
  { id: "worship",   label: "Worship",   tracks: [
    { title: "10,000 Reasons",            src: "" },
    { title: "How Great Thou Art",        src: "" },
    { title: "What a Beautiful Name",     src: "" },
  ]},
  { id: "pop",       label: "Pop",       tracks: [
    { title: "A Thousand Years",          src: "" },
    { title: "All of Me",                 src: "" },
    { title: "Turning Page",              src: "" },
  ]},
  { id: "classical", label: "Classical", tracks: [
    { title: "Clair de Lune",             src: "" },
    { title: "Canon in D",               src: "" },
    { title: "Nocturne Op. 9 No. 2",     src: "" },
  ]},
  { id: "film",      label: "Film",      tracks: [
    { title: "River Flows in You",        src: "" },
    { title: "Comptine d'un autre été",  src: "" },
    { title: "Moon River",               src: "" },
  ]},
];

export const allTracks: Track[] = categories.flatMap((c) => c.tracks);

function getCategoryStart(catId: string): number {
  let idx = 0;
  for (const cat of categories) {
    if (cat.id === catId) return idx;
    idx += cat.tracks.length;
  }
  return 0;
}

function getCategoryForTrack(trackIndex: number): Category | null {
  for (const cat of categories) {
    const start = getCategoryStart(cat.id);
    if (trackIndex >= start && trackIndex < start + cat.tracks.length) return cat;
  }
  return null;
}

/* ─── Palette ────────────────────────────────────────────────────────────── */

const C = {
  bg:          "hsl(24 8% 6%)",
  border:      "hsl(var(--vow-yellow) / 0.14)",
  divider:     "hsl(30 9% 11%)",
  hoverBg:     "hsl(30 8% 9%)",
  activeBg:    "radial-gradient(ellipse at 0% 50%, hsl(var(--vow-yellow) / 0.07) 0%, transparent 75%)",
  textPrimary: "hsl(40 18% 84%)",    // ivory
  textMuted:   "hsl(40 10% 52%)",    // warm gray
  textFaint:   "hsl(40 8% 34%)",     // very muted warm
  dotRest:     "hsl(40 8% 22%)",     // inactive dot — visible placeholder
  gold:        "hsl(var(--vow-yellow))",
} as const;

const EASE_SPRING = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const EASE_OUT    = "cubic-bezier(0.33, 1, 0.68, 1)";

/* ─── Piano Strings (decorative) ────────────────────────────────────────── */

const STRING_POS = [8, 11, 14, 28, 31, 34, 50, 53, 56, 72, 75, 78, 92, 95];

function PianoStrings({ visible }: { visible: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden="true">
      {STRING_POS.map((pct, i) => (
        <div key={i} className="absolute top-0 bottom-0" style={{
          left:       `${pct}%`,
          width:      "1px",
          background: "linear-gradient(to bottom, hsl(var(--vow-yellow) / 0.11), hsl(var(--vow-yellow) / 0.03))",
          opacity:    visible ? 1 : 0,
          transition: "opacity 180ms ease-out",
          transitionDelay: visible ? `${100 + i * 12}ms` : "0ms",
        }} />
      ))}
      <div className="absolute left-0 right-0" style={{
        top: "8px", height: "1px",
        background: "hsl(var(--vow-yellow) / 0.14)",
        opacity:    visible ? 1 : 0,
        transition: "opacity 180ms ease-out 120ms",
      }} />
      {STRING_POS.map((pct, i) => (
        <div key={`t-${i}`} className="absolute" style={{
          left: `${pct}%`, top: "8px", width: "1.5px", height: "5px",
          background: "hsl(var(--vow-yellow) / 0.14)",
          opacity:    visible ? 1 : 0,
          transition: "opacity 180ms ease-out 140ms",
        }} />
      ))}
      <div className="absolute left-0 right-0" style={{
        top: "20px", height: "2px",
        background: "hsl(var(--vow-yellow) / 0.05)",
        opacity:    visible ? 1 : 0,
        transition: "opacity 180ms ease-out 160ms",
      }} />
      <div className="absolute inset-0 rounded-2xl" style={{
        background: "radial-gradient(ellipse at 50% 0%, hsl(var(--vow-yellow) / 0.02) 0%, transparent 60%)",
        opacity:    visible ? 1 : 0,
        transition: "opacity 260ms ease-out 80ms",
      }} />
    </div>
  );
}

/* ─── Waveform bars ──────────────────────────────────────────────────────── */

const WAVE_H = [6, 10, 8, 5];
const WAVE_O = [0.6, 1.0, 0.8, 0.5];

function MiniWaveform({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-[14px] flex-shrink-0" aria-hidden="true">
      {WAVE_H.map((h, i) => (
        <div key={i} className="w-[2px] rounded-full" style={{
          height:     active && !reduced ? undefined : `${h * 0.5}px`,
          background: `hsl(var(--vow-yellow) / ${WAVE_O[i]})`,
          animation:  active && !reduced
            ? `panel-wave-${i} 1200ms ease-in-out ${i * 150}ms infinite alternate`
            : "none",
        }} />
      ))}
    </div>
  );
}

/* ─── Now Playing Strip ──────────────────────────────────────────────────── */

function NowPlayingStrip({
  trackIndex,
  reduced,
}: {
  trackIndex: number;
  reduced: boolean;
}) {
  const track    = allTracks[trackIndex];
  const category = getCategoryForTrack(trackIndex);
  if (!track || !category) return null;

  return (
    <div
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          "10px",
        padding:      "0 20px",
        height:       "36px",
        background:   "hsl(var(--vow-yellow) / 0.035)",
        borderBottom: `1px solid hsl(var(--vow-yellow) / 0.08)`,
        flexShrink:   0,
      }}
    >
      {/* Live waveform */}
      <MiniWaveform active reduced={reduced} />

      {/* Track name */}
      <span
        className="font-display italic truncate flex-1 min-w-0"
        style={{
          fontSize:   "12px",
          lineHeight:  1,
          color:       C.gold,
        }}
      >
        {track.title}
      </span>

      {/* Genre tag */}
      <span
        className="font-sans flex-shrink-0"
        style={{
          fontSize:    "10px",
          color:       C.textFaint,
          letterSpacing: "0.06em",
        }}
      >
        {category.label}
      </span>
    </div>
  );
}

/* ─── Main Panel ─────────────────────────────────────────────────────────── */

interface PianoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrackIndex: number | null;
  onSelectTrack: (globalIndex: number) => void;
  reduced: boolean;
}

export default function PianoPanel({
  isOpen, onClose, activeTrackIndex, onSelectTrack, reduced,
}: PianoPanelProps) {
  const outerContentRef = useRef<HTMLDivElement>(null); // measured for height
  const navTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Navigation state ── */
  const [view,           setView          ] = useState<"genres" | "tracks">("genres");
  const [shownCatId,     setShownCatId    ] = useState<string | null>(null);
  const [contentVisible, setContentVisible] = useState(true);
  /* Epoch: incremented on every open + navigation so row keys change
     → rows are remounted → CSS row-enter animation fires fresh.      */
  const [epoch,          setEpoch         ] = useState(0);

  /* Container height — measured from DOM, never hardcoded.
     Initialise at 0 so first paint has the correct measured value.   */
  const [containerH, setContainerH] = useState(0);

  const shownCategory = shownCatId
    ? categories.find((c) => c.id === shownCatId) ?? null
    : null;

  /* Measure after every view change, open state change, or playing-track change.
     activeTrackIndex matters because NowPlayingStrip adds 36px to the content. */
  useLayoutEffect(() => {
    if (!outerContentRef.current) return;
    const h = outerContentRef.current.scrollHeight;
    if (h > 4) setContainerH(h);
  }, [view, isOpen, activeTrackIndex !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Navigation with crossfade ── */
  const navigate = useCallback(
    (nextView: "genres" | "tracks", nextCatId: string | null) => {
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      setContentVisible(false);
      navTimerRef.current = setTimeout(() => {
        setView(nextView);
        setShownCatId(nextCatId);
        setEpoch((e) => e + 1);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setContentVisible(true))
        );
      }, 130);
    },
    []
  );

  const toTracks = useCallback((id: string) => navigate("tracks", id), [navigate]);
  const toGenres = useCallback(()            => navigate("genres", null), [navigate]);

  /* On open: bump epoch so rows animate in fresh.
     On close: cancel pending nav, restore visibility for next open. */
  useEffect(() => {
    if (isOpen) {
      setEpoch((e) => e + 1);
      setContentVisible(true);
    } else {
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      const t = setTimeout(() => setContentVisible(true), 280);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (view === "tracks") toGenres();
      else onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, view, toGenres]);

  /* Click-outside */
  const handleOverlay = useCallback(
    (e: React.MouseEvent) => { e.stopPropagation(); onClose(); },
    [onClose]
  );

  /* Row animation timing */
  const rowDur     = reduced ? 0 : 180;
  const rowStagger = reduced ? 0 : 38;

  return (
    <>
      <style>{`
        @keyframes panel-wave-0 { 0% { height: 3px; } 100% { height:  6px; } }
        @keyframes panel-wave-1 { 0% { height: 3px; } 100% { height: 10px; } }
        @keyframes panel-wave-2 { 0% { height: 3px; } 100% { height:  8px; } }
        @keyframes panel-wave-3 { 0% { height: 3px; } 100% { height:  5px; } }
        @keyframes row-enter {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>

      {/* Click-outside overlay — below panel, above page content */}
      {isOpen && (
        <div className="fixed inset-0 z-29" onClick={handleOverlay} aria-hidden="true" />
      )}

      {/* ══════════════════════════════════════════════════════════════
          PANEL
          ══════════════════════════════════════════════════════════════ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Listening Room"
        data-theme="death"
        className={cn(
          "fixed z-30 overflow-hidden rounded-2xl",
          /* Mobile: centered above pill, safe-area-aware, capped width */
          "bottom-[calc(4.5rem_+_env(safe-area-inset-bottom,_0px))]",
          "left-1/2 -translate-x-1/2",
          "w-[calc(100vw-24px)] max-w-[420px]",
          /* Desktop: left-anchored above pill */
          "md:bottom-[calc(3.5rem_+_env(safe-area-inset-bottom,_0px))]",
          "md:left-6 md:translate-x-0 md:w-[360px] md:max-w-none",
        )}
        style={{
          background: C.bg,
          border:     `1px solid ${C.border}`,
          boxShadow:  [
            "inset 0 1px 0 hsl(40 20% 88% / 0.04)",
            "0 32px 80px hsl(0 0% 0% / 0.6)",
            "0 0 0 1px hsl(0 0% 0% / 0.3)",
          ].join(", "),
          opacity:   isOpen ? 1 : 0,
          transform: isOpen
            ? "scale(1) translateY(0)"
            : reduced ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
          transition: isOpen
            ? `opacity 240ms ${EASE_SPRING}, transform 240ms ${EASE_SPRING}`
            : "opacity 180ms ease-out, transform 180ms ease-out",
          pointerEvents:   isOpen ? "auto" : "none",
          transformOrigin: "bottom center",
        }}
      >
        {/* Decorative piano strings */}
        <PianoStrings visible={isOpen} />

        {/* ── Top gold hairline — premium light-source accent ── */}
        <div
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
          style={{ height: "1px" }}
          aria-hidden="true"
        >
          <div style={{
            height:     "1px",
            background: `linear-gradient(90deg,
              transparent 0%,
              hsl(var(--vow-yellow) / 0.10) 15%,
              hsl(var(--vow-yellow) / 0.22) 35%,
              hsl(var(--vow-yellow) / 0.30) 50%,
              hsl(var(--vow-yellow) / 0.22) 65%,
              hsl(var(--vow-yellow) / 0.10) 85%,
              transparent 100%)`,
          }} />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            HEADER — crossfades between genre and track states
            ══════════════════════════════════════════════════════════════ */}
        <div
          className="relative z-10"
          style={{ height: "48px", borderBottom: `1px solid hsl(var(--vow-yellow) / 0.07)` }}
        >
          {/* State A: Genre picker header */}
          <div
            className="absolute inset-0 flex items-center justify-between px-5"
            style={{
              opacity:       view === "genres" ? 1 : 0,
              transform:     view === "genres" ? "translateX(0)" : "translateX(-5px)",
              transition:    reduced ? "none" : "opacity 140ms ease, transform 140ms ease",
              pointerEvents: view === "genres" ? "auto" : "none",
            }}
            aria-hidden={view !== "genres"}
          >
            <span className="flex items-center gap-2.5">
              {activeTrackIndex !== null && (
                <span
                  className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ background: C.gold, boxShadow: `0 0 6px hsl(var(--vow-yellow) / 0.5)` }}
                  aria-hidden="true"
                />
              )}
              <span
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em]"
                style={{ color: C.textMuted }}
              >
                Listening Room
              </span>
            </span>
            <span
              className="font-sans text-[11px] tabular-nums"
              style={{ color: C.textFaint }}
            >
              {allTracks.length} pieces
            </span>
          </div>

          {/* State B: Track list header */}
          <div
            className="absolute inset-0 flex items-center justify-between"
            style={{
              opacity:       view === "tracks" ? 1 : 0,
              transform:     view === "tracks" ? "translateX(0)" : "translateX(5px)",
              transition:    reduced ? "none" : `opacity 140ms ease ${view === "tracks" ? "50ms" : "0ms"}, transform 140ms ease ${view === "tracks" ? "50ms" : "0ms"}`,
              pointerEvents: view === "tracks" ? "auto" : "none",
            }}
            aria-hidden={view !== "tracks"}
          >
            {/* Back — self-stretch = full 48px touch target on mobile */}
            <button
              onClick={toGenres}
              tabIndex={view === "tracks" ? 0 : -1}
              className="self-stretch flex items-center gap-1.5 pl-4 pr-5 group/back focus-visible:outline-none"
              aria-label="Back to genre list"
            >
              <ChevronLeft
                size={13}
                strokeWidth={2}
                className={cn(
                  "flex-shrink-0 transition-transform duration-150",
                  !reduced && "group-hover/back:-translate-x-[2px]",
                )}
                style={{ color: "hsl(var(--vow-yellow) / 0.6)" }}
              />
              <span
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em]"
                style={{ color: C.textMuted }}
              >
                Back
              </span>
            </button>

            {/* Category name + count */}
            <span className="flex items-baseline gap-1.5 pr-5">
              <span
                className="font-display text-[13px] italic"
                style={{ color: C.textPrimary }}
              >
                {shownCategory?.label}
              </span>
              <span
                className="font-sans text-[10px] tabular-nums"
                style={{ color: C.textFaint }}
              >
                {shownCategory?.tracks.length}
              </span>
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            CONTENT
            containerH is measured from outerContentRef.scrollHeight —
            never hardcoded. Includes NowPlayingStrip height when present.
            Height transitions smoothly on navigation.
            ══════════════════════════════════════════════════════════════ */}
        <div
          className="relative z-10 overflow-hidden"
          style={{
            height:     containerH > 0 ? `${containerH}px` : "auto",
            transition: reduced ? "none" : `height 200ms ${EASE_OUT}`,
          }}
        >
          {/* Measured wrapper — includes strip + content list */}
          <div ref={outerContentRef}>

            {/* ── Now Playing Strip — visible whenever a track is selected ── */}
            {activeTrackIndex !== null && (
              <NowPlayingStrip trackIndex={activeTrackIndex} reduced={reduced} />
            )}

            {/* ── Content crossfade wrapper ── */}
            <div
              style={{
                opacity:    contentVisible ? 1 : 0,
                transition: reduced ? "none" : "opacity 130ms ease",
              }}
            >
              {view === "genres" ? (

                /* ── Genre Picker ── */
                <div style={{ paddingTop: "6px", paddingBottom: "8px" }}>
                  {categories.map((cat, idx) => {
                    const start       = getCategoryStart(cat.id);
                    const isActiveCat =
                      activeTrackIndex !== null &&
                      activeTrackIndex >= start &&
                      activeTrackIndex < start + cat.tracks.length;

                    return (
                      <button
                        key={`${cat.id}-${epoch}`}
                        onClick={(e) => { e.stopPropagation(); toTracks(cat.id); }}
                        className={cn(
                          "w-full flex items-center justify-between",
                          "group/genre focus-visible:outline-none",
                          "active:bg-[hsl(30_8%_11%)]",
                        )}
                        style={{
                          /* 13px top+bottom padding = 44px min touch target */
                          padding:      "13px 20px",
                          borderBottom: idx < categories.length - 1 ? `1px solid ${C.divider}` : undefined,
                          background:   "transparent",
                          animation:    reduced ? "none"
                            : `row-enter ${rowDur}ms ${EASE_OUT} ${idx * rowStagger}ms both`,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = C.hoverBg; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        {/* Left: dot + name + waveform */}
                        <span className="flex items-center gap-3 min-w-0 overflow-hidden">
                          <span
                            style={{
                              width:        "6px",
                              height:       "6px",
                              borderRadius: "50%",
                              flexShrink:    0,
                              background:    isActiveCat ? C.gold : C.dotRest,
                              boxShadow:     isActiveCat ? `0 0 7px hsl(var(--vow-yellow) / 0.45)` : "none",
                              transition:    "background 160ms, box-shadow 160ms",
                            }}
                            aria-hidden="true"
                          />
                          <span
                            className="font-display italic text-left truncate"
                            style={{
                              fontSize:  "16px",
                              lineHeight: 1.3,
                              color:      isActiveCat ? C.gold : C.textPrimary,
                              transition: "color 160ms",
                            }}
                          >
                            {cat.label}
                          </span>
                          {isActiveCat && <MiniWaveform active reduced={reduced} />}
                        </span>

                        {/* Right: count + chevron */}
                        <span className="flex items-center gap-2 flex-shrink-0 ml-3">
                          <span
                            className="font-sans tabular-nums"
                            style={{ fontSize: "11px", color: C.textMuted }}
                          >
                            {cat.tracks.length}
                          </span>
                          <ChevronRight
                            size={13}
                            strokeWidth={1.8}
                            className={cn(
                              "flex-shrink-0 transition-transform duration-150",
                              !reduced && "group-hover/genre:translate-x-[2px]",
                            )}
                            style={{ color: "hsl(40 8% 32%)" }}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>

              ) : (

                /* ── Track List ── */
                <div style={{ paddingTop: "6px", paddingBottom: "8px" }}>
                  {shownCategory?.tracks.map((track, tIdx) => {
                    const startIdx  = getCategoryStart(shownCatId ?? "");
                    const globalIdx = startIdx + tIdx;
                    const isActive  = activeTrackIndex === globalIdx;
                    const isLast    = tIdx === shownCategory.tracks.length - 1;

                    return (
                      <button
                        key={`${track.title}-${epoch}`}
                        onClick={(e) => { e.stopPropagation(); onSelectTrack(globalIdx); }}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "w-full flex items-center gap-3",
                          "group/track focus-visible:outline-none",
                          "active:bg-[hsl(30_8%_11%)]",
                        )}
                        style={{
                          padding:      "14px 20px",
                          borderBottom: !isLast ? `1px solid ${C.divider}` : undefined,
                          background:   isActive ? C.activeBg : "transparent",
                          animation:    reduced ? "none"
                            : `row-enter ${rowDur}ms ${EASE_OUT} ${tIdx * rowStagger}ms both`,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.currentTarget.style.background = C.hoverBg;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isActive ? C.activeBg : "transparent";
                        }}
                      >
                        {/* Accent bar */}
                        <span
                          style={{
                            width:        "2px",
                            height:       isActive ? "18px" : "2px",
                            borderRadius: "1px",
                            flexShrink:    0,
                            background:    isActive ? C.gold : C.divider,
                            boxShadow:     isActive ? `0 0 6px hsl(var(--vow-yellow) / 0.35)` : "none",
                            transition:    [`height 200ms ${EASE_SPRING}`, "background 180ms", "box-shadow 180ms"].join(", "),
                          }}
                          aria-hidden="true"
                        />

                        {/* Track name */}
                        <span
                          className="font-display italic text-left truncate flex-1"
                          style={{
                            fontSize:   "15px",
                            lineHeight:  1.3,
                            color:       isActive ? C.gold : C.textPrimary,
                            transition: "color 160ms",
                          }}
                        >
                          {track.title}
                        </span>

                        {isActive && <MiniWaveform active reduced={reduced} />}
                      </button>
                    );
                  })}
                </div>

              )}
            </div>
          </div>
        </div>

        {/* ── Caret — visually anchors panel to pill ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0"
          style={{
            bottom: "-9px", width: 0, height: 0,
            borderLeft: "9px solid transparent", borderRight: "9px solid transparent",
            borderTop: `9px solid ${C.border}`, pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0"
          style={{
            bottom: "-7px", width: 0, height: 0,
            borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
            borderTop: `8px solid ${C.bg}`, pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </div>
    </>
  );
}
