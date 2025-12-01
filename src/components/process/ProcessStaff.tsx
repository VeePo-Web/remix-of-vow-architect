import { cn } from '@/lib/utils';

interface ProcessStaffProps {
  activeStep: number;
  className?: string;
}

/**
 * ProcessStaff — The Musical Spine
 * 
 * SVG staff with 5 horizontal lines running the full section height.
 * Notes progressively appear as user scrolls through each movement.
 */
export function ProcessStaff({ activeStep, className }: ProcessStaffProps) {
  return (
    <svg
      className={cn('process-staff', className)}
      viewBox="0 0 200 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Staff Lines */}
      <g className="process-staff__lines">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={80 + i * 20}
            x2="200"
            y2={80 + i * 20}
            className="process-staff__line"
          />
        ))}
        {/* Repeat staff lines for each section */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`s2-${i}`}
            x1="0"
            y1={300 + i * 20}
            x2="200"
            y2={300 + i * 20}
            className="process-staff__line"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`s3-${i}`}
            x1="0"
            y1={520 + i * 20}
            x2="200"
            y2={520 + i * 20}
            className="process-staff__line"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`s4-${i}`}
            x1="0"
            y1={740 + i * 20}
            x2="200"
            y2={740 + i * 20}
            className="process-staff__line"
          />
        ))}
      </g>

      {/* Step I: Single Quarter Note */}
      <g className={cn('process-note', activeStep >= 1 && 'is-visible')}>
        <ellipse cx="100" cy="120" rx="10" ry="8" className="process-note__head" />
        <line x1="110" y1="120" x2="110" y2="70" className="process-note__stem" />
      </g>

      {/* Step II: Short Phrase (5 notes) */}
      <g className={cn('process-phrase', activeStep >= 2 && 'is-visible')}>
        {[
          { cx: 60, cy: 340, delay: 0 },
          { cx: 85, cy: 320, delay: 80 },
          { cx: 110, cy: 360, delay: 160 },
          { cx: 135, cy: 300, delay: 240 },
          { cx: 160, cy: 340, delay: 320 },
        ].map((note, i) => (
          <g key={i} className="process-note" style={{ '--note-delay': `${note.delay}ms` } as React.CSSProperties}>
            <ellipse cx={note.cx} cy={note.cy} rx="9" ry="7" className="process-note__head" />
            <line x1={note.cx + 9} y1={note.cy} x2={note.cx + 9} y2={note.cy - 45} className="process-note__stem" />
          </g>
        ))}
      </g>

      {/* Step III: Erased/Ghost Note + New Note */}
      <g className={cn('process-revision', activeStep >= 3 && 'is-visible')}>
        {/* Ghost/Erased Note */}
        <g className="process-note--ghost">
          <ellipse cx="90" cy="560" rx="9" ry="7" className="process-note__head--ghost" />
          <line x1="99" y1="560" x2="99" y2="515" className="process-note__stem--ghost" />
          {/* Strike-through */}
          <line x1="75" y1="575" x2="105" y2="545" className="process-note__strike" />
        </g>
        {/* New Note (shifted position) */}
        <g className="process-note process-note--revised">
          <ellipse cx="120" cy="540" rx="9" ry="7" className="process-note__head" />
          <line x1="129" y1="540" x2="129" y2="495" className="process-note__stem" />
        </g>
        {/* Additional stable notes */}
        <g className="process-note" style={{ '--note-delay': '150ms' } as React.CSSProperties}>
          <ellipse cx="150" cy="580" rx="9" ry="7" className="process-note__head" />
          <line x1="159" y1="580" x2="159" y2="535" className="process-note__stem" />
        </g>
      </g>

      {/* Step IV: Resolved Phrase */}
      <g className={cn('process-resolved', activeStep >= 4 && 'is-visible')}>
        {[
          { cx: 50, cy: 780 },
          { cx: 80, cy: 760 },
          { cx: 110, cy: 800 },
          { cx: 140, cy: 760 },
          { cx: 170, cy: 780 },
        ].map((note, i) => (
          <g key={i} className="process-note" style={{ '--note-delay': `${i * 60}ms` } as React.CSSProperties}>
            <ellipse cx={note.cx} cy={note.cy} rx="9" ry="7" className="process-note__head" />
            <line x1={note.cx + 9} y1={note.cy} x2={note.cx + 9} y2={note.cy - 45} className="process-note__stem" />
          </g>
        ))}
        {/* Final whole note (resolution) */}
        <g className="process-note process-note--whole" style={{ '--note-delay': '400ms' } as React.CSSProperties}>
          <ellipse cx="200" cy="780" rx="12" ry="9" className="process-note__head--whole" />
        </g>
      </g>
    </svg>
  );
}
