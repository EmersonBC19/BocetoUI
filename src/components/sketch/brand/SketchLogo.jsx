import React from 'react';
import './SketchLogo.css';
import { SketchIsotype } from './SketchIsotype';

export function SketchLogo({
  size = 'md',
  variant = 'horizontal',
  showBadge = true,
  showTagline = false,
  tagline = 'React UI Kit Artesanal',
  className = '',
  style = {},
  onClick
}) {
  const isStacked = variant === 'stacked';
  const isIcon = variant === 'icon';

  if (isIcon) {
    return (
      <div className={`sketch-logo sketch-logo--icon sketch-logo--${size} ${className}`} style={style} onClick={onClick}>
        <SketchIsotype size={size} />
      </div>
    );
  }

  return (
    <div
      className={`sketch-logo sketch-logo--${variant} sketch-logo--${size} ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="sketch-logo__mark">
        <SketchIsotype size={size} />
      </div>

      <div className="sketch-logo__text-group">
        <div className="sketch-logo__wordmark">
          <span className="sketch-logo__name">
            Boceto
            <span className="sketch-logo__brush-line" />
          </span>

          {showBadge && (
            <span className="sketch-logo__badge-ui" aria-hidden="true">
              UI
            </span>
          )}
        </div>

        {showTagline && (
          <span className="sketch-logo__tagline">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
}

export default SketchLogo;
