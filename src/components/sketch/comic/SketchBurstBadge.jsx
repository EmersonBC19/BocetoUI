import React, { useState } from 'react';
import './SketchBurstBadge.css';

const BURST_COLORS = {
  red: { bg: '#ef4444', text: '#ffffff' },
  yellow: { bg: '#fef08a', text: '#18181b' },
  blue: { bg: '#38bdf8', text: '#18181b' },
  green: { bg: '#4ade80', text: '#18181b' },
  purple: { bg: '#c084fc', text: '#ffffff' },
  orange: { bg: '#fb923c', text: '#ffffff' }
};

export function SketchBurstBadge({
  children,
  text,
  variant = 'default', // 'default' | 'action' | 'halftone'
  color = 'red',
  size = 'md',
  rotation = 6,
  animate = true,
  className = '',
  style = {},
  onClick
}) {
  const [popped, setPopped] = useState(false);
  const colorScheme = BURST_COLORS[color] || BURST_COLORS.red;
  const content = children || text || '¡POW!';

  const handleClick = (e) => {
    setPopped(true);
    setTimeout(() => setPopped(false), 300);
    onClick?.(e);
  };

  return (
    <div
      className={`sketch-burst-badge sketch-burst-badge--${size} sketch-burst-badge--${variant} ${animate ? 'sketch-burst-badge--anim' : ''} ${popped ? 'sketch-burst-badge--popped' : ''} ${className}`}
      style={{
        '--burst-bg': colorScheme.bg,
        '--burst-text': colorScheme.text,
        transform: `rotate(${rotation}deg)`,
        ...style
      }}
      onClick={handleClick}
      role={onClick ? 'button' : 'status'}
      tabIndex={onClick ? 0 : undefined}
    >
      {variant === 'action' && (
        <svg className="sketch-burst-badge__rays" viewBox="0 0 100 100" aria-hidden="true">
          <g stroke="var(--sketch-ink, #18181b)" strokeWidth="2.2" strokeLinecap="round">
            <line x1="50" y1="2" x2="50" y2="12" />
            <line x1="84" y1="16" x2="76" y2="24" />
            <line x1="98" y1="50" x2="88" y2="50" />
            <line x1="84" y1="84" x2="76" y2="76" />
            <line x1="50" y1="98" x2="50" y2="88" />
            <line x1="16" y1="84" x2="24" y2="76" />
            <line x1="2" y1="50" x2="12" y2="50" />
            <line x1="16" y1="16" x2="24" y2="24" />
          </g>
        </svg>
      )}
      <div className="sketch-burst-badge__shape">
        <span className="sketch-burst-badge__label">{content}</span>
      </div>
    </div>
  );
}

export default SketchBurstBadge;
