import { useEffect, useRef } from 'react';

/**
 * PetalCursorTrail — Delicate white petals fall from the cursor.
 * ~10% of petals are light pink. Spawn rate slows when cursor is still.
 * Only active when `active` prop is true (scroll progress >= 0.98).
 * Pure canvas — zero DOM nodes per petal. 60fps.
 */

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
  maxLife: number;
  isPink: boolean;
}

const MAX_PETALS = 40;
const SPAWN_RATE_MOVING = 0.35;  // petals per frame when cursor is moving
const SPAWN_RATE_STILL = 0.06;   // much slower when cursor is still
const PINK_CHANCE = 0.10;        // 10% chance of pink petal

// Petal shape — a small organic teardrop/petal path
function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity * Math.min(1, p.life / (p.maxLife * 0.15));

  const s = p.size;
  ctx.beginPath();
  // Organic petal: two bezier curves forming a leaf shape
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.6, -s * 0.6, s * 0.5, s * 0.3, 0, s);
  ctx.bezierCurveTo(-s * 0.5, s * 0.3, -s * 0.6, -s * 0.6, 0, -s);
  ctx.closePath();

  if (p.isPink) {
    ctx.fillStyle = 'rgba(255, 200, 210, 0.65)';
  } else {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  }
  ctx.fill();

  // Subtle inner glow
  if (p.isPink) {
    ctx.fillStyle = 'rgba(255, 180, 195, 0.25)';
  } else {
    ctx.fillStyle = 'rgba(255, 248, 240, 0.3)';
  }
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.6);
  ctx.bezierCurveTo(s * 0.3, -s * 0.3, s * 0.25, s * 0.15, 0, s * 0.6);
  ctx.bezierCurveTo(-s * 0.25, s * 0.15, -s * 0.3, -s * 0.3, 0, -s * 0.6);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function PetalCursorTrail({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const spawnAccRef = useRef(0);
  const cursorSpeedRef = useRef(0);

  useEffect(() => {
    if (!active) {
      // Clean up when deactivated
      petalsRef.current = [];
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Size canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    // Animation loop
    const loop = () => {
      const petals = petalsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate cursor speed (smoothed)
      const dx = mouseRef.current.x - prevMouseRef.current.x;
      const dy = mouseRef.current.y - prevMouseRef.current.y;
      const instantSpeed = Math.sqrt(dx * dx + dy * dy);
      cursorSpeedRef.current = cursorSpeedRef.current * 0.85 + instantSpeed * 0.15;
      prevMouseRef.current.x = mouseRef.current.x;
      prevMouseRef.current.y = mouseRef.current.y;

      // Spawn rate: fast when moving, slow drip when still
      const speedFactor = Math.min(1, cursorSpeedRef.current / 4);
      const spawnRate = SPAWN_RATE_STILL + (SPAWN_RATE_MOVING - SPAWN_RATE_STILL) * speedFactor;

      // Spawn new petals at cursor
      spawnAccRef.current += spawnRate;
      while (spawnAccRef.current >= 1 && petals.length < MAX_PETALS) {
        spawnAccRef.current -= 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.5;
        petals.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 8,
          y: mouseRef.current.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed * 0.4,
          vy: 0.4 + Math.random() * 0.8,
          size: 3 + Math.random() * 4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.06,
          opacity: 0.5 + Math.random() * 0.4,
          life: 0,
          maxLife: 60 + Math.random() * 80,
          isPink: Math.random() < PINK_CHANCE,
        });
      }

      // Update + draw
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.03) * 0.3; // gentle sway
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.008; // subtle gravity

        // Fade out in last 30% of life
        const fadePoint = p.maxLife * 0.7;
        if (p.life > fadePoint) {
          p.opacity *= 0.96;
        }

        if (p.life >= p.maxLife || p.opacity < 0.01) {
          petals.splice(i, 1);
          continue;
        }

        drawPetal(ctx, p);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        pointerEvents: 'none',
        opacity: active ? 1 : 0,
        transition: 'opacity 400ms ease',
      }}
      aria-hidden="true"
    />
  );
}
