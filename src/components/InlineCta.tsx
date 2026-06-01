import { Link } from 'react-router-dom';

type Vertical = 'weddings' | 'teaching' | 'events';

const FINAL_COPY: Record<Vertical, { eyebrow: string; tagline: string; tel: string }> = {
  weddings: { eyebrow: 'The Vow', tagline: 'I would be honored\nto be there.', tel: '(587) 998-7474' },
  teaching: { eyebrow: 'The Lesson', tagline: 'Begin where\nyou are.', tel: '(587) 998-7474' },
  events: { eyebrow: 'The Evening', tagline: 'Live piano,\nwhere you gather.', tel: '(587) 998-7474' },
};

interface InlineCtaProps {
  href: string;
  text: string;
  className?: string;
  vertical: Vertical;
}

/**
 * InlineCta — wraps an inline story CTA with a mobile-anchored block.
 * - Standard inline: eyebrow "Next step" + CTA pill
 * - Final ("--large"): mirrors PreScrollIntro structure (eyebrow + tagline + CTA + tel)
 * Desktop appearance is preserved by `.cn-cta-anchor` only acting on ≤640px in CSS.
 */
export function InlineCta({ href, text, className = '', vertical }: InlineCtaProps) {
  const isFinal = className.includes('cn-inline-cta--large');
  const copy = FINAL_COPY[vertical];

  return (
    <div className={`cn-cta-anchor ${isFinal ? 'cn-cta-anchor--final' : ''}`}>
      {isFinal && (
        <>
          <span className="cn-cta-eyebrow cn-cta-eyebrow--final">{copy.eyebrow}</span>
          <h2 className="cn-cta-tagline">
            {copy.tagline.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
        </>
      )}
      {!isFinal && <span className="cn-cta-eyebrow">Next step</span>}
      <Link to={href} className={`max-w-[90vw] ${className}`}>
        {text}
      </Link>
      {isFinal && (
        <a href={`tel:${copy.tel.replace(/[^0-9+]/g, '')}`} className="cn-cta-secondary">
          or call {copy.tel}
        </a>
      )}
    </div>
  );
}