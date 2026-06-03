// Shared registry for mobile sticky-bottom UI elements so the audio pill
// (and any other floating element) can always lift above the tallest
// currently-visible obstacle. Writes a CSS var `--mobile-bottom-reserved`
// on <body> and notifies React subscribers.

type Entry = { id: string; getHeight: () => number };

const entries = new Map<string, Entry>();
const listeners = new Set<(h: number) => void>();
let lastValue = 0;
let rafId: number | null = null;

function computeAndBroadcast() {
  rafId = null;
  let max = 0;
  entries.forEach((e) => {
    const h = Math.max(0, e.getHeight() || 0);
    if (h > max) max = h;
  });
  if (max !== lastValue) {
    lastValue = max;
    if (typeof document !== 'undefined') {
      document.body.style.setProperty('--mobile-bottom-reserved', `${max}px`);
      // Backward-compat alias used elsewhere.
      document.body.style.setProperty('--mobile-sticky-h', `${max}px`);
    }
    listeners.forEach((cb) => cb(max));
  }
}

export function scheduleRecompute() {
  if (rafId != null) return;
  rafId = requestAnimationFrame(computeAndBroadcast);
}

export function registerObstacle(id: string, getHeight: () => number) {
  entries.set(id, { id, getHeight });
  scheduleRecompute();
  return () => {
    entries.delete(id);
    scheduleRecompute();
  };
}

export function subscribeReserved(cb: (h: number) => void) {
  listeners.add(cb);
  cb(lastValue);
  return () => { listeners.delete(cb); };
}

export function getReservedBottom() {
  return lastValue;
}