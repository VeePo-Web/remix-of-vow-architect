import { cn } from '@/lib/utils';
import type { FlamePhase } from '@/hooks/useProcessOrchestrator';

interface ProcessDebugOverlayProps {
  progress: number;
  phase: FlamePhase;
  phaseProgress: number;
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  highlightedMovement: number;
  isActive: boolean;
  className?: string;
}

const PHASE_COLORS: Record<FlamePhase, string> = {
  vigil: '#6366f1',      // Indigo
  awakening: '#f59e0b',  // Amber
  drifting: '#10b981',   // Emerald
  converging: '#8b5cf6', // Violet
  covenant: '#FFE08A',   // Vow Yellow
};

/**
 * ProcessDebugOverlay — Development-only debug panel
 * 
 * Real-time visualization of orchestrator state.
 * Only renders in development mode.
 */
export function ProcessDebugOverlay({
  progress,
  phase,
  phaseProgress,
  velocity,
  direction,
  highlightedMovement,
  isActive,
  className,
}: ProcessDebugOverlayProps) {
  // Only render when explicitly requested via URL param
  const showDebug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug');
  if (!showDebug) return null;

  const phaseColor = PHASE_COLORS[phase];

  return (
    <div
      className={cn(
        'process-debug-overlay',
        isActive && 'is-active',
        className
      )}
      aria-hidden="true"
    >
      {/* Progress bar */}
      <div className="process-debug-overlay__progress-track">
        <div 
          className="process-debug-overlay__progress-fill"
          style={{ 
            width: `${progress * 100}%`,
            backgroundColor: phaseColor,
          }}
        />
        {/* Phase markers */}
        <div className="process-debug-overlay__marker" style={{ left: '20%' }} title="Awakening" />
        <div className="process-debug-overlay__marker" style={{ left: '28%' }} title="Drifting" />
        <div className="process-debug-overlay__marker" style={{ left: '75%' }} title="Converging" />
        <div className="process-debug-overlay__marker" style={{ left: '88%' }} title="Covenant" />
      </div>

      {/* Stats */}
      <div className="process-debug-overlay__stats">
        <div className="process-debug-overlay__stat">
          <span className="process-debug-overlay__label">Progress</span>
          <span className="process-debug-overlay__value">{(progress * 100).toFixed(1)}%</span>
        </div>
        <div className="process-debug-overlay__stat">
          <span className="process-debug-overlay__label">Phase</span>
          <span 
            className="process-debug-overlay__value"
            style={{ color: phaseColor }}
          >
            {phase}
          </span>
        </div>
        <div className="process-debug-overlay__stat">
          <span className="process-debug-overlay__label">Phase %</span>
          <span className="process-debug-overlay__value">{(phaseProgress * 100).toFixed(0)}%</span>
        </div>
        <div className="process-debug-overlay__stat">
          <span className="process-debug-overlay__label">Velocity</span>
          <span className="process-debug-overlay__value">
            {direction === 'up' ? '↑' : direction === 'down' ? '↓' : '•'} {Math.abs(velocity).toFixed(2)}
          </span>
        </div>
        <div className="process-debug-overlay__stat">
          <span className="process-debug-overlay__label">Movement</span>
          <span className="process-debug-overlay__value">
            {highlightedMovement >= 0 ? highlightedMovement + 1 : '—'}
          </span>
        </div>
      </div>

      {/* Phase timeline */}
      <div className="process-debug-overlay__timeline">
        {Object.entries(PHASE_COLORS).map(([phaseName, color]) => (
          <div
            key={phaseName}
            className={cn(
              'process-debug-overlay__phase-chip',
              phase === phaseName && 'is-active'
            )}
            style={{ 
              borderColor: color,
              backgroundColor: phase === phaseName ? color : 'transparent',
            }}
          >
            {phaseName.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProcessDebugOverlay;
