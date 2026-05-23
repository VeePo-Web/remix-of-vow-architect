import {
  useEffect, useRef, useState, useCallback, useMemo,
} from "react";
import { X, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — categories preserved for backwards compatibility
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Track {
  title:     string;
  src:       string;
  duration?: string;
}
export interface Category {
  id:         string;
  label:      string;
  descriptor: string;
  initial:    string;
  tracks:     Track[];
}

export const categories: Category[] = [
  { id: "hymns",     label: "Hymns",     descriptor: "Sacred tradition",        initial: "H", tracks: [
    { title: "Amazing Grace",             src: "", duration: "3:24" },
    { title: "Be Thou My Vision",         src: "", duration: "2:58" },
    { title: "Great Is Thy Faithfulness", src: "", duration: "4:12" },
  ]},
  { id: "worship",   label: "Worship",   descriptor: "Contemporary devotional", initial: "W", tracks: [
    { title: "10,000 Reasons",            src: "", duration: "3:47" },
    { title: "How Great Thou Art",        src: "", duration: "4:01" },
    { title: "What a Beautiful Name",     src: "", duration: "3:55" },
  ]},
  { id: "pop",       label: "Pop",       descriptor: "Modern favourites",       initial: "P", tracks: [
    { title: "A Thousand Years",          src: "", duration: "4:45" },
    { title: "All of Me",                 src: "", duration: "4:29" },
    { title: "Turning Page",              src: "", duration: "4:08" },
  ]},
  { id: "classical", label: "Classical", descriptor: "Timeless instrumental",   initial: "C", tracks: [
    { title: "Clair de Lune",             src: "", duration: "5:02" },
    { title: "Canon in D",                src: "", duration: "3:50" },
    { title: "Nocturne Op. 9 No. 2",      src: "", duration: "4:32" },
  ]},
  { id: "film",      label: "Film",      descriptor: "Cinematic & evocative",   initial: "F", tracks: [
    { title: "River Flows in You",        src: "", duration: "3:38" },
    { title: "Comptine d'un autre été",   src: "", duration: "2:54" },
    { title: "Moon River",                src: "", duration: "3:15" },
  ]},
];

export const allTracks: Track[] = categories.flatMap((c) => c.tracks);

function categoryForGlobalIndex(globalIdx: number): { cat: Category; localIdx: number; start: number } | null {
  let start = 0;
  for (const cat of categories) {
    if (globalIdx >= start && globalIdx < start + cat.tracks.length) {
      return { cat, localIdx: globalIdx - start, start };
    }
    start += cat.tracks.length;
  }
  return null;
}

function categoryStart(catId: string): number {
  let start = 0;
  for (const cat of categories) {
    if (cat.id === catId) return start;
    start += cat.tracks.length;
  }
  return 0;
}

function fmt(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOKENS — Paper & Ink
   ═══════════════════════════════════════════════════════════════════════════ */

const PR = {
  paper:    "#f5f3ee",
  paper2:   "#ece8df",
  paper3:   "#e2dccf",
  ink:      "#2d2d2d",
  inkDeep:  "#0d0d0d",
  inkSoft:  "rgba(13,13,13,0.55)",
  inkFaint: "rgba(13,13,13,0.32)",
  hairline: "rgba(13,13,13,0.10)",
  hairlineStrong: "rgba(13,13,13,0.18)",
} as const;

const FONT_DISPLAY = "'Space Grotesk', 'Inter', system-ui, sans-serif";
const FONT_BODY    = "'DM Sans', 'Inter', system-ui, sans-serif";

const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

/* ═══════════════════════════════════════════════════════════════════════════
   ARTWORK — CSS vinyl record, breathes when playing
   ═══════════════════════════════════════════════════════════════════════════ */

function Artwork({ playing, reduced, initial }: { playing: boolean; reduced: boolean; initial: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "min(46vh, 420px)",
        aspectRatio: "1 / 1",
        animation: playing && !reduced ? "pr-breathe 3.2s ease-in-out infinite alternate" : "none",
      }}
    >
      {/* Ambient halo behind */}
      <div
        style={{
          position: "absolute",
          inset: "-18%",
          background: `radial-gradient(circle at 50% 55%, ${PR.paper3} 0%, ${PR.paper2} 38%, transparent 70%)`,
          filter: "blur(28px)",
          opacity: playing ? 0.9 : 0.55,
          transition: "opacity 600ms ease",
        }}
      />
      {/* Vinyl disc */}
      <div
        style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${PR.inkDeep} 0%, ${PR.inkDeep} 28%, #161616 29%, #1c1c1c 30%, #161616 31%, #1c1c1c 32%, #161616 33%, #1c1c1c 34%, #161616 35%, #1c1c1c 36%, #161616 37%, #1c1c1c 38%, #161616 39%, #1c1c1c 40%, ${PR.inkDeep} 41%, ${PR.inkDeep} 100%)`,
          boxShadow: `0 30px 60px -20px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)`,
          animation: playing && !reduced ? "pr-spin 8s linear infinite" : "none",
        }}
      >
        {/* Concentric grooves */}
        {[0.92, 0.84, 0.76, 0.68, 0.60, 0.52, 0.44].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: `${((1 - s) / 2) * 100}%`,
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,0.04)",
            }}
          />
        ))}
        {/* Center label — paper coloured */}
        <div
          style={{
            position: "absolute",
            inset: "36%",
            borderRadius: "50%",
            background: `radial-gradient(circle at 50% 40%, ${PR.paper} 0%, ${PR.paper2} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: "clamp(28px, 5vh, 56px)",
              color: PR.inkDeep,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {initial}
          </span>
        </div>
        {/* Center hole */}
        <div
          style={{
            position: "absolute",
            inset: "48.5%",
            borderRadius: "50%",
            background: PR.paper,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
          }}
        />
        {/* Light reflection */}
        <div
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.03) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCRUBBER
   ═══════════════════════════════════════════════════════════════════════════ */

function Scrubber({
  progress, duration, onSeek,
}: { progress: number; duration: number; onSeek?: (ratio: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  const ratioFromX = useCallback((x: number) => {
    if (!ref.current) return 0;
    const r = ref.current.getBoundingClientRect();
    return Math.max(0, Math.min(1, (x - r.left) / r.width));
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!onSeek) return;
    e.preventDefault();
    onSeek(ratioFromX(e.clientX));
    const move = (ev: MouseEvent) => onSeek(ratioFromX(ev.clientX));
    const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }, [onSeek, ratioFromX]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!onSeek) return;
    onSeek(ratioFromX(e.touches[0].clientX));
    const move = (ev: TouchEvent) => onSeek(ratioFromX(ev.touches[0].clientX));
    const end = () => { window.removeEventListener("touchmove", move); window.removeEventListener("touchend", end); };
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
  }, [onSeek, ratioFromX]);

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-valuetext={`${fmt(progress)} of ${fmt(duration)}`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", width: "100%", height: "24px",
        display: "flex", alignItems: "center",
        cursor: onSeek ? "pointer" : "default",
      }}
    >
      <div style={{
        position: "relative", width: "100%",
        height: hover ? "3px" : "2px",
        background: PR.hairline,
        borderRadius: "2px",
        transition: "height 140ms ease",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          width: `${pct}%`,
          background: PR.inkDeep,
          borderRadius: "2px",
          transition: "width 250ms linear",
        }} />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: `calc(${pct}% - 6px)`,
          width: "12px", height: "12px", borderRadius: "50%",
          background: PR.inkDeep,
          opacity: hover ? 1 : 0,
          transform: hover ? "scale(1)" : "scale(0.4)",
          transition: "opacity 140ms ease, transform 140ms ease, left 250ms linear",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSPORT BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */

function TButton({
  ariaLabel, onClick, disabled, size = 44, children, primary = false,
}: {
  ariaLabel: string;
  onClick: () => void;
  disabled?: boolean;
  size?: number;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size, height: size, borderRadius: "50%",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: primary ? PR.inkDeep : "transparent",
        color: primary ? PR.paper : PR.inkDeep,
        border: primary ? "none" : `1px solid ${hover ? PR.hairlineStrong : PR.hairline}`,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.28 : 1,
        transition: "background 160ms ease, border-color 160ms ease, transform 120ms ease",
        transform: hover && !disabled ? "scale(1.04)" : "scale(1)",
        outline: "none",
      }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${PR.paper}, 0 0 0 4px ${PR.inkDeep}`; }}
      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; }}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PANEL
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PianoPanelProps {
  isOpen:           boolean;
  onClose:          () => void;
  activeTrackIndex: number | null;
  onSelectTrack:    (globalIndex: number) => void;
  reduced:          boolean;
  progress?:        number;
  duration?:        number;
  isPlaying?:       boolean;
  onSeek?:          (ratio: number) => void;
  onPlayPause?:     () => void;
  onPrev?:          () => void;
  onNext?:          () => void;
}

