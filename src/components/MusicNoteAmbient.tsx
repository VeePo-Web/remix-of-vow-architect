import { useEffect, useRef } from 'react';

/**
 * MusicNoteAmbient — falling music notes for the Gateway page.
 *
 * Design constraints:
 *   • Ambient trickle: 1 note every ~2–3s from random top-of-viewport x.
 *     Delayed 2.4s so page entrance animations fully settle first.
 *   • Cursor echo: soft bloom when cursor moves. ~1/7 the intensity of
 *     the wedding petal trail.
 *   • prefers-reduced-motion: completely disabled.
 *   • Pure canvas — no DOM nodes per note.
 */

type NoteShape = 'quarter' | 'eighth' | 'beam';

interface Note {
  x:            number;
  y:            number;
  vx:           number;   // base horizontal drift
  vy:           number;   // vertical fall speed
  swayPhase:    number;   // unique phase so notes never sway in lockstep
  swayFreq:     number;   // per-note frequency — prevents flock oscillation
  swayAmp:      number;   // per-note sway width
  size:         number;
  rotation:     number;
  rotationSpeed: number;
  opacity:      number;
  maxOpacity:   number;
  life:         number;
  maxLife:      number;
  shape:        NoteShape;
}

// ── Tuning ────────────────────────────────────────────────────────
const MAX_NOTES   = 16;
const GRAVITY     = 0.0014;  // very gentle — notes drift, don't fall
const CURSOR_RATE = 0.14;    // notes per frame when cursor is moving fast

// ── Drawing helpers ───────────────────────────────────────────────

/** Tilted filled ellipse — standard printed notehead shape */
function drawHead(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.38); // ~22° tilt, matches engraved music notation
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.56, s * 0.39, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Stem: thin vertical line from (x, y0) upward by h */
function drawStem(ctx: CanvasRenderingContext2D, x: number, y0: number, h: number, s: number) {
  ctx.lineWidth = Math.max(1.0, s * 0.10);
  ctx.beginPath();
  ctx.moveTo(x, y0);
  ctx.lineTo(x, y0 - h);
  ctx.stroke();
}

/** Eighth-note flag: a flowing bezier curl from the stem top */
function drawFlag(ctx: CanvasRenderingContext2D, x: number, topY: number, s: number) {
  ctx.lineWidth = Math.max(1.0, s * 0.10);
  ctx.beginPath();
  ctx.moveTo(x, topY);
  ctx.bezierCurveTo(
    x + s * 1.2,  topY + s * 0.4,
    x + s * 1.0,  topY + s * 1.3,
    x + s * 0.15, topY + s * 1.7,
  );
  ctx.stroke();
}

/**
 * Draw one note. Opacity is managed entirely by the caller via globalAlpha
 * so this function has no opacity knowledge — clean separation.
 */
function drawNote(ctx: CanvasRenderingContext2D, n: Note) {
  ctx.save();
  ctx.translate(n.x, n.y);
  ctx.rotate(n.rotation);

  const s = n.size;
  const stemH  = s * 2.9;
  // Stem base starts at the right edge of the notehead (+vx offset),
  // slightly above center so it appears to connect to the top-right of the oval.
  const stemX  = s * 0.46;
  const stemY0 = -s * 0.22;   // top of notehead
  const stemTopY = stemY0 - stemH;

  // Single colour — globalAlpha drives all transparency
  ctx.fillStyle   = 'rgb(255, 251, 242)'; // warm ivory-white
  ctx.strokeStyle = 'rgb(255, 251, 242)';
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  if (n.shape === 'quarter') {
    drawHead(ctx, 0, 0, s);
    drawStem(ctx, stemX, stemY0, stemH, s);
  }

  else if (n.shape === 'eighth') {
    drawHead(ctx, 0, 0, s);
    drawStem(ctx, stemX, stemY0, stemH, s);
    drawFlag(ctx, stemX, stemTopY, s);
  }

  else {
    // Beamed pair — only used when size > 7.5px so the beam reads cleanly
    const gap = s * 1.6;
    const lx = -gap * 0.5;
    const rx =  gap * 0.5;

    drawHead(ctx, lx, 0, s);
    drawHead(ctx, rx, 0, s);

    const lStemX = lx + s * 0.46;
    const rStemX = rx + s * 0.46;
    drawStem(ctx, lStemX, stemY0, stemH,        s);
    drawStem(ctx, rStemX, stemY0, stemH * 0.88, s);

    // Beam connecting both stems — single beam only (clean at all sizes)
    const lTop = stemY0 - stemH;
    const rTop = stemY0 - stemH * 0.88;
    ctx.lineWidth = Math.max(1.4, s * 0.30);
    ctx.beginPath();
    ctx.moveTo(lStemX, lTop);
    ctx.lineTo(rStemX, rTop);
    ctx.stroke();
  }

  ctx.restore();
}

// ── Easing helpers ────────────────────────────────────────────────

/** Smooth ease-in: slow start, quick finish */
function easeIn(t: number): number {
  return t * t * t;
}

/** Smooth ease-out: quick start, slow finish */
function easeOut(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u;
}

// ── Component ─────────────────────────────────────────────────────

export function MusicNoteAmbient({ active = true }: { active?: boolean }) {
  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const notesRef          = useRef<Note[]>([]);
  const mouseRef          = useRef({ x: -300, y: -300 });
  const prevMouseRef      = useRef({ x: -300, y: -300 });
  const rafRef            = useRef(0);
  const cursorAccRef      = useRef(0);
  const readyRef          = useRef(false);
  // Ambient countdown lives here — not module scope — so remounts start clean
  const ambientCountRef   = useRef(130);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Cursor reactivity is pointer-fine only — never bind mousemove on touch (D9)
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    if (finePointer) window.addEventListener('mousemove', onMove);

    // Wait for entrance animations to finish before first ambient note
    const startTimer = setTimeout(() => { readyRef.current = true; }, 2400);

    // Shape pool — eighth notes dominate, beam only for larger spawns
    const SHAPES_SMALL: NoteShape[] = ['eighth', 'eighth', 'eighth', 'quarter', 'quarter'];
    const SHAPES_LARGE: NoteShape[] = ['eighth', 'eighth', 'quarter', 'beam'];

    function spawnNote(x: number, y: number, fromCursor: boolean) {
      const baseSize = fromCursor
        ? 5.5 + Math.random() * 3.5    // 5.5–9px
        : 6.5 + Math.random() * 5.5;   // 6.5–12px

      const pool  = baseSize > 7.5 ? SHAPES_LARGE : SHAPES_SMALL;
      const shape = pool[Math.floor(Math.random() * pool.length)];

      // Cursor notes need to be legible on near-black; ambient stays whisper-quiet
      const maxOp = fromCursor
        ? 0.28 + Math.random() * 0.20  // 0.28–0.48
        : 0.10 + Math.random() * 0.10; // 0.10–0.20

      notesRef.current.push({
        x,
        y,
        vx:           (Math.random() - 0.5) * 0.35,
        vy:           0.48 + Math.random() * 0.52,  // 0.48–1.0 px/frame
        swayPhase:    Math.random() * Math.PI * 2,   // unique phase — no lockstep
        swayFreq:     0.014 + Math.random() * 0.014, // 0.014–0.028 — prevents flock rhythm
        swayAmp:      0.28 + Math.random() * 0.38,   // 0.28–0.66 px
        size:         baseSize,
        rotation:     (Math.random() - 0.5) * 0.45,
        rotationSpeed: (Math.random() - 0.5) * 0.014,
        opacity:      0,
        maxOpacity:   maxOp,
        life:         0,
        maxLife:      fromCursor
          ? 75  + Math.random() * 55   // 75–130 frames
          : 130 + Math.random() * 90,  // 130–220 frames
        shape,
      });
    }

    const loop = () => {
      const notes = notesRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Ambient spawn — ref-based countdown (not module scope) ──
      if (readyRef.current && notes.length < MAX_NOTES) {
        ambientCountRef.current--;
        if (ambientCountRef.current <= 0) {
          const x = canvas.width * (0.08 + Math.random() * 0.84);
          spawnNote(x, -20, false);
          ambientCountRef.current = 90 + Math.floor(Math.random() * 75);
        }
      }

      // ── Cursor spawn — no readyRef gate, active immediately ──
      const dx    = mouseRef.current.x - prevMouseRef.current.x;
      const dy    = mouseRef.current.y - prevMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevMouseRef.current.x = mouseRef.current.x;
      prevMouseRef.current.y = mouseRef.current.y;

      if (speed > 1.5 && notes.length < MAX_NOTES) {
        cursorAccRef.current += CURSOR_RATE * Math.min(1, speed / 6);
        while (cursorAccRef.current >= 1 && notes.length < MAX_NOTES) {
          cursorAccRef.current -= 1;
          spawnNote(
            mouseRef.current.x + (Math.random() - 0.5) * 26,
            mouseRef.current.y + (Math.random() - 0.5) * 26,
            true,
          );
        }
      }

      // ── Update + draw ──
      for (let i = notes.length - 1; i >= 0; i--) {
        const n = notes[i];
        n.life++;

        // Opacity: ease-in over first 20% of life, hold, ease-out over last 30%
        const t = n.life / n.maxLife;
        if (t < 0.20) {
          n.opacity = n.maxOpacity * easeIn(t / 0.20);
        } else if (t > 0.70) {
          n.opacity = n.maxOpacity * easeOut(1 - (t - 0.70) / 0.30);
        } else {
          n.opacity = n.maxOpacity;
        }

        // Physics — unique phase + frequency prevents flock swaying
        const sway = Math.sin(n.life * n.swayFreq + n.swayPhase) * n.swayAmp;
        n.x  += n.vx + sway;
        n.y  += n.vy;
        n.vy += GRAVITY; // barely-there acceleration
        n.rotation += n.rotationSpeed;

        // Cull off-screen or expired
        if (n.life >= n.maxLife || n.opacity < 0.004 || n.y > canvas.height + 50) {
          notes.splice(i, 1);
          continue;
        }

        // Draw — globalAlpha is the sole opacity control
        ctx.globalAlpha = n.opacity;
        drawNote(ctx, n);
      }

      // Reset globalAlpha for next frame's clearRect (not strictly needed but clean)
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(startTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      // Clear canvas on unmount
      const c = canvasRef.current;
      if (c) c.getContext('2d')?.clearRect(0, 0, c.width, c.height);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,          // above vignette (0), below cards (10) and wordmark
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