export default function PianoPanel({
  isOpen, onClose, activeTrackIndex, onSelectTrack, reduced,
  progress = 0, duration = 0, isPlaying = false,
  onSeek, onPlayPause, onPrev, onNext,
}: PianoPanelProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Active category derived from active track, defaults to first
  const activeInfo = activeTrackIndex !== null ? categoryForGlobalIndex(activeTrackIndex) : null;
  const [filterCat, setFilterCat] = useState<string>(activeInfo?.cat.id ?? categories[0].id);

  useEffect(() => {
    if (activeInfo) setFilterCat(activeInfo.cat.id);
  }, [activeInfo?.cat.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile drawer state for setlist
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space")     { e.preventDefault(); onPlayPause?.(); }
      else if (e.key === "ArrowRight") { if (activeTrackIndex !== null && duration > 0) { e.preventDefault(); onSeek?.(Math.min(1, (progress + 5) / duration)); } }
      else if (e.key === "ArrowLeft")  { if (activeTrackIndex !== null && duration > 0) { e.preventDefault(); onSeek?.(Math.max(0, (progress - 5) / duration)); } }
      else if (e.key.toLowerCase() === "j") { onPrev?.(); }
      else if (e.key.toLowerCase() === "k") { onNext?.(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, onPlayPause, onPrev, onNext, onSeek, progress, duration, activeTrackIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const activeTrack = activeTrackIndex !== null ? allTracks[activeTrackIndex] : null;
  const activeCatLabel = activeInfo?.cat.label ?? "Listening Room";
  const totalInCat = activeInfo?.cat.tracks.length ?? 0;

  const canPrev = activeTrackIndex !== null && activeTrackIndex > 0;
  const canNext = activeTrackIndex !== null && activeTrackIndex < allTracks.length - 1;

  const filteredCat = useMemo(() => categories.find((c) => c.id === filterCat) ?? categories[0], [filterCat]);
  const filteredStart = categoryStart(filteredCat.id);

  const remaining = duration > 0 ? duration - progress : 0;

  return (
    <>
      <style>{`
        @keyframes pr-breathe { 0% { transform: scale(1); } 100% { transform: scale(1.012); } }
        @keyframes pr-spin    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pr-fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pr-breathe { 0%,100% { transform: none; } }
          @keyframes pr-spin    { 0%,100% { transform: none; } }
        }
        .pr-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .pr-scroll::-webkit-scrollbar-thumb { background: ${PR.hairlineStrong}; border-radius: 3px; }
        .pr-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 60,
          background: "rgba(13,13,13,0.42)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: `opacity 200ms ease`,
        }}
      />

      {/* Sheet — near full screen */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pr-track-title"
        style={{
          position: "fixed",
          zIndex: 61,
          top: "max(12px, env(safe-area-inset-top, 0px))",
          left: "12px",
          right: "12px",
          bottom: "max(12px, env(safe-area-inset-bottom, 0px))",
          background: PR.paper,
          border: `1px solid ${PR.hairline}`,
          borderRadius: "16px",
          overflow: "hidden",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.98)",
          transition: `opacity 360ms ${EASE}, transform 360ms ${EASE}`,
          fontFamily: FONT_BODY,
          color: PR.inkDeep,
        }}
      >
        {/* ── Top bar ── */}
        <header
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 28px",
            borderBottom: `1px solid ${PR.hairline}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{
              fontFamily: FONT_BODY,
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: PR.inkDeep,
            }}>
              Listening Room
            </span>
            <span aria-hidden="true" style={{ width: "1px", height: "12px", background: PR.hairlineStrong }} />
            <span style={{
              fontFamily: FONT_BODY,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: PR.inkSoft,
            }}>
              {allTracks.length} pieces · {categories.length} genres
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close listening room"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 12px",
              background: "transparent",
              border: `1px solid ${PR.hairline}`,
              borderRadius: "999px",
              cursor: "pointer",
              color: PR.inkDeep,
              fontFamily: FONT_BODY,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              transition: "background 160ms ease, border-color 160ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = PR.hairlineStrong; e.currentTarget.style.background = PR.paper2; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = PR.hairline; e.currentTarget.style.background = "transparent"; }}
          >
            <span>Close</span>
            <X size={14} strokeWidth={1.6} />
          </button>
        </header>

        {/* ── Stage ── */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 24px",
            position: "relative",
            overflow: "auto",
            minHeight: 0,
          }}
          className="pr-scroll"
        >
          {activeTrack ? (
            <Artwork
              playing={isPlaying}
              reduced={reduced}
              initial={activeInfo?.cat.initial ?? "♪"}
            />
          ) : (
            <div
              aria-hidden="true"
              style={{
                width: "min(46vh, 420px)",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                border: `1px dashed ${PR.hairlineStrong}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(20px, 3vh, 28px)",
                color: PR.inkSoft,
                letterSpacing: "-0.01em",
              }}>
                Choose a piece below
              </span>
            </div>
          )}

          {/* Title block */}
          <div
            key={`title-${activeTrackIndex ?? "none"}`}
            style={{
              marginTop: "36px",
              textAlign: "center",
              maxWidth: "min(720px, 92%)",
              animation: reduced ? "none" : "pr-fade-up 320ms ease both",
            }}
          >
            {activeTrack ? (
              <>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.26em", textTransform: "uppercase",
                  color: PR.inkSoft, margin: "0 0 12px",
                }}>
                  {activeCatLabel} · {String((activeInfo?.localIdx ?? 0) + 1).padStart(2, "0")} of {String(totalInCat).padStart(2, "0")}
                </p>
                <h2
                  id="pr-track-title"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 500,
                    fontSize: "clamp(36px, 7vw, 84px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    color: PR.inkDeep,
                    margin: 0,
                  }}
                >
                  {activeTrack.title}
                </h2>
                <p style={{
                  marginTop: "10px",
                  fontFamily: FONT_BODY,
                  fontSize: "clamp(13px, 1.3vw, 16px)",
                  color: PR.inkSoft,
                  letterSpacing: "0.01em",
                }}>
                  {activeInfo?.cat.descriptor}
                </p>
              </>
            ) : (
              <>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.26em", textTransform: "uppercase",
                  color: PR.inkSoft, margin: "0 0 12px",
                }}>
                  Now silent
                </p>
                <h2
                  id="pr-track-title"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 500,
                    fontSize: "clamp(36px, 7vw, 84px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    color: PR.inkDeep,
                    margin: 0,
                  }}
                >
                  Listening Room
                </h2>
                <p style={{
                  marginTop: "10px",
                  fontFamily: FONT_BODY,
                  fontSize: "clamp(13px, 1.3vw, 16px)",
                  color: PR.inkSoft,
                }}>
                  Pick a piece from the setlist to begin.
                </p>
              </>
            )}
          </div>

          {/* Transport + scrubber */}
          <div style={{
            marginTop: "32px",
            width: "min(620px, 92%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <TButton ariaLabel="Previous track" onClick={() => onPrev?.()} disabled={!canPrev}>
                <SkipBack size={18} strokeWidth={1.6} fill="currentColor" />
              </TButton>
              <TButton ariaLabel={isPlaying ? "Pause" : "Play"} onClick={() => onPlayPause?.()} disabled={!activeTrack} size={56} primary>
                {isPlaying
                  ? <Pause size={20} strokeWidth={0} fill="currentColor" />
                  : <Play  size={20} strokeWidth={0} fill="currentColor" style={{ marginLeft: 2 }} />}
              </TButton>
              <TButton ariaLabel="Next track" onClick={() => onNext?.()} disabled={!canNext}>
                <SkipForward size={18} strokeWidth={1.6} fill="currentColor" />
              </TButton>
            </div>

            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{
                fontFamily: FONT_BODY, fontSize: "12px",
                fontVariantNumeric: "tabular-nums",
                color: PR.inkSoft, minWidth: "36px",
              }}>
                {fmt(progress)}
              </span>
              <Scrubber progress={progress} duration={duration} onSeek={onSeek} />
              <span style={{
                fontFamily: FONT_BODY, fontSize: "12px",
                fontVariantNumeric: "tabular-nums",
                color: PR.inkSoft, minWidth: "44px", textAlign: "right",
              }}>
                {duration > 0 ? `−${fmt(remaining)}` : (activeTrack?.duration ?? "—")}
              </span>
            </div>
          </div>
        </main>

        {/* ── Setlist rail (desktop) ── */}
        <section
          aria-label="Setlist"
          style={{
            display: "none",
            flexShrink: 0,
            borderTop: `1px solid ${PR.hairline}`,
            background: PR.paper,
          }}
          className="pr-setlist-desktop"
        >
          {/* Genre tabs */}
          <div style={{
            display: "flex", gap: "4px", flexWrap: "wrap",
            padding: "14px 28px 0",
          }}>
            {categories.map((c) => {
              const active = c.id === filterCat;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilterCat(c.id)}
                  style={{
                    padding: "6px 14px",
                    background: active ? PR.inkDeep : "transparent",
                    color: active ? PR.paper : PR.inkDeep,
                    border: `1px solid ${active ? PR.inkDeep : PR.hairline}`,
                    borderRadius: "999px",
                    fontFamily: FONT_BODY,
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 160ms ease, border-color 160ms ease, color 160ms ease",
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Horizontal setlist */}
          <div
            className="pr-scroll"
            style={{
              display: "flex", gap: "0",
              overflowX: "auto",
              padding: "14px 28px 18px",
            }}
          >
            {filteredCat.tracks.map((t, i) => {
              const globalIdx = filteredStart + i;
              const isActive = activeTrackIndex === globalIdx;
              const hasSrc = !!t.src;
              return (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => hasSrc && onSelectTrack(globalIdx)}
                  disabled={!hasSrc}
                  style={{
                    flex: "0 0 auto",
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 18px",
                    marginRight: "4px",
                    background: "transparent",
                    border: "none",
                    borderLeft: i === 0 ? "none" : `1px solid ${PR.hairline}`,
                    cursor: hasSrc ? "pointer" : "default",
                    color: isActive ? PR.inkDeep : hasSrc ? PR.ink : PR.inkFaint,
                    fontFamily: FONT_BODY,
                    transition: "color 160ms ease, opacity 160ms ease",
                    opacity: isActive ? 1 : hasSrc ? 0.78 : 0.5,
                  }}
                  onMouseEnter={(e) => { if (hasSrc && !isActive) e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { if (hasSrc && !isActive) e.currentTarget.style.opacity = "0.78"; }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: isActive ? PR.inkDeep : "transparent",
                      border: `1px solid ${isActive ? PR.inkDeep : PR.hairlineStrong}`,
                    }}
                  />
                  <span style={{
                    fontSize: "11px",
                    fontVariantNumeric: "tabular-nums",
                    color: PR.inkFaint,
                    letterSpacing: "0.04em",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                  }}>
                    {t.title}
                  </span>
                  <span style={{
                    fontSize: "11px",
                    fontVariantNumeric: "tabular-nums",
                    color: PR.inkFaint,
                    letterSpacing: "0.04em",
                  }}>
                    {hasSrc ? (t.duration ?? "—") : "Soon"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Setlist drawer (mobile) ── */}
        <div
          className="pr-setlist-mobile"
          style={{
            display: "block",
            position: "absolute",
            left: 0, right: 0,
            bottom: 0,
            background: PR.paper,
            borderTop: `1px solid ${PR.hairline}`,
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            transform: drawerOpen ? "translateY(0)" : "translateY(calc(100% - 64px))",
            transition: `transform 320ms ${EASE}`,
            boxShadow: drawerOpen ? "0 -20px 40px -20px rgba(0,0,0,0.18)" : "none",
            maxHeight: "78%",
            display_: undefined as never,
          }}
        >
          <button
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            aria-label={drawerOpen ? "Close setlist" : "Open setlist"}
            style={{
              width: "100%", padding: "14px 16px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              background: "transparent", border: "none", cursor: "pointer",
            }}
          >
            <span aria-hidden="true" style={{ width: "36px", height: "4px", borderRadius: "2px", background: PR.hairlineStrong }} />
            <span style={{
              fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase", color: PR.inkDeep,
            }}>
              {drawerOpen ? "Hide setlist" : `Setlist · ${allTracks.length} pieces`}
            </span>
          </button>

          <div style={{ padding: "0 16px 8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map((c) => {
              const active = c.id === filterCat;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { setFilterCat(c.id); setDrawerOpen(true); }}
                  style={{
                    padding: "6px 12px",
                    background: active ? PR.inkDeep : "transparent",
                    color: active ? PR.paper : PR.inkDeep,
                    border: `1px solid ${active ? PR.inkDeep : PR.hairline}`,
                    borderRadius: "999px",
                    fontFamily: FONT_BODY,
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div
            className="pr-scroll"
            style={{
              maxHeight: "calc(78vh - 140px)",
              overflowY: "auto",
              padding: "4px 16px 24px",
            }}
          >
            {filteredCat.tracks.map((t, i) => {
              const globalIdx = filteredStart + i;
              const isActive = activeTrackIndex === globalIdx;
              const hasSrc = !!t.src;
              return (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => { if (hasSrc) { onSelectTrack(globalIdx); setDrawerOpen(false); } }}
                  disabled={!hasSrc}
                  style={{
                    width: "100%",
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 4px",
                    background: "transparent",
                    border: "none",
                    borderBottom: i < filteredCat.tracks.length - 1 ? `1px solid ${PR.hairline}` : "none",
                    cursor: hasSrc ? "pointer" : "default",
                    color: PR.inkDeep,
                    fontFamily: FONT_BODY,
                    textAlign: "left",
                    opacity: hasSrc ? 1 : 0.5,
                  }}
                >
                  <span style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: isActive ? PR.inkDeep : "transparent",
                    border: `1px solid ${isActive ? PR.inkDeep : PR.hairlineStrong}`,
                    flexShrink: 0,
                  }} aria-hidden="true" />
                  <span style={{
                    fontSize: "12px",
                    fontVariantNumeric: "tabular-nums",
                    color: PR.inkFaint, width: "20px",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    flex: 1,
                    fontFamily: FONT_DISPLAY,
                    fontSize: "16px",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "-0.01em",
                  }}>
                    {t.title}
                  </span>
                  <span style={{
                    fontSize: "12px",
                    fontVariantNumeric: "tabular-nums",
                    color: PR.inkFaint,
                  }}>
                    {hasSrc ? (t.duration ?? "—") : "Soon"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive: show desktop rail / hide mobile drawer at md+ */}
        <style>{`
          @media (min-width: 768px) {
            .pr-setlist-desktop { display: block !important; }
            .pr-setlist-mobile  { display: none  !important; }
          }
        `}</style>
      </div>
    </>
  );
}